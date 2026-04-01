import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/app/lib/stripe";
import { supabaseAdmin } from "@/app/lib/supabase";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("[stripe webhook] Signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const email = session.metadata?.email?.trim().toLowerCase();

    if (!email || session.metadata?.type !== "founding_member") {
      return NextResponse.json({ received: true });
    }

    // Check if user exists in waitlist
    const { data: existing } = await supabaseAdmin
      .from("waitlist")
      .select("id")
      .eq("email", email)
      .single();

    if (existing) {
      // Update existing waitlist entry
      await supabaseAdmin
        .from("waitlist")
        .update({
          is_founding_member: true,
          stripe_session_id: session.id,
        })
        .eq("email", email);
    } else {
      // Create new entry — they paid without joining the free waitlist first
      const { count } = await supabaseAdmin
        .from("waitlist")
        .select("*", { count: "exact", head: true });

      const { generateReferralCode } = await import("@/app/lib/referral");

      await supabaseAdmin.from("waitlist").insert({
        email,
        position: (count ?? 0) + 1,
        referral_code: generateReferralCode(),
        is_founding_member: true,
        stripe_session_id: session.id,
      });
    }

    console.log(`[stripe webhook] Founding member confirmed: ${email}`);
  }

  return NextResponse.json({ received: true });
}
