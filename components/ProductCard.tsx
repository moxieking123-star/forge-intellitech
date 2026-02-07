import Link from "next/link";

interface ProductCardProps {
  name: string;
  tagline: string;
  description: string;
  status: "live" | "pilot" | "development" | "coming-soon";
  href: string;
  icon?: string;
}

const statusStyles = {
  live: {
    label: "Live",
    classes: "bg-baobab-500/20 text-baobab-400 border-baobab-500/30",
  },
  pilot: {
    label: "Pilot",
    classes: "bg-kente-500/20 text-kente-400 border-kente-500/30",
  },
  development: {
    label: "In Development",
    classes: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
  },
  "coming-soon": {
    label: "Coming Soon",
    classes: "bg-clay-500/20 text-clay-400 border-clay-500/30",
  },
};

/**
 * ProductCard
 * 
 * Displays a product/initiative in a card format.
 * Used on homepage and products page.
 */
export function ProductCard({
  name,
  tagline,
  description,
  status,
  href,
  icon,
}: ProductCardProps) {
  const statusInfo = statusStyles[status];

  return (
    <Link href={href} className="group block h-full">
      <article className="h-full p-6 md:p-8 rounded-2xl bg-env-surface border border-env-border hover:border-chapter-accent/30 transition-all duration-300 hover-lift hover-glow">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {icon && <span className="text-2xl">{icon}</span>}
            <div>
              <h3 className="text-xl font-semibold text-env-primary group-hover:text-chapter-accent transition-colors">
                {name}
              </h3>
              <p className="text-sm text-chapter-accent">{tagline}</p>
            </div>
          </div>
          
          {/* Status badge */}
          <span className={`px-3 py-1 text-xs font-medium rounded-full border ${statusInfo.classes}`}>
            {statusInfo.label}
          </span>
        </div>

        {/* Description */}
        <p className="text-env-secondary leading-relaxed line-clamp-3 mb-4">
          {description}
        </p>

        {/* Learn more link */}
        <div className="flex items-center text-sm font-medium text-chapter-accent group-hover:gap-2 transition-all">
          <span>Learn more</span>
          <svg 
            className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </article>
    </Link>
  );
}

export default ProductCard;