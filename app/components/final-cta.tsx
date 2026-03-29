import ScrollAnimation from "./scroll-animation";

export default function FinalCTA() {
  return (
    <section className="py-20 md:py-28 bg-surface">
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

            {/* Form placeholder — will be replaced with WaitlistForm */}
            <div id="waitlist-form-footer" className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 h-12 px-4 rounded-lg bg-background border border-border text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
                />
                <button className="h-12 px-6 rounded-lg bg-accent hover:bg-accent-hover text-white font-semibold transition-colors whitespace-nowrap cursor-pointer">
                  Get Early Access
                </button>
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
