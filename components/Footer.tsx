"use client";

import { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import { useFormSubmit } from '@/hooks/useFormSubmit';
import { useTheme } from './ThemeProvider';

const footerSections = [
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Our Products", href: "/products" },
      { name: "Gallery", href: "/gallery" },
      { name: "Blog", href: "/blog" },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Programs",
    links: [
      { name: "TechUp", href: "/techup" },
      { name: "LaunchPad", href: "/launchpad" },
    ],
  },
  {
    title: "Products",
    links: [
      { name: "BiteBank", href: "/products#bitebank" },
      { name: "Trego", href: "/products#trego" },
    ],
  },
  {
    title: "Join Us",
    links: [
      { name: "Careers", href: "/join#talent" },
      { name: "Partner With Us", href: "/join#partners" },
      { name: "Invest", href: "/join#investors" },
    ],
  },
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
  {
    name: "RSS",
    href: "/rss.xml",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19 7.38 20 6.18 20C5 20 4 19 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1Z"/>
      </svg>
    ),
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const { mode } = useTheme();
  
  const { submitForm, isLoading, success, error, reset } = useFormSubmit({
    endpoint: '/api/newsletter',
    onSuccess: () => {
      setEmail('');
    },
  });

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    await submitForm({ email });
  };

  return (
    <footer className="relative bg-[var(--env-bg-secondary)] overflow-hidden">
      
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--env-border)] to-transparent" />
      
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[var(--chapter-accent)]/5 rounded-full blur-[100px]" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[var(--color-apricot-current)]/5 rounded-full blur-[100px]" />
      </div>
      
      {/* Newsletter Section */}
      <div className="relative border-b border-[var(--env-border)]">
        <div className="px-6 sm:px-10 md:px-16 lg:px-24 py-16 md:py-20">
          <div className="max-w-6xl mx-auto">
            <div className="
              flex flex-col lg:flex-row items-center justify-between gap-8
              p-8 md:p-12 rounded-3xl
              bg-gradient-to-br from-[var(--chapter-accent)]/10 via-transparent to-[var(--color-apricot-current)]/10
              border border-[var(--env-border)]
            ">
              <div className="text-center lg:text-left">
                <h3 className="font-heading text-2xl md:text-3xl font-bold text-[var(--env-text-primary)] mb-2">
                  Stay in the loop
                </h3>
                <p className="text-[var(--env-text-secondary)] text-lg">
                  Get updates on our programs, products, and impact stories.
                </p>
              </div>
              
              {success ? (
                <div className="flex items-center gap-3 px-6 py-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                  <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-green-500 font-medium">You're subscribed!</span>
                  <button 
                    onClick={reset}
                    className="text-green-500/70 hover:text-green-500 ml-2"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row w-full lg:w-auto gap-3">
                  <div className="relative flex-1 lg:w-80">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="
                        w-full px-6 py-4 rounded-xl
                        bg-[var(--env-surface)] border border-[var(--env-border)]
                        text-[var(--env-text-primary)] placeholder:text-[var(--env-text-tertiary)]
                        focus:outline-none focus:border-[var(--chapter-accent)] focus:ring-2 focus:ring-[var(--chapter-accent)]/20
                        transition-all duration-300
                        text-base
                      "
                    />
                    {error && (
                      <p className="absolute -bottom-6 left-0 text-sm text-red-500">{error}</p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="
                      px-8 py-4 rounded-xl
                      bg-[var(--chapter-accent)] hover:bg-[var(--chapter-accent-hover)]
                      text-white font-semibold
                      transition-all duration-300
                      hover:shadow-lg hover:shadow-[var(--chapter-accent)]/25
                      whitespace-nowrap
                      disabled:opacity-50 disabled:cursor-not-allowed
                      flex items-center justify-center gap-2
                    "
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Subscribing...</span>
                      </>
                    ) : (
                      'Subscribe'
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative px-6 sm:px-10 md:px-16 lg:px-24 py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 lg:gap-8">
          
          {/* Brand Column */}
          <div className="col-span-2">
            <Link href="/" className="inline-block mb-6 group">
              <div 
                className={`
                  inline-flex items-center justify-center
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
                  className="h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </Link>
            
            <p className="text-[var(--env-text-secondary)] leading-relaxed mb-8 max-w-xs">
              Building technology that understands Africa. Solutions rooted in local realities, designed for lasting impact.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="
                    w-12 h-12 rounded-xl
                    bg-[var(--env-surface)] border border-[var(--env-border)]
                    flex items-center justify-center
                    text-[var(--env-text-secondary)]
                    hover:text-white hover:bg-[var(--chapter-accent)] hover:border-[var(--chapter-accent)]
                    transition-all duration-300
                  "
                  aria-label={`Follow us on ${social.name}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-heading text-sm font-bold text-[var(--env-text-primary)] uppercase tracking-wider mb-5">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="
                        text-[var(--env-text-secondary)]
                        hover:text-[var(--chapter-accent)]
                        transition-colors duration-300
                        text-sm
                      "
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-[var(--env-border)]">
        <div className="px-6 sm:px-10 md:px-16 lg:px-24 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Copyright */}
            <p className="text-sm text-[var(--env-text-tertiary)] order-2 md:order-1">
              © {currentYear} Forge Intellitech Services Ltd. All rights reserved.
            </p>
            
            {/* Nigerian Identity - Center */}
            <div className="flex items-center gap-3 order-1 md:order-2">
              <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--env-surface)] border border-[var(--env-border)]">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm text-[var(--env-text-secondary)]">Built in Lagos</span>
                <span className="text-lg">🇳🇬</span>
              </span>
            </div>
            
            {/* Legal Links */}
            <div className="flex items-center gap-6 order-3">
              <Link 
                href="/privacy" 
                className="text-sm text-[var(--env-text-tertiary)] hover:text-[var(--env-text-secondary)] transition-colors"
              >
                Privacy
              </Link>
              <Link 
                href="/terms" 
                className="text-sm text-[var(--env-text-tertiary)] hover:text-[var(--env-text-secondary)] transition-colors"
              >
                Terms
              </Link>
              <a 
                href="/rss.xml" 
                className="text-sm text-[var(--env-text-tertiary)] hover:text-[var(--env-text-secondary)] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                RSS
              </a>
            </div>
            
          </div>
        </div>
      </div>
      
    </footer>
  );
}