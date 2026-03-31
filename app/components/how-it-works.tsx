import ScrollAnimation from "./scroll-animation";

const steps = [
  {
    number: "01",
    emoji: "📋",
    title: "Assign a task",
    description:
      "Pick someone — your partner, roommate, coworker, kid. Give them a task with a deadline.",
  },
  {
    number: "02",
    emoji: "🎭",
    title: "Choose a persona",
    description:
      "Old Grandma? Drunk Irish Guy? Military Sergeant? Pick who does the nagging.",
  },
  {
    number: "03",
    emoji: "🔔",
    title: "They get nagged",
    description:
      "AI sends push notifications in character. You choose how often — and the longer they wait, the meaner it gets.",
  },
];

export default function HowItWorks() {
  return (
    <section aria-label="How it works" className="py-14 md:py-28 bg-surface">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
        <ScrollAnimation>
          <div className="text-center mb-8 md:mb-14">
            <h2 className="text-2xl sm:text-4xl font-bold mb-2 md:mb-4">
              How it <span className="text-accent">works</span>
            </h2>
            <p className="text-base md:text-lg text-text-secondary">
              Three steps. Zero guilt.
            </p>
          </div>
        </ScrollAnimation>

        {/* Mobile: compact horizontal list / Desktop: 3-col grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-px bg-border" />

          {steps.map((step, i) => (
            <ScrollAnimation key={step.number} delay={i * 0.15}>
              {/* Mobile: horizontal row layout / Desktop: centered column */}
              <div className="relative flex items-start gap-4 md:flex-col md:items-center md:text-center">
                <div className="w-11 h-11 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-accent/15 flex items-center justify-center text-xl md:text-2xl flex-shrink-0 md:mb-5 relative z-10">
                  {step.emoji}
                </div>
                <div>
                  <span className="text-xs font-bold text-accent tracking-widest uppercase">
                    Step {step.number}
                  </span>
                  <h3 className="text-base md:text-xl font-bold text-text-primary mt-0.5 md:mt-2 mb-1 md:mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed max-w-xs">
                    {step.description}
                  </p>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
