// app/LaunchPadPageClient.tsx

"use client";

import Image from "next/image";
import Link from "next/link";
import { ChapterWrapper } from "../components/ChapterWrapper";
import AnimatedSection from "../components/AnimatedSection";
import { Countdown, CountdownBanner } from "../components/Countdown";
import { Badge } from "../components/Badge";
import { SponsorApplicationForm } from "../components/LaunchPadForms";
import LaunchPadHero from "../components/LaunchPadHero";
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
} from "../components/icons/ForgeIcons";
import {
  LAUNCHPAD_CONFIG,
  previousYearPrizes,
  previousEditionStats,
  programBenefits,
  testimonials,
  partners,
  sponsorBenefits,
  sponsorshipTiers,
  sponsorCategories,
} from "../lib/launchpadData";

// Registration config
const REGISTRATION_OPENS = "May 1, 2026";
const REGISTRATION_OPENS_DATE = new Date("2026-05-01");

// Custom Icons
const VideoIcon = ({ size = 24, color = "#FF8C42" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="23 7 16 12 23 17 23 7" />
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
  </svg>
);

const FormIcon = ({ size = 24, color = "#14B8B8" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const CalendarIcon = ({ size = 24, color = "#52B788" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const TrainingIcon = ({ size = 24, color = "#A855F7" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const DownloadIcon = ({ size = 24, color = "#14B8B8" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const FlagIcon = ({ size = 24, color = "#52B788" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
    <line x1="4" y1="22" x2="4" y2="15" />
  </svg>
);

// Prize structure for 2026 - Updated to reflect projected amounts
const prizes2026 = [
  {
    position: "1st Place",
    amount: "₦2,000,000",
    bonus: "+ Brand New Laptop + 6 Months Mentorship",
    icon: "🥇",
    gradient: "from-yellow-500/30 to-yellow-500/5",
    border: "border-yellow-500/60",
    glow: "#FFD54F",
    type: "Business Grant"
  },
  {
    position: "2nd Place",
    amount: "₦1,500,000",
    bonus: "+ Brand New Laptop + 6 Months Mentorship",
    icon: "🥈",
    gradient: "from-gray-400/30 to-gray-400/5",
    border: "border-gray-400/60",
    glow: "#94A3B8",
    type: "Business Grant"
  },
  {
    position: "3rd Place",
    amount: "₦1,000,000",
    bonus: "+ Brand New Laptop + 6 Months Mentorship",
    icon: "🥉",
    gradient: "from-orange-500/30 to-orange-500/5",
    border: "border-orange-500/60",
    glow: "#FF8C42",
    type: "Business Grant"
  },
];

// What you learn
const learningOutcomes = [
  { icon: IconIdea, label: "Turning African problems into opportunities", color: "#FF8C42" },
  { icon: IconLaunch, label: "Pitching ideas like a pro", color: "#14B8B8" },
  { icon: IconGrowth, label: "Planning and strategy", color: "#52B788" },
  { icon: IconCommunity, label: "Working in teams", color: "#FFD54F" },
  { icon: IconMentor, label: "Confidence and guts", color: "#A855F7" },
];

// Selection process steps
const selectionSteps = [
  {
    step: 1,
    title: "Fill the Application Form",
    description: "Complete the online application with your details and idea summary. Tell us about yourself and the problem you want to solve.",
    icon: FormIcon,
    color: "#14B8B8"
  },
  {
    step: 2,
    title: "Submit Your 2-Minute Video",
    description: "Send a 2-minute video to launchpad@forgeintellitech.com explaining your idea. You can appear on camera talking, OR create an animated/designed video that explains your idea without showing yourself.",
    icon: VideoIcon,
    color: "#FF8C42"
  },
  {
    step: 3,
    title: "Selection Announcement",
    description: "20 selected students will be contacted by the 1st of June. Check your email and phone — your life is about to change!",
    icon: CalendarIcon,
    color: "#52B788"
  },
  {
    step: 4,
    title: "Compulsory Training Program",
    description: "Selected students undergo 1-month intensive online training — 4 hours every Saturday. Learn to develop your idea, plan, strategize, pitch, and understand business development.",
    icon: TrainingIcon,
    color: "#A855F7"
  },
];

export default function LaunchPadPageClient() {
  const partners2025 = partners.filter(p => p.year === 2025);
  const registrationOpen = new Date() >= REGISTRATION_OPENS_DATE;
  
  return (
    <ChapterWrapper chapter="rise">
      
      {/* Countdown Banner */}
      <CountdownBanner
        targetDate={LAUNCHPAD_CONFIG.eventDate}
        eventName={LAUNCHPAD_CONFIG.eventName}
        ctaText={registrationOpen ? "Apply Now — It's FREE! 🚀" : "Registration Opens May 1"}
        ctaHref={registrationOpen ? "/launchpad/apply" : undefined}
        className="mt-16 md:mt-20"
      />
      
      {/* ==================== ANIMATED HERO ==================== */}
      <LaunchPadHero />

      {/* ==================== NATIONAL VISION STATEMENT ==================== */}
      <section className="section-padding bg-env-bg-primary">
        <div className="container-forge">
          <AnimatedSection animation="fade-up">
            <div className="max-w-4xl mx-auto">
              <div 
                className="p-8 md:p-10 rounded-3xl relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(82, 183, 136, 0.1), rgba(20, 184, 184, 0.1))',
                  border: '2px solid rgba(82, 183, 136, 0.3)'
                }}
              >
                {/* Nigerian Flag Colors Accent */}
                <div className="absolute top-0 left-0 right-0 h-1 flex">
                  <div className="flex-1 bg-[#008751]" />
                  <div className="flex-1 bg-white" />
                  <div className="flex-1 bg-[#008751]" />
                </div>
                
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <FlagIcon size={40} color="#008751" />
                  </div>
                  <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-[#008751] bg-[#008751]/10 rounded-full border border-[#008751]/20">
                    A National Initiative in the Making
                  </span>
                  
                  <h2 className="text-2xl md:text-3xl font-bold text-env-primary mb-4">
                    LaunchPad 2026: The Final Pilot Before We Go National
                  </h2>
                  
                  <p className="text-lg text-env-secondary leading-relaxed mb-6">
                    We've seen the need. We've tested the model. Now we're refining it to create a 
                    <strong className="text-env-primary"> blueprint that can work across all 36 states of Nigeria</strong>.
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="p-4 rounded-xl bg-env-surface border border-env-border">
                      <p className="text-2xl font-bold text-[#008751]">2025</p>
                      <p className="text-sm text-env-tertiary">First pilot — 2 schools</p>
                    </div>
                    <div className="p-4 rounded-xl bg-env-surface border border-env-border">
                      <p className="text-2xl font-bold text-[#FF8C42]">2026</p>
                      <p className="text-sm text-env-tertiary">Final pilot — 100+ schools</p>
                    </div>
                    <div className="p-4 rounded-xl bg-env-surface border border-env-border">
                      <p className="text-2xl font-bold text-[#14B8B8]">2027+</p>
                      <p className="text-sm text-env-tertiary">National rollout</p>
                    </div>
                  </div>
                  
                  <p className="text-env-primary font-medium">
                    This isn't just an event. It's the foundation for a 
                    <span className="text-[#008751]"> national youth entrepreneurship policy</span> — 
                    proving that Nigerian students can compete globally when given the right platform.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ==================== WHAT IS LAUNCHPAD ==================== */}
      <section className="section-padding bg-env-secondary">
        <div className="container-forge">
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Content */}
            <AnimatedSection animation="fade-up">
              <div>
                <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-[#FF8C42] bg-[#FF8C42]/10 rounded-full border border-[#FF8C42]/20">
                  What Is LaunchPad?
                </span>
                
                <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-6 leading-tight">
                  Your Gateway to
                  <br />
                  <span className="text-[#FF8C42]">Solving Africa's Problems</span>
                </h2>
                
                <div className="space-y-4 text-env-secondary text-lg leading-relaxed mb-8">
                  <p>
                    LaunchPad is an event that exposes students who just finished their SSS3 exam to a world 
                    where they can find <strong className="text-env-primary">practical solutions to African problems</strong>.
                  </p>
                  <p>
                    We give you access to <span className="text-[#52B788] font-semibold">real funding</span>, 
                    {' '}<span className="text-[#14B8B8] font-semibold">real mentorship</span>, and 
                    {' '}<span className="text-[#A855F7] font-semibold">real support</span> — not empty promises.
                  </p>
                  <p className="p-4 rounded-xl bg-[#52B788]/10 border border-[#52B788]/20">
                    <strong className="text-[#52B788]">💰 All prizes are BUSINESS GRANTS</strong> — not loans, not cash to spend. 
                    Money to help you build your business and solve real problems!
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
                  <span className="text-[#FF8C42]">You'll be a problem-solver. A builder. A founder.</span>
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
                
                {/* Stat cards */}
                <div 
                  className="absolute -bottom-6 -right-6 p-5 rounded-2xl shadow-xl"
                  style={{ 
                    backgroundColor: 'var(--env-surface)',
                    border: '1px solid var(--env-border)'
                  }}
                >
                  <p className="text-3xl font-bold text-[#FFD54F]">₦50M+</p>
                  <p className="text-env-tertiary text-sm">Projected Budget</p>
                </div>
                
                <div 
                  className="absolute -top-6 -left-6 p-4 rounded-2xl shadow-xl"
                  style={{ 
                    backgroundColor: 'var(--env-surface)',
                    border: '1px solid var(--env-border)'
                  }}
                >
                  <p className="text-2xl font-bold text-[#52B788]">0%</p>
                  <p className="text-env-tertiary text-xs">Equity Taken</p>
                </div>
              </div>
            </AnimatedSection>
            
          </div>
          
        </div>
      </section>

      {/* ==================== PARTNERSHIP & INVESTMENT ==================== */}
      <section id="sponsor" className="section-padding bg-env-secondary scroll-mt-20">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="max-w-5xl mx-auto text-center">

              {/* Core Message */}
              <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-[#A855F7] bg-[#A855F7]/10 rounded-full border border-[#A855F7]/20">
                Partnership & Investment
              </span>

              <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-4">
                Building Nigeria's Future Requires <span className="text-[#FFD54F]">Real Commitment</span>
              </h2>

              <p className="text-lg text-env-secondary max-w-3xl mx-auto mb-8">
                LaunchPad 2026 is not a campaign — it's an investment in long-term capability. 
                We're working with organizations that understand that building talent, systems, 
                and opportunity requires intentional partnership.
              </p>

              {/* Transparency */}
              <div 
                className="max-w-3xl mx-auto p-6 rounded-2xl mb-8"
                style={{
                  background: 'linear-gradient(135deg, rgba(20, 184, 184, 0.1), rgba(82, 183, 136, 0.1))',
                  border: '1px solid rgba(20, 184, 184, 0.3)'
                }}
              >
                <h4 className="text-lg font-bold text-env-primary mb-3">Transparency</h4>
                <p className="text-env-secondary">
                  The figures presented are projected targets based on the scope of LaunchPad 2026. 
                  Final execution will scale with the level of partnership secured.
                </p>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                {[
                  { value: "₦50M+", label: "Projected Budget", color: "#FF8C42" },
                  { value: "20", label: "Founders to Fund", color: "#14B8B8" },
                  { value: "100+", label: "Schools Engaged", color: "#52B788" },
                  { value: "6 Months", label: "Structured Mentorship", color: "#A855F7" },
                ].map((stat) => (
                  <div 
                    key={stat.label}
                    className="p-4 rounded-xl bg-env-surface border border-env-border"
                  >
                    <div className="text-2xl font-bold" style={{ color: stat.color }}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-env-tertiary">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Target Partners */}
              <p className="text-env-secondary max-w-3xl mx-auto mb-8">
                We are engaging forward-thinking organizations across finance, technology, 
                telecommunications, and public sector institutions — partners who understand 
                that investing in Nigerian talent is a strategic priority, not charity.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                <a
                  href="#sponsor-form"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#008751] hover:bg-[#006B40] text-white font-bold rounded-xl transition-all duration-300 hover:scale-[1.02]"
                >
                  Partner With Us
                  <IconArrowRight size={18} color="#FFFFFF" />
                </a>
                <a
                  href="/documents/launchpad-2026-budget.pdf"
                  download
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-env-surface hover:bg-env-surface-hover text-env-primary font-bold rounded-xl border border-env-border transition-all duration-300"
                >
                  <DownloadIcon size={18} color="currentColor" />
                  Download Proposal
                </a>
              </div>

            </div>
          </AnimatedSection>

          {/* Sponsor Form */}
          <AnimatedSection animation="fade-up" delay={200}>
            <div 
              id="sponsor-form"
              className="max-w-4xl mx-auto p-6 md:p-8 rounded-2xl bg-env-surface"
              style={{ border: '2px solid rgba(168, 85, 247, 0.3)' }}
            >
              <SponsorApplicationForm />
            </div>
          </AnimatedSection>

        </div>
      </section>
      

      {/* ==================== SELECTION PROCESS ==================== */}
      <section className="section-padding bg-env-bg-primary">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-[#14B8B8] bg-[#14B8B8]/10 rounded-full border border-[#14B8B8]/20">
                Selection Process
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-4">
                How We Choose the <span className="text-[#FF8C42]">Top 20</span>
              </h2>
              <p className="text-lg text-env-secondary max-w-2xl mx-auto">
                We're looking for students who are serious about their ideas and ready to put in the work.
              </p>
            </div>
          </AnimatedSection>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {selectionSteps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <AnimatedSection key={step.step} animation="fade-up" delay={index * 100}>
                    <div className="p-6 rounded-2xl bg-env-surface border border-env-border h-full">
                      <div className="flex items-start gap-4">
                        <div 
                          className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: step.color + '20' }}
                        >
                          <IconComponent size={28} color={step.color} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span 
                              className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                              style={{ backgroundColor: step.color }}
                            >
                              {step.step}
                            </span>
                            <h4 className="font-bold text-env-primary text-lg">{step.title}</h4>
                          </div>
                          <p className="text-env-secondary text-sm leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>

            {/* Video Submission Details */}
            <AnimatedSection animation="fade-up" delay={400}>
              <div 
                className="p-6 rounded-2xl mb-8"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 140, 66, 0.1), rgba(168, 85, 247, 0.1))',
                  border: '2px solid rgba(255, 140, 66, 0.3)'
                }}
              >
                <h4 className="text-xl font-bold text-env-primary mb-4 flex items-center gap-2">
                  <VideoIcon size={24} color="#FF8C42" />
                  About Your 2-Minute Video
                </h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-[#14B8B8] mb-2">Option 1: Talk to Camera</h5>
                    <p className="text-env-secondary text-sm">
                      Record yourself explaining your idea. Show your passion! We want to see YOUR energy and belief in your solution.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-[#A855F7] mb-2">Option 2: Animated/Designed Video</h5>
                    <p className="text-env-secondary text-sm">
                      Create an animated or designed video that explains your idea without showing yourself. 
                      Get creative! Use graphics, animations, or slides to tell your story.
                    </p>
                  </div>
                </div>
                <div className="mt-4 p-3 rounded-lg bg-env-surface">
                  <p className="text-sm text-env-primary">
                    <strong>📧 Send to:</strong>{' '}
                    <a href="mailto:launchpad@forgeintellitech.com" className="text-[#FF8C42] hover:underline">
                      launchpad@forgeintellitech.com
                    </a>
                  </p>
                </div>
              </div>
            </AnimatedSection>

            {/* Training Program Details */}
            <AnimatedSection animation="fade-up" delay={500}>
              <div 
                className="p-6 rounded-2xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(20, 184, 184, 0.1))',
                  border: '2px solid rgba(168, 85, 247, 0.3)'
                }}
              >
                <h4 className="text-xl font-bold text-env-primary mb-4 flex items-center gap-2">
                  <TrainingIcon size={24} color="#A855F7" />
                  The 1-Month Training Program
                </h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-[#52B788] text-xl">📅</span>
                    <p className="text-env-secondary">
                      <strong className="text-env-primary">Every Saturday, 4 hours</strong> — 
                      Intensive online training sessions covering everything you need to succeed.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#14B8B8] text-xl">📚</span>
                    <p className="text-env-secondary">
                      <strong className="text-env-primary">What you'll learn:</strong> Idea development, 
                      planning & strategy, pitching like a pro, and business development fundamentals.
                    </p>
                  </div>
                  <div 
                    className="flex items-start gap-3 p-4 rounded-lg"
                    style={{ backgroundColor: 'rgba(255, 140, 66, 0.1)' }}
                  >
                    
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
          
        </div>
      </section>

      {/* ==================== PRIZES 2026 ==================== */}
      <section className="section-padding bg-env-secondary">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-[#FFD54F] bg-[#FFD54F]/10 rounded-full border border-[#FFD54F]/20">
                Projected Business Grants & Prizes
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-env-primary mb-4">
                Target: <span className="text-[#FFD54F]">₦10,000,000+</span> in Grants! 🎉
              </h2>
              <p className="text-lg text-env-secondary max-w-3xl mx-auto mb-4">
                All prizes will be <strong className="text-[#52B788]">business grants</strong> — money to help you 
                build your solution, not cash to spend. Plus 6 months of mentorship for winners!
              </p>
              <p 
                className="text-sm px-4 py-2 rounded-full inline-block"
                style={{ 
                  backgroundColor: 'rgba(20, 184, 184, 0.1)',
                  color: '#14B8B8',
                  border: '1px solid rgba(20, 184, 184, 0.3)'
                }}
              >
                💡 Final amounts subject to sponsorship commitments — help us reach our targets!
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
                  <span className="inline-block px-3 py-1 text-xs font-bold text-[#52B788] bg-[#52B788]/10 rounded-full mb-3">
                    {prize.type}
                  </span>
                  <p className="text-sm text-env-secondary font-semibold">{prize.bonus}</p>
                  <p className="text-xs text-env-tertiary mt-2 italic">*Projected target</p>
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
                  + 6 Months Post-Event Mentorship
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


          {/* Eligibility */}
          <AnimatedSection animation="fade-up" delay={600}>
            <div className="mt-10 p-6 rounded-2xl bg-env-surface border border-env-border max-w-3xl mx-auto text-center">
              <h4 className="text-xl font-bold text-env-primary mb-6">Who Can Enter? 🤔</h4>
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                {[
                  { icon: "✅", label: "SSS3 Students (Just Finished Exams)" },
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
                Got an idea to solve an African problem?{' '}
                <span className="text-[#FF8C42]">You're exactly who we're looking for.</span>
              </p>
            </div>
          </AnimatedSection>
          
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
                More Than Just Business Grants
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

      {/* Call to Schools */}
      <AnimatedSection animation="fade-up" delay={400}>
        <div className="p-8 rounded-2xl bg-env-surface border border-env-border text-center max-w-3xl mx-auto">
          <span className="text-5xl mb-4 block">🏫</span>
          <h3 className="text-2xl font-bold text-env-primary mb-4">
            Calling ALL Lagos Secondary Schools!
          </h3>
          <p className="text-env-secondary text-lg mb-6">
            Public schools, private schools, everywhere in between — we want YOUR students! 
            Help your SSS3 class discover their entrepreneurial spirit and access real business grants.
          </p>
          {registrationOpen && (
            <Link
              href="/launchpad/apply"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF8C42] hover:bg-[#E85D04] text-[#1A1A1A] font-bold rounded-xl transition-all duration-300 hover:scale-[1.02]"
            >
              Tell Your Students to Apply
              <IconArrowRight size={18} color="#1A1A1A" />
            </Link>
          )}
        </div>
      </AnimatedSection>

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
                <span className="text-[#FF8C42]">National Impact</span>
              </h2>
              <p className="text-lg text-env-secondary max-w-2xl mx-auto">
                Last year we started with 20 schools invited, 11 students pitched and 2 winners emerged. 
                This year? We're creating the foundation for national impact.
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
                    <p className="text-3xl font-bold text-[#14B8B8]">20</p>
                    <p className="text-env-secondary text-sm">Schools invited</p>
                  </div>
                  <div className="p-4 rounded-xl bg-env-bg-primary">
                    <p className="text-3xl font-bold text-[#FF8C42]">11</p>
                    <p className="text-env-secondary text-sm">Students pitched</p>
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
                    <p className="text-3xl font-bold text-[#FF8C42]">20</p>
                    <p className="text-env-secondary text-sm">Selected Finalists</p>
                  </div>
                  <div className="p-4 rounded-xl bg-env-surface/50">
                    <p className="text-4xl font-bold text-[#FFD54F]">₦10M+</p>
                    <p className="text-env-secondary text-sm">Target Business Grants!</p>
                  </div>
                </div>
                <p className="mt-6 text-[#FF8C42] font-bold text-lg">Final Pilot Before National Rollout! 🔥</p>
              </div>
            </AnimatedSection>
            
          </div>

          {/* Aspirational Message */}
          <AnimatedSection animation="fade-up" delay={300}>
            <div className="text-center mb-12">
              <p className="text-2xl md:text-3xl font-bold text-env-primary mb-4">
                "Why shouldn't you get your share of the business grants?"
              </p>
              <p className="text-lg text-env-secondary max-w-2xl mx-auto">
                Public school, private school — it doesn't matter. If you've got ideas to solve African problems,{' '}
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
              { src: "/images/launchpad/celebration-winners.jpg", label: "Win Grants! 🏆" },
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

      {/* ==================== SPONSOR BENEFITS ==================== */}
      <section className="section-padding bg-env-secondary">
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
                Join us in building the foundation for a national youth entrepreneurship program.
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
              
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#sponsor"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#A855F7] hover:bg-[#9333EA] text-white font-bold rounded-xl transition-all duration-300 hover:scale-[1.02]"
                >
                  Become a Sponsor
                  <IconArrowRight size={18} color="#FFFFFF" />
                </a>
                <a
                  href="/documents/launchpad-2026-budget.pdf"
                  download
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-env-surface hover:bg-env-surface-hover text-env-primary font-bold rounded-xl border border-env-border transition-all duration-300"
                >
                  <DownloadIcon size={18} color="currentColor" />
                  Download Budget PDF
                </a>
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
              
              <span className="text-7xl block mb-6">🇳🇬</span>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-env-primary mb-6 leading-tight">
                Nigeria's future will be built by
                <br />
                <span 
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: 'linear-gradient(135deg, #008751, #FFFFFF, #008751)'
                  }}
                >
                  Nigerian problem-solvers.
                </span>
              </h2>
              
              <p className="text-xl text-env-secondary mb-8 max-w-2xl mx-auto">
                Whether you're a student with big ideas or an organization that believes in our youth —{' '}
                <strong className="text-env-primary">this is your moment to make history!</strong>
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
                    Mark your calendar! Start thinking about your ideas!
                  </p>
                </div>
              )}
              
              <div className="grid md:grid-cols-2 gap-4 max-w-xl mx-auto mb-8">
                <div className="p-4 rounded-xl bg-env-surface border border-env-border">
                  <p className="text-2xl font-bold text-[#FFD54F]">₦10,000,000+</p>
                  <p className="text-sm text-env-tertiary">Target Business Grants</p>
                </div>
                <div className="p-4 rounded-xl bg-env-surface border border-env-border">
                  <p className="text-2xl font-bold text-[#14B8B8]">₦50,000,000+</p>
                  <p className="text-sm text-env-tertiary">Projected Event Budget</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {registrationOpen ? (
                  <Link
                    href="/launchpad/apply"
                    className="px-10 py-5 bg-[#FF8C42] hover:bg-[#E85D04] text-[#1A1A1A] font-bold rounded-xl transition-all duration-300 hover:scale-[1.02] text-xl shadow-lg shadow-[#FF8C42]/25"
                  >
                    Apply Now (Students)
                  </Link>
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
                  className="px-10 py-5 bg-[#008751] hover:bg-[#006B40] text-white font-bold rounded-xl transition-all duration-300 hover:scale-[1.02] text-xl shadow-lg shadow-[#008751]/25"
                >
                  Partner With Nigeria's Future
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
            <Link
              href="/launchpad/apply"
              className="flex-1 py-3 bg-[#FF8C42] text-[#1A1A1A] font-bold rounded-lg text-center"
            >
              🚀 Apply Now
            </Link>
            <a
              href="#sponsor"
              className="flex-1 py-3 bg-[#008751] text-white font-bold rounded-lg text-center"
            >
              🇳🇬 Sponsor
            </a>
          </div>
        </div>
      )}
      
    </ChapterWrapper>
  );
}