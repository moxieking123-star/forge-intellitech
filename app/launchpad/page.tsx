// app/launchpad/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { ChapterWrapper } from "../../components/ChapterWrapper";
import AnimatedSection from "../../components/AnimatedSection";
import { Countdown, CountdownBanner } from "../../components/Countdown";
import { Badge } from "../../components/Badge";
import { StudentApplicationForm, SponsorApplicationForm } from "../../components/LaunchPadForms";
import LaunchPadHero from "../../components/LaunchPadHero";
import {
  IconLearn,
  IconLaunch,
  IconGrowth,
  IconCommunity,
  IconMentor,
  IconIdea,
  IconCheck,
  IconQuestion,
  IconArrowRight,
} from "../../components/icons/ForgeIcons";
import {
  LAUNCHPAD_CONFIG,
  previousYearPrizes,
  previousEditionStats,
  programBenefits,
  testimonials,
  applicationSteps,
  partners,
  sponsorBenefits,
  sponsorshipTiers,
  sponsorCategories,
} from "../../lib/launchpadData";

// Registration config
const REGISTRATION_OPENS = "May 1, 2026";
const REGISTRATION_OPENS_DATE = new Date("2026-05-01");

// Prize structure for 2026
const prizes2026 = [
  {
    position: "1st Place",
    amount: "₦2,000,000",
    bonus: "+ Brand New Laptop",
    icon: "🥇",
    gradient: "from-yellow-500/30 to-yellow-500/5",
    border: "border-yellow-500/60",
    glow: "#FFD54F",
  },
  {
    position: "2nd Place",
    amount: "₦1,500,000",
    bonus: "+ Brand New Laptop",
    icon: "🥈",
    gradient: "from-gray-400/30 to-gray-400/5",
    border: "border-gray-400/60",
    glow: "#94A3B8",
  },
  {
    position: "3rd Place",
    amount: "₦1,000,000",
    bonus: "+ Brand New Laptop",
    icon: "🥉",
    gradient: "from-orange-500/30 to-orange-500/5",
    border: "border-orange-500/60",
    glow: "#FF8C42",
  },
];

// What you learn
const learningOutcomes = [
  { icon: IconIdea, label: "Turning problems into opportunities", color: "#FF8C42" },
  { icon: IconLaunch, label: "Pitching ideas like a pro", color: "#14B8B8" },
  { icon: IconGrowth, label: "Planning and strategy", color: "#52B788" },
  { icon: IconCommunity, label: "Working in teams", color: "#FFD54F" },
  { icon: IconMentor, label: "Confidence and guts", color: "#A855F7" },
];

export default function LaunchPadPage() {
  const partners2025 = partners.filter(p => p.year === 2025);
  const registrationOpen = new Date() >= REGISTRATION_OPENS_DATE;
  
  return (
    <ChapterWrapper chapter="rise">
      
      {/* Countdown Banner */}
      <CountdownBanner
        targetDate={LAUNCHPAD_CONFIG.eventDate}
        eventName={LAUNCHPAD_CONFIG.eventName}
        ctaText={registrationOpen ? "Apply Now — It's FREE! 🚀" : "Registration Opens May 1"}
        ctaHref={registrationOpen ? "#apply" : undefined}
        className="mt-16 md:mt-20"
      />
      
      {/* ==================== ANIMATED HERO ==================== */}
      <LaunchPadHero />

      {/* ==================== GROWTH STORY ==================== */}
      <section className="section-padding bg-env-bg-primary">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-[#FF8C42] bg-[#FF8C42]/10 rounded-full border border-[#FF8C42]/20">
                Our Journey
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-env-primary mb-4">
                From Small Beginnings to{' '}
                <span className="text-[#FF8C42]">Massive Dreams</span>
              </h2>
              <p className="text-lg text-env-secondary max-w-2xl mx-auto">
                Last year we started with 2 schools and 11 students. 
                This year? We're going for something much bigger.
              </p>
            </div>
          </AnimatedSection>
          
          {/* Growth Comparison */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            
            {/* 2025 Card */}
            <AnimatedSection animation="fade-up" delay={100}>
              <div className="p-8 rounded-2xl bg-env-surface border border-env-border text-center h-full">
                <span className="text-5xl mb-4 block">🌱</span>
                <h3 className="text-2xl font-bold text-env-primary mb-6">LaunchPad 2025</h3>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-env-bg-primary">
                    <p className="text-3xl font-bold text-[#14B8B8]">2</p>
                    <p className="text-env-secondary text-sm">Schools</p>
                  </div>
                  <div className="p-4 rounded-xl bg-env-bg-primary">
                    <p className="text-3xl font-bold text-[#FF8C42]">11</p>
                    <p className="text-env-secondary text-sm">Students</p>
                  </div>
                  <div className="p-4 rounded-xl bg-env-bg-primary">
                    <p className="text-3xl font-bold text-[#52B788]">₦200,000</p>
                    <p className="text-env-secondary text-sm">Total Prizes</p>
                  </div>
                </div>
                <p className="mt-6 text-env-tertiary italic">Where we started...</p>
              </div>
            </AnimatedSection>
            
            {/* 2026 Card */}
            <AnimatedSection animation="fade-up" delay={200}>
              <div 
                className="p-8 rounded-2xl text-center h-full relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 140, 66, 0.15), rgba(168, 85, 247, 0.15))',
                  border: '2px solid rgba(255, 140, 66, 0.5)'
                }}
              >
                <div className="absolute top-3 right-3">
                  <Badge status="live" pulse>This Year!</Badge>
                </div>
                <span className="text-5xl mb-4 block">🚀</span>
                <h3 className="text-2xl font-bold text-env-primary mb-6">LaunchPad 2026</h3>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-env-surface/50">
                    <p className="text-3xl font-bold text-[#14B8B8]">100+</p>
                    <p className="text-env-secondary text-sm">Schools Invited</p>
                  </div>
                  <div className="p-4 rounded-xl bg-env-surface/50">
                    <p className="text-3xl font-bold text-[#FF8C42]">Thousands</p>
                    <p className="text-env-secondary text-sm">of Students</p>
                  </div>
                  <div className="p-4 rounded-xl bg-env-surface/50">
                    <p className="text-4xl font-bold text-[#FFD54F]">₦10,000,000+</p>
                    <p className="text-env-secondary text-sm">in Prizes!</p>
                  </div>
                </div>
                <p className="mt-6 text-[#FF8C42] font-bold text-lg">50x MORE prizes! 🔥</p>
              </div>
            </AnimatedSection>
            
          </div>

          {/* Aspirational Message */}
          <AnimatedSection animation="fade-up" delay={300}>
            <div className="text-center mb-12">
              <p className="text-2xl md:text-3xl font-bold text-env-primary mb-4">
                "Why shouldn't you get your share of the ₦10 million?"
              </p>
              <p className="text-lg text-env-secondary max-w-2xl mx-auto">
                Public school, private school — it doesn't matter. If you've got ideas and drive,{' '}
                <span className="text-[#FF8C42] font-semibold">LaunchPad is YOUR stage</span>.
              </p>
            </div>
          </AnimatedSection>
          
          {/* Image Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { src: "/images/launchpad/students-learning.jpg", label: "Learn 📚" },
              { src: "/images/launchpad/mentors-guiding.jpg", label: "Get Mentored 🧑‍🏫" },
              { src: "/images/launchpad/students-pitching.jpg", label: "Pitch 🎤" },
              { src: "/images/launchpad/celebration-winners.jpg", label: "Win! 🏆" },
            ].map((image, index) => (
              <AnimatedSection key={image.label} animation="scale-in" delay={index * 100}>
                <div className="relative group cursor-pointer">
                  <div className="aspect-square rounded-2xl overflow-hidden border border-env-border">
                    <Image
                      src={image.src}
                      alt={image.label}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  </div>
                  <div className="absolute bottom-4 left-0 right-0 text-center">
                    <span className="text-white font-bold text-lg drop-shadow-lg">{image.label}</span>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Call to Schools */}
          <AnimatedSection animation="fade-up" delay={400}>
            <div className="p-8 rounded-2xl bg-env-surface border border-env-border text-center max-w-3xl mx-auto">
              <span className="text-5xl mb-4 block">🏫</span>
              <h3 className="text-2xl font-bold text-env-primary mb-4">
                Calling ALL Lagos Secondary Schools!
              </h3>
              <p className="text-env-secondary text-lg mb-6">
                Public schools, private schools, everywhere in between — we want YOUR students! 
                Help your SSS3 class discover their entrepreneurial spirit.
              </p>
              {registrationOpen && (
                <a
                  href="#apply"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF8C42] hover:bg-[#E85D04] text-[#1A1A1A] font-bold rounded-xl transition-all duration-300 hover:scale-[1.02]"
                >
                  Tell Your Students to Apply
                  <IconArrowRight size={18} color="#1A1A1A" />
                </a>
              )}
            </div>
          </AnimatedSection>
          
        </div>
      </section>

      {/* ==================== PRIZES 2026 ==================== */}
      <section className="section-padding bg-env-secondary">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-[#FFD54F] bg-[#FFD54F]/10 rounded-full border border-[#FFD54F]/20">
                What You Can Win
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-env-primary mb-4">
                Over <span className="text-[#FFD54F]">₦10,000,000</span> Up For Grabs! 🎉
              </h2>
              <p className="text-lg text-env-secondary max-w-2xl mx-auto">
                The biggest prize pool in LaunchPad history! And here's the thing — 
                <strong className="text-env-primary"> everyone who makes it to the finals wins something</strong>.
              </p>
            </div>
          </AnimatedSection>
          
          {/* Main Prizes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
            {prizes2026.map((prize, index) => (
              <AnimatedSection key={prize.position} animation="scale-in" delay={index * 150}>
                <div 
                  className={`relative p-8 rounded-2xl bg-gradient-to-br ${prize.gradient} border-2 ${prize.border} text-center transition-all duration-300 hover:scale-[1.03]`}
                  style={{ boxShadow: `0 20px 40px ${prize.glow}15` }}
                >
                  {index === 0 && (
                    <div className="absolute top-0 left-0 right-0 bg-[#FFD54F] text-[#1A1A1A] text-xs font-bold py-1.5 rounded-t-xl text-center">
                      👑 GRAND PRIZE 👑
                    </div>
                  )}
                  <span className="text-6xl block mb-4 mt-4">{prize.icon}</span>
                  <h4 className="text-xl font-bold text-env-primary mb-2">{prize.position}</h4>
                  <p className="text-4xl font-black text-[#FF8C42] mb-2">{prize.amount}</p>
                  <p className="text-lg text-env-secondary font-semibold">{prize.bonus}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Additional Prizes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-10">
            
            {/* Other Finalists */}
            <AnimatedSection animation="fade-up" delay={300}>
              <div 
                className="p-6 rounded-2xl text-center transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: 'linear-gradient(135deg, rgba(20, 184, 184, 0.15), rgba(20, 184, 184, 0.05))',
                  border: '1px solid rgba(20, 184, 184, 0.3)'
                }}
              >
                <span className="text-5xl block mb-3">🎁</span>
                <h4 className="text-xl font-bold text-env-primary mb-3">All Other Finalists</h4>
                <p className="text-env-secondary text-lg mb-2">Brand New Laptop</p>
                <p className="text-env-secondary text-lg">
                  + <span className="text-[#14B8B8] font-bold">₦200,000</span> Business Grant
                </p>
                <p className="text-[#14B8B8] text-sm mt-3 font-medium">
                  (Not cash — to help you build your business!)
                </p>
              </div>
            </AnimatedSection>
            
            {/* Audience Giveaway */}
            <AnimatedSection animation="fade-up" delay={400}>
              <div 
                className="p-6 rounded-2xl text-center transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(168, 85, 247, 0.05))',
                  border: '1px solid rgba(168, 85, 247, 0.3)'
                }}
              >
                <span className="text-5xl block mb-3">🎉</span>
                <h4 className="text-xl font-bold text-env-primary mb-3">Audience Giveaway!</h4>
                <p className="text-env-secondary text-lg">
                  <span className="text-[#A855F7] font-bold">20 lucky students</span> in the audience will win:
                </p>
                <p className="text-env-primary text-lg font-bold mt-2">Gift Pack Worth ₦50,000</p>
                <p className="text-[#A855F7] text-sm mt-3 font-medium">
                  Come watch, you might win! 🎊
                </p>
              </div>
            </AnimatedSection>
            
          </div>

          {/* Total Value Highlight */}
          <AnimatedSection animation="fade-up" delay={500}>
            <div 
              className="p-8 rounded-2xl max-w-3xl mx-auto text-center"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 140, 66, 0.2), rgba(168, 85, 247, 0.2))',
                border: '2px solid rgba(255, 140, 66, 0.5)'
              }}
            >
              <h4 className="text-2xl font-bold text-env-primary mb-2">
                Total Prize Pool Value:
              </h4>
              <p className="text-5xl font-black text-[#FFD54F] mb-4">₦10,000,000+</p>
              <p className="text-env-secondary text-lg mb-4">
                That's laptops, cash prizes, business grants, and gift packs combined!
              </p>
              <p className="text-env-primary font-semibold text-lg">
                <span className="text-[#FF8C42]">Everyone wins something.</span> No one goes home empty-handed.
              </p>
            </div>
          </AnimatedSection>

          {/* Eligibility */}
          <AnimatedSection animation="fade-up" delay={600}>
            <div className="mt-10 p-6 rounded-2xl bg-env-surface border border-env-border max-w-3xl mx-auto text-center">
              <h4 className="text-xl font-bold text-env-primary mb-6">Who Can Enter? 🤔</h4>
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                {[
                  { icon: "✅", label: "All SSS3 Students" },
                  { icon: "📍", label: "Lagos State" },
                  { icon: "🏫", label: "Public & Private Schools" },
                  { icon: "🆓", label: "FREE Entry" },
                ].map((item) => (
                  <span 
                    key={item.label}
                    className="px-4 py-2 rounded-full text-sm font-medium"
                    style={{ 
                      backgroundColor: 'rgba(255, 140, 66, 0.1)',
                      color: 'var(--env-text-primary)'
                    }}
                  >
                    {item.icon} {item.label}
                  </span>
                ))}
              </div>
              {!registrationOpen && (
                <div 
                  className="p-4 rounded-xl mb-4"
                  style={{ 
                    backgroundColor: 'rgba(255, 140, 66, 0.1)',
                    border: '1px solid rgba(255, 140, 66, 0.2)'
                  }}
                >
                  <p className="text-[#FF8C42] font-bold">
                    📅 Registration Opens: {REGISTRATION_OPENS}
                  </p>
                </div>
              )}
              <p className="text-env-primary font-medium text-lg">
                Have an idea and the drive to make it real?{' '}
                <span className="text-[#FF8C42]">You're already qualified.</span>
              </p>
            </div>
          </AnimatedSection>
          
        </div>
      </section>

      {/* ==================== WHAT IS LAUNCHPAD ==================== */}
      <section className="section-padding bg-env-bg-primary">
        <div className="container-forge">
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Content */}
            <AnimatedSection animation="fade-up">
              <div>
                <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-[#FF8C42] bg-[#FF8C42]/10 rounded-full border border-[#FF8C42]/20">
                  What Is LaunchPad?
                </span>
                
                <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-6 leading-tight">
                  More Than a Competition —
                  <br />
                  <span className="text-[#FF8C42]">It's Your Launchpad</span>
                </h2>
                
                <div className="space-y-4 text-env-secondary text-lg leading-relaxed mb-8">
                  <p>
                    Sure, the prizes are amazing. But LaunchPad is really about{' '}
                    <strong className="text-env-primary">discovering what you're capable of</strong>.
                  </p>
                  <p>
                    We teach you the same skills that startup founders and CEOs use:
                  </p>
                </div>

                {/* Skills List */}
                <div className="space-y-3 mb-8">
                  {learningOutcomes.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div key={index} className="flex items-center gap-3">
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: item.color + '20' }}
                        >
                          <Icon size={22} color={item.color} />
                        </div>
                        <span className="text-env-primary font-medium">{item.label}</span>
                      </div>
                    );
                  })}
                </div>

                <p className="text-xl font-medium text-env-primary">
                  By the end, you won't just be a student anymore.{' '}
                  <span className="text-[#FF8C42]">You'll be a builder.</span>
                </p>
              </div>
            </AnimatedSection>
            
            {/* Image */}
            <AnimatedSection animation="fade-up" delay={200}>
              <div className="relative">
                <div className="aspect-video rounded-2xl overflow-hidden border-2 border-env-border">
                  <Image
                    src="/images/launchpad/event-2025.jpg"
                    alt="Students at LaunchPad 2025"
                    fill
                    className="object-cover"
                  />
                </div>
                <div 
                  className="absolute -inset-4 rounded-3xl -z-10"
                  style={{ 
                    background: 'radial-gradient(circle, rgba(255, 140, 66, 0.15) 0%, transparent 70%)'
                  }}
                />
                
                {/* Stat card */}
                <div 
                  className="absolute -bottom-6 -right-6 p-5 rounded-2xl shadow-xl"
                  style={{ 
                    backgroundColor: 'var(--env-surface)',
                    border: '1px solid var(--env-border)'
                  }}
                >
                  <p className="text-4xl font-bold text-[#FF8C42]">100%</p>
                  <p className="text-env-tertiary text-sm">
                    of participants say<br/>it changed them!
                  </p>
                </div>
              </div>
            </AnimatedSection>
            
          </div>
          
        </div>
      </section>

      {/* ==================== 2025 STORY ==================== */}
      <section className="section-padding bg-env-secondary">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-[#14B8B8] bg-[#14B8B8]/10 rounded-full border border-[#14B8B8]/20">
                How It Started
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-4">
                LaunchPad 2025 — Our First Launch
              </h2>
              <p className="text-lg text-env-secondary max-w-2xl mx-auto">
                It was small. But the impact? Massive.
              </p>
            </div>
          </AnimatedSection>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {previousEditionStats.map((stat, index) => (
              <AnimatedSection key={stat.label} animation="scale-in" delay={index * 100}>
                <div className="text-center p-6 rounded-2xl bg-env-surface border border-env-border">
                  <div className="text-4xl md:text-5xl font-black text-[#FF8C42] mb-2">
                    {stat.value}
                  </div>
                  <div className="text-env-tertiary text-sm">{stat.label}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* 2025 Winners */}
          <AnimatedSection animation="fade-up" delay={200}>
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-env-primary">2025 Winners 🏆</h3>
            </div>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12">
            {previousYearPrizes.map((prize, index) => (
              <AnimatedSection key={prize.position} animation="scale-in" delay={index * 150}>
                <div className={`p-6 rounded-2xl bg-gradient-to-br ${prize.color} border ${prize.borderColor} text-center transition-all duration-300 hover:scale-[1.02]`}>
                  <span className="text-5xl block mb-3">{prize.icon}</span>
                  <h4 className="text-xl font-bold text-env-primary mb-1">{prize.position}</h4>
                  <p className="text-2xl font-bold text-[#FF8C42]">{prize.amount}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* 2025 Partners */}
          <AnimatedSection animation="fade-up" delay={300}>
            <div className="mt-12">
              <h3 className="text-xl font-bold text-env-primary text-center mb-8">
                2025 Partners & Supporters 🤝
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {partners2025.map((partner, index) => (
                  <div 
                    key={`partner-${index}`} 
                    className="p-6 rounded-2xl bg-env-surface border border-env-border text-center transition-all duration-300 hover:border-[#FF8C42]/30"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#FF8C42]/10 flex items-center justify-center">
                      <IconCommunity size={32} color="#FF8C42" />
                    </div>
                    <h4 className="font-bold text-env-primary mb-1">{partner.name}</h4>
                    <p className="text-[#FF8C42] text-sm mb-2">{partner.role}</p>
                    <p className="text-env-tertiary text-sm">{partner.contribution}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
          
        </div>
      </section>

      {/* ==================== TESTIMONIALS ==================== */}
      <section className="section-padding bg-env-bg-primary">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-[#FF8C42] bg-[#FF8C42]/10 rounded-full border border-[#FF8C42]/20">
                Real Stories
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-4">
                Don't Just Take Our Word For It
              </h2>
              <p className="text-env-secondary max-w-2xl mx-auto text-lg">
                Here's what 2025 participants have to say:
              </p>
            </div>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <AnimatedSection key={index} animation="fade-up" delay={index * 100}>
                <div className="h-full p-6 md:p-8 rounded-2xl bg-env-surface border border-env-border relative">
                  <div className="text-6xl text-[#FF8C42]/20 absolute top-4 left-6">"</div>
                  <p className="text-env-primary leading-relaxed mb-6 italic pt-8 text-lg">
                    {testimonial.quote}
                  </p>
                  <div className="flex items-center gap-3 border-t border-env-border pt-4">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                      style={{
                        background: 'linear-gradient(135deg, #FF8C42, #A855F7)'
                      }}
                    >
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-env-primary">{testimonial.name}</h4>
                      <p className="text-env-tertiary text-xs">{testimonial.school}</p>
                      {testimonial.placement && (
                        <p className="text-[#FF8C42] text-xs font-bold">{testimonial.placement} 🏆</p>
                      )}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
          
        </div>
      </section>

      {/* ==================== BENEFITS ==================== */}
      <section className="section-padding bg-env-secondary">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-[#52B788] bg-[#52B788]/10 rounded-full border border-[#52B788]/20">
                What You Get
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-4">
                More Than Just Prizes
              </h2>
              <p className="text-env-secondary max-w-2xl mx-auto text-lg">
                Every participant walks away with skills that last a lifetime:
              </p>
            </div>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programBenefits.map((benefit, index) => (
              <AnimatedSection key={benefit.title} animation="fade-up" delay={index * 75}>
                <div className="h-full p-6 rounded-2xl bg-env-surface border border-env-border hover:border-[#FF8C42]/30 transition-all duration-300 group">
                  <span className="text-5xl mb-4 block group-hover:scale-110 transition-transform">{benefit.icon}</span>
                  <h3 className="text-xl font-bold text-env-primary mb-2">{benefit.title}</h3>
                  <p className="text-env-secondary leading-relaxed">{benefit.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
          
        </div>
      </section>

      {/* ==================== HOW TO APPLY ==================== */}
      <section className="section-padding bg-env-bg-primary">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-[#14B8B8] bg-[#14B8B8]/10 rounded-full border border-[#14B8B8]/20">
                How It Works
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-4">
                4 Simple Steps
              </h2>
              <p className="text-env-secondary max-w-2xl mx-auto text-lg">
                Getting started is easy. Here's how:
              </p>
            </div>
          </AnimatedSection>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {applicationSteps.map((step, index) => (
                <AnimatedSection key={step.step} animation="fade-up" delay={index * 100}>
                  <div className="p-6 rounded-2xl bg-env-surface border border-env-border h-full">
                    <div className="flex items-start gap-4">
                      <div 
                        className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-xl"
                        style={{
                          background: 'linear-gradient(135deg, #FF8C42, #A855F7)'
                        }}
                      >
                        {step.step}
                      </div>
                      <div>
                        <h4 className="font-bold text-env-primary mb-2 text-lg">{step.title}</h4>
                        <p className="text-env-secondary">{step.description}</p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
          
        </div>
      </section>

      {/* ==================== APPLICATION FORM ==================== */}
      <section id="apply" className="section-padding bg-env-secondary scroll-mt-20">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <span className="text-6xl block mb-4">🚀</span>
                <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-[#FF8C42] bg-[#FF8C42]/10 rounded-full border border-[#FF8C42]/20">
                  Student Application
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-4">
                  {registrationOpen ? "Ready to Launch?" : "Get Ready to Apply"}
                </h2>
                
                {!registrationOpen ? (
                  <div 
                    className="mb-8 p-8 rounded-2xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 140, 66, 0.2), rgba(168, 85, 247, 0.2))',
                      border: '2px solid rgba(255, 140, 66, 0.5)'
                    }}
                  >
                    <p className="text-2xl font-bold text-env-primary mb-3">
                      📅 Registration Opens: <span className="text-[#FF8C42]">{REGISTRATION_OPENS}</span>
                    </p>
                    <p className="text-lg text-env-secondary mb-4">
                      Applications aren't open yet, but you can prepare!
                    </p>
                    <p className="text-env-primary font-medium">
                      Start thinking about your business idea now. When May 1 comes, you'll be ready to go! 🔥
                    </p>
                  </div>
                ) : (
                  <>
                    <p className="text-env-secondary max-w-2xl mx-auto text-lg mb-4">
                      Your journey starts here. Fill out the form below and take your first step toward becoming an entrepreneur!
                    </p>
                    <div className="space-y-2 mb-6">
                      <p className="text-[#FF8C42] font-bold text-xl">🆓 Entry is 100% FREE</p>
                      <p className="text-env-primary font-medium">Open to ALL Lagos SSS3 students!</p>
                      {LAUNCHPAD_CONFIG.applicationDeadline && (
                        <p className="text-env-tertiary">
                          ⏰ Deadline:{' '}
                          <span className="text-[#FF8C42] font-bold">
                            {new Date(LAUNCHPAD_CONFIG.applicationDeadline).toLocaleDateString('en-NG', { 
                              day: 'numeric', month: 'long', year: 'numeric' 
                            })}
                          </span>
                        </p>
                      )}
                    </div>
                  </>
                )}
              </div>
              
              {registrationOpen && (
                <div 
                  className="p-6 md:p-8 rounded-2xl bg-env-surface"
                  style={{ border: '2px solid rgba(255, 140, 66, 0.3)' }}
                >
                  <StudentApplicationForm />
                </div>
              )}
            </div>
          </AnimatedSection>
          
        </div>
      </section>

      {/* ==================== SPONSOR BENEFITS ==================== */}
      <section className="section-padding bg-env-bg-primary">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-[#A855F7] bg-[#A855F7]/10 rounded-full border border-[#A855F7]/20">
                For Partners & Sponsors
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-4">
                Why Partner With LaunchPad?
              </h2>
              <p className="text-env-secondary max-w-2xl mx-auto text-lg">
                Join us in shaping Nigeria's next generation of entrepreneurs.
              </p>
            </div>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {sponsorBenefits.map((benefit, index) => (
              <AnimatedSection key={benefit.title} animation="fade-up" delay={index * 75}>
                <div 
                  className="h-full p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(168, 85, 247, 0.02))',
                    border: '1px solid rgba(168, 85, 247, 0.2)'
                  }}
                >
                  <span className="text-4xl mb-4 block">{benefit.icon}</span>
                  <h3 className="font-bold text-env-primary mb-2 text-lg">{benefit.title}</h3>
                  <p className="text-env-secondary">{benefit.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Who Should Sponsor */}
          <AnimatedSection animation="fade-up" delay={200}>
            <div className="max-w-4xl mx-auto p-8 rounded-2xl bg-env-surface border border-env-border">
              <h3 className="text-2xl font-bold text-env-primary mb-6 text-center">
                Who Should Partner With Us? 🤝
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sponsorCategories.map((category) => (
                  <div 
                    key={category.category} 
                    className="p-5 rounded-xl"
                    style={{
                      background: 'rgba(168, 85, 247, 0.05)',
                      border: '1px solid rgba(168, 85, 247, 0.15)'
                    }}
                  >
                    <h4 className="font-bold text-[#A855F7] mb-3 text-lg">{category.category}</h4>
                    <ul className="space-y-2">
                      {category.examples.map((example) => (
                        <li key={example} className="flex items-center text-env-secondary">
                          <span className="text-[#A855F7] mr-2">→</span>
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
          
        </div>
      </section>

      {/* ==================== SPONSOR FORM ==================== */}
      <section id="sponsor" className="section-padding bg-env-secondary scroll-mt-20">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <span className="text-6xl block mb-4">💼</span>
                <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-[#A855F7] bg-[#A855F7]/10 rounded-full border border-[#A855F7]/20">
                  Become a Sponsor
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-4">
                  Invest in Nigeria's Future
                </h2>
                <p className="text-env-secondary max-w-2xl mx-auto text-lg">
                  Your support can change lives. Partner with us to launch the next generation!
                </p>
              </div>
              
              <div 
                className="p-6 md:p-8 rounded-2xl bg-env-surface"
                style={{ border: '2px solid rgba(168, 85, 247, 0.3)' }}
              >
                <SponsorApplicationForm />
              </div>
            </div>
          </AnimatedSection>
          
        </div>
      </section>

      {/* ==================== FINAL CTA ==================== */}
      <section 
        className="section-padding"
        style={{
          background: 'linear-gradient(180deg, var(--env-bg-primary) 0%, rgba(255, 140, 66, 0.05) 50%, var(--env-bg-primary) 100%)'
        }}
      >
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="max-w-4xl mx-auto text-center">
              
              <span className="text-7xl block mb-6">🌟</span>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-env-primary mb-6 leading-tight">
                The future belongs to those who
                <br />
                <span 
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: 'linear-gradient(135deg, #FF8C42, #FFD54F, #A855F7)'
                  }}
                >
                  start building it today.
                </span>
              </h2>
              
              <p className="text-xl text-env-secondary mb-8 max-w-2xl mx-auto">
                Whether you're a student with big dreams or an organization that believes in youth —{' '}
                <strong className="text-env-primary">your moment is now!</strong>
              </p>
              
              {!registrationOpen && (
                <div 
                  className="mb-8 p-6 rounded-2xl max-w-2xl mx-auto"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 140, 66, 0.2), rgba(168, 85, 247, 0.2))',
                    border: '2px solid rgba(255, 140, 66, 0.5)'
                  }}
                >
                  <p className="text-2xl font-bold text-env-primary mb-2">
                    📅 Registration Opens: <span className="text-[#FF8C42]">{REGISTRATION_OPENS}</span>
                  </p>
                  <p className="text-env-secondary">
                    Mark your calendar! Get your ideas ready!
                  </p>
                </div>
              )}
              
              <p className="text-2xl text-[#FF8C42] font-bold mb-8">
                LaunchPad {LAUNCHPAD_CONFIG.currentYear}: ₦10,000,000+ in Prizes! 🚀
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {registrationOpen ? (
                  <a
                    href="#apply"
                    className="px-10 py-5 bg-[#FF8C42] hover:bg-[#E85D04] text-[#1A1A1A] font-bold rounded-xl transition-all duration-300 hover:scale-[1.02] text-xl shadow-lg shadow-[#FF8C42]/25"
                  >
                    Apply Now (Students)
                  </a>
                ) : (
                  <div 
                    className="px-10 py-5 font-bold rounded-xl text-xl"
                    style={{
                      backgroundColor: 'var(--env-surface)',
                      color: 'var(--env-text-primary)',
                      border: '2px solid rgba(255, 140, 66, 0.3)'
                    }}
                  >
                    Applications Open May 1
                  </div>
                )}
                <a
                  href="#sponsor"
                  className="px-10 py-5 bg-[#A855F7] hover:bg-[#9333EA] text-white font-bold rounded-xl transition-all duration-300 hover:scale-[1.02] text-xl shadow-lg shadow-[#A855F7]/25"
                >
                  Become a Sponsor
                </a>
              </div>
              
              <p className="mt-8 text-env-tertiary">
                Questions? Email us at{' '}
                <a href="mailto:launchpad@forgeintellitech.com" className="text-[#FF8C42] hover:underline">
                  launchpad@forgeintellitech.com
                </a>
              </p>
              
            </div>
          </AnimatedSection>
          
        </div>
      </section>

      {/* Mobile CTA Bar */}
      {registrationOpen && (
        <div 
          className="fixed bottom-0 left-0 right-0 p-4 backdrop-blur-sm border-t md:hidden z-40"
          style={{ 
            backgroundColor: 'rgba(var(--env-bg-primary-rgb), 0.95)',
            borderColor: 'var(--env-border)'
          }}
        >
          <div className="flex gap-3">
            <a
              href="#apply"
              className="flex-1 py-3 bg-[#FF8C42] text-[#1A1A1A] font-bold rounded-lg text-center"
            >
              🚀 Apply Now
            </a>
            <a
              href="#sponsor"
              className="flex-1 py-3 bg-[#A855F7] text-white font-bold rounded-lg text-center"
            >
              💼 Sponsor
            </a>
          </div>
        </div>
      )}
      
    </ChapterWrapper>
  );
}