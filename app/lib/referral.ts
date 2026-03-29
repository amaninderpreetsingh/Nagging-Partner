import { randomBytes } from "crypto";

export function generateReferralCode(): string {
  return randomBytes(6).toString("base64url").slice(0, 8);
}

export function buildReferralUrl(code: string, origin: string): string {
  return `${origin}?ref=${code}`;
}
