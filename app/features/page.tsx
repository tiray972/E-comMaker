"use client";

import { CheckCircle, Layers, Paintbrush, LayoutTemplate, Smartphone, Rocket, Zap, Globe, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation'; // Mise à jour de l'importation
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button'; // Import du composant Button

export default function LandingFeatures() {
  const router = useRouter(); // Utilisation correcte de useRouter
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Déclenche l'animation après le montage du composant
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: <Layers className="h-6 w-6" />,
      title: "Drag-and-Drop Builder",
      description: "Easily build your site by dragging and dropping components exactly where you want them."
    },
    {
      icon: <LayoutTemplate className="h-6 w-6" />,
      title: "Professional Templates",
      description: "Start with beautiful pre-designed templates crafted for various industries and purposes."
    },
    {
      icon: <Paintbrush className="h-6 w-6" />,
      title: "Customizable Themes",
      description: "Personalize colors, fonts, and styles to match your brand identity perfectly."
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Mobile Responsive",
      description: "Every website looks great on all devices with automatic responsive adjustments."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Performance Optimized",
      description: "Built with speed in mind, ensuring fast loading times and smooth experiences."
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Easy Publishing",
      description: "Publish your site with one click and make updates whenever you need."
    }
  ];

  return (
    <section
      className={`py-20 bg-muted/30 transition-opacity duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      {/* Flèche de retour */}
      <Button 
        variant="ghost" 
        className="absolute top-4 left-4 p-2 rounded-full hover:bg-muted transition"
        onClick={() => router.push('/')} // Redirige vers la page de base
      >
        <ArrowLeft className="h-6 w-6" />
      </Button>

      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Everything you need to build amazing websites
          </h2>
          <p className="text-lg text-muted-foreground">
            Our powerful platform gives you all the tools you need to create professional websites without coding knowledge.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-background rounded-xl p-6 border shadow-sm transition-all hover:shadow-md hover:translate-y-[-2px]"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-8 rounded-2xl border">
          <div className="flex flex-col md:flex-row items-center">
            <div className="mb-6 md:mb-0 md:mr-8 flex-shrink-0">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <CheckCircle className="h-8 w-8" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-2">No coding knowledge required</h3>
              <p className="text-muted-foreground">
                Our intuitive visual editor makes it easy for anyone to create beautiful, functional websites without writing a single line of code. Start building right away!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}