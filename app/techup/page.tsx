import Image from "next/image";
import Link from "next/link";
import SectionHeader from "../../components/SectionHeader";
import { ChapterWrapper } from "../../components/ChapterWrapper";
import { AnimatedSection } from "../../components/AnimatedSection";
import { Badge } from "../../components/Badge";
import { CTASection } from "../../components/CTASection";

// Metadata for SEO
export const metadata = {
  title: "TechUp - Building Africa's Next Generation of Digital Builders",
  description: "TechUp is Forge's flagship in-school technology and innovation programme designed for Junior and Senior Secondary School students across Nigeria and Africa.",
};

// What makes TechUp different
const techupDifferentiators = [
  {
    title: "Built Into Schools",
    description: "Not weekend workshops that fade away. TechUp runs inside school systems, year after year.",
    icon: "🏫",
  },
  {
    title: "Six-Year Journey",
    description: "From digital basics to career-ready skills — built step by step, the right way.",
    icon: "📈",
  },
  {
    title: "Ethics First",
    description: "We teach responsible tech use, digital citizenship, and Nigerian cybercrime law from day one.",
    icon: "⚖️",
  },
  {
    title: "Real Projects",
    description: "Students build actual products, not just practice exercises. Every term ends with something real.",
    icon: "🛠️",
  },
  {
    title: "Clear Career Paths",
    description: "By graduation, students know what they're good at — and have the portfolio to prove it.",
    icon: "🎯",
  },
  {
    title: "Path to Entrepreneurship",
    description: "Top students move directly into LaunchPad, where they can turn their ideas into businesses.",
    icon: "🚀",
  },
];

// Junior Secondary curriculum areas
const juniorFoundation = [
  {
    area: "Design Thinking",
    description: "Visual communication and user-centered design",
    icon: "🎨",
  },
  {
    area: "Web Creation",
    description: "How websites work and how to build them",
    icon: "🌐",
  },
  {
    area: "Logical Thinking",
    description: "Problem-solving and intro to programming",
    icon: "🧩",
  },
  {
    area: "Data Literacy",
    description: "Understanding and working with data",
    icon: "📊",
  },
  {
    area: "Digital Teamwork",
    description: "Collaboration tools and online professionalism",
    icon: "🤝",
  },
  {
    area: "Digital Citizenship",
    description: "Online safety, privacy, and cybercrime basics",
    icon: "🛡️",
  },
];

// Senior Secondary Pathways
const seniorPathways = [
  {
    name: "Builder",
    tagline: "Technology Creators",
    description: "For students who want to create software and digital systems. Learn to code, build databases, deploy apps, and understand how tech infrastructure works.",
    color: "from-blue-500/20 to-blue-500/5",
    borderColor: "border-blue-500/30",
    textColor: "text-blue-400",
    icon: "💻",
    outcomes: ["Full-stack development skills", "Portfolio of working apps", "Understanding of system design"],
  },
  {
    name: "Strategist",
    tagline: "Problem Solvers & Future Founders",
    description: "For students drawn to business, analysis, and leadership. Learn user research, product validation, data interpretation, and how to design ventures.",
    color: "from-emerald-500/20 to-emerald-500/5",
    borderColor: "border-emerald-500/30",
    textColor: "text-emerald-400",
    icon: "📊",
    outcomes: ["Product and market analysis", "Data-driven decision making", "Business model development"],
  },
  {
    name: "Storyteller",
    tagline: "Designers & Communicators",
    description: "For students with creative strengths. Master interface design, visual storytelling, content creation, and brand building — making technology accessible and beautiful.",
    color: "from-purple-500/20 to-purple-500/5",
    borderColor: "border-purple-500/30",
    textColor: "text-purple-400",
    icon: "🎨",
    outcomes: ["Professional design portfolio", "Content creation expertise", "User experience mastery"],
  },
];

// Programme components
const programmeComponents = [
  {
    title: "Hands-On Skills",
    description: "Design, development, data, and digital tools — appropriate to each level.",
  },
  {
    title: "Real Projects",
    description: "Every term, students solve real problems — not just textbook exercises.",
  },
  {
    title: "Digital Ethics",
    description: "Responsible online behavior, privacy, ethical AI use, and content standards.",
  },
  {
    title: "Cybercrime Law",
    description: "Understanding Nigerian Cybercrimes Act (2015) — from identity protection to fraud prevention.",
  },
  {
    title: "Team Collaboration",
    description: "Mixed teams mirror real work — builders, strategists, and storytellers working together.",
  },
  {
    title: "Professional Profiles",
    description: "LinkedIn, freelancing platforms, and portfolio development for career readiness.",
  },
];

// School partnership benefits
const partnershipBenefits = [
  {
    title: "Teacher Training",
    description: "We train your teachers, not replace them. Full facilitator support included.",
    icon: "👨‍🏫",
  },
  {
    title: "Complete Materials",
    description: "Teaching guides, lesson plans, and assessment tools all provided.",
    icon: "📚",
  },
  {
    title: "Works Anywhere",
    description: "Designed for low-resource settings — limited devices and slow internet included.",
    icon: "⚡",
  },
  {
    title: "Quality Checks",
    description: "Regular monitoring and improvement to ensure consistent results.",
    icon: "✅",
  },
];

// Impact numbers
const impactStats = [
  { value: "10+", label: "Schools Running TechUp" },
  { value: "2,500+", label: "Students Trained" },
  { value: "30+", label: "Workshops Delivered" },
  { value: "3", label: "Career Pathways" },
];

// FAQs
const faqs = [
  {
    question: "What age is TechUp for?",
    answer: "TechUp is for secondary school students from JSS1 (age 10-11) through SS3 (age 16-17). The curriculum grows with them over six years."
  },
  {
    question: "Does it replace our computer classes?",
    answer: "No. TechUp adds real, practical skills on top of what you already teach. We work with schools, not against them."
  },
  {
    question: "What equipment do we need?",
    answer: "TechUp works with basic devices and slow internet. We design for real African schools, not ideal conditions."
  },
  {
    question: "What about our teachers?",
    answer: "We train them. TechUp strengthens your teachers with curriculum, guides, and ongoing support. We're building school capacity, not creating dependency."
  },
  {
    question: "What happens to top students?",
    answer: "They get identified early and prepared for Forge's LaunchPad program — where they can access funding and mentorship to build their own ventures."
  },
  {
    question: "Is this only for private schools?",
    answer: "Absolutely not. TechUp is designed for both public and private schools, including low-resource environments. Every Nigerian student deserves this."
  },
];

export default function TechUpPage() {
  return (
    <ChapterWrapper chapter="ignition">

      {/* ==================== HERO SECTION ==================== */}
      <section className="relative section-padding flex items-center min-h-[75vh] overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/techup/hero-techup1.jpg"
            alt=""
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-env-bg-primary via-env-bg-primary/95 to-env-bg-primary/80" />
        </div>

        {/* Decorative elements */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-chapter-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container-forge relative z-10">
          <div className="max-w-4xl">

            <AnimatedSection animation="fade-up">
              <div className="flex items-center space-x-3 mb-6">
                <span className="text-5xl">🎓</span>
                <Badge status="active" pulse>Flagship Programme</Badge>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-env-primary mb-6 leading-tight">
                TechUp
              </h1>

              <p className="text-xl md:text-2xl text-chapter-accent font-medium mb-6">
                Training students to build technology,
                <br />
                not just use it.
              </p>

              <p className="text-lg text-env-secondary leading-relaxed mb-8 max-w-2xl">
                A six-year program built into schools — taking students from digital basics all the way to career-ready skills.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-chapter-accent hover:bg-chapter-accent-hover text-white font-medium rounded-lg transition-smooth glow text-center hover-lift"
                >
                  Bring TechUp to Your School
                </Link>
                <a
                  href="#how-it-works"
                  className="px-8 py-4 bg-env-surface hover:bg-env-surface-hover text-env-primary font-medium rounded-lg border border-env-border transition-smooth text-center hover-lift"
                >
                  See How It Works
                </a>
              </div>
            </AnimatedSection>

          </div>
        </div>
      </section>

      {/* ==================== THE PROBLEM ==================== */}
      <section className="section-padding bg-env-secondary">
        <div className="container-forge">

          <AnimatedSection animation="fade-up">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-wider text-chapter-accent bg-chapter-accent-soft rounded-full border border-chapter-accent/20">
                The Problem
              </span>

              <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-6">
                Millions of young Nigerians leave school without the skills they need.
              </h2>

              <p className="text-lg text-env-secondary leading-relaxed mb-8">
                They can use apps — but they can't build them.
                <br />
                They consume content — but they can't create it.
                <br />
                <span className="text-env-primary font-medium">In a world shaped by technology, this is dangerous.</span>
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="p-6 rounded-xl bg-red-500/10 border border-red-500/20">
                  <p className="text-red-400 font-medium">Traditional ICT</p>
                  <p className="text-env-secondary text-sm mt-2">Teaches tools, not skills</p>
                </div>
                <div className="p-6 rounded-xl bg-red-500/10 border border-red-500/20">
                  <p className="text-red-400 font-medium">Weekend Workshops</p>
                  <p className="text-env-secondary text-sm mt-2">Exciting, but don't last</p>
                </div>
                <div className="p-6 rounded-xl bg-red-500/10 border border-red-500/20">
                  <p className="text-red-400 font-medium">Online Courses</p>
                  <p className="text-env-secondary text-sm mt-2">Need access most don't have</p>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-chapter-accent/10 border border-chapter-accent/20">
                <p className="text-xl text-env-primary font-medium">
                  TechUp is different. We work <span className="text-chapter-accent">inside schools, over years</span> — not weekends.
                </p>
              </div>
            </div>
          </AnimatedSection>

        </div>
      </section>

      {/* ==================== IMPACT SNAPSHOT ==================== */}
      <section className="section-padding">
        <div className="container-forge">

          <AnimatedSection animation="fade-up">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {impactStats.map((stat, index) => (
                <div key={index} className="text-center p-6 rounded-xl bg-env-surface border border-env-border">
                  <div className="text-3xl md:text-4xl font-bold text-chapter-accent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-env-secondary text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

        </div>
      </section>

      {/* ==================== HOW IT WORKS ==================== */}
      <section id="how-it-works" className="section-padding bg-env-secondary scroll-mt-20">
        <div className="container-forge">

          <SectionHeader
            label="The Journey"
            title="How TechUp Works"
            description="A clear path from digital basics to career-ready skills."
          />

          <AnimatedSection animation="fade-up">
            <div className="max-w-5xl mx-auto">

              {/* Journey Visual */}
              <div className="relative mb-12">
                <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-env-border -translate-y-1/2" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">

                  {/* Stage 1 */}
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/20 border-4 border-emerald-500/30 flex items-center justify-center relative z-10">
                      <span className="text-2xl">🌱</span>
                    </div>
                    <h3 className="text-xl font-bold text-env-primary mb-2">Junior Secondary</h3>
                    <p className="text-emerald-400 font-medium mb-2">JSS1 – JSS3</p>
                    <p className="text-env-secondary text-sm">
                      Everyone explores design, coding, data, and digital citizenship.
                    </p>
                  </div>

                  {/* Stage 2 */}
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-500/20 border-4 border-purple-500/30 flex items-center justify-center relative z-10">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <h3 className="text-xl font-bold text-env-primary mb-2">Senior Secondary</h3>
                    <p className="text-purple-400 font-medium mb-2">SS1 – SS3</p>
                    <p className="text-env-secondary text-sm">
                      Students choose: Builder, Strategist, or Storyteller.
                    </p>
                  </div>

                  {/* Stage 3 */}
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-chapter-accent/20 border-4 border-chapter-accent/30 flex items-center justify-center relative z-10">
                      <span className="text-2xl">🚀</span>
                    </div>
                    <h3 className="text-xl font-bold text-env-primary mb-2">Graduation</h3>
                    <p className="text-chapter-accent font-medium mb-2">Career Ready</p>
                    <p className="text-env-secondary text-sm">
                      Portfolio, professional presence, and pathway to LaunchPad.
                    </p>
                  </div>

                </div>
              </div>

              <div className="p-6 rounded-xl bg-env-surface border border-env-border text-center">
                <p className="text-env-primary font-medium">
                  Not a crash course. A <span className="text-chapter-accent">six-year capability pipeline</span> that produces graduates who can compete globally.
                </p>
              </div>

            </div>
          </AnimatedSection>

        </div>
      </section>

      {/* ==================== JUNIOR SECONDARY ==================== */}
      <section className="section-padding">
        <div className="container-forge">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            <AnimatedSection animation="fade-right">
              <div>
                <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                  Stage 1: Junior Secondary
                </span>

                <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-6">
                  Building the Foundation
                </h2>

                <p className="text-lg text-env-secondary leading-relaxed mb-6">
                  In junior years, <strong className="text-env-primary">every student</strong> gets to explore everything — design, coding, data, and digital teamwork.
                </p>

                <p className="text-env-secondary leading-relaxed mb-6">
                  No one gets left behind. No early tracking. Just broad exposure so that when they choose a path later, it's based on real experience.
                </p>

                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <p className="text-env-primary text-sm font-medium">
                    <span className="text-emerald-400">Goal:</span> Remove the fear. Show students they can create, not just consume.
                  </p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-left" delay={200}>
              <div className="grid grid-cols-2 gap-4">
                {juniorFoundation.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl bg-env-surface border border-env-border hover:border-emerald-500/30 transition-smooth"
                  >
                    <span className="text-2xl mb-2 block">{item.icon}</span>
                    <h4 className="font-semibold text-env-primary text-sm mb-1">{item.area}</h4>
                    <p className="text-env-tertiary text-xs">{item.description}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>

          </div>

        </div>
      </section>

      {/* ==================== SENIOR PATHWAYS ==================== */}
      <section className="section-padding bg-env-secondary">
        <div className="container-forge">

          <SectionHeader
            label="Stage 2: Senior Secondary"
            title="Choose Your Path"
            description="At SS1, students pick their path based on interest and strength. Each one leads to real, marketable skills."
          />

          <div className="space-y-6">
            {seniorPathways.map((pathway, index) => (
              <AnimatedSection key={pathway.name} animation="fade-up" delay={index * 100}>
                <div className={`p-6 md:p-8 rounded-2xl bg-gradient-to-r ${pathway.color} border ${pathway.borderColor}`}>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">

                    {/* Pathway Info */}
                    <div className="lg:col-span-2">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-4xl">{pathway.icon}</span>
                        <div>
                          <h3 className="text-2xl font-bold text-env-primary">{pathway.name}</h3>
                          <p className={`${pathway.textColor} font-medium`}>{pathway.tagline}</p>
                        </div>
                      </div>
                      <p className="text-env-secondary leading-relaxed">
                        {pathway.description}
                      </p>
                    </div>

                    {/* Outcomes */}
                    <div className="p-4 rounded-xl bg-env-surface/50 border border-env-border">
                      <h4 className="font-semibold text-env-primary mb-3 text-sm">You Graduate With:</h4>
                      <ul className="space-y-2">
                        {pathway.outcomes.map((outcome, i) => (
                          <li key={i} className="flex items-start text-env-secondary text-sm">
                            <svg className={`w-4 h-4 ${pathway.textColor} mr-2 mt-0.5 flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {outcome}
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* How Pathways Work Together */}
          <AnimatedSection animation="fade-up" delay={300}>
            <div className="mt-8 p-6 rounded-xl bg-env-surface border border-env-border text-center max-w-3xl mx-auto">
              <h4 className="font-semibold text-env-primary mb-3">They Work Better Together</h4>
              <p className="text-env-secondary text-sm">
                In final projects, students form mixed teams — just like real companies. Builders create the tech. Strategists figure out the market. Storytellers make it beautiful.
                <span className="text-chapter-accent font-medium"> That's how real innovation works.</span>
              </p>
            </div>
          </AnimatedSection>

        </div>
      </section>

      {/* ==================== WHAT'S INCLUDED ==================== */}
      <section className="section-padding">
        <div className="container-forge">

          <SectionHeader
            label="Complete Program"
            title="What Every Student Gets"
            description="Tech skills are just the beginning. We teach the whole picture."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programmeComponents.map((component, index) => (
              <AnimatedSection key={index} animation="fade-up" delay={index * 75}>
                <div className="p-6 rounded-xl bg-env-surface border border-env-border hover:border-chapter-accent/30 transition-smooth h-full">
                  <h3 className="text-lg font-semibold text-env-primary mb-2">{component.title}</h3>
                  <p className="text-env-secondary text-sm leading-relaxed">{component.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection animation="fade-up" delay={400}>
            <div className="mt-8 p-6 rounded-xl bg-chapter-accent/10 border border-chapter-accent/20 text-center max-w-3xl mx-auto">
              <p className="text-env-primary font-medium">
                <span className="text-chapter-accent">Ethics and responsible use</span> aren't extras. They're woven into every lesson — because building powerful things requires wisdom.
              </p>
            </div>
          </AnimatedSection>

        </div>
      </section>

      {/* ==================== GRADUATION READINESS ==================== */}
      <section className="section-padding bg-env-secondary">
        <div className="container-forge">

          <AnimatedSection animation="fade-up">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-wider text-chapter-accent bg-chapter-accent-soft rounded-full border border-chapter-accent/20">
                Graduation Requirements
              </span>

              <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-6">
                Students Don't Just Graduate.
                <br />
                They Launch.
              </h2>

              <p className="text-lg text-env-secondary leading-relaxed mb-8">
                By SS3, every TechUp student has proof — professional profiles, real portfolios, and the confidence to start working or building.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">

            <AnimatedSection animation="fade-right">
              <div className="p-6 rounded-xl bg-env-surface border border-env-border h-full">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">💼</span>
                  <h3 className="text-xl font-bold text-env-primary">LinkedIn Profile</h3>
                </div>
                <p className="text-env-secondary text-sm mb-4">Every graduate has:</p>
                <ul className="space-y-2 text-env-secondary text-sm">
                  <li className="flex items-start">
                    <span className="text-chapter-accent mr-2">•</span>
                    Complete profile with professional photo
                  </li>
                  <li className="flex items-start">
                    <span className="text-chapter-accent mr-2">•</span>
                    Summary matching their pathway
                  </li>
                  <li className="flex items-start">
                    <span className="text-chapter-accent mr-2">•</span>
                    Projects documented
                  </li>
                  <li className="flex items-start">
                    <span className="text-chapter-accent mr-2">•</span>
                    Connections with mentors
                  </li>
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-left" delay={100}>
              <div className="p-6 rounded-xl bg-env-surface border border-env-border h-full">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">🌐</span>
                  <h3 className="text-xl font-bold text-env-primary">Freelancing Profile</h3>
                </div>
                <p className="text-env-secondary text-sm mb-4">Active on at least one platform:</p>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {["Fiverr", "Upwork", "Toptal", "Local Sites"].map((platform, i) => (
                    <div key={i} className="p-2 rounded-lg bg-env-bg-primary/50 text-center">
                      <span className="text-env-primary text-sm">{platform}</span>
                    </div>
                  ))}
                </div>
                <p className="text-env-tertiary text-xs">
                  With services listed and portfolio work uploaded.
                </p>
              </div>
            </AnimatedSection>

          </div>

          <AnimatedSection animation="fade-up" delay={200}>
            <div className="mt-8 p-6 rounded-xl bg-purple-500/10 border border-purple-500/20 text-center max-w-3xl mx-auto">
              <p className="text-env-primary font-medium">
                <span className="text-purple-400">Top graduates?</span> They move directly to
                <Link href="/launchpad" className="text-chapter-accent hover:underline ml-1">
                  LaunchPad
                </Link>
                — where they get funding and support to build their own ventures.
              </p>
            </div>
          </AnimatedSection>

        </div>
      </section>

      {/* ==================== WHAT MAKES DIFFERENT ==================== */}
      <section className="section-padding">
        <div className="container-forge">

          <SectionHeader
            label="Our Approach"
            title="What Makes TechUp Different"
            description="We're not another training program. We're building a system that lasts."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techupDifferentiators.map((item, index) => (
              <AnimatedSection key={index} animation="fade-up" delay={index * 75}>
                <div className="p-6 rounded-xl bg-env-surface border border-env-border hover:border-chapter-accent/30 transition-smooth hover-lift h-full">
                  <span className="text-3xl mb-4 block">{item.icon}</span>
                  <h3 className="text-lg font-semibold text-env-primary mb-2">{item.title}</h3>
                  <p className="text-env-secondary text-sm leading-relaxed">{item.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

        </div>
      </section>

      {/* ==================== FOR SCHOOLS ==================== */}
      <section className="section-padding bg-env-secondary">
        <div className="container-forge">

          <SectionHeader
            label="School Partnership"
            title="Bringing TechUp to Your School"
            description="We don't replace teachers — we strengthen them. TechUp works within your existing structure."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {partnershipBenefits.map((benefit, index) => (
              <AnimatedSection key={index} animation="fade-up" delay={index * 75}>
                <div className="p-6 rounded-xl bg-env-surface border border-env-border text-center h-full">
                  <span className="text-3xl mb-3 block">{benefit.icon}</span>
                  <h3 className="font-semibold text-env-primary mb-2">{benefit.title}</h3>
                  <p className="text-env-secondary text-sm">{benefit.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection animation="fade-up" delay={300}>
            <div className="p-6 rounded-xl bg-env-surface border border-env-border max-w-3xl mx-auto">
              <h4 className="font-semibold text-env-primary mb-4 text-center">TechUp Works In:</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["Public Schools", "Private Schools", "Low-Resource Areas", "Urban & Rural"].map((item, i) => (
                  <div key={i} className="p-3 rounded-lg bg-chapter-accent/10 border border-chapter-accent/20 text-center">
                    <span className="text-env-primary text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

        </div>
      </section>

      {/* ==================== FAQ ==================== */}
      <section className="section-padding">
        <div className="container-forge">

          <SectionHeader
            label="Questions"
            title="Common Questions"
            description="What schools, parents, and partners usually ask."
          />

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <AnimatedSection key={index} animation="fade-up" delay={index * 50}>
                <div className="p-6 rounded-xl bg-env-surface border border-env-border">
                  <h3 className="text-lg font-semibold text-env-primary mb-2">{faq.question}</h3>
                  <p className="text-env-secondary leading-relaxed">{faq.answer}</p>
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

              <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-6">
                Africa can't be built by people who only know how to use apps.
              </h2>

              <p className="text-xl text-env-secondary leading-relaxed mb-8">
                We need young people who understand how technology works — and who have the skills, ethics, and courage to build systems that serve their own communities.
              </p>

              <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-chapter-accent/10 to-purple-500/10 border border-chapter-accent/20">
                <p className="text-lg text-env-secondary mb-4">
                  Before Africa can scale technology,
                </p>
                <p className="text-2xl md:text-3xl text-chapter-accent font-bold mb-4">
                  we must first scale builders.
                </p>
                <p className="text-lg text-env-primary font-medium">
                  TechUp is where they begin.
                </p>
              </div>
            </div>
          </AnimatedSection>

        </div>
      </section>

      {/* ==================== CTA ==================== */}
      <CTASection
        badge="Get Started"
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
