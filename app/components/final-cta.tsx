import ScrollAnimation from "./scroll-animation";
import WaitlistForm from "./waitlist-form";

interface FinalCTAProps {
  waitlistCount: number;
  referralCode?: string;
}

export default function FinalCTA({ waitlistCount, referralCode }: FinalCTAProps) {
  return (
    <section id="final-cta" className="py-20 md:py-28 bg-surface">
      <div className="max-w-[1200px] mx-auto px-6">
        <ScrollAnimation>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Don&apos;t make us send{" "}
              <span className="text-accent">Grandma</span> after you.
            </h2>
            <p className="text-lg text-text-secondary mb-8">
              Join the waitlist now. Your people aren&apos;t going to nag
              themselves.
            </p>

            <div className="max-w-md mx-auto">
              <WaitlistForm
                variant="footer"
                waitlistCount={waitlistCount}
                referralCode={referralCode}
              />
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
