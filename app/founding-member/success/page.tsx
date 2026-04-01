"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";

export default function FoundingMemberSuccess() {
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSessionId(params.get("session_id"));
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center px-5">
      <div className="grain-overlay" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        className="max-w-md w-full text-center"
      >
        <div className="text-6xl mb-6">🏆</div>

        <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-3 font-[family-name:var(--font-display)]">
          Welcome, <span className="text-accent">Founding Member.</span>
        </h1>

        <p className="text-lg text-text-secondary mb-6">
          You just locked in lifetime premium access for $5.
          We&apos;ll email you when we launch — you&apos;ll be first in line.
        </p>

        <div className="flex flex-col gap-3 mb-8">
          {[
            { emoji: "💎", text: "Lifetime premium access — forever" },
            { emoji: "🎭", text: "All personas unlocked on day one" },
            { emoji: "🏆", text: "Vote on new features & personas" },
            { emoji: "🛡️", text: "100% refundable if you're not happy" },
          ].map((perk) => (
            <div
              key={perk.text}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-surface border border-border text-left"
            >
              <span className="text-lg flex-shrink-0">{perk.emoji}</span>
              <span className="text-sm text-text-primary font-medium">
                {perk.text}
              </span>
            </div>
          ))}
        </div>

        <Link
          href="/"
          className="inline-flex items-center justify-center h-12 px-8 rounded-xl bg-accent hover:bg-accent-hover text-white font-semibold text-base transition-all active:scale-[0.98]"
          style={{ boxShadow: "var(--btn-shadow)" }}
        >
          Back to Home
        </Link>

        {sessionId && (
          <p className="text-xs text-text-secondary mt-6 opacity-60">
            Payment confirmation sent to your email.
          </p>
        )}
      </motion.div>
    </main>
  );
}
