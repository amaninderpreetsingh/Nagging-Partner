import NotificationPreview from "./notification-preview";
import WaitlistForm from "./waitlist-form";

interface HeroSectionProps {
  waitlistCount: number;
  referralCode?: string;
}

export default function HeroSection({ waitlistCount, referralCode }: HeroSectionProps) {
  return (
    <section aria-label="Join the waitlist" className="relative min-h-screen flex items-center py-12 md:py-20">
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

            <WaitlistForm
              variant="hero"
              waitlistCount={waitlistCount}
              referralCode={referralCode}
            />
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
