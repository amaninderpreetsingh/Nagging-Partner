"use client";

import PersonaTimeline from "./persona-timeline";
import ScrollAnimation from "./scroll-animation";

export default function PersonaShowcase() {
  return (
    <section aria-label="AI nagging personas" className="py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto px-6">
        <ScrollAnimation>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Meet your <span className="text-accent">naggers</span>
            </h2>
            <p className="text-lg text-text-secondary max-w-lg mx-auto">
              Three AI personas. One mission. Slide the timeline to see how
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
