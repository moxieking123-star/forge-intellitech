/**
 * Logo Component
 * 
 * Reusable logo component for Navbar and Footer.
 * Loads the company logo from /public/images/logo.png
 * 
 * Usage:
 *   <Logo />                    // Default (auto height)
 *   <Logo size="sm" />          // Small (24px height)
 *   <Logo size="lg" />          // Large (48px height)
 *   <Logo className="..." />    // Custom classes
 */

import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  /** Size preset: sm (24px), md (32px), lg (48px) */
  size?: "sm" | "md" | "lg";
  /** Additional CSS classes */
  className?: string;
  /** Whether to wrap in a Link to home */
  linkToHome?: boolean;
  /** Show text alongside logo */
  showText?: boolean;
}

// Size mappings in pixels
const sizeMap = {
  sm: { height: 30, width: 80 },
  md: { height: 50, width: 107 },
  lg: { height: 65, width: 160 },
};

export function Logo({ 
  size = "md", 
  className = "",
  linkToHome = true,
  showText = false,
}: LogoProps) {
  const dimensions = sizeMap[size];
  
  const logoElement = (
    <div className={`flex items-center gap-2 ${className}`}>
      <Image
        src="/images/logo.png"
        alt="Forge Intellitech"
        width={dimensions.width}
        height={dimensions.height}
        className="object-contain"
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
        className="transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-chapter-accent rounded"
        aria-label="Forge Intellitech - Home"
      >
        {logoElement}
      </Link>
    );
  }

  return logoElement;
}

// Also export as default for flexibility
export default Logo;