import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  background?: "primary" | "secondary" | "tertiary" | "surface" | "gradient" | "none";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  container?: "none" | "narrow" | "default" | "wide" | "full";
  id?: string;
}

const backgroundStyles = {
  primary: "bg-env-bg-primary",
  secondary: "bg-env-bg-secondary",
  tertiary: "bg-env-bg-tertiary",
  surface: "bg-env-surface",
  gradient: "bg-gradient-to-b from-env-bg-primary to-env-bg-secondary",
  none: "",
};

const paddingStyles = {
  none: "",
  sm: "py-12 md:py-16",
  md: "py-16 md:py-20 lg:py-24",
  lg: "py-20 md:py-28 lg:py-32",
  xl: "py-24 md:py-32 lg:py-40",
};

const containerStyles = {
  none: "",
  narrow: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8",
  default: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8",
  wide: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12",
  full: "w-full px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-24",
};

export function Section({
  children,
  className = "",
  background = "primary",
  padding = "md",
  container = "default",
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`
        relative w-full
        ${backgroundStyles[background]}
        ${paddingStyles[padding]}
        ${className}
      `}
    >
      <div className={containerStyles[container]}>
        {children}
      </div>
    </section>
  );
}

// Full-width section with no container (for heroes, CTAs)
export function SectionFull({
  children,
  className = "",
  background = "primary",
  id,
}: Omit<SectionProps, "padding" | "container">) {
  return (
    <section
      id={id}
      className={`
        relative w-full
        ${backgroundStyles[background]}
        ${className}
      `}
    >
      {children}
    </section>
  );
}

// Two-column section (for side-by-side layouts)
interface TwoColumnProps {
  left: ReactNode;
  right: ReactNode;
  className?: string;
  background?: "primary" | "secondary" | "tertiary" | "surface" | "none";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  reverse?: boolean; // Reverse order on mobile
  leftWidth?: "narrow" | "equal" | "wide";
}

export function SectionTwoColumn({
  left,
  right,
  className = "",
  background = "primary",
  padding = "md",
  reverse = false,
  leftWidth = "equal",
}: TwoColumnProps) {
  const widthStyles = {
    narrow: "lg:w-5/12",
    equal: "lg:w-1/2",
    wide: "lg:w-7/12",
  };

  const rightWidthStyles = {
    narrow: "lg:w-7/12",
    equal: "lg:w-1/2",
    wide: "lg:w-5/12",
  };

  return (
    <section
      className={`
        relative w-full
        ${backgroundStyles[background]}
        ${paddingStyles[padding]}
        ${className}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className={`
          flex flex-col lg:flex-row items-center gap-8 lg:gap-12 xl:gap-16
          ${reverse ? "lg:flex-row-reverse" : ""}
        `}>
          <div className={`w-full ${widthStyles[leftWidth]}`}>
            {left}
          </div>
          <div className={`w-full ${rightWidthStyles[leftWidth]}`}>
            {right}
          </div>
        </div>
      </div>
    </section>
  );
}