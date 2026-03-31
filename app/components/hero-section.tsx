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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">
          {/* Left: Copy + Form */}
          <div className="flex flex-col gap-5 sm:gap-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 w-fit">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-xs sm:text-sm text-accent font-medium">
                Messages escalate as deadlines approach
              </span>
            </div>

            <div>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-3 sm:mb-4">
                Tired of
                <br />
                <span className="text-accent">nagging people?</span>
              </h1>
              <p className="text-lg sm:text-2xl text-text-secondary max-w-lg leading-relaxed">
                Assign tasks to anyone. Pick a hilarious AI persona.
                <span className="text-text-primary font-medium">
                  {" "}
                  They get reminded until it&apos;s done.
                </span>
              </p>
            </div>

            {/* Mobile: compact persona teaser — shows the fun immediately */}
            <div className="flex flex-col gap-2 lg:hidden" aria-label="Sample nagging messages">
              {[
                { emoji: "👵", quote: "I didn\u2019t raise you to live like this." },
                { emoji: "💅", quote: "I\u2019m not even mad. I\u2019m DISAPPOINTED." },
                { emoji: "🎖️", quote: "DROP AND GIVE ME A CLEAN BATHROOM!" },
              ].map((teaser) => (
                <div
                  key={teaser.emoji}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-surface/80 border border-border/60 text-sm"
                >
                  <span className="text-lg flex-shrink-0">{teaser.emoji}</span>
                  <span className="text-text-secondary italic truncate">
                    &ldquo;{teaser.quote}&rdquo;
                  </span>
                </div>
              ))}
            </div>

            {/* Desktop: social proof chips */}
            <div className="hidden lg:flex flex-wrap gap-3">
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

            <WaitlistCTAButton
              variant="hero"
              waitlistCount={waitlistCount}
              referralCode={referralCode}
            />
          </div>

          {/* Right: Phone mockup — hidden on mobile to keep hero tight */}
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
