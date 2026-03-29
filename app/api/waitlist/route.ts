import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabase";
import { generateReferralCode, buildReferralUrl } from "@/app/lib/referral";
import { getRatelimit } from "@/app/lib/rate-limit";
import { sendWaitlistConfirmation } from "@/app/lib/email";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = (body.email as string)?.trim().toLowerCase();
    const referredBy = body.referredBy as string | undefined;

    // Validate email
    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // Rate limit check
    const ratelimit = getRatelimit();
    if (ratelimit) {
      const ip =
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
        "unknown";
      const { success } = await ratelimit.limit(ip);
      if (!success) {
        return NextResponse.json(
          { success: false, error: "Too many attempts. Please try again later." },
          { status: 429 }
        );
      }
    }

    // Check for duplicate
    const { data: existing } = await supabaseAdmin
      .from("waitlist")
      .select("position, referral_code")
      .eq("email", email)
      .single();

    if (existing) {
      const origin = request.headers.get("origin") || request.nextUrl.origin;
      return NextResponse.json({
        success: true,
        isDuplicate: true,
        position: existing.position,
        referralCode: existing.referral_code,
        referralUrl: buildReferralUrl(existing.referral_code, origin),
      });
    }

    // Get current count for position
    const { count } = await supabaseAdmin
      .from("waitlist")
      .select("*", { count: "exact", head: true });

    const position = (count ?? 0) + 1;
    const referralCode = generateReferralCode();

    // Insert new signup
    const { error: insertError } = await supabaseAdmin
      .from("waitlist")
      .insert({
        email,
        referral_code: referralCode,
        referred_by: referredBy || null,
        position,
      });

    if (insertError) {
      // Handle race condition duplicate
      if (insertError.code === "23505") {
        const { data: dup } = await supabaseAdmin
          .from("waitlist")
          .select("position, referral_code")
          .eq("email", email)
          .single();

        const origin = request.headers.get("origin") || request.nextUrl.origin;
        return NextResponse.json({
          success: true,
          isDuplicate: true,
          position: dup?.position,
          referralCode: dup?.referral_code,
          referralUrl: dup
            ? buildReferralUrl(dup.referral_code, origin)
            : undefined,
        });
      }

      console.error("[waitlist] Insert error:", insertError);
      return NextResponse.json(
        { success: false, error: "Something went wrong. Please try again." },
        { status: 500 }
      );
    }

    // Update referrer count if applicable
    if (referredBy) {
      try {
        await supabaseAdmin.rpc("increment_referral_count", {
          code: referredBy,
        });
      } catch {
        // Non-critical — don't block signup
      }
    }

    // Send confirmation email (async, non-blocking)
    const origin = request.headers.get("origin") || request.nextUrl.origin;
    const referralUrl = buildReferralUrl(referralCode, origin);

    sendWaitlistConfirmation(email, {
      position,
      referralCode,
      referralUrl,
    }).catch(() => {
      // Best effort — don't block response
    });

    return NextResponse.json({
      success: true,
      isDuplicate: false,
      position,
      referralCode,
      referralUrl,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
