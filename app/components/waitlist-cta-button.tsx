"use client";

import { useState } from "react";
import WaitlistModal from "./waitlist-modal";

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
  const [modalOpen, setModalOpen] = useState(false);

  const baseStyles =
    "inline-flex items-center justify-center font-semibold transition-colors cursor-pointer";

  const variantStyles = {
    hero: "w-full sm:w-auto h-13 px-8 rounded-xl bg-accent hover:bg-accent-hover text-white text-base",
    section:
      "w-full sm:w-auto h-12 px-8 rounded-xl bg-accent hover:bg-accent-hover text-white text-base",
    sticky:
      "w-full h-11 rounded-xl bg-accent hover:bg-accent-hover text-white text-sm",
  };

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className={`${baseStyles} ${variantStyles[variant]} ${className || ""}`}
      >
        Get Early Access — It&apos;s Free
      </button>

      {variant === "hero" && waitlistCount > 0 && (
        <p className="text-sm text-text-secondary mt-2">
          Join{" "}
          <span className="text-text-primary font-semibold">
            {waitlistCount.toLocaleString()}
          </span>{" "}
          others on the waitlist
        </p>
      )}

      <WaitlistModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        waitlistCount={waitlistCount}
        referralCode={referralCode}
      />
    </>
  );
}
