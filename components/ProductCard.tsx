import Link from "next/link";

interface ProductCardProps {
  name: string;
  tagline: string;
  description: string;
  status: "live" | "pilot" | "scaling" | "development";
  href: string;
  icon: string;
}

export default function ProductCard({ 
  name, 
  tagline, 
  description, 
  status, 
  href, 
  icon 
}: ProductCardProps) {
  
  // Status badge colors
  const statusColors = {
    live: "bg-green-500/20 text-green-400 border-green-500/30",
    pilot: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    scaling: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    development: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  };

  // Status display text
  const statusText = {
    live: "Live",
    pilot: "Pilot",
    scaling: "Scaling",
    development: "In Development",
  };

  return (
    <Link href={href} className="block group">
      <div className="h-full p-6 md:p-8 rounded-2xl bg-white/5 border border-forge-border hover:border-primary-500/50 transition-smooth hover:bg-white/[0.07]">
        
        {/* Icon and Status */}
        <div className="flex items-start justify-between mb-4">
          <span className="text-4xl">{icon}</span>
          <span className={`px-3 py-1 text-xs font-medium rounded-full border ${statusColors[status]}`}>
            {statusText[status]}
          </span>
        </div>
        
        {/* Name and Tagline */}
        <h3 className="text-xl font-bold text-forge-light mb-2 group-hover:text-primary-400 transition-smooth">
          {name}
        </h3>
        <p className="text-primary-400 text-sm font-medium mb-3">
          {tagline}
        </p>
        
        {/* Description */}
        <p className="text-forge-muted text-sm leading-relaxed">
          {description}
        </p>
        
        {/* Learn More Link */}
        <div className="mt-4 flex items-center text-sm text-primary-400 group-hover:text-primary-300 transition-smooth">
          <span>Learn more</span>
          <svg 
            className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}