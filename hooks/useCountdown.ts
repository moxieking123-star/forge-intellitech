'use client';

import { useState, useEffect, useMemo } from 'react';

/* ============================================
   COUNTDOWN HOOK
   ============================================
   
   Calculates time remaining until a target date.
   Updates every second.
   
   Usage:
   const { days, hours, minutes, seconds, isComplete } = useCountdown('2025-08-28');
   
============================================ */

export interface CountdownValues {
  /** Days remaining */
  days: number;
  /** Hours remaining (0-23) */
  hours: number;
  /** Minutes remaining (0-59) */
  minutes: number;
  /** Seconds remaining (0-59) */
  seconds: number;
  /** Total milliseconds remaining */
  totalMs: number;
  /** Whether countdown has completed */
  isComplete: boolean;
  /** Formatted string: "X days, Y hours, Z minutes" */
  formatted: string;
}

export function useCountdown(targetDate: string | Date): CountdownValues {
  // Parse target date once
  const target = useMemo(() => {
    const date = new Date(targetDate);
    // Set to end of day (23:59:59) for the target date
    date.setHours(23, 59, 59, 999);
    return date.getTime();
  }, [targetDate]);

  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    // Update every second
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Calculate remaining time
  const remaining = Math.max(0, target - now);
  const isComplete = remaining === 0;

  // Break down into units
  const seconds = Math.floor((remaining / 1000) % 60);
  const minutes = Math.floor((remaining / (1000 * 60)) % 60);
  const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
  const days = Math.floor(remaining / (1000 * 60 * 60 * 24));

  // Create formatted string
  const parts: string[] = [];
  if (days > 0) parts.push(`${days} day${days !== 1 ? 's' : ''}`);
  if (hours > 0) parts.push(`${hours} hour${hours !== 1 ? 's' : ''}`);
  if (minutes > 0) parts.push(`${minutes} minute${minutes !== 1 ? 's' : ''}`);
  if (parts.length === 0 && seconds > 0) parts.push(`${seconds} second${seconds !== 1 ? 's' : ''}`);
  const formatted = parts.join(', ') || 'Event has started!';

  return {
    days,
    hours,
    minutes,
    seconds,
    totalMs: remaining,
    isComplete,
    formatted,
  };
}