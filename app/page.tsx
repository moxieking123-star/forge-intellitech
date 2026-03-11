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
    description: "TechUp turns classrooms into places where young people learn to build things that matter. From JSS1 to SSS3, students learn real digital skills — the kind that lets them create, not just consume.",
    status: "pilot" as const,
    href: "/techup",
    icon: "🎓",
  },
  {
    name: "LaunchPad",
    tagline: "Where ideas take flight",
    description: "Have an idea? LaunchPad gives you funding, guidance, and support to turn it into something real — without taking a piece of what you build. We're here to help you fly.",
    status: "development" as const,
    href: "/launchpad",
    icon: "🚀",
  },
  {
    name: "BiteBank",
    tagline: "Food security, simplified",
    description: "BiteBank helps you plan meals, stay healthy, and order from local vendors who cook the food you love — all while reducing waste and saving money.",
    status: "development" as const,
    href: "/products#bitebank",
    icon: "🍽️",
  },
  {
    name: "Trego",
    tagline: "Mobility for every journey",
    description: "Trego is rethinking public transport — safe, affordable, electric buses that actually work for how we move in African cities.",
    status: "development" as const,
    href: "/products#trego",
    icon: "🚌",
  },
];

// Why Forge points
const whyForgePoints = [
  {
    title: "Built for Us, By Us",
    description: "We build from here — understanding our streets, our struggles, our culture. Not copying what works elsewhere, but creating what works here.",
    icon: "🌍",
  },
  {
    title: "People Before Profit",
    description: "We measure success by the lives we touch, the communities we strengthen, and the young people who discover what they're capable of.",
    icon: "💡",
  },
  {
    title: "Playing the Long Game",
    description: "We're not chasing quick wins. We're building things that will still matter 10, 20 years from now — systems that grow stronger with time.",
    icon: "🔭",
  },
  {
    title: "Better Together",
    description: "We don't believe in doing this alone. We partner, we collaborate, we share — because the future is built by many hands, not one.",
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
      <section className="relative flex flex-col justify-center min-h-[90vh] overflow-hidden">
        
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

        <div className="container-forge relative z-10 px-6">
          
          <AnimatedSection animation="fade-up">
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 leading-tight">
                <span className="text-white drop-shadow-lg">We got tired</span>
                <br />
                <span className="text-white drop-shadow-lg">of waiting.</span>
                <br />
                <span className="gradient-text">So we started building.</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 max-w-2xl drop-shadow-md leading-relaxed">
                Technology and education, made right here — 
                <br className="hidden md:block" />
                for the world we know, not the one they told us about.
              </p>
            </div>
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

      {/* ==================== MISSION SECTION ==================== */}
      <section className="section-padding bg-env-bg-primary">
        <div className="container-forge">
          
          <div className="max-w-5xl mx-auto">
            
            <AnimatedSection animation="fade-up">
              <div className="text-center mb-12">
                <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-wider text-chapter-accent bg-chapter-accent-soft rounded-full border border-chapter-accent/20">
                  Why We Exist
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-env-primary mb-6">
                  We're building the foundation everyone forgot about
                </h2>
                <p className="text-xl text-env-secondary max-w-3xl mx-auto leading-relaxed">
                  Not just apps and software — but people who know how to think, create, and build.
                </p>
              </div>
            </AnimatedSection>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <AnimatedSection animation="fade-up" delay={100}>
                <div className="text-center p-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-chapter-accent/10 flex items-center justify-center">
                    <span className="text-3xl">🏫</span>
                  </div>
                  <h3 className="text-lg font-semibold text-env-primary mb-2">Start in Classrooms</h3>
                  <p className="text-env-secondary text-sm">
                    Teaching young people in schools and communities across Nigeria
                  </p>
                </div>
              </AnimatedSection>
              
              <AnimatedSection animation="fade-up" delay={200}>
                <div className="text-center p-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-chapter-accent/10 flex items-center justify-center">
                    <span className="text-3xl">💡</span>
                  </div>
                  <h3 className="text-lg font-semibold text-env-primary mb-2">Grow Into Creators</h3>
                  <p className="text-env-secondary text-sm">
                    Turning students into designers, builders, and founders who create solutions
                  </p>
                </div>
              </AnimatedSection>
              
              <AnimatedSection animation="fade-up" delay={300}>
                <div className="text-center p-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-chapter-accent/10 flex items-center justify-center">
                    <span className="text-3xl">🌍</span>
                  </div>
                  <h3 className="text-lg font-semibold text-env-primary mb-2">Build for Africa</h3>
                  <p className="text-env-secondary text-sm">
                    Creating systems that actually work for the lives we live
                  </p>
                </div>
              </AnimatedSection>
            </div>
            
            <AnimatedSection animation="fade-up" delay={400}>
              <div className="p-8 rounded-2xl bg-env-surface border border-env-border text-center">
                <p className="text-lg md:text-xl text-env-secondary leading-relaxed mb-6">
                  We teach young people to understand their world first, then give them the tools to reshape it.
                </p>
                <p className="text-xl md:text-2xl text-env-primary font-medium italic">
                  We're not importing solutions from abroad.<br />
                  <span className="text-chapter-accent">We're growing them right here — slowly, intentionally, and at scale.</span>
                </p>
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="fade-up" delay={500}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
                <Link
                  href="/about"
                  className="px-8 py-4 bg-chapter-accent hover:bg-chapter-accent-hover text-white font-medium rounded-lg transition-smooth glow hover-lift"
                >
                  Read Our Full Story
                </Link>
                <Link
                  href="/products"
                  className="px-8 py-4 bg-env-surface hover:bg-env-surface-hover text-env-primary font-medium rounded-lg border border-env-border transition-smooth hover-lift"
                >
                  See What We're Building
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
            title="Products That Solve Real Problems"
            description="Every product we build answers a real question: How do we learn better? How do we start businesses? How do we eat healthier? How do we move around our cities? These aren't just ideas — they're solutions we're building together."
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
                See all our products
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
            label="How We Work"
            title="Why Forge?"
            description="We're not trying to move fast and break things. We're building carefully, with the people who will actually use what we create. Our strength is simple: we live here, we understand here, and we're building for here."
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
                Real Impact
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-4">
                The Work We've Done
              </h2>
              <p className="text-env-secondary max-w-2xl mx-auto">
                These numbers represent real classrooms, real students, and real communities we've worked with.
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
                These aren't just numbers on a page.<br />
                <span className="text-chapter-accent">They're proof that we showed up and did the work.</span>
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
                From classroom to career
              </h2>
              
              <div className="space-y-6 text-lg text-env-secondary leading-relaxed">
                <p>
                  <strong className="text-env-primary">Most of our students start with TechUp.</strong>
                </p>
                <p>
                  In junior secondary, they rotate through design, web development, working with data, and digital teamwork — learning how technology actually works, not just how to use it.
                </p>
                <p>
                  By senior secondary, they choose a path: <span className="text-chapter-accent font-medium">builders</span> (who create the tech), <span className="text-chapter-accent font-medium">strategists</span> (who plan and solve problems), or <span className="text-chapter-accent font-medium">storytellers</span> (who communicate and connect). 
                </p>
                <p>
                  They're not just preparing for jobs — they're preparing to lead, to start their own thing, to create what comes next.
                </p>
              </div>
              
              <div className="mt-8 p-6 rounded-xl bg-chapter-accent/10 border border-chapter-accent/20">
                <p className="text-xl text-env-primary font-medium">
                  Forge exists so that young Africans don't just use the future — <span className="text-chapter-accent">they build it.</span>
                </p>
              </div>
              
              <Link
                href="/techup"
                className="inline-flex items-center mt-8 text-chapter-accent hover:opacity-80 font-medium transition-smooth group"
              >
                Learn more about TechUp
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
        headline="Let's Build the Future"
        highlightedText="Together"
        description="If you believe Africa's future belongs to young people who understand both technology and their communities — then you're already part of this. Join us as a partner, mentor, supporter, or builder. We're creating change one classroom, one community, and one product at a time."
        primaryAction={{
          label: "Join the Movement",
          href: "/join",
        }}
        secondaryAction={{
          label: "Talk to Us",
          href: "/contact",
        }}
        backgroundImage="/images/cta/homepage-cta.jpg"
        overlayOpacity={75}
      />
      
    </ChapterWrapper>
  );
}
