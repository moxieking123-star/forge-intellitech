import ProductCard from "../components/ProductCard";
import SectionHeader from "../components/SectionHeader";
import Link from "next/link";

// Products data - we'll reuse this across the site
const products = [
  {
    name: "TechUp",
    tagline: "Education that creates builders",
    description: "A skills development program preparing African youth for the digital economy through practical, industry-relevant training.",
    status: "pilot" as const,
    href: "/techup",
    icon: "🎓",
  },
  {
    name: "LaunchPad",
    tagline: "Where ideas become ventures",
    description: "A grant-based innovation program helping young entrepreneurs transform ideas into sustainable businesses. No equity taken.",
    status: "development" as const,
    href: "/launchpad",
    icon: "🚀",
  },
  {
    name: "BiteBank",
    tagline: "Food security made simple",
    description: "A platform connecting food vendors, consumers, and logistics to reduce waste and improve access to affordable meals.",
    status: "development" as const,
    href: "/products#bitebank",
    icon: "🍽️",
  },
  {
    name: "Trego",
    tagline: "Trade without borders",
    description: "A logistics and trade platform designed to simplify cross-border commerce for African merchants and businesses.",
    status: "development" as const,
    href: "/products#trego",
    icon: "📦",
  },
];

// Why Forge points
const whyForgePoints = [
  {
    title: "Built for Africa",
    description: "We don't adapt foreign solutions. We build from the ground up, understanding local contexts, infrastructure realities, and cultural nuances.",
    icon: "🌍",
  },
  {
    title: "Impact First",
    description: "Every product we build must solve a real problem for real people. We measure success by lives improved, not just revenue generated.",
    icon: "💡",
  },
  {
    title: "Long-term Vision",
    description: "We're not building for quick exits. We're building infrastructure that will serve generations. Patient capital, lasting impact.",
    icon: "🔭",
  },
  {
    title: "Open Ecosystem",
    description: "We believe in collaboration over competition. Our platforms are designed to integrate, partner, and grow together with others.",
    icon: "🤝",
  },
];

export default function HomePage() {
  return (
    <div>
      
      {/* ==================== HERO SECTION ==================== */}
      <section className="section-padding flex items-center justify-center min-h-[85vh]">
        <div className="container-forge text-center">
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-forge-light">What if technology</span>
            <br />
            <span className="gradient-text">understood Africa?</span>
          </h1>
          
          <p className="text-lg md:text-xl text-forge-muted max-w-2xl mx-auto mb-10">
            We build solutions rooted in local realities, designed for global impact. 
            Technology that speaks your language, solves your problems, 
            and grows with your dreams.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-smooth glow"
            >
              Explore Our Products
            </Link>
            <Link
              href="/join"
              className="px-8 py-4 bg-white/5 hover:bg-white/10 text-forge-light font-medium rounded-lg border border-forge-border transition-smooth"
            >
              Join Our Movement
            </Link>
          </div>
          
        </div>
      </section>

      {/* ==================== PRODUCTS SECTION ==================== */}
      <section className="section-padding bg-forge-darker">
        <div className="container-forge">
          
          <SectionHeader
            label="What We're Building"
            title="Products with Purpose"
            description="Each product addresses a critical gap in African infrastructure. From education to fintech, we build what our continent needs."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map((product) => (
              <ProductCard key={product.name} {...product} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              href="/products"
              className="inline-flex items-center text-primary-400 hover:text-primary-300 font-medium transition-smooth"
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
            description="We're not just another tech company. We're building the digital infrastructure Africa deserves."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whyForgePoints.map((point) => (
              <div 
                key={point.title}
                className="p-6 rounded-xl bg-white/5 border border-forge-border"
              >
                <span className="text-3xl mb-4 block">{point.icon}</span>
                <h3 className="text-xl font-semibold text-forge-light mb-2">
                  {point.title}
                </h3>
                <p className="text-forge-muted leading-relaxed">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
          
        </div>
      </section>

      {/* ==================== STATS SECTION ==================== */}
      <section className="section-padding bg-gradient-to-b from-forge-darker to-forge-dark">
        <div className="container-forge">
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary-400 mb-2">4</div>
              <div className="text-forge-muted">Products in Development</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary-400 mb-2">1</div>
              <div className="text-forge-muted">Country (Expanding Soon)</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary-400 mb-2">100%</div>
              <div className="text-forge-muted">African-Founded</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary-400 mb-2">∞</div>
              <div className="text-forge-muted">Potential Impact</div>
            </div>
          </div>
          
        </div>
      </section>

      {/* ==================== CTA SECTION ==================== */}
      <section className="section-padding">
        <div className="container-forge">
          
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-forge-light mb-6">
              Ready to Build the Future 
              <span className="gradient-text"> Together?</span>
            </h2>
            <p className="text-lg text-forge-muted mb-10">
              Whether you're a developer, designer, investor, or just someone who believes 
              in Africa's potential — there's a place for you at Forge.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/join"
                className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-smooth glow"
              >
                Join Our Movement
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 bg-white/5 hover:bg-white/10 text-forge-light font-medium rounded-lg border border-forge-border transition-smooth"
              >
                Get In Touch
              </Link>
            </div>
          </div>
          
        </div>
      </section>
      
    </div>
  );
}