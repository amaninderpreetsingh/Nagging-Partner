"use client";

import PersonaTimeline from "./persona-timeline";
import ScrollAnimation from "./scroll-animation";

export default function PersonaShowcase() {
  return (
    <section aria-label="AI nagging personas" className="py-14 md:py-28">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
        <ScrollAnimation>
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-4xl font-bold mb-2 md:mb-4">
              Meet your <span className="text-accent">naggers</span>
            </h2>
            <p className="text-base md:text-lg text-text-secondary max-w-lg mx-auto">
              Three AI personas. One mission. Slide to see how
              they escalate from friendly to furious.
            </p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation>
          <PersonaTimeline />
        </ScrollAnimation>
      </div>
    </section>
  );
}
