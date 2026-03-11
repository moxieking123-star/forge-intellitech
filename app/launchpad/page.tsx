import Image from "next/image";
import Link from "next/link";
import { ChapterWrapper } from "../../components/ChapterWrapper";
import { AnimatedSection } from "../../components/AnimatedSection";
import { Countdown, CountdownBanner } from "../../components/Countdown";
import { Badge } from "../../components/Badge";
import { StudentApplicationForm, SponsorApplicationForm } from "../../components/LaunchPadForms";
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

// Metadata for SEO
export const metadata = {
  title: "LaunchPad 2026 - Youth Entrepreneurship Competition | ₦10M+ in Prizes",
  description: `Forge LaunchPad ${LAUNCHPAD_CONFIG.currentYear} empowers Nigerian secondary school students with real business skills, mentorship, and over ₦10 Million in prizes. Free entry for all Lagos SSS3 students!`,
};

// Updated prize structure for 2026
const prizes2026 = [
  {
    position: "1st Place",
    amount: "₦2,000,000",
    bonus: "+ Brand New Laptop",
    icon: "🥇",
    color: "from-yellow-500/20 to-yellow-500/5",
    borderColor: "border-yellow-500/50",
  },
  {
    position: "2nd Place",
    amount: "₦1,500,000",
    bonus: "+ Brand New Laptop",
    icon: "🥈",
    color: "from-gray-400/20 to-gray-400/5",
    borderColor: "border-gray-400/50",
  },
  {
    position: "3rd Place",
    amount: "₦1,000,000",
    bonus: "+ Brand New Laptop",
    icon: "🥉",
    color: "from-orange-500/20 to-orange-500/5",
    borderColor: "border-orange-500/50",
  },
];

const additionalPrizes2026 = {
  otherContestants: {
    count: "All Other Finalists",
    laptop: "Brand New Laptop",
    grant: "₦200,000 Business Grant",
  },
  audienceGiveaway: {
    count: "20",
    prize: "Gift Pack Worth ₦50,000",
  },
};

// Registration date
const REGISTRATION_OPENS = "May 1, 2026";
const REGISTRATION_OPENS_DATE = new Date("2026-05-01");

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
      
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative section-padding flex items-center min-h-[90vh] overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/launchpad/hero-launchpad.jpg"
            alt=""
            fill
            className="object-cover opacity-30"
            priority
            quality={85}
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-br from-chapter-accent/20 via-env-bg-primary/90 to-purple-900/20" />
        </div>

        {/* Animated glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-chapter-accent/10 rounded-full blur-3xl animate-subtle-pulse pointer-events-none z-0" />
        
        <div className="container-forge relative z-10">
          <AnimatedSection animation="fade-up">
            <div className="max-w-4xl mx-auto text-center">
              
              <div className="flex items-center justify-center space-x-3 mb-6">
                <span className="text-6xl animate-float">🚀</span>
                {registrationOpen ? (
                  <Badge status="live" pulse>Applications Open!</Badge>
                ) : (
                  <Badge status="development">Opens May 1</Badge>
                )}
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-env-primary mb-4 leading-tight">
                Forge LaunchPad <span className="text-chapter-accent">{LAUNCHPAD_CONFIG.currentYear}</span>
              </h1>
              
              <p className="text-2xl md:text-3xl text-chapter-accent font-bold mb-6">
                🎯 ₦10,000,000+ in Prizes! 🎯
              </p>
              
              <p className="text-xl md:text-2xl text-env-secondary leading-relaxed mb-6 max-w-3xl mx-auto">
                Nigeria's biggest youth entrepreneurship competition is back — bigger, better, and ready to change your life.
              </p>
              
              {/* Registration Notice */}
              {!registrationOpen && (
                <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-chapter-accent/20 to-purple-500/20 border-2 border-chapter-accent/50 max-w-2xl mx-auto">
                  <p className="text-lg font-bold text-env-primary mb-2">
                    📅 Registration Opens: <span className="text-chapter-accent">{REGISTRATION_OPENS}</span>
                  </p>
                  <p className="text-env-secondary">
                    Get ready! Applications open soon. Prepare your ideas now!
                  </p>
                </div>
              )}
              
              <p className="text-lg text-env-tertiary mb-8 max-w-2xl mx-auto">
                💡 Learn real business skills • 🎤 Pitch your ideas • 💰 Win big • 💻 Everyone gets prizes!
              </p>
              
              {/* Countdown */}
              <div className="mb-10">
                <Countdown 
                  targetDate={LAUNCHPAD_CONFIG.eventDate}
                  eventName={LAUNCHPAD_CONFIG.eventName}
                />
              </div>
              
              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {registrationOpen ? (
                  <a
                    href="#apply"
                    className="px-10 py-5 bg-chapter-accent hover:bg-chapter-accent-hover text-white font-bold rounded-xl transition-smooth glow text-xl hover-lift"
                  >
                    Apply Now — It's FREE!
                  </a>
                ) : (
                  <div className="px-10 py-5 bg-env-surface text-env-primary font-bold rounded-xl border-2 border-chapter-accent/30 text-xl">
                    Applications Open May 1
                  </div>
                )}
                <a
                  href="#sponsor"
                  className="px-10 py-5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl border border-purple-400/30 transition-smooth text-xl hover-lift"
                >
                  Become a Sponsor
                </a>
              </div>
              
              <p className="mt-6 text-env-tertiary text-sm">
                Open to ALL Lagos SSS3 students — Public & Private Schools! 🎓
              </p>
              
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ==================== KEY INFO ==================== */}
      <section className="py-8 -mt-16 relative z-20">
        <div className="container-forge">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: "📅", label: "Event Date", value: "28th August 2026" },
              { icon: "🏆", label: "Total Prizes", value: "₦10,000,000+" },
              { icon: "🎓", label: "Who Can Apply", value: "All SSS3 Students" },
              { icon: "🆓", label: "Entry Fee", value: "100% FREE" },
            ].map((item, index) => (
              <AnimatedSection key={item.label} animation="fade-up" delay={index * 100}>
                <div className="px-6 py-5 bg-env-surface rounded-xl border border-env-border text-center hover-lift transition-smooth hover:border-chapter-accent/50">
                  <span className="text-3xl block mb-2">{item.icon}</span>
                  <span className="text-env-tertiary text-xs block uppercase tracking-wider">{item.label}</span>
                  <span className="text-env-primary font-bold text-lg">{item.value}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== GROWTH STORY ==================== */}
      <section className="section-padding bg-gradient-to-b from-env-bg-primary to-env-secondary">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-chapter-accent bg-chapter-accent-soft rounded-full border border-chapter-accent/20">
                How We're Growing
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-6">
                From Small Beginnings to <span className="text-chapter-accent">Massive Dreams</span>
              </h2>
            </div>
          </AnimatedSection>
          
          {/* Growth Comparison */}
          <AnimatedSection animation="fade-up" delay={100}>
            <div className="max-w-4xl mx-auto mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* 2025 */}
                <div className="p-6 rounded-2xl bg-env-surface border border-env-border text-center">
                  <span className="text-4xl mb-4 block">🌱</span>
                  <h3 className="text-xl font-bold text-env-primary mb-4">LaunchPad 2025</h3>
                  <div className="space-y-2 text-env-secondary">
                    <p><span className="text-chapter-accent font-bold">2</span> Schools</p>
                    <p><span className="text-chapter-accent font-bold">11</span> Students</p>
                    <p><span className="text-chapter-accent font-bold">₦200,000</span> Total Prizes</p>
                  </div>
                  <p className="mt-4 text-env-tertiary text-sm italic">Where we started...</p>
                </div>
                
                {/* 2026 */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-chapter-accent/20 to-purple-500/20 border-2 border-chapter-accent/50 text-center relative overflow-hidden">
                  <div className="absolute top-2 right-2">
                    <Badge status="live" pulse>This Year!</Badge>
                  </div>
                  <span className="text-4xl mb-4 block">🚀</span>
                  <h3 className="text-xl font-bold text-env-primary mb-4">LaunchPad 2026</h3>
                  <div className="space-y-2 text-env-secondary">
                    <p><span className="text-chapter-accent font-bold">100+</span> Schools Invited</p>
                    <p><span className="text-chapter-accent font-bold">Thousands</span> of Students</p>
                    <p><span className="text-chapter-accent font-bold text-2xl">₦10,000,000+</span> in Prizes!</p>
                  </div>
                  <p className="mt-4 text-chapter-accent font-medium">50x MORE prizes! 🔥</p>
                </div>
                
              </div>
            </div>
          </AnimatedSection>
          
          {/* Aspirational Message */}
          <AnimatedSection animation="fade-up" delay={200}>
            <div className="text-center mb-12">
              <p className="text-2xl md:text-3xl font-bold text-env-primary mb-4">
                "Why shouldn't you get your share of the ₦10 million?"
              </p>
              <p className="text-lg text-env-secondary max-w-2xl mx-auto">
                Whether you're from a public school or private school, if you've got ideas and drive — 
                <span className="text-chapter-accent font-semibold"> LaunchPad is YOUR stage</span>. 
                Apply when registration opens and show us what you've got!
              </p>
            </div>
          </AnimatedSection>
          
          {/* 4 Image Frames */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { src: "/images/launchpad/students-learning.jpg", alt: "Students learning business skills", label: "Learn 📚" },
              { src: "/images/launchpad/mentors-guiding.jpg", alt: "Mentors guiding young entrepreneurs", label: "Get Mentored 🧑‍🏫" },
              { src: "/images/launchpad/students-pitching.jpg", alt: "Students pitching ideas", label: "Pitch 🎤" },
              { src: "/images/launchpad/celebration-winners.jpg", alt: "Winners celebrating", label: "Win! 🏆" },
            ].map((image, index) => (
              <AnimatedSection key={image.label} animation="scale" delay={index * 100}>
                <div className="relative group">
                  <div className="aspect-square rounded-2xl overflow-hidden border border-env-border">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  </div>
                  <div className="absolute bottom-3 left-0 right-0 text-center">
                    <span className="text-white font-bold text-lg drop-shadow-lg">{image.label}</span>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
          
          {/* Call to Schools */}
          <AnimatedSection animation="fade-up" delay={400}>
            <div className="mt-12 p-6 md:p-8 rounded-2xl bg-env-surface border border-env-border text-center max-w-3xl mx-auto">
              <span className="text-4xl mb-4 block">🏫</span>
              <h3 className="text-xl font-bold text-env-primary mb-4">
                Calling ALL Lagos Secondary Schools!
              </h3>
              <p className="text-env-secondary mb-6">
                Public schools, private schools, everywhere in between — we want YOUR students! 
                Help your SSS3 class discover their entrepreneurial spirit.
              </p>
              {registrationOpen && (
                <a
                  href="#apply"
                  className="inline-flex items-center px-6 py-3 bg-chapter-accent hover:bg-chapter-accent-hover text-white font-semibold rounded-lg transition-smooth hover-lift"
                >
                  Tell Your Students to Apply
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              )}
            </div>
          </AnimatedSection>
          
        </div>
      </section>

      {/* ==================== 2026 PRIZES ==================== */}
      <section className="section-padding bg-env-secondary">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-chapter-accent bg-chapter-accent-soft rounded-full border border-chapter-accent/20">
                What You Can Win
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-4">
                Over <span className="text-chapter-accent">₦10,000,000</span> Up For Grabs! 🎉
              </h2>
              <p className="text-env-secondary max-w-2xl mx-auto text-lg">
                The biggest prize pool in LaunchPad history! And <strong className="text-env-primary">everyone</strong> who makes it to the finals wins something.
              </p>
            </div>
          </AnimatedSection>
          
          {/* Main Prizes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
            {prizes2026.map((prize, index) => (
              <AnimatedSection key={prize.position} animation="scale" delay={index * 150}>
                <div className={`p-8 rounded-2xl bg-gradient-to-br ${prize.color} border-2 ${prize.borderColor} text-center hover-lift transition-smooth relative overflow-hidden`}>
                  {index === 0 && (
                    <div className="absolute top-0 left-0 right-0 bg-yellow-500 text-black text-xs font-bold py-1 text-center">
                      👑 GRAND PRIZE 👑
                    </div>
                  )}
                  <span className="text-6xl block mb-4 mt-4">{prize.icon}</span>
                  <h4 className="text-xl font-bold text-env-primary mb-2">{prize.position}</h4>
                  <p className="text-3xl font-black text-chapter-accent mb-2">{prize.amount}</p>
                  <p className="text-lg text-env-secondary font-semibold">{prize.bonus}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Additional Prizes */}
          <AnimatedSection animation="fade-up" delay={300}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-8">
              {/* Other Finalists */}
              <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/30 text-center hover-lift transition-smooth">
                <span className="text-5xl block mb-3">🎁</span>
                <h4 className="text-xl font-bold text-env-primary mb-2">{additionalPrizes2026.otherContestants.count}</h4>
                <p className="text-env-secondary text-lg mb-1">
                  {additionalPrizes2026.otherContestants.laptop}
                </p>
                <p className="text-env-secondary text-lg">
                  + <span className="text-blue-400 font-bold">{additionalPrizes2026.otherContestants.grant}</span> Business Grant
                </p>
                <p className="text-blue-400 font-medium mt-2 text-sm">(Not cash — to help you build your business!)</p>
              </div>
              
              {/* Audience Giveaway */}
              <div className="p-6 rounded-xl bg-gradient-to-br from-pink-500/10 to-purple-500/5 border border-pink-500/30 text-center hover-lift transition-smooth">
                <span className="text-5xl block mb-3">🎉</span>
                <h4 className="text-xl font-bold text-env-primary mb-2">Audience Giveaway!</h4>
                <p className="text-env-secondary text-lg">
                  <span className="text-pink-400 font-bold">{additionalPrizes2026.audienceGiveaway.count} lucky students</span> in the audience will win:
                </p>
                <p className="text-env-secondary text-lg font-bold mt-2">
                  {additionalPrizes2026.audienceGiveaway.prize}
                </p>
                <p className="text-pink-400 font-medium mt-2">Come watch, you might win! 🎊</p>
              </div>
            </div>
          </AnimatedSection>

          {/* Total Value */}
          <AnimatedSection animation="fade-up" delay={400}>
            <div className="p-8 rounded-2xl bg-gradient-to-r from-chapter-accent/20 to-purple-500/20 border-2 border-chapter-accent/50 max-w-3xl mx-auto text-center">
              <h4 className="text-2xl font-bold text-env-primary mb-4">
                Total Prize Pool Value: <span className="text-chapter-accent text-3xl">₦10,000,000+</span>
              </h4>
              <p className="text-env-secondary text-lg mb-4">
                That's laptops, cash prizes, business grants, and gift packs combined!
              </p>
              <p className="text-env-primary font-medium">
                <span className="text-chapter-accent">Everyone wins something.</span> No one goes home empty-handed.
              </p>
            </div>
          </AnimatedSection>

          {/* Eligibility */}
          <AnimatedSection animation="fade-up" delay={500}>
            <div className="mt-10 p-6 rounded-2xl bg-env-surface border border-env-border max-w-3xl mx-auto text-center">
              <h4 className="text-xl font-bold text-env-primary mb-4">Who Can Enter? 🤔</h4>
              <div className="flex flex-wrap justify-center gap-3 text-env-secondary mb-4">
                <span className="px-4 py-2 bg-chapter-accent/10 rounded-full text-sm font-medium">✅ All SSS3 Students</span>
                <span className="px-4 py-2 bg-chapter-accent/10 rounded-full text-sm font-medium">📍 Lagos State</span>
                <span className="px-4 py-2 bg-chapter-accent/10 rounded-full text-sm font-medium">🏫 Public & Private Schools</span>
                <span className="px-4 py-2 bg-chapter-accent/10 rounded-full text-sm font-medium">🆓 FREE Entry</span>
              </div>
              {!registrationOpen && (
                <div className="p-4 rounded-xl bg-chapter-accent/10 border border-chapter-accent/20 mb-4">
                  <p className="text-chapter-accent font-bold">📅 Registration Opens: {REGISTRATION_OPENS}</p>
                </div>
              )}
              <p className="text-env-primary font-medium">
                Have an idea and the drive to make it real? <span className="text-chapter-accent">You're already qualified.</span>
              </p>
            </div>
          </AnimatedSection>
          
        </div>
      </section>

      {/* ==================== ABOUT SECTION ==================== */}
      <section className="section-padding">
        <div className="container-forge">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <AnimatedSection animation="fade-right">
              <div>
                <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-chapter-accent bg-chapter-accent-soft rounded-full border border-chapter-accent/20">
                  What Is LaunchPad?
                </span>
                
                <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-6">
                  More Than a Competition —
                  <br />
                  <span className="text-chapter-accent">It's Your Launchpad</span>
                </h2>
                
                <div className="space-y-4 text-env-secondary leading-relaxed">
                  <p className="text-lg">
                    Sure, the prizes are amazing. But LaunchPad is really about <strong className="text-env-primary">discovering what you're capable of</strong>.
                  </p>
                  <p>
                    We teach you the same skills that startup founders and CEOs use:
                  </p>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-center">
                      <span className="text-chapter-accent mr-2">💡</span>
                      Turning problems into opportunities
                    </li>
                    <li className="flex items-center">
                      <span className="text-chapter-accent mr-2">🎤</span>
                      Pitching ideas like a pro
                    </li>
                    <li className="flex items-center">
                      <span className="text-chapter-accent mr-2">📊</span>
                      Planning and strategy
                    </li>
                    <li className="flex items-center">
                      <span className="text-chapter-accent mr-2">🤝</span>
                      Working in teams
                    </li>
                    <li className="flex items-center">
                      <span className="text-chapter-accent mr-2">🔥</span>
                      Confidence and guts
                    </li>
                  </ul>
                  <p className="text-lg font-medium text-env-primary">
                    By the end, you won't just be a student anymore. <span className="text-chapter-accent">You'll be a builder.</span>
                  </p>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="fade-left" delay={200}>
              <div className="relative">
                <div className="aspect-video rounded-2xl overflow-hidden border-2 border-env-border relative">
                  <Image
                    src="/images/launchpad/event-2025.jpg"
                    alt="Students at LaunchPad 2025"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="absolute -inset-4 bg-chapter-accent/10 rounded-3xl blur-2xl -z-10" />
                
                {/* Fun stat */}
                <div className="absolute -bottom-6 -right-6 p-4 bg-env-surface rounded-xl border border-env-border shadow-lg">
                  <p className="text-3xl font-bold text-chapter-accent">100%</p>
                  <p className="text-env-tertiary text-sm">of participants say<br/>it changed them!</p>
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
              <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-chapter-accent bg-chapter-accent-soft rounded-full border border-chapter-accent/20">
                How It Started
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-4">
                LaunchPad 2025 — Our First Launch
              </h2>
              <p className="text-env-secondary max-w-2xl mx-auto text-lg">
                It was small. But the impact? Massive.
              </p>
            </div>
          </AnimatedSection>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {previousEditionStats.map((stat, index) => (
              <AnimatedSection key={stat.label} animation="scale" delay={index * 100}>
                <div className="text-center p-6 rounded-xl bg-env-surface border border-env-border hover-glow transition-smooth">
                  <div className="text-4xl md:text-5xl font-black text-chapter-accent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-env-tertiary text-sm font-medium">{stat.label}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* 2025 Winners */}
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-env-primary">
                2025 Winners 🏆
              </h3>
            </div>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12">
            {previousYearPrizes.map((prize, index) => (
              <AnimatedSection key={prize.position} animation="scale" delay={index * 150}>
                <div className={`p-6 rounded-xl bg-gradient-to-br ${prize.color} border ${prize.borderColor} text-center hover-lift transition-smooth`}>
                  <span className="text-5xl block mb-3">{prize.icon}</span>
                  <h4 className="text-xl font-bold text-env-primary mb-1">{prize.position}</h4>
                  <p className="text-2xl font-bold text-chapter-accent">{prize.amount}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* 2025 Partners */}
          <AnimatedSection animation="fade-up" delay={200}>
            <div className="mt-16">
              <h3 className="text-xl font-bold text-env-primary text-center mb-8">
                2025 Partners & Supporters 🤝
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {partners2025.map((partner, index) => (
                  <div key={`partner-${index}`} className="p-6 rounded-xl bg-env-surface border border-env-border text-center hover-lift transition-smooth">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-chapter-accent-soft flex items-center justify-center">
                      <span className="text-2xl">🤝</span>
                    </div>
                    <h4 className="font-semibold text-env-primary mb-1">{partner.name}</h4>
                    <p className="text-chapter-accent text-sm mb-2">{partner.role}</p>
                    <p className="text-env-tertiary text-sm">{partner.contribution}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
          
        </div>
      </section>

      {/* ==================== TESTIMONIALS ==================== */}
      <section className="section-padding">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-chapter-accent bg-chapter-accent-soft rounded-full border border-chapter-accent/20">
                Real Stories
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-4">
                Don't Just Take Our Word For It
              </h2>
              <p className="text-env-secondary max-w-2xl mx-auto">
                Here's what 2025 participants have to say:
              </p>
            </div>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <AnimatedSection key={index} animation="fade-up" delay={index * 100}>
                <div className="p-6 rounded-xl bg-env-surface border border-env-border h-full hover-glow transition-smooth relative">
                  <div className="text-5xl text-chapter-accent/20 absolute top-4 left-4">"</div>
                  <p className="text-env-secondary leading-relaxed mb-6 italic pt-8 text-lg">
                    {testimonial.quote}
                  </p>
                  <div className="flex items-center space-x-3 border-t border-env-border pt-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-chapter-accent to-purple-500 flex items-center justify-center text-white font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-env-primary">{testimonial.name}</h4>
                      <p className="text-env-tertiary text-xs">{testimonial.school}</p>
                      {testimonial.placement && (
                        <p className="text-chapter-accent text-xs font-bold">{testimonial.placement} 🏆</p>
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
              <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-chapter-accent bg-chapter-accent-soft rounded-full border border-chapter-accent/20">
                What You Get
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-4">
                More Than Just Prizes
              </h2>
              <p className="text-env-secondary max-w-2xl mx-auto">
                Every participant walks away with skills that last a lifetime:
              </p>
            </div>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programBenefits.map((benefit, index) => (
              <AnimatedSection key={benefit.title} animation="fade-up" delay={index * 75}>
                <div className="p-6 rounded-xl bg-env-surface border border-env-border hover:border-chapter-accent/50 transition-smooth hover-lift h-full group">
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
      <section className="section-padding">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-chapter-accent bg-chapter-accent-soft rounded-full border border-chapter-accent/20">
                How It Works
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-4">
                4 Simple Steps
              </h2>
              <p className="text-env-secondary max-w-2xl mx-auto">
                Getting started is easy. Here's how:
              </p>
            </div>
          </AnimatedSection>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {applicationSteps.map((step, index) => (
                <AnimatedSection key={step.step} animation="fade-up" delay={index * 100}>
                  <div className="p-6 rounded-xl bg-env-surface border border-env-border hover-glow transition-smooth h-full">
                    <div className="flex items-start space-x-4">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-chapter-accent to-purple-500 flex items-center justify-center flex-shrink-0 text-white font-bold text-xl">
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
                <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-chapter-accent bg-chapter-accent-soft rounded-full border border-chapter-accent/20">
                  Student Application
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-4">
                  {registrationOpen ? "Ready to Launch?" : "Get Ready to Apply"}
                </h2>
                
                {!registrationOpen ? (
                  <div className="mb-8 p-8 rounded-2xl bg-gradient-to-r from-chapter-accent/20 to-purple-500/20 border-2 border-chapter-accent/50">
                    <p className="text-2xl font-bold text-env-primary mb-3">
                      📅 Registration Opens: {REGISTRATION_OPENS}
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
                    <div className="space-y-2">
                      <p className="text-chapter-accent font-bold text-xl">
                        🆓 Entry is 100% FREE
                      </p>
                      <p className="text-env-primary font-medium">
                        Open to ALL Lagos SSS3 students!
                      </p>
                      {LAUNCHPAD_CONFIG.applicationDeadline && (
                        <p className="text-env-tertiary">
                          ⏰ Deadline: <span className="text-chapter-accent font-bold">{new Date(LAUNCHPAD_CONFIG.applicationDeadline).toLocaleDateString('en-NG', { 
                            day: 'numeric', 
                            month: 'long', 
                            year: 'numeric' 
                          })}</span>
                        </p>
                      )}
                    </div>
                  </>
                )}
              </div>
              
              {registrationOpen && (
                <div className="p-6 md:p-8 rounded-2xl bg-env-surface border-2 border-chapter-accent/30">
                  <StudentApplicationForm />
                </div>
              )}
            </div>
          </AnimatedSection>
          
        </div>
      </section>

      {/* ==================== SPONSOR BENEFITS ==================== */}
      <section className="section-padding">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-purple-400 bg-purple-500/10 rounded-full border border-purple-500/20">
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
                <div className="p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20 h-full hover-lift transition-smooth">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {sponsorCategories.map((category) => (
                  <div key={category.category} className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/20">
                    <h4 className="font-bold text-purple-400 mb-3 text-lg">{category.category}</h4>
                    <ul className="space-y-2 text-env-secondary">
                      {category.examples.map((example) => (
                        <li key={example} className="flex items-center">
                          <span className="text-purple-400 mr-2">→</span>
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
                <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-purple-400 bg-purple-500/10 rounded-full border border-purple-500/20">
                  Become a Sponsor
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-4">
                  Invest in Nigeria's Future
                </h2>
                <p className="text-env-secondary max-w-2xl mx-auto text-lg">
                  Your support can change lives. Partner with us to launch the next generation!
                </p>
              </div>
              
              <div className="p-6 md:p-8 rounded-2xl bg-env-surface border-2 border-purple-500/30">
                <SponsorApplicationForm />
              </div>
            </div>
          </AnimatedSection>
          
        </div>
      </section>

      {/* ==================== FINAL CTA ==================== */}
      <section className="section-padding bg-gradient-to-b from-env-bg-primary via-chapter-accent/5 to-env-bg-primary">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="max-w-4xl mx-auto text-center">
              
              <span className="text-7xl block mb-6">🌟</span>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-env-primary mb-6 leading-tight">
                The future belongs to those who
                <br />
                <span className="gradient-text">start building it today.</span>
              </h2>
              
              <p className="text-xl text-env-secondary mb-8 max-w-2xl mx-auto">
                Whether you're a student with big dreams or an organization that believes in youth — <strong className="text-env-primary">your moment is now!</strong>
              </p>
              
              {!registrationOpen && (
                <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-chapter-accent/20 to-purple-500/20 border-2 border-chapter-accent/50 max-w-2xl mx-auto">
                  <p className="text-2xl font-bold text-env-primary mb-2">
                    📅 Registration Opens: <span className="text-chapter-accent">{REGISTRATION_OPENS}</span>
                  </p>
                  <p className="text-env-secondary">
                    Mark your calendar! Get your ideas ready!
                  </p>
                </div>
              )}
              
              <p className="text-2xl text-chapter-accent font-bold mb-8">
                LaunchPad {LAUNCHPAD_CONFIG.currentYear}: ₦10,000,000+ in Prizes! 🚀
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {registrationOpen ? (
                  <a
                    href="#apply"
                    className="px-10 py-5 bg-chapter-accent hover:bg-chapter-accent-hover text-white font-bold rounded-xl transition-smooth glow hover-lift text-xl"
                  >
                    Apply Now (Students)
                  </a>
                ) : (
                  <div className="px-10 py-5 bg-env-surface text-env-primary font-bold rounded-xl border-2 border-chapter-accent/30 text-xl">
                    Applications Open May 1
                  </div>
                )}
                <a
                  href="#sponsor"
                  className="px-10 py-5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-smooth hover-lift text-xl"
                >
                  Become a Sponsor
                </a>
              </div>
              
              <p className="mt-8 text-env-tertiary">
                Questions? Email us at <a href="mailto:launchpad@forgeintellitech.com" className="text-chapter-accent hover:underline">launchpad@forgeintellitech.com</a>
              </p>
              
            </div>
          </AnimatedSection>
          
        </div>
      </section>

      {/* Mobile CTA Bar */}
      {registrationOpen && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-env-bg-primary/95 backdrop-blur-sm border-t border-env-border md:hidden z-40">
          <div className="flex gap-3">
            <a
              href="#apply"
              className="flex-1 py-3 bg-chapter-accent text-white font-bold rounded-lg text-center"
            >
              🚀 Apply Now
            </a>
            <a
              href="#sponsor"
              className="flex-1 py-3 bg-purple-600 text-white font-bold rounded-lg text-center"
            >
              💼 Sponsor
            </a>
          </div>
        </div>
      )}
      
    </ChapterWrapper>
  );
}
