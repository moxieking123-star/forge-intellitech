import { ReactNode } from "react";

type BadgeVariant = "default" | "success" | "warning" | "error" | "info";
type ProductStatus = "live" | "pilot" | "development" | "coming-soon" | "active";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  status?: ProductStatus;
  pulse?: boolean;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-env-surface text-env-secondary border-env-border",
  success: "bg-baobab-500/20 text-baobab-400 border-baobab-500/30",
  warning: "bg-kente-500/20 text-kente-400 border-kente-500/30",
  error: "bg-red-500/20 text-red-400 border-red-500/30",
  info: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
};

const statusStyles: Record<ProductStatus, { label: string; classes: string }> = {
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
  active: {
    label: "Active",
    classes: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  },
};

/**
 * Badge
 * 
 * A small label component for status indicators, tags, etc.
 */
export function Badge({
  children,
  variant = "default",
  status,
  pulse = false,
  className = "",
}: BadgeProps) {
  const baseClasses = "inline-flex items-center px-3 py-1 text-xs font-medium rounded-full border";
  
  // If status is provided, use status styles
  if (status) {
    const statusInfo = statusStyles[status];
    return (
      <span className={`${baseClasses} ${statusInfo.classes} ${className}`}>
        {pulse && (
          <span className="relative flex h-2 w-2 mr-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-current" />
          </span>
        )}
        {children || statusInfo.label}
      </span>
    );
  }

  return (
    <span className={`${baseClasses} ${variantStyles[variant]} ${className}`}>
      {pulse && (
        <span className="relative flex h-2 w-2 mr-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-current" />
        </span>
      )}
      {children}
    </span>
  );
}

/**
 * StatusBadge
 * 
 * Specialized badge for product/feature status
 */
interface StatusBadgeProps {
  status: ProductStatus;
  className?: string;
}

export function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  const statusInfo = statusStyles[status];
  
  return (
    <span
      className={`inline-flex items-center px-3 py-1.5 text-xs font-semibold rounded-full border ${statusInfo.classes} ${className}`}
    >
      {(status === "live" || status === "active") && (
        <span className="relative flex h-2 w-2 mr-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-current" />
        </span>
      )}
      {statusInfo.label}
    </span>
  );
}

export default Badge;