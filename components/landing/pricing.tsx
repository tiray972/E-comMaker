import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

export default function LandingPricing() {
  const plans = [
    {
      name: "Starter",
      price: "$19",
      description: "Perfect for individuals and small businesses just getting started.",
      features: [
        "1 website",
        "100 pages",
        "5GB storage",
        "Free domain for 1 year",
        "Basic templates",
        "Community support"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Professional",
      price: "$49",
      description: "Everything you need for a growing business with more customization.",
      features: [
        "3 websites",
        "Unlimited pages",
        "20GB storage",
        "Free domain for 1 year",
        "All templates",
        "Priority support",
        "Advanced customization",
        "E-commerce (100 products)"
      ],
      cta: "Get Started",
      popular: true
    },
    {
      name: "Enterprise",
      price: "$99",
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
        "White labeling"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-muted-foreground">
            Choose the perfect plan for your needs. All plans include a 14-day free trial.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`flex flex-col ${
                plan.popular ? 'border-primary shadow-lg relative before:absolute before:inset-0 before:-z-10 before:w-full before:h-full before:bg-gradient-to-b before:from-primary/20 before:to-transparent before:opacity-40 before:blur-xl before:rounded-3xl' : 'shadow'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4">
                  <span className="bg-primary text-primary-foreground text-xs font-medium px-4 py-1 rounded-full shadow-sm">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <div className="flex items-baseline mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground ml-2">/month</span>
                </div>
                <CardDescription className="mt-2">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-3 flex-shrink-0" />
                      <span className={`text-sm ${plan.popular ? 'text-foreground' : 'text-muted-foreground'}`}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/register" className="w-full">
                  <Button 
                    variant={plan.popular ? "default" : "outline"} 
                    className="w-full"
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="max-w-3xl mx-auto mt-16 p-6 bg-muted/30 rounded-xl border text-center">
          <h3 className="text-xl font-semibold mb-3">Need something custom?</h3>
          <p className="text-muted-foreground mb-4">
            We offer custom solutions for larger organizations with specific requirements. 
            Our team will work with you to create a tailored plan.
          </p>
          <Link href="/contact">
            <Button variant="outline">Contact Us</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}