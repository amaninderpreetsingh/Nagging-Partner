"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import SuccessState from "./success-state";
import { trackEvent } from "@/app/lib/analytics";

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

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FormState = "idle" | "loading" | "success" | "error" | "duplicate";

interface SuccessData {
  position: number;
  referralCode: string;
  referralUrl: string;
}

export default function WaitlistModal({
  open,
  onClose,
  waitlistCount,
  referralCode,
}: WaitlistModalProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  const [email, setEmail] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [validationError, setValidationError] = useState("");
  const [successData, setSuccessData] = useState<SuccessData | null>(null);

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

  const validateEmail = (value: string) => {
    if (!value) {
      setValidationError("");
      return;
    }
    if (!EMAIL_REGEX.test(value)) {
      setValidationError("Please enter a valid email address.");
    } else {
      setValidationError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !EMAIL_REGEX.test(email)) {
      setValidationError("Please enter a valid email address.");
      return;
    }

    setFormState("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          referredBy: referralCode || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 429) {
          setFormState("error");
          setErrorMessage(data.error || "Too many attempts. Please try again later.");
          trackEvent({ name: "form_error", properties: { type: "rate_limit" } });
        } else {
          setFormState("error");
          setErrorMessage(data.error || "Something went wrong. Please try again.");
          trackEvent({ name: "form_error", properties: { type: "server_error" } });
        }
        return;
      }

      if (data.isDuplicate) {
        setFormState("duplicate");
        setSuccessData({
          position: data.position,
          referralCode: data.referralCode,
          referralUrl: data.referralUrl,
        });
        trackEvent({ name: "form_error", properties: { type: "duplicate" } });
      } else {
        setFormState("success");
        setSuccessData({
          position: data.position,
          referralCode: data.referralCode,
          referralUrl: data.referralUrl,
        });
        trackEvent({
          name: "waitlist_signup",
          properties: { referralSource: referralCode || undefined },
        });
      }
    } catch {
      setFormState("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  const showForm = formState !== "success" && formState !== "duplicate";

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

            {showForm ? (
              <form onSubmit={handleSubmit} noValidate>
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

                {/* Email input */}
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => validateEmail(email)}
                  placeholder="Enter your email"
                  autoFocus
                  disabled={formState === "loading"}
                  aria-invalid={!!validationError}
                  aria-describedby={validationError ? "modal-email-error" : undefined}
                  className="w-full h-12 px-4 rounded-xl bg-white/[0.07] border border-white/[0.12] text-text-primary text-base placeholder:text-text-secondary/60 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all disabled:opacity-50"
                />
                {validationError && (
                  <p
                    id="modal-email-error"
                    className="text-sm text-error mt-1.5"
                    role="alert"
                  >
                    {validationError}
                  </p>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={formState === "loading"}
                  className="w-full h-12 mt-3 rounded-xl bg-accent hover:bg-accent-hover active:scale-[0.98] text-white font-semibold text-base transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {formState === "loading" ? (
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
                      Joining...
                    </span>
                  ) : (
                    "Get Early Access"
                  )}
                </button>

                {/* Error message */}
                <div aria-live="polite">
                  {formState === "error" && errorMessage && (
                    <p className="text-sm text-error mt-2" role="alert">
                      {errorMessage}
                    </p>
                  )}
                </div>

                {/* Social proof + trust */}
                <div className="text-center mt-4">
                  {waitlistCount > 0 && (
                    <p className="text-sm text-text-secondary mb-1">
                      Join{" "}
                      <span className="text-text-primary font-semibold">
                        {waitlistCount.toLocaleString()}+
                      </span>{" "}
                      others on the waitlist
                    </p>
                  )}
                  <p className="text-xs text-text-secondary opacity-60">
                    No spam. Unsubscribe anytime.
                  </p>
                </div>
              </form>
            ) : (
              <>
                {formState === "duplicate" && successData && (
                  <div className="text-center">
                    <p className="text-lg font-semibold text-text-primary mb-2">
                      You&apos;re already on the list!
                    </p>
                    <SuccessState {...successData} />
                  </div>
                )}
                {formState === "success" && successData && (
                  <SuccessState {...successData} />
                )}
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
