"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type AnimationType = 
  | "fade-up" 
  | "fade-in" 
  | "fade-left" 
  | "fade-right" 
  | "scale"
  | "none";

interface AnimatedSectionProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  once?: boolean;
  threshold?: number;
  className?: string;
}

const animationClasses: Record<AnimationType, { initial: string; animate: string }> = {
  "fade-up": {
    initial: "opacity-0 translate-y-8",
    animate: "opacity-100 translate-y-0",
  },
  "fade-in": {
    initial: "opacity-0",
    animate: "opacity-100",
  },
  "fade-left": {
    initial: "opacity-0 translate-x-8",
    animate: "opacity-100 translate-x-0",
  },
  "fade-right": {
    initial: "opacity-0 -translate-x-8",
    animate: "opacity-100 translate-x-0",
  },
  "scale": {
    initial: "opacity-0 scale-95",
    animate: "opacity-100 scale-100",
  },
  "none": {
    initial: "",
    animate: "",
  },
};

/**
 * AnimatedSection
 * 
 * Wraps content with scroll-triggered animations.
 * Uses Intersection Observer for performance.
 * Respects prefers-reduced-motion.
 */
export function AnimatedSection({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 500,
  once = true,
  threshold = 0.1,
  className = "",
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin: "0px 0px -50px 0px" }
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
  }, [once, threshold, prefersReducedMotion]);

  if (prefersReducedMotion || animation === "none") {
    return <div className={className}>{children}</div>;
  }

  const { initial, animate } = animationClasses[animation];

  return (
    <div
      ref={ref}
      className={`transition-all ease-out ${isVisible ? animate : initial} ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/**
 * StaggeredChildren
 * 
 * Wraps multiple children with staggered animation delays.
 * Each child animates in sequence.
 */
interface StaggeredChildrenProps {
  children: ReactNode;
  staggerDelay?: number;
  animation?: AnimationType;
  className?: string;
}

export function StaggeredChildren({
  children,
  staggerDelay = 100,
  animation = "fade-up",
  className = "",
}: StaggeredChildrenProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
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
  }, [prefersReducedMotion]);

  const { initial, animate } = animationClasses[animation];

  return (
    <div ref={ref} className={className}>
      {Array.isArray(children) ? (
        children.map((child, index) => (
          <div
            key={index}
            className={`transition-all ease-out duration-500 ${
              isVisible && !prefersReducedMotion ? animate : initial
            }`}
            style={{
              transitionDelay: prefersReducedMotion ? "0ms" : `${index * staggerDelay}ms`,
            }}
          >
            {child}
          </div>
        ))
      ) : (
        <div className={`transition-all ease-out duration-500 ${isVisible ? animate : initial}`}>
          {children}
        </div>
      )}
    </div>
  );
}

export default AnimatedSection;