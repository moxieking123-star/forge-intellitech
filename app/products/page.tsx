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
    problem: "African schools are under increasing pressure to prepare learners for a digital economy — yet most classrooms lack the curriculum structure, tools and industry pathways required to do so. The result is a widening gap between education and employability, especially for students in public and low-resource schools. Government digital literacy goals remain unmet while young people graduate without the practical skills their economies need.",
    solution: "TechUp is a structured in-school and community-based digital skills programme designed to operate inside existing education systems. It equips junior and senior secondary students with practical digital competencies while supporting schools, facilitators and administrators with tools, curriculum and delivery frameworks that can scale sustainably. TechUp aligns with national education priorities and creates pathways from classroom learning to real innovation and employment.",
    features: [
      "Structured curriculum aligned with national education frameworks",
      "Junior Secondary foundation across design, web, data and digital literacy",
      "Senior Secondary specialisation into Builders, Strategists and Storytellers",
      "Digital ethics and Nigerian Cybercrimes Act (2015) integration",
      "Teacher enablement and facilitator support systems",
      "Project-based learning with real community challenges",
    ],
    audience: [
      "Junior and Senior Secondary School students",
      "Public and private schools seeking structured digital education",
      "Education authorities and ministries",
      "Community learning centres and youth programmes",
    ],
    operatesIn: "Public and private secondary schools, community learning centres and youth programmes — in partnership with school leadership, facilitators and local institutions.",
    impact: "Building long-term digital capacity inside African schools and youth communities.",
  },
  {
    id: "launchpad",
    name: "LaunchPad",
    tagline: "Where ideas become ventures",
    status: "development" as const,
    icon: "🚀",
    href: "/launchpad",
    hasPage: true,
    problem: "Young African entrepreneurs with promising ideas face systemic barriers to starting and growing ventures. Access to early-stage funding is limited, mentorship networks are fragmented, and most support programmes prioritise equity extraction over founder development. The pipeline from idea to sustainable enterprise remains broken for the majority of young innovators.",
    solution: "LaunchPad is a grant-based innovation programme that provides non-equity funding, structured training, and mentorship to young entrepreneurs. It connects outstanding students from TechUp and other pipelines to real venture-building support — creating a continuous pathway from skill acquisition to enterprise development. LaunchPad strengthens the ecosystem by preparing founders who understand markets, operations and community relevance.",
    features: [
      "Grant funding with no equity or debt requirements",
      "Intensive incubation with structured business development",
      "One-on-one mentorship from experienced founders",
      "Connection to Forge's institutional and industry networks",
      "Demo opportunities with potential partners and supporters",
      "Post-programme support and alumni community",
    ],
    audience: [
      "Young entrepreneurs (18-30) with validated ideas",
      "Outstanding TechUp graduates ready for enterprise",
      "Early-stage founders solving African problems",
      "Teams committed to building sustainable ventures",
    ],
    operatesIn: "Innovation hubs, tertiary institutions, community founder networks and early-stage startup communities.",
    impact: "Launching the next generation of African founders and enterprise builders.",
  },
  {
    id: "bitebank",
    name: "BiteBank",
    tagline: "Food security made simple",
    status: "development" as const,
    icon: "🍽️",
    href: "#bitebank",
    hasPage: false,
    problem: "African food systems are fragmented and inefficient. Vendors struggle to reach customers consistently, consumers lack access to affordable and healthy meal options, and food waste remains high across the value chain. Informal food economies lack the infrastructure for planning, logistics and quality assurance — leaving both sellers and buyers underserved.",
    solution: "BiteBank connects food vendors, consumers and logistics providers on a single platform designed for African food realities. It helps households plan meals using AI-supported tools, connects them to trusted local vendors, and reduces waste through better demand visibility. BiteBank strengthens local food economies by giving vendors access to customers, data and delivery infrastructure they could not build alone.",
    features: [
      "AI-supported meal planning for households",
      "Vendor marketplace for local food sellers",
      "Real-time inventory to reduce food waste",
      "Integrated delivery and logistics network",
      "Affordable meal discovery for consumers",
      "Data insights for vendors and food system planners",
    ],
    audience: [
      "Households seeking affordable, healthy meal options",
      "Food vendors wanting consistent customer access",
      "Restaurants and kitchens looking to reduce waste",
      "Logistics providers serving the food sector",
    ],
    operatesIn: "Local food vendors, informal markets, logistics operators and neighbourhood delivery networks.",
    impact: "Strengthening local food systems while improving access and reducing waste.",
  },
  {
    id: "trego",
    name: "Trego",
    tagline: "Mobility for every journey",
    status: "development" as const,
    icon: "🚌",
    href: "#trego",
    hasPage: false,
    problem: "Urban mobility in African cities is unreliable, unsafe and unregulated. Traditional public transport systems lack accountability, route transparency and safety standards. Commuters — especially women, students and low-income workers — face daily uncertainty. Small businesses struggle with last-mile logistics in fragmented transport ecosystems.",
    solution: "Trego is a shared public transport and logistics platform designed to replace informal, unregulated services with safe, affordable and technology-enabled mobility. It introduces regulated electric vehicles, real-time tracking, and accessible booking via USSD and app. Trego is designed for African urban corridors — serving commuters and small business logistics with infrastructure that can scale across cities.",
    features: [
      "Safe, regulated public transport with trained operators",
      "Electric vehicle fleet designed for African cities",
      "USSD and app-based booking for accessibility",
      "Real-time tracking and route visibility",
      "Affordable pricing for daily commuters",
      "Last-mile logistics support for small businesses",
    ],
    audience: [
      "Daily commuters seeking safe, reliable transport",
      "Students and workers on fixed budgets",
      "Small business owners needing delivery logistics",
      "Urban communities underserved by formal transport",
    ],
    operatesIn: "Urban corridors, commuter routes, small business logistics lanes and community transport clusters.",
    impact: "Making urban mobility safe, accessible and sustainable for African cities.",
  },
];

export default function ProductsPage() {
  return (
    <ChapterWrapper chapter="ignition">
      
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative section-padding flex items-center min-h-[50vh] overflow-hidden">
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
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-env-primary mb-6">
                Technology that 
                <span className="gradient-text"> solves real problems.</span>
              </h1>
              
              <div className="space-y-4 text-xl text-env-secondary leading-relaxed max-w-3xl">
                <p>
                  We do not build products in isolation.
                </p>
                <p>
                  Each platform you see here is a response to a broken or missing system across education, enterprise, food access and urban mobility in Africa.
                </p>
                <p className="text-env-primary font-medium">
                  These are not features.<br />
                  They are foundations — designed to strengthen institutions, communities and young people who must carry the future forward.
                </p>
              </div>
              
              <p className="mt-6 text-env-tertiary italic">
                Every product is designed to work in real African environments — limited bandwidth, shared devices, public institutions and informal economies included.
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
                One ecosystem. Multiple entry points.
              </h2>
              <p className="text-env-secondary max-w-2xl mx-auto">
                Forge products are designed to interlock — learning feeds enterprise, enterprise feeds livelihoods, and livelihoods strengthen communities.
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
                  How our products are designed
                </h2>
              </div>
              
              <div className="space-y-6 text-lg text-env-secondary leading-relaxed">
                <p>
                  At Forge, products do not begin with technology.
                </p>
                <p>
                  They begin with field work — classrooms, markets, transport routes, community sessions and policy conversations.
                </p>
                <p>
                  We design backwards from lived realities — and forward into scalable digital infrastructure.
                </p>
              </div>
              
              <div className="mt-8 p-6 rounded-xl bg-chapter-accent/10 border border-chapter-accent/20">
                <p className="text-env-primary font-medium text-center">
                  Every platform is built to survive low trust environments, limited resources and fragmented systems — while still meeting global technical standards.
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
                  Where this product operates
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
                  Why Forge builds products this way
                </h2>
              </div>
              
              <div className="space-y-6 text-lg text-env-secondary leading-relaxed">
                <p>
                  Africa does not suffer from a lack of ideas.
                </p>
                <p>
                  It suffers from fragile systems.
                </p>
                <p className="text-env-primary font-medium">
                  Forge products are deliberately slow to design and fast to institutionalise.
                </p>
              </div>
              
              <div className="mt-8 p-6 rounded-xl bg-env-surface border border-env-border">
                <h3 className="text-lg font-semibold text-env-primary mb-4">We prioritise:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "Policy alignment",
                    "Public sector readiness",
                    "Facilitator capacity",
                    "Infrastructure realities",
                    "Long-term adoption over short-term usage",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center p-3 rounded-lg bg-chapter-accent/10 border border-chapter-accent/20">
                      <svg className="w-5 h-5 text-chapter-accent mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-env-primary">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-8 p-6 rounded-xl bg-chapter-accent/10 border border-chapter-accent/20 text-center">
                <p className="text-xl text-env-primary font-medium">
                  This is how technology becomes development infrastructure — <span className="text-chapter-accent">not just digital convenience.</span>
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
        description="We work with governments, schools, development organisations, private institutions and infrastructure partners who understand that sustainable progress requires more than software. If you are building programmes, systems or markets that serve African communities — we are ready to build alongside you."
        primaryAction={{
          label: "Become a Partner",
          href: "/join#partners",
        }}
        secondaryAction={{
          label: "Start a Conversation",
          href: "/contact",
        }}
        backgroundImage="/images/cta/products-cta.jpg"
        overlayOpacity={80}
      />
      
    </ChapterWrapper>
  );
}