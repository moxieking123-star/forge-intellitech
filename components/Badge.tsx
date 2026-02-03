/* ============================================
   BADGE COMPONENT
   ============================================
   
   Status badges with predefined styles.
   
   Usage:
   <Badge status="pilot">Pilot</Badge>
   <Badge status="live">Live</Badge>
   <Badge variant="accent">New</Badge>
   
============================================ */

type BadgeStatus = 'pilot' | 'development' | 'live' | 'coming-soon' | 'beta';
type BadgeVariant = 'default' | 'accent' | 'success' | 'warning' | 'error';

interface BadgeProps {
  children: React.ReactNode;
  status?: BadgeStatus;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  className?: string;
  /** Animated pulse effect */
  pulse?: boolean;
}

export function Badge({
  children,
  status,
  variant = 'default',
  size = 'sm',
  className = '',
  pulse = false,
}: BadgeProps) {
  
  // Status-based styling
  const statusStyles: Record<BadgeStatus, string> = {
    pilot: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    development: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    live: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    'coming-soon': 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    beta: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  };
  
  // Variant-based styling (when not using status)
  const variantStyles: Record<BadgeVariant, string> = {
    default: 'bg-env-surface text-env-secondary border-env-border',
    accent: 'bg-chapter-accent-soft text-chapter-accent border-chapter-accent/20',
    success: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    error: 'bg-red-500/10 text-red-500 border-red-500/20',
  };
  
  // Size classes
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  const styles = status ? statusStyles[status] : variantStyles[variant];

  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        font-medium rounded-full
        border
        ${sizeClasses[size]}
        ${styles}
        ${className}
      `}
    >
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-current" />
        </span>
      )}
      {children}
    </span>
  );
}

/* ============================================
   STATUS BADGE
   ============================================
   Pre-configured badges for common statuses
============================================ */

interface StatusBadgeProps {
  status: BadgeStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const labels: Record<BadgeStatus, string> = {
    pilot: 'Pilot',
    development: 'In Development',
    live: 'Live',
    'coming-soon': 'Coming Soon',
    beta: 'Beta',
  };

  return (
    <Badge 
      status={status} 
      className={className}
      pulse={status === 'live'}
    >
      {labels[status]}
    </Badge>
  );
}