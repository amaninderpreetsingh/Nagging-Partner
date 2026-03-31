import ScrollAnimation from "./scroll-animation";
import WaitlistCTAButton from "./waitlist-cta-button";

const perks = [
  { emoji: "💎", text: "6 months free premium — no credit card" },
  { emoji: "🎭", text: "Exclusive early adopter pricing" },
  { emoji: "🏆", text: "Vote on new personas & features" },
];

interface FinalCTAProps {
  waitlistCount: number;
  referralCode?: string;
}

export default function FinalCTA({ waitlistCount, referralCode }: FinalCTAProps) {
  return (
    <section id="final-cta" className="py-14 md:py-28 bg-surface">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
        <ScrollAnimation>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-4xl font-bold mb-3 md:mb-4">
              Don&apos;t make us send{" "}
              <span className="text-accent">Grandma</span> after you.
            </h2>
            <p className="text-base md:text-lg text-text-secondary mb-6 md:mb-8">
              Join the waitlist. Early access for the first{" "}
              <span className="text-text-primary font-semibold">1,000</span>{" "}
              users.
              {waitlistCount > 0 && (
                <span>
                  {" "}<span className="text-accent font-semibold">
                    {waitlistCount.toLocaleString()}
                  </span>{" "}already in.
                </span>
              )}
            </p>

            {/* Perks */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-5 mb-8">
              {perks.map((perk) => (
                <div
                  key={perk.text}
                  className="flex items-center gap-2 text-sm text-text-secondary"
                >
                  <span className="text-base">{perk.emoji}</span>
                  <span>{perk.text}</span>
                </div>
              ))}
            </div>

            <WaitlistCTAButton
              variant="section"
              waitlistCount={0}
              referralCode={referralCode}
            />
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
