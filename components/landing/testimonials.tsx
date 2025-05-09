"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

export default function LandingTestimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Fashion Store Owner",
      avatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      content: "BuildrCMS transformed our business. I was able to create a professional online store in just a few days without any technical knowledge. The templates are beautiful and the customization options are amazing.",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      role: "Freelance Photographer",
      avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      content: "As a photographer, I needed a portfolio that would showcase my work beautifully. BuildrCMS made it incredibly easy to create a stunning site that perfectly represents my brand and style.",
      rating: 5
    },
    {
      id: 3,
      name: "Jessica Chen",
      role: "Small Business Owner",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      content: "I tried several website builders before discovering BuildrCMS. None of them offered the perfect combination of ease of use and professional results until now. Highly recommended!",
      rating: 4
    },
    {
      id: 4,
      name: "David Wright",
      role: "Restaurant Owner",
      avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      content: "The restaurant template was the perfect starting point for our website. We customized it with our branding and menu, and now we have a site that looks like it cost thousands to build.",
      rating: 5
    }
  ];
  
  const [activeIndex, setActiveIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Loved by businesses worldwide
          </h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of satisfied customers who have transformed their online presence with our platform.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative h-[400px] md:h-[300px]">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`absolute inset-0 transition-all duration-500 ${
                  index === activeIndex 
                    ? 'opacity-100 translate-x-0' 
                    : index < activeIndex 
                      ? 'opacity-0 -translate-x-8' 
                      : 'opacity-0 translate-x-8'
                }`}
              >
                <Card className="border shadow-md h-full">
                  <CardContent className="p-6 md:p-8 flex flex-col h-full justify-between">
                    <div>
                      <div className="flex mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted'}`}
                          />
                        ))}
                      </div>
                      <p className="text-lg italic mb-6">"{testimonial.content}"</p>
                    </div>
                    <div className="flex items-center mt-auto pt-4 border-t">
                      <Avatar className="h-12 w-12 mr-4">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full mx-1.5 transition-all ${
                  index === activeIndex ? 'bg-primary scale-100' : 'bg-primary/30 scale-75'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}