import HeroSection from "./components/hero-section";
import ProblemSection from "./components/problem-section";
import PersonaShowcase from "./components/persona-showcase";
import HowItWorks from "./components/how-it-works";
import BenefitsSection from "./components/benefits-section";
import FinalCTA from "./components/final-cta";

export default function Home() {
  // TODO: fetch from Supabase
  const waitlistCount = 0;

  return (
    <main className="min-h-screen">
      <div className="grain-overlay" />
      <HeroSection waitlistCount={waitlistCount} />
      <ProblemSection />
      <PersonaShowcase />
      <HowItWorks />
      <BenefitsSection waitlistCount={waitlistCount} />
      <FinalCTA />
    </main>
  );
}
