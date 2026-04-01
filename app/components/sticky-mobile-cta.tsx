"use client";

import { useState, useEffect } from "react";
import WaitlistModal from "./waitlist-modal";

interface StickyMobileCTAProps {
  waitlistCount: number;
  referralCode?: string;
}

export default function StickyMobileCTA({
  waitlistCount,
  referralCode,
}: StickyMobileCTAProps) {
  const [visible, setVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const heroEl = document.querySelector("section");
    const footerCta = document.getElementById("final-cta");

    if (!heroEl) return;

    const targets = [heroEl, footerCta].filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      () => {
        const heroRect = heroEl.getBoundingClientRect();
        const footerVisible = footerCta
          ? footerCta.getBoundingClientRect().top < window.innerHeight
          : false;
        setVisible(heroRect.bottom < 0 && !footerVisible);
      },
      { threshold: 0 }
    );

    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  if (!visible) return null;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-40 px-4 py-3 bg-background border-t border-border md:hidden">
        <button
          onClick={() => setModalOpen(true)}
          className="block w-full h-11 flex items-center justify-center rounded-xl bg-accent hover:bg-accent-hover text-white text-sm font-semibold transition-all active:scale-[0.98] cursor-pointer"
          style={{ boxShadow: "var(--btn-shadow)" }}
        >
          Get Early Access — It&apos;s Free
        </button>
      </div>

      <WaitlistModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        waitlistCount={waitlistCount}
        referralCode={referralCode}
      />
    </>
  );
}
