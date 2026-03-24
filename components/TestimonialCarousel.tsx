// components/TestimonialCarousel.tsx

"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { IconQuote } from "./icons/ForgeIcons";

interface Testimonial {
  quote: string;
  name: string;
  role: "Student" | "Teacher" | "Administrator";
  school: string;
  image?: string;
  color: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  title?: string;
  subtitle?: string;
  badgeText?: string;
  badgeColor?: string;
}

export default function TestimonialCarousel({
  testimonials,
  title = "What People Say",
  subtitle = "Hear from students, teachers, and administrators who've experienced TechUp firsthand.",
  badgeText = "Testimonials",
  badgeColor = "#14B8B8",
}: TestimonialCarouselProps) {
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Duplicate testimonials for seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.5; // pixels per frame

    const scroll = () => {
      if (!isPaused && scrollContainer) {
        scrollPosition += scrollSpeed;
        
        // Reset position when we've scrolled through the first set
        if (scrollPosition >= scrollContainer.scrollWidth / 2) {
          scrollPosition = 0;
        }
        
        scrollContainer.scrollLeft = scrollPosition;
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isPaused]);

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Student":
        return "#14B8B8";
      case "Teacher":
        return "#52B788";
      case "Administrator":
        return "#FF8C42";
      default:
        return "#A855F7";
    }
  };

  const getRoleEmoji = (role: string) => {
    switch (role) {
      case "Student":
        return "🎓";
      case "Teacher":
        return "👨‍🏫";
      case "Administrator":
        return "🏫";
      default:
        return "👤";
    }
  };

  return (
    <section className="section-padding bg-env-secondary overflow-hidden">
      <div className="container-forge mb-12">
        <div className="text-center">
          <span 
            className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider rounded-full border"
            style={{ 
              color: badgeColor,
              backgroundColor: `${badgeColor}15`,
              borderColor: `${badgeColor}30`
            }}
          >
            {badgeText}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-4">
            {title}
          </h2>
          <p className="text-lg text-env-secondary max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Scrolling Container */}
      <div 
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-env-secondary to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-env-secondary to-transparent z-10 pointer-events-none" />

        {/* Scrolling Track */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-hidden py-4"
          style={{ scrollBehavior: 'auto' }}
        >
          {duplicatedTestimonials.map((testimonial, index) => {
            const roleColor = getRoleColor(testimonial.role);
            return (
              <div
                key={`${testimonial.name}-${index}`}
                className="flex-shrink-0 w-[340px] md:w-[400px] p-6 rounded-2xl bg-env-surface border border-env-border hover:border-transparent transition-all duration-300 group cursor-pointer"
                style={{
                  // @ts-ignore
                  '--hover-color': testimonial.color,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = testimonial.color + '50';
                  e.currentTarget.style.boxShadow = `0 20px 40px ${testimonial.color}15`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--env-border)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Quote Icon */}
                <div className="mb-4">
                  <IconQuote size={36} color={testimonial.color} />
                </div>

                {/* Quote Text */}
                <p className="text-env-primary leading-relaxed mb-6 text-[15px] min-h-[100px]">
                  "{testimonial.quote}"
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-4 pt-4 border-t border-env-border">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
                    style={{ backgroundColor: `${testimonial.color}20` }}
                  >
                    {getRoleEmoji(testimonial.role)}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-env-primary">
                      {testimonial.name}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span style={{ color: roleColor }} className="font-medium">
                        {testimonial.role}
                      </span>
                      <span className="text-env-tertiary">•</span>
                      <span className="text-env-secondary">
                        {testimonial.school}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pause Indicator */}
      <div className="container-forge mt-6">
        <p className="text-center text-env-tertiary text-sm">
          {isPaused ? "⏸️ Paused — move mouse away to continue" : "🔄 Hover to pause"}
        </p>
      </div>
    </section>
  );
}