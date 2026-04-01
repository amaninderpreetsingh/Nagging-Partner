"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import ScrollAnimation from "./scroll-animation";

const faqs = [
  {
    q: "What do Founding Members get?",
    a: "Lifetime premium access — every persona, every feature, forever. No subscriptions, no upsells. You also get to vote on what we build next and you'll be the first to access the app when it launches.",
  },
  {
    q: "What if the app never launches?",
    a: "You get a full refund. No questions asked. We're committed to building this, but if for any reason we don't ship, every Founding Member gets their money back automatically.",
  },
  {
    q: "How do refunds work?",
    a: "100% money-back, no questions asked. Just email us and we'll refund you instantly through Stripe. We want you to feel zero risk trying this.",
  },
  {
    q: "Why only $5?",
    a: "We're validating the idea. Your $5 tells us you're serious about wanting this — and in return, you lock in a price that'll never come back. After the first 100, the price goes up significantly.",
  },
  {
    q: "What's the difference between the free waitlist and Founding Member?",
    a: "The free waitlist gets you notified when we launch. Founding Members get lifetime premium access, priority launch access, and a say in what we build. Both are great — one's just a better deal.",
  },
  {
    q: "When does the app launch?",
    a: "We're building fast. Founding Members will get early access first. Join and we'll keep you posted on progress — no vague timelines, just honest updates.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left cursor-pointer group"
        aria-expanded={open}
      >
        <span className="text-sm sm:text-base font-medium text-text-primary pr-4 group-hover:text-accent transition-colors">
          {q}
        </span>
        <motion.svg
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="flex-shrink-0 text-text-secondary"
        >
          <path d="M12 5v14" />
          <path d="M5 12h14" />
        </motion.svg>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden"
          >
            <p className="text-sm text-text-secondary pb-4 leading-relaxed">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  return (
    <section id="faq" className="py-14 md:py-28 bg-surface">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
        <ScrollAnimation>
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8 md:mb-10">
              <h2 className="text-2xl sm:text-4xl font-bold mb-3 font-[family-name:var(--font-display)]">
                Questions? <span className="text-accent">Answered.</span>
              </h2>
              <p className="text-base text-text-secondary">
                Everything you need to know before joining.
              </p>
            </div>

            <div className="rounded-2xl bg-background border border-border p-4 sm:p-6" style={{ boxShadow: "var(--card-shadow)" }}>
              {faqs.map((faq) => (
                <FAQItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
