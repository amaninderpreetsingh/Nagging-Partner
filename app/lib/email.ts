import { Resend } from "resend";
import WaitlistConfirmation from "@/app/emails/waitlist-confirmation";

const resend = new Resend(process.env.RESEND_API_KEY);

export interface WaitlistEmailProps {
  position: number;
  referralCode: string;
  referralUrl: string;
}

export async function sendWaitlistConfirmation(
  to: string,
  props: WaitlistEmailProps
) {
  if (
    !process.env.RESEND_API_KEY ||
    process.env.RESEND_API_KEY === "re_your_api_key"
  ) {
    console.log("[email] Skipping — no RESEND_API_KEY configured");
    return;
  }

  try {
    await resend.emails.send({
      from: "The Nagging Partner <onboarding@resend.dev>",
      to: [to],
      subject:
        "You're in. Here's your spot on The Nagging Partner waitlist.",
      react: WaitlistConfirmation(props),
    });
  } catch (error) {
    console.error("[email] Failed to send confirmation:", error);
  }
}
