import NotificationPreview from "./notification-preview";

interface HeroSectionProps {
  waitlistCount: number;
}

export default function HeroSection({ waitlistCount }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center py-12 md:py-20">
      <div className="w-full max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy + Form */}
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 w-fit">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm text-accent font-medium">
                Personas get meaner as your deadline approaches
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
              Stop nagging.{" "}
              <span className="text-accent">Let AI do it.</span>
            </h1>

            <p className="text-lg sm:text-xl text-text-secondary max-w-lg leading-relaxed">
              Assign tasks to your partner, roommate, coworker, or kids. Pick an
              AI persona. They get nagged until it&apos;s done.
            </p>

            {/* Form placeholder — will be replaced with WaitlistForm */}
            <div id="waitlist-form-hero" className="flex flex-col gap-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 h-12 px-4 rounded-lg bg-surface border border-border text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
                />
                <button className="h-12 px-6 rounded-lg bg-accent hover:bg-accent-hover text-white font-semibold transition-colors whitespace-nowrap cursor-pointer">
                  Get Early Access
                </button>
              </div>
              {waitlistCount > 0 && (
                <p className="text-sm text-text-secondary">
                  Join{" "}
                  <span className="text-text-primary font-semibold">
                    {waitlistCount.toLocaleString()}
                  </span>{" "}
                  others on the waitlist
                </p>
              )}
            </div>
          </div>

          {/* Right: Notification Preview */}
          <div className="flex justify-center lg:justify-end">
            <NotificationPreview />
          </div>
        </div>
      </div>
    </section>
  );
}
