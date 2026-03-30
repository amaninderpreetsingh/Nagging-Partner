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
      className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer text-text-secondary hover:text-accent transition-colors p-2"
      aria-label="Scroll down to learn more"
    >
      <motion.svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={
          shouldReduceMotion ? {} : { y: [0, 8, 0] }
        }
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <path d="M12 5v14" />
        <path d="m19 12-7 7-7-7" />
      </motion.svg>
    </motion.button>
  );
}
