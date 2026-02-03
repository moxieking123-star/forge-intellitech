'use client';

import { 
  type ReactNode, 
  type CSSProperties,
  type ElementType
} from 'react';
import { useInView } from '@/hooks/useInView';

/* ============================================
   ANIMATED SECTION
   ============================================
   
   A section wrapper that animates in when
   it enters the viewport.
   
   Usage:
   <AnimatedSection animation="fade-up">
     <YourContent />
   </AnimatedSection>
   
============================================ */

type Animation = 
  | 'fade'
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'scale'
  | 'none';

interface AnimatedSectionProps {
  children: ReactNode;
  animation?: Animation;
  delay?: number;
  duration?: number;
  className?: string;

  // ✅ FIX: do not use JSX.IntrinsicElements directly
  // ElementType is the correct polymorphic type
  as?: ElementType;

  threshold?: number;
}

export function AnimatedSection({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 500,
  className = '',
  as: Component = 'div',
  threshold = 0.1,
}: AnimatedSectionProps) {

  const { ref, isInView } = useInView<HTMLDivElement>({ 
    threshold,
    triggerOnce: true,
  });

  // Animation initial states
  const initialStyles: Record<Animation, CSSProperties> = {
    'none': {},
    'fade': { opacity: 0 },
    'fade-up': { opacity: 0, transform: 'translateY(30px)' },
    'fade-down': { opacity: 0, transform: 'translateY(-30px)' },
    'fade-left': { opacity: 0, transform: 'translateX(30px)' },
    'fade-right': { opacity: 0, transform: 'translateX(-30px)' },
    'scale': { opacity: 0, transform: 'scale(0.95)' },
  };

  // Animation final states
  const finalStyles: CSSProperties = {
    opacity: 1,
    transform: 'translate(0) scale(1)',
  };

  const style: CSSProperties = {
    ...(isInView ? finalStyles : initialStyles[animation]),
    transition: `opacity ${duration}ms var(--ease-out-expo) ${delay}ms, transform ${duration}ms var(--ease-out-expo) ${delay}ms`,
    willChange: isInView ? 'auto' : 'opacity, transform',
  };

  return (
    <Component
      ref={ref as any}
      className={className}
      style={animation !== 'none' ? style : undefined}
    >
      {children}
    </Component>
  );
}

/* ============================================
   STAGGERED CHILDREN
   ============================================
   
   Animates children one after another.
   
   Usage:
   <StaggeredChildren staggerDelay={100}>
     <Card />
     <Card />
     <Card />
   </StaggeredChildren>
   
============================================ */

interface StaggeredChildrenProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
  animation?: Animation;
}

export function StaggeredChildren({
  children,
  staggerDelay = 100,
  className = '',
  animation = 'fade-up',
}: StaggeredChildrenProps) {

  const { ref, isInView } = useInView<HTMLDivElement>({ 
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <div ref={ref} className={className}>
      {Array.isArray(children) 
        ? children.map((child, index) => (
            <AnimatedSection
              key={index}
              animation={animation}
              delay={isInView ? index * staggerDelay : 0}
            >
              {child}
            </AnimatedSection>
          ))
        : children
      }
    </div>
  );
}
