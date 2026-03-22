// app/products/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { ChapterWrapper } from "../../components/ChapterWrapper";
import AnimatedSection from "../../components/AnimatedSection";
import ProductsHero from "../../components/ProductsHero";
import { CTASection } from "../../components/CTASection";
import {
  IconLearn,
  IconLaunch,
  IconFood,
  IconTransport,
  IconProblem,
  IconSolution,
  IconCheck,
  IconCommunity,
  IconArrowRight,
  IconTarget,
  IconGrowth,
  IconSchool,
} from "../../components/icons/ForgeIcons";

// Product data
const products = [
  {
    id: "techup",
    name: "TechUp",
    tagline: "Education that creates builders",
    status: "pilot",
    icon: IconLearn,
    color: "#14B8B8",
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
    impact: "Building digital capability in African schools, one classroom at a time.",
  },
  {
    id: "launchpad",
    name: "LaunchPad",
    tagline: "Where ideas become ventures",
    status: "active",
    icon: IconLaunch,
    color: "#FF8C42",
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
    impact: "Launching the next generation of African founders.",
  },
  {
    id: "bitebank",
    name: "BiteBank",
    tagline: "Food security made simple",
    status: "development",
    icon: IconFood,
    color: "#52B788",
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
    impact: "Making local food systems work better for everyone.",
  },
  {
    id: "trego",
    name: "Trego",
    tagline: "Mobility for every journey",
    status: "development",
    icon: IconTransport,
    color: "#FFD54F",
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
    impact: "Making city transport safe, reliable, and sustainable.",
  },
];

const statusLabels: Record<string, { label: string; color: string }> = {
  pilot: { label: "Live Pilot", color: "#52B788" },
  active: { label: "Active", color: "#14B8B8" },
  development: { label: "In Development", color: "#FF8C42" },
};

export default function ProductsPage() {
  return (
    <ChapterWrapper chapter="forge">
      
      {/* ==================== ANIMATED HERO ==================== */}
      <ProductsHero />

      {/* ==================== PRODUCTS OVERVIEW ==================== */}
      <section className="section-padding bg-env-bg-primary">
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
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
            {products.map((product, index) => {
              const Icon = product.icon;
              return (
                <AnimatedSection key={product.id} animation="fade-up" delay={index * 75}>
                  <a
                    href={`#${product.id}`}
                    className="block p-5 md:p-6 rounded-xl bg-env-surface border border-env-border hover:border-transparent transition-all duration-300 text-center group"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = product.color + '50';
                      e.currentTarget.style.boxShadow = `0 15px 30px ${product.color}15`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--env-border)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div className="mb-3 flex justify-center transition-transform group-hover:scale-110">
                      <Icon size={40} color={product.color} />
                    </div>
                    <h3 
                      className="font-semibold transition-colors"
                      style={{ color: 'var(--env-text-primary)' }}
                    >
                      {product.name}
                    </h3>
                    <p className="text-xs mt-1" style={{ color: product.color }}>
                      {product.tagline}
                    </p>
                  </a>
                </AnimatedSection>
              );
            })}
          </div>
          
        </div>
      </section>

      {/* ==================== HOW WE DESIGN ==================== */}
      <section className="section-padding bg-env-secondary">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-[#FF8C42] bg-[#FF8C42]/10 rounded-full border border-[#FF8C42]/20">
                  Our Approach
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-4">
                  How we build
                </h2>
              </div>
              
              <div className="text-center mb-8">
                <p className="text-lg text-env-secondary mb-4">
                  We don't start with code. We start with people.
                </p>
                <p className="text-xl text-env-primary font-medium">
                  Classrooms. Markets. Bus stops. Community halls.
                  <br />
                  <span className="text-[#FF8C42]">That's where our products begin.</span>
                </p>
              </div>
              
              <div 
                className="p-6 rounded-xl text-center"
                style={{ 
                  backgroundColor: 'rgba(255, 140, 66, 0.08)',
                  border: '1px solid rgba(255, 140, 66, 0.2)'
                }}
              >
                <p className="text-env-primary font-medium">
                  We design for slow internet, shared devices, and real African life — 
                  while still meeting global standards.
                </p>
              </div>
            </div>
          </AnimatedSection>
          
        </div>
      </section>

      {/* ==================== DETAILED PRODUCTS ==================== */}
      {products.map((product, index) => {
        const Icon = product.icon;
        const status = statusLabels[product.status];
        
        return (
          <section 
            key={product.id}
            id={product.id}
            className={`section-padding scroll-mt-20 ${index % 2 === 0 ? 'bg-env-bg-primary' : 'bg-env-secondary'}`}
          >
            <div className="container-forge">
              
              {/* Product Header */}
              <AnimatedSection animation="fade-up">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
                  <div className="flex items-center gap-4 mb-4 md:mb-0">
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: `${product.color}20` }}
                    >
                      <Icon size={36} color={product.color} />
                    </div>
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold text-env-primary">
                        {product.name}
                      </h2>
                      <p style={{ color: product.color }} className="font-medium">
                        {product.tagline}
                      </p>
                    </div>
                  </div>
                  <span 
                    className="px-4 py-2 rounded-full text-sm font-semibold inline-flex items-center gap-2 w-fit"
                    style={{ 
                      backgroundColor: `${status.color}15`,
                      color: status.color,
                      border: `1px solid ${status.color}30`
                    }}
                  >
                    <span 
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: status.color }}
                    />
                    {status.label}
                  </span>
                </div>
              </AnimatedSection>

              {/* Problem & Solution */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
                
                <AnimatedSection animation="fade-up" delay={100}>
                  <div 
                    className="p-6 md:p-8 rounded-2xl h-full"
                    style={{ 
                      backgroundColor: 'rgba(239, 68, 68, 0.05)',
                      border: '1px solid rgba(239, 68, 68, 0.15)'
                    }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <IconProblem size={24} color="#EF4444" />
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-[#EF4444]">
                        The Problem
                      </h3>
                    </div>
                    <p className="text-env-secondary leading-relaxed">
                      {product.problem}
                    </p>
                  </div>
                </AnimatedSection>
                
                <AnimatedSection animation="fade-up" delay={150}>
                  <div 
                    className="p-6 md:p-8 rounded-2xl h-full"
                    style={{ 
                      backgroundColor: 'rgba(82, 183, 136, 0.05)',
                      border: '1px solid rgba(82, 183, 136, 0.15)'
                    }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <IconSolution size={24} color="#52B788" />
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-[#52B788]">
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
                    <h3 className="text-xl font-semibold text-env-primary mb-4 flex items-center gap-2">
                      <IconTarget size={24} color={product.color} />
                      What It Does
                    </h3>
                    <ul className="space-y-3">
                      {product.features.map((feature, i) => (
                        <li key={i} className="flex items-start text-env-secondary">
                          <IconCheck size={20} color={product.color} className="mr-3 mt-0.5 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-env-primary mb-4 flex items-center gap-2">
                      <IconCommunity size={24} color="#A855F7" />
                      Who It's For
                    </h3>
                    <ul className="space-y-3">
                      {product.audience.map((item, i) => (
                        <li key={i} className="flex items-start text-env-secondary">
                          <span 
                            className="w-2 h-2 rounded-full mr-3 mt-2 flex-shrink-0"
                            style={{ backgroundColor: '#A855F7' }}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                </div>
              </AnimatedSection>

              {/* Impact & CTA */}
              <AnimatedSection animation="fade-up" delay={250}>
                <div 
                  className="flex flex-col md:flex-row md:items-center md:justify-between p-6 rounded-2xl"
                  style={{ 
                    backgroundColor: 'var(--env-surface)',
                    border: '1px solid var(--env-border)'
                  }}
                >
                  <div className="mb-4 md:mb-0">
                    <p className="text-sm text-env-tertiary uppercase tracking-wider mb-1">Impact</p>
                    <p className="text-xl font-semibold text-env-primary">{product.impact}</p>
                  </div>
                  {product.hasPage ? (
                    <Link
                      href={product.href}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02]"
                      style={{ 
                        backgroundColor: product.color,
                        color: '#1A1A1A'
                      }}
                    >
                      Learn more about {product.name}
                      <IconArrowRight size={18} color="#1A1A1A" />
                    </Link>
                  ) : (
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02]"
                      style={{ 
                        backgroundColor: 'var(--env-surface-hover)',
                        color: 'var(--env-text-primary)',
                        border: '1px solid var(--env-border)'
                      }}
                    >
                      Get notified when it launches
                    </Link>
                  )}
                </div>
              </AnimatedSection>
              
            </div>
          </section>
        );
      })}

      {/* ==================== WHY WE BUILD THIS WAY ==================== */}
      <section className="section-padding bg-env-secondary">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-[#14B8B8] bg-[#14B8B8]/10 rounded-full border border-[#14B8B8]/20">
                  Our Philosophy
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-4">
                  Why we build this way
                </h2>
              </div>
              
              <div className="text-center mb-8">
                <p className="text-xl text-env-primary font-medium mb-4">
                  Africa doesn't lack ideas.
                  <br />
                  <span className="text-[#FF8C42]">It lacks systems that last.</span>
                </p>
                <p className="text-lg text-env-secondary">
                  So we build slowly, intentionally, and for the long term.
                </p>
              </div>
              
              <div className="p-6 rounded-xl bg-env-surface border border-env-border mb-8">
                <h3 className="text-lg font-semibold text-env-primary mb-4 text-center">We prioritize:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "Fitting into government systems",
                    "Working with real infrastructure",
                    "Supporting teachers and facilitators",
                    "Building for low-resource environments",
                    "Long-term adoption over quick wins",
                  ].map((item, i) => (
                    <div 
                      key={i} 
                      className="flex items-center p-3 rounded-lg"
                      style={{ 
                        backgroundColor: 'rgba(20, 184, 184, 0.08)',
                        border: '1px solid rgba(20, 184, 184, 0.15)'
                      }}
                    >
                      <IconCheck size={18} color="#14B8B8" className="mr-3 flex-shrink-0" />
                      <span className="text-env-primary text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div 
                className="p-6 rounded-xl text-center"
                style={{ 
                  backgroundColor: 'rgba(255, 140, 66, 0.08)',
                  border: '1px solid rgba(255, 140, 66, 0.2)'
                }}
              >
                <p className="text-xl text-env-primary font-medium">
                  That's how technology becomes infrastructure —{' '}
                  <span className="text-[#FF8C42]">not just another app.</span>
                </p>
              </div>
            </div>
          </AnimatedSection>
          
        </div>
      </section>

      {/* ==================== CTA SECTION ==================== */}
      <CTASection
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