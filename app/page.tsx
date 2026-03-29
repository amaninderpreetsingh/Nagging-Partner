import HeroSection from "./components/hero-section";
import ProblemSection from "./components/problem-section";
import PersonaShowcase from "./components/persona-showcase";
import HowItWorks from "./components/how-it-works";
import BenefitsSection from "./components/benefits-section";
import FinalCTA from "./components/final-cta";
import StickyMobileCTA from "./components/sticky-mobile-cta";

interface PageProps {
  searchParams: Promise<{ ref?: string }>;
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  const referralCode = params.ref;

  // Try to fetch waitlist count, fallback to 0
  let waitlistCount = 0;
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (baseUrl && baseUrl !== "https://your-project.supabase.co") {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/waitlist?select=*&limit=0`,
        {
          headers: {
            apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
            Prefer: "count=exact",
          },
          next: { revalidate: 60 },
        }
      );
      const count = res.headers.get("content-range")?.split("/")[1];
      if (count) waitlistCount = parseInt(count, 10);
    }
  } catch {
    // Fallback to 0
  }

  return (
    <main className="min-h-screen">
      <div className="grain-overlay" />
      <HeroSection waitlistCount={waitlistCount} referralCode={referralCode} />
      <ProblemSection />
      <PersonaShowcase />
      <HowItWorks />
      <BenefitsSection waitlistCount={waitlistCount} />
      <FinalCTA waitlistCount={waitlistCount} referralCode={referralCode} />
      <StickyMobileCTA />
    </main>
  );
}
