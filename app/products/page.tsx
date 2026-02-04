import Image from "next/image";  // ← ADD THIS IMPORT
import SectionHeader from "../../components/SectionHeader";
import Link from "next/link";
import { ChapterWrapper } from "../../components/ChapterWrapper";
import { AnimatedSection } from "../../components/AnimatedSection";
import { StatusBadge } from "../../components/Badge";

// Metadata for SEO
export const metadata = {
  title: "Our Products",
  description: "Explore Forge Intellitech's products - TechUp, LaunchPad, BiteBank, and Trego. Technology solutions built for Africa.",
};

// Detailed product information
const products = [
  {
    id: "techup",
    name: "TechUp",
    tagline: "Education that creates builders",
    status: "pilot" as const,
    icon: "🎓",
    href: "/techup",
    hasPage: true,
    problem: "Africa has millions of talented young people, but traditional education often fails to prepare them for the digital economy. Skills gaps widen while opportunities pass by.",
    solution: "TechUp is a practical skills development program that teaches real-world digital skills. From coding to digital marketing, we prepare African youth to compete globally — and build locally.",
    features: [
      "Industry-relevant curriculum designed with employers",
      "Hands-on projects with real-world applications",
      "Mentorship from working professionals",
      "Job placement support and career guidance",
      "Flexible learning paths for different skill levels",
    ],
    audience: [
      "Young people seeking digital skills (16-35)",
      "Schools looking to enhance their curriculum",
      "Organizations wanting to upskill their workforce",
      "Parents investing in their children's future",
    ],
    impact: "Preparing the next generation of African tech talent",
  },
  {
    id: "launchpad",
    name: "LaunchPad",
    tagline: "Where ideas become ventures",
    status: "development" as const,
    icon: "🚀",
    href: "/launchpad",
    hasPage: true,
    problem: "Young African entrepreneurs have brilliant ideas but lack funding, mentorship, and support to bring them to life. Traditional investors often overlook early-stage African ventures.",
    solution: "LaunchPad is a grant-based innovation program that provides funding, training, and mentorship to young entrepreneurs. No equity taken — we invest in people, not just profits.",
    features: [
      "Grant funding (no equity, no debt)",
      "12-week intensive incubation program",
      "One-on-one mentorship from successful founders",
      "Access to Forge's network of partners and investors",
      "Demo day with potential investors and partners",
    ],
    audience: [
      "Young entrepreneurs (18-30) with viable ideas",
      "Early-stage startups needing support",
      "Innovators solving African problems",
      "Teams with passion and commitment",
    ],
    impact: "Launching the next generation of African businesses",
  },
  {
    id: "bitebank",
    name: "BiteBank",
    tagline: "Food security made simple",
    status: "development" as const,
    icon: "🍽️",
    href: "#bitebank",
    hasPage: false,
    problem: "Food waste is massive while hunger persists. Street vendors struggle to reach customers. Consumers lack access to affordable, quality meals. The food ecosystem is broken.",
    solution: "BiteBank connects food vendors, consumers, and logistics providers on one platform. Reduce waste, improve access, and create economic opportunities across the food value chain.",
    features: [
      "Vendor marketplace for local food sellers",
      "Real-time inventory to reduce waste",
      "Affordable meal discovery for consumers",
      "Integrated delivery and logistics",
      "Data insights for better food planning",
    ],
    audience: [
      "Food vendors seeking more customers",
      "Consumers looking for affordable meals",
      "Restaurants wanting to reduce waste",
      "Logistics providers in the food space",
    ],
    impact: "Making food accessible while reducing waste",
  },
  {
    id: "trego",
    name: "Trego",
    tagline: "Trade without borders",
    status: "development" as const,
    icon: "📦",
    href: "#trego",
    hasPage: false,
    problem: "Cross-border trade in Africa is complicated, expensive, and risky. Small merchants face impossible barriers. Goods move slowly. Opportunities are lost.",
    solution: "Trego simplifies cross-border commerce with integrated logistics, payments, and documentation. We make it as easy to sell across Africa as it is to sell across the street.",
    features: [
      "Simplified customs and documentation",
      "Integrated cross-border payments",
      "Reliable logistics network",
      "Trade financing options",
      "Market access across African countries",
    ],
    audience: [
      "Small and medium merchants",
      "Manufacturers seeking new markets",
      "Importers and exporters",
      "Logistics companies",
    ],
    impact: "Unlocking intra-African trade potential",
  },
];

export default function ProductsPage() {
  return (
    <ChapterWrapper chapter="forge">
      
      {/* ==================== HERO SECTION ==================== */}
      {/* UPDATED: Added hero background image */}
      <section className="relative section-padding flex items-center min-h-[50vh] overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/products/hero-products.jpg"
            alt=""
            fill
            className="object-cover opacity-20"
            priority
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-env-bg-primary via-env-bg-primary/95 to-env-bg-primary/80" />
        </div>

        {/* Decorative elements */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-chapter-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container-forge relative z-10">
          <AnimatedSection animation="fade-up">
            <div className="max-w-4xl">
              
              <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-wider text-chapter-accent bg-chapter-accent-soft rounded-full border border-chapter-accent/20">
                Our Products
              </span>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-env-primary mb-6">
                Technology that 
                <span className="gradient-text"> solves real problems.</span>
              </h1>
              
              <p className="text-xl text-env-secondary leading-relaxed max-w-3xl">
                Every product we build addresses a critical gap in African infrastructure. 
                From education to trade, we're creating the tools our continent needs 
                to thrive in the digital age.
              </p>
              
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ==================== PRODUCTS OVERVIEW ==================== */}
      <section className="section-padding bg-env-secondary">
        <div className="container-forge">
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {products.map((product, index) => (
              <AnimatedSection key={product.id} animation="fade-up" delay={index * 75}>
                <a
                  href={`#${product.id}`}
                  className="block p-4 md:p-6 rounded-xl bg-env-surface border border-env-border hover:border-chapter-accent/50 transition-smooth text-center group hover-lift"
                >
                  <span className="text-3xl md:text-4xl block mb-3 group-hover:scale-110 transition-transform">{product.icon}</span>
                  <h3 className="font-semibold text-env-primary group-hover:text-chapter-accent transition-smooth">
                    {product.name}
                  </h3>
                </a>
              </AnimatedSection>
            ))}
          </div>
          
        </div>
      </section>

      {/* ==================== DETAILED PRODUCTS ==================== */}
      {products.map((product, index) => (
        <section 
          key={product.id}
          id={product.id}
          className={`section-padding scroll-mt-20 ${index % 2 === 0 ? '' : 'bg-env-secondary'}`}
        >
          <div className="container-forge">
            
            {/* Product Header */}
            <AnimatedSection animation="fade-up">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
                <div className="flex items-center space-x-4 mb-4 md:mb-0">
                  <span className="text-5xl">{product.icon}</span>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-env-primary">
                      {product.name}
                    </h2>
                    <p className="text-chapter-accent font-medium">
                      {product.tagline}
                    </p>
                  </div>
                </div>
                <StatusBadge status={product.status} />
              </div>
            </AnimatedSection>

            {/* Problem & Solution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
              
              {/* Problem */}
              <AnimatedSection animation="fade-right" delay={100}>
                <div className="p-6 md:p-8 rounded-xl bg-red-500/5 border border-red-500/20 h-full">
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-xl">⚠️</span>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-red-400">
                      The Problem
                    </h3>
                  </div>
                  <p className="text-env-secondary leading-relaxed">
                    {product.problem}
                  </p>
                </div>
              </AnimatedSection>
              
              {/* Solution */}
              <AnimatedSection animation="fade-left" delay={100}>
                <div className="p-6 md:p-8 rounded-xl bg-green-500/5 border border-green-500/20 h-full">
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-xl">✅</span>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-green-400">
                      Our Solution
                    </h3>
                  </div>
                  <p className="text-env-secondary leading-relaxed">
                    {product.solution}
                  </p>
                </div>
              </AnimatedSection>
              
            </div>

            {/* Features & Audience */}
            <AnimatedSection animation="fade-up" delay={200}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                
                {/* Features */}
                <div>
                  <h3 className="text-xl font-semibold text-env-primary mb-4 flex items-center">
                    <span className="text-chapter-accent mr-2">⚡</span>
                    Key Features
                  </h3>
                  <ul className="space-y-3">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex items-start text-env-secondary">
                        <svg className="w-5 h-5 text-chapter-accent mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Audience */}
                <div>
                  <h3 className="text-xl font-semibold text-env-primary mb-4 flex items-center">
                    <span className="text-chapter-accent mr-2">👥</span>
                    Who It's For
                  </h3>
                  <ul className="space-y-3">
                    {product.audience.map((item, i) => (
                      <li key={i} className="flex items-start text-env-secondary">
                        <svg className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
              </div>
            </AnimatedSection>

            {/* Impact Statement & CTA */}
            <AnimatedSection animation="fade-up" delay={300}>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between p-6 rounded-xl bg-env-surface border border-env-border hover-glow transition-smooth">
                <div className="mb-4 md:mb-0">
                  <p className="text-sm text-env-tertiary uppercase tracking-wider mb-1">Impact</p>
                  <p className="text-xl font-semibold text-env-primary">{product.impact}</p>
                </div>
                {product.hasPage ? (
                  <Link
                    href={product.href}
                    className="inline-flex items-center px-6 py-3 bg-chapter-accent hover:bg-chapter-accent-hover text-env-text-inverse font-medium rounded-lg transition-smooth hover-lift"
                  >
                    Learn more about {product.name}
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                ) : (
                  <Link
                    href="/contact"
                    className="inline-flex items-center px-6 py-3 bg-env-surface-hover hover:bg-env-border text-env-primary font-medium rounded-lg border border-env-border transition-smooth hover-lift"
                  >
                    Get notified when {product.name} launches
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </Link>
                )}
              </div>
            </AnimatedSection>
            
          </div>
        </section>
      ))}

      {/* ==================== PARTNERSHIP CTA ==================== */}
      <section className="section-padding bg-gradient-to-b from-env-bg-primary to-env-bg-secondary">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="text-center max-w-3xl mx-auto">
              
              <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-wider text-purple-400 bg-purple-500/10 rounded-full border border-purple-500/20">
                Partner With Us
              </span>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-env-primary mb-6">
                Want to build with us?
              </h2>
              
              <p className="text-lg text-env-secondary mb-10">
                We're always looking for partners who share our vision. Whether you're an 
                investor, a potential client, or an organization that wants to collaborate — 
                we'd love to hear from you.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/join#partners"
                  className="px-8 py-4 bg-chapter-accent hover:bg-chapter-accent-hover text-env-text-inverse font-medium rounded-lg transition-smooth glow hover-lift"
                >
                  Become a Partner
                </Link>
                <Link
                  href="/join#investors"
                  className="px-8 py-4 bg-env-surface hover:bg-env-surface-hover text-env-primary font-medium rounded-lg border border-env-border transition-smooth hover-lift"
                >
                  Invest in Forge
                </Link>
              </div>
              
            </div>
          </AnimatedSection>
          
        </div>
      </section>
      
    </ChapterWrapper>
  );
}