"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { trackEvent } from "@/app/lib/analytics";

interface FoundingMemberModalProps {
  open: boolean;
  onClose: () => void;
}

const perks = [
  { emoji: "💎", text: "Lifetime premium — every feature, forever" },
  { emoji: "🎭", text: "All personas unlocked on day one" },
  { emoji: "🏆", text: "Vote on new features & personas" },
  { emoji: "🛡️", text: "100% refundable — no questions asked" },
];

export default function FoundingMemberModal({
  open,
  onClose,
}: FoundingMemberModalProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
        onClose();
      }
    },
    [onClose]
  );

  const handleCheckout = async (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        setLoading(false);
        return;
      }

      trackEvent({ name: "founding_member_checkout", properties: { email } });
      window.location.href = data.url;
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-label="Become a Founding Member"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0"
            style={{ backgroundColor: `rgba(0,0,0,var(--backdrop-opacity))` }}
          />

          {/* Modal */}
          <motion.div
            ref={contentRef}
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="relative w-full sm:max-w-md rounded-2xl p-6 sm:p-8 max-h-[90svh] overflow-y-auto"
            style={{
              backgroundColor: "var(--modal-bg)",
              border: `1px solid var(--modal-border)`,
              boxShadow: `var(--modal-shadow), 0 0 0 1px var(--modal-ring)`,
            }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-text-secondary hover:text-text-primary hover:bg-surface-hover transition-colors cursor-pointer"
              aria-label="Close"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>

            <form onSubmit={handleCheckout}>
              {/* Header */}
              <div className="text-center mb-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-medium mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  Limited to 100 spots
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-1 font-[family-name:var(--font-display)]">
                  Founding Member
                </h2>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-3xl font-bold text-text-primary">$5</span>
                  <span className="text-sm text-text-secondary">one-time</span>
                  <span className="text-xs text-text-secondary line-through ml-1">$29/yr</span>
                </div>
              </div>

              {/* Perks */}
              <div className="flex flex-col gap-2 mb-5">
                {perks.map((perk) => (
                  <div
                    key={perk.text}
                    className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-background/60 border border-border/50"
                  >
                    <span className="text-lg flex-shrink-0">{perk.emoji}</span>
                    <span className="text-sm text-text-primary font-medium">
                      {perk.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Email input */}
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                placeholder="Enter your email"
                autoFocus
                disabled={loading}
                className="w-full h-12 px-4 rounded-xl text-text-primary text-base placeholder:text-text-secondary/60 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all disabled:opacity-50"
                style={{
                  backgroundColor: "var(--input-modal-bg)",
                  borderWidth: "1px",
                  borderStyle: "solid",
                  borderColor: "var(--input-modal-border)",
                }}
              />

              {error && (
                <p className="text-sm text-error mt-1.5" role="alert">
                  {error}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 mt-3 rounded-xl bg-accent hover:bg-accent-hover active:scale-[0.98] text-white font-semibold text-base transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ boxShadow: "var(--btn-shadow)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow = "var(--btn-shadow-hover)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.boxShadow = "var(--btn-shadow)")
                }
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Redirecting to Stripe...
                  </span>
                ) : (
                  "Pay $5 — Lifetime Access"
                )}
              </button>

              {/* Trust */}
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 mt-4 text-xs text-text-secondary">
                <span className="flex items-center gap-1">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  Stripe secured
                </span>
                <span>•</span>
                <span>100% money-back</span>
                <span>•</span>
                <span>No subscription</span>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
