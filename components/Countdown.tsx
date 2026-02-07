"use client";

import { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(targetDate: string): TimeLeft | null {
  const difference = new Date(targetDate).getTime() - Date.now();
  
  if (difference <= 0) {
    return null;
  }
  
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

// ============================================
// COUNTDOWN COMPONENT
// ============================================

interface CountdownProps {
  targetDate: string;
  eventName?: string;
  className?: string;
}

export function Countdown({ targetDate, eventName, className = "" }: CountdownProps) {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(() => getTimeLeft(targetDate));

  // Handle mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Update countdown every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  // Placeholder during SSR
  if (!mounted) {
    return (
      <div className={`flex justify-center gap-3 md:gap-4 ${className}`} aria-hidden="true">
        {["Days", "Hours", "Minutes", "Seconds"].map((label) => (
          <div key={label} className="text-center">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-env-surface border border-env-border flex items-center justify-center mb-2">
              <span className="text-2xl md:text-3xl font-bold text-env-tertiary">--</span>
            </div>
            <span className="text-xs text-env-tertiary uppercase tracking-wider">{label}</span>
          </div>
        ))}
      </div>
    );
  }

  // Event has started or passed
  if (!timeLeft) {
    return (
      <div className={`text-center ${className}`}>
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-chapter-accent-soft rounded-full border border-chapter-accent/30">
          <span className="text-xl">🎉</span>
          <p className="text-lg font-semibold text-chapter-accent">
            {eventName ? `${eventName} is happening now!` : "Event is happening now!"}
          </p>
        </div>
      </div>
    );
  }

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className={`flex justify-center gap-3 md:gap-4 ${className}`}>
      {timeUnits.map((unit) => (
        <div key={unit.label} className="text-center">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-env-surface border border-env-border flex items-center justify-center mb-2 shadow-lg hover-glow transition-smooth">
            <span className="text-2xl md:text-3xl font-bold text-chapter-accent tabular-nums">
              {unit.value.toString().padStart(2, "0")}
            </span>
          </div>
          <span className="text-xs text-env-tertiary uppercase tracking-wider">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}

// ============================================
// COUNTDOWN BANNER COMPONENT
// ============================================

interface CountdownBannerProps {
  targetDate: string;
  eventName: string;
  ctaText?: string;
  ctaHref?: string;
  className?: string;
}

export function CountdownBanner({
  targetDate,
  eventName,
  ctaText = "Learn More",
  ctaHref = "#",
  className = "",
}: CountdownBannerProps) {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(() => getTimeLeft(targetDate));

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  // Don't render until mounted
  if (!mounted) {
    return null;
  }

  // Don't render if event has passed
  if (!timeLeft) {
    return null;
  }

  return (
    <div
      className={`bg-gradient-to-r from-chapter-accent/10 via-chapter-accent/5 to-purple-500/10 border-b border-env-border ${className}`}
    >
      <div className="container-forge py-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-xl animate-bounce">🚀</span>
            <div className="text-sm">
              <span className="text-env-secondary">{eventName} in </span>
              <span className="font-semibold text-chapter-accent tabular-nums">
                {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
              </span>
            </div>
          </div>
          <a
            href={ctaHref}
            className="text-sm font-medium text-chapter-accent hover:text-chapter-accent-hover transition-colors flex items-center gap-1 group"
          >
            {ctaText}
            <svg 
              className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

// ============================================
// SIMPLE INLINE COUNTDOWN (for debugging)
// ============================================

export function SimpleCountdown({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    // Initial calculation
    setTimeLeft(getTimeLeft(targetDate));

    // Update every second
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (!timeLeft) {
    return <span>Event started!</span>;
  }

  return (
    <span className="font-mono">
      {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
    </span>
  );
}

export default Countdown;