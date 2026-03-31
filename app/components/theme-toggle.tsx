"use client";

import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("theme") as "dark" | "light" | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.classList.toggle("light", saved === "light");
    }
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.classList.toggle("light", next === "light");
  };

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      className={`fixed top-4 right-4 z-50 w-16 h-9 rounded-full p-1 transition-colors duration-300 cursor-pointer shadow-lg ${
        isDark
          ? "bg-gray-800 border border-gray-600"
          : "bg-amber-100 border border-amber-300"
      }`}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {/* Track icons */}
      <div className="relative w-full h-full">
        {/* Sun (left side) */}
        <div className={`absolute left-0.5 top-1/2 -translate-y-1/2 transition-opacity duration-300 ${isDark ? "opacity-30" : "opacity-100"}`}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={isDark ? "#9CA3AF" : "#D97706"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
          </svg>
        </div>

        {/* Moon (right side) */}
        <div className={`absolute right-0.5 top-1/2 -translate-y-1/2 transition-opacity duration-300 ${isDark ? "opacity-100" : "opacity-30"}`}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={isDark ? "#93C5FD" : "#9CA3AF"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </svg>
        </div>

        {/* Sliding thumb */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 w-7 h-7 rounded-full shadow-md transition-all duration-300 ${
            isDark
              ? "left-0 bg-gray-950"
              : "left-[calc(100%-1.75rem)] bg-white"
          }`}
        />
      </div>
    </button>
  );
}
