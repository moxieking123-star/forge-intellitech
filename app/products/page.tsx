import Image from "next/image";
import Link from "next/link";
import SectionHeader from "../../components/SectionHeader";
import { ChapterWrapper } from "../../components/ChapterWrapper";
import { AnimatedSection } from "../../components/AnimatedSection";
import { StatusBadge } from "../../components/Badge";
import { CTASection } from "../../components/CTASection";

// Metadata for SEO
export const metadata = {
  title: "Our Products - Forge Intellitech",
  description: "Explore Forge Intellitech's products - TechUp, LaunchPad, BiteBank, and Trego. Systems built to strengthen African institutions, communities and infrastructure.",
};

// Product data
const products = [
  {
    id: "techup",
    name: "TechUp",
    tagline: "Education that creates builders",
    status: "pilot" as const,
    icon: "🎓",
    href: "/techup",
    hasPage: true,
    problem: "Most African schools want to teach digital skills but don't have the curriculum, tools, or clear path to make it happen. Students graduate without the practical tech skills their economy needs.",
    solution: "TechUp brings structured digital education directly into schools — with curriculum, tools, and support for teachers. Students learn design, web development, data, and digital literacy. By senior secondary, they choose their path: builder, strategist, or storyteller.",
    features: [
      "Complete curriculum that fits into school systems",
      "Foundation skills for junior secondary students",
      "Career paths for senior secondary: Builders, Strategists, Storytellers",
      "Digital ethics and cybersecurity basics",
      "Full support for teachers and facilitators",
      "Real projects that solve community problems",
    ],
    audience: [
      "JSS and SSS students in public and private schools",
      "Schools looking for real digital education programs",
      "Education ministries and authorities",
      "Community learning centers",
    ],
    operatesIn: "Secondary schools, community learning centers, and youth programs — partnering with teachers, school leaders, and local institutions.",
    impact: "Building digital capability in African schools, one classroom at a time.",
  },
  {
    id: "launchpad",
    name: "LaunchPad",
    tagline: "Where ideas become ventures",
    status: "development" as const,
    icon: "🚀",
    href: "/launchpad",
    hasPage: true,
    problem: "Young Africans with great ideas struggle to turn them into businesses. Funding is hard to find, mentorship is scattered, and most programs want to own part of what you build.",
    solution: "LaunchPad gives young entrepreneurs grant funding (no equity, no debt), training, and mentorship to build real businesses. It connects our best TechUp graduates and other young founders to the support they need to go from idea to launch.",
    features: [
      "Grant funding — no equity or debt required",
      "Intensive business training and incubation",
      "One-on-one mentorship from experienced founders",
      "Access to Forge's network of partners",
      "Demo days with potential supporters",
      "Alumni community and ongoing support",
    ],
    audience: [
      "Young entrepreneurs (18-30) with real ideas",
      "Top TechUp graduates ready to build businesses",
      "Early-stage founders solving African problems",
      "Teams serious about building something sustainable",
    ],
    operatesIn: "Innovation hubs, universities, founder communities, and early-stage startup ecosystems.",
    impact: "Launching the next generation of African founders.",
  },
  {
    id: "bitebank",
    name: "BiteBank",
    tagline: "Food security made simple",
    status: "development" as const,
    icon: "🍽️",
    href: "#bitebank",
    hasPage: false,
    problem: "Food vendors struggle to find customers. Families struggle to plan healthy, affordable meals. Too much food gets wasted. The whole system is disconnected.",
    solution: "BiteBank connects food vendors to customers through one simple platform. Families can plan meals with AI help, order from local vendors they trust, and reduce waste. Vendors get steady customers and better planning tools.",
    features: [
      "AI-powered meal planning for families",
      "Marketplace for local food vendors",
      "Smart inventory to cut down food waste",
      "Built-in delivery network",
      "Affordable, healthy meal options",
      "Data insights for vendors and planners",
    ],
    audience: [
      "Families looking for healthy, affordable meals",
      "Food vendors who want consistent customers",
      "Restaurants and kitchens trying to reduce waste",
      "Delivery providers in the food space",
    ],
    operatesIn: "Local food vendors, informal markets, delivery networks, and neighborhood food economies.",
    impact: "Making local food systems work better for everyone.",
  },
  {
    id: "trego",
    name: "Trego",
    tagline: "Mobility for every journey",
    status: "development" as const,
    icon: "🚌",
    href: "#trego",
    hasPage: false,
    problem: "Public transport in African cities is unreliable, unsafe, and unregulated. People — especially women and students — don't know when buses will come, where they'll go, or if they'll be safe.",
    solution: "Trego replaces informal transport with safe, regulated, electric vehicles you can track and book. Real-time updates, trained drivers, fair prices. Built for how Africans actually move around cities.",
    features: [
      "Safe, regulated transport with trained drivers",
      "Electric vehicles built for African cities",
      "Book via USSD or app — works for everyone",
      "Real-time tracking and route updates",
      "Affordable pricing for daily commuters",
      "Delivery options for small businesses",
    ],
    audience: [
      "Daily commuters who need reliable transport",
      "Students and workers on tight budgets",
      "Small businesses needing delivery services",
      "Communities without safe transport options",
    ],
    operatesIn: "Urban routes, commuter corridors, small business delivery lanes, and community transport networks.",
    impact: "Making city transport safe, reliable, and sustainable.",
  },
];

export default function ProductsPage() {
  return (
    <ChapterWrapper chapter="ignition">
      
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative section-padding flex items-center min-h-[60vh] overflow-hidden">
        {/* Background */}
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
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-env-primary mb-6 leading-tight">
                We build things that
                <br />
                <span className="gradient-text">actually work here.</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-env-secondary leading-relaxed max-w-3xl mb-6">
                Every product you see below solves a real problem — in education, business, food, or transport.
              </p>
              
              <p className="text-lg text-env-primary font-medium">
                These aren't just apps. <span className="text-chapter-accent">They're foundations</span> — built for the real Africa, not the one in tech conferences.
              </p>
              
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ==================== PRODUCTS OVERVIEW ==================== */}
      <section className="section-padding bg-env-secondary">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-env-primary mb-4">
                Four products. One connected system.
              </h2>
              <p className="text-env-secondary max-w-2xl mx-auto">
                Learning leads to business. Business creates jobs. Jobs strengthen communities.
              </p>
            </div>
          </AnimatedSection>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {products.map((product, index) => (
              <AnimatedSection key={product.id} animation="fade-up" delay={index * 75}>
                <a
                  href={`#${product.id}`}
                  className="block p-4 md:p-6 rounded-xl bg-env-surface border border-env-border hover:border-chapter-accent/50 transition-smooth text-center group hover-lift"
                >
                  <span className="text-3xl md:text-4xl block mb-3 group-hover:scale-110 transition-transform">
                    {product.icon}
                  </span>
                  <h3 className="font-semibold text-env-primary group-hover:text-chapter-accent transition-smooth">
                    {product.name}
                  </h3>
                </a>
              </AnimatedSection>
            ))}
          </div>
          
        </div>
      </section>

      {/* ==================== HOW WE DESIGN PRODUCTS ==================== */}
      <section className="section-padding">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-chapter-accent bg-chapter-accent-soft rounded-full border border-chapter-accent/20">
                  Our Approach
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-env-primary">
                  How we build
                </h2>
              </div>
              
              <div className="space-y-6 text-lg text-env-secondary leading-relaxed text-center">
                <p>
                  We don't start with code. We start with people.
                </p>
                <p className="text-env-primary font-medium text-xl">
                  Classrooms. Markets. Bus stops. Community halls.
                  <br />
                  <span className="text-chapter-accent">That's where our products begin.</span>
                </p>
              </div>
              
              <div className="mt-8 p-6 rounded-xl bg-chapter-accent/10 border border-chapter-accent/20">
                <p className="text-env-primary font-medium text-center">
                  We design for slow internet, shared devices, and real African life — while still meeting global standards.
                </p>
              </div>
            </div>
          </AnimatedSection>
          
        </div>
      </section>

      {/* ==================== DETAILED PRODUCTS ==================== */}
      {products.map((product, index) => (
        <section 
          key={product.id}
          id={product.id}
          className={`section-padding scroll-mt-20 ${index % 2 === 0 ? 'bg-env-secondary' : ''}`}
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
              
              <AnimatedSection animation="fade-left" delay={100}>
                <div className="p-6 md:p-8 rounded-xl bg-green-500/5 border border-green-500/20 h-full">
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-xl">✅</span>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-green-400">
                      How We Solve It
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
                
                <div>
                  <h3 className="text-xl font-semibold text-env-primary mb-4 flex items-center">
                    <span className="text-chapter-accent mr-2">⚡</span>
                    What It Does
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

            {/* Where It Operates */}
            <AnimatedSection animation="fade-up" delay={250}>
              <div className="mb-10 p-6 rounded-xl bg-env-surface border border-env-border">
                <h3 className="text-lg font-semibold text-env-primary mb-3 flex items-center">
                  <span className="text-chapter-accent mr-2">📍</span>
                  Where It Works
                </h3>
                <p className="text-env-secondary leading-relaxed">
                  {product.operatesIn}
                </p>
              </div>
            </AnimatedSection>

            {/* Impact & CTA */}
            <AnimatedSection animation="fade-up" delay={300}>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between p-6 rounded-xl bg-env-surface border border-env-border hover-glow transition-smooth">
                <div className="mb-4 md:mb-0">
                  <p className="text-sm text-env-tertiary uppercase tracking-wider mb-1">Impact</p>
                  <p className="text-xl font-semibold text-env-primary">{product.impact}</p>
                </div>
                {product.hasPage ? (
                  <Link
                    href={product.href}
                    className="inline-flex items-center px-6 py-3 bg-chapter-accent hover:bg-chapter-accent-hover text-white font-medium rounded-lg transition-smooth hover-lift"
                  >
                    Learn more about {product.name}
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                ) : (
                  <Link
                    href="/contact"
                    className="inline-flex items-center px-6 py-3 bg-env-surface-hover text-env-primary font-medium rounded-lg border border-env-border transition-smooth hover-lift"
                  >
                    Get notified when it launches
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

      {/* ==================== WHY WE BUILD THIS WAY ==================== */}
      <section className="section-padding bg-env-secondary">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-chapter-accent bg-chapter-accent-soft rounded-full border border-chapter-accent/20">
                  Our Philosophy
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-env-primary">
                  Why we build this way
                </h2>
              </div>
              
              <div className="space-y-6 text-lg text-env-secondary leading-relaxed text-center">
                <p className="text-env-primary font-medium text-xl">
                  Africa doesn't lack ideas.
                  <br />
                  <span className="text-chapter-accent">It lacks systems that last.</span>
                </p>
                <p>
                  So we build slowly, intentionally, and for the long term.
                </p>
              </div>
              
              <div className="mt-8 p-6 rounded-xl bg-env-surface border border-env-border">
                <h3 className="text-lg font-semibold text-env-primary mb-4 text-center">We prioritize:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "Fitting into government systems",
                    "Working with real infrastructure",
                    "Supporting teachers and facilitators",
                    "Building for low-resource environments",
                    "Long-term adoption over quick wins",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center p-3 rounded-lg bg-chapter-accent/10 border border-chapter-accent/20">
                      <svg className="w-5 h-5 text-chapter-accent mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-env-primary text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-8 p-6 rounded-xl bg-chapter-accent/10 border border-chapter-accent/20 text-center">
                <p className="text-xl text-env-primary font-medium">
                  That's how technology becomes infrastructure — <span className="text-chapter-accent">not just another app.</span>
                </p>
              </div>
            </div>
          </AnimatedSection>
          
        </div>
      </section>

      {/* ==================== CTA SECTION ==================== */}
      <CTASection
        badge="Partner With Us"
        headline="Want to build"
        highlightedText="with us?"
        description="We work with governments, schools, development organizations, and companies who understand that real progress takes more than software. If you're building for African communities — let's talk."
        primaryAction={{
          label: "Become a Partner",
          href: "/join#partners",
        }}
        secondaryAction={{
          label: "Get In Touch",
          href: "/contact",
        }}
        backgroundImage="/images/cta/products-cta.jpg"
        overlayOpacity={80}
      />
      
    </ChapterWrapper>
  );
}
