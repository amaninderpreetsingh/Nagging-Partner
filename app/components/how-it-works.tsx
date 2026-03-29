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
      "AI sends push notifications in character. The longer they wait, the meaner it gets.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 md:py-28 bg-surface">
      <div className="max-w-[1200px] mx-auto px-6">
        <ScrollAnimation>
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              How it <span className="text-accent">works</span>
            </h2>
            <p className="text-lg text-text-secondary">
              Three steps. Zero guilt.
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-px bg-border" />

          {steps.map((step, i) => (
            <ScrollAnimation key={step.number} delay={i * 0.15}>
              <div className="relative flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-2xl bg-accent/15 flex items-center justify-center text-2xl mb-5 relative z-10">
                  {step.emoji}
                </div>
                <span className="text-xs font-bold text-accent tracking-widest uppercase mb-2">
                  Step {step.number}
                </span>
                <h3 className="text-xl font-bold text-text-primary mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
