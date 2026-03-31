"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { personas } from "@/app/data/personas";

const timePoints = [
  { label: "Day 1", sublabel: "Friendly reminder", index: 0 },
  { label: "Day 3", sublabel: "Gentle nudge", index: 1 },
  { label: "Day 5", sublabel: "Getting impatient", index: 2 },
  { label: "Last Day", sublabel: "Full rage mode", index: 3 },
  { label: "Day 10+", sublabel: "Nuclear meltdown", index: 4 },
];

const toneStyles = {
  friendly: {
    bg: "bg-success/15",
    text: "text-success",
    border: "border-success/30",
    glow: "shadow-success/10",
    color: "#22C55E",
  },
  nudging: {
    bg: "bg-emerald-300/15",
    text: "text-emerald-300",
    border: "border-emerald-300/30",
    glow: "shadow-emerald-300/10",
    color: "#6EE7B7",
  },
  impatient: {
    bg: "bg-yellow-400/15",
    text: "text-yellow-400",
    border: "border-yellow-400/30",
    glow: "shadow-yellow-400/10",
    color: "#FACC15",
  },
  angry: {
    bg: "bg-error/15",
    text: "text-error",
    border: "border-error/30",
    glow: "shadow-error/10",
    color: "#EF4444",
  },
  nuclear: {
    bg: "bg-red-600/20",
    text: "text-red-400",
    border: "border-red-500/40",
    glow: "shadow-red-500/20",
    color: "#DC2626",
  },
};

const toneByIndex = [
  "friendly",
  "nudging",
  "impatient",
  "angry",
  "nuclear",
] as const;

export default function PersonaTimeline() {
  const [timeIndex, setTimeIndex] = useState(0);
  const [activePersona, setActivePersona] = useState(0);
  const currentTime = timePoints[timeIndex];
  const currentTone = toneByIndex[timeIndex];
  const currentColor = toneStyles[currentTone].color;

  return (
    <div className="w-full">
      {/* Current state label */}
      <div className="text-center mb-4 md:mb-6">
        <motion.div
          key={timeIndex}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2"
        >
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: currentColor }}
          />
          <span className="text-base md:text-lg font-bold text-text-primary">
            {currentTime.label}
          </span>
          <span className="text-base md:text-lg text-text-secondary">
            — {currentTime.sublabel}
          </span>
        </motion.div>
      </div>

      {/* Custom stepped progress bar */}
      <div
        className="max-w-sm md:max-w-lg mx-auto mb-6 md:mb-10 px-2"
        role="radiogroup"
        aria-label="Escalation timeline"
      >
        <div className="relative flex items-center justify-between">
          {/* Track background */}
          <div className="absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2 bg-border rounded-full" />
          {/* Track fill */}
          <motion.div
            className="absolute top-1/2 left-0 h-1 -translate-y-1/2 rounded-full"
            style={{ backgroundColor: currentColor }}
            animate={{ width: `${(timeIndex / (timePoints.length - 1)) * 100}%` }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          />

          {/* Step dots + labels */}
          {timePoints.map((point, i) => {
            const isActive = i === timeIndex;
            const isPast = i <= timeIndex;
            const stepColor = isPast
              ? toneStyles[toneByIndex[Math.min(i, timeIndex)]].color
              : undefined;

            return (
              <button
                key={point.label}
                onClick={() => setTimeIndex(i)}
                className="relative z-10 flex flex-col items-center gap-2 cursor-pointer group"
                role="radio"
                aria-checked={isActive}
                aria-label={`${point.label}: ${point.sublabel}`}
              >
                {/* Dot */}
                <motion.div
                  className="rounded-full border-2 transition-colors"
                  animate={{
                    width: isActive ? 20 : 12,
                    height: isActive ? 20 : 12,
                    borderColor: isPast ? (stepColor ?? "#262626") : "#262626",
                    backgroundColor: isPast
                      ? isActive
                        ? (stepColor ?? "#262626")
                        : (stepColor ?? "#262626")
                      : "#0a0a0a",
                  }}
                  transition={{ duration: 0.25 }}
                  style={{
                    boxShadow: isActive
                      ? `0 0 12px ${currentColor}40`
                      : "none",
                  }}
                />
                {/* Label */}
                <span
                  className={`text-[10px] md:text-xs font-medium transition-colors whitespace-nowrap ${
                    isActive
                      ? "text-text-primary"
                      : "text-text-secondary group-hover:text-text-primary"
                  }`}
                >
                  {point.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ===== MOBILE: Tabbed persona selector ===== */}
      <div className="md:hidden">
        {/* Persona tabs */}
        <div className="flex gap-2 mb-4 justify-center">
          {personas.map((persona, i) => {
            const message = persona.messages[timeIndex];
            const styles = toneStyles[message.tone];
            const isActive = i === activePersona;

            return (
              <button
                key={persona.id}
                onClick={() => setActivePersona(i)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  isActive
                    ? `${styles.bg} ${styles.border} border ${styles.text}`
                    : "bg-surface border border-border text-text-secondary"
                }`}
                aria-pressed={isActive}
              >
                <span className="text-lg">{persona.emoji}</span>
                <span className="hidden sm:inline">
                  {persona.name.split(" ").pop()}
                </span>
              </button>
            );
          })}
        </div>

        {/* Single active card */}
        <AnimatePresence mode="wait">
          {(() => {
            const persona = personas[activePersona];
            const message = persona.messages[timeIndex];
            const styles = toneStyles[message.tone];

            return (
              <motion.div
                key={`${persona.id}-${timeIndex}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className={`rounded-2xl border ${styles.border} bg-surface p-4 shadow-lg ${styles.glow}`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`w-9 h-9 rounded-xl ${styles.bg} flex items-center justify-center text-xl`}
                  >
                    {persona.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-text-primary">
                      {persona.name}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {persona.description}
                    </p>
                  </div>
                </div>

                <div className={`rounded-xl ${styles.bg} p-3`}>
                  <p className="text-sm text-text-primary leading-relaxed">
                    &ldquo;{message.text}&rdquo;
                  </p>
                </div>
              </motion.div>
            );
          })()}
        </AnimatePresence>
      </div>

      {/* ===== DESKTOP: 3-column grid ===== */}
      <div className="hidden md:grid md:grid-cols-3 gap-4">
        <AnimatePresence mode="wait">
          {personas.map((persona, i) => {
            const message = persona.messages[timeIndex];
            const styles = toneStyles[message.tone];

            return (
              <motion.div
                key={`${persona.id}-${timeIndex}`}
                initial={{ opacity: 0, y: 15, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.97 }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
                className={`rounded-2xl border ${styles.border} bg-surface p-5 shadow-lg ${styles.glow}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-11 h-11 rounded-xl ${styles.bg} flex items-center justify-center text-2xl`}
                  >
                    {persona.emoji}
                  </div>
                  <div className="flex-1">
                    <p className="text-base font-bold text-text-primary">
                      {persona.name}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {persona.description}
                    </p>
                  </div>
                </div>

                <div className={`rounded-xl ${styles.bg} p-4`}>
                  <p className="text-sm text-text-primary leading-relaxed">
                    &ldquo;{message.text}&rdquo;
                  </p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Hint */}
      <p className="text-center text-xs text-text-secondary mt-4 md:mt-6 opacity-60">
        <span className="md:hidden">Tap a persona, then pick a day</span>
        <span className="hidden md:inline">Click a day</span>
        {" "}to see how messages escalate
      </p>
    </div>
  );
}
