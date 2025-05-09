"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function LandingCTA() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4 mx-auto">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-primary/90 to-primary/70 rounded-3xl overflow-hidden shadow-xl">
          <div className="relative px-6 py-12 md:p-16 text-white">
            <div className="absolute inset-0 bg-grid-white/[0.05] -z-10" 
                 style={{
                   backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(255 255 255 / 0.05)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`
                 }} />
            
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Ready to create your beautiful website?
              </h2>
              <p className="text-primary-foreground/90 text-lg mb-8">
                Join thousands of businesses already using our platform to build stunning websites. Get started for free today!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/register">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                    Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/templates">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 hover:text-white w-full sm:w-auto">
                    Explore Templates
                  </Button>
                </Link>
              </div>
              <p className="text-primary-foreground/80 text-sm mt-4">
                No credit card required. 14-day free trial.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}