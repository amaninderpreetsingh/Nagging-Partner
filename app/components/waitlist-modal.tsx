"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import WaitlistForm from "./waitlist-form";

interface WaitlistModalProps {
  open: boolean;
  onClose: () => void;
  waitlistCount: number;
  referralCode?: string;
}

const perks = [
  { emoji: "💎", text: "All premium features free for 6 months" },
  { emoji: "🔔", text: "Control how often they get nagged" },
  { emoji: "🎭", text: "First pick of nagging personas" },
  { emoji: "🏆", text: "Vote on new personas & features" },
];

export default function WaitlistModal({
  open,
  onClose,
  waitlistCount,
  referralCode,
}: WaitlistModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  // Close on backdrop click
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
        onClose();
      }
    },
    [onClose]
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-label="Join the waitlist"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* Modal content — slides up on mobile, scales in on desktop */}
          <motion.div
            ref={contentRef}
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="relative w-full sm:max-w-md mx-0 sm:mx-4 bg-surface border border-border rounded-t-2xl sm:rounded-2xl p-6 sm:p-8 shadow-2xl max-h-[90svh] overflow-y-auto"
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

            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2 font-[family-name:var(--font-display)]">
                Get in early.
                <br />
                <span className="text-accent">Get it free.</span>
              </h2>
              <p className="text-sm text-text-secondary">
                First 1,000 users get exclusive perks
              </p>
            </div>

            {/* Perks list */}
            <div className="flex flex-col gap-2.5 mb-6">
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

            {/* Form */}
            <WaitlistForm
              variant="footer"
              waitlistCount={waitlistCount}
              referralCode={referralCode}
            />

            {/* Trust line */}
            <p className="text-center text-xs text-text-secondary mt-4 opacity-70">
              No spam. Unsubscribe anytime.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
