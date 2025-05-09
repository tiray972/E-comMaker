"use client";

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, MousePointer, Move, Plus } from 'lucide-react';

export default function LandingHero() {
  const editorRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animatePointer = () => {
      if (!pointerRef.current || !editorRef.current) return;
      
      const timeline = [
        { x: 200, y: 150, scale: 1, rotate: 0, delay: 300 },
        { x: 250, y: 100, scale: 0.8, rotate: 0, delay: 800 },
        { x: 250, y: 100, scale: 0.7, rotate: 0, delay: 200, className: 'opacity-50' },
        { x: 300, y: 200, scale: 1, rotate: 0, delay: 800, className: '' },
        { x: 350, y: 150, scale: 1, rotate: 0, delay: 1000 },
      ];
      
      let currentStep = 0;
      
      const animateStep = () => {
        if (currentStep >= timeline.length) {
          currentStep = 0;
        }
        
        const step = timeline[currentStep];
        
        if (pointerRef.current) {
          pointerRef.current.style.transform = `translate(${step.x}px, ${step.y}px) scale(${step.scale}) rotate(${step.rotate}deg)`;
          if (step.className !== undefined) {
            pointerRef.current.className = `absolute cursor-demo ${step.className}`;
          }
        }
        
        currentStep++;
        setTimeout(animateStep, step.delay);
      };
      
      animateStep();
    };
    
    animatePointer();
  }, []);

  return (
    <div className="relative overflow-hidden pt-24 md:pt-32">
      <div className="absolute inset-0 bg-grid-black/[0.02] -z-10" />
      <div className="container px-4 mx-auto">
        <div className="max-w-5xl mx-auto text-center mb-12 md:mb-20">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 animate-fade-up">
            Build beautiful websites<br />
            <span className="text-primary">without writing code</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-fade-up animation-delay-100">
            Create stunning e-commerce websites with our intuitive drag-and-drop builder. Choose from professionally designed templates and customize every element to match your brand.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up animation-delay-200">
            <Link href="/register">
              <Button size="lg" className="w-full sm:w-auto">
                Start Building <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/templates">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Explore Templates
              </Button>
            </Link>
          </div>
        </div>
        
        <div 
          ref={editorRef}
          className="relative aspect-[16/9] max-w-5xl mx-auto rounded-xl overflow-hidden border shadow-xl animate-fade-up animation-delay-300"
        >
          <div className="absolute inset-0 bg-muted/50 backdrop-blur-sm">
            <div className="h-12 bg-background border-b flex items-center px-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="mx-auto pr-12 flex items-center space-x-4">
                <Button variant="outline" size="sm" className="h-7 text-xs">Desktop</Button>
                <Button variant="ghost" size="sm" className="h-7 text-xs">Tablet</Button>
                <Button variant="ghost" size="sm" className="h-7 text-xs">Mobile</Button>
              </div>
            </div>
            
            <div className="flex h-[calc(100%-3rem)]">
              <div className="w-64 bg-background border-r p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm font-medium">Components</div>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {['Header', 'Hero', 'Features', 'Products', 'Testimonials', 'Contact', 'Footer'].map((item) => (
                    <div 
                      key={item}
                      className="p-2 text-sm rounded-md border bg-background/80 flex items-center gap-2 cursor-pointer hover:bg-accent transition-colors"
                    >
                      <div className="w-6 h-6 rounded bg-muted flex items-center justify-center">
                        <Move className="h-3 w-3 text-muted-foreground" />
                      </div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex-1 bg-background/30 flex items-center justify-center">
                <div className="text-center p-8 rounded-lg border border-dashed border-border bg-background/60 backdrop-blur-sm">
                  <p className="text-sm text-muted-foreground mb-2">Drag components here to get started</p>
                  <Button variant="outline" size="sm">
                    Add Component
                  </Button>
                </div>
              </div>
              
              <div className="w-72 bg-background border-l p-4">
                <div className="text-sm font-medium mb-4">Settings</div>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">Background</label>
                    <div className="h-8 mt-1 rounded-md border bg-background" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">Padding</label>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <div className="h-8 rounded-md border bg-background" />
                      <div className="h-8 rounded-md border bg-background" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">Alignment</label>
                    <div className="grid grid-cols-3 gap-2 mt-1">
                      <div className="h-8 rounded-md border bg-background" />
                      <div className="h-8 rounded-md border bg-accent" />
                      <div className="h-8 rounded-md border bg-background" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Animated cursor */}
          <div 
            ref={pointerRef}
            className="absolute cursor-demo"
            style={{ transform: 'translate(100px, 100px)' }}
          >
            <MousePointer className="h-6 w-6 text-primary fill-primary animate-pulse" />
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .bg-grid-black {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(15 23 42 / 0.04)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
        }
        
        .cursor-demo {
          transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }
        
        @keyframes fade-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-up {
          animation: fade-up 0.5s ease forwards;
        }
        
        .animation-delay-100 {
          animation-delay: 0.1s;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
      `}</style>
    </div>
  );
}