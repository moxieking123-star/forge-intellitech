import Link from "next/link";
import Image from "next/image";

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
    title: "Get Involved",
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
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-env-bg-primary border-t border-env-border overflow-hidden">
      
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-chapter-accent/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
      </div>
      
      {/* Newsletter Section */}
      <div className="relative border-b border-env-border">
        <div className="container-forge py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 rounded-2xl bg-gradient-to-r from-chapter-accent/10 via-purple-500/5 to-chapter-accent/10 border border-chapter-accent/20">
              
              <div className="text-center md:text-left">
                <h3 className="text-xl md:text-2xl font-bold text-env-primary mb-2">
                  Stay in the loop
                </h3>
                <p className="text-env-secondary">
                  Get updates on our programs, products, and impact stories.
                </p>
              </div>
              
              <form className="flex w-full md:w-auto gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="
                    flex-1 md:w-64 px-4 py-3 rounded-xl
                    bg-env-surface border border-env-border
                    text-env-primary placeholder:text-env-tertiary
                    focus:outline-none focus:border-chapter-accent/50 focus:ring-2 focus:ring-chapter-accent/20
                    transition-all duration-200
                  "
                />
                <button
                  type="submit"
                  className="
                    px-6 py-3 rounded-xl
                    bg-chapter-accent hover:bg-chapter-accent-hover
                    text-white font-medium
                    transition-all duration-200
                    hover:shadow-lg hover:shadow-chapter-accent/25
                    whitespace-nowrap
                  "
                >
                  Subscribe
                </button>
              </form>
              
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative container-forge py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 md:gap-6">
          
          {/* Brand Column - Takes 2 columns on md+ */}
          <div className="col-span-2">
            <Link
              href="/"
              className="inline-block mb-6 transition-transform duration-200 hover:scale-105"
              aria-label="Forge Intellitech - Home"
            >
              <Image
                src="/images/logo.png"
                alt="Forge Intellitech"
                width={200}
                height={80}
                className="h-12 md:h-14 w-auto object-contain"
              />
            </Link>
            
            <p className="text-env-secondary leading-relaxed mb-6 max-w-xs">
              Building technology that understands Africa. Solutions rooted in
              local realities, designed for lasting impact.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    w-10 h-10 rounded-xl
                    bg-env-surface hover:bg-chapter-accent
                    border border-env-border hover:border-chapter-accent
                    flex items-center justify-center
                    text-env-secondary hover:text-white
                    transition-all duration-200
                    hover:scale-110 hover:shadow-lg hover:shadow-chapter-accent/25
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
              <h3 className="text-sm font-semibold text-env-primary uppercase tracking-wider mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="
                        text-sm text-env-secondary
                        hover:text-chapter-accent
                        transition-colors duration-200
                        inline-flex items-center group
                      "
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {link.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-env-border">
        <div className="container-forge py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Copyright */}
            <p className="text-sm text-env-tertiary">
              © {currentYear} Forge Intellitech Services Ltd.
            </p>
            
            {/* Center Element */}
            <div className="flex items-center gap-2 text-sm text-env-tertiary">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Building from Lagos, Nigeria</span>
              <span className="text-base">🇳🇬</span>
            </div>
            
            {/* Legal Links */}
            <div className="flex items-center gap-4 text-sm">
              <Link href="/privacy" className="text-env-tertiary hover:text-env-secondary transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-env-tertiary hover:text-env-secondary transition-colors">
                Terms
              </Link>
            </div>
            
          </div>
        </div>
      </div>
      
    </footer>
  );
}