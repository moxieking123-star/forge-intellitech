"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "./ThemeProvider";

const navLinks = [
  { name: "About", href: "/about" },
  { name: "Products", href: "/products" },
  { name: "TechUp", href: "/techup" },
  { name: "LaunchPad", href: "/launchpad" },
  { name: "Products", href: "/products" },
  { name: "Blog", href: "/blog" },
];

const socialLinks = [
  {
    name: "Twitter",
    href: "https://twitter.com/forgeintelli",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/forge-intellitech",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com/forgeintelli",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "https://github.com/forge-intellitech",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
];

function ThemeToggle() {
  const { mode, setMode } = useTheme();
  
  return (
    <button
      onClick={() => setMode(mode === "dark" ? "light" : "dark")}
      className="
        relative w-12 h-12 rounded-xl
        bg-[var(--env-surface)] border border-[var(--env-border)]
        flex items-center justify-center
        text-[var(--env-text-secondary)]
        hover:text-[var(--env-text-primary)] hover:border-[var(--chapter-accent)]/50
        transition-all duration-300
        group
      "
      aria-label={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}
    >
      {/* Sun icon */}
      <svg 
        className={`
          w-5 h-5 absolute transition-all duration-500
          ${mode === "dark" ? "opacity-100 rotate-0" : "opacity-0 rotate-90"}
        `}
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
      
      {/* Moon icon */}
      <svg 
        className={`
          w-5 h-5 absolute transition-all duration-500
          ${mode === "light" ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"}
        `}
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    </button>
  );
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { mode } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-500
          ${isScrolled
            ? "bg-[var(--env-bg-primary)]/90 backdrop-blur-xl border-b border-[var(--env-border)]/50"
            : "bg-transparent"
          }
        `}
      >
        <div className="flex items-center justify-between h-20 md:h-24 px-6 sm:px-10 md:px-16 lg:px-24">
          
          {/* Logo with dark background in light mode */}
          <Link
            href="/"
            className="relative z-10 flex-shrink-0 group"
            aria-label="Forge Intellitech - Home"
          >
            <div 
              className={`
                flex items-center justify-center
                px-3 py-2 rounded-xl
                transition-all duration-300
                ${mode === "light" 
                  ? "bg-[#1A1A1A] shadow-lg" 
                  : "bg-transparent"
                }
              `}
            >
              <Image
                src="/images/logo.png"
                alt="Forge Intellitech"
                width={200}
                height={70}
                className="h-12 md:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="
                  relative px-4 py-2
                  text-[var(--env-text-secondary)] hover:text-[var(--env-text-primary)]
                  font-medium text-sm
                  transition-colors duration-300
                  group
                "
              >
                {link.name}
                <span className="
                  absolute bottom-0 left-1/2 -translate-x-1/2
                  w-0 h-0.5 rounded-full
                  bg-[var(--chapter-accent)]
                  group-hover:w-4
                  transition-all duration-300
                " />
              </Link>
            ))}
          </div>

          {/* Desktop Right Side */}
          <div className="hidden lg:flex items-center gap-3">
            
            {/* Social Links */}
            <div className="flex items-center gap-1">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    w-10 h-10 rounded-xl
                    flex items-center justify-center
                    text-[var(--env-text-tertiary)] hover:text-[var(--env-text-primary)]
                    hover:bg-[var(--env-surface)]
                    transition-all duration-300
                  "
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            
            {/* Divider */}
            <div className="w-px h-8 bg-[var(--env-border)] mx-2" />
            
            {/* Theme Toggle */}
            <ThemeToggle />
            
            {/* CTA Button */}
            <Link
              href="/contact"
              className="
                ml-2 px-6 py-3 rounded-xl
                bg-[var(--chapter-accent)] hover:bg-[var(--chapter-accent-hover)]
                text-white font-semibold text-sm
                transition-all duration-300
                hover:shadow-lg hover:shadow-[var(--chapter-accent)]/25
                hover:-translate-y-0.5
              "
            >
              Get in Touch
            </Link>
          </div>

          {/* Mobile Right Side */}
          <div className="flex lg:hidden items-center gap-3">
            <ThemeToggle />
            
            {/* Hamburger Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="
                relative w-12 h-12 rounded-xl
                bg-[var(--env-surface)] border border-[var(--env-border)]
                flex items-center justify-center
                transition-all duration-300
                hover:border-[var(--chapter-accent)]/50
              "
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              <div className="w-5 h-4 relative flex flex-col justify-between">
                <span
                  className={`
                    block h-0.5 bg-[var(--env-text-primary)] rounded-full
                    transition-all duration-300 origin-center
                    ${isMenuOpen ? "rotate-45 translate-y-[7px]" : "w-5"}
                  `}
                />
                <span
                  className={`
                    block h-0.5 bg-[var(--env-text-primary)] rounded-full
                    transition-all duration-300
                    ${isMenuOpen ? "opacity-0 scale-0" : "w-3 opacity-100"}
                  `}
                />
                <span
                  className={`
                    block h-0.5 bg-[var(--env-text-primary)] rounded-full
                    transition-all duration-300 origin-center
                    ${isMenuOpen ? "-rotate-45 -translate-y-[7px]" : "w-4"}
                  `}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Full Screen Overlay */}
      <div
        className={`
          lg:hidden fixed inset-0 z-40
          transition-all duration-500
          ${isMenuOpen 
            ? "opacity-100 pointer-events-auto" 
            : "opacity-0 pointer-events-none"
          }
        `}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />
        
        {/* Menu Panel */}
        <div 
          className={`
            absolute top-20 left-0 right-0 bottom-0
            bg-[var(--env-bg-primary)]
            transition-all duration-500
            ${isMenuOpen ? "translate-y-0" : "-translate-y-8"}
          `}
        >
          <div className="h-full flex flex-col px-6 py-8 overflow-y-auto">
            
            {/* Navigation Links */}
            <nav className="space-y-2 mb-8">
              {navLinks.map((link, index) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="
                    block px-4 py-4 rounded-2xl
                    text-xl font-semibold
                    text-[var(--env-text-primary)]
                    hover:bg-[var(--env-surface)]
                    transition-all duration-300
                  "
                  style={{ 
                    transitionDelay: isMenuOpen ? `${index * 50}ms` : "0ms",
                    opacity: isMenuOpen ? 1 : 0,
                    transform: isMenuOpen ? "translateX(0)" : "translateX(-20px)"
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            
            {/* Divider */}
            <div className="h-px bg-[var(--env-border)] mb-8" />
            
            {/* Social Links */}
            <div className="flex items-center justify-center gap-3 mb-8">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    w-14 h-14 rounded-2xl
                    bg-[var(--env-surface)] border border-[var(--env-border)]
                    flex items-center justify-center
                    text-[var(--env-text-secondary)] hover:text-[var(--chapter-accent)]
                    hover:border-[var(--chapter-accent)]/50
                    transition-all duration-300
                  "
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            
            {/* CTA Button */}
            <Link
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="
                block w-full py-5 rounded-2xl
                bg-[var(--chapter-accent)] hover:bg-[var(--chapter-accent-hover)]
                text-white font-bold text-lg text-center
                transition-all duration-300
              "
            >
              Get in Touch
            </Link>
            
            {/* Footer info */}
            <div className="mt-auto pt-8 text-center">
              <p className="text-[var(--env-text-tertiary)] text-sm flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Building from Lagos, Nigeria 🇳🇬
              </p>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}