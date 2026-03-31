import ScrollAnimation from "./scroll-animation";

const benefits = [
  {
    emoji: "💎",
    title: "6 months free premium",
    description: "All premium features unlocked at no cost for the first 6 months. No credit card required.",
  },
  {
    emoji: "🔔",
    title: "You control the nagging",
    description: "Set how often they get reminded — once a day, twice a day, or absolute chaos mode.",
  },
  {
    emoji: "🏆",
    title: "Shape the product",
    description: "Vote on new personas, suggest features, and help decide what gets built next.",
  },
];

interface BenefitsSectionProps {
  waitlistCount: number;
}

export default function BenefitsSection({ waitlistCount }: BenefitsSectionProps) {
  return (
    <section aria-label="Early access benefits" className="py-14 md:py-28">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
        <ScrollAnimation>
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-4xl font-bold mb-2 md:mb-4">
              Why join <span className="text-accent">early?</span>
            </h2>
            <p className="text-base md:text-lg text-text-secondary">
              Early access for the first{" "}
              <span className="text-text-primary font-semibold">1,000</span>{" "}
              users.
              {waitlistCount > 0 && (
                <span className="text-text-secondary">
                  {" "}<span className="text-accent font-semibold">
                    {waitlistCount.toLocaleString()}
                  </span>{" "}already on the list.
                </span>
              )}
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
          {benefits.map((benefit, i) => (
            <ScrollAnimation key={benefit.title} delay={i * 0.1}>
              {/* Mobile: compact horizontal row / Desktop: centered card */}
              <div className="flex items-start gap-4 md:flex-col md:items-center md:text-center rounded-2xl bg-surface border border-border p-4 md:p-6">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-accent/15 flex items-center justify-center text-xl md:text-2xl flex-shrink-0 md:mx-auto md:mb-4">
                  {benefit.emoji}
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-bold text-text-primary mb-1 md:mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {benefit.description}
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
