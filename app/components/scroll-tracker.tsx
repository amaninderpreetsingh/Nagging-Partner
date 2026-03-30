"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/app/lib/analytics";

const MILESTONES = [25, 50, 75, 100] as const;

export default function ScrollTracker() {
  const firedRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;

      const percent = Math.round((window.scrollY / scrollHeight) * 100);

      for (const milestone of MILESTONES) {
        if (percent >= milestone && !firedRef.current.has(milestone)) {
          firedRef.current.add(milestone);
          trackEvent({
            name: "scroll_depth",
            properties: { milestone },
          });
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return null;
}
