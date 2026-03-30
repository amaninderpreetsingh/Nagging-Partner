"use client";

import { motion, useReducedMotion } from "motion/react";
import { personas } from "@/app/data/personas";

const notifications = [
  { persona: personas[2], messageIndex: 2, time: "11:58 PM" },
  { persona: personas[1], messageIndex: 1, time: "2:47 PM" },
  { persona: personas[0], messageIndex: 0, time: "9:00 AM" },
];

const toneColors = {
  friendly: "border-success/30",
  impatient: "border-yellow-400/30",
  angry: "border-error/30",
};

export default function HeroPhonePreview() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative w-full max-w-sm">
      {/* Phone frame */}
      <div className="relative bg-[#0f0f0f] rounded-[2.5rem] border-2 border-[#2a2a2a] p-3 shadow-2xl shadow-black/60">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#0f0f0f] rounded-b-2xl z-10" />

        {/* Screen */}
        <div className="bg-background rounded-[2rem] overflow-hidden min-h-[480px] flex flex-col">
          {/* Status bar */}
          <div className="flex items-center justify-between px-6 pt-8 pb-3">
            <span className="text-xs text-text-secondary font-medium">
              9:41
            </span>
            <div className="flex items-center gap-1">
              <div className="w-4 h-2 border border-text-secondary rounded-sm">
                <div className="w-3/4 h-full bg-success rounded-sm" />
              </div>
            </div>
          </div>

          {/* Lock screen text */}
          <div className="text-center px-6 mb-6">
            <p className="text-3xl font-bold text-text-primary">
              Tuesday
            </p>
            <p className="text-sm text-text-secondary mt-0.5">March 29</p>
          </div>

          {/* Notification stack */}
          <div className="flex-1 flex flex-col gap-2 px-3 pb-6">
            {notifications.map((notif, i) => {
              const message = notif.persona.messages[notif.messageIndex];
              const borderColor = toneColors[message.tone];

              return (
                <motion.div
                  key={notif.persona.id}
                  initial={
                    shouldReduceMotion
                      ? { opacity: 1 }
                      : { opacity: 0, y: 30, scale: 0.95 }
                  }
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: shouldReduceMotion ? 0 : 0.8 + i * 0.4,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                  className={`rounded-2xl bg-surface/90 backdrop-blur-sm border ${borderColor} p-3`}
                >
                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center text-base flex-shrink-0 mt-0.5">
                      {notif.persona.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-text-primary">
                          The Nagging Partner
                        </span>
                        <span className="text-[10px] text-text-secondary">
                          {notif.time}
                        </span>
                      </div>
                      <p className="text-xs font-medium text-text-primary mt-0.5">
                        {notif.persona.name}
                      </p>
                      <p className="text-[11px] text-text-secondary mt-0.5 leading-snug line-clamp-2">
                        {message.text}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
