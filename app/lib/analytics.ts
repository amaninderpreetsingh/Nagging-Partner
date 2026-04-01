import { track } from "@vercel/analytics";

type AnalyticsEvent =
  | { name: "scroll_depth"; properties: { milestone: 25 | 50 | 75 | 100 } }
  | { name: "waitlist_signup"; properties: { referralSource?: string } }
  | {
      name: "share_click";
      properties: {
        platform: "twitter" | "whatsapp" | "imessage" | "copy_link";
      };
    }
  | {
      name: "form_error";
      properties: {
        type: "validation" | "duplicate" | "server_error" | "rate_limit";
      };
    }
  | { name: "founding_member_checkout"; properties: { email: string } };

export function trackEvent(event: AnalyticsEvent) {
  try {
    track(event.name, event.properties);
  } catch {
    // Silent fail — analytics should never break the app
  }
}
