"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { personas } from "@/app/data/personas";

const timePoints = [
  { label: "Day 1", sublabel: "Friendly reminder", index: 0 },
  { label: "Day 3", sublabel: "Getting impatient", index: 1 },
  { label: "Overdue", sublabel: "Full rage mode", index: 2 },
];

const toneStyles = {
  friendly: {
    bg: "bg-success/15",
    text: "text-success",
    border: "border-success/30",
    glow: "shadow-success/10",
    color: "#22C55E",
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
};

export default function PersonaTimeline() {
  const [timeIndex, setTimeIndex] = useState(0);
  const currentTime = timePoints[timeIndex];
  const currentTone = timeIndex === 0 ? "friendly" : timeIndex === 1 ? "impatient" : "angry";
  const currentColor = toneStyles[currentTone].color;

  return (
    <div className="w-full">
      {/* Current state label */}
      <div className="text-center mb-6">
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
          <span className="text-lg font-bold text-text-primary">
            {currentTime.label}
          </span>
          <span className="text-lg text-text-secondary">
            — {currentTime.sublabel}
          </span>
        </motion.div>
      </div>

      {/* Range slider */}
      <div className="max-w-sm mx-auto mb-10 px-2">
        <input
          type="range"
          min={0}
          max={2}
          step={1}
          value={timeIndex}
          onChange={(e) => setTimeIndex(Number(e.target.value))}
          className="w-full h-2 rounded-full appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-6
            [&::-webkit-slider-thumb]:h-6
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:border-2
            [&::-webkit-slider-thumb]:border-white
            [&::-webkit-slider-thumb]:shadow-lg
            [&::-webkit-slider-thumb]:cursor-grab
            [&::-webkit-slider-thumb]:active:cursor-grabbing
            [&::-moz-range-thumb]:w-6
            [&::-moz-range-thumb]:h-6
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:border-2
            [&::-moz-range-thumb]:border-white
            [&::-moz-range-thumb]:shadow-lg
            [&::-moz-range-thumb]:cursor-grab"
          style={{
            background: `linear-gradient(to right, ${currentColor} ${(timeIndex / 2) * 100}%, #262626 ${(timeIndex / 2) * 100}%)`,
            // Thumb color via CSS custom property
            // @ts-expect-error CSS custom property
            "--thumb-color": currentColor,
          }}
          aria-label="Escalation timeline"
          aria-valuetext={`${currentTime.label}: ${currentTime.sublabel}`}
        />

        {/* Labels */}
        <div className="flex justify-between mt-2">
          {timePoints.map((point, i) => (
            <button
              key={point.label}
              onClick={() => setTimeIndex(i)}
              className={`text-xs font-medium transition-colors cursor-pointer ${
                i === timeIndex ? "text-text-primary" : "text-text-secondary hover:text-text-primary"
              }`}
            >
              {point.label}
            </button>
          ))}
        </div>
      </div>

      {/* Persona notification cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                {/* Notification header */}
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

                {/* Message bubble */}
                <div className={`rounded-xl ${styles.bg} p-4`}>
                  <p className="text-sm text-text-primary leading-relaxed">
                    &ldquo;{message.text}&rdquo;
                  </p>
                </div>

                {/* Tone indicator */}
                <div className="flex items-center gap-2 mt-3">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: styles.color }}
                  />
                  <span className={`text-xs font-medium ${styles.text}`}>
                    {currentTime.sublabel}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Hint */}
      <p className="text-center text-xs text-text-secondary mt-6 opacity-60">
        Drag the slider to see how messages escalate
      </p>
    </div>
  );
}
