"use client";

import { useState } from "react";
import WaitlistModal from "./waitlist-modal";
import FoundingMemberModal from "./founding-member-modal";

interface WaitlistCTAButtonProps {
  waitlistCount: number;
  referralCode?: string;
  variant?: "hero" | "section" | "sticky";
  className?: string;
}

export default function WaitlistCTAButton({
  waitlistCount,
  referralCode,
  variant = "hero",
  className,
}: WaitlistCTAButtonProps) {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [foundingOpen, setFoundingOpen] = useState(false);

  const baseStyles =
    "inline-flex items-center justify-center font-semibold transition-all cursor-pointer active:scale-[0.98]";

  // Founding Member = primary (solid accent)
  const primaryStyles = {
    hero: "w-full sm:w-auto h-13 px-8 rounded-xl bg-accent hover:bg-accent-hover text-white text-base",
    section:
      "w-full sm:w-auto h-12 px-8 rounded-xl bg-accent hover:bg-accent-hover text-white text-base",
    sticky:
      "flex-1 h-11 rounded-xl bg-accent hover:bg-accent-hover text-white text-sm",
  };

  // Free waitlist = secondary (outlined)
  const secondaryStyles = {
    hero: "w-full sm:w-auto h-13 px-8 rounded-xl bg-white text-accent hover:bg-white/90 text-base",
    section:
      "w-full sm:w-auto h-12 px-8 rounded-xl bg-white text-accent hover:bg-white/90 text-base",
    sticky:
      "flex-1 h-11 rounded-xl bg-white text-accent hover:bg-white/90 text-sm",
  };

  return (
    <>
      <div
        className={
          variant === "sticky"
            ? "flex gap-2"
            : "flex flex-col sm:flex-row gap-3"
        }
      >
        <button
          onClick={() => setFoundingOpen(true)}
          className={`${baseStyles} ${primaryStyles[variant]} ${className || ""}`}
          style={{ boxShadow: "var(--btn-shadow)" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.boxShadow = "var(--btn-shadow-hover)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.boxShadow = "var(--btn-shadow)")
          }
        >
          {variant === "sticky" ? "$5 Lifetime" : "Founding Member — $5"}
        </button>
        <button
          onClick={() => setWaitlistOpen(true)}
          className={`${baseStyles} ${secondaryStyles[variant]}`}
        >
          {variant === "sticky" ? "Free Waitlist" : "Join Free Waitlist"}
        </button>
      </div>

      {variant === "hero" && waitlistCount > 0 && (
        <p className="text-sm text-text-secondary mt-2">
          Join{" "}
          <span className="text-text-primary font-semibold">
            {waitlistCount.toLocaleString()}
          </span>{" "}
          others on the waitlist
        </p>
      )}

      <FoundingMemberModal
        open={foundingOpen}
        onClose={() => setFoundingOpen(false)}
      />
      <WaitlistModal
        open={waitlistOpen}
        onClose={() => setWaitlistOpen(false)}
        waitlistCount={waitlistCount}
        referralCode={referralCode}
      />
    </>
  );
}
