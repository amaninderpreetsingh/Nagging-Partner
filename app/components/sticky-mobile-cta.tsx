"use client";

import { useState, useEffect } from "react";

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const heroEl = document.querySelector("section");
    const footerCta = document.getElementById("final-cta");

    if (!heroEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === heroEl) {
            // Show when hero is NOT intersecting (scrolled past)
            setVisible((prev) => {
              const footerVisible = footerCta
                ? footerCta.getBoundingClientRect().top < window.innerHeight
                : false;
              return !entry.isIntersecting && !footerVisible;
            });
          }
        });
      },
      { threshold: 0 }
    );

    const footerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(false);
          } else {
            // Re-check if hero is past
            const heroRect = heroEl.getBoundingClientRect();
            if (heroRect.bottom < 0) {
              setVisible(true);
            }
          }
        });
      },
      { threshold: 0 }
    );

    observer.observe(heroEl);
    if (footerCta) footerObserver.observe(footerCta);

    return () => {
      observer.disconnect();
      footerObserver.disconnect();
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-background/90 backdrop-blur-sm border-t border-border md:hidden">
      <a
        href="#waitlist-form-hero"
        className="block w-full h-11 flex items-center justify-center rounded-lg bg-accent hover:bg-accent-hover text-white font-semibold transition-colors"
      >
        Get Early Access
      </a>
    </div>
  );
}
