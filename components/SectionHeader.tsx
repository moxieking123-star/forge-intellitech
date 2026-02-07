import { AnimatedSection } from "./AnimatedSection";

interface SectionHeaderProps {
  /** Small label above title (e.g., "Our Approach") */
  label?: string;
  /** Main section title */
  title: string;
  /** Optional highlighted portion of title (renders with gradient) */
  titleHighlight?: string;
  /** Supporting description */
  description?: string;
  /** Alignment */
  align?: "left" | "center";
  /** Additional classes */
  className?: string;
}

/**
 * SectionHeader
 * 
 * Consistent header pattern for page sections.
 * Provides visual rhythm and hierarchy.
 * 
 * @example
 * <SectionHeader
 *   label="What We're Building"
 *   title="Products with"
 *   titleHighlight="Purpose"
 *   description="Every product addresses a critical gap in Africa."
 * />
 */
export function SectionHeader({
  label,
  title,
  titleHighlight,
  description,
  align = "center",
  className = "",
}: SectionHeaderProps) {
  const alignmentClasses = {
    left: "text-left",
    center: "text-center mx-auto",
  };

  return (
    <AnimatedSection animation="fade-up" className={`mb-12 md:mb-16 ${className}`}>
      <div className={`max-w-3xl ${alignmentClasses[align]}`}>
        {/* Label */}
        {label && (
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium bg-chapter-accent-soft text-chapter-accent rounded-full border border-chapter-accent/20">
            {label}
          </span>
        )}

        {/* Title */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-env-primary mb-4 leading-tight">
          {title}
          {titleHighlight && (
            <>
              {" "}
              <span className="gradient-text">{titleHighlight}</span>
            </>
          )}
        </h2>

        {/* Description */}
        {description && (
          <p className="text-lg text-env-secondary leading-relaxed max-w-2xl mx-auto">
            {description}
          </p>
        )}
      </div>
    </AnimatedSection>
  );
}

export default SectionHeader;