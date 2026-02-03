'use client';

import { useState, useEffect } from 'react';

interface CountdownProps {
  targetDate: string;
  eventName?: string;
}

export function Countdown({ targetDate, eventName = "the event" }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isComplete, setIsComplete] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const calculateTimeLeft = () => {
      const target = new Date(targetDate).getTime();
      const now = Date.now();
      const difference = target - now;

      if (difference <= 0) {
        setIsComplete(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  // Don't render until mounted (prevents hydration mismatch)
  if (!mounted) {
    return (
      <div className="text-center">
        <p className="text-gray-400 text-sm mb-4">Loading countdown...</p>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="text-center">
        <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-purple-500/10 border border-purple-500/20">
          <span className="text-2xl">🎉</span>
          <span className="text-xl font-semibold text-purple-400">
            {eventName} is here!
          </span>
          <span className="text-2xl">🎉</span>
        </div>
      </div>
    );
  }

  const timeUnits = [
    { value: timeLeft.days, label: 'Days' },
    { value: timeLeft.hours, label: 'Hours' },
    { value: timeLeft.minutes, label: 'Minutes' },
    { value: timeLeft.seconds, label: 'Seconds' },
  ];

  return (
    <div>
      <p className="text-center text-gray-400 mb-6 text-sm uppercase tracking-wider font-medium">
        Counting down to {eventName}
      </p>
      
      <div className="grid grid-cols-4 gap-3 md:gap-4 max-w-lg mx-auto">
        {timeUnits.map(({ value, label }) => (
          <div key={label} className="text-center">
            <div className="relative w-full aspect-square max-w-[100px] mx-auto flex items-center justify-center rounded-2xl bg-white/5 border border-white/10">
              <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                {value.toString().padStart(2, '0')}
              </span>
            </div>
            <span className="mt-2 block text-xs md:text-sm font-medium text-gray-400 uppercase tracking-wider">
              {label}
            </span>
          </div>
        ))}
      </div>
      
      <p className="text-center text-gray-500 mt-6 text-sm">
        {new Date(targetDate).toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>
    </div>
  );
}

// Simple banner version
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
  ctaText,
  ctaHref,
  className = '',
}: CountdownBannerProps) {
  const [days, setDays] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const target = new Date(targetDate).getTime();
    const now = Date.now();
    const difference = target - now;
    setDays(Math.max(0, Math.floor(difference / (1000 * 60 * 60 * 24))));
  }, [targetDate]);

  if (!mounted) return null;

  return (
    <div className={`py-3 px-4 bg-purple-500/10 border-b border-purple-500/20 ${className}`}>
      <div className="container-forge flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-lg">🚀</span>
          <div>
            <p className="text-sm font-semibold text-white">{eventName}</p>
            <p className="text-xs text-gray-400">{days} days remaining</p>
          </div>
        </div>
        {ctaText && ctaHref && (
          <a 
            href={ctaHref}
            className="px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
          >
            {ctaText}
          </a>
        )}
      </div>
    </div>
  );
}