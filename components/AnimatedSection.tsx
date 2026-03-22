// components/AnimatedSection.tsx
"use client";

import { useEffect, useRef, useState, ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  animation?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'fade-in' | 'scale-in';
  delay?: number;
  className?: string;
  threshold?: number;
}

export function AnimatedSection({
  children,
  animation = 'fade-up',
  delay = 0,
  className = '',
  threshold = 0.1,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  const getAnimationStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      transition: `opacity 0.6s ease-out, transform 0.6s ease-out`,
      transitionDelay: `${delay}ms`,
    };

    if (!isVisible) {
      switch (animation) {
        case 'fade-up':
          return { ...baseStyles, opacity: 0, transform: 'translateY(30px)' };
        case 'fade-down':
          return { ...baseStyles, opacity: 0, transform: 'translateY(-30px)' };
        case 'fade-left':
          return { ...baseStyles, opacity: 0, transform: 'translateX(30px)' };
        case 'fade-right':
          return { ...baseStyles, opacity: 0, transform: 'translateX(-30px)' };
        case 'fade-in':
          return { ...baseStyles, opacity: 0, transform: 'none' };
        case 'scale-in':
          return { ...baseStyles, opacity: 0, transform: 'scale(0.95)' };
        default:
          return { ...baseStyles, opacity: 0, transform: 'translateY(30px)' };
      }
    }

    return { ...baseStyles, opacity: 1, transform: 'none' };
  };

  return (
    <div ref={ref} style={getAnimationStyles()} className={className}>
      {children}
    </div>
  );
}

// Also export as default for flexibility
export default AnimatedSection;