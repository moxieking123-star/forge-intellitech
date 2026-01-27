import SectionHeader from "../../components/SectionHeader";
import Link from "next/link";

// Metadata for SEO (this page's title and description)
export const metadata = {
  title: "About Us",
  description: "Learn about Forge Intellitech - an African technology company building solutions rooted in local realities for global impact.",
};

// Company values
const values = [
  {
    title: "Ubuntu",
    meaning: "I am because we are",
    description: "We believe in collective success. When Africa wins, we all win. Our technology is built to uplift communities, not just individuals.",
    icon: "🤝",
  },
  {
    title: "Excellence",
    meaning: "World-class, homegrown",
    description: "We refuse to accept 'good enough for Africa.' We build to global standards because Africans deserve nothing less.",
    icon: "⭐",
  },
  {
    title: "Integrity",
    meaning: "Trust as foundation",
    description: "In a continent where trust is often broken, we build it. Transparent operations, honest communication, reliable products.",
    icon: "🛡️",
  },
  {
    title: "Innovation",
    meaning: "Solutions from within",
    description: "The best solutions to African problems come from African minds. We innovate from understanding, not assumption.",
    icon: "💡",
  },
  {
    title: "Persistence",
    meaning: "Building for generations",
    description: "Real change takes time. We're not here for quick wins — we're building infrastructure that will serve our children's children.",
    icon: "🔥",
  },
  {
    title: "Accessibility",
    meaning: "Technology for everyone",
    description: "If it only works for the privileged few, we haven't succeeded. Our products must reach those who need them most.",
    icon: "🌍",
  },
];

// Journey milestones
const journey = [
  {
    year: "2024",
    title: "The Vision",
    description: "Forge Intellitech was born from a simple question: Why does Africa keep waiting for solutions from elsewhere?",
  },
  {
    year: "2025",
    title: "Building Foundations",
    description: "Development begins on TechUp and LaunchPad. The team expands. The mission becomes clearer with each line of code.",
  },
  {
    year: "2025+",
    title: "The Future",
    description: "BiteBank and Trego enter development. Partnerships form. The ecosystem grows. Africa starts building its own digital future.",
  },
];

// Team members (placeholders - you'll add real info later)
const team = [
  {
    name: "Founder Name",
    role: "Founder & CEO",
    bio: "Visionary leader with a passion for African technology and sustainable development.",
    image: null,
  },
  {
    name: "Co-Founder Name",
    role: "Co-Founder & CTO",
    bio: "Technical architect building scalable solutions for Africa's unique challenges.",
    image: null,
  },
  {
    name: "Team Member 1",
    role: "Head of Product",
    bio: "Product strategist focused on user-centered design and impact measurement.",
    image: null,
  },
];

export default function AboutPage() {
  return (
    <div>
      
      {/* ==================== HERO SECTION ==================== */}
      <section className="section-padding flex items-center min-h-[60vh]">
        <div className="container-forge">
          <div className="max-w-4xl">
            
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-wider text-primary-400 bg-primary-500/10 rounded-full border border-primary-500/20">
              About Forge
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-forge-light mb-6">
              We're not just building products.
              <br />
              <span className="gradient-text">We're building possibilities.</span>
            </h1>
            
            <p className="text-xl text-forge-muted leading-relaxed max-w-3xl">
              Forge Intellitech is an African technology company on a mission to create 
              digital solutions that truly understand and serve our continent. We believe 
              Africa's greatest innovations will come from within — built by those who 
              live its realities every day.
            </p>
            
          </div>
        </div>
      </section>

      {/* ==================== OUR STORY SECTION ==================== */}
      <section className="section-padding bg-forge-darker">
        <div className="container-forge">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Story Text */}
            <div>
              <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-primary-400 bg-primary-500/10 rounded-full border border-primary-500/20">
                Our Story
              </span>
              
              <h2 className="text-3xl md:text-4xl font-bold text-forge-light mb-6">
                Born from a question that needed answering
              </h2>
              
              <div className="space-y-4 text-forge-muted leading-relaxed">
                <p>
                  For too long, Africa has been on the receiving end of technology. 
                  Solutions designed in distant boardrooms, by people who've never 
                  experienced load shedding, or understood why mobile money matters 
                  more than credit cards, or felt the weight of a continent's 
                  untapped potential.
                </p>
                <p>
                  Forge was born from frustration — and hope. Frustration with 
                  watching brilliant African minds solve African problems with 
                  borrowed tools. Hope that we could do better. That we 
                  <em> must</em> do better.
                </p>
                <p>
                  We started with a simple belief: <strong className="text-forge-light">the best 
                  solutions for Africa will come from Africa.</strong> Not adapted 
                  solutions. Not localized solutions. Solutions built from the 
                  ground up, by those who understand the ground.
                </p>
                <p>
                  Today, we're building that future — one product at a time.
                </p>
              </div>
            </div>
            
            {/* Story Image Placeholder */}
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 border border-forge-border flex items-center justify-center">
                <div className="text-center p-8">
                  <span className="text-6xl mb-4 block">🌍</span>
                  <p className="text-forge-muted text-sm">
                    [Your team or office image here]
                  </p>
                </div>
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary-500/20 rounded-2xl -z-10"></div>
            </div>
            
          </div>
          
        </div>
      </section>

      {/* ==================== MISSION & VISION SECTION ==================== */}
      <section className="section-padding">
        <div className="container-forge">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Mission */}
            <div className="p-8 md:p-10 rounded-2xl bg-gradient-to-br from-primary-500/10 to-primary-500/5 border border-primary-500/20">
              <div className="w-14 h-14 rounded-xl bg-primary-500/20 flex items-center justify-center mb-6">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-primary-400 mb-2">
                Our Mission
              </h3>
              <p className="text-2xl md:text-3xl font-bold text-forge-light leading-snug">
                To build technology that empowers African communities to solve their 
                own challenges and create their own opportunities.
              </p>
            </div>
            
            {/* Vision */}
            <div className="p-8 md:p-10 rounded-2xl bg-gradient-to-br from-accent-500/10 to-accent-500/5 border border-accent-500/20">
              <div className="w-14 h-14 rounded-xl bg-accent-500/20 flex items-center justify-center mb-6">
                <span className="text-2xl">🔭</span>
              </div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-accent-400 mb-2">
                Our Vision
              </h3>
              <p className="text-2xl md:text-3xl font-bold text-forge-light leading-snug">
                An Africa where technology is built by Africans, for Africans — 
                becoming a global leader in homegrown innovation.
              </p>
            </div>
            
          </div>
          
        </div>
      </section>

      {/* ==================== VALUES SECTION ==================== */}
      <section className="section-padding bg-forge-darker">
        <div className="container-forge">
          
          <SectionHeader
            label="Our Values"
            title="What We Stand For"
            description="These aren't just words on a wall. They're the principles that guide every decision we make."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value) => (
              <div 
                key={value.title}
                className="p-6 rounded-xl bg-white/5 border border-forge-border hover:border-primary-500/30 transition-smooth"
              >
                <span className="text-3xl mb-4 block">{value.icon}</span>
                <h3 className="text-xl font-bold text-forge-light mb-1">
                  {value.title}
                </h3>
                <p className="text-primary-400 text-sm font-medium mb-3 italic">
                  "{value.meaning}"
                </p>
                <p className="text-forge-muted text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
          
        </div>
      </section>

      {/* ==================== JOURNEY SECTION ==================== */}
      <section className="section-padding">
        <div className="container-forge">
          
          <SectionHeader
            label="Our Journey"
            title="Building Step by Step"
            description="Every great journey begins with a single step. Here's ours."
          />
          
          <div className="max-w-3xl mx-auto">
            {journey.map((milestone, index) => (
              <div key={milestone.year} className="relative pl-8 pb-12 last:pb-0">
                {/* Timeline line */}
                {index !== journey.length - 1 && (
                  <div className="absolute left-[11px] top-8 bottom-0 w-0.5 bg-forge-border"></div>
                )}
                {/* Timeline dot */}
                <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-primary-500 border-4 border-forge-dark"></div>
                {/* Content */}
                <div className="pt-0">
                  <span className="text-primary-400 font-bold text-lg">{milestone.year}</span>
                  <h3 className="text-xl font-semibold text-forge-light mt-1 mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-forge-muted leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </section>

      {/* ==================== TEAM SECTION ==================== */}
      <section className="section-padding bg-forge-darker">
        <div className="container-forge">
          
          <SectionHeader
            label="Our Team"
            title="The People Behind the Vision"
            description="A diverse team united by a common purpose: building Africa's digital future."
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div 
                key={member.name}
                className="text-center p-6 rounded-xl bg-white/5 border border-forge-border"
              >
                {/* Avatar placeholder */}
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary-500/30 to-accent-500/30 flex items-center justify-center">
                  <span className="text-3xl">👤</span>
                </div>
                <h3 className="text-lg font-semibold text-forge-light mb-1">
                  {member.name}
                </h3>
                <p className="text-primary-400 text-sm font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-forge-muted text-sm">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <p className="text-forge-muted mb-4">
              Want to join our team?
            </p>
            <Link
              href="/join#talent"
              className="inline-flex items-center text-primary-400 hover:text-primary-300 font-medium transition-smooth"
            >
              View open positions
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          
        </div>
      </section>

      {/* ==================== CTA SECTION ==================== */}
      <section className="section-padding">
        <div className="container-forge">
          
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-forge-light mb-6">
              This is just the 
              <span className="gradient-text"> beginning.</span>
            </h2>
            <p className="text-lg text-forge-muted mb-10">
              We're building something bigger than a company. We're building a movement. 
              A proof of concept that Africa can — and will — lead its own technological revolution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-smooth glow"
              >
                See What We're Building
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 bg-white/5 hover:bg-white/10 text-forge-light font-medium rounded-lg border border-forge-border transition-smooth"
              >
                Start a Conversation
              </Link>
            </div>
          </div>
          
        </div>
      </section>
      
    </div>
  );
}