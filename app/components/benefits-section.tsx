import ScrollAnimation from "./scroll-animation";

const benefits = [
  {
    emoji: "🎭",
    title: "First to pick your persona",
    description: "Early users get priority access to choose their nagger before everyone else.",
  },
  {
    emoji: "💸",
    title: "Free forever tier",
    description: "Join now and lock in a free plan for life. No credit card, no catch.",
  },
  {
    emoji: "🏆",
    title: "Shape the product",
    description: "Early users get to vote on new personas and features. Your feedback builds the app.",
  },
];

interface BenefitsSectionProps {
  waitlistCount: number;
}

export default function BenefitsSection({ waitlistCount }: BenefitsSectionProps) {
  return (
    <section aria-label="Early access benefits" className="py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto px-6">
        <ScrollAnimation>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Why join <span className="text-accent">early?</span>
            </h2>
            <p className="text-lg text-text-secondary mb-2">
              Early access for the first{" "}
              <span className="text-text-primary font-semibold">1,000</span>{" "}
              users.
            </p>
            {waitlistCount > 0 && (
              <p className="text-sm text-text-secondary">
                <span className="text-accent font-semibold">
                  {waitlistCount.toLocaleString()}
                </span>{" "}
                already on the list
              </p>
            )}
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((benefit, i) => (
            <ScrollAnimation key={benefit.title} delay={i * 0.1}>
              <div className="rounded-2xl bg-surface border border-border p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center text-2xl mx-auto mb-4">
                  {benefit.emoji}
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
