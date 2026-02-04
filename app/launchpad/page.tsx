import Image from "next/image";  // ← ADD THIS IMPORT
import Link from "next/link";
import { ChapterWrapper } from "../../components/ChapterWrapper";
import { AnimatedSection } from "../../components/AnimatedSection";
import { Countdown, CountdownBanner } from "../../components/Countdown";
import { Badge } from "../../components/Badge";
import { StudentApplicationForm, SponsorApplicationForm } from "../../components/LaunchPadForms";
import {
  LAUNCHPAD_CONFIG,
  prizes,
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
  title: "LaunchPad - Youth Entrepreneurship & AI Innovation Program",
  description: `Forge LaunchPad empowers Nigerian secondary school students with real-world business, AI-assisted ideation, and pitching skills. Apply for LaunchPad ${LAUNCHPAD_CONFIG.currentYear}.`,
};

export default function LaunchPadPage() {
  const partners2024 = partners.filter(p => p.year === 2024);
  
  return (
    <ChapterWrapper chapter="rise">
      
      {/* Countdown Banner */}
      <CountdownBanner
        targetDate={LAUNCHPAD_CONFIG.eventDate}
        eventName={LAUNCHPAD_CONFIG.eventName}
        ctaText="Apply Now"
        ctaHref="#apply"
        className="mt-16 md:mt-20"
      />
      
      {/* ==================== HERO SECTION ==================== */}
      {/* UPDATED: Added hero background image */}
      <section className="relative section-padding flex items-center min-h-[85vh] overflow-hidden">
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
                <span className="text-5xl animate-float">🚀</span>
                {LAUNCHPAD_CONFIG.applicationsOpen && (
                  <Badge status="live" pulse>Applications Open</Badge>
                )}
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-env-primary mb-6">
                Forge LaunchPad
              </h1>
              
              <p className="text-xl md:text-2xl text-chapter-accent font-medium mb-6">
                Youth Entrepreneurship & AI Innovation Program
              </p>
              
              <p className="text-lg md:text-xl text-env-secondary leading-relaxed mb-10 max-w-3xl mx-auto">
                Empowering Nigerian secondary school students with real-world business skills, 
                AI-assisted ideation, and the confidence to pitch their ideas.
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
                <a
                  href="#apply"
                  className="px-8 py-4 bg-chapter-accent hover:bg-chapter-accent-hover text-white font-semibold rounded-lg transition-smooth glow text-lg hover-lift"
                >
                  Apply for LaunchPad {LAUNCHPAD_CONFIG.currentYear}
                </a>
                <a
                  href="#sponsor"
                  className="px-8 py-4 bg-env-surface hover:bg-env-surface-hover text-env-primary font-semibold rounded-lg border border-env-border transition-smooth text-lg hover-lift"
                >
                  Become a Sponsor
                </a>
              </div>
              
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ==================== KEY INFO ==================== */}
      <section className="py-8 -mt-16 relative z-20">
        <div className="container-forge">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: "📅", label: "Event Date", value: new Date(LAUNCHPAD_CONFIG.eventDate).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' }) },
              { icon: "👥", label: "Participants", value: `${LAUNCHPAD_CONFIG.totalParticipants} Students` },
              { icon: "🎓", label: "Eligibility", value: "Final Year Students" },
            ].map((item, index) => (
              <AnimatedSection key={item.label} animation="fade-up" delay={index * 100}>
                <div className="px-6 py-4 bg-env-surface rounded-xl border border-env-border text-center hover-lift transition-smooth">
                  <span className="text-2xl block mb-2">{item.icon}</span>
                  <span className="text-env-tertiary text-sm block">{item.label}</span>
                  <span className="text-env-primary font-semibold">{item.value}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== ABOUT SECTION ==================== */}
      {/* UPDATED: Replaced placeholder with real image */}
      <section className="section-padding bg-env-secondary">
        <div className="container-forge">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <AnimatedSection animation="fade-right">
              <div>
                <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-chapter-accent bg-chapter-accent-soft rounded-full border border-chapter-accent/20">
                  About The Program
                </span>
                
                <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-6">
                  More than a competition — a transformation
                </h2>
                
                <div className="space-y-4 text-env-secondary leading-relaxed">
                  <p>
                    Forge LaunchPad is a youth entrepreneurship and AI innovation program 
                    designed specifically for Nigerian secondary school students.
                  </p>
                  <p>
                    The program equips students with <strong className="text-env-primary">real-world 
                    business skills, problem-solving abilities, AI-assisted ideation techniques, 
                    and professional pitching capabilities</strong>.
                  </p>
                  <p>
                    In a rapidly changing economy, young Nigerians need more than traditional 
                    education. They need the confidence and skills to create their own opportunities.
                  </p>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="fade-left" delay={200}>
              <div className="relative">
                {/* UPDATED: Real image instead of placeholder */}
                <div className="aspect-video rounded-2xl overflow-hidden border border-env-border relative">
                  <Image
                    src="/images/launchpad/event-2024.jpg"
                    alt="LaunchPad 2024 event - Students presenting their business ideas"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="absolute -inset-4 bg-chapter-accent/10 rounded-3xl blur-2xl -z-10" />
              </div>
            </AnimatedSection>
            
          </div>
        </div>
      </section>

      {/* ==================== 2024 IMPACT ==================== */}
      <section className="section-padding">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-chapter-accent bg-chapter-accent-soft rounded-full border border-chapter-accent/20">
                Proof of Impact
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-4">
                LaunchPad {LAUNCHPAD_CONFIG.previousYear} — Where It All Began
              </h2>
              <p className="text-env-secondary max-w-2xl mx-auto">
                Our inaugural edition proved that when you invest in young people, extraordinary things happen.
              </p>
            </div>
          </AnimatedSection>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {previousEditionStats.map((stat, index) => (
              <AnimatedSection key={stat.label} animation="scale" delay={index * 100}>
                <div className="text-center p-6 rounded-xl bg-env-surface border border-env-border hover-glow transition-smooth">
                  <div className="text-3xl md:text-4xl font-bold text-chapter-accent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-env-tertiary text-sm">{stat.label}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Prizes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {prizes.map((prize, index) => (
              <AnimatedSection key={prize.position} animation="scale" delay={index * 150}>
                <div className={`p-6 rounded-xl bg-gradient-to-br ${prize.color} border ${prize.borderColor} text-center hover-lift transition-smooth`}>
                  <span className="text-5xl block mb-3">{prize.icon}</span>
                  <h4 className="text-xl font-bold text-env-primary mb-1">{prize.position}</h4>
                  <p className="text-2xl font-bold text-chapter-accent">{prize.amount}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Partners */}
          <AnimatedSection animation="fade-up" delay={200}>
            <div className="mt-16">
              <h3 className="text-xl font-semibold text-env-primary text-center mb-8">
                {LAUNCHPAD_CONFIG.previousYear} Partners & Supporters
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {partners2024.map((partner) => (
                  <div key={partner.name} className="p-6 rounded-xl bg-env-surface border border-env-border text-center hover-lift transition-smooth">
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
      <section className="section-padding bg-env-secondary">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-chapter-accent bg-chapter-accent-soft rounded-full border border-chapter-accent/20">
                Student Voices
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-4">
                Hear From Our Students
              </h2>
            </div>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <AnimatedSection key={index} animation="fade-up" delay={index * 100}>
                <div className="p-6 rounded-xl bg-env-surface border border-env-border h-full hover-glow transition-smooth">
                  <div className="text-4xl text-chapter-accent/30 mb-4">"</div>
                  <p className="text-env-secondary leading-relaxed mb-6 italic">
                    {testimonial.quote}
                  </p>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-chapter-accent-soft to-purple-500/20 flex items-center justify-center">
                      <span className="text-lg">👤</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-env-primary text-sm">{testimonial.name}</h4>
                      <p className="text-env-tertiary text-xs">{testimonial.school}</p>
                      {testimonial.placement && (
                        <p className="text-chapter-accent text-xs font-medium">{testimonial.placement}</p>
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
      <section className="section-padding">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-chapter-accent bg-chapter-accent-soft rounded-full border border-chapter-accent/20">
                Program Benefits
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-4">
                What Students Gain
              </h2>
            </div>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programBenefits.map((benefit, index) => (
              <AnimatedSection key={benefit.title} animation="fade-up" delay={index * 75}>
                <div className="p-6 rounded-xl bg-env-surface border border-env-border hover:border-chapter-accent/30 transition-smooth hover-lift h-full">
                  <span className="text-4xl mb-4 block">{benefit.icon}</span>
                  <h3 className="text-lg font-semibold text-env-primary mb-2">{benefit.title}</h3>
                  <p className="text-env-secondary text-sm leading-relaxed">{benefit.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
          
        </div>
      </section>

      {/* ==================== HOW TO APPLY ==================== */}
      <section className="section-padding bg-env-secondary">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-chapter-accent bg-chapter-accent-soft rounded-full border border-chapter-accent/20">
                How To Apply
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-4">
                Application Process
              </h2>
            </div>
          </AnimatedSection>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {applicationSteps.map((step, index) => (
                <AnimatedSection key={step.step} animation="fade-up" delay={index * 100}>
                  <div className="p-6 rounded-xl bg-env-surface border border-env-border hover-glow transition-smooth">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-full bg-chapter-accent-soft flex items-center justify-center flex-shrink-0">
                        <span className="text-chapter-accent font-bold">{step.step}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-env-primary mb-2">{step.title}</h4>
                        <p className="text-env-secondary text-sm">{step.description}</p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
          
        </div>
      </section>

      {/* ==================== STUDENT APPLICATION FORM ==================== */}
      <section id="apply" className="section-padding scroll-mt-20">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-chapter-accent bg-chapter-accent-soft rounded-full border border-chapter-accent/20">
                  Apply Now
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-4">
                  Join LaunchPad {LAUNCHPAD_CONFIG.currentYear}
                </h2>
                <p className="text-env-secondary max-w-2xl mx-auto">
                  Ready to transform your ideas into reality? Complete the application below.
                  {LAUNCHPAD_CONFIG.applicationDeadline && (
                    <span className="block mt-2 text-chapter-accent font-medium">
                      Deadline: {new Date(LAUNCHPAD_CONFIG.applicationDeadline).toLocaleDateString('en-NG', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </span>
                  )}
                </p>
              </div>
              
              <div className="p-6 md:p-8 rounded-2xl bg-env-surface border border-env-border">
                <StudentApplicationForm />
              </div>
            </div>
          </AnimatedSection>
          
        </div>
      </section>

      {/* ==================== SPONSOR BENEFITS ==================== */}
      <section className="section-padding bg-env-secondary">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-purple-400 bg-purple-500/10 rounded-full border border-purple-500/20">
                Partner With Us
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-4">
                Why Sponsor LaunchPad?
              </h2>
            </div>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {sponsorBenefits.map((benefit, index) => (
              <AnimatedSection key={benefit.title} animation="fade-up" delay={index * 75}>
                <div className="p-6 rounded-xl bg-purple-500/5 border border-purple-500/20 h-full hover-lift transition-smooth">
                  <span className="text-3xl mb-4 block">{benefit.icon}</span>
                  <h3 className="font-semibold text-env-primary mb-2">{benefit.title}</h3>
                  <p className="text-env-secondary text-sm">{benefit.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Who Should Sponsor */}
          <AnimatedSection animation="fade-up" delay={200}>
            <div className="max-w-4xl mx-auto p-8 rounded-2xl bg-env-surface border border-env-border">
              <h3 className="text-xl font-semibold text-env-primary mb-6 text-center">
                Who Should Partner With Us?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sponsorCategories.map((category) => (
                  <div key={category.category}>
                    <h4 className="font-medium text-chapter-accent mb-3">{category.category}</h4>
                    <ul className="space-y-2 text-env-secondary text-sm">
                      {category.examples.map((example) => (
                        <li key={example}>• {example}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
          
        </div>
      </section>

      {/* ==================== SPONSOR APPLICATION FORM ==================== */}
      <section id="sponsor" className="section-padding scroll-mt-20">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-purple-400 bg-purple-500/10 rounded-full border border-purple-500/20">
                  Become a Sponsor
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-4">
                  Invest in Nigeria's Future
                </h2>
                <p className="text-env-secondary max-w-2xl mx-auto">
                  Partner with us to empower the next generation of Nigerian entrepreneurs.
                </p>
              </div>
              
              <div className="p-6 md:p-8 rounded-2xl bg-env-surface border border-env-border">
                <SponsorApplicationForm />
              </div>
            </div>
          </AnimatedSection>
          
        </div>
      </section>

      {/* ==================== FINAL CTA ==================== */}
      <section className="section-padding bg-gradient-to-b from-env-secondary to-env-bg-primary">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="max-w-4xl mx-auto text-center">
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-env-primary mb-6">
                The future belongs to those who 
                <span className="gradient-text"> prepare for it today.</span>
              </h2>
              
              <p className="text-lg text-env-secondary mb-10 max-w-2xl mx-auto">
                Whether you're a student with a dream, a school looking to empower your students, 
                or an organization that believes in Nigeria's youth — join LaunchPad {LAUNCHPAD_CONFIG.currentYear}.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#apply"
                  className="px-8 py-4 bg-chapter-accent hover:bg-chapter-accent-hover text-white font-semibold rounded-lg transition-smooth glow hover-lift"
                >
                  Apply Now (Students)
                </a>
                <a
                  href="#sponsor"
                  className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-smooth hover-lift"
                >
                  Sponsor / Partner
                </a>
              </div>
              
            </div>
          </AnimatedSection>
          
        </div>
      </section>

      {/* Mobile CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-env-bg-primary/95 backdrop-blur-sm border-t border-env-border md:hidden z-40">
        <div className="flex gap-3">
          <a
            href="#apply"
            className="flex-1 py-3 bg-chapter-accent text-white font-semibold rounded-lg text-center"
          >
            Apply Now
          </a>
          <a
            href="#sponsor"
            className="flex-1 py-3 bg-purple-600 text-white font-semibold rounded-lg text-center"
          >
            Sponsor
          </a>
        </div>
      </div>
      
    </ChapterWrapper>
  );
}