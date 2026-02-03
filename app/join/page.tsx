import Link from "next/link";
import SectionHeader from "../../components/SectionHeader";
import { ChapterWrapper } from "../../components/ChapterWrapper";
import { AnimatedSection } from "../../components/AnimatedSection";

// Metadata for SEO
export const metadata = {
  title: "Join Our Movement",
  description: "Join Forge Intellitech as talent, partner, investor, or volunteer. Be part of building technology that understands Africa.",
};

// Open positions (placeholder - update with real positions)
const openPositions = [
  {
    title: "Full-Stack Developer",
    type: "Full-time",
    location: "Lagos, Nigeria (Hybrid)",
    description: "Build and maintain our core products using Next.js, React, and Node.js. You'll work on TechUp, LaunchPad, and future products.",
  },
  {
    title: "Product Designer",
    type: "Full-time",
    location: "Lagos, Nigeria (Hybrid)",
    description: "Design user experiences that work for African contexts. From research to prototyping to final designs.",
  },
  {
    title: "Program Coordinator - TechUp",
    type: "Full-time",
    location: "Lagos, Nigeria",
    description: "Manage school partnerships, coordinate program delivery, and ensure TechUp runs smoothly across all partner schools.",
  },
  {
    title: "Content & Communications Lead",
    type: "Full-time",
    location: "Remote (Nigeria)",
    description: "Tell the Forge story. Create content, manage social media, and build our brand presence across channels.",
  },
];

// What we look for in talent
const talentQualities = [
  {
    title: "Mission-Driven",
    description: "You believe in Africa's potential and want to build technology that makes a real difference.",
    icon: "🎯",
  },
  {
    title: "Builder Mindset",
    description: "You don't wait for perfect conditions. You find ways to create, ship, and iterate.",
    icon: "🛠️",
  },
  {
    title: "Collaborative",
    description: "You thrive in teams, share knowledge freely, and lift others as you climb.",
    icon: "🤝",
  },
  {
    title: "Growth-Oriented",
    description: "You're always learning, always improving, always pushing your boundaries.",
    icon: "📈",
  },
];

// Partnership types
const partnershipTypes = [
  {
    title: "Schools & Educational Institutions",
    description: "Partner with us to bring TechUp to your students. We provide curriculum, training, and support.",
    icon: "🏫",
    cta: "Register Your School",
    href: "/contact?category=schools",
  },
  {
    title: "Government & LGAs",
    description: "Collaborate on youth development initiatives. We've successfully partnered with Ikosi-Isheri LCDA.",
    icon: "🏛️",
    cta: "Discuss Partnership",
    href: "/contact?category=partnership",
  },
  {
    title: "Corporate Partners",
    description: "Sponsor our programs, provide mentorship, or integrate our solutions into your CSR initiatives.",
    icon: "🏢",
    cta: "Explore Opportunities",
    href: "/contact?category=partnership",
  },
  {
    title: "NGOs & Foundations",
    description: "Align your impact goals with ours. Together we can reach more young people across Africa.",
    icon: "🌍",
    cta: "Start Conversation",
    href: "/contact?category=partnership",
  },
];

// Investment highlights
const investmentHighlights = [
  {
    title: "Massive Market",
    description: "Africa has the world's youngest population. 60% are under 25. They need education, jobs, and tools.",
    icon: "📊",
  },
  {
    title: "Proven Traction",
    description: "LaunchPad 2024 succeeded with limited resources. TechUp is piloting in partner schools. We execute.",
    icon: "✅",
  },
  {
    title: "Multiple Revenue Streams",
    description: "B2B (schools), B2G (government), and B2C models across education, fintech, and logistics.",
    icon: "💰",
  },
  {
    title: "Experienced Team",
    description: "Founders with deep understanding of African markets and technology. We know the terrain.",
    icon: "👥",
  },
];

// What investors get
const investorBenefits = [
  "Early access to a portfolio of African-focused products",
  "Direct impact on youth education and entrepreneurship",
  "Experienced founding team with execution track record",
  "Clear roadmap from pilot to scale across Nigeria and beyond",
  "Regular updates and transparent communication",
  "Opportunity to shape strategy as an early partner",
];

// Volunteer opportunities
const volunteerOpportunities = [
  {
    title: "Mentorship",
    description: "Guide young entrepreneurs in LaunchPad or students in TechUp. Share your experience and expertise.",
    commitment: "2-4 hours/month",
    icon: "👨‍🏫",
  },
  {
    title: "Content Creation",
    description: "Help us create educational content, blog posts, or social media content that inspires.",
    commitment: "Flexible",
    icon: "✍️",
  },
  {
    title: "Event Support",
    description: "Help organize and run LaunchPad events, TechUp sessions, or community gatherings.",
    commitment: "Event-based",
    icon: "🎪",
  },
  {
    title: "Technical Review",
    description: "Review code, provide technical feedback, or help with specific technical challenges.",
    commitment: "Project-based",
    icon: "💻",
  },
];

export default function JoinPage() {
  return (
    <ChapterWrapper chapter="ignition">
      
      {/* ==================== HERO SECTION ==================== */}
      <section className="section-padding flex items-center min-h-[60vh]">
        <div className="container-forge">
          <AnimatedSection animation="fade-up">
            <div className="max-w-4xl mx-auto text-center">
              
              <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-wider text-chapter-accent bg-chapter-accent-soft rounded-full border border-chapter-accent/20">
                Join Us
              </span>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-env-primary mb-6">
                Be Part of the 
                <span className="gradient-text"> Movement</span>
              </h1>
              
              <p className="text-xl text-env-secondary leading-relaxed mb-10">
                We're building technology that understands Africa — and we can't do it alone. 
                Whether you're looking to join our team, partner with us, invest in our vision, 
                or volunteer your time — there's a place for you at Forge.
              </p>
              
              {/* Quick navigation */}
              <div className="flex flex-wrap justify-center gap-4">
                {[
                  { href: "#talent", icon: "👩‍💻", label: "Talent" },
                  { href: "#partners", icon: "🤝", label: "Partners" },
                  { href: "#investors", icon: "💼", label: "Investors" },
                  { href: "#volunteers", icon: "🙋", label: "Volunteers" },
                ].map((item) => (
                  <a 
                    key={item.href}
                    href={item.href}
                    className="px-6 py-3 bg-env-surface hover:bg-env-surface-hover text-env-primary font-medium rounded-lg border border-env-border transition-smooth hover-lift"
                  >
                    {item.icon} {item.label}
                  </a>
                ))}
              </div>
              
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ==================== TALENT SECTION ==================== */}
      <section id="talent" className="section-padding bg-env-secondary scroll-mt-20">
        <div className="container-forge">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* Left: About working at Forge */}
            <AnimatedSection animation="fade-right">
              <div>
                <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-green-400 bg-green-500/10 rounded-full border border-green-500/20">
                  Careers
                </span>
                
                <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-6">
                  Build Your Career at Forge
                </h2>
                
                <p className="text-env-secondary leading-relaxed mb-8">
                  Working at Forge means more than a job — it means being part of a mission 
                  to transform how technology serves Africa. We're a small team doing big things, 
                  and we're looking for exceptional people to join us.
                </p>
                
                {/* What we look for */}
                <h3 className="text-xl font-semibold text-env-primary mb-4">
                  What We Look For
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {talentQualities.map((quality, index) => (
                    <div 
                      key={quality.title}
                      className="p-4 rounded-lg bg-env-surface border border-env-border hover-glow transition-smooth"
                    >
                      <span className="text-2xl block mb-2">{quality.icon}</span>
                      <h4 className="font-medium text-env-primary mb-1">{quality.title}</h4>
                      <p className="text-env-secondary text-sm">{quality.description}</p>
                    </div>
                  ))}
                </div>
                
                {/* Benefits */}
                <h3 className="text-xl font-semibold text-env-primary mb-4">
                  What We Offer
                </h3>
                <ul className="space-y-2 text-env-secondary">
                  {[
                    "Meaningful work with real impact",
                    "Flexible, hybrid work environment",
                    "Learning and growth opportunities",
                    "Competitive compensation",
                    "Equity options for early team members",
                  ].map((benefit) => (
                    <li key={benefit} className="flex items-center">
                      <svg className="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
            
            {/* Right: Open positions */}
            <AnimatedSection animation="fade-left" delay={150}>
              <div>
                <h3 className="text-xl font-semibold text-env-primary mb-6">
                  Open Positions
                </h3>
                
                <div className="space-y-4">
                  {openPositions.map((position, index) => (
                    <div 
                      key={index}
                      className="p-6 rounded-xl bg-env-surface border border-env-border hover:border-green-500/30 transition-smooth hover-lift"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                        <h4 className="font-semibold text-env-primary text-lg">
                          {position.title}
                        </h4>
                        <div className="flex gap-2">
                          <span className="px-2 py-1 text-xs font-medium text-green-400 bg-green-500/10 rounded">
                            {position.type}
                          </span>
                        </div>
                      </div>
                      <p className="text-env-tertiary text-sm mb-3">
                        📍 {position.location}
                      </p>
                      <p className="text-env-secondary text-sm leading-relaxed mb-4">
                        {position.description}
                      </p>
                      <Link
                        href="/contact?category=careers"
                        className="inline-flex items-center text-green-400 hover:text-green-300 font-medium text-sm transition-smooth"
                      >
                        Apply Now
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                  ))}
                </div>
                
                {/* Don't see your role */}
                <div className="mt-6 p-6 rounded-xl bg-green-500/10 border border-green-500/20">
                  <h4 className="font-semibold text-env-primary mb-2">
                    Don't see your role?
                  </h4>
                  <p className="text-env-secondary text-sm mb-4">
                    We're always looking for exceptional talent. Send us your CV and tell us 
                    how you can contribute to our mission.
                  </p>
                  <Link
                    href="/contact?category=careers"
                    className="inline-flex items-center text-green-400 hover:text-green-300 font-medium text-sm transition-smooth"
                  >
                    Send Open Application
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </AnimatedSection>
            
          </div>
          
        </div>
      </section>

      {/* ==================== PARTNERS SECTION ==================== */}
      <section id="partners" className="section-padding scroll-mt-20">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <SectionHeader
              label="Partnerships"
              title="Partner With Us"
              description="We believe in collaboration over competition. There are many ways to work together toward our shared goal of African development."
            />
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {partnershipTypes.map((partner, index) => (
              <AnimatedSection key={partner.title} animation="fade-up" delay={index * 100}>
                <div className="p-6 md:p-8 rounded-xl bg-env-surface border border-env-border hover:border-blue-500/30 transition-smooth hover-lift h-full">
                  <span className="text-4xl block mb-4">{partner.icon}</span>
                  <h3 className="text-xl font-semibold text-env-primary mb-3">
                    {partner.title}
                  </h3>
                  <p className="text-env-secondary leading-relaxed mb-6">
                    {partner.description}
                  </p>
                  <Link
                    href={partner.href}
                    className="inline-flex items-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-smooth text-sm hover-lift"
                  >
                    {partner.cta}
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </AnimatedSection>
            ))}
          </div>
          
          {/* Current partners */}
          <AnimatedSection animation="fade-up" delay={300}>
            <div className="mt-16 text-center">
              <h3 className="text-xl font-semibold text-env-primary mb-6">
                Organizations We've Worked With
              </h3>
              <div className="flex flex-wrap justify-center gap-8 items-center">
                {["Ikosi-Isheri LCDA", "NAPPS Lagos State", "+ More Coming"].map((partner) => (
                  <div key={partner} className="px-6 py-4 rounded-lg bg-env-surface border border-env-border">
                    <p className="text-env-secondary font-medium">{partner}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
          
        </div>
      </section>

      {/* ==================== INVESTORS SECTION ==================== */}
      <section id="investors" className="section-padding bg-env-secondary scroll-mt-20">
        <div className="container-forge">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* Left: Investment thesis */}
            <AnimatedSection animation="fade-right">
              <div>
                <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-purple-400 bg-purple-500/10 rounded-full border border-purple-500/20">
                  Investment
                </span>
                
                <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-6">
                  Invest in Africa's Future
                </h2>
                
                <p className="text-env-secondary leading-relaxed mb-8">
                  Forge Intellitech is building the digital infrastructure Africa needs. 
                  We're at an early stage with proven traction, a clear vision, and a 
                  massive market opportunity. We're looking for investors who share our 
                  long-term vision for the continent.
                </p>
                
                {/* Investment highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {investmentHighlights.map((highlight, index) => (
                    <div 
                      key={highlight.title}
                      className="p-4 rounded-lg bg-purple-500/5 border border-purple-500/20 hover-glow transition-smooth"
                    >
                      <span className="text-2xl block mb-2">{highlight.icon}</span>
                      <h4 className="font-medium text-env-primary mb-1">{highlight.title}</h4>
                      <p className="text-env-secondary text-sm">{highlight.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
            
            {/* Right: What investors get */}
            <AnimatedSection animation="fade-left" delay={150}>
              <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 to-chapter-accent-soft border border-purple-500/20">
                <h3 className="text-xl font-semibold text-env-primary mb-6">
                  What Early Investors Get
                </h3>
                
                <ul className="space-y-4 mb-8">
                  {investorBenefits.map((benefit, index) => (
                    <li key={index} className="flex items-start text-env-secondary">
                      <svg className="w-5 h-5 text-purple-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {benefit}
                    </li>
                  ))}
                </ul>
                
                <div className="p-4 rounded-lg bg-env-surface border border-env-border mb-6">
                  <p className="text-env-secondary text-sm">
                    <strong className="text-env-primary">Current Stage:</strong> Pre-seed / Seed
                  </p>
                  <p className="text-env-secondary text-sm mt-1">
                    <strong className="text-env-primary">Looking For:</strong> Strategic investors aligned with our mission
                  </p>
                </div>
                
                <Link
                  href="/contact?category=investment"
                  className="block w-full text-center px-6 py-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-smooth hover-lift"
                >
                  Request Investment Details
                </Link>
                
                <p className="text-env-tertiary text-xs text-center mt-4">
                  We'll send you our pitch deck and arrange a call.
                </p>
              </div>
            </AnimatedSection>
            
          </div>
          
        </div>
      </section>

      {/* ==================== VOLUNTEERS SECTION ==================== */}
      <section id="volunteers" className="section-padding scroll-mt-20">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <SectionHeader
              label="Volunteer"
              title="Give Your Time, Change Lives"
              description="Not everyone can work full-time or invest capital. But if you have skills and time to share, you can still make a difference."
            />
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {volunteerOpportunities.map((opportunity, index) => (
              <AnimatedSection key={opportunity.title} animation="fade-up" delay={index * 75}>
                <div className="p-6 rounded-xl bg-env-surface border border-env-border hover:border-chapter-accent/30 transition-smooth hover-lift h-full">
                  <span className="text-4xl block mb-4">{opportunity.icon}</span>
                  <h3 className="text-lg font-semibold text-env-primary mb-2">
                    {opportunity.title}
                  </h3>
                  <p className="text-env-secondary text-sm leading-relaxed mb-4">
                    {opportunity.description}
                  </p>
                  <p className="text-chapter-accent text-sm font-medium">
                    ⏱️ {opportunity.commitment}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
          
          <AnimatedSection animation="fade-up" delay={300}>
            <div className="text-center mt-12">
              <p className="text-env-secondary mb-6">
                Ready to volunteer? Tell us about your skills and availability.
              </p>
              <Link
                href="/contact?category=general"
                className="inline-flex items-center px-8 py-4 bg-chapter-accent hover:bg-chapter-accent-hover text-env-text-inverse font-medium rounded-lg transition-smooth hover-lift glow"
              >
                Become a Volunteer
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </AnimatedSection>
          
        </div>
      </section>

      {/* ==================== FINAL CTA SECTION ==================== */}
      <section className="section-padding bg-gradient-to-b from-env-secondary to-env-bg-primary">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="max-w-3xl mx-auto text-center">
              
              <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-6">
                Ready to join the 
                <span className="gradient-text"> movement?</span>
              </h2>
              
              <p className="text-lg text-env-secondary mb-10">
                Whatever way you choose to participate, you'll be part of something bigger — 
                the transformation of African technology from the ground up.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-chapter-accent hover:bg-chapter-accent-hover text-env-text-inverse font-medium rounded-lg transition-smooth glow hover-lift"
                >
                  Get In Touch
                </Link>
                <Link
                  href="/about"
                  className="px-8 py-4 bg-env-surface hover:bg-env-surface-hover text-env-primary font-medium rounded-lg border border-env-border transition-smooth hover-lift"
                >
                  Learn More About Us
                </Link>
              </div>
              
            </div>
          </AnimatedSection>
          
        </div>
      </section>
      
    </ChapterWrapper>
  );
}