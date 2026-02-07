"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "./ThemeProvider";
import { Button } from "./ui/Button";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Products", href: "/products" },
  { name: "TechUp", href: "/techup" },
  { name: "LaunchPad", href: "/launchpad" },
  { name: "Gallery", href: "/gallery" },
  { name: "Blog", href: "/blog" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll position for subtle navbar enhancement
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-normal ease-smooth
        ${
          isScrolled
            ? "glass shadow-lg shadow-black/5"
            : "bg-transparent"
        }
      `}
    >
      <div className="container-forge">
        <div className="flex items-center justify-between h-18 md:h-22">
          {/* 
            UPDATED: Larger Logo with Better Spacing
            - Increased from h-10/h-12 to h-12/h-14
            - Added padding for breathing room
          */}
          <Link
            href="/"
            className="
              flex items-center py-2
              transition-all duration-normal ease-smooth
              hover:opacity-90
              focus:outline-none focus-visible:ring-2 focus-visible:ring-chapter-accent rounded-lg
            "
            aria-label="Forge Intellitech - Home"
          >
            <Image
              src="/images/logo.png"
              alt="Forge Intellitech"
              width={240}
              height={120}
              className="h-12 md:h-14 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center">
            <div className="flex items-center space-x-1 mr-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="
                    relative px-4 py-2 text-sm font-medium
                    text-env-secondary hover:text-env-primary
                    transition-all duration-normal ease-smooth
                    rounded-lg hover:bg-env-surface
                    group
                  "
                >
                  {link.name}
                  {/* Subtle underline on hover */}
                  <span
                    className="
                      absolute bottom-1 left-4 right-4 h-px
                      bg-chapter-accent
                      transform scale-x-0 group-hover:scale-x-100
                      transition-transform duration-normal ease-smooth
                      origin-left
                    "
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>

            {/* Right side: Theme toggle + CTA */}
            <div className="flex items-center space-x-4 pl-6 border-l border-env-border">
              <ThemeToggle />

              {/* 
                NEW: Distinctive CTA Button
                Uses the new Button component with 'cta' variant
                Feels like "start something meaningful"
              */}
              <Button href="/contact" variant="cta" size="md">
                Start Building
              </Button>
            </div>
          </div>

          {/* Mobile: Theme toggle + Menu Button */}
          <div className="flex lg:hidden items-center space-x-2">
            <ThemeToggle />
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="
                p-2.5 text-env-secondary hover:text-env-primary
                transition-all duration-normal ease-smooth
                rounded-xl hover:bg-env-surface
                focus:outline-none focus-visible:ring-2 focus-visible:ring-chapter-accent
              "
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span
                  className={`
                    block h-0.5 w-6 bg-current rounded-full
                    transition-all duration-normal ease-smooth
                    ${isMenuOpen ? "rotate-45 translate-y-2" : ""}
                  `}
                />
                <span
                  className={`
                    block h-0.5 w-6 bg-current rounded-full
                    transition-all duration-normal ease-smooth
                    ${isMenuOpen ? "opacity-0 scale-x-0" : ""}
                  `}
                />
                <span
                  className={`
                    block h-0.5 w-6 bg-current rounded-full
                    transition-all duration-normal ease-smooth
                    ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}
                  `}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`
            lg:hidden overflow-hidden
            transition-all duration-normal ease-smooth
            ${isMenuOpen ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"}
          `}
        >
          <div className="py-4 border-t border-env-border">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link, index) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="
                    px-4 py-3 text-env-secondary hover:text-env-primary
                    hover:bg-env-surface rounded-xl
                    transition-all duration-normal ease-smooth
                  "
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  {link.name}
                </Link>
              ))}

              {/* Mobile CTA */}
              <div className="pt-4 px-4 mt-2 border-t border-env-border">
                <Button
                  href="/contact"
                  variant="cta"
                  size="lg"
                  fullWidth
                  onClick={() => setIsMenuOpen(false)}
                >
                  Start Building
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}