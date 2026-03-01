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
    title: "Embedded in Schools",
    description: "Not weekend workshops. TechUp runs inside school systems, integrated with academic calendars and teacher structures.",
    icon: "🏫",
  },
  {
    title: "Progressive Curriculum",
    description: "A deliberate 6-year journey from digital literacy to career-ready specialisation.",
    icon: "📈",
  },
  {
    title: "Ethics & Legal Awareness",
    description: "Digital citizenship, cybercrime law and responsible technology use are woven throughout — not added as afterthoughts.",
    icon: "⚖️",
  },
  {
    title: "Real Project Experience",
    description: "Students build actual products, not just complete exercises. Every term ends with tangible portfolio work.",
    icon: "🛠️",
  },
  {
    title: "Career Pathway Clarity",
    description: "By graduation, students know exactly what they're good at — and have the profiles to prove it.",
    icon: "🎯",
  },
  {
    title: "Innovation Pipeline",
    description: "Outstanding students are identified early and prepared for Forge's LaunchPad entrepreneurship programme.",
    icon: "🚀",
  },
];

// Junior Secondary curriculum areas
const juniorFoundation = [
  {
    area: "Design & Creative Thinking",
    description: "Visual communication, layout fundamentals and user-centered thinking",
    icon: "🎨",
  },
  {
    area: "Web & Digital Creation",
    description: "How websites work, basic HTML/CSS and content publishing",
    icon: "🌐",
  },
  {
    area: "Logical & Computational Thinking",
    description: "Problem breakdown, sequencing and introduction to programming concepts",
    icon: "🧩",
  },
  {
    area: "Data & Information Literacy",
    description: "Understanding data, simple analysis and digital research skills",
    icon: "📊",
  },
  {
    area: "Digital Collaboration",
    description: "Teamwork tools, online communication and professional digital behaviour",
    icon: "🤝",
  },
  {
    area: "Safety & Digital Citizenship",
    description: "Online safety, privacy awareness and introduction to cybercrime law",
    icon: "🛡️",
  },
];

// Senior Secondary Pathways
const seniorPathways = [
  {
    name: "Builder",
    tagline: "Technology Creators",
    description: "Students who want to create software, applications and digital systems. They learn to code, build databases, deploy applications and understand how technology infrastructure works.",
    color: "from-blue-500/20 to-blue-500/5",
    borderColor: "border-blue-500/30",
    textColor: "text-blue-400",
    icon: "💻",
    outcomes: ["Full-stack development skills", "Portfolio of working applications", "Understanding of system architecture"],
  },
  {
    name: "Strategist",
    tagline: "Product Thinkers & Future Founders",
    description: "Students drawn to business, analysis and leadership. They learn user research, product validation, data interpretation and venture design — preparing them to lead teams and build companies.",
    color: "from-emerald-500/20 to-emerald-500/5",
    borderColor: "border-emerald-500/30",
    textColor: "text-emerald-400",
    icon: "📊",
    outcomes: ["Product and market analysis", "Data-driven decision making", "Business model creation"],
  },
  {
    name: "Storyteller",
    tagline: "Designers & Digital Communicators",
    description: "Students with creative and communication strengths. They master interface design, visual storytelling, content creation and brand building — the people who make technology accessible and compelling.",
    color: "from-purple-500/20 to-purple-500/5",
    borderColor: "border-purple-500/30",
    textColor: "text-purple-400",
    icon: "🎨",
    outcomes: ["Professional design portfolio", "Content creation expertise", "User experience competence"],
  },
];

// Programme components (including ethics/legal)
const programmeComponents = [
  {
    title: "Technical Skills Training",
    description: "Hands-on instruction in design, development, data and digital tools appropriate to each level.",
  },
  {
    title: "Project-Based Learning",
    description: "Every term includes real projects addressing real problems — not theoretical exercises.",
  },
  {
    title: "Digital Ethics & Citizenship",
    description: "Responsible online behaviour, privacy protection, ethical AI use and content creation standards.",
  },
  {
    title: "Nigerian Cybercrimes Act (2015)",
    description: "Understanding of legal frameworks governing digital conduct, from identity protection to fraud prevention.",
  },
  {
    title: "Team Collaboration",
    description: "Mixed-pathway teams mirror real product development — builders, strategists and storytellers working together.",
  },
  {
    title: "Professional Presence",
    description: "LinkedIn profiles, freelancing platforms and portfolio development for career readiness.",
  },
];

// School partnership benefits
const partnershipBenefits = [
  {
    title: "Teacher Enablement",
    description: "We train your educators, not replace them. Facilitator certification and ongoing support included.",
    icon: "👨‍🏫",
  },
  {
    title: "Curriculum Materials",
    description: "Complete teaching guides, lesson plans and assessment frameworks provided.",
    icon: "📚",
  },
  {
    title: "Flexible Delivery",
    description: "Designed for mixed-resource environments — works with limited devices and low connectivity.",
    icon: "⚡",
  },
  {
    title: "Quality Assurance",
    description: "Regular monitoring, evaluation and improvement cycles to ensure consistent outcomes.",
    icon: "✅",
  },
];

// Impact numbers
const impactStats = [
  { value: "10+", label: "Schools Running TechUp" },
  { value: "2,500+", label: "Students Trained" },
  { value: "30+", label: "Workshops Delivered" },
  { value: "3", label: "Specialisation Pathways" },
];

// FAQs
const faqs = [
  {
    question: "What age group is TechUp designed for?",
    answer: "TechUp serves secondary school students from JSS1 (approximately age 10-11) through SS3 (approximately age 16-17). The curriculum is age-appropriate and progressively builds skills across six years."
  },
  {
    question: "Does TechUp replace existing computer studies?",
    answer: "No. TechUp complements and enhances existing computer education by adding practical, career-relevant skills that go beyond traditional curricula. We work alongside school systems, not against them."
  },
  {
    question: "What equipment do schools need?",
    answer: "TechUp is designed for real African school environments — including low to mid-range devices and limited internet connectivity. We adapt delivery to work within your constraints."
  },
  {
    question: "How are teachers involved?",
    answer: "Teachers are central to TechUp. We provide structured training, curriculum guides and ongoing support. Our goal is to strengthen school capacity, not create dependency on external facilitators."
  },
  {
    question: "What happens to outstanding students?",
    answer: "Exceptional students are identified early, mentored and prepared for Forge's LaunchPad programme — where they can access funding, mentorship and support to build their own ventures."
  },
  {
    question: "Is this only for urban or private schools?",
    answer: "Absolutely not. TechUp is intentionally designed for both public and private schools, including mixed-resource environments. Digital education should reach every Nigerian student."
  },
];

export default function TechUpPage() {
  return (
    <ChapterWrapper chapter="ignition">

      {/* ==================== HERO SECTION ==================== */}
      <section className="relative section-padding flex items-center min-h-[80vh] overflow-hidden">
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

              <p className="text-xl md:text-2xl text-chapter-accent font-medium mb-4">
                Preparing Young Africans to Build — Not Just Use — Technology
              </p>

              <p className="text-lg text-env-secondary leading-relaxed mb-8 max-w-2xl">
                A structured, school-embedded programme that transforms secondary school students
                into capable digital builders, thinkers and creators over six deliberate years.
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

      {/* ==================== THE GAP WE FILL ==================== */}
      <section className="section-padding bg-env-secondary">
        <div className="container-forge">

          <AnimatedSection animation="fade-up">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-wider text-chapter-accent bg-chapter-accent-soft rounded-full border border-chapter-accent/20">
                The Challenge
              </span>

              <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-6">
                Every year, millions of young Nigerians leave school without the skills the economy needs.
              </h2>

              <p className="text-lg text-env-secondary leading-relaxed mb-8">
                They can use phones and apps — but they cannot build them. They consume digital content —
                but they cannot create it. In a world increasingly shaped by technology, this is a national vulnerability.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="p-6 rounded-xl bg-red-500/10 border border-red-500/20">
                  <p className="text-red-400 font-medium">Traditional ICT</p>
                  <p className="text-env-secondary text-sm mt-2">Teaches tools, not thinking</p>
                </div>
                <div className="p-6 rounded-xl bg-red-500/10 border border-red-500/20">
                  <p className="text-red-400 font-medium">Weekend Workshops</p>
                  <p className="text-env-secondary text-sm mt-2">Inspire briefly, fade quickly</p>
                </div>
                <div className="p-6 rounded-xl bg-red-500/10 border border-red-500/20">
                  <p className="text-red-400 font-medium">Online Courses</p>
                  <p className="text-env-secondary text-sm mt-2">Require access most don't have</p>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-chapter-accent/10 border border-chapter-accent/20">
                <p className="text-xl text-env-primary font-medium">
                  TechUp is different. We embed inside school systems and build capability
                  <span className="text-chapter-accent"> systematically, over years — not weekends.</span>
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

      {/* ==================== HOW IT WORKS - OVERVIEW ==================== */}
      <section id="how-it-works" className="section-padding bg-env-secondary scroll-mt-20">
        <div className="container-forge">

          <SectionHeader
            label="The Journey"
            title="How TechUp Works"
            description="A clear, progressive pathway from digital literacy to career readiness."
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
                      Broad foundation. Every student explores design, coding, data and digital citizenship.
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
                      Specialisation. Students choose Builder, Strategist or Storyteller pathway.
                    </p>
                  </div>

                  {/* Stage 3 */}
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-chapter-accent/20 border-4 border-chapter-accent/30 flex items-center justify-center relative z-10">
                      <span className="text-2xl">🚀</span>
                    </div>
                    <h3 className="text-xl font-bold text-env-primary mb-2">Graduation & Beyond</h3>
                    <p className="text-chapter-accent font-medium mb-2">Career Ready</p>
                    <p className="text-env-secondary text-sm">
                      Portfolio, professional presence and pathway to LaunchPad for exceptional graduates.
                    </p>
                  </div>

                </div>
              </div>

              <div className="p-6 rounded-xl bg-env-surface border border-env-border text-center">
                <p className="text-env-primary font-medium">
                  This is not a crash course. It's a <span className="text-chapter-accent">6-year capability pipeline</span> designed
                  to produce graduates who can compete globally while solving African problems.
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
                  In the junior years, <strong className="text-env-primary">every student</strong> receives
                  broad exposure to digital skills. No early tracking. No exclusion. The goal is to build
                  confidence, curiosity and foundational competence.
                </p>

                <p className="text-env-secondary leading-relaxed mb-6">
                  Students explore multiple disciplines before choosing a specialisation — ensuring their
                  senior pathway reflects genuine interest and aptitude, not guesswork.
                </p>

                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <p className="text-env-primary text-sm font-medium">
                    <span className="text-emerald-400">Key principle:</span> Remove the fear of technology.
                    Show students they can create, not just consume.
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

      {/* ==================== SENIOR SECONDARY PATHWAYS ==================== */}
      <section className="section-padding bg-env-secondary">
        <div className="container-forge">

          <SectionHeader
            label="Stage 2: Senior Secondary"
            title="Choose Your Path"
            description="At SS1, students select one primary pathway based on interest, aptitude and career goals. Each path leads to real, marketable skills."
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
                      <h4 className="font-semibold text-env-primary mb-3 text-sm">What They Graduate With:</h4>
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
              <h4 className="font-semibold text-env-primary mb-3">Pathways Work Together</h4>
              <p className="text-env-secondary text-sm">
                In capstone projects, students form mixed teams — just like real product companies.
                Builders create the technology. Strategists validate the market. Storytellers communicate the value.
                <span className="text-chapter-accent font-medium"> This is how real innovation happens.</span>
              </p>
            </div>
          </AnimatedSection>

        </div>
      </section>

      {/* ==================== WHAT'S INCLUDED ==================== */}
      <section className="section-padding">
        <div className="container-forge">

          <SectionHeader
            label="Complete Programme"
            title="What Every TechUp Student Receives"
            description="TechUp is comprehensive by design. Technical skills are only part of the picture."
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
                <span className="text-chapter-accent">Ethics, legal awareness and professional conduct</span> are not
                add-ons or electives. They are woven throughout the curriculum at every level —
                because responsible technology use is non-negotiable.
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
                Students Don't Just Graduate. They Launch.
              </h2>

              <p className="text-lg text-env-secondary leading-relaxed mb-8">
                By SS3, every TechUp student has more than skills — they have proof. Professional profiles,
                real portfolios and the confidence to enter the workforce or start their own ventures.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">

            <AnimatedSection animation="fade-right">
              <div className="p-6 rounded-xl bg-env-surface border border-env-border h-full">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">💼</span>
                  <h3 className="text-xl font-bold text-env-primary">Professional LinkedIn Profile</h3>
                </div>
                <p className="text-env-secondary text-sm mb-4">Every graduate maintains:</p>
                <ul className="space-y-2 text-env-secondary text-sm">
                  <li className="flex items-start">
                    <span className="text-chapter-accent mr-2">•</span>
                    Complete profile with professional photo
                  </li>
                  <li className="flex items-start">
                    <span className="text-chapter-accent mr-2">•</span>
                    Summary aligned to their pathway
                  </li>
                  <li className="flex items-start">
                    <span className="text-chapter-accent mr-2">•</span>
                    Projects and achievements documented
                  </li>
                  <li className="flex items-start">
                    <span className="text-chapter-accent mr-2">•</span>
                    Connections with mentors and industry
                  </li>
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-left" delay={100}>
              <div className="p-6 rounded-xl bg-env-surface border border-env-border h-full">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">🌐</span>
                  <h3 className="text-xl font-bold text-env-primary">Freelancing Platform Presence</h3>
                </div>
                <p className="text-env-secondary text-sm mb-4">At least one active profile on:</p>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {["Fiverr", "Upwork", "Toptal", "Local Platforms"].map((platform, i) => (
                    <div key={i} className="p-2 rounded-lg bg-env-bg-primary/50 text-center">
                      <span className="text-env-primary text-sm">{platform}</span>
                    </div>
                  ))}
                </div>
                <p className="text-env-tertiary text-xs">
                  With services listed and at least one portfolio piece uploaded.
                </p>
              </div>
            </AnimatedSection>

          </div>

          <AnimatedSection animation="fade-up" delay={200}>
            <div className="mt-8 p-6 rounded-xl bg-purple-500/10 border border-purple-500/20 text-center max-w-3xl mx-auto">
              <p className="text-env-primary font-medium">
                <span className="text-purple-400">For exceptional graduates:</span> Direct pathway to
                <Link href="/launchpad" className="text-chapter-accent hover:underline ml-1">
                  Forge LaunchPad
                </Link>
                — where they can access funding, mentorship and support to build their own ventures.
              </p>
            </div>
          </AnimatedSection>

        </div>
      </section>

      {/* ==================== WHAT MAKES TECHUP DIFFERENT ==================== */}
      <section className="section-padding">
        <div className="container-forge">

          <SectionHeader
            label="Our Approach"
            title="What Makes TechUp Different"
            description="TechUp is not another training programme. It's a deliberate system designed for lasting impact."
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

      {/* ==================== FOR SCHOOLS & PARTNERS ==================== */}
      <section className="section-padding bg-env-secondary">
        <div className="container-forge">

          <SectionHeader
            label="School Partnership"
            title="Bringing TechUp to Your School"
            description="We don't replace teachers — we strengthen them. TechUp is designed to work within your existing school structure."
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
                {["Public Schools", "Private Schools", "Low-Resource Settings", "Urban & Rural"].map((item, i) => (
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
            description="What school administrators, parents and partners want to know."
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
                Our Commitment
              </span>

              <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-6">
                TechUp exists because Africa's future cannot be built by consumers alone.
              </h2>

              <p className="text-xl text-env-secondary leading-relaxed mb-8">
                We need young people who understand how technology works — and who have the skills,
                ethics and ambition to build systems that serve their own communities.
              </p>

              <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-chapter-accent/10 to-purple-500/10 border border-chapter-accent/20">
                <p className="text-lg text-env-secondary mb-4">
                  Before Africa can scale technology,
                </p>
                <p className="text-2xl md:text-3xl text-chapter-accent font-bold mb-4">
                  we must first scale builders.
                </p>
                <p className="text-lg text-env-primary font-medium">
                  TechUp is where those builders begin.
                </p>
              </div>
            </div>
          </AnimatedSection>

        </div>
      </section>

      {/* ==================== CTA ==================== */}
      <CTASection
        badge="Get Started"
        headline="Ready to bring TechUp to"
        highlightedText="your school?"
        description="Whether you're a school administrator, education official or organisation that believes in this vision — we'd love to hear from you. Let's build the next generation together."
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