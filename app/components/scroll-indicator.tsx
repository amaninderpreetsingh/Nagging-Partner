"use client";

import { motion, useReducedMotion } from "motion/react";

export default function ScrollIndicator() {
  const shouldReduceMotion = useReducedMotion();

  const handleClick = () => {
    const problemSection = document.querySelector("section:nth-of-type(2)");
    problemSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 1.5 }}
      onClick={handleClick}
      className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 cursor-pointer flex flex-col items-center gap-1.5 text-text-secondary hover:text-accent transition-colors p-2"
      aria-label="Scroll down to learn more"
    >
      <span className="text-[11px] md:text-xs font-medium tracking-wide uppercase">
        See how it works
      </span>
      <motion.svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={shouldReduceMotion ? {} : { y: [0, 6, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <path d="m6 9 6 6 6-6" />
      </motion.svg>
    </motion.button>
  );
}
