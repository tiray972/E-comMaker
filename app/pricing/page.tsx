"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

const plans = [
  {
    name: "Starter",
    price: 19,
    description: "Perfect for individuals and small businesses just getting started.",
    features: [
      "1 website",
      "100 pages",
      "5GB storage",
      "Free domain for 1 year",
      "Basic templates",
      "Community support",
    ],
    cta: "Get Started",
    ctaVariant: "outline",
    href: "/checkout?plan=starter",
    popular: false,
  },
  {
    name: "Professional",
    price: 49,
    description: "Everything you need for a growing business with more customization.",
    features: [
      "3 websites",
      "Unlimited pages",
      "20GB storage",
      "Free domain for 1 year",
      "All templates",
      "Priority support",
      "Advanced customization",
      "E-commerce (100 products)",
    ],
    cta: "Get Started",
    ctaVariant: "default",
    href: "/checkout?plan=professional",
    popular: true,
  },
  {
    name: "Enterprise",
    price: 99,
    description: "Advanced features for businesses needing more power and control.",
    features: [
      "10 websites",
      "Unlimited pages",
      "100GB storage",
      "Free domain for 1 year",
      "All templates",
      "24/7 Priority support",
      "Advanced customization",
      "E-commerce (unlimited products)",
      "API access",
      "White labeling",
    ],
    cta: "Contact Sales",
    ctaVariant: "outline",
    href: "/contact",
    popular: false,
  },
];

export default function PricingPage() {
  // Animation d'apparition
  const [show, setShow] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), 200);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-900 flex flex-col items-center py-12 px-2 relative">
      {/* Flèche retour en haut à gauche */}
      <Link href="/" className="absolute left-0 top-0 m-4">
        <Button variant="ghost" size="icon" aria-label="Retour à l'accueil">
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </Link>
      <h1 className="text-3xl md:text-4xl font-extrabold mb-2 text-center tracking-tight">
        Simple, transparent pricing
      </h1>
      <p className="text-muted-foreground mb-8 text-center text-base">
        Choose the perfect plan for your needs. All plans include a <span className="font-semibold">14-day free trial</span>.
      </p>
      {/* Décalage vers le bas des plans + animation */}
      <div
        className={`
          flex flex-col md:flex-row gap-4 w-full max-w-4xl justify-center items-stretch mt-20
          transition-all duration-700
          ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
        `}
      >
        {plans.map((plan, idx) => (
          <div
            key={plan.name}
            style={{
              minWidth: 240,
              maxWidth: 320,
              boxShadow: plan.popular
                ? "0 4px 16px 0 rgba(0,0,0,0.10)"
                : "0 1px 4px 0 rgba(0,0,0,0.04)",
              transitionDelay: `${idx * 100 + 100}ms`,
            }}
            className={`
              relative flex-1 bg-white dark:bg-neutral-900 border rounded-2xl shadow flex flex-col items-center px-5 py-8 transition-all
              ${plan.popular
                ? "border-2 border-black dark:border-white scale-105 z-10 shadow-xl"
                : "border border-gray-200 dark:border-neutral-800 opacity-95 hover:scale-105 hover:z-10"}
              ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
            `}
          >
            {plan.popular && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-3 py-1 rounded-full shadow font-semibold tracking-wide z-20">
                Most Popular
              </span>
            )}
            <h2 className="text-xl font-bold mb-1 text-center">{plan.name}</h2>
            <div className="flex items-end mb-1 justify-center">
              <span className="text-3xl font-extrabold">${plan.price}</span>
              <span className="text-base text-muted-foreground ml-1 mb-0.5">/month</span>
            </div>
            <p className="text-muted-foreground mb-4 text-center text-sm">{plan.description}</p>
            <ul className="mb-6 space-y-1 text-sm text-left w-full max-w-xs mx-auto">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center">
                  <span className="text-green-600 mr-2 text-base">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Link href={plan.href} className="w-full">
              <Button
                className={`
                  w-full py-3 text-base font-semibold rounded-lg transition
                  ${plan.popular ? "bg-black text-white hover:bg-neutral-800" : ""}
                `}
                variant={plan.ctaVariant as any}
                size="lg"
              >
                {plan.cta}
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}