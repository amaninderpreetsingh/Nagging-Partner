"use client";

import { personas } from "@/app/data/personas";
import PersonaCard from "./persona-card";
import ScrollAnimation from "./scroll-animation";

export default function PersonaShowcase() {
  return (
    <section aria-label="AI nagging personas" className="py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto px-6">
        <ScrollAnimation>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Pick your <span className="text-accent">nagger</span>
            </h2>
            <p className="text-lg text-text-secondary max-w-lg mx-auto">
              Each persona has a unique voice — and they get meaner the longer
              you wait.
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {personas.map((persona, i) => (
            <ScrollAnimation key={persona.id} delay={i * 0.15}>
              <PersonaCard persona={persona} />
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
