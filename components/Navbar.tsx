"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "./ThemeProvider";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Products", href: "/products" },
  { name: "TechUp", href: "/techup" },
  { name: "LaunchPad", href: "/launchpad" },
  { name: "Gallery", href: "/gallery" },
  { name: "Blog", href: "/blog" },
];

const socialLinks = [
  {
    name: "Twitter",
    href: "https://twitter.com/forgeintelli",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/forge-intellitech",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com/forgeintelli",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
];

// Modern Theme Toggle Component
function ThemeToggle() {
  const { mode, setMode } = useTheme();
  
  return (
    <button
      onClick={() => setMode(mode === "dark" ? "light" : "dark")}
      className="
        relative w-14 h-7 rounded-full
        bg-env-surface border border-env-border
        transition-all duration-300
        hover:border-chapter-accent/50
        focus:outline-none focus-visible:ring-2 focus-visible:ring-chapter-accent
      "
      aria-label={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}
    >
      {/* Track icons */}
      <span className="absolute left-1.5 top-1/2 -translate-y-1/2 text-xs">🌙</span>
      <span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-xs">☀️</span>
      
      {/* Slider */}
      <span
        className={`
          absolute top-0.5 w-6 h-6 rounded-full
          bg-chapter-accent shadow-lg
          transition-all duration-300 ease-out
          ${mode === "dark" ? "left-0.5" : "left-[calc(100%-26px)]"}
        `}
      />
    </button>
  );
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300
        ${isScrolled
          ? "bg-env-bg-primary/80 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-env-border/50"
          : "bg-transparent"
        }
      `}
    >
      <div className="container-forge">
        <div className="flex items-center justify-between h-20 md:h-24">
          
          {/* Logo - Left */}
          <Link
            href="/"
            className="relative z-10 flex-shrink-0 transition-transform duration-300 hover:scale-105"
            aria-label="Forge Intellitech - Home"
          >
            <Image
              src="/images/logo.png"
              alt="Forge Intellitech"
              width={280}
              height={140}
              className="h-14 md:h-16 lg:h-18 w-auto object-contain"
              priority
            />
          </Link>

          {/* Navigation Links - Center (Desktop) */}
          <div className="hidden lg:flex items-center justify-center flex-1 px-8">
            <div className="flex items-center bg-env-surface/50 backdrop-blur-sm rounded-full border border-env-border/50 p-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="
                    relative px-4 py-2 text-sm font-medium
                    text-env-secondary hover:text-env-primary
                    transition-all duration-200
                    rounded-full hover:bg-env-surface
                  "
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Side - Social, Theme, CTA */}
          <div className="hidden lg:flex items-center gap-2">
            
            {/* Social Links */}
            <div className="flex items-center gap-1 mr-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    w-9 h-9 rounded-full
                    flex items-center justify-center
                    text-env-tertiary hover:text-env-primary
                    hover:bg-env-surface
                    transition-all duration-200
                  "
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            
            {/* Divider */}
            <div className="w-px h-6 bg-env-border mx-2" />
            
            {/* Theme Toggle */}
            <ThemeToggle />
            
            {/* Divider */}
            <div className="w-px h-6 bg-env-border mx-2" />
            
            {/* CTA Button */}
            <Link
              href="/contact"
              className="
                px-5 py-2.5 rounded-full
                bg-chapter-accent hover:bg-chapter-accent-hover
                text-white font-medium text-sm
                transition-all duration-300
                hover:shadow-lg hover:shadow-chapter-accent/25
                hover:scale-105
              "
            >
              Get Started
            </Link>
          </div>

          {/* Mobile - Right Side */}
          <div className="flex lg:hidden items-center gap-3">
            
            {/* Theme Toggle - Mobile */}
            <ThemeToggle />
            
            {/* Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="
                relative w-10 h-10 rounded-xl
                bg-env-surface border border-env-border
                flex items-center justify-center
                text-env-secondary hover:text-env-primary
                transition-all duration-200
                hover:border-chapter-accent/50
              "
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              <div className="w-5 h-4 relative flex flex-col justify-between">
                <span
                  className={`
                    block h-0.5 w-5 bg-current rounded-full
                    transition-all duration-300
                    ${isMenuOpen ? "rotate-45 translate-y-[7px]" : ""}
                  `}
                />
                <span
                  className={`
                    block h-0.5 bg-current rounded-full
                    transition-all duration-300
                    ${isMenuOpen ? "opacity-0 w-0" : "w-3"}
                  `}
                />
                <span
                  className={`
                    block h-0.5 w-5 bg-current rounded-full
                    transition-all duration-300
                    ${isMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""}
                  `}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`
            lg:hidden fixed inset-x-0 top-20
            bg-env-bg-primary/95 backdrop-blur-xl
            border-b border-env-border
            transition-all duration-300 ease-out
            ${isMenuOpen 
              ? "opacity-100 translate-y-0 pointer-events-auto" 
              : "opacity-0 -translate-y-4 pointer-events-none"
            }
          `}
        >
          <div className="container-forge py-6">
            
            {/* Nav Links */}
            <div className="grid grid-cols-2 gap-2 mb-6">
              {navLinks.map((link, index) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="
                    px-4 py-3 rounded-xl
                    text-env-secondary hover:text-env-primary
                    hover:bg-env-surface
                    transition-all duration-200
                    text-center font-medium
                  "
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            
            {/* Divider */}
            <div className="h-px bg-env-border mb-6" />
            
            {/* Social Links */}
            <div className="flex items-center justify-center gap-2 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    w-11 h-11 rounded-xl
                    bg-env-surface border border-env-border
                    flex items-center justify-center
                    text-env-secondary hover:text-chapter-accent
                    hover:border-chapter-accent/50
                    transition-all duration-200
                  "
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            
            {/* CTA */}
            <Link
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="
                block w-full py-4 rounded-xl
                bg-chapter-accent hover:bg-chapter-accent-hover
                text-white font-semibold text-center
                transition-all duration-300
              "
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
      
      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/20 -z-10"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </nav>
  );
}