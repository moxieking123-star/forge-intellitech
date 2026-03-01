"use client";

import Image from "next/image";
import Link from "next/link";
import ProductCard from "../components/ProductCard";
import SectionHeader from "../components/SectionHeader";
import { ChapterWrapper } from "../components/ChapterWrapper";
import { AnimatedSection } from "../components/AnimatedSection";
import { CTASection } from "../components/CTASection";

// Products data
const products = [
  {
    name: "TechUp",
    tagline: "Education that creates builders",
    description: "TechUp transforms classrooms into innovation hubs, training students from JSS1 to SSS3 with real, hands-on digital skills — empowering the next generation of African builders, storytellers, and strategists.",
    status: "pilot" as const,
    href: "/techup",
    icon: "🎓",
  },
  {
    name: "LaunchPad",
    tagline: "Where ideas take flight",
    description: "LaunchPad turns bold ideas into thriving ventures. We provide grant funding, mentorship, and guidance to young entrepreneurs without taking equity — giving wings to African innovation.",
    status: "development" as const,
    href: "/launchpad",
    icon: "🚀",
  },
  {
    name: "BiteBank",
    tagline: "Food security, simplified",
    description: "BiteBank helps people plan meals using AI to achieve healthy lifestyle goals. Users order from trusted vendors who prepare local cuisines, reducing food and financial waste.",
    status: "development" as const,
    href: "/products#bitebank",
    icon: "🍽️",
  },
  {
    name: "Trego",
    tagline: "Mobility for every journey",
    description: "Trego is a shared public transport platform designed to replace traditional, unregulated buses with safe, affordable, and fully electric vehicles for African cities.",
    status: "development" as const,
    href: "/products#trego",
    icon: "🚌",
  },
];

// Why Forge points
const whyForgePoints = [
  {
    title: "Built for Africa",
    description: "We create from within — solutions that understand local systems, culture, and infrastructure, not borrowed ideas.",
    icon: "🌍",
  },
  {
    title: "Impact First",
    description: "Every product must solve a tangible problem for real people. Success is measured in lives improved and communities empowered.",
    icon: "💡",
  },
  {
    title: "Long-term Vision",
    description: "We build for generations. Every system and platform is designed to endure, grow, and multiply impact over time.",
    icon: "🔭",
  },
  {
    title: "Open Ecosystem",
    description: "Collaboration beats competition. Our platforms are designed to integrate, partner, and scale alongside other innovators.",
    icon: "🤝",
  },
];

// Impact stats
const impactStats = [
  { value: "10+", label: "Schools running TechUp classes", evidence: "Classrooms, labs, facilitators" },
  { value: "4+", label: "Community outreach programmes", evidence: "Community halls, public demos" },
  { value: "2+", label: "Primary school TechUp pilot classes", evidence: "Design & coding sessions" },
  { value: "3+", label: "Faith-based & civic tech sessions", evidence: "Churches, mosques, civic halls" },
  { value: "30+", label: "Free public workshops delivered", evidence: "Facilitators, learners, showcases" },
  { value: "2500+", label: "Students trained in digital skills", evidence: "Design, web, data, tools" },
];

export default function HomePage() {
  return (
    <ChapterWrapper chapter="forge">
      
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative flex flex-col items-center justify-center min-h-[90vh] overflow-hidden">
        
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-background.jpg"
            alt=""
            fill
            className="object-cover"
            priority
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-env-bg-primary" />
        </div>

        {/* Decorative glow elements */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-chapter-accent/15 rounded-full blur-3xl animate-subtle-pulse" />
          <div className="absolute bottom-1/3 right-1/3 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container-forge text-center relative z-10 px-6">
          
          <AnimatedSection animation="fade-up">
            <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 leading-tight">
              <span className="text-white drop-shadow-lg">We stopped waiting</span>
              <br />
              <span className="text-white drop-shadow-lg">for the future.</span>
              <br />
              <span className="gradient-text">We started building it.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto drop-shadow-md">
              Technology and education, forged from African soil.
            </p>
          </AnimatedSection>
          
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <AnimatedSection animation="fade-up" delay={500}>
            <div className="flex flex-col items-center text-white/50">
              <span className="text-xs uppercase tracking-widest mb-2">Discover</span>
              <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ==================== MISSION SECTION (New) ==================== */}
      <section className="section-padding bg-env-bg-primary">
        <div className="container-forge">
          
          <div className="max-w-5xl mx-auto">
            
            <AnimatedSection animation="fade-up">
              <div className="text-center mb-12">
                <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-wider text-chapter-accent bg-chapter-accent-soft rounded-full border border-chapter-accent/20">
                  Our Purpose
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-env-primary mb-6">
                  Building the hidden infrastructure of Africa's future
                </h2>
                <p className="text-xl text-env-secondary max-w-3xl mx-auto leading-relaxed">
                  Not just software — but human capability.
                </p>
              </div>
            </AnimatedSection>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <AnimatedSection animation="fade-up" delay={100}>
                <div className="text-center p-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-chapter-accent/10 flex items-center justify-center">
                    <span className="text-3xl">🏫</span>
                  </div>
                  <h3 className="text-lg font-semibold text-env-primary mb-2">From Classrooms</h3>
                  <p className="text-env-secondary text-sm">
                    Training young minds in public schools and community halls
                  </p>
                </div>
              </AnimatedSection>
              
              <AnimatedSection animation="fade-up" delay={200}>
                <div className="text-center p-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-chapter-accent/10 flex items-center justify-center">
                    <span className="text-3xl">💡</span>
                  </div>
                  <h3 className="text-lg font-semibold text-env-primary mb-2">To Creators</h3>
                  <p className="text-env-secondary text-sm">
                    Cultivating designers, builders and first-time founders
                  </p>
                </div>
              </AnimatedSection>
              
              <AnimatedSection animation="fade-up" delay={300}>
                <div className="text-center p-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-chapter-accent/10 flex items-center justify-center">
                    <span className="text-3xl">🌍</span>
                  </div>
                  <h3 className="text-lg font-semibold text-env-primary mb-2">For Africa</h3>
                  <p className="text-env-secondary text-sm">
                    Deploying systems that understand our world
                  </p>
                </div>
              </AnimatedSection>
            </div>
            
            <AnimatedSection animation="fade-up" delay={400}>
              <div className="p-8 rounded-2xl bg-env-surface border border-env-border text-center">
                <p className="text-lg md:text-xl text-env-secondary leading-relaxed mb-6">
                  We train minds, deploy systems and cultivate builders who understand their world before trying to change it.
                </p>
                <p className="text-xl md:text-2xl text-env-primary font-medium italic">
                  We are not importing progress.<br />
                  <span className="text-chapter-accent">We are engineering it — patiently, locally and at scale.</span>
                </p>
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="fade-up" delay={500}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
                <Link
                  href="/about"
                  className="px-8 py-4 bg-chapter-accent hover:bg-chapter-accent-hover text-white font-medium rounded-lg transition-smooth glow hover-lift"
                >
                  Learn Our Story
                </Link>
                <Link
                  href="/products"
                  className="px-8 py-4 bg-env-surface hover:bg-env-surface-hover text-env-primary font-medium rounded-lg border border-env-border transition-smooth hover-lift"
                >
                  Explore Our Products
                </Link>
              </div>
            </AnimatedSection>
            
          </div>
          
        </div>
      </section>

      {/* ==================== PRODUCTS SECTION ==================== */}
      <section className="section-padding bg-env-secondary">
        <div className="container-forge">
          
          <SectionHeader
            label="What We're Building"
            title="Products with Purpose"
            description="Every product we build is a response to a structural gap in African systems — education, entrepreneurship, food security and urban mobility. Together, TechUp, LaunchPad, BiteBank and Trego form a single ecosystem — designed to move young people from curiosity, to skill, to enterprise, to economic participation."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map((product, index) => (
              <AnimatedSection 
                key={product.name} 
                animation="fade-up"
                delay={index * 100}
              >
                <ProductCard {...product} />
              </AnimatedSection>
            ))}
          </div>
          
          <AnimatedSection animation="fade-up" delay={400}>
            <div className="text-center mt-12">
              <Link
                href="/products"
                className="inline-flex items-center text-chapter-accent hover:opacity-80 font-medium transition-smooth group"
              >
                View all products
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </AnimatedSection>
          
        </div>
      </section>

      {/* ==================== WHY FORGE SECTION ==================== */}
      <section className="section-padding">
        <div className="container-forge">
          
          <SectionHeader
            label="Our Approach"
            title="Why Forge?"
            description="Forge is not optimising convenience. We are redesigning access — to skills, opportunity, infrastructure and digital dignity. Our advantage is simple and difficult at the same time: we build from lived African realities, not from imported assumptions."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whyForgePoints.map((point, index) => (
              <AnimatedSection 
                key={point.title}
                animation="fade-up"
                delay={index * 75}
              >
                <div className="p-6 rounded-xl bg-env-surface border border-env-border hover:border-chapter-accent/30 hover-lift hover-glow transition-smooth">
                  <span className="text-3xl mb-4 block">{point.icon}</span>
                  <h3 className="text-xl font-semibold text-env-primary mb-2">
                    {point.title}
                  </h3>
                  <p className="text-env-secondary leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
          
        </div>
      </section>

      {/* ==================== IMPACT STATS SECTION ==================== */}
      <section className="section-padding bg-env-secondary">
        <div className="container-forge">

          <AnimatedSection animation="fade-up">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-chapter-accent bg-chapter-accent-soft rounded-full border border-chapter-accent/20">
                Field-Verified
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-4">
                Impact Snapshot
              </h2>
              <p className="text-env-secondary max-w-2xl mx-auto">
                Real numbers from real classrooms, community halls and public programmes.
              </p>
            </div>
          </AnimatedSection>

          <div className="flex flex-col lg:flex-row items-center gap-12">
            
            {/* Image on the left */}
            <AnimatedSection animation="fade-right" className="w-full lg:w-1/2">
              <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden">
                <Image
                  src="/images/africa-go.jpg"
                  alt="Forge community programmes and classroom activities"
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>
            </AnimatedSection>

            {/* Stats on the right */}
            <div className="w-full lg:w-1/2">
              <AnimatedSection animation="fade-left" delay={100}>
                <div className="grid grid-cols-2 gap-6">
                  {impactStats.map((stat, index) => (
                    <div key={stat.label} className="p-4 rounded-xl bg-env-surface border border-env-border">
                      <div className="text-3xl md:text-4xl font-bold text-chapter-accent mb-2">
                        {stat.value}
                      </div>
                      <div className="text-env-primary text-sm font-medium mb-1">
                        {stat.label}
                      </div>
                      <div className="text-env-tertiary text-xs">
                        📷 {stat.evidence}
                      </div>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>

          </div>
          
          {/* Transition Statement */}
          <AnimatedSection animation="fade-up" delay={200}>
            <div className="mt-12 text-center">
              <p className="text-lg text-env-primary font-medium">
                These numbers are not growth metrics.<br />
                <span className="text-chapter-accent">They are proof of presence.</span>
              </p>
            </div>
          </AnimatedSection>
          
        </div>
      </section>

      {/* ==================== STORY SECTION ==================== */}
      <section className="section-padding">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-chapter-accent bg-chapter-accent-soft rounded-full border border-chapter-accent/20">
                The Journey
              </span>
              
              <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-6">
                From classroom to capability
              </h2>
              
              <div className="space-y-6 text-lg text-env-secondary leading-relaxed">
                <p>
                  <strong className="text-env-primary">TechUp is where most journeys begin.</strong>
                </p>
                <p>
                  Junior secondary students rotate through design, web creation, data thinking and digital collaboration — discovering how technology actually works, not just how it is used.
                </p>
                <p>
                  At senior level, learners specialise into <span className="text-chapter-accent font-medium">builders</span>, <span className="text-chapter-accent font-medium">strategists</span> and <span className="text-chapter-accent font-medium">storytellers</span> — preparing not only for employment, but for enterprise, leadership and digital authorship.
                </p>
              </div>
              
              <div className="mt-8 p-6 rounded-xl bg-chapter-accent/10 border border-chapter-accent/20">
                <p className="text-xl text-env-primary font-medium">
                  Forge exists to ensure African students do not only consume the future — <span className="text-chapter-accent">they design it.</span>
                </p>
              </div>
              
              <Link
                href="/techup"
                className="inline-flex items-center mt-8 text-chapter-accent hover:opacity-80 font-medium transition-smooth group"
              >
                Explore TechUp
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </AnimatedSection>
          
        </div>
      </section>

      {/* ==================== CTA SECTION ==================== */}
      <CTASection
        headline="Ready to Build the Future"
        highlightedText="Together?"
        description="If you believe Africa's future will be written by young people who understand systems, technology and community — then your place is already here. Join us as a partner, mentor, supporter or builder. We are forging capacity — one classroom, one community and one product at a time."
        primaryAction={{
          label: "Join Our Movement",
          href: "/join",
        }}
        secondaryAction={{
          label: "Get In Touch",
          href: "/contact",
        }}
        backgroundImage="/images/cta/homepage-cta.jpg"
        overlayOpacity={75}
      />
      
    </ChapterWrapper>
  );
}