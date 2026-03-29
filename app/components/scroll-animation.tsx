"use client";

import { motion, useReducedMotion } from "motion/react";
import { ReactNode } from "react";

interface ScrollAnimationProps {
  children: ReactNode;
  direction?: "up" | "left" | "right";
  delay?: number;
  className?: string;
}

const directionMap = {
  up: { y: 40, x: 0 },
  left: { x: -40, y: 0 },
  right: { x: 40, y: 0 },
};

export default function ScrollAnimation({
  children,
  direction = "up",
  delay = 0,
  className,
}: ScrollAnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const { x, y } = directionMap[direction];

  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
