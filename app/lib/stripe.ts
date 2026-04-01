import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_RESTRICTED_KEY!, {
  typescript: true,
});

export const FOUNDING_MEMBER_PRICE = 500; // $5.00 in cents
export const FOUNDING_MEMBER_LIMIT = 100;
