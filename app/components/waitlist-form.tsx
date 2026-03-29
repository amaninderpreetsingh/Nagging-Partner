"use client";

import { useState, useRef } from "react";
import SuccessState from "./success-state";

interface WaitlistFormProps {
  variant: "hero" | "footer";
  waitlistCount: number;
  referralCode?: string;
}

type FormState = "idle" | "loading" | "success" | "error" | "duplicate";

interface SuccessData {
  position: number;
  referralCode: string;
  referralUrl: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function WaitlistForm({
  variant,
  waitlistCount,
  referralCode,
}: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [validationError, setValidationError] = useState("");
  const [successData, setSuccessData] = useState<SuccessData | null>(null);
  const statusRef = useRef<HTMLDivElement>(null);

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
        } else {
          setFormState("error");
          setErrorMessage(data.error || "Something went wrong. Please try again.");
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
      } else {
        setFormState("success");
        setSuccessData({
          position: data.position,
          referralCode: data.referralCode,
          referralUrl: data.referralUrl,
        });
      }
    } catch {
      setFormState("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  if (formState === "success" && successData) {
    return <SuccessState {...successData} />;
  }

  if (formState === "duplicate" && successData) {
    return (
      <div className="text-center">
        <p className="text-lg font-semibold text-text-primary mb-2">
          You&apos;re already on the list! 🎉
        </p>
        <SuccessState {...successData} />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3" noValidate>
      <div className={`flex ${variant === "footer" ? "flex-col sm:flex-row" : "flex-col sm:flex-row"} gap-3`}>
        <div className="flex-1 flex flex-col">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => validateEmail(email)}
            placeholder="Enter your email"
            disabled={formState === "loading"}
            aria-invalid={!!validationError}
            aria-describedby={validationError ? `${variant}-email-error` : undefined}
            className="h-12 px-4 rounded-lg bg-surface border border-border text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors disabled:opacity-50"
          />
          {validationError && (
            <p
              id={`${variant}-email-error`}
              className="text-sm text-error mt-1"
              role="alert"
            >
              {validationError}
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={formState === "loading"}
          className="h-12 px-6 rounded-lg bg-accent hover:bg-accent-hover text-white font-semibold transition-colors whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {formState === "loading" ? (
            <span className="flex items-center gap-2">
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
      </div>

      {/* Status messages */}
      <div ref={statusRef} aria-live="polite">
        {formState === "error" && errorMessage && (
          <p className="text-sm text-error" role="alert">
            {errorMessage}
          </p>
        )}
      </div>

      {variant === "hero" && waitlistCount > 0 && formState === "idle" && (
        <p className="text-sm text-text-secondary">
          Join{" "}
          <span className="text-text-primary font-semibold">
            {waitlistCount.toLocaleString()}
          </span>{" "}
          others on the waitlist
        </p>
      )}
    </form>
  );
}
