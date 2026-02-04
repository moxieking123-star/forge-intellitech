import Image from "next/image";
import SectionHeader from "../../components/SectionHeader";
import Link from "next/link";
import { ChapterWrapper } from "../../components/ChapterWrapper";
import { AnimatedSection, StaggeredChildren } from "../../components/AnimatedSection";

// Metadata for SEO
export const metadata = {
  title: "About Us",
  description: "Forge Intellitech is an African technology company shaping the next generation of thinkers, builders, and innovators through in-school programs and scalable software solutions designed for Africa's realities and future.",
};

// Company values
const values = [
  {
    title: "Ubuntu",
    meaning: "I am because we are",
    description: "Progress is never solitary. At Forge, every line of code, every platform, every initiative is measured by how it uplifts communities, students, and partners together.",
    icon: "🤝",
  },
  {
    title: "Excellence",
    meaning: "World-class, homegrown",
    description: "We craft technology that meets global standards but grows from African soil — rigorous, thoughtful, and purpose-built for our context.",
    icon: "⭐",
  },
  {
    title: "Integrity",
    meaning: "Trust as foundation",
    description: "Transparency, honesty, and accountability guide everything we do — forging long-term trust with every school, partner, and community we serve.",
    icon: "🛡️",
  },
  {
    title: "Innovation",
    meaning: "Solutions from within",
    description: "Our innovations are born from lived experience — African classrooms, local markets, and community needs inform every design decision.",
    icon: "💡",
  },
  {
    title: "Persistence",
    meaning: "Building for generations",
    description: "We do not chase quick wins. We build systems that endure, nurturing value that grows and multiplies over time.",
    icon: "🔥",
  },
  {
    title: "Accessibility",
    meaning: "Technology for everyone",
    description: "True technology is inclusive. We design with affordability, reach, and usability in mind, ensuring everyone can participate in progress.",
    icon: "🌍",
  },
];

// Journey milestones
const journey = [
  {
    year: "2024",
    title: "The Vision",
    description: "Forge Intellitech was born from a question: why wait for the future when Africa can build it? A vision rooted in self-determination and ingenuity.",
  },
  {
    year: "2025",
    title: "Laying the Foundation",
    description: "TechUp and LaunchPad took flight. Partnerships formed. Ideas began transforming into tangible systems shaping education and innovation.",
  },
  {
    year: "2025+",
    title: "Scaling Impact",
    description: "BiteBank and Trego began to extend our ecosystem, connecting communities through technology that understands their world and empowers their future.",
  },
];

// Team members
const team = [
  {
    name: "Adeniyi Moxie",
    role: "Founder & CEO",
    bio: "A visionary builder turning ideas into real systems. Adeniyi bridges African ingenuity with scalable solutions that prepare youth for tomorrow's opportunities.",
    image: "/images/team/founder.jpg",
  },
  {
    name: "Adeola Oyewoler",
    role: "Chairman",
    bio: "A strategic thinker nurturing African-led institutions. Adeola ensures Forge's initiatives empower youth to create lasting, meaningful systems.",
    image: "/images/team/chairman.jpg",
  },
];

// ============================================
// Team Member Card Component
// ============================================
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
          priority
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
<section className="relative section-padding flex items-center min-h-[60vh] overflow-hidden">
  
  {/* 
    FIX: Hero Background Image
    
    Previous issue: Nested structure with w-full h-full inside absolute inset-0
    caused dimension calculation issues.
    
    Solution: Place Image directly as child of section (which has relative).
    The Image with fill becomes position:absolute and fills the section directly.
  */}
  <Image
    src="/images/about/hero-about.jpg"
    alt=""
    fill
    sizes="100vw"
    className="object-cover"
    style={{ zIndex: 0 }}
    priority
    quality={85}
  />
  
  {/* Gradient overlay - must be above image (z-[1]) but below content (z-10) */}
  <div 
    className="absolute inset-0 bg-gradient-to-r from-env-bg-primary via-env-bg-primary/90 to-env-bg-primary/70"
    style={{ zIndex: 1 }}
  />

  {/* Content - highest z-index */}
  <div className="container-forge relative" style={{ zIndex: 10 }}>
    <AnimatedSection animation="fade-up">
      <div className="max-w-4xl">
        
        <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-wider text-chapter-accent bg-chapter-accent-soft rounded-full border border-chapter-accent/20">
          About Forge
        </span>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-env-primary mb-6">
          We do more than build technology.
          <br />
          <span className="gradient-text">We forge systems that endure.</span>
        </h1>
        
        <p className="text-xl text-env-secondary leading-relaxed max-w-3xl">
          Forge Intellitech empowers African youth and institutions through digital education programs and scalable software solutions — designed in Africa, for Africa, and for a future that belongs to us.
        </p>
        
      </div>
    </AnimatedSection>
  </div>
</section>

      {/* ==================== OUR STORY SECTION ==================== */}
      {/* UPDATED: Replaced placeholder with actual image */}
      <section className="section-padding bg-env-secondary">
        <div className="container-forge">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <AnimatedSection animation="fade-right">
              <div>
                <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-chapter-accent bg-chapter-accent-soft rounded-full border border-chapter-accent/20">
                  Our Story
                </span>
                
                <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-6">
                  Crafted from lived experience
                </h2>
                
                <div className="space-y-4 text-env-secondary leading-relaxed prose-forge">
                  <p>
                    Too often, technology in Africa has been imported, designed for worlds we do not live in. Education, finance, transport, and governance demanded solutions that understand us first.
                  </p>
                  <p>
                    Forge was created to shift that story. Every system, every platform, every program emerges from deep understanding of African classrooms, communities, and challenges.
                  </p>
                  <p>
                    We hold this truth: <strong className="text-env-primary">Africa's most powerful technologies will be built by Africans</strong>, for Africans, and scaled with intention.
                  </p>
                  <p>
                    That belief shapes every product, every initiative, every journey we undertake.
                  </p>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="fade-left" delay={200}>
              <div className="relative">
                {/* UPDATED: Real image instead of placeholder */}
                <div className="aspect-square rounded-2xl overflow-hidden border border-env-border relative">
                  <Image
                    src="/images/about/team-story.jpg"
                    alt="Forge Intellitech team collaborating"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-chapter-accent-soft rounded-2xl -z-10"></div>
              </div>
            </AnimatedSection>
            
          </div>
          
        </div>
      </section>

      {/* ==================== MISSION & VISION SECTION ==================== */}
      <section className="section-padding">
        <div className="container-forge">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <AnimatedSection animation="fade-up">
              <div className="p-8 md:p-10 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20 h-full hover-lift transition-smooth">
                <div className="w-14 h-14 rounded-xl bg-blue-500/20 flex items-center justify-center mb-6">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-400 mb-2">
                  Our Mission
                </h3>
                <p className="text-2xl md:text-3xl font-bold text-env-primary leading-snug">
                  To equip African youth and institutions with the tools, skills, and systems they need to create opportunity, independence, and enduring growth.
                </p>
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="fade-up" delay={150}>
              <div className="p-8 md:p-10 rounded-2xl bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20 h-full hover-lift transition-smooth">
                <div className="w-14 h-14 rounded-xl bg-purple-500/20 flex items-center justify-center mb-6">
                  <span className="text-2xl">🔭</span>
                </div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-purple-400 mb-2">
                  Our Vision
                </h3>
                <p className="text-2xl md:text-3xl font-bold text-env-primary leading-snug">
                  An Africa where education, innovation, and technology are homegrown, globally competitive, and built for communities to thrive.
                </p>
              </div>
            </AnimatedSection>
            
          </div>
          
        </div>
      </section>

      {/* ==================== VALUES SECTION ==================== */}
      <section className="section-padding bg-env-secondary">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <SectionHeader
              label="Our Values"
              title="What We Stand For"
              description="These principles guide every decision and product, shaping the world we create."
            />
          </AnimatedSection>
          
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

      {/* ==================== JOURNEY SECTION ==================== */}
      <section className="section-padding">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <SectionHeader
              label="Our Journey"
              title="Building for the Long Term"
              description="Forge is a marathon, not a sprint. Here's where we started and where we are headed."
            />
          </AnimatedSection>
          
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-env-border md:-translate-x-px"></div>
              
              {journey.map((milestone, index) => (
                <AnimatedSection 
                  key={milestone.year} 
                  animation={index % 2 === 0 ? "fade-right" : "fade-left"}
                  delay={index * 150}
                >
                  <div className={`relative flex items-start mb-12 last:mb-0 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}>
                    <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-chapter-accent md:-translate-x-1.5 mt-2 ring-4 ring-env-bg-primary"></div>
                    
                    <div className={`ml-12 md:ml-0 md:w-1/2 ${
                      index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
                    }`}>
                      <span className="inline-block px-3 py-1 text-sm font-bold text-chapter-accent bg-chapter-accent-soft rounded-full mb-2">
                        {milestone.year}
                      </span>
                      <h3 className="text-xl font-semibold text-env-primary mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-env-secondary leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
          
        </div>
      </section>

      {/* ==================== TEAM SECTION ==================== */}
      <section className="section-padding bg-env-secondary">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <SectionHeader
              label="Leadership"
              title="The People Behind Forge"
              description="Meet the team creating Africa's technology future."
            />
          </AnimatedSection>
          
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

      {/* ==================== CTA SECTION ==================== */}
      <section className="section-padding">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="text-center max-w-3xl mx-auto">
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-env-primary mb-6">
                Ready to be part of 
                <span className="gradient-text"> the Forge journey?</span>
              </h2>
              
              <p className="text-lg text-env-secondary mb-10">
                We welcome passionate minds who share our vision. Whether you want to join our team, partner with us, or support our mission — there's a place for you at Forge.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/join"
                  className="px-8 py-4 bg-chapter-accent hover:bg-chapter-accent-hover text-env-text-inverse font-medium rounded-lg transition-smooth glow hover-lift"
                >
                  Join Our Team
                </Link>
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-env-surface hover:bg-env-surface-hover text-env-primary font-medium rounded-lg border border-env-border transition-smooth hover-lift"
                >
                  Get In Touch
                </Link>
              </div>
              
            </div>
          </AnimatedSection>
          
        </div>
      </section>
      
    </ChapterWrapper>
  );
}