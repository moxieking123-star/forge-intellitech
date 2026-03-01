import Image from "next/image";
import Link from "next/link";
import SectionHeader from "../../components/SectionHeader";
import { ChapterWrapper } from "../../components/ChapterWrapper";
import { AnimatedSection } from "../../components/AnimatedSection";
import { CTASection } from "../../components/CTASection";

// Metadata for SEO
export const metadata = {
  title: "About Us - Forge Intellitech Services Ltd",
  description: "Forge Intellitech is an African technology and education company building long-term capability pipelines that prepare young Africans to design, build and govern the digital infrastructure of their own societies.",
};

// Company values
const values = [
  {
    title: "Original",
    meaning: "I am because we are",
    description: "Community impact defines success.",
    icon: "🤝",
  },
  {
    title: "Excellence",
    meaning: "World-class, homegrown",
    description: "Global standards, African context.",
    icon: "⭐",
  },
  {
    title: "Integrity",
    meaning: "Trust as foundation",
    description: "Transparency and accountability at every level.",
    icon: "🛡️",
  },
  {
    title: "Innovation",
    meaning: "Solutions from within",
    description: "Designed from lived African realities.",
    icon: "💡",
  },
  {
    title: "Persistence",
    meaning: "Building for generations",
    description: "We build infrastructure, not headlines.",
    icon: "🔥",
  },
  {
    title: "Accessibility",
    meaning: "Technology for everyone",
    description: "Reach and inclusion drive design decisions.",
    icon: "🌍",
  },
];

// Team members
const team = [
  {
    name: "Adeniyi Moxie",
    role: "Founder & CEO",
    bio: "A systems builder focused on turning African potential into scalable digital infrastructure and institutional capability.",
    image: "/images/team/founder.jpg",
  },
  {
    name: "Adeola Oyewoler",
    role: "Chairman",
    bio: "A strategic leader committed to strengthening African-led institutions and long-term youth empowerment.",
    image: "/images/team/chairman.jpg",
  },
];

// Partners - UPDATED
const partners = [
  {
    name: "Ikosi-Isheri Local Government",
    logo: "/images/partners/ikosi-isheri-lg.jpg",
  },
  {
    name: "Motunrayo Girls Foundation",
    logo: "/images/partners/motunrayo-girls-foundation.jpg",
  },
  {
    name: "APC Women in Governance – Shomolu Chapter",
    logo: "/images/partners/apc-women-shomolu.jpg",
  },
];

// Our edge focus areas
const edgeFocusAreas = [
  "Learning pathways",
  "Institutional partnerships",
  "Civic responsibility",
  "Industry relevance",
];

// What makes Forge different
const forgeDifferentiators = [
  {
    wrong: "We are not an NGO programme.",
    right: "We are a long-term institutional partner.",
  },
  {
    wrong: "We do not run isolated workshops.",
    right: "We embed inside school systems.",
  },
  {
    wrong: "We do not train for tools.",
    right: "We train for national capability.",
  },
];

// Institutional alignment areas
const institutionalAlignment = [
  "Public education systems",
  "Local government initiatives",
  "National youth development frameworks",
  "Digital economy and innovation policies",
];

// Team Member Card Component
interface TeamMemberCardProps {
  member: {
    name: string;
    role: string;
    bio: string;
    image: string;
  };
}

function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <div className="p-8 rounded-2xl bg-env-surface border border-env-border hover:border-chapter-accent/30 transition-smooth hover-lift">
      <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden bg-gradient-to-br from-chapter-accent-soft to-chapter-accent-softer border-4 border-env-border ring-4 ring-chapter-accent/10 mb-8 mx-auto relative group">
        <Image
          src={member.image}
          alt={`${member.name} - ${member.role}`}
          fill
          sizes="(max-width: 768px) 160px, 192px"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      
      <div className="text-center">
        <h3 className="text-2xl font-semibold text-env-primary mb-2">
          {member.name}
        </h3>
        <p className="text-chapter-accent font-medium mb-4 text-lg">
          {member.role}
        </p>
        <p className="text-env-secondary leading-relaxed">
          {member.bio}
        </p>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <ChapterWrapper chapter="foundation">
      
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative section-padding flex items-center min-h-[70vh] overflow-hidden">
        
        {/* Background Image */}
        <Image
          src="/images/about/hero-about2.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          style={{ zIndex: 0 }}
          priority
          quality={85}
        />
        
        {/* Gradient overlay */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-env-bg-primary via-env-bg-primary/95 to-env-bg-primary/70"
          style={{ zIndex: 1 }}
        />

        {/* Content */}
        <div className="container-forge relative" style={{ zIndex: 10 }}>
          <AnimatedSection animation="fade-up">
            <div className="max-w-4xl">
              
              <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-wider text-chapter-accent bg-chapter-accent-soft rounded-full border border-chapter-accent/20">
                About Forge Intellitech Services Ltd
              </span>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-env-primary mb-6 leading-tight">
                Africa will not become great by importing systems.
                <br />
                <span className="text-chapter-accent">Africa will become great by engineering its own future — starting with its youth.</span>
              </h1>
              
              <p className="text-xl text-env-secondary leading-relaxed max-w-3xl">
                Forge Intellitech is an African technology and education company built around a single, deliberate conviction.
              </p>
              
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ==================== INTRO STATEMENT ==================== */}
      <section className="section-padding bg-env-secondary">
        <div className="container-forge">
          <AnimatedSection animation="fade-up">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-xl md:text-2xl text-env-secondary leading-relaxed mb-6">
                We do not run short-term digital trainings.
              </p>
              <p className="text-xl md:text-2xl text-env-primary font-medium leading-relaxed">
                We build <span className="text-chapter-accent">long-term capability pipelines</span> that prepare young Africans to design, build and govern the digital infrastructure of their own societies.
              </p>
              <div className="mt-8 p-6 rounded-xl bg-chapter-accent/10 border border-chapter-accent/20">
                <p className="text-lg text-env-primary font-medium">
                  Our work begins with young people — but it is designed for <span className="text-chapter-accent">national scale</span>.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ==================== OUR EDGE SECTION ==================== */}
      <section className="section-padding">
        <div className="container-forge">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <AnimatedSection animation="fade-right">
              <div>
                <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-chapter-accent bg-chapter-accent-soft rounded-full border border-chapter-accent/20">
                  Our Edge
                </span>
                
                <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-6">
                  The quiet advantage behind real African transformation
                </h2>
                
                <div className="space-y-4 text-env-secondary leading-relaxed">
                  <p>
                    Most innovation programmes in Africa focus on: <span className="text-env-primary font-medium">tools, hackathons and isolated success stories.</span>
                  </p>
                  <p>
                    Forge focuses on something far more strategic:
                  </p>
                  <p className="text-xl text-chapter-accent font-bold">
                    How a nation builds human infrastructure.
                  </p>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="fade-left" delay={200}>
              <div className="p-6 md:p-8 rounded-2xl bg-env-surface border border-env-border">
                <h3 className="text-lg font-semibold text-env-primary mb-4">
                  We intentionally design:
                </h3>
                <div className="space-y-3">
                  {edgeFocusAreas.map((area, i) => (
                    <div key={i} className="flex items-center p-3 rounded-lg bg-chapter-accent/10 border border-chapter-accent/20">
                      <svg className="w-5 h-5 text-chapter-accent mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-env-primary font-medium">{area}</span>
                    </div>
                  ))}
                </div>
                <p className="text-env-secondary mt-4 text-sm">
                  ...into one connected system.
                </p>
              </div>
            </AnimatedSection>
            
          </div>
          
        </div>
      </section>

      {/* ==================== WHAT WE BUILD ==================== */}
      <section className="section-padding bg-env-secondary">
        <div className="container-forge">
          
          <SectionHeader
            label="What We Build"
            title="Two Tightly Integrated Pillars"
            description="Forge operates across education and infrastructure — and they reinforce each other."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <AnimatedSection animation="fade-up">
              <div className="p-6 md:p-8 rounded-2xl bg-env-surface border border-env-border h-full hover-lift transition-smooth">
                <div className="w-14 h-14 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-6">
                  <span className="text-2xl">🎓</span>
                </div>
                <h3 className="text-xl font-bold text-env-primary mb-4">
                  1. Education & National Talent Pipelines
                </h3>
                <p className="text-env-secondary leading-relaxed mb-4">
                  Through <strong className="text-env-primary">TechUp</strong> and <strong className="text-env-primary">LaunchPad</strong>, we design structured, in-school digital capability programmes that move students from foundational literacy to real innovation, enterprise and employability.
                </p>
                <div className="flex gap-3">
                  <Link href="/techup" className="text-emerald-400 hover:underline text-sm font-medium">
                    TechUp →
                  </Link>
                  <Link href="/launchpad" className="text-emerald-400 hover:underline text-sm font-medium">
                    LaunchPad →
                  </Link>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="fade-up" delay={150}>
              <div className="p-6 md:p-8 rounded-2xl bg-env-surface border border-env-border h-full hover-lift transition-smooth">
                <div className="w-14 h-14 rounded-xl bg-blue-500/20 flex items-center justify-center mb-6">
                  <span className="text-2xl">🏗️</span>
                </div>
                <h3 className="text-xl font-bold text-env-primary mb-4">
                  2. Applied Digital Infrastructure Platforms
                </h3>
                <p className="text-env-secondary leading-relaxed mb-4">
                  Through products such as <strong className="text-env-primary">Bitebank</strong> and <strong className="text-env-primary">Trego</strong>, we build real-world systems in food, mobility and community services that reflect African behaviour, infrastructure and constraints.
                </p>
                <div className="flex gap-3">
                  <Link href="/bitebank" className="text-blue-400 hover:underline text-sm font-medium">
                    Bitebank →
                  </Link>
                  <Link href="/trego" className="text-blue-400 hover:underline text-sm font-medium">
                    Trego →
                  </Link>
                </div>
              </div>
            </AnimatedSection>
            
          </div>
          
          <AnimatedSection animation="fade-up" delay={300}>
            <div className="mt-8 p-6 rounded-xl bg-chapter-accent/10 border border-chapter-accent/20 text-center max-w-3xl mx-auto">
              <p className="text-chapter-accent font-medium text-lg">
                Education and infrastructure reinforce each other. That is the architecture.
              </p>
            </div>
          </AnimatedSection>
          
        </div>
      </section>

      {/* ==================== TECHUP SUMMARY (SHORTENED) ==================== */}
      <section className="section-padding">
        <div className="container-forge">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <AnimatedSection animation="fade-right">
              <div>
                <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-chapter-accent bg-chapter-accent-soft rounded-full border border-chapter-accent/20">
                  Flagship Programme
                </span>
                
                <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-6">
                  TechUp — Our Core Delivery Engine
                </h2>
                
                <p className="text-env-secondary leading-relaxed mb-6">
                  TechUp is a structured, school-embedded digital education programme for Junior and Senior Secondary students. It transforms classrooms into innovation hubs where students learn real, hands-on digital skills.
                </p>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                    <span className="text-2xl mb-2 block">💻</span>
                    <span className="text-blue-400 text-sm font-medium">Builder</span>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <span className="text-2xl mb-2 block">📊</span>
                    <span className="text-emerald-400 text-sm font-medium">Strategist</span>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                    <span className="text-2xl mb-2 block">🎨</span>
                    <span className="text-purple-400 text-sm font-medium">Storyteller</span>
                  </div>
                </div>
                
                <p className="text-env-secondary text-sm mb-6">
                  Students graduate as builders, strategists or storytellers — prepared not just for employment, but for enterprise and digital leadership.
                </p>
                
                <Link
                  href="/techup"
                  className="inline-flex items-center px-6 py-3 bg-chapter-accent hover:bg-chapter-accent-hover text-white font-medium rounded-lg transition-smooth"
                >
                  Learn More About TechUp
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="fade-left" delay={200}>
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden border border-env-border relative">
                  <Image
                    src="/images/about/techup-classroom1.jpg"
                    alt="TechUp students in classroom"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-chapter-accent-soft rounded-2xl -z-10" />
              </div>
            </AnimatedSection>
            
          </div>
          
        </div>
      </section>

      {/* ==================== LAUNCHPAD SUMMARY (SHORTENED) ==================== */}
      <section className="section-padding bg-env-secondary">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-chapter-accent bg-chapter-accent-soft rounded-full border border-chapter-accent/20">
                From Skills to Enterprise
              </span>
              
              <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-6">
                LaunchPad
              </h2>
              
              <p className="text-lg text-env-secondary leading-relaxed mb-8">
                LaunchPad identifies outstanding TechUp graduates and supports them to refine ideas, build early products and receive non-equity funding — creating a direct pathway from school to enterprise.
              </p>
              
              <div className="p-6 rounded-xl bg-chapter-accent/10 border border-chapter-accent/20">
                <p className="text-xl text-chapter-accent font-bold">
                  School → Skills → Innovation → Enterprise
                </p>
              </div>
              
              <Link
                href="/launchpad"
                className="inline-flex items-center mt-6 text-chapter-accent hover:underline font-medium"
              >
                Learn more about LaunchPad
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </AnimatedSection>
          
        </div>
      </section>

      {/* ==================== WHAT MAKES FORGE DIFFERENT ==================== */}
      <section className="section-padding">
        <div className="container-forge">
          
          <SectionHeader
            label="Our Difference"
            title="What Makes Forge Different"
            description="We are not like typical digital skills initiatives."
          />
          
          <div className="max-w-3xl mx-auto space-y-4">
            {forgeDifferentiators.map((item, index) => (
              <AnimatedSection key={index} animation="fade-up" delay={index * 100}>
                <div className="p-6 rounded-xl bg-env-surface border border-env-border">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                      <span className="text-red-400 text-sm">✗ {item.wrong}</span>
                    </div>
                    <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      <span className="text-emerald-400 text-sm">✓ {item.right}</span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
          
        </div>
      </section>

      {/* ==================== INSTITUTIONAL ALIGNMENT ==================== */}
      <section className="section-padding bg-env-secondary">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-chapter-accent bg-chapter-accent-soft rounded-full border border-chapter-accent/20">
                Government Alignment
              </span>
              
              <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-6">
                Designed for Institutional Trust
              </h2>
              
              <p className="text-env-secondary leading-relaxed mb-8">
                Forge designs all programmes to integrate with public systems and national priorities.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {institutionalAlignment.map((item, i) => (
                  <div key={i} className="p-4 rounded-lg bg-env-surface border border-env-border">
                    <span className="text-env-primary text-sm">{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-6 rounded-xl bg-chapter-accent/10 border border-chapter-accent/20">
                <p className="text-env-primary font-medium">
                  Our model is designed for replication across: <span className="text-chapter-accent">local government areas, states and national programmes.</span>
                </p>
              </div>
            </div>
          </AnimatedSection>
          
        </div>
      </section>

      {/* ==================== PARTNERS ==================== */}
      <section className="section-padding">
        <div className="container-forge">
          
          <SectionHeader
            label="Our Partners"
            title="Organisations We Have Partnered With"
            description="We work closely with public institutions and community-driven organisations to deliver sustainable impact."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {partners.map((partner, index) => (
              <AnimatedSection key={partner.name} animation="fade-up" delay={index * 100}>
                <div className="text-center">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden bg-env-surface border-4 border-env-border ring-4 ring-chapter-accent/10 mx-auto mb-4 relative">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      className="object-cover"
                      sizes="160px"
                    />
                  </div>
                  <h3 className="font-semibold text-env-primary text-sm">{partner.name}</h3>
                </div>
              </AnimatedSection>
            ))}
          </div>
          
        </div>
      </section>

      {/* ==================== TEAM SECTION ==================== */}
      <section className="section-padding bg-env-secondary">
        <div className="container-forge">
          
          <SectionHeader
            label="Leadership"
            title="The People Behind Forge"
            description="Forge is led by practitioners who combine technology delivery, youth development and institutional strategy."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <AnimatedSection 
                key={member.name} 
                animation="fade-up" 
                delay={index * 150}
              >
                <TeamMemberCard member={member} />
              </AnimatedSection>
            ))}
          </div>
          
        </div>
      </section>

      {/* ==================== VALUES SECTION ==================== */}
      <section className="section-padding">
        <div className="container-forge">
          
          <SectionHeader
            label="Our Values"
            title="Six Operating Principles"
            description="We are guided by these core principles in everything we do."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <AnimatedSection 
                key={value.title} 
                animation="fade-up" 
                delay={index * 100}
              >
                <div className="p-6 rounded-xl bg-env-surface border border-env-border hover:border-chapter-accent/30 hover-lift hover-glow transition-smooth h-full">
                  <span className="text-4xl mb-4 block">{value.icon}</span>
                  <h3 className="text-xl font-semibold text-env-primary mb-1">
                    {value.title}
                  </h3>
                  <p className="text-sm text-chapter-accent mb-3 italic">
                    "{value.meaning}"
                  </p>
                  <p className="text-env-secondary text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
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
              <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-wider text-chapter-accent bg-chapter-accent-soft rounded-full border border-chapter-accent/20">
                Our Promise
              </span>
              
              <p className="text-xl text-env-secondary leading-relaxed mb-8">
                Forge Intellitech exists to ensure that the next generation of Africans do not only consume digital systems.
              </p>
              
              <div className="space-y-4 mb-8">
                <p className="text-2xl text-env-primary font-bold">They design them.</p>
                <p className="text-2xl text-env-primary font-bold">They build them.</p>
                <p className="text-2xl text-env-primary font-bold">They govern them.</p>
              </div>
              
              <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-chapter-accent/10 to-purple-500/10 border border-chapter-accent/20">
                <p className="text-xl text-env-secondary mb-4">
                  Africa's future will not be imported.
                </p>
                <p className="text-3xl md:text-4xl text-chapter-accent font-bold">
                  It will be forged.
                </p>
              </div>
            </div>
          </AnimatedSection>
          
        </div>
      </section>

      {/* ==================== CTA SECTION ==================== */}
      <CTASection
        badge="Partner With Us"
        headline="Ready to build"
        highlightedText="Africa's digital future?"
        description="We welcome institutions, governments and organisations who share our vision. Whether you want to bring TechUp to your schools, sponsor our initiatives, or collaborate on national digital capacity — there's a place for you."
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