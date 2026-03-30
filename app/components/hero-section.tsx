import WaitlistForm from "./waitlist-form";
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
      className="relative min-h-screen flex items-center py-16 md:py-24 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Copy + Form */}
          <div className="flex flex-col gap-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 w-fit">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm text-accent font-medium">
                Messages escalate as deadlines approach
              </span>
            </div>

            <div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-4">
                Tired of
                <br />
                <span className="text-accent">nagging people?</span>
              </h1>
              <p className="text-xl sm:text-2xl text-text-secondary max-w-lg leading-relaxed">
                Assign tasks to anyone. Pick a hilarious AI persona.
                <span className="text-text-primary font-medium">
                  {" "}
                  They get reminded until it&apos;s done.
                </span>
              </p>
            </div>

            {/* Social proof chips */}
            <div className="flex flex-wrap gap-3">
              {["👫 Partners", "🏠 Roommates", "💼 Coworkers", "👨‍👩‍👧 Parents"].map(
                (chip) => (
                  <span
                    key={chip}
                    className="px-3 py-1.5 rounded-full bg-surface border border-border text-sm text-text-secondary"
                  >
                    {chip}
                  </span>
                )
              )}
            </div>

            <WaitlistForm
              variant="hero"
              waitlistCount={waitlistCount}
              referralCode={referralCode}
            />
          </div>

          {/* Right: Phone mockup with notification stack */}
          <div className="flex justify-center lg:justify-end">
            <HeroPhonePreview />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <ScrollIndicator />
    </section>
  );
}
