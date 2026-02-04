"use client";

import ProductCard from "../components/ProductCard";
import SectionHeader from "../components/SectionHeader";
import Link from "next/link";
import Image from "next/image";
import { ChapterWrapper } from "../components/ChapterWrapper";
// REMOVED: HeroSlider import - no longer needed
// import HeroSlider from "../components/HeroSlider";

// Products data
const products = [
  {
    name: "TechUp",
    tagline: "Education that creates builders",
    description: "TechUp transforms classrooms into innovation hubs, training students from JSS1 to SSS3 with real, hands-on digital skills — empowering the next generation of African builders, storytellers, and strategists. TechUp trains African secondary school students in practical technology skills, preparing confident, employable innovators through real projects, mentorship, early exposure to industry and entrepreneurship nationwide.",
    status: "pilot" as const,
    href: "/techup",
    icon: "",
  },
  {
    name: "LaunchPad",
    tagline: "Where ideas take flight",
    description: "LaunchPad turns bold ideas into thriving ventures. We provide grant funding, mentorship, and guidance to young entrepreneurs without taking equity — giving wings to African innovation. Launchpad empowers senior secondary students to transform creative tech ideas into real businesses, offering mentorship, competitions, and non-equity funding to build early-stage African enterprises.",
    status: "development" as const,
    href: "/launchpad",
    icon: "",
  },
  {
    name: "BiteBank",
    tagline: "Food security, simplified",
    description: "BiteBank helps people plan meals using AI to achieve healthy lifestyle goals, such as weight management or other personal objectives. It allows users to send money to one another to support meals. Users order from trusted vendors who prepare local cuisines. This reduces food and financial waste, as users can plan and budget for meals up to a month in advance. All of this ensures that food budgets are used precisely for nourishment and not diverted elsewhere.",
    status: "development" as const,
    href: "/products#bitebank",
    icon: "",
  },
  {
    name: "Trego",
    tagline: "Mobility for every journey",
    description: "Trego is a shared public transport platform designed to replace traditional, unregulated buses with safe, affordable, and fully electric vehicles. Passengers can easily book rides via USSD or app, while advanced monitoring and security technology ensure safety. By combining technology and accessibility, Trego reduces costs, promotes regulated transportation, and provides a reliable commuting experience tailored for African cities..",
    status: "development" as const,
    href: "/products#trego",
    icon: "",
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
    description: "Every product must solve a tangible problem for real people. Success is measured in lives improved, communities empowered, and futures created.",
    icon: "💡",
  },
  {
    title: "Long-term Vision",
    description: "We build for generations. Every system, platform, and program is designed to endure, grow, and multiply impact over time.",
    icon: "🔭",
  },
  {
    title: "Open Ecosystem",
    description: "Collaboration beats competition. Our platforms are designed to integrate, partner, and scale alongside other innovators and communities.",
    icon: "🤝",
  },
];

export default function HomePage() {
  return (
    <ChapterWrapper chapter="forge">
      
      {/* ==================== HERO SECTION ==================== */}
      {/* 
        UPDATED:
        1. Reduced height from min-h-[85vh] to min-h-[60vh]
        2. Removed HeroSlider component
        3. Changed description text color for better visibility
      */}
      <section className="relative section-padding flex flex-col items-center justify-center min-h-[60vh] overflow-hidden">
        
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-background.jpg"
            alt=""
            fill
            className="object-cover"
            priority
            quality={75}
          />
          {/* 
            Gradient overlay - adjusted for better text contrast
            Made slightly darker to improve readability
          */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-env-bg-primary" />
        </div>

        {/* Decorative glow elements */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-chapter-accent/20 rounded-full blur-3xl animate-subtle-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container-forge text-center relative z-10">
          
          <div className="stagger-children">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-white drop-shadow-lg">What if technology</span>
              <br />
              <span className="gradient-text">truly understood Africa?</span>
            </h1>
            
            {/* 
              UPDATED: Description text
              - Changed from text-env-secondary to text-white for better visibility
              - Added drop-shadow for extra contrast against background
              - Made text slightly larger on mobile for readability
            */}
            <p className="text-lg md:text-xl text-white max-w-2xl mx-auto mb-10 drop-shadow-md leading-relaxed">
              We build solutions rooted in African realities, designed for global impact. 
              Tools that speak your language, solve your problems, and grow with your ambitions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="px-8 py-4 bg-chapter-accent hover:bg-chapter-accent-hover text-env-text-inverse font-medium rounded-lg transition-smooth glow hover-lift"
              >
                Explore Our Products
              </Link>
              <Link
                href="/join"
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg border border-white/30 backdrop-blur-sm transition-smooth hover-lift"
              >
                Join Our Movement
              </Link>
            </div>
          </div>

          {/* REMOVED: HeroSlider component */}
          {/* <HeroSlider /> */}
          
        </div>
      </section>

      {/* ==================== PRODUCTS SECTION ==================== */}
      <section className="section-padding bg-env-secondary">
        <div className="container-forge">
          
          <SectionHeader
            label="What We're Building"
            title="Products with Purpose"
            description="Every product we launch addresses a critical gap in Africa — from classrooms to markets, meals to mobility. Each is crafted to empower, uplift, and sustain."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map((product, index) => (
              <div 
                key={product.name} 
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCard {...product} />
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              href="/products"
              className="inline-flex items-center text-chapter-accent hover:opacity-80 font-medium transition-smooth link-underline"
            >
              View all products
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          
        </div>
      </section>

      {/* ==================== WHY FORGE SECTION ==================== */}
      <section className="section-padding">
        <div className="container-forge">
          
          <SectionHeader
            label="Our Approach"
            title="Why Forge?"
            description="We're not just a tech company. We're shaping the digital ecosystem Africa deserves - built by Africans, for Africa."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whyForgePoints.map((point, index) => (
              <div 
                key={point.title}
                className="p-6 rounded-xl bg-env-surface border border-env-border hover-lift hover-glow transition-smooth"
                style={{ animationDelay: `${index * 75}ms` }}
              >
                <span className="text-3xl mb-4 block">{point.icon}</span>
                <h3 className="text-xl font-semibold text-env-primary mb-2">
                  {point.title}
                </h3>
                <p className="text-env-secondary leading-relaxed">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
          
        </div>
      </section>

      {/* ==================== STATS SECTION ==================== */}
      <section className="section-padding bg-gradient-to-b from-env-secondary to-env-primary">
        <div className="container-forge">

          <div className="flex flex-col lg:flex-row items-center gap-12">
            
            {/* Image on the left */}
            <div className="relative w-full lg:w-1/2 h-[300px] md:h-[400px] rounded-2xl overflow-hidden">
              <Image
                src="/images/africa-go.jpg"
                alt="Africa Innovation Map"
                fill
                className="object-cover rounded-2xl"
              />
            </div>

            {/* Stats on the right */}
            <div className="w-full lg:w-1/2">
              <div className="grid grid-cols-2 gap-8 text-center stagger-children">
                <div>
                  <div className="text-4xl md:text-5xl font-bold text-chapter-accent mb-2">4</div>
                  <div className="text-env-secondary">Products in Development</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold text-chapter-accent mb-2">1</div>
                  <div className="text-env-secondary">Country (Expanding Soon)</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold text-chapter-accent mb-2">100%</div>
                  <div className="text-env-secondary">African-Founded</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold text-chapter-accent mb-2">∞</div>
                  <div className="text-env-secondary">Potential Impact</div>
                </div>
              </div>
            </div>

          </div>
          
        </div>
      </section>

      {/* ==================== CTA SECTION ==================== */}
      <section className="section-padding">
        <div className="container-forge">
          
          <div className="flex flex-col lg:flex-row items-center gap-12">
            
            {/* Text content */}
            <div className="w-full lg:w-1/2 text-center lg:text-left stagger-children">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-env-primary mb-6">
                Ready to Build the Future 
                <span className="gradient-text"> Together?</span>
              </h2>
              <p className="text-lg text-env-secondary mb-10">
                Whether you're a developer, designer, investor, or believer in Africa's potential — there's a place for you at Forge.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/join"
                  className="px-8 py-4 bg-chapter-accent hover:bg-chapter-accent-hover text-env-text-inverse font-medium rounded-lg transition-smooth glow hover-lift"
                >
                  Join Our Movement
                </Link>
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-env-surface hover:bg-env-surface-hover text-env-primary font-medium rounded-lg border border-env-border transition-smooth hover-lift"
                >
                  Get In Touch
                </Link>
              </div>
            </div>

            {/* CTA Image */}
            <div className="relative w-full lg:w-1/2 h-[300px] md:h-[400px] rounded-2xl overflow-hidden">
              <Image
                src="/images/cta-image.jpg"
                alt="Join Forge Community"
                fill
                className="object-cover rounded-2xl"
              />
            </div>

          </div>
          
        </div>
      </section>
      
    </ChapterWrapper>
  );
}