/**
 * Logo Component
 * 
 * Reusable logo component with dark background support for light mode.
 */

"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";

interface LogoProps {
  /** Size preset: sm (40px), md (56px), lg (72px) */
  size?: "sm" | "md" | "lg";
  /** Additional CSS classes */
  className?: string;
  /** Whether to wrap in a Link to home */
  linkToHome?: boolean;
  /** Show text alongside logo */
  showText?: boolean;
}

// Size mappings
const sizeMap = {
  sm: { height: 40, width: 120 },
  md: { height: 56, width: 168 },
  lg: { height: 72, width: 216 },
};

export function Logo({ 
  size = "md", 
  className = "",
  linkToHome = true,
  showText = false,
}: LogoProps) {
  const { mode } = useTheme();
  const dimensions = sizeMap[size];
  
  const logoElement = (
    <div 
      className={`
        flex items-center gap-2 
        transition-all duration-300
        ${mode === "light" 
          ? "bg-[#1A1A1A] px-3 py-2 rounded-xl shadow-md" 
          : ""
        }
        ${className}
      `}
    >
      <Image
        src="/images/logo.png"
        alt="Forge Intellitech"
        width={dimensions.width}
        height={dimensions.height}
        className="object-contain"
        style={{ height: dimensions.height, width: 'auto' }}
        priority
      />
      {showText && (
        <span className="font-semibold text-env-primary">
          Forge Intellitech
        </span>
      )}
    </div>
  );

  if (linkToHome) {
    return (
      <Link 
        href="/" 
        className="inline-block transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-chapter-accent rounded"
        aria-label="Forge Intellitech - Home"
      >
        {logoElement}
      </Link>
    );
  }

  return logoElement;
}

export default Logo;