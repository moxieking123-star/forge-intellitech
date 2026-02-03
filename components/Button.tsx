import Link from 'next/link';
import { type ReactNode, type ButtonHTMLAttributes } from 'react';

/* ============================================
   BUTTON COMPONENT
   ============================================
   
   Unified button with chapter theming.
   Supports both button and link variants.
   
   Usage:
   <Button variant="primary" href="/contact">Get In Touch</Button>
   <Button variant="secondary" onClick={handleClick}>Learn More</Button>
   
============================================ */

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonBaseProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  /** Show loading state */
  loading?: boolean;
  /** Full width */
  fullWidth?: boolean;
  /** Add glow effect */
  glow?: boolean;
  /** Add hover lift effect */
  lift?: boolean;
  /** Icon before text */
  iconLeft?: ReactNode;
  /** Icon after text */
  iconRight?: ReactNode;
}

interface ButtonAsButton extends ButtonBaseProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> {
  href?: never;
  external?: never;
}

interface ButtonAsLink extends ButtonBaseProps {
  href: string;
  external?: boolean;
  onClick?: never;
  type?: never;
  disabled?: never;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  loading = false,
  fullWidth = false,
  glow = false,
  lift = true,
  iconLeft,
  iconRight,
  href,
  external,
  ...props
}: ButtonProps) {
  
  // Size classes
  const sizeClasses: Record<ButtonSize, string> = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  // Variant classes
  const variantClasses: Record<ButtonVariant, string> = {
    primary: `
      bg-chapter-accent 
      hover:bg-chapter-accent-hover 
      text-env-text-inverse 
      border border-transparent
    `,
    secondary: `
      bg-env-surface 
      hover:bg-env-surface-hover 
      text-env-primary 
      border border-env-border
    `,
    ghost: `
      bg-transparent 
      hover:bg-env-surface 
      text-env-primary 
      border border-transparent
    `,
    outline: `
      bg-transparent 
      hover:bg-chapter-accent-soft 
      text-chapter-accent 
      border border-chapter-accent
    `,
  };
  
  // Combined classes
  const combinedClasses = `
    inline-flex items-center justify-center gap-2
    font-medium rounded-lg
    transition-smooth
    disabled:opacity-50 disabled:cursor-not-allowed
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${fullWidth ? 'w-full' : ''}
    ${glow ? 'glow' : ''}
    ${lift ? 'hover-lift' : ''}
    ${className}
  `;

  // Content with loading state
  const content = (
    <>
      {loading ? (
        <svg 
          className="animate-spin h-4 w-4" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : iconLeft ? (
        <span className="shrink-0">{iconLeft}</span>
      ) : null}
      <span>{children}</span>
      {iconRight && !loading && (
        <span className="shrink-0">{iconRight}</span>
      )}
    </>
  );

  // Render as link or button
  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClasses}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button
      className={combinedClasses}
      disabled={loading || (props as ButtonAsButton).disabled}
      {...(props as ButtonAsButton)}
    >
      {content}
    </button>
  );
}