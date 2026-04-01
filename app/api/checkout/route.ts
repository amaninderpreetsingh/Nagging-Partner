import { NextRequest, NextResponse } from "next/server";
import { stripe, FOUNDING_MEMBER_PRICE } from "@/app/lib/stripe";
import { supabaseAdmin } from "@/app/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = (body.email as string)?.trim().toLowerCase();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    // Check if already a founding member
    const { data: existing } = await supabaseAdmin
      .from("waitlist")
      .select("is_founding_member")
      .eq("email", email)
      .eq("is_founding_member", true)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: "You're already a Founding Member! Check your email for details." },
        { status: 409 }
      );
    }

    const origin = request.headers.get("origin") || request.nextUrl.origin;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Founding Member — Lifetime Premium",
              description:
                "Lifetime premium access to The Nagging Partner. 100% refundable.",
            },
            unit_amount: FOUNDING_MEMBER_PRICE,
          },
          quantity: 1,
        },
      ],
      metadata: {
        email,
        type: "founding_member",
      },
      success_url: `${origin}/founding-member/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}?cancelled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("[checkout] Error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
