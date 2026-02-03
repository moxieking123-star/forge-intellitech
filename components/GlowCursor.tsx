'use client';

import { useEffect, useState, useCallback } from 'react';

/* ============================================
   GLOW CURSOR COMPONENT
   ============================================
   
   Creates a subtle radial gradient that follows
   the mouse cursor. This adds a premium, 
   crafted feel without being flashy.
   
   Performance considerations:
   - Uses CSS transforms (GPU accelerated)
   - Uses requestAnimationFrame for smoothing
   - Pointer-events: none (doesn't block clicks)
   - Hidden on touch devices
   - Respects prefers-reduced-motion
   
============================================ */

export function GlowCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  /* ----------------------------------------
     Check for reduced motion preference
     ---------------------------------------- */
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  /* ----------------------------------------
     Check for touch device
     ---------------------------------------- */
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  /* ----------------------------------------
     Track mouse position
     ---------------------------------------- */
  const handleMouseMove = useCallback((e: MouseEvent) => {
    // Use requestAnimationFrame for smooth updates
    requestAnimationFrame(() => {
      setPosition({ x: e.clientX, y: e.clientY });
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsVisible(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  useEffect(() => {
    // Don't add listeners if reduced motion or touch device
    if (isReducedMotion || isTouchDevice) return;

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    // Show cursor initially if mouse is already in viewport
    setIsVisible(true);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isReducedMotion, isTouchDevice, handleMouseMove, handleMouseEnter, handleMouseLeave]);

  // Don't render anything if reduced motion, touch device, or not visible
  if (isReducedMotion || isTouchDevice || !isVisible) {
    return null;
  }

  return (
    <div
      className="glow-cursor"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 'var(--cursor-glow-size)',
        height: 'var(--cursor-glow-size)',
        pointerEvents: 'none',
        zIndex: 9999,
        opacity: 'var(--cursor-glow-opacity)',
        background: `radial-gradient(
          circle at center,
          var(--chapter-accent) 0%,
          transparent 70%
        )`,
        transform: `translate(
          calc(${position.x}px - var(--cursor-glow-size) / 2),
          calc(${position.y}px - var(--cursor-glow-size) / 2)
        )`,
        transition: 'opacity 0.3s ease',
        willChange: 'transform',
        mixBlendMode: 'screen',
      }}
      aria-hidden="true"
    />
  );
}

/* ============================================
   ALTERNATIVE: Spotlight variant
   ============================================
   A more subtle version that creates a 
   spotlight effect on the page background.
============================================ */

export function SpotlightCursor() {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  useEffect(() => {
    if (isReducedMotion || isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        // Convert to percentage
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        setPosition({ x, y });
      });
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [isReducedMotion, isTouchDevice]);

  if (isReducedMotion || isTouchDevice) {
    return null;
  }

  return (
    <div
      className="spotlight-cursor"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1,
        background: `radial-gradient(
          600px circle at ${position.x}% ${position.y}%,
          var(--chapter-accent-softer) 0%,
          transparent 60%
        )`,
        transition: 'background 0.15s ease',
        willChange: 'background',
      }}
      aria-hidden="true"
    />
  );
}