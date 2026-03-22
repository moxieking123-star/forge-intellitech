// app/join/page.tsx
"use client";

import Link from "next/link";
import { ChapterWrapper } from "../../components/ChapterWrapper";
import AnimatedSection from "../../components/AnimatedSection";
import JoinHero from "../../components/JoinHero";
import { CTASection } from "../../components/CTASection";
import {
  IconTalent,
  IconPartnership,
  IconInvestment,
  IconCheck,
  IconArrowRight,
  IconGrowth,
  IconCommunity,
  IconTarget,
  IconLearn,
} from "../../components/icons/ForgeIcons";

// Join options
const joinOptions = [
  {
    id: "talent",
    icon: IconTalent,
    title: "Join Our Team",
    subtitle: "Build the future with us",
    color: "#14B8B8",
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
    icon: IconPartnership,
    title: "Partner With Us",
    subtitle: "Collaborate for impact",
    color: "#FF8C42",
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
    icon: IconInvestment,
    title: "Invest in Forge",
    subtitle: "Back African innovation",
    color: "#52B788",
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

// Open positions
const openPositions = [
  {
    title: "Senior Frontend Engineer",
    type: "Full-time",
    location: "Remote (Africa)",
    department: "Engineering",
    color: "#14B8B8",
  },
  {
    title: "Product Designer",
    type: "Full-time",
    location: "Lagos / Remote",
    department: "Design",
    color: "#A855F7",
  },
  {
    title: "Program Coordinator - TechUp",
    type: "Full-time",
    location: "Lagos",
    department: "Programs",
    color: "#FF8C42",
  },
  {
    title: "Content Writer",
    type: "Contract",
    location: "Remote",
    department: "Marketing",
    color: "#52B788",
  },
];

// Why join Forge
const whyJoinReasons = [
  { icon: IconGrowth, title: "Real Impact", description: "Your work directly affects thousands of young Africans", color: "#FF8C42" },
  { icon: IconCommunity, title: "Great People", description: "Work with passionate builders who care", color: "#14B8B8" },
  { icon: IconTarget, title: "Clear Mission", description: "We know where we're going and why", color: "#52B788" },
  { icon: IconLearn, title: "Always Learning", description: "Grow your skills while building the future", color: "#A855F7" },
];

export default function JoinPage() {
  return (
    <ChapterWrapper chapter="forge">
      
      {/* ==================== ANIMATED HERO ==================== */}
      <JoinHero />

      {/* ==================== WHY JOIN ==================== */}
      <section className="section-padding bg-env-bg-primary">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-[#FF8C42] bg-[#FF8C42]/10 rounded-full border border-[#FF8C42]/20">
                Why Forge?
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-4">
                More Than Just a Job
              </h2>
              <p className="text-lg text-env-secondary max-w-2xl mx-auto">
                We're not a typical tech company. We're a mission — and everyone here is part of it.
              </p>
            </div>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyJoinReasons.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <AnimatedSection key={reason.title} animation="fade-up" delay={index * 100}>
                  <div className="p-6 rounded-2xl bg-env-surface border border-env-border text-center h-full">
                    <div className="mb-4 flex justify-center">
                      <div 
                        className="w-14 h-14 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: reason.color + '15' }}
                      >
                        <Icon size={28} color={reason.color} />
                      </div>
                    </div>
                    <h3 className="font-semibold text-env-primary mb-2">{reason.title}</h3>
                    <p className="text-env-secondary text-sm">{reason.description}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
          
        </div>
      </section>

      {/* ==================== JOIN OPTIONS ==================== */}
      <section className="section-padding bg-env-secondary">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-4">
                Find Your Place
              </h2>
              <p className="text-lg text-env-secondary max-w-2xl mx-auto">
                There are many ways to be part of what we're building.
              </p>
            </div>
          </AnimatedSection>
          
          <div className="space-y-8">
            {joinOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <AnimatedSection 
                  key={option.id} 
                  animation="fade-up"
                  delay={index * 100}
                >
                  <div 
                    id={option.id}
                    className="scroll-mt-24 p-6 md:p-10 rounded-2xl bg-env-surface border-2 transition-all duration-300"
                    style={{ borderColor: option.color + '30' }}
                  >
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                      
                      {/* Content */}
                      <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                        <div className="flex items-center gap-4 mb-4">
                          <div 
                            className="w-14 h-14 rounded-xl flex items-center justify-center"
                            style={{ backgroundColor: option.color + '20' }}
                          >
                            <Icon size={32} color={option.color} />
                          </div>
                          <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-env-primary">
                              {option.title}
                            </h2>
                            <p style={{ color: option.color }} className="font-medium">{option.subtitle}</p>
                          </div>
                        </div>
                        
                        <p className="text-env-secondary leading-relaxed mb-6">
                          {option.description}
                        </p>
                        
                        <Link
                          href={option.ctaHref}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02]"
                          style={{ 
                            backgroundColor: option.color,
                            color: '#1A1A1A'
                          }}
                        >
                          {option.cta}
                          <IconArrowRight size={18} color="#1A1A1A" />
                        </Link>
                      </div>
                      
                      {/* Benefits */}
                      <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                        <div 
                          className="p-6 rounded-xl"
                          style={{ 
                            backgroundColor: 'var(--env-bg-primary)',
                            border: '1px solid var(--env-border)'
                          }}
                        >
                          <h3 className="font-semibold text-env-primary mb-4">What you get:</h3>
                          <ul className="space-y-3">
                            {option.benefits.map((benefit, i) => (
                              <li key={i} className="flex items-start text-env-secondary">
                                <IconCheck size={18} color={option.color} className="mr-3 mt-0.5 flex-shrink-0" />
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
          
        </div>
      </section>

      {/* ==================== OPEN POSITIONS ==================== */}
      <section id="positions" className="section-padding bg-env-bg-primary scroll-mt-20">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-[#14B8B8] bg-[#14B8B8]/10 rounded-full border border-[#14B8B8]/20">
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
                  className="block p-6 rounded-2xl bg-env-surface border border-env-border hover:border-transparent transition-all duration-300 group"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = position.color + '50';
                    e.currentTarget.style.boxShadow = `0 10px 25px ${position.color}10`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--env-border)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h3 
                        className="text-lg font-semibold mb-2 transition-colors"
                        style={{ color: 'var(--env-text-primary)' }}
                      >
                        {position.title}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        <span 
                          className="px-3 py-1 text-xs rounded-full"
                          style={{ 
                            backgroundColor: position.color + '15',
                            color: position.color
                          }}
                        >
                          {position.department}
                        </span>
                        <span className="px-3 py-1 text-xs bg-env-bg-primary rounded-full text-env-secondary">
                          {position.type}
                        </span>
                        <span className="px-3 py-1 text-xs bg-env-bg-primary rounded-full text-env-secondary">
                          {position.location}
                        </span>
                      </div>
                    </div>
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center transition-all group-hover:scale-110"
                      style={{ backgroundColor: position.color + '15' }}
                    >
                      <IconArrowRight size={18} color={position.color} />
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
          
          <AnimatedSection animation="fade-up" delay={300}>
            <div className="text-center mt-8">
              <p className="text-env-secondary mb-4">
                Don't see the right role?
              </p>
              <Link 
                href="/contact" 
                className="inline-flex items-center gap-2 text-[#FF8C42] font-medium hover:underline"
              >
                Send us your resume anyway
                <IconArrowRight size={16} color="#FF8C42" />
              </Link>
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