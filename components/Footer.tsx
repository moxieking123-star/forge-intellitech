import Link from "next/link";
import Image from "next/image";  // ← ADD THIS IMPORT

// UPDATED: Added Gallery to Company links
const footerSections = [
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Our Products", href: "/products" },
      { name: "Gallery", href: "/gallery" },  // ← NEW: Added Gallery
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

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-env-secondary border-t border-env-border">
      <div className="container-forge section-padding">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12">
          
          {/* 
            UPDATED: Brand Column
            - Replaced gradient box + text with actual logo image
            - Logo loaded from /images/logo.png
            - Removed "Forge" and "ITS" text labels
          */}
          <div className="col-span-2 md:col-span-1">
            <Link 
              href="/" 
              className="inline-block mb-6 transition-opacity hover:opacity-80"
              aria-label="Forge Intellitech - Home"
            >
              {/* 
                NEW: Logo Image
                Replaces the previous gradient "F" box and text
              */}
              <Image
                src="/images/logo.png"
                alt="Forge Intellitech"
                width={160}
                height={52}
                className="h-12 w-auto object-contain"
              />
              {/* 
                REMOVED: Previous logo implementation
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">F</span>
                  </div>
                  <div>
                    <span className="text-lg font-bold text-env-primary">Forge</span>
                    <span className="text-lg font-light text-chapter-accent">ITS</span>
                  </div>
                </div>
              */}
            </Link>
            <p className="text-sm text-env-secondary leading-relaxed mb-6">
              Building technology that understands Africa. 
              Solutions rooted in local realities, 
              designed for global impact.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-3">
              {[
                { 
                  name: "Twitter",
                  href: "https://twitter.com/forgeintelli",
                  icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  )
                },
                {
                  name: "LinkedIn",
                  href: "https://linkedin.com/company/forge-intellitech",
                  icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  )
                },
                {
                  name: "GitHub",
                  href: "https://github.com/forge-intellitech",
                  icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  )
                },
              ].map((social) => (
                <a 
                  key={social.name}
                  href={social.href}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-env-surface hover:bg-env-surface-hover border border-env-border flex items-center justify-center text-env-secondary hover:text-chapter-accent transition-smooth"
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
                      className="text-sm text-env-secondary hover:text-env-primary transition-smooth"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-env-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* 
              UPDATED: Copyright text
              Changed from "ForgeITS" to "Forge Intellitech Services"
            */}
            <p className="text-sm text-env-secondary">
              © {currentYear} Forge Intellitech Services. All rights reserved.
            </p>
            <p className="text-sm text-env-secondary">
              Built with purpose in Africa 🌍
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}