// app/techup/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { ChapterWrapper } from "../../components/ChapterWrapper";
import AnimatedSection from "../../components/AnimatedSection";
import TechUpHero from "../../components/TechUpHero";
import { CTASection } from "../../components/CTASection";
import {
  IconSchool,
  IconCode,
  IconDesign,
  IconData,
  IconShield,
  IconTeam,
  IconTarget,
  IconPath,
  IconEthics,
  IconBuilder,
  IconStrategist,
  IconStoryteller,
  IconGrowth,
  IconCheck,
  IconQuestion,
  IconArrowRight,
  IconLearn,
  IconLaunch,
} from "../../components/icons/ForgeIcons";

// Junior Secondary curriculum
const juniorFoundation = [
  { area: "Design Thinking", description: "Visual communication and user-centered design", icon: IconDesign, color: "#A855F7" },
  { area: "Web Creation", description: "How websites work and how to build them", icon: IconCode, color: "#14B8B8" },
  { area: "Logical Thinking", description: "Problem-solving and intro to programming", icon: IconStrategist, color: "#52B788" },
  { area: "Data Literacy", description: "Understanding and working with data", icon: IconData, color: "#FF8C42" },
  { area: "Digital Teamwork", description: "Collaboration tools and online professionalism", icon: IconTeam, color: "#FFD54F" },
  { area: "Digital Citizenship", description: "Online safety, privacy, and cybercrime basics", icon: IconShield, color: "#14B8B8" },
];

// Senior Secondary Pathways
const seniorPathways = [
  {
    name: "Builder",
    tagline: "Technology Creators",
    description: "For students who want to create software and digital systems. Learn to code, build databases, deploy apps, and understand how tech infrastructure works.",
    color: "#14B8B8",
    icon: IconBuilder,
    outcomes: ["Full-stack development skills", "Portfolio of working apps", "Understanding of system design"],
  },
  {
    name: "Strategist",
    tagline: "Problem Solvers & Future Founders",
    description: "For students drawn to business, analysis, and leadership. Learn user research, product validation, data interpretation, and how to design ventures.",
    color: "#52B788",
    icon: IconStrategist,
    outcomes: ["Product and market analysis", "Data-driven decision making", "Business model development"],
  },
  {
    name: "Storyteller",
    tagline: "Designers & Communicators",
    description: "For students with creative strengths. Master interface design, visual storytelling, content creation, and brand building — making technology accessible and beautiful.",
    color: "#A855F7",
    icon: IconStoryteller,
    outcomes: ["Professional design portfolio", "Content creation expertise", "User experience mastery"],
  },
];

// What makes TechUp different
const differentiators = [
  { title: "Built Into Schools", description: "Not weekend workshops that fade away. TechUp runs inside school systems, year after year.", icon: IconSchool, color: "#14B8B8" },
  { title: "Six-Year Journey", description: "From digital basics to career-ready skills — built step by step, the right way.", icon: IconPath, color: "#FF8C42" },
  { title: "Ethics First", description: "We teach responsible tech use, digital citizenship, and Nigerian cybercrime law from day one.", icon: IconEthics, color: "#FFD54F" },
  { title: "Real Projects", description: "Students build actual products, not just practice exercises. Every term ends with something real.", icon: IconBuilder, color: "#52B788" },
  { title: "Clear Career Paths", description: "By graduation, students know what they're good at — and have the portfolio to prove it.", icon: IconTarget, color: "#A855F7" },
  { title: "Path to Entrepreneurship", description: "Top students move directly into LaunchPad, where they can turn their ideas into businesses.", icon: IconLaunch, color: "#FF8C42" },
];

// Impact stats
const impactStats = [
  { value: "10+", label: "Schools Running TechUp" },
  { value: "2,500+", label: "Students Trained" },
  { value: "30+", label: "Workshops Delivered" },
  { value: "3", label: "Career Pathways" },
];

// FAQs
const faqs = [
  { question: "What age is TechUp for?", answer: "TechUp is for secondary school students from JSS1 (age 10-11) through SS3 (age 16-17). The curriculum grows with them over six years." },
  { question: "Does it replace our computer classes?", answer: "No. TechUp adds real, practical skills on top of what you already teach. We work with schools, not against them." },
  { question: "What equipment do we need?", answer: "TechUp works with basic devices and slow internet. We design for real African schools, not ideal conditions." },
  { question: "What about our teachers?", answer: "We train them. TechUp strengthens your teachers with curriculum, guides, and ongoing support. We're building school capacity, not creating dependency." },
  { question: "What happens to top students?", answer: "They get identified early and prepared for Forge's LaunchPad program — where they can access funding and mentorship to build their own ventures." },
  { question: "Is this only for private schools?", answer: "Absolutely not. TechUp is designed for both public and private schools, including low-resource environments. Every Nigerian student deserves this." },
];

export default function TechUpPage() {
  return (
    <ChapterWrapper chapter="ignition">
      
      {/* ==================== ANIMATED HERO ==================== */}
      <TechUpHero />

      {/* ==================== THE PROBLEM ==================== */}
      <section className="section-padding bg-env-bg-primary">
        <div className="container-forge">
          <div className="max-w-4xl mx-auto">
            
            <AnimatedSection animation="fade-up">
              <div className="text-center mb-12">
                <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-wider text-[#EF4444] bg-[#EF4444]/10 rounded-full border border-[#EF4444]/20">
                  The Problem
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-env-primary mb-6 leading-tight">
                  Millions of young Nigerians leave school without the skills they need.
                </h2>
                <p className="text-lg text-env-secondary leading-relaxed mb-2">
                  They can use apps — but they can't build them.
                </p>
                <p className="text-lg text-env-secondary leading-relaxed mb-2">
                  They consume content — but they can't create it.
                </p>
                <p className="text-lg text-env-primary font-medium">
                  In a world shaped by technology, this is dangerous.
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[
                { label: "Traditional ICT", problem: "Teaches tools, not skills", color: "#EF4444" },
                { label: "Weekend Workshops", problem: "Exciting, but don't last", color: "#EF4444" },
                { label: "Online Courses", problem: "Need access most don't have", color: "#EF4444" },
              ].map((item, index) => (
                <AnimatedSection key={item.label} animation="fade-up" delay={index * 100}>
                  <div 
                    className="p-5 rounded-xl text-center"
                    style={{ 
                      backgroundColor: `${item.color}08`,
                      border: `1px solid ${item.color}20`
                    }}
                  >
                    <p style={{ color: item.color }} className="font-medium mb-1">{item.label}</p>
                    <p className="text-env-secondary text-sm">{item.problem}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            <AnimatedSection animation="fade-up" delay={300}>
              <div 
                className="p-6 rounded-xl text-center"
                style={{ 
                  backgroundColor: 'rgba(20, 184, 184, 0.08)',
                  border: '1px solid rgba(20, 184, 184, 0.2)'
                }}
              >
                <p className="text-lg text-env-primary font-medium">
                  TechUp is different. We work{' '}
                  <span className="text-[#14B8B8]">inside schools, over years</span> — not weekends.
                </p>
              </div>
            </AnimatedSection>

          </div>
        </div>
      </section>

      {/* ==================== IMPACT STATS ==================== */}
      <section className="py-12 bg-env-secondary">
        <div className="container-forge">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {impactStats.map((stat, index) => (
              <AnimatedSection key={stat.label} animation="scale-in" delay={index * 75}>
                <div className="text-center p-6 rounded-xl bg-env-surface border border-env-border">
                  <div className="text-3xl md:text-4xl font-bold text-[#14B8B8] mb-2">
                    {stat.value}
                  </div>
                  <div className="text-env-secondary text-sm">{stat.label}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== HOW IT WORKS ==================== */}
      <section id="how-it-works" className="section-padding bg-env-bg-primary scroll-mt-20">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-[#14B8B8] bg-[#14B8B8]/10 rounded-full border border-[#14B8B8]/20">
                The Journey
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-4">
                How TechUp Works
              </h2>
              <p className="text-lg text-env-secondary max-w-2xl mx-auto">
                A clear path from digital basics to career-ready skills. 
                Not a crash course — a six-year capability pipeline.
              </p>
            </div>
          </AnimatedSection>

          {/* Journey Visual */}
          <div className="max-w-5xl mx-auto mb-12">
            <div className="relative">
              {/* Connection line */}
              <div className="hidden md:block absolute top-20 left-[15%] right-[15%] h-1 bg-gradient-to-r from-[#52B788] via-[#A855F7] to-[#FF8C42] rounded-full" />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                {[
                  { stage: "Junior Secondary", years: "JSS1 – JSS3", icon: "🌱", color: "#52B788", desc: "Everyone explores design, coding, data, and digital citizenship." },
                  { stage: "Senior Secondary", years: "SS1 – SS3", icon: "🎯", color: "#A855F7", desc: "Students choose: Builder, Strategist, or Storyteller." },
                  { stage: "Graduation", years: "Career Ready", icon: "🚀", color: "#FF8C42", desc: "Portfolio, professional presence, and pathway to LaunchPad." },
                ].map((item, index) => (
                  <AnimatedSection key={item.stage} animation="fade-up" delay={index * 150}>
                    <div className="text-center">
                      <div 
                        className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center relative z-10 shadow-lg"
                        style={{ 
                          backgroundColor: `${item.color}20`,
                          border: `4px solid ${item.color}40`
                        }}
                      >
                        <span className="text-3xl">{item.icon}</span>
                      </div>
                      <h3 className="text-xl font-bold text-env-primary mb-1">{item.stage}</h3>
                      <p style={{ color: item.color }} className="font-medium text-sm mb-2">{item.years}</p>
                      <p className="text-env-secondary text-sm">{item.desc}</p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>

          <AnimatedSection animation="fade-up" delay={400}>
            <div className="p-6 rounded-xl bg-env-surface border border-env-border text-center max-w-3xl mx-auto">
              <p className="text-env-primary font-medium">
                Not a crash course. A{' '}
                <span className="text-[#14B8B8]">six-year capability pipeline</span>{' '}
                that produces graduates who can compete globally.
              </p>
            </div>
          </AnimatedSection>

        </div>
      </section>

      {/* ==================== JUNIOR SECONDARY ==================== */}
      <section className="section-padding bg-env-secondary">
        <div className="container-forge">
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            <AnimatedSection animation="fade-up">
              <div>
                <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-[#52B788] bg-[#52B788]/10 rounded-full border border-[#52B788]/20">
                  Stage 1: Junior Secondary
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-6">
                  Building the Foundation
                </h2>
                <p className="text-lg text-env-secondary leading-relaxed mb-4">
                  In junior years, <strong className="text-env-primary">every student</strong> gets to explore everything — design, coding, data, and digital teamwork.
                </p>
                <p className="text-env-secondary leading-relaxed mb-6">
                  No one gets left behind. No early tracking. Just broad exposure so that when they choose a path later, it's based on real experience.
                </p>
                <div 
                  className="p-4 rounded-xl"
                  style={{ 
                    backgroundColor: 'rgba(82, 183, 136, 0.1)',
                    borderLeft: '4px solid #52B788'
                  }}
                >
                  <p className="text-env-primary text-sm font-medium">
                    <span className="text-[#52B788]">Goal:</span> Remove the fear. Show students they can create, not just consume.
                  </p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={200}>
              <div className="grid grid-cols-2 gap-4">
                {juniorFoundation.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.area}
                      className="p-4 rounded-xl bg-env-surface border border-env-border hover:border-transparent transition-all duration-300"
                      style={{
                        // @ts-ignore
                        '--hover-border': item.color,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = item.color + '40';
                        e.currentTarget.style.boxShadow = `0 10px 25px ${item.color}15`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--env-border)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <div className="mb-3">
                        <Icon size={32} color={item.color} />
                      </div>
                      <h4 className="font-semibold text-env-primary text-sm mb-1">{item.area}</h4>
                      <p className="text-env-tertiary text-xs">{item.description}</p>
                    </div>
                  );
                })}
              </div>
            </AnimatedSection>

          </div>

        </div>
      </section>

      {/* ==================== SENIOR PATHWAYS ==================== */}
      <section className="section-padding bg-env-bg-primary">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-[#A855F7] bg-[#A855F7]/10 rounded-full border border-[#A855F7]/20">
                Stage 2: Senior Secondary
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-4">
                Choose Your Path
              </h2>
              <p className="text-lg text-env-secondary max-w-2xl mx-auto">
                At SS1, students pick their path based on interest and strength. 
                Each one leads to real, marketable skills.
              </p>
            </div>
          </AnimatedSection>

          <div className="space-y-6">
            {seniorPathways.map((pathway, index) => {
              const Icon = pathway.icon;
              return (
                <AnimatedSection key={pathway.name} animation="fade-up" delay={index * 100}>
                  <div 
                    className="p-6 md:p-8 rounded-2xl border-2 transition-all duration-300"
                    style={{ 
                      backgroundColor: `${pathway.color}08`,
                      borderColor: `${pathway.color}30`,
                    }}
                  >
                    <div className="grid lg:grid-cols-3 gap-6 items-center">
                      
                      {/* Pathway Info */}
                      <div className="lg:col-span-2">
                        <div className="flex items-center gap-4 mb-4">
                          <div 
                            className="w-14 h-14 rounded-xl flex items-center justify-center"
                            style={{ backgroundColor: `${pathway.color}20` }}
                          >
                            <Icon size={32} color={pathway.color} />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-env-primary">{pathway.name}</h3>
                            <p style={{ color: pathway.color }} className="font-medium">{pathway.tagline}</p>
                          </div>
                        </div>
                        <p className="text-env-secondary leading-relaxed">{pathway.description}</p>
                      </div>

                      {/* Outcomes */}
                      <div 
                        className="p-4 rounded-xl"
                        style={{ 
                          backgroundColor: 'var(--env-surface)',
                          border: '1px solid var(--env-border)'
                        }}
                      >
                        <h4 className="font-semibold text-env-primary mb-3 text-sm">You Graduate With:</h4>
                        <ul className="space-y-2">
                          {pathway.outcomes.map((outcome, i) => (
                            <li key={i} className="flex items-start text-env-secondary text-sm">
                              <IconCheck size={16} color={pathway.color} className="mr-2 mt-0.5 flex-shrink-0" />
                              {outcome}
                            </li>
                          ))}
                        </ul>
                      </div>

                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>

          <AnimatedSection animation="fade-up" delay={400}>
            <div className="mt-8 p-6 rounded-xl bg-env-surface border border-env-border text-center max-w-3xl mx-auto">
              <h4 className="font-semibold text-env-primary mb-3">They Work Better Together</h4>
              <p className="text-env-secondary text-sm">
                In final projects, students form mixed teams — just like real companies. 
                Builders create the tech. Strategists figure out the market. Storytellers make it beautiful.
                <span className="text-[#14B8B8] font-medium"> That's how real innovation works.</span>
              </p>
            </div>
          </AnimatedSection>

        </div>
      </section>

      {/* ==================== GRADUATION READINESS ==================== */}
      <section className="section-padding bg-env-secondary">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-[#FF8C42] bg-[#FF8C42]/10 rounded-full border border-[#FF8C42]/20">
                Graduation Requirements
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-4">
                Students Don't Just Graduate.
                <br /><span className="text-[#FF8C42]">They Launch.</span>
              </h2>
              <p className="text-lg text-env-secondary max-w-2xl mx-auto">
                By SS3, every TechUp student has proof — professional profiles, 
                real portfolios, and the confidence to start working or building.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            <AnimatedSection animation="fade-up" delay={100}>
              <div className="p-6 rounded-2xl bg-env-surface border border-env-border h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#14B8B8]/20 flex items-center justify-center">
                    <IconTeam size={28} color="#14B8B8" />
                  </div>
                  <h3 className="text-xl font-bold text-env-primary">LinkedIn Profile</h3>
                </div>
                <p className="text-env-secondary text-sm mb-4">Every graduate has:</p>
                <ul className="space-y-2 text-env-secondary text-sm">
                  {["Complete profile with professional photo", "Summary matching their pathway", "Projects documented", "Connections with mentors"].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-[#14B8B8] mr-2">•</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={200}>
              <div className="p-6 rounded-2xl bg-env-surface border border-env-border h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#52B788]/20 flex items-center justify-center">
                    <IconGrowth size={28} color="#52B788" />
                  </div>
                  <h3 className="text-xl font-bold text-env-primary">Freelancing Profile</h3>
                </div>
                <p className="text-env-secondary text-sm mb-4">Active on at least one platform:</p>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {["Fiverr", "Upwork", "Toptal", "Local Sites"].map((platform) => (
                    <div key={platform} className="p-2 rounded-lg bg-env-bg-primary/50 text-center">
                      <span className="text-env-primary text-sm">{platform}</span>
                    </div>
                  ))}
                </div>
                <p className="text-env-tertiary text-xs">With services listed and portfolio work uploaded.</p>
              </div>
            </AnimatedSection>

          </div>

          <AnimatedSection animation="fade-up" delay={300}>
            <div 
              className="mt-8 p-6 rounded-xl text-center max-w-3xl mx-auto"
              style={{ 
                backgroundColor: 'rgba(168, 85, 247, 0.08)',
                border: '1px solid rgba(168, 85, 247, 0.2)'
              }}
            >
              <p className="text-env-primary font-medium">
                <span className="text-[#A855F7]">Top graduates?</span> They move directly to{' '}
                <Link href="/launchpad" className="text-[#FF8C42] hover:underline">LaunchPad</Link>
                — where they get funding and support to build their own ventures.
              </p>
            </div>
          </AnimatedSection>

        </div>
      </section>

      {/* ==================== WHAT MAKES DIFFERENT ==================== */}
      <section className="section-padding bg-env-bg-primary">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-[#14B8B8] bg-[#14B8B8]/10 rounded-full border border-[#14B8B8]/20">
                Our Approach
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-4">
                What Makes TechUp Different
              </h2>
              <p className="text-lg text-env-secondary max-w-2xl mx-auto">
                We're not another training program. We're building a system that lasts.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {differentiators.map((item, index) => {
              const Icon = item.icon;
              return (
                <AnimatedSection key={item.title} animation="fade-up" delay={index * 75}>
                  <div 
                    className="p-6 rounded-xl bg-env-surface border border-env-border hover:border-transparent transition-all duration-300 h-full group"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = item.color + '40';
                      e.currentTarget.style.boxShadow = `0 15px 30px ${item.color}12`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--env-border)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div className="mb-4 transition-transform group-hover:scale-110">
                      <Icon size={40} color={item.color} />
                    </div>
                    <h3 className="text-lg font-semibold text-env-primary mb-2">{item.title}</h3>
                    <p className="text-env-secondary text-sm leading-relaxed">{item.description}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>

        </div>
      </section>

      {/* ==================== FOR SCHOOLS ==================== */}
      <section className="section-padding bg-env-secondary">
        <div className="container-forge">
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            <AnimatedSection animation="fade-up">
              <div>
                <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-[#FF8C42] bg-[#FF8C42]/10 rounded-full border border-[#FF8C42]/20">
                  School Partnership
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-6">
                  Bringing TechUp to Your School
                </h2>
                <p className="text-lg text-env-secondary leading-relaxed mb-6">
                  We don't replace teachers — we strengthen them. TechUp works within 
                  your existing structure, giving your staff the curriculum, training, 
                  and support they need.
                </p>
                
                <div className="space-y-4 mb-8">
                  {[
                    { icon: IconTeam, label: "Teacher Training", desc: "We train your teachers, not replace them", color: "#14B8B8" },
                    { icon: IconLearn, label: "Complete Materials", desc: "Teaching guides, lesson plans, assessments", color: "#52B788" },
                    { icon: IconTarget, label: "Works Anywhere", desc: "Designed for low-resource settings", color: "#FF8C42" },
                    { icon: IconCheck, label: "Quality Checks", desc: "Regular monitoring and improvement", color: "#A855F7" },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="flex items-start gap-4">
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${item.color}20` }}
                        >
                          <Icon size={22} color={item.color} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-env-primary">{item.label}</h4>
                          <p className="text-env-secondary text-sm">{item.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <Link
                  href="/contact"
                  className="
                    inline-flex items-center gap-2
                    px-6 py-3 rounded-xl
                    bg-[#14B8B8] text-[#1A1A1A] font-bold
                    transition-all duration-300 hover:scale-[1.02]
                  "
                >
                  Start a Partnership Conversation
                  <IconArrowRight size={18} color="#1A1A1A" />
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={200}>
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden border border-env-border">
                  <Image
                    src="/images/techup/classroom-session.jpg"
                    alt="TechUp classroom session"
                    fill
                    className="object-cover"
                  />
                </div>
                <div 
                  className="absolute -bottom-6 -right-6 p-5 rounded-2xl shadow-xl"
                  style={{ 
                    backgroundColor: 'var(--env-surface)',
                    border: '1px solid var(--env-border)'
                  }}
                >
                  <p className="text-3xl font-bold text-[#14B8B8]">100%</p>
                  <p className="text-env-tertiary text-sm">Teacher support<br/>included</p>
                </div>
              </div>
            </AnimatedSection>

          </div>

        </div>
      </section>

      {/* ==================== FAQ ==================== */}
      <section className="section-padding bg-env-bg-primary">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-[#FFD54F] bg-[#FFD54F]/10 rounded-full border border-[#FFD54F]/20">
                Questions
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-4">
                Common Questions
              </h2>
              <p className="text-lg text-env-secondary max-w-2xl mx-auto">
                What schools, parents, and partners usually ask.
              </p>
            </div>
          </AnimatedSection>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <AnimatedSection key={index} animation="fade-up" delay={index * 50}>
                <details className="group p-6 rounded-2xl bg-env-surface border border-env-border">
                  <summary className="flex items-center justify-between cursor-pointer list-none">
                    <div className="flex items-center gap-4">
                      <IconQuestion size={24} color="#FF8C42" />
                      <span className="font-semibold text-env-primary">{faq.question}</span>
                    </div>
                    <svg 
                      className="w-5 h-5 text-env-secondary transition-transform group-open:rotate-180" 
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="mt-4 pl-10">
                    <p className="text-env-secondary leading-relaxed">{faq.answer}</p>
                  </div>
                </details>
              </AnimatedSection>
            ))}
          </div>

        </div>
      </section>

      {/* ==================== OUR PROMISE ==================== */}
      <section className="section-padding bg-env-secondary">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-wider text-[#14B8B8] bg-[#14B8B8]/10 rounded-full border border-[#14B8B8]/20">
                Our Promise
              </span>

              <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-6">
                Africa can't be built by people who only know how to use apps.
              </h2>

              <p className="text-xl text-env-secondary leading-relaxed mb-8">
                We need young people who understand how technology works — and who have 
                the skills, ethics, and courage to build systems that serve their own communities.
              </p>

              <div 
                className="p-8 rounded-2xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(20, 184, 184, 0.1), rgba(168, 85, 247, 0.1))',
                  border: '1px solid rgba(20, 184, 184, 0.2)'
                }}
              >
                <p className="text-lg text-env-secondary mb-4">
                  Before Africa can scale technology,
                </p>
                <p className="text-2xl md:text-3xl text-[#14B8B8] font-bold mb-4">
                  we must first scale builders.
                </p>
                <p className="text-xl text-env-primary font-medium">
                  TechUp is where they begin.
                </p>
              </div>
            </div>
          </AnimatedSection>

        </div>
      </section>

      {/* ==================== CTA ==================== */}
      <CTASection
        headline="Ready to bring TechUp"
        highlightedText="to your school?"
        description="Whether you're a school leader, education official, or organization that believes in this vision — let's talk. We'll build the next generation together."
        primaryAction={{
          label: "Start a Conversation",
          href: "/contact",
        }}
        secondaryAction={{
          label: "Learn About Partnerships",
          href: "/join",
        }}
        backgroundImage="/images/cta/techup-cta.jpg"
        overlayOpacity={80}
      />

    </ChapterWrapper>
  );
}