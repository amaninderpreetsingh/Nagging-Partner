import ScrollAnimation from "./scroll-animation";

export default function ProblemSection() {
  return (
    <section className="py-20 md:py-28 bg-surface">
      <div className="max-w-[1200px] mx-auto px-6">
        <ScrollAnimation>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              You asked them{" "}
              <span className="text-accent">three times</span> already.
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed mb-4">
              The dishes are still there. The trash is overflowing. That one task
              at work? Still &ldquo;in progress.&rdquo; You&apos;re tired of being the
              bad guy every time you remind someone.
            </p>
            <p className="text-lg text-text-primary leading-relaxed font-medium">
              What if AI did the nagging for you — and made it{" "}
              <span className="text-accent">actually funny?</span>
            </p>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
