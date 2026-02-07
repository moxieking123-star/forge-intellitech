import Link from "next/link";
import { ChapterWrapper } from "../../components/ChapterWrapper";
import { AnimatedSection } from "../../components/AnimatedSection";
import { CTASection } from "../../components/CTASection";

// Metadata for SEO
export const metadata = {
  title: "Join Us",
  description: "Join Forge Intellitech. Whether you want to work with us, partner with us, or invest in African technology — there's a place for you.",
};

// Join options
const joinOptions = [
  {
    id: "talent",
    icon: "👨‍💻",
    title: "Join Our Team",
    subtitle: "Build the future with us",
    description: "We're always looking for passionate people who believe in Africa's potential. Engineers, designers, educators, and dreamers — if you want to build technology that matters, we want to hear from you.",
    benefits: [
      "Work on meaningful products that impact millions",
      "Remote-first, flexible culture",
      "Learn and grow with a passionate team",
      "Competitive compensation",
      "Be part of something bigger than yourself",
    ],
    cta: "View Open Positions",
    ctaHref: "#positions",
  },
  {
    id: "partners",
    icon: "🤝",
    title: "Partner With Us",
    subtitle: "Collaborate for impact",
    description: "Schools, organizations, government agencies, and NGOs — if you share our vision of empowering African youth through technology, let's work together.",
    benefits: [
      "Bring TechUp to your school or community",
      "Co-develop programs tailored to your needs",
      "Access our network of innovators",
      "Amplify your CSR impact",
      "Shape the future of African education",
    ],
    cta: "Explore Partnership",
    ctaHref: "/contact",
  },
  {
    id: "investors",
    icon: "💼",
    title: "Invest in Forge",
    subtitle: "Back African innovation",
    description: "We're building the infrastructure for Africa's digital future. If you're an investor who believes in long-term, sustainable impact, let's talk.",
    benefits: [
      "Invest in a growing market",
      "Support sustainable, scalable solutions",
      "Be part of Africa's tech renaissance",
      "Impact investing with real returns",
      "Join a community of forward-thinkers",
    ],
    cta: "Investment Inquiry",
    ctaHref: "/contact",
  },
];

// Open positions (placeholder - would come from CMS/DB in production)
const openPositions = [
  {
    title: "Senior Frontend Engineer",
    type: "Full-time",
    location: "Remote (Africa)",
    department: "Engineering",
  },
  {
    title: "Product Designer",
    type: "Full-time",
    location: "Lagos / Remote",
    department: "Design",
  },
  {
    title: "Program Coordinator - TechUp",
    type: "Full-time",
    location: "Lagos",
    department: "Programs",
  },
  {
    title: "Content Writer",
    type: "Contract",
    location: "Remote",
    department: "Marketing",
  },
];

export default function JoinPage() {
  return (
    <ChapterWrapper chapter="expand">
      
      {/* ==================== HERO SECTION ==================== */}
      <section className="section-padding">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="max-w-4xl mx-auto text-center">
              
              <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-wider text-chapter-accent bg-chapter-accent-soft rounded-full border border-chapter-accent/20">
                Join Forge
              </span>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-env-primary mb-6">
                Be part of something 
                <span className="gradient-text"> meaningful</span>
              </h1>
              
              <p className="text-xl text-env-secondary leading-relaxed max-w-3xl mx-auto">
                We're building the future of African technology — and we can't do it alone. 
                Whether you want to work with us, partner with us, or invest in our vision, 
                there's a place for you at Forge.
              </p>
              
            </div>
          </AnimatedSection>
          
        </div>
      </section>

      {/* ==================== JOIN OPTIONS ==================== */}
      <section className="section-padding bg-env-secondary">
        <div className="container-forge">
          
          <div className="space-y-8">
            {joinOptions.map((option, index) => (
              <AnimatedSection 
                key={option.id} 
                animation={index % 2 === 0 ? "fade-right" : "fade-left"}
              >
                <div 
                  id={option.id}
                  className="scroll-mt-24 p-6 md:p-10 rounded-2xl bg-env-surface border border-env-border hover:border-chapter-accent/30 transition-smooth"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    
                    {/* Content */}
                    <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-4xl">{option.icon}</span>
                        <div>
                          <h2 className="text-2xl md:text-3xl font-bold text-env-primary">
                            {option.title}
                          </h2>
                          <p className="text-chapter-accent font-medium">{option.subtitle}</p>
                        </div>
                      </div>
                      
                      <p className="text-env-secondary leading-relaxed mb-6">
                        {option.description}
                      </p>
                      
                      <Link
                        href={option.ctaHref}
                        className="inline-flex items-center px-6 py-3 bg-chapter-accent hover:bg-chapter-accent-hover text-white font-medium rounded-lg transition-smooth hover-lift"
                      >
                        {option.cta}
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                    
                    {/* Benefits */}
                    <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                      <div className="p-6 rounded-xl bg-env-bg-primary border border-env-border">
                        <h3 className="font-semibold text-env-primary mb-4">What you get:</h3>
                        <ul className="space-y-3">
                          {option.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-start text-env-secondary">
                              <svg className="w-5 h-5 text-chapter-accent mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
          
        </div>
      </section>

      {/* ==================== OPEN POSITIONS ==================== */}
      <section id="positions" className="section-padding scroll-mt-20">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-chapter-accent bg-chapter-accent-soft rounded-full border border-chapter-accent/20">
                Careers
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-4">
                Open Positions
              </h2>
              <p className="text-env-secondary max-w-2xl mx-auto">
                Join our team and help build technology that serves Africa.
              </p>
            </div>
          </AnimatedSection>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {openPositions.map((position, index) => (
              <AnimatedSection key={position.title} animation="fade-up" delay={index * 75}>
                <Link
                  href="/contact"
                  className="block p-6 rounded-xl bg-env-surface border border-env-border hover:border-chapter-accent/50 transition-smooth group hover-lift"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-env-primary group-hover:text-chapter-accent transition-smooth">
                        {position.title}
                      </h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="px-2 py-1 text-xs bg-env-bg-primary rounded text-env-secondary">
                          {position.department}
                        </span>
                        <span className="px-2 py-1 text-xs bg-env-bg-primary rounded text-env-secondary">
                          {position.type}
                        </span>
                        <span className="px-2 py-1 text-xs bg-env-bg-primary rounded text-env-secondary">
                          {position.location}
                        </span>
                      </div>
                    </div>
                    <svg 
                      className="w-6 h-6 text-env-tertiary group-hover:text-chapter-accent group-hover:translate-x-1 transition-all" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
          
          <AnimatedSection animation="fade-up" delay={300}>
            <div className="text-center mt-8">
              <p className="text-env-secondary">
                Don't see the right role? 
                <Link href="/contact" className="text-chapter-accent hover:underline ml-1 font-medium">
                  Send us your resume anyway
                </Link>
              </p>
            </div>
          </AnimatedSection>
          
        </div>
      </section>

      {/* ==================== CTA SECTION ==================== */}
      <CTASection
        headline="Ready to make an"
        highlightedText="impact?"
        description="Join us in building the technology infrastructure Africa deserves. Whether as a team member, partner, or investor — your contribution matters."
        primaryAction={{
          label: "Get in Touch",
          href: "/contact",
        }}
        backgroundImage="/images/cta/join-cta.jpg"
        overlayOpacity={80}
      />
      
    </ChapterWrapper>
  );
}