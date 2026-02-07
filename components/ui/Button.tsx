"use client";

import { forwardRef, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import Link from "next/link";

/* ============================================
   FORGE BUTTON COMPONENT
   ============================================
   A unified button system that respects the 
   chapter theming and provides consistent 
   interactions across the site.
   
   Variants:
   - primary: Main actions, filled with chapter accent
   - secondary: Supporting actions, subtle fill
   - ghost: Minimal, text-only with hover state
   - outline: Bordered, transparent background
   - cta: Special "start your journey" button with motion
============================================ */

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "cta";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  children: React.ReactNode;
  className?: string;
}

type ButtonAsButton = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: never;
  };

type ButtonAsLink = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: `
    bg-chapter-accent text-white
    hover:bg-chapter-accent-hover
    shadow-button hover:shadow-button-hover
    active:shadow-button-active active:scale-[0.98]
  `,
  secondary: `
    bg-env-surface text-env-primary
    border border-env-border
    hover:bg-env-surface-hover hover:border-chapter-accent/30
    active:scale-[0.98]
  `,
  ghost: `
    bg-transparent text-env-secondary
    hover:text-env-primary hover:bg-env-surface
    active:bg-env-surface-hover
  `,
  outline: `
    bg-transparent text-chapter-accent
    border border-chapter-accent
    hover:bg-chapter-accent-soft
    active:bg-chapter-accent-softer
  `,
  cta: `
    relative overflow-hidden
    bg-gradient-to-r from-chapter-accent to-chapter-accent-hover
    text-white font-medium
    shadow-glow hover:shadow-glow-lg
    active:scale-[0.98]
    group
  `,
};

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      fullWidth = false,
      children,
      className = "",
      ...props
    },
    ref
  ) => {
    const baseClasses = `
      inline-flex items-center justify-center
      font-medium rounded-xl
      transition-all duration-normal ease-smooth
      focus:outline-none focus-visible:ring-2 focus-visible:ring-chapter-accent focus-visible:ring-offset-2 focus-visible:ring-offset-env-bg-primary
      disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
    `;

    const combinedClasses = `
      ${baseClasses}
      ${sizeClasses[size]}
      ${variantClasses[variant]}
      ${fullWidth ? "w-full" : ""}
      ${className}
    `.trim().replace(/\s+/g, " ");

    // CTA variant has special inner content with shine effect
    const content =
      variant === "cta" ? (
        <>
          {/* Shine effect on hover */}
          <span
            className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shine"
            aria-hidden="true"
          />
          {/* Button content */}
          <span className="relative flex items-center gap-2">
            {children}
            {/* Arrow that moves on hover */}
            <svg
              className="w-4 h-4 transition-transform duration-normal group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </span>
        </>
      ) : (
        children
      );

    // Render as Link if href is provided
    if ("href" in props && props.href) {
      const { href, ...linkProps } = props as ButtonAsLink;
      return (
        <Link
          href={href}
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={combinedClasses}
          {...linkProps}
        >
          {content}
        </Link>
      );
    }

    // Render as button
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={combinedClasses}
        {...(props as ButtonAsButton)}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
export type { ButtonProps, ButtonVariant, ButtonSize };