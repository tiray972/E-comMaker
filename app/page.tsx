import Link from 'next/link';
import { Button } from '@/components/ui/button';
import LandingHeader from '@/components/landing/header';
import LandingHero from '@/components/landing/hero';
import LandingFeatures from '@/components/landing/features';
import LandingTemplates from '@/components/landing/templates';
import LandingTestimonials from '@/components/landing/testimonials';
import LandingPricing from '@/components/landing/pricing';
import LandingCTA from '@/components/landing/cta';
import LandingFooter from '@/components/landing/footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <LandingHeader />
      <main className="flex-1">
        <LandingHero />
        <LandingFeatures />
        <LandingTemplates />
        <LandingTestimonials />
        <LandingPricing />
      </main>
      <LandingFooter />
    </div>
  );
}