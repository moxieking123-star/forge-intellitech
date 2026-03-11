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
    title: "Ubuntu",
    meaning: "I am because we are",
    description: "We succeed when our communities succeed.",
    icon: "🤝",
  },
  {
    title: "Excellence",
    meaning: "World-class, homegrown",
    description: "Global quality, African soul.",
    icon: "⭐",
  },
  {
    title: "Integrity",
    meaning: "Trust as foundation",
    description: "We do what we say, every time.",
    icon: "🛡️",
  },
  {
    title: "Innovation",
    meaning: "Solutions from within",
    description: "Built from our reality, not borrowed ideas.",
    icon: "💡",
  },
  {
    title: "Patience",
    meaning: "Building for generations",
    description: "We're not chasing headlines. We're building legacy.",
    icon: "🔥",
  },
  {
    title: "Accessibility",
    meaning: "Technology for everyone",
    description: "If it doesn't reach everyone, it's not done yet.",
    icon: "🌍",
  },
];

// Team members
const team = [
  {
    name: "Adeniyi Moxie",
    role: "Founder & CEO",
    bio: "A builder who believes Africa's future belongs to those who understand both technology and community.",
    image: "/images/team/founder.jpg",
  },
  {
    name: "Adeola Oyewoler",
    role: "Chairman",
    bio: "A leader committed to strengthening African institutions and empowering the next generation.",
    image: "/images/team/chairman.jpg",
  },
];

// Partners
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
  "Clear learning paths that grow with students",
  "Real partnerships with schools and communities",
  "Teaching responsibility alongside skills",
  "Training for jobs that actually exist",
];

// What makes Forge different
const forgeDifferentiators = [
  {
    wrong: "We're not running one-off workshops",
    right: "We're building lasting school partnerships",
  },
  {
    wrong: "We're not teaching tools alone",
    right: "We're developing complete skillsets",
  },
  {
    wrong: "We're not chasing numbers",
    right: "We're building real capability",
  },
];

// Institutional alignment areas
const institutionalAlignment = [
  "Public school systems",
  "Local government programs",
  "Youth development initiatives",
  "Digital economy plans",
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
                About Forge
              </span>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-env-primary mb-6 leading-tight">
                Africa won't become great
                <br />
                by copying other people's playbook.
                <br />
                <span className="text-chapter-accent">We'll get there by writing our own — starting with our young people.</span>
              </h1>
              
              <p className="text-xl text-env-secondary leading-relaxed max-w-3xl">
                That's why Forge exists.
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
                We're not here to run quick tech trainings and call it a day.
              </p>
              <p className="text-xl md:text-2xl text-env-primary font-medium leading-relaxed">
                We're here to <span className="text-chapter-accent">build pipelines</span> — pathways that take young Africans from curiosity to capability, from learning to leading.
              </p>
              <div className="mt-8 p-6 rounded-xl bg-chapter-accent/10 border border-chapter-accent/20">
                <p className="text-lg text-env-primary font-medium">
                  We start with students. <span className="text-chapter-accent">But we're building for the whole country.</span>
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
                  What makes us different
                </h2>
                
                <div className="space-y-4 text-env-secondary leading-relaxed">
                  <p>
                    Most tech programs focus on: <span className="text-env-primary font-medium">apps, hackathons, and quick wins.</span>
                  </p>
                  <p>
                    We focus on something deeper:
                  </p>
                  <p className="text-xl text-chapter-accent font-bold">
                    Training people who will shape the future.
                  </p>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="fade-left" delay={200}>
              <div className="p-6 md:p-8 rounded-2xl bg-env-surface border border-env-border">
                <h3 className="text-lg font-semibold text-env-primary mb-4">
                  We intentionally build:
                </h3>
                <div className="space-y-3">
                  {edgeFocusAreas.map((area, i) => (
                    <div key={i} className="flex items-start p-3 rounded-lg bg-chapter-accent/10 border border-chapter-accent/20">
                      <svg className="w-5 h-5 text-chapter-accent mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-env-primary font-medium text-sm">{area}</span>
                    </div>
                  ))}
                </div>
                <p className="text-env-secondary mt-4 text-sm">
                  ...all working together as one system.
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
            title="Two Sides of the Same Coin"
            description="Education and technology — working together, making each other stronger."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <AnimatedSection animation="fade-up">
              <div className="p-6 md:p-8 rounded-2xl bg-env-surface border border-env-border h-full hover-lift transition-smooth">
                <div className="w-14 h-14 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-6">
                  <span className="text-2xl">🎓</span>
                </div>
                <h3 className="text-xl font-bold text-env-primary mb-4">
                  1. Education Programs
                </h3>
                <p className="text-env-secondary leading-relaxed mb-4">
                  Through <strong className="text-env-primary">TechUp</strong> and <strong className="text-env-primary">LaunchPad</strong>, we teach students real digital skills in their own schools — taking them from basic tech literacy all the way to building their own ideas.
                </p>
                <div className="flex gap-3">
                  <Link href="/techup" className="text-emerald-400 hover:underline text-sm font-medium">
                    Explore TechUp →
                  </Link>
                  <Link href="/launchpad" className="text-emerald-400 hover:underline text-sm font-medium">
                    Explore LaunchPad →
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
                  2. Technology Products
                </h3>
                <p className="text-env-secondary leading-relaxed mb-4">
                  Through products like <strong className="text-env-primary">BiteBank</strong> and <strong className="text-env-primary">Trego</strong>, we build real solutions for food, transport, and community needs — designed for how Africans actually live and move.
                </p>
                <div className="flex gap-3">
                  <Link href="/bitebank" className="text-blue-400 hover:underline text-sm font-medium">
                    See BiteBank →
                  </Link>
                  <Link href="/trego" className="text-blue-400 hover:underline text-sm font-medium">
                    See Trego →
                  </Link>
                </div>
              </div>
            </AnimatedSection>
            
          </div>
          
          <AnimatedSection animation="fade-up" delay={300}>
            <div className="mt-8 p-6 rounded-xl bg-chapter-accent/10 border border-chapter-accent/20 text-center max-w-3xl mx-auto">
              <p className="text-chapter-accent font-medium text-lg">
                We teach the builders. Then we build the systems. That's how it works.
              </p>
            </div>
          </AnimatedSection>
          
        </div>
      </section>

      {/* ==================== TECHUP SUMMARY ==================== */}
      <section className="section-padding">
        <div className="container-forge">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <AnimatedSection animation="fade-right">
              <div>
                <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-chapter-accent bg-chapter-accent-soft rounded-full border border-chapter-accent/20">
                  Flagship Program
                </span>
                
                <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-6">
                  TechUp — Where It All Begins
                </h2>
                
                <p className="text-env-secondary leading-relaxed mb-6">
                  TechUp brings real tech education directly into secondary schools. Students don't just learn to use apps — they learn to design, build, and create their own.
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
                  By the time they finish, students choose their path — whether they want to build tech, solve problems with data, or tell powerful stories through design.
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

      {/* ==================== LAUNCHPAD SUMMARY ==================== */}
      <section className="section-padding bg-env-secondary">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-chapter-accent bg-chapter-accent-soft rounded-full border border-chapter-accent/20">
                From Skills to Business
              </span>
              
              <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-6">
                LaunchPad
              </h2>
              
              <p className="text-lg text-env-secondary leading-relaxed mb-8">
                LaunchPad finds the best TechUp graduates and helps them turn their ideas into real businesses — with funding, mentorship, and support, without taking any part of what they build.
              </p>
              
              <div className="p-6 rounded-xl bg-chapter-accent/10 border border-chapter-accent/20">
                <p className="text-xl text-chapter-accent font-bold">
                  Learn → Build → Launch → Grow
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
            label="Our Approach"
            title="We Do Things Differently"
            description="Here's what sets us apart from typical tech programs."
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
                Built to Scale
              </span>
              
              <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-6">
                Designed to Work With Government
              </h2>
              
              <p className="text-env-secondary leading-relaxed mb-8">
                Everything we build is designed to fit into existing systems — so it can grow beyond one school, one community, one state.
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
                  What works in one school today can work in <span className="text-chapter-accent">every school tomorrow.</span>
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
            title="Who We Work With"
            description="We work with government, community organizations, and schools to make real impact."
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
            title="Who's Behind Forge"
            description="Meet the people leading this mission."
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
            title="What We Stand For"
            description="Six principles that guide everything we do."
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
                Forge exists so the next generation of Africans don't just use technology —
              </p>
              
              <div className="space-y-4 mb-8">
                <p className="text-2xl text-env-primary font-bold">They design it.</p>
                <p className="text-2xl text-env-primary font-bold">They build it.</p>
                <p className="text-2xl text-env-primary font-bold">They own it.</p>
              </div>
              
              <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-chapter-accent/10 to-purple-500/10 border border-chapter-accent/20">
                <p className="text-xl text-env-secondary mb-4">
                  Africa's future won't be imported.
                </p>
                <p className="text-3xl md:text-4xl text-chapter-accent font-bold">
                  It will be forged — right here, by us.
                </p>
              </div>
            </div>
          </AnimatedSection>
          
        </div>
      </section>

      {/* ==================== CTA SECTION ==================== */}
      <CTASection
        badge="Partner With Us"
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
