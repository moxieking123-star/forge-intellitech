"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "./ThemeProvider";

// UPDATED: Added Gallery to navigation links
const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Products", href: "/products" },
  { name: "TechUp", href: "/techup" },
  { name: "LaunchPad", href: "/launchpad" },
  { name: "Gallery", href: "/gallery" },  // ← NEW: Added Gallery link
  { name: "Blog", href: "/blog" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container-forge">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* 
            UPDATED: Logo Only (Text Removed)
            - Removed the "Forge" and "ITS" text spans
            - Logo image now serves as the sole brand identifier
            - Increased logo visibility with proper sizing
          */}
          <Link 
            href="/" 
            className="flex items-center transition-smooth hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-chapter-accent rounded-lg"
            aria-label="Forge Intellitech - Home"
          >
            <Image
              src="/images/logo.png"
              alt="Forge Intellitech"
              width={140}
              height={45}
              className="h-10 md:h-12 w-auto object-contain"
              priority
            />
            {/* 
              REMOVED: Text labels
              Previously had:
              <span className="text-xl font-bold text-env-primary">Forge</span>
              <span className="text-xl font-light text-chapter-accent">ITS</span>
            */}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-env-secondary hover:text-env-primary transition-smooth rounded-lg hover:bg-env-surface"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Theme toggle */}
            <ThemeToggle />
            
            {/* CTA Button */}
            <Link
              href="/contact"
              className="px-5 py-2.5 text-sm font-medium text-env-text-inverse bg-chapter-accent hover:bg-chapter-accent-hover rounded-lg transition-smooth glow"
            >
              Get In Touch
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-env-secondary hover:text-env-primary transition-smooth rounded-lg hover:bg-env-surface"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-env-border animate-fade-in">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-3 text-env-secondary hover:text-env-primary hover:bg-env-surface rounded-lg transition-smooth"
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Mobile: Theme toggle and CTA */}
              <div className="pt-4 px-4 flex items-center justify-between border-t border-env-border mt-2">
                <ThemeToggle />
                <Link
                  href="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-5 py-3 text-center font-medium text-env-text-inverse bg-chapter-accent hover:bg-chapter-accent-hover rounded-lg transition-smooth"
                >
                  Get In Touch
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}