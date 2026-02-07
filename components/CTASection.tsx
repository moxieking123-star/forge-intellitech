import Image from "next/image";
import Link from "next/link";
import { AnimatedSection } from "./AnimatedSection";

interface CTAAction {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
}

interface CTASectionProps {
  /** Main headline */
  headline: string;
  /** Text to highlight with gradient (optional) */
  highlightedText?: string;
  /** Supporting description */
  description: string;
  /** Primary call-to-action */
  primaryAction: CTAAction;
  /** Secondary call-to-action (optional) */
  secondaryAction?: CTAAction;
  /** Background image path */
  backgroundImage?: string;
  /** Overlay opacity 0-100 (default: 80) */
  overlayOpacity?: number;
  /** Text alignment */
  align?: "left" | "center";
  /** Optional badge/label above headline */
  badge?: string;
}

/**
 * CTASection
 * 
 * A visually rich call-to-action section with optional background image.
 * Designed to feel emotionally inviting, not corporate.
 * 
 * @example
 * <CTASection
 *   headline="Ready to Build the Future"
 *   highlightedText="Together?"
 *   description="Join us in creating technology that serves Africa."
 *   primaryAction={{ label: "Get Started", href: "/contact" }}
 *   backgroundImage="/images/cta/community.jpg"
 * />
 */
export function CTASection({
  headline,
  highlightedText,
  description,
  primaryAction,
  secondaryAction,
  backgroundImage,
  overlayOpacity = 80,
  align = "center",
  badge,
}: CTASectionProps) {
  const alignClasses = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
  };

  const buttonAlignClasses = {
    left: "justify-start",
    center: "justify-center",
  };

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background Image */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            quality={80}
          />
          {/* Primary overlay */}
          <div 
            className="absolute inset-0 bg-env-bg-primary"
            style={{ opacity: overlayOpacity / 100 }}
          />
          {/* Gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-env-bg-primary via-transparent to-env-bg-primary/50" />
        </div>
      )}

      {/* Decorative glow elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-chapter-accent/20 rounded-full blur-3xl translate-y-1/2 opacity-60" />
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-chapter-accent/10 rounded-full blur-3xl -translate-y-1/2 opacity-40" />
      </div>

      <div className="container-forge relative z-10">
        <AnimatedSection animation="fade-up">
          <div className={`flex flex-col ${alignClasses[align]} max-w-3xl`}>
            
            {/* Optional Badge */}
            {badge && (
              <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-wider text-chapter-accent bg-chapter-accent-soft rounded-full border border-chapter-accent/20">
                {badge}
              </span>
            )}

            {/* Headline */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-env-primary mb-6 leading-tight">
              {headline}
              {highlightedText && (
                <span className="gradient-text"> {highlightedText}</span>
              )}
            </h2>

            {/* Description */}
            <p className="text-lg md:text-xl text-env-secondary mb-10 leading-relaxed max-w-2xl">
              {description}
            </p>

            {/* Actions */}
            <div className={`flex flex-col sm:flex-row gap-4 ${buttonAlignClasses[align]}`}>
              <Link
                href={primaryAction.href}
                className="group relative px-8 py-4 bg-chapter-accent hover:bg-chapter-accent-hover text-white font-medium rounded-xl transition-all duration-300 overflow-hidden shadow-glow hover:shadow-glow-lg hover-lift"
              >
                {/* Shine effect */}
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative flex items-center justify-center gap-2">
                  {primaryAction.label}
                  <svg 
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>

              {secondaryAction && (
                <Link
                  href={secondaryAction.href}
                  className="px-8 py-4 bg-env-surface hover:bg-env-surface-hover text-env-primary font-medium rounded-xl border border-env-border hover:border-chapter-accent/30 transition-all duration-300 hover-lift text-center"
                >
                  {secondaryAction.label}
                </Link>
              )}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/**
 * SimpleCTA
 * 
 * A simpler CTA without background image, for inline use.
 */
interface SimpleCTAProps {
  headline: string;
  highlightedText?: string;
  description: string;
  primaryAction: CTAAction;
  secondaryAction?: CTAAction;
}

export function SimpleCTA({
  headline,
  highlightedText,
  description,
  primaryAction,
  secondaryAction,
}: SimpleCTAProps) {
  return (
    <div className="p-8 md:p-12 rounded-2xl bg-gradient-to-br from-chapter-accent-soft via-chapter-accent-softer to-env-surface border border-chapter-accent/20 text-center">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-env-primary mb-4">
        {headline}
        {highlightedText && (
          <span className="gradient-text"> {highlightedText}</span>
        )}
      </h2>

      <p className="text-lg text-env-secondary mb-8 max-w-2xl mx-auto">
        {description}
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href={primaryAction.href}
          className="px-8 py-4 bg-chapter-accent hover:bg-chapter-accent-hover text-white font-medium rounded-xl transition-smooth shadow-glow hover-lift"
        >
          {primaryAction.label}
        </Link>

        {secondaryAction && (
          <Link
            href={secondaryAction.href}
            className="px-8 py-4 bg-env-surface hover:bg-env-surface-hover text-env-primary font-medium rounded-xl border border-env-border transition-smooth hover-lift"
          >
            {secondaryAction.label}
          </Link>
        )}
      </div>
    </div>
  );
}

export default CTASection;