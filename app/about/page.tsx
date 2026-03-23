// app/about/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { ChapterWrapper } from "../../components/ChapterWrapper";
import AnimatedSection from "../../components/AnimatedSection";
import AboutHero from "../../components/AboutHero";
import { CTASection } from "../../components/CTASection";
import {
  IconUbuntu,
  IconStar,
  IconIntegrity,
  IconInnovation,
  IconPatience,
  IconAccessibility,
  IconLearn,
  IconLaunch,
  IconBuilder,
  IconStrategist,
  IconStoryteller,
  IconCheck,
  IconTarget,
  IconSchool,
  IconCommunity,
  IconArrowRight,
  IconGrowth,
} from "../../components/icons/ForgeIcons";

// Company values
const values = [
  { title: "Originality", meaning: "Creating solution to fit Africans reality", description: "We succeed when our communities succeed.", icon: IconUbuntu, color: "#FF8C42" },
  { title: "Excellence", meaning: "World-class, homegrown", description: "Global quality, African soul.", icon: IconStar, color: "#FFD54F" },
  { title: "Integrity", meaning: "Trust as foundation", description: "We do what we say, every time.", icon: IconIntegrity, color: "#14B8B8" },
  { title: "Innovation", meaning: "Solutions from within", description: "Built from our reality, not borrowed ideas.", icon: IconInnovation, color: "#FF8C42" },
  { title: "Patience", meaning: "Building for generations", description: "We're not chasing headlines. We're building legacy.", icon: IconPatience, color: "#52B788" },
  { title: "Accessibility", meaning: "Technology for everyone", description: "If it doesn't reach everyone, it's not done yet.", icon: IconAccessibility, color: "#A855F7" },
];

// Team members
const team = [
  { name: "Jehovah God", role: "Founder", bio: "The timeless Creator and supreme founder, the source of wisdom and the purpose guiding ForgeITS mission to build Africa's future.", image: "/images/team/god.jpg", color: "#FF8C42" },
  { name: "Moxie Adeniyi", role: "Chief Executive Officer", bio: "A visionary CEO driving African innovation through human capacity development, building scalable systems that empower youth, strengthen institutions, and position the continent as a global force in technology and enterprise.", image: "/images/team/founder.jpg", color: "#14B8B8" },
  { name: "Adeola Oyewole", role: "Chairman", bio: "A leader committed to strengthening African institutions and empowering the next generation.", image: "/images/team/chairman.jpg", color: "#14B8B8" },
];


// Partners
const partners = [
  { name: "Ikosi-Isheri Local Government", logo: "/images/partners/ikosi-isheri-lg.jpg" },
  { name: "Motunrayo Girls Foundation", logo: "/images/partners/motunrayo-girls-foundation.jpg" },
  { name: "APC Women in Governance – Shomolu Chapter", logo: "/images/partners/apc-women-shomolu.jpg" },
];

// What makes Forge different
const differentiators = [
  { wrong: "We're not running one-off workshops", right: "We're building lasting school partnerships" },
  { wrong: "We're not teaching tools alone", right: "We're developing complete skillsets" },
  { wrong: "We're not chasing numbers", right: "We're building real capability" },
];

export default function AboutPage() {
  return (
    <ChapterWrapper chapter="forge">
      
      {/* ==================== ANIMATED HERO ==================== */}
      <AboutHero />

      {/* ==================== INTRO STATEMENT ==================== */}
      <section className="section-padding bg-env-bg-primary">
        <div className="container-forge">
          <AnimatedSection animation="fade-up">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-xl md:text-2xl text-env-secondary leading-relaxed mb-6">
                We're not here to run quick tech trainings and call it a day.
              </p>
              <p className="text-xl md:text-2xl text-env-primary font-medium leading-relaxed">
                We're here to <span className="text-[#FF8C42]">build pipelines</span> — pathways that take young Africans from curiosity to capability, from learning to leading.
              </p>
              <div 
                className="mt-8 p-6 rounded-xl"
                style={{ 
                  backgroundColor: 'rgba(255, 140, 66, 0.08)',
                  borderLeft: '4px solid #FF8C42'
                }}
              >
                <p className="text-lg text-env-primary font-medium">
                  We start with students. <span className="text-[#FF8C42]">But we're building for the whole country.</span>
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ==================== OUR EDGE ==================== */}
      <section id="our-edge" className="section-padding bg-env-secondary scroll-mt-20">
        <div className="container-forge">
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            <AnimatedSection animation="fade-up">
              <div>
                <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-[#FF8C42] bg-[#FF8C42]/10 rounded-full border border-[#FF8C42]/20">
                  Our Edge
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-6">
                  What makes us different
                </h2>
                <div className="space-y-4 text-env-secondary leading-relaxed">
                  <p>
                    Most tech programs focus on: <span className="text-env-primary font-medium">apps, hackathons, and quick wins.</span>
                  </p>
                  <p>We focus on something deeper:</p>
                  <p className="text-2xl text-[#FF8C42] font-bold">
                    Training people who will shape the future.
                  </p>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="fade-up" delay={200}>
              <div className="p-6 md:p-8 rounded-2xl bg-env-surface border border-env-border">
                <h3 className="text-lg font-semibold text-env-primary mb-4">
                  We intentionally build:
                </h3>
                <div className="space-y-3">
                  {[
                    { text: "Clear learning paths that grow with students", icon: IconTarget, color: "#14B8B8" },
                    { text: "Real partnerships with schools and communities", icon: IconSchool, color: "#52B788" },
                    { text: "Teaching responsibility alongside skills", icon: IconIntegrity, color: "#FFD54F" },
                    { text: "Training for jobs that actually exist", icon: IconGrowth, color: "#FF8C42" },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div 
                        key={item.text} 
                        className="flex items-start p-3 rounded-lg"
                        style={{ 
                          backgroundColor: `${item.color}10`,
                          border: `1px solid ${item.color}20`
                        }}
                      >
                        <Icon size={20} color={item.color} className="mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-env-primary font-medium text-sm">{item.text}</span>
                      </div>
                    );
                  })}
                </div>
                <p className="text-env-secondary mt-4 text-sm text-center">
                  ...all working together as one system.
                </p>
              </div>
            </AnimatedSection>
            
          </div>
          
        </div>
      </section>

      {/* ==================== WHAT WE BUILD ==================== */}
      <section className="section-padding bg-env-bg-primary">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-[#14B8B8] bg-[#14B8B8]/10 rounded-full border border-[#14B8B8]/20">
                What We Build
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-4">
                Two Sides of the Same Coin
              </h2>
              <p className="text-lg text-env-secondary max-w-2xl mx-auto">
                Education and technology — working together, making each other stronger.
              </p>
            </div>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-2 gap-8">
            
            <AnimatedSection animation="fade-up" delay={100}>
              <div className="p-6 md:p-8 rounded-2xl bg-env-surface border border-env-border h-full hover:border-[#52B788]/40 transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-[#52B788]/20 flex items-center justify-center mb-6">
                  <IconLearn size={32} color="#52B788" />
                </div>
                <h3 className="text-xl font-bold text-env-primary mb-4">
                  1. Education Programs
                </h3>
                <p className="text-env-secondary leading-relaxed mb-6">
                  Through <strong className="text-env-primary">TechUp</strong> and{' '}
                  <strong className="text-env-primary">LaunchPad</strong>, we teach students real digital skills in their own schools — taking them from basic tech literacy all the way to building their own ideas.
                </p>
                <div className="flex gap-3">
                  <Link 
                    href="/techup" 
                    className="text-[#52B788] hover:underline text-sm font-medium inline-flex items-center gap-1"
                  >
                    Explore TechUp <IconArrowRight size={14} color="#52B788" />
                  </Link>
                  <Link 
                    href="/launchpad" 
                    className="text-[#52B788] hover:underline text-sm font-medium inline-flex items-center gap-1"
                  >
                    Explore LaunchPad <IconArrowRight size={14} color="#52B788" />
                  </Link>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="fade-up" delay={200}>
              <div className="p-6 md:p-8 rounded-2xl bg-env-surface border border-env-border h-full hover:border-[#14B8B8]/40 transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-[#14B8B8]/20 flex items-center justify-center mb-6">
                  <IconBuilder size={32} color="#14B8B8" />
                </div>
                <h3 className="text-xl font-bold text-env-primary mb-4">
                  2. Technology Products
                </h3>
                <p className="text-env-secondary leading-relaxed mb-6">
                  Through products like <strong className="text-env-primary">BiteBank</strong> and{' '}
                  <strong className="text-env-primary">Trego</strong>, we build real solutions for food, transport, and community needs — designed for how Africans actually live and move.
                </p>
                <div className="flex gap-3">
                  <Link 
                    href="/products#bitebank" 
                    className="text-[#14B8B8] hover:underline text-sm font-medium inline-flex items-center gap-1"
                  >
                    See BiteBank <IconArrowRight size={14} color="#14B8B8" />
                  </Link>
                  <Link 
                    href="/products#trego" 
                    className="text-[#14B8B8] hover:underline text-sm font-medium inline-flex items-center gap-1"
                  >
                    See Trego <IconArrowRight size={14} color="#14B8B8" />
                  </Link>
                </div>
              </div>
            </AnimatedSection>
            
          </div>
          
          <AnimatedSection animation="fade-up" delay={300}>
            <div 
              className="mt-8 p-6 rounded-xl text-center"
              style={{ 
                backgroundColor: 'rgba(255, 140, 66, 0.08)',
                border: '1px solid rgba(255, 140, 66, 0.2)'
              }}
            >
              <p className="text-[#FF8C42] font-medium text-lg">
                We teach the builders. Then we build the systems. That's how it works.
              </p>
            </div>
          </AnimatedSection>
          
        </div>
      </section>

      {/* ==================== TECHUP HIGHLIGHT ==================== */}
      <section className="section-padding bg-env-secondary">
        <div className="container-forge">
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            <AnimatedSection animation="fade-up">
              <div>
                <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-[#14B8B8] bg-[#14B8B8]/10 rounded-full border border-[#14B8B8]/20">
                  Flagship Program
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-6">
                  TechUp — Where It All Begins
                </h2>
                <p className="text-env-secondary leading-relaxed mb-6">
                  TechUp brings real tech education directly into secondary schools. 
                  Students don't just learn to use apps — they learn to design, build, and create their own.
                </p>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[
                    { icon: IconBuilder, label: "Builder", color: "#14B8B8" },
                    { icon: IconStrategist, label: "Strategist", color: "#52B788" },
                    { icon: IconStoryteller, label: "Storyteller", color: "#A855F7" },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div 
                        key={item.label}
                        className="text-center p-4 rounded-xl"
                        style={{ 
                          backgroundColor: `${item.color}10`,
                          border: `1px solid ${item.color}20`
                        }}
                      >
                        <Icon size={28} color={item.color} className="mx-auto mb-2" />
                        <span style={{ color: item.color }} className="text-sm font-medium">{item.label}</span>
                      </div>
                    );
                  })}
                </div>
                
                <p className="text-env-secondary text-sm mb-6">
                  By the time they finish, students choose their path — whether they want to build tech, solve problems with data, or tell powerful stories through design.
                </p>
                
                <Link
                  href="/techup"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#14B8B8] text-[#1A1A1A] font-semibold transition-all duration-300 hover:scale-[1.02]"
                >
                  Learn More About TechUp
                  <IconArrowRight size={18} color="#1A1A1A" />
                </Link>
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="fade-up" delay={200}>
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden border border-env-border">
                  <Image
                    src="/images/about/techup-classroom1.jpg"
                    alt="TechUp students in classroom"
                    fill
                    className="object-cover"
                  />
                </div>
                <div 
                  className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl -z-10"
                  style={{ backgroundColor: 'rgba(20, 184, 184, 0.2)' }}
                />
              </div>
            </AnimatedSection>
            
          </div>
          
        </div>
      </section>

      {/* ==================== LAUNCHPAD HIGHLIGHT ==================== */}
      <section className="section-padding bg-env-bg-primary">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-[#FF8C42] bg-[#FF8C42]/10 rounded-full border border-[#FF8C42]/20">
                From Skills to Business
              </span>
              
              <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-6">
                LaunchPad
              </h2>
              
              <p className="text-lg text-env-secondary leading-relaxed mb-8">
                LaunchPad finds the best TechUp graduates and helps them turn their ideas into real businesses — 
                with funding, mentorship, and support, without taking any part of what they build.
              </p>
              
              <div 
                className="p-6 rounded-xl inline-block"
                style={{ 
                  backgroundColor: 'rgba(255, 140, 66, 0.08)',
                  border: '1px solid rgba(255, 140, 66, 0.2)'
                }}
              >
                <p className="text-xl text-[#FF8C42] font-bold">
                  Learn → Build → Launch → Grow
                </p>
              </div>
              
              <div className="mt-6">
                <Link
                  href="/launchpad"
                  className="inline-flex items-center gap-2 text-[#FF8C42] hover:underline font-medium"
                >
                  Learn more about LaunchPad
                  <IconArrowRight size={18} color="#FF8C42" />
                </Link>
              </div>
            </div>
          </AnimatedSection>
          
        </div>
      </section>

      {/* ==================== WHAT MAKES DIFFERENT ==================== */}
      <section className="section-padding bg-env-secondary">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-[#52B788] bg-[#52B788]/10 rounded-full border border-[#52B788]/20">
                Our Approach
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-4">
                We Do Things Differently
              </h2>
              <p className="text-lg text-env-secondary max-w-2xl mx-auto">
                Here's what sets us apart from typical tech programs.
              </p>
            </div>
          </AnimatedSection>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {differentiators.map((item, index) => (
              <AnimatedSection key={index} animation="fade-up" delay={index * 100}>
                <div className="p-6 rounded-xl bg-env-surface border border-env-border">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div 
                      className="p-4 rounded-lg"
                      style={{ 
                        backgroundColor: 'rgba(239, 68, 68, 0.08)',
                        border: '1px solid rgba(239, 68, 68, 0.15)'
                      }}
                    >
                      <span className="text-[#EF4444] text-sm">✗ {item.wrong}</span>
                    </div>
                    <div 
                      className="p-4 rounded-lg"
                      style={{ 
                        backgroundColor: 'rgba(82, 183, 136, 0.08)',
                        border: '1px solid rgba(82, 183, 136, 0.15)'
                      }}
                    >
                      <span className="text-[#52B788] text-sm">✓ {item.right}</span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
          
        </div>
      </section>

      {/* ==================== PARTNERS ==================== */}
      <section className="section-padding bg-env-bg-primary">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-[#FFD54F] bg-[#FFD54F]/10 rounded-full border border-[#FFD54F]/20">
                Our Partners
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-4">
                Who We Work With
              </h2>
              <p className="text-lg text-env-secondary max-w-2xl mx-auto">
                We work with government, community organizations, and schools to make real impact.
              </p>
            </div>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {partners.map((partner, index) => (
              <AnimatedSection key={partner.name} animation="fade-up" delay={index * 100}>
                <div className="text-center">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden bg-env-surface border-4 border-env-border ring-4 ring-[#FF8C42]/10 mx-auto mb-4 relative">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-env-primary text-sm">{partner.name}</h3>
                </div>
              </AnimatedSection>
            ))}
          </div>
          
        </div>
      </section>

      {/* ==================== TEAM ==================== */}
      <section className="section-padding bg-env-secondary">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-[#14B8B8] bg-[#14B8B8]/10 rounded-full border border-[#14B8B8]/20">
                Leadership
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-4">
                Who's Behind Forge
              </h2>
              <p className="text-lg text-env-secondary max-w-2xl mx-auto">
                Meet the people leading this mission.
              </p>
            </div>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <AnimatedSection key={member.name} animation="fade-up" delay={index * 150}>
                <div className="p-8 rounded-2xl bg-env-surface border border-env-border hover:border-transparent transition-all duration-300"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = member.color + '40';
                    e.currentTarget.style.boxShadow = `0 20px 40px ${member.color}10`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--env-border)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div 
                    className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 mb-8 mx-auto relative"
                    style={{ borderColor: member.color + '40' }}
                  >
                    <Image
                      src={member.image}
                      alt={`${member.name} - ${member.role}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-2xl font-semibold text-env-primary mb-2">
                      {member.name}
                    </h3>
                    <p style={{ color: member.color }} className="font-medium mb-4 text-lg">
                      {member.role}
                    </p>
                    <p className="text-env-secondary leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
          
        </div>
      </section>

      {/* ==================== VALUES ==================== */}
      <section id="values" className="section-padding bg-env-bg-primary scroll-mt-20">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-[#A855F7] bg-[#A855F7]/10 rounded-full border border-[#A855F7]/20">
                Our Values
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-4">
                What We Stand For
              </h2>
              <p className="text-lg text-env-secondary max-w-2xl mx-auto">
                Six principles that guide everything we do.
              </p>
            </div>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <AnimatedSection key={value.title} animation="fade-up" delay={index * 100}>
                  <div 
                    className="p-6 rounded-xl bg-env-surface border border-env-border hover:border-transparent transition-all duration-300 h-full group"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = value.color + '40';
                      e.currentTarget.style.boxShadow = `0 15px 30px ${value.color}10`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--env-border)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div className="mb-4 transition-transform group-hover:scale-110">
                      <Icon size={40} color={value.color} />
                    </div>
                    <h3 className="text-xl font-semibold text-env-primary mb-1">
                      {value.title}
                    </h3>
                    <p className="text-sm mb-3 italic" style={{ color: value.color }}>
                      "{value.meaning}"
                    </p>
                    <p className="text-env-secondary text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
          
        </div>
      </section>

      {/* ==================== OUR PROMISE ==================== */}
      <section className="section-padding bg-env-secondary">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-wider text-[#FF8C42] bg-[#FF8C42]/10 rounded-full border border-[#FF8C42]/20">
                Our Promise
              </span>
              
              <p className="text-xl text-env-secondary leading-relaxed mb-8">
                Forge exists so the next generation of Africans don't just use technology —
              </p>
              
              <div className="space-y-4 mb-8">
                <p className="text-2xl text-env-primary font-bold">They design it.</p>
                <p className="text-2xl text-env-primary font-bold">They build it.</p>
                <p className="text-2xl text-env-primary font-bold">They own it.</p>
              </div>
              
              <div 
                className="p-8 rounded-2xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 140, 66, 0.1), rgba(168, 85, 247, 0.1))',
                  border: '1px solid rgba(255, 140, 66, 0.2)'
                }}
              >
                <p className="text-xl text-env-secondary mb-4">
                  Africa's future won't be imported.
                </p>
                <p 
                  className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent"
                  style={{ backgroundImage: 'linear-gradient(135deg, #FF8C42, #FFD54F, #14B8B8)' }}
                >
                  It will be forged — right here, by us.
                </p>
              </div>
            </div>
          </AnimatedSection>
          
        </div>
      </section>

      {/* ==================== CTA ==================== */}
      <CTASection
        headline="Let's Build"
        highlightedText="Something That Lasts"
        description="We're looking for schools, governments, and organizations who are ready to invest in real, long-term change. Whether you want to bring TechUp to your community, support our students, or collaborate on something bigger — let's talk."
        primaryAction={{
          label: "Start a Conversation",
          href: "/contact",
        }}
        secondaryAction={{
          label: "Explore TechUp",
          href: "/techup",
        }}
        backgroundImage="/images/cta/about-cta.jpg"
        overlayOpacity={80}
      />
      
    </ChapterWrapper>
  );
}