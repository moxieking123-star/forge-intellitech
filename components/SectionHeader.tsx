interface SectionHeaderProps {
  /** Small label above title */
  label?: string;
  /** Main section title */
  title: string;
  /** Description text below title */
  description?: string;
  /** Center the header (default: true) */
  centered?: boolean;
  /** Add reveal line animation to title */
  animated?: boolean;
}

export default function SectionHeader({ 
  label, 
  title, 
  description, 
  centered = true,
  animated = false,
}: SectionHeaderProps) {
  return (
    <div className={`mb-12 md:mb-16 ${centered ? 'text-center' : ''}`}>
      {label && (
        <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-chapter-accent bg-chapter-accent-soft rounded-full border border-chapter-accent/20">
          {label}
        </span>
      )}
      <h2 
        className={`
          text-3xl md:text-4xl lg:text-5xl font-bold text-env-primary mb-4
          ${animated ? 'animate-reveal-line' : ''}
        `}
      >
        {title}
      </h2>
      {description && (
        <p className={`text-lg text-env-secondary leading-relaxed ${centered ? 'max-w-2xl mx-auto' : 'max-w-2xl'}`}>
          {description}
        </p>
      )}
    </div>
  );
}