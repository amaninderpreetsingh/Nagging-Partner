import WaitlistCTAButton from "./waitlist-cta-button";
import HeroPhonePreview from "./hero-phone-preview";
import ScrollIndicator from "./scroll-indicator";

interface HeroSectionProps {
  waitlistCount: number;
  referralCode?: string;
}

export default function HeroSection({
  waitlistCount,
  referralCode,
}: HeroSectionProps) {
  return (
    <section
      aria-label="Join the waitlist"
      className="relative min-h-[calc(100svh-2rem)] lg:min-h-screen flex items-center py-10 md:py-24 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left: Copy + CTA */}
          <div className="flex flex-col gap-5 sm:gap-8">
            <div>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-3 sm:mb-4">
                Tired of
                <br />
                <span className="text-accent">nagging people?</span>
              </h1>
              <p className="text-lg sm:text-2xl text-text-secondary max-w-lg leading-relaxed">
                Assign tasks to anyone. Pick a hilarious AI persona.
                Nag them every{" "}
                <span className="text-accent font-semibold">5 minutes</span>,{" "}
                <span className="text-accent font-semibold">2 hours</span>, or{" "}
                <span className="text-accent font-semibold">once a day</span>
                {" "}— until it&apos;s done.
              </p>
            </div>

            {/* Social proof chips */}
            <div className="flex flex-wrap gap-3">
              {["👫 Partners", "🏠 Roommates", "💼 Coworkers", "👨‍👩‍👧 Parents"].map(
                (chip) => (
                  <span
                    key={chip}
                    className="px-3 py-1.5 rounded-full bg-surface border border-border text-sm text-text-secondary"
                    style={{ boxShadow: "var(--chip-shadow)" }}
                  >
                    {chip}
                  </span>
                )
              )}
            </div>

            <WaitlistCTAButton
              variant="hero"
              waitlistCount={waitlistCount}
              referralCode={referralCode}
            />
          </div>

          {/* Right: Escalation theater (desktop only) */}
          <div className="hidden lg:flex justify-end">
            <HeroPhonePreview />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <ScrollIndicator />
    </section>
  );
}
