"use client";

import { useState } from "react";
import { motion } from "motion/react";
import type { Persona } from "@/app/data/personas";

interface PersonaCardProps {
  persona: Persona;
}

const toneColors = {
  friendly: "text-success",
  impatient: "text-yellow-400",
  angry: "text-error",
};

const toneBg = {
  friendly: "bg-success/10",
  impatient: "bg-yellow-400/10",
  angry: "bg-error/10",
};

export default function PersonaCard({ persona }: PersonaCardProps) {
  const [showAlt, setShowAlt] = useState(false);

  return (
    <motion.div
      className="rounded-2xl bg-surface border border-border p-6 cursor-pointer select-none"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      onClick={() => setShowAlt(!showAlt)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setShowAlt(!showAlt);
        }
      }}
      role="button"
      tabIndex={0}
      aria-expanded={showAlt}
      aria-label={`${persona.name} persona card. Click to ${showAlt ? "hide" : "show"} alternate message.`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center text-2xl">
          {persona.emoji}
        </div>
        <div>
          <h3 className="text-lg font-bold text-text-primary">
            {persona.name}
          </h3>
          <p className="text-sm text-text-secondary">{persona.description}</p>
        </div>
      </div>

      {/* Escalation timeline */}
      <div className="space-y-3 mb-4">
        {persona.messages.map((msg) => (
          <div key={msg.label} className="flex gap-3">
            <div className="flex flex-col items-center">
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded-full ${toneBg[msg.tone]} ${toneColors[msg.tone]}`}
              >
                {msg.label}
              </span>
              {msg.label !== "Overdue" && (
                <div className="w-px h-full bg-border mt-1" />
              )}
            </div>
            <div className="flex-1 rounded-lg bg-background/50 border border-border/50 p-3">
              <p className="text-sm text-text-secondary leading-relaxed">
                &ldquo;{msg.text}&rdquo;
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Alt message on hover/tap */}
      {showAlt && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="pt-3 border-t border-border"
        >
          <p className="text-sm text-accent italic">
            &ldquo;{persona.altMessage}&rdquo;
          </p>
        </motion.div>
      )}

      <p className="text-xs text-text-secondary mt-3 text-center">
        {showAlt ? "Tap to collapse" : "Tap to see more"}
      </p>
    </motion.div>
  );
}
