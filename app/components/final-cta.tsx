import ScrollAnimation from "./scroll-animation";
import WaitlistCTAButton from "./waitlist-cta-button";

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
              Lock in lifetime premium for $5 — or join the free waitlist.
              {waitlistCount > 0 && (
                <span>
                  {" "}<span className="text-accent font-semibold">
                    {waitlistCount.toLocaleString()}
                  </span>{" "}already in.
                </span>
              )}
            </p>

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
