"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { personas } from "@/app/data/personas";

const toneStyles = {
  friendly: { border: "border-success/40", bg: "bg-success/10", glow: "shadow-success/5", accent: "#22C55E" },
  nudging: { border: "border-emerald-300/40", bg: "bg-emerald-300/10", glow: "shadow-emerald-300/5", accent: "#6EE7B7" },
  impatient: { border: "border-yellow-400/40", bg: "bg-yellow-400/10", glow: "shadow-yellow-400/5", accent: "#FACC15" },
  angry: { border: "border-error/40", bg: "bg-error/10", glow: "shadow-error/5", accent: "#EF4444" },
  nuclear: { border: "border-red-500/50", bg: "bg-red-600/15", glow: "shadow-red-500/10", accent: "#DC2626" },
};

const timeLabels = ["Now", "2 hours later", "5 hours later", "Last day", "Overdue"];

export default function HeroPhonePreview() {
  const [activePersona, setActivePersona] = useState(0);
  const [visibleMessages, setVisibleMessages] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const persona = personas[activePersona];
  const totalMessages = persona.messages.length;

  const playSequence = useCallback(() => {
    setVisibleMessages(0);
    setIsTyping(false);

    let step = 0;

    const showNext = () => {
      if (step >= totalMessages) {
        // Pause at the end, then reset
        timeoutRef.current = setTimeout(() => {
          setVisibleMessages(0);
          setIsTyping(false);
          step = 0;
          timeoutRef.current = setTimeout(showNext, 1200);
        }, 8000);
        return;
      }

      // Show typing indicator
      setIsTyping(true);

      // Reveal message after typing delay per step
      const typingDelays = [800, 2000, 1900, 1800, 1800];
      const typingDelay = typingDelays[step] ?? 1400;
      timeoutRef.current = setTimeout(() => {
        setIsTyping(false);
        setVisibleMessages(step + 1);
        step++;

        // Delay before next message (shorter as urgency increases)
        const pauseDelay = Math.max(2500, 4000 - step * 350);
        timeoutRef.current = setTimeout(showNext, pauseDelay);
      }, typingDelay);
    };

    timeoutRef.current = setTimeout(showNext, 1000);
  }, [totalMessages]);

  useEffect(() => {
    playSequence();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [playSequence, activePersona]);

  const handlePersonaSwitch = (index: number) => {
    if (index === activePersona) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActivePersona(index);
  };

  // Current tone based on last visible message
  const currentToneKey = visibleMessages > 0
    ? persona.messages[visibleMessages - 1].tone
    : "friendly";
  const currentTone = toneStyles[currentToneKey];

  return (
    <div className="relative w-full max-w-sm">
      <div
        className={`relative rounded-2xl border ${currentTone.border} bg-surface/80 backdrop-blur-sm ${currentTone.glow} transition-colors duration-500 overflow-hidden`}
        style={{ boxShadow: "var(--card-shadow)" }}
      >
        {/* Task header */}
        <div className="px-5 pt-5 pb-3 border-b border-border/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-text-secondary font-medium uppercase tracking-wider">
              Assigned task
            </span>
            <span
              className="text-xs font-medium px-2 py-0.5 rounded-full transition-colors duration-500"
              style={{ color: currentTone.accent, backgroundColor: `${currentTone.accent}15` }}
            >
              {visibleMessages > 0 ? timeLabels[Math.min(visibleMessages - 1, timeLabels.length - 1)] : "Pending"}
            </span>
          </div>
          <p className="text-base font-semibold text-text-primary">
            Take out the trash 🗑️
          </p>
        </div>

        {/* Persona tabs */}
        <div className="flex gap-1 px-4 pt-3 pb-2">
          {personas.map((p, i) => {
            const isActive = i === activePersona;
            return (
              <button
                key={p.id}
                onClick={() => handlePersonaSwitch(i)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? "text-text-primary"
                    : "text-text-secondary hover:text-text-primary"
                }`}
                style={{ backgroundColor: isActive ? "var(--tab-active-bg)" : undefined }}
              >
                <span className="text-sm">{p.emoji}</span>
                <span className="hidden sm:inline">{p.name.split(" ").pop()}</span>
              </button>
            );
          })}
        </div>

        {/* Message stream */}
        <div className="px-4 pb-5 min-h-[320px] flex flex-col justify-end">
          <AnimatePresence mode="popLayout">
            {persona.messages.slice(0, visibleMessages).map((message, i) => {
              const tone = toneStyles[message.tone];
              return (
                <motion.div
                  key={`${persona.id}-${i}`}
                  initial={{ opacity: 0, y: 12, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                  className="mt-2.5"
                >
                  <div
                    className={`rounded-xl ${tone.bg} border ${tone.border} p-3 transition-colors`}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-sm">{persona.emoji}</span>
                      <span className="text-xs font-semibold text-text-primary">
                        {persona.name}
                      </span>
                      <span className="text-[10px] text-text-secondary ml-auto">
                        {timeLabels[i]}
                      </span>
                    </div>
                    <p className="text-[13px] text-text-primary/90 leading-relaxed">
                      &ldquo;{message.text}&rdquo;
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Typing indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="mt-2.5 flex items-center gap-2 px-3 py-2.5"
              >
                <span className="text-sm">{persona.emoji}</span>
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-text-secondary/60 animate-bounce [animation-delay:0ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-text-secondary/60 animate-bounce [animation-delay:150ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-text-secondary/60 animate-bounce [animation-delay:300ms]" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
