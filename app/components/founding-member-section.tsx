"use client";

import { useState } from "react";
import { motion } from "motion/react";
import ScrollAnimation from "./scroll-animation";
import FoundingMemberModal from "./founding-member-modal";

const perks = [
  { emoji: "💎", label: "Lifetime Premium", desc: "Every feature. Forever. No subscriptions." },
  { emoji: "🎭", label: "All Personas Unlocked", desc: "Grandma, Sergeant, Irish Guy — day one access." },
  { emoji: "🏆", label: "Shape the Product", desc: "Vote on features, personas, and what we build next." },
  { emoji: "⚡", label: "Priority Access", desc: "First to get in when we launch. Skip the line." },
];

interface FoundingMemberSectionProps {
  foundingMemberCount?: number;
}

export default function FoundingMemberSection({ foundingMemberCount = 0 }: FoundingMemberSectionProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const spotsLeft = Math.max(0, 100 - foundingMemberCount);

  return (
    <section id="founding-member" className="py-14 md:py-28 bg-background relative overflow-hidden">
      {/* Subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/6 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 relative z-10">
        <ScrollAnimation>
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8 md:mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-4">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                {spotsLeft > 0 ? `${spotsLeft} of 100 spots left` : "All spots claimed!"}
              </div>

              <h2 className="text-2xl sm:text-4xl font-bold mb-3 md:mb-4 font-[family-name:var(--font-display)]">
                Become a{" "}
                <span className="text-accent">Founding Member</span>
              </h2>
              <p className="text-base md:text-lg text-text-secondary max-w-lg mx-auto">
                Lock in lifetime premium for <span className="text-text-primary font-bold text-xl">$5</span>.
                One payment. No subscription. No catch.
              </p>
            </div>

            {/* Perks grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {perks.map((perk, i) => (
                <motion.div
                  key={perk.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="flex items-start gap-3 px-4 py-3.5 rounded-xl bg-surface border border-border"
                  style={{ boxShadow: "var(--card-shadow)" }}
                >
                  <span className="text-xl flex-shrink-0 mt-0.5">{perk.emoji}</span>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">{perk.label}</p>
                    <p className="text-xs text-text-secondary mt-0.5">{perk.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Checkout card */}
            <div
              className="rounded-2xl p-6 sm:p-8 border border-accent/20 bg-surface text-center"
              style={{ boxShadow: "var(--card-shadow), 0 0 60px rgba(255,107,53,0.08)" }}
            >
              <div className="flex items-baseline justify-center gap-3 mb-2">
                <span className="text-4xl font-bold text-text-primary font-[family-name:var(--font-display)]">$5</span>
                <span className="text-sm text-text-secondary">one-time</span>
                <span className="text-xs text-text-secondary line-through">$29/yr</span>
              </div>
              <p className="text-sm text-accent font-semibold mb-5">Lifetime access</p>

              <button
                onClick={() => setModalOpen(true)}
                disabled={spotsLeft === 0}
                className="w-full sm:w-auto h-12 px-10 rounded-xl bg-accent hover:bg-accent-hover text-white font-semibold text-base transition-all cursor-pointer active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ boxShadow: "var(--btn-shadow)" }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "var(--btn-shadow-hover)")}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "var(--btn-shadow)")}
              >
                {spotsLeft === 0 ? "Sold Out" : "Become a Founding Member"}
              </button>

              {/* Trust signals */}
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 mt-4 text-xs text-text-secondary">
                <span className="flex items-center gap-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  Secured by Stripe
                </span>
                <span>•</span>
                <span>100% money-back guarantee</span>
                <span>•</span>
                <span>No subscription</span>
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </div>

      <FoundingMemberModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
}
