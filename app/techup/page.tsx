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

// Government alignment priorities
const governmentPriorities = [
  "Digital literacy and inclusion",
  "Youth employability and entrepreneurship",
  "STEM and creative industry development",
  "Technology-driven economic growth",
  "Future-ready workforce preparation",
];

// Digital Ethics & Cyber Citizenship topics
const digitalEthicsTopics = [
  { title: "Responsible Digital Behaviour", description: "Online conduct, respectful communication and digital etiquette" },
  { title: "Data Privacy & Protection", description: "Personal data protection and privacy awareness" },
  { title: "Cyber Safety & Identity Protection", description: "Online risks, identity protection and safe browsing" },
  { title: "Ethical Use of Technology & AI", description: "Responsible use of AI tools and digital technologies" },
  { title: "Responsible Content Creation", description: "Ethical content creation, sharing and digital publishing" },
  { title: "Digital Rights & Responsibilities", description: "Understanding rights and civic duties online" },
];

// Cybercrime Act offences covered
const cybercrimeActTopics = [
  "Online impersonation and identity fraud",
  "Cyber fraud and financial crimes",
  "Identity theft and data breaches",
  "Unauthorised system access",
  "Online harassment and cyberbullying",
  "Distribution of harmful content",
];

// Junior Secondary curriculum areas
const juniorSecondaryAreas = [
  {
    title: "Digital Design & Creative Thinking",
    skills: [
      "Visual design fundamentals",
      "Layout, colour and typography",
      "User experience basics",
      "Product and problem framing",
    ],
    icon: "🎨",
  },
  {
    title: "Web & Digital Creation",
    skills: [
      "Introduction to HTML and web structure",
      "Basic CSS concepts",
      "How websites and web platforms work",
      "Responsible use of internet and digital tools",
    ],
    icon: "🌐",
  },
  {
    title: "Computational & Logical Thinking",
    skills: [
      "How systems work",
      "Breaking problems into steps",
      "Basic programming logic",
      "No memorisation culture",
    ],
    icon: "🧩",
  },
  {
    title: "Data & Information Skills",
    skills: [
      "Understanding data",
      "Simple data collection and organisation",
      "Charts, interpretation and digital reporting",
      "Digital research and information validation",
    ],
    icon: "📊",
  },
  {
    title: "Digital Productivity & Collaboration",
    skills: [
      "Digital documents and presentations",
      "Teamwork using technology",
      "Online collaboration culture",
      "Digital ethics and cyber awareness",
    ],
    icon: "🤝",
  },
];

// Junior Secondary Tools
const juniorToolCategories = [
  {
    category: "Design & Visual Thinking",
    tools: [
      { name: "Canva (Education)", description: "Simple layouts, posters, presentations and visual storytelling" },
      { name: "Figma (viewer + basic editor)", description: "Basic UI and layout thinking" },
      { name: "Google Drawings / PowerPoint", description: "Wireframes and idea sketches" },
    ],
  },
  {
    category: "Web & Digital Creation (Beginner)",
    tools: [
      { name: "WordPress (page builder)", description: "Simple website creation and content publishing" },
      { name: "CodePen", description: "Browser-based HTML/CSS practice" },
      { name: "JSFiddle (HTML/CSS)", description: "Simple page structure practice" },
      { name: "Visual Studio Code (optional)", description: "Exposure to real coding environment" },
    ],
  },
  {
    category: "Coding & Logical Thinking",
    tools: [
      { name: "Scratch", description: "Block-based logic and sequencing" },
      { name: "Scratch Offline Editor", description: "For low-internet environments" },
      { name: "Code.org Studio", description: "Structured beginner coding challenges" },
    ],
  },
  {
    category: "Data & Information Skills",
    tools: [
      { name: "Google Sheets", description: "Basic tables, charts and sorting" },
      { name: "Microsoft Excel", description: "Offline alternative for data work" },
    ],
  },
  {
    category: "Digital Productivity & Collaboration",
    tools: [
      { name: "Google Docs", description: "Reports and teamwork writing" },
      { name: "Google Slides", description: "Presentations and visual communication" },
      { name: "Microsoft Word / PowerPoint", description: "Offline-first alternatives" },
    ],
  },
  {
    category: "Research, Safety & Digital Citizenship",
    tools: [
      { name: "Google Search (guided use)", description: "Information literacy and research skills" },
      { name: "Google SafeSearch / school filtering", description: "Safe browsing culture" },
    ],
  },
  {
    category: "Basic Hardware & Making (optional)",
    tools: [
      { name: "Micro:bit", description: "Simple hardware and logic thinking" },
      { name: "Micro:bit MakeCode", description: "Block-based programming for hardware" },
    ],
  },
];

// Senior Secondary Pathways
const seniorPathways = [
  {
    name: "Builder",
    tagline: "Technology Creators & System Makers",
    icon: "💻",
    color: "from-blue-500/20 to-blue-500/5",
    borderColor: "border-blue-500/30",
    textColor: "text-blue-400",
    whatTheyLearn: [
      "HTML, CSS and JavaScript",
      "Application structure and architecture",
      "Backend concepts and APIs",
      "Databases and data storage",
      "Deployment and hosting",
      "Web and mobile application development",
      "Authentication and user management",
      "System integration",
      "Performance and reliability",
      "Basic hardware and IoT concepts",
      "Automation and sensor systems",
    ],
    howTheyLearn: [
      "Project-based development",
      "Product simulations inspired by Bitebank and Trego",
      "Team engineering sprints",
      "Peer reviews and demos",
    ],
    skillsAcquired: [
      "Real-world coding ability",
      "Technical problem-solving",
      "Debugging and testing",
      "Collaboration in technical teams",
      "Portfolio projects",
      "Understanding of digital infrastructure",
    ],
  },
  {
    name: "Strategist",
    tagline: "Product Thinkers & Founders-in-Training",
    icon: "📊",
    color: "from-emerald-500/20 to-emerald-500/5",
    borderColor: "border-emerald-500/30",
    textColor: "text-emerald-400",
    whatTheyLearn: [
      "User research and problem discovery",
      "Opportunity mapping",
      "Product framing and validation",
      "Product lifecycle and iteration",
      "Data collection and interpretation",
      "Dashboards and reporting",
      "Business models and venture design",
      "Market analysis",
      "Pricing and sustainability",
      "Go-to-market strategies",
      "Digital economy and public-sector alignment",
    ],
    howTheyLearn: [
      "Interviews and surveys",
      "Design sprints",
      "Data-driven reviews",
      "Startup and public-sector simulations",
    ],
    skillsAcquired: [
      "Product and market analysis",
      "Data literacy",
      "Venture modelling",
      "Strategic communication",
      "Leadership and coordination",
    ],
  },
  {
    name: "Storyteller",
    tagline: "Designers & Digital Communicators",
    icon: "🎨",
    color: "from-purple-500/20 to-purple-500/5",
    borderColor: "border-purple-500/30",
    textColor: "text-purple-400",
    whatTheyLearn: [
      "Visual and interface design",
      "Typography and colour systems",
      "Interaction and accessibility design",
      "Usability testing and user journeys",
      "Digital media production",
      "Storytelling and scripting",
      "Photography and video for campaigns",
      "Product positioning and messaging",
      "Community engagement",
    ],
    howTheyLearn: [
      "Redesigning real products",
      "Producing content for student projects",
      "Usability testing sessions",
      "Showcases and exhibitions",
    ],
    skillsAcquired: [
      "Digital design competence",
      "Communication and narrative skills",
      "User-centred design thinking",
      "Content production",
      "Presentation and pitching confidence",
    ],
  },
];

// Senior Secondary Tools by Track
const seniorToolTracks = [
  {
    track: "Track 1 – Software & Web Development",
    pathway: "Builder",
    tools: ["Visual Studio Code", "GitHub", "HTML, CSS, JavaScript", "Node.js", "Express.js", "Supabase or Firebase", "Postman", "Vercel or Netlify"],
  },
  {
    track: "Track 2 – Product & Digital Design",
    pathway: "Storyteller",
    tools: ["Figma (full workflows)", "FigJam", "Canva"],
  },
  {
    track: "Track 3 – Data & Analytics",
    pathway: "Strategist",
    tools: ["Google Sheets / Excel (advanced)", "Python", "Jupyter Notebook", "Pandas", "Matplotlib / Seaborn", "Power BI or Google Looker Studio"],
    note: "If devices are limited, Google Sheets and Looker Studio alone can be used.",
  },
  {
    track: "Track 4 – Emerging Tech & Digital Systems",
    pathway: "Builder",
    tools: ["Arduino boards", "Arduino IDE", "Tinkercad Circuits", "Raspberry Pi", "Python"],
  },
  {
    track: "Track 5 – Technology Entrepreneurship",
    pathway: "Strategist",
    tools: ["Canva", "Figma", "Notion", "Google Forms", "Google Sheets"],
  },
];

// Cross-track tools
const crossTrackTools = [
  { name: "GitHub Projects / Issues", description: "Project management and collaboration" },
  { name: "Google Drive", description: "File storage and sharing" },
  { name: "Slack or Discord", description: "Controlled, supervised team communication" },
];

// Professional presence platforms
const professionalPlatforms = {
  mandatory: [
    {
      name: "LinkedIn",
      requirements: [
        "Complete profile with all sections",
        "Professional photo uploaded",
        "Short summary aligned to pathway",
        "TechUp projects and roles listed",
        "Connected with mentors and facilitators",
      ],
    },
  ],
  freelancing: [
    {
      name: "Fiverr",
      description: "Creative and technical services marketplace",
    },
    {
      name: "Upwork",
      description: "Professional freelancing platform",
    },
    {
      name: "Toptal",
      description: "Where age requirements permit",
    },
    {
      name: "Local/Youth-Friendly Platforms",
      description: "Approved regional alternatives",
    },
  ],
};

// Project challenge areas
const projectAreas = [
  { name: "Education", icon: "📚" },
  { name: "Food Systems", icon: "🍽️" },
  { name: "Transportation", icon: "🚗" },
  { name: "Sustainability", icon: "🌱" },
  { name: "Finance", icon: "💰" },
  { name: "Community Services", icon: "🏘️" },
];

// Teacher and school support
const schoolSupport = [
  { title: "Structured Teacher Enablement", description: "Comprehensive training programs for educators", icon: "👨‍🏫" },
  { title: "Facilitator Training", description: "Practical delivery skills development", icon: "🎓" },
  { title: "Curriculum Guides", description: "Clear, structured teaching materials", icon: "📖" },
  { title: "Practical Teaching Tools", description: "Resources designed for real classrooms", icon: "🛠️" },
  { title: "Classroom Delivery Support", description: "Ongoing assistance and guidance", icon: "🤝" },
];

// Inclusion features
const inclusionFeatures = [
  "Public and private schools",
  "Mixed-resource environments",
  "Low to mid-range devices",
  "Offline and low-bandwidth contexts",
];

// Student outcomes
const studentOutcomes = [
  { title: "Real Digital & Design Skills", description: "Practical abilities that translate to real-world value" },
  { title: "Portfolio of Projects", description: "Tangible evidence of capabilities and growth" },
  { title: "Professional Experience", description: "Basic teamwork and collaboration skills" },
  { title: "Innovation Exposure", description: "Understanding of real innovation environments" },
  { title: "Problem-Solving Mindset", description: "Clear understanding of how technology solves African problems" },
];

// Partner outcomes
const partnerOutcomes = [
  { title: "Early Workforce Development", description: "Building digital capabilities from secondary school level" },
  { title: "Goal Alignment", description: "Stronger connection between school learning and national development" },
  { title: "Scalable Model", description: "Replicable approach for youth digital inclusion and innovation" },
];

// FAQs
const faqs = [
  { 
    question: "What age group is TechUp designed for?", 
    answer: "TechUp is designed for secondary school students from JSS1 (approximately age 10-11) through SS3 (approximately age 16-17). The curriculum is age-appropriate and progressively builds skills over the years." 
  },
  { 
    question: "Does TechUp replace existing computer studies?", 
    answer: "No. TechUp is designed to complement and enhance existing computer education, adding practical, career-relevant skills that go beyond traditional curricula." 
  },
  { 
    question: "What equipment do schools need?", 
    answer: "TechUp is designed for mixed-resource environments including low to mid-range devices and can work in offline and low-bandwidth contexts where necessary." 
  },
  { 
    question: "How are teachers supported?", 
    answer: "We provide structured teacher enablement, facilitator training, curriculum guides, practical teaching tools, and ongoing classroom delivery support. We strengthen schools, not replace teachers." 
  },
  { 
    question: "What happens to outstanding students?", 
    answer: "Outstanding students are identified early, mentored, and prepared for participation in Forge's LaunchPad innovation and entrepreneurship programmes, creating a continuous pathway from school to skills to innovation to enterprise." 
  },
  { 
    question: "Is TechUp only for urban or private schools?", 
    answer: "No. TechUp is intentionally designed for both public and private schools, including mixed-resource environments. Digital education should not be reserved for elite schools or urban centres alone." 
  },
  {
    question: "How does TechUp address digital safety and legal compliance?",
    answer: "All students complete mandatory training on digital ethics, cyber citizenship and the Nigerian Cybercrimes Act (2015). This ensures students understand their legal responsibilities and practice safe, ethical digital behaviour."
  },
  {
    question: "Do students need to create professional profiles?",
    answer: "Yes. SSS3 students are required to create and maintain professional LinkedIn profiles and at least one freelancing platform profile as part of graduation readiness. This is supervised and follows safeguarding policies."
  },
];

export default function TechUpPage() {
  return (
    <ChapterWrapper chapter="ignition">
      
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative section-padding flex items-center min-h-[70vh] overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/techup/hero-techup1.jpg"
            alt=""
            fill
            className="object-cover opacity-25"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-env-bg-primary via-env-bg-primary/95 to-env-bg-primary/80" />
        </div>

        {/* Decorative glows */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-chapter-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container-forge relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Hero Content */}
            <AnimatedSection animation="fade-right">
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <span className="text-5xl">🎓</span>
                  <Badge status="active" pulse>Flagship Programme</Badge>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-env-primary mb-6">
                  TechUp
                </h1>
                
                <p className="text-xl md:text-2xl text-chapter-accent font-medium mb-6">
                  Building Africa's Next Generation of Digital Builders
                </p>
                
                <p className="text-lg text-env-secondary leading-relaxed mb-8">
                  Forge's flagship in-school technology and innovation programme designed 
                  for Junior and Senior Secondary School students across Nigeria and Africa.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/contact"
                    className="px-8 py-4 bg-chapter-accent hover:bg-chapter-accent-hover text-white font-medium rounded-lg transition-smooth glow text-center hover-lift"
                  >
                    Partner With Us
                  </Link>
                  <a
                    href="#curriculum"
                    className="px-8 py-4 bg-env-surface hover:bg-env-surface-hover text-env-primary font-medium rounded-lg border border-env-border transition-smooth text-center hover-lift"
                  >
                    Explore Curriculum
                  </a>
                </div>
              </div>
            </AnimatedSection>
            
            {/* Hero Visual */}
            <AnimatedSection animation="fade-left" delay={200}>
              <div className="relative hidden lg:block">
                <div className="aspect-square rounded-2xl overflow-hidden border border-env-border relative">
                  <Image
                    src="/images/techup/classroom.jpg"
                    alt="Students learning digital skills in a TechUp classroom"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="absolute -top-4 -left-4 w-20 h-20 bg-chapter-accent-soft rounded-xl -z-10" />
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-500/10 rounded-2xl -z-10" />
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
                The Problem We Solve
              </span>
              
              <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-6">
                Young people leave school without practical skills
              </h2>
              
              <p className="text-lg text-env-secondary leading-relaxed mb-8">
                Young people leave school without practical digital, design and problem-solving skills 
                that match national development goals and the realities of today's economy.
              </p>
              
              <div className="p-6 rounded-xl bg-chapter-accent/10 border border-chapter-accent/20">
                <p className="text-xl text-env-primary font-medium">
                  TechUp closes that gap — <span className="text-chapter-accent">deliberately, systematically and at scale.</span>
                </p>
              </div>
            </div>
          </AnimatedSection>
          
        </div>
      </section>

      {/* ==================== GOVERNMENT ALIGNMENT ==================== */}
      <section className="section-padding">
        <div className="container-forge">
          
          <SectionHeader
            label="National Alignment"
            title="A Programme Aligned With Government Priorities"
            description="TechUp is designed to directly support government and education-sector objectives."
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <AnimatedSection animation="fade-right">
              <div className="space-y-4">
                {governmentPriorities.map((priority, index) => (
                  <div key={index} className="flex items-center p-4 rounded-xl bg-env-surface border border-env-border hover:border-chapter-accent/30 transition-smooth">
                    <div className="w-10 h-10 rounded-full bg-chapter-accent-soft flex items-center justify-center mr-4 flex-shrink-0">
                      <svg className="w-5 h-5 text-chapter-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-env-primary font-medium">{priority}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="fade-left" delay={200}>
              <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-chapter-accent/10 to-purple-500/10 border border-chapter-accent/20">
                <h3 className="text-xl font-bold text-env-primary mb-4">
                  Beyond Learning About Technology
                </h3>
                <p className="text-env-secondary leading-relaxed mb-6">
                  Our curriculum framework aligns with national digital economy and education transformation 
                  goals by ensuring that students do not only <em>learn about</em> technology, but learn 
                  <strong className="text-env-primary"> how to build with technology</strong>.
                </p>
                <div className="p-4 rounded-lg bg-env-surface/50">
                  <p className="text-sm text-env-secondary">
                    <span className="text-chapter-accent font-semibold">TechUp acts as a bridge between:</span><br/>
                    Public education systems → National digital strategies → Real industry practice
                  </p>
                </div>
              </div>
            </AnimatedSection>
            
          </div>
          
        </div>
      </section>

      {/* ==================== DIGITAL ETHICS & CYBERCRIME ACT ==================== */}
      <section className="section-padding bg-env-secondary">
        <div className="container-forge">
          
          <SectionHeader
            label="Core Foundation"
            title="Digital Ethics, Cyber Citizenship & Nigerian Cybercrime Act (2015)"
            description="A compulsory foundation subject for all TechUp learners — Junior and Senior Secondary."
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Digital Ethics Topics */}
            <AnimatedSection animation="fade-right">
              <div className="p-6 md:p-8 rounded-2xl bg-env-surface border border-env-border h-full">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">🛡️</span>
                  <h3 className="text-xl font-bold text-env-primary">Digital Ethics & Cyber Citizenship</h3>
                </div>
                <p className="text-env-secondary mb-6">
                  All students are trained in responsible digital behaviour and online conduct:
                </p>
                <div className="space-y-4">
                  {digitalEthicsTopics.map((topic, i) => (
                    <div key={i} className="p-4 rounded-lg bg-env-bg-primary/50 border border-env-border">
                      <h4 className="font-semibold text-env-primary mb-1">{topic.title}</h4>
                      <p className="text-env-secondary text-sm">{topic.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
            
            {/* Cybercrime Act */}
            <AnimatedSection animation="fade-left" delay={200}>
              <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">⚖️</span>
                  <h3 className="text-xl font-bold text-env-primary">Nigerian Cybercrimes Act (2015)</h3>
                </div>
                <p className="text-env-secondary mb-6">
                  Students learn the legal framework governing digital conduct in Nigeria under the 
                  <strong className="text-env-primary"> Cybercrimes (Prohibition, Prevention, etc.) Act, 2015</strong>:
                </p>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-env-primary mb-3">What Students Learn:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start text-env-secondary text-sm">
                      <svg className="w-5 h-5 text-chapter-accent mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      The purpose and scope of the Act
                    </li>
                    <li className="flex items-start text-env-secondary text-sm">
                      <svg className="w-5 h-5 text-chapter-accent mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Legal and civic responsibilities of digital citizens
                    </li>
                    <li className="flex items-start text-env-secondary text-sm">
                      <svg className="w-5 h-5 text-chapter-accent mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Applying digital skills within legal frameworks
                    </li>
                  </ul>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-env-primary mb-3">Cyber Offences Covered:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {cybercrimeActTopics.map((topic, i) => (
                      <div key={i} className="px-3 py-2 rounded-lg bg-env-surface/50 text-env-secondary text-sm">
                        • {topic}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="p-4 rounded-lg bg-env-surface border border-env-border">
                  <p className="text-sm text-env-secondary">
                    <span className="text-chapter-accent font-semibold">This strengthens alignment with:</span><br/>
                    National digital economy goals • Youth protection policies • Government education priorities
                  </p>
                </div>
              </div>
            </AnimatedSection>
            
          </div>
          
        </div>
      </section>

      {/* ==================== TWO-STAGE INTRO ==================== */}
      <section className="section-padding">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-wider text-chapter-accent bg-chapter-accent-soft rounded-full border border-chapter-accent/20">
                Structured Pathway
              </span>
              
              <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-6">
                A Two-Stage Learning Journey
              </h2>
              
              <p className="text-lg text-env-secondary leading-relaxed mb-8">
                TechUp is intentionally built as a progressive pathway from Junior to Senior Secondary School.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <span className="text-4xl mb-3 block">🌱</span>
                  <h3 className="text-xl font-bold text-env-primary mb-2">Junior Secondary</h3>
                  <p className="text-emerald-400 font-medium">Foundation for Every Student</p>
                </div>
                <div className="p-6 rounded-xl bg-purple-500/10 border border-purple-500/20">
                  <span className="text-4xl mb-3 block">🚀</span>
                  <h3 className="text-xl font-bold text-env-primary mb-2">Senior Secondary</h3>
                  <p className="text-purple-400 font-medium">Specialisation & Career Alignment</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
          
        </div>
      </section>

      {/* ==================== JUNIOR SECONDARY TRACK ==================== */}
      <section id="curriculum" className="section-padding bg-env-secondary scroll-mt-20">
        <div className="container-forge">
          
          <SectionHeader
            label="Stage 1: Junior Secondary"
            title="Foundation for Every Student"
            description="Expose early, remove fear of technology, and build creative and logical confidence."
          />
          
          <div className="mb-8">
            <AnimatedSection animation="fade-up">
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center max-w-2xl mx-auto">
                <p className="text-env-primary">
                  At the junior level, <strong>every learner</strong> passes through a broad, compulsory digital foundation.
                </p>
              </div>
            </AnimatedSection>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {juniorSecondaryAreas.map((area, index) => (
              <AnimatedSection key={area.title} animation="fade-up" delay={index * 100}>
                <div className="p-6 rounded-xl bg-env-surface border border-env-border hover:border-emerald-500/30 transition-smooth hover-lift h-full">
                  <span className="text-4xl mb-4 block">{area.icon}</span>
                  <h3 className="text-lg font-semibold text-env-primary mb-3">{area.title}</h3>
                  <ul className="space-y-2">
                    {area.skills.map((skill, i) => (
                      <li key={i} className="text-env-secondary text-sm flex items-start">
                        <span className="text-emerald-400 mr-2">•</span>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
            
            {/* Digital Ethics Card for Junior */}
            <AnimatedSection animation="fade-up" delay={500}>
              <div className="p-6 rounded-xl bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20 hover-lift h-full">
                <span className="text-4xl mb-4 block">⚖️</span>
                <h3 className="text-lg font-semibold text-env-primary mb-3">Digital Ethics & Cybercrime Law</h3>
                <ul className="space-y-2">
                  <li className="text-env-secondary text-sm flex items-start">
                    <span className="text-red-400 mr-2">•</span>
                    Nigerian Cybercrimes Act (2015)
                  </li>
                  <li className="text-env-secondary text-sm flex items-start">
                    <span className="text-red-400 mr-2">•</span>
                    Responsible digital citizenship
                  </li>
                  <li className="text-env-secondary text-sm flex items-start">
                    <span className="text-red-400 mr-2">•</span>
                    Online safety and privacy
                  </li>
                  <li className="text-env-secondary text-sm flex items-start">
                    <span className="text-red-400 mr-2">•</span>
                    Ethical use of AI and technology
                  </li>
                </ul>
              </div>
            </AnimatedSection>
          </div>
          
          {/* Junior Outcomes */}
          <AnimatedSection animation="fade-up" delay={300}>
            <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20">
              <h3 className="text-xl font-bold text-env-primary mb-4 text-center">
                By the End of Junior Secondary, Students:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {[
                  "Understand how technology is built",
                  "Can design, structure and present digital ideas",
                  "Can create simple web content",
                  "Can think analytically with data",
                  "Are confident navigating digital environments",
                ].map((outcome, i) => (
                  <div key={i} className="p-4 rounded-lg bg-env-surface/50 text-center">
                    <p className="text-env-primary text-sm font-medium">{outcome}</p>
                  </div>
                ))}
              </div>
              <p className="text-center text-env-tertiary text-sm mt-6">
                This phase is intentionally broad and inclusive — no early tracking, no premature specialisation. <strong className="text-env-secondary">Every learner is exposed.</strong>
              </p>
            </div>
          </AnimatedSection>
          
        </div>
      </section>

      {/* ==================== JUNIOR TOOLS SECTION ==================== */}
      <section className="section-padding">
        <div className="container-forge">
          
          <SectionHeader
            label="Junior Secondary Tools"
            title="Core Classroom Tools"
            description="Age-appropriate, industry-relevant and low-barrier tools for foundation, exposure and confidence-building."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {juniorToolCategories.map((category, index) => (
              <AnimatedSection key={category.category} animation="fade-up" delay={index * 75}>
                <div className="p-6 rounded-xl bg-env-surface border border-env-border hover:border-emerald-500/30 transition-smooth h-full">
                  <h3 className="text-lg font-semibold text-emerald-400 mb-4">{category.category}</h3>
                  <ul className="space-y-3">
                    {category.tools.map((tool, i) => (
                      <li key={i}>
                        <span className="font-medium text-env-primary text-sm">{tool.name}</span>
                        <p className="text-env-tertiary text-xs">{tool.description}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
          
          <AnimatedSection animation="fade-up" delay={400}>
            <div className="p-6 rounded-xl bg-amber-500/10 border border-amber-500/20 max-w-4xl mx-auto">
              <h4 className="font-semibold text-env-primary mb-3 text-center">Important Note</h4>
              <p className="text-env-secondary text-sm text-center mb-4">
                Junior students do <strong className="text-env-primary">not</strong> use:
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {["Real backend frameworks", "Production databases", "DevOps tools", "Professional analytics stacks"].map((item, i) => (
                  <span key={i} className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                    ✗ {item}
                  </span>
                ))}
              </div>
              <p className="text-env-tertiary text-sm text-center mt-4">
                Junior tools focus on <strong className="text-env-secondary">confidence, creativity, discovery and digital literacy</strong>.
              </p>
            </div>
          </AnimatedSection>
          
        </div>
      </section>

      {/* ==================== SENIOR SECONDARY PATHWAYS ==================== */}
      <section className="section-padding bg-env-secondary">
        <div className="container-forge">
          
          <SectionHeader
            label="Stage 2: Senior Secondary"
            title="Specialisation & Career Alignment"
            description="At SS1–SS3, students choose one primary pathway based on interest, aptitude and market relevance."
          />
          
          {/* Pathway Overview */}
          <AnimatedSection animation="fade-up">
            <div className="mb-12 p-6 rounded-xl bg-env-surface border border-env-border max-w-4xl mx-auto text-center">
              <h3 className="text-xl font-bold text-env-primary mb-4">Three Pathways — Three Core Roles</h3>
              <p className="text-env-secondary mb-6">
                The three paths represent the core roles found in real digital product teams:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <span className="text-3xl mb-2 block">💻</span>
                  <h4 className="font-bold text-blue-400">Builder</h4>
                  <p className="text-env-tertiary text-sm">Technology creators</p>
                </div>
                <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <span className="text-3xl mb-2 block">📊</span>
                  <h4 className="font-bold text-emerald-400">Strategist</h4>
                  <p className="text-env-tertiary text-sm">Product thinkers</p>
                </div>
                <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <span className="text-3xl mb-2 block">🎨</span>
                  <h4 className="font-bold text-purple-400">Storyteller</h4>
                  <p className="text-env-tertiary text-sm">Designers & communicators</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
          
          {/* Detailed Pathways */}
          <div className="space-y-8">
            {seniorPathways.map((pathway, index) => (
              <AnimatedSection key={pathway.name} animation="fade-up" delay={index * 150}>
                <div className={`p-6 md:p-8 rounded-2xl bg-gradient-to-br ${pathway.color} border ${pathway.borderColor}`}>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-5xl">{pathway.icon}</span>
                    <div>
                      <h3 className="text-2xl font-bold text-env-primary">{pathway.name} Path</h3>
                      <p className={`${pathway.textColor} font-medium`}>{pathway.tagline}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* What They Learn */}
                    <div className="p-4 rounded-xl bg-env-surface/50 border border-env-border">
                      <h4 className="font-semibold text-env-primary mb-3">What They Learn</h4>
                      <ul className="space-y-1">
                        {pathway.whatTheyLearn.map((item, i) => (
                          <li key={i} className="text-env-secondary text-sm flex items-start">
                            <span className={`${pathway.textColor} mr-2`}>•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* How They Learn */}
                    <div className="p-4 rounded-xl bg-env-surface/50 border border-env-border">
                      <h4 className="font-semibold text-env-primary mb-3">How They Learn</h4>
                      <ul className="space-y-2">
                        {pathway.howTheyLearn.map((item, i) => (
                          <li key={i} className="text-env-secondary text-sm flex items-start">
                            <svg className={`w-4 h-4 ${pathway.textColor} mr-2 mt-0.5 flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Skills Acquired */}
                    <div className="p-4 rounded-xl bg-env-surface/50 border border-env-border">
                      <h4 className="font-semibold text-env-primary mb-3">Skills Acquired</h4>
                      <div className="flex flex-wrap gap-2">
                        {pathway.skillsAcquired.map((skill, i) => (
                          <span key={i} className={`px-2 py-1 rounded-full text-xs ${pathway.color} border ${pathway.borderColor} text-env-secondary`}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
          
          {/* How Pathways Work Together */}
          <AnimatedSection animation="fade-up" delay={400}>
            <div className="mt-12 p-6 md:p-8 rounded-2xl bg-env-surface border border-env-border">
              <h3 className="text-xl font-bold text-env-primary mb-4 text-center">
                How the Three Pathways Work Together
              </h3>
              <p className="text-env-secondary text-center mb-6">
                Teams are formed using <strong className="text-env-primary">Builders</strong>, <strong className="text-env-primary">Strategists</strong> and <strong className="text-env-primary">Storytellers</strong>. Every team must:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                {["Design a solution", "Validate the problem", "Build a working prototype", "Communicate the value clearly"].map((item, i) => (
                  <div key={i} className="p-4 rounded-lg bg-chapter-accent/10 border border-chapter-accent/20 text-center">
                    <p className="text-env-primary text-sm font-medium">{item}</p>
                  </div>
                ))}
              </div>
              <p className="text-center text-env-tertiary text-sm mt-6">
                This mirrors real technology and startup teams.
              </p>
            </div>
          </AnimatedSection>
          
        </div>
      </section>

      {/* ==================== SENIOR TOOLS SECTION ==================== */}
      <section className="section-padding">
        <div className="container-forge">
          
          <SectionHeader
            label="Senior Secondary Tools"
            title="Specialisation & Career-Aligned Tools"
            description="Professional, industry-facing tools for production, portfolio development and career readiness."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {seniorToolTracks.map((track, index) => (
              <AnimatedSection key={track.track} animation="fade-up" delay={index * 75}>
                <div className="p-6 rounded-xl bg-env-surface border border-env-border hover:border-purple-500/30 transition-smooth h-full">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-purple-400">{track.track}</h3>
                    <span className="px-2 py-1 rounded-full bg-env-bg-primary text-env-tertiary text-xs">{track.pathway}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {track.tools.map((tool, i) => (
                      <span key={i} className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-env-secondary text-sm">
                        {tool}
                      </span>
                    ))}
                  </div>
                  {track.note && (
                    <p className="text-env-tertiary text-xs mt-4 italic">
                      Note: {track.note}
                    </p>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
          
          {/* Cross-Track Tools */}
          <AnimatedSection animation="fade-up" delay={400}>
            <div className="p-6 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 max-w-4xl mx-auto">
              <h4 className="font-semibold text-env-primary mb-4 text-center">Cross-Track Tools (All Senior Students)</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {crossTrackTools.map((tool, i) => (
                  <div key={i} className="p-4 rounded-lg bg-env-surface/50 text-center">
                    <p className="font-medium text-env-primary text-sm">{tool.name}</p>
                    <p className="text-env-tertiary text-xs">{tool.description}</p>
                  </div>
                ))}
              </div>
              <p className="text-center text-env-tertiary text-sm mt-6">
                Senior tools are used for <strong className="text-env-secondary">production, portfolio development, career readiness and innovation pipelines</strong>.
              </p>
            </div>
          </AnimatedSection>
          
        </div>
      </section>

      {/* ==================== PROFESSIONAL DIGITAL PRESENCE (SSS3) ==================== */}
      <section className="section-padding bg-env-secondary">
        <div className="container-forge">
          
          <SectionHeader
            label="Graduation Requirement"
            title="Professional Digital Presence (SSS3)"
            description="All SSS3 students must create and actively maintain professional online profiles."
          />
          
          <AnimatedSection animation="fade-up">
            <div className="max-w-4xl mx-auto">
              <div className="p-4 rounded-xl bg-chapter-accent/10 border border-chapter-accent/20 text-center mb-8">
                <p className="text-env-primary font-medium">
                  This is a <strong className="text-chapter-accent">graduation readiness requirement</strong> for all TechUp SSS3 students.
                </p>
              </div>
            </div>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            
            {/* LinkedIn */}
            <AnimatedSection animation="fade-right">
              <div className="p-6 md:p-8 rounded-2xl bg-env-surface border border-env-border h-full">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">💼</span>
                  <div>
                    <h3 className="text-xl font-bold text-env-primary">LinkedIn Profile</h3>
                    <span className="text-chapter-accent text-sm font-medium">Mandatory</span>
                  </div>
                </div>
                <p className="text-env-secondary mb-4">All students must:</p>
                <ul className="space-y-2">
                  {professionalPlatforms.mandatory[0].requirements.map((req, i) => (
                    <li key={i} className="flex items-start text-env-secondary text-sm">
                      <svg className="w-5 h-5 text-chapter-accent mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
            
            {/* Freelancing Platforms */}
            <AnimatedSection animation="fade-left" delay={100}>
              <div className="p-6 md:p-8 rounded-2xl bg-env-surface border border-env-border h-full">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">🌐</span>
                  <div>
                    <h3 className="text-xl font-bold text-env-primary">Freelancing Platform</h3>
                    <span className="text-emerald-400 text-sm font-medium">At least one required</span>
                  </div>
                </div>
                <p className="text-env-secondary mb-4">Students must create a professional profile on at least one platform:</p>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {professionalPlatforms.freelancing.map((platform, i) => (
                    <div key={i} className="p-3 rounded-lg bg-env-bg-primary/50 border border-env-border">
                      <p className="font-medium text-env-primary text-sm">{platform.name}</p>
                      <p className="text-env-tertiary text-xs">{platform.description}</p>
                    </div>
                  ))}
                </div>
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <p className="text-env-secondary text-sm">
                    Students must list at least one service aligned to their pathway and upload at least one portfolio artefact.
                  </p>
                </div>
              </div>
            </AnimatedSection>
            
          </div>
          
          {/* Maintenance & Safeguarding */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            
            <AnimatedSection animation="fade-up" delay={200}>
              <div className="p-6 rounded-xl bg-env-surface border border-env-border h-full">
                <h4 className="font-semibold text-env-primary mb-4 flex items-center gap-2">
                  <span>📅</span> Maintenance Requirement
                </h4>
                <ul className="space-y-2 text-env-secondary text-sm">
                  <li>• Update profiles each term</li>
                  <li>• Add new projects as completed</li>
                  <li>• Reflect pathway progression</li>
                  <li>• Maintain professional standards</li>
                </ul>
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="fade-up" delay={300}>
              <div className="p-6 rounded-xl bg-amber-500/10 border border-amber-500/20 h-full">
                <h4 className="font-semibold text-env-primary mb-4 flex items-center gap-2">
                  <span>🛡️</span> Safeguarding & Compliance
                </h4>
                <ul className="space-y-2 text-env-secondary text-sm">
                  <li>• All usage follows school safeguarding policies</li>
                  <li>• Parental and school consent required where applicable</li>
                  <li>• Facilitators supervise account creation</li>
                  <li>• Paid work follows school and programme policy</li>
                </ul>
              </div>
            </AnimatedSection>
            
          </div>
          
          {/* Why This Matters */}
          <AnimatedSection animation="fade-up" delay={400}>
            <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-chapter-accent/10 to-purple-500/10 border border-chapter-accent/20 max-w-4xl mx-auto text-center">
              <h4 className="font-semibold text-env-primary mb-4">Why This Matters</h4>
              <p className="text-env-secondary mb-4">This ensures students graduate with:</p>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  "A visible digital professional footprint",
                  "Early exposure to market expectations",
                  "Portfolio credibility",
                  "Accountability for their skills"
                ].map((item, i) => (
                  <span key={i} className="px-4 py-2 rounded-full bg-env-surface border border-env-border text-env-primary text-sm">
                    ✓ {item}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedSection>
          
        </div>
      </section>

      {/* ==================== SS3 GRADUATE OUTCOME ==================== */}
      <section className="section-padding">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="max-w-4xl mx-auto">
              <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 via-chapter-accent/10 to-blue-500/10 border border-purple-500/20 text-center">
                <span className="text-5xl mb-4 block">🎓</span>
                <h2 className="text-2xl md:text-3xl font-bold text-env-primary mb-4">
                  SS3 Graduate Outcome
                </h2>
                <p className="text-lg text-env-secondary leading-relaxed mb-6">
                  By the end of SS3, TechUp students:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {[
                    "Have a clear career orientation",
                    "Possess a focused pathway skillset",
                    "Have team innovation experience",
                    "Own portfolio projects",
                    "Maintain professional online presence",
                    "Are prepared for Forge LaunchPad",
                  ].map((outcome, i) => (
                    <div key={i} className="p-4 rounded-lg bg-env-surface/50 border border-env-border">
                      <p className="text-env-primary font-medium text-sm">{outcome}</p>
                    </div>
                  ))}
                </div>
                <p className="text-chapter-accent font-medium">
                  Ready for advanced programmes, employment, freelancing or entrepreneurship.
                </p>
              </div>
            </div>
          </AnimatedSection>
          
        </div>
      </section>

      {/* ==================== PROJECT-BASED LEARNING ==================== */}
      <section className="section-padding bg-env-secondary">
        <div className="container-forge">
          
          <SectionHeader
            label="Learning Approach"
            title="Project-Based Learning, Not Classroom Theory"
            description="TechUp is built on hands-on delivery. Every major learning block ends with real projects, real problems, real presentations."
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <AnimatedSection animation="fade-right">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {projectAreas.map((area, index) => (
                  <div key={area.name} className="p-4 rounded-xl bg-env-surface border border-env-border text-center hover:border-chapter-accent/30 transition-smooth hover-lift">
                    <span className="text-3xl mb-2 block">{area.icon}</span>
                    <p className="text-env-primary text-sm font-medium">{area.name}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="fade-left" delay={200}>
              <div className="space-y-6">
                <div className="p-6 rounded-xl bg-env-surface border border-env-border">
                  <h3 className="text-lg font-semibold text-env-primary mb-3">
                    Challenges From Real Sectors
                  </h3>
                  <p className="text-env-secondary leading-relaxed">
                    Students work on challenges drawn from education, food systems, transportation, 
                    sustainability, finance and community services.
                  </p>
                </div>
                <div className="p-6 rounded-xl bg-chapter-accent/10 border border-chapter-accent/20">
                  <h3 className="text-lg font-semibold text-env-primary mb-3">
                    Connected to Forge's Ecosystem
                  </h3>
                  <p className="text-env-secondary leading-relaxed">
                    This reflects Forge's broader ecosystem — including platforms such as 
                    <strong className="text-chapter-accent"> Bitebank</strong> and 
                    <strong className="text-chapter-accent"> Trego</strong> — and helps students understand 
                    how digital solutions are created for African realities.
                  </p>
                </div>
              </div>
            </AnimatedSection>
            
          </div>
          
        </div>
      </section>

      {/* ==================== TALENT PIPELINE ==================== */}
      <section className="section-padding">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="max-w-4xl mx-auto">
              <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-purple-500/10 via-chapter-accent/10 to-pink-500/10 border border-purple-500/20 text-center">
                <span className="text-5xl mb-4 block">🌟</span>
                <h2 className="text-2xl md:text-3xl font-bold text-env-primary mb-4">
                  Talent Discovery & Early Innovation Pipeline
                </h2>
                <p className="text-lg text-env-secondary leading-relaxed mb-6">
                  TechUp is not only a skills programme. It is a <strong className="text-env-primary">talent identification and innovation pipeline</strong>.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {["Identified early", "Mentored", "Prepared for LaunchPad"].map((step, i) => (
                    <div key={i} className="p-4 rounded-lg bg-env-surface/50">
                      <p className="text-env-primary font-medium">{step}</p>
                    </div>
                  ))}
                </div>
                <div className="p-4 rounded-lg bg-env-surface border border-env-border inline-block">
                  <p className="text-env-secondary">
                    <span className="text-chapter-accent font-semibold">Continuous pathway:</span> School → Skills → Innovation → Enterprise
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
          
        </div>
      </section>

      {/* ==================== TEACHER & SCHOOL SUPPORT ==================== */}
      <section className="section-padding bg-env-secondary">
        <div className="container-forge">
          
          <SectionHeader
            label="School Partnership"
            title="Teacher & School Support"
            description="TechUp does not replace teachers. We strengthen schools."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {schoolSupport.map((item, index) => (
              <AnimatedSection key={item.title} animation="fade-up" delay={index * 75}>
                <div className="p-5 rounded-xl bg-env-surface border border-env-border text-center hover:border-chapter-accent/30 transition-smooth hover-lift h-full">
                  <span className="text-3xl mb-3 block">{item.icon}</span>
                  <h3 className="font-semibold text-env-primary text-sm mb-2">{item.title}</h3>
                  <p className="text-env-tertiary text-xs leading-relaxed">{item.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
          
          <AnimatedSection animation="fade-up" delay={300}>
            <div className="mt-8 p-4 rounded-xl bg-chapter-accent/10 border border-chapter-accent/20 text-center max-w-2xl mx-auto">
              <p className="text-env-primary">
                This ensures <strong>sustainability inside the school system</strong>, not dependency on external workshops.
              </p>
            </div>
          </AnimatedSection>
          
        </div>
      </section>

      {/* ==================== INCLUSION & ACCESS ==================== */}
      <section className="section-padding">
        <div className="container-forge">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <AnimatedSection animation="fade-right">
              <div>
                <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-chapter-accent bg-chapter-accent-soft rounded-full border border-chapter-accent/20">
                  Inclusion & Equity
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-6">
                  Designed for Every Student
                </h2>
                <p className="text-lg text-env-secondary leading-relaxed mb-6">
                  TechUp is intentionally designed to work across diverse environments. 
                  Digital education is not reserved for elite schools or urban centres alone.
                </p>
                <div className="space-y-3">
                  {inclusionFeatures.map((feature, i) => (
                    <div key={i} className="flex items-center p-3 rounded-lg bg-env-surface border border-env-border">
                      <svg className="w-5 h-5 text-chapter-accent mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-env-primary">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="fade-left" delay={200}>
              <div className="relative">
                <div className="aspect-video rounded-2xl overflow-hidden border border-env-border relative">
                  <Image
                    src="/images/techup/inclusive-classroom2.jpg"
                    alt="TechUp in diverse school environments"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-chapter-accent/10 rounded-2xl -z-10" />
              </div>
            </AnimatedSection>
            
          </div>
          
        </div>
      </section>

      {/* ==================== OUTCOMES ==================== */}
      <section className="section-padding bg-env-secondary">
        <div className="container-forge">
          
          <SectionHeader
            label="Outcomes"
            title="Outcomes That Matter"
            description="Real results for students, schools, and national development."
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Students */}
            <AnimatedSection animation="fade-right">
              <div className="p-6 md:p-8 rounded-2xl bg-env-surface border border-env-border h-full">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">👨‍🎓</span>
                  <h3 className="text-xl font-bold text-env-primary">For Students</h3>
                </div>
                <p className="text-env-secondary mb-6">
                  By completing TechUp, students leave secondary school with:
                </p>
                <ul className="space-y-4">
                  {studentOutcomes.map((outcome, i) => (
                    <li key={i}>
                      <h4 className="font-semibold text-env-primary mb-1">{outcome.title}</h4>
                      <p className="text-env-secondary text-sm">{outcome.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
            
            {/* Governments & Partners */}
            <AnimatedSection animation="fade-left" delay={100}>
              <div className="p-6 md:p-8 rounded-2xl bg-env-surface border border-env-border h-full">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">🏛️</span>
                  <h3 className="text-xl font-bold text-env-primary">For Governments & Partners</h3>
                </div>
                <p className="text-env-secondary mb-6">
                  TechUp delivers measurable impact:
                </p>
                <ul className="space-y-4">
                  {partnerOutcomes.map((outcome, i) => (
                    <li key={i}>
                      <h4 className="font-semibold text-env-primary mb-1">{outcome.title}</h4>
                      <p className="text-env-secondary text-sm">{outcome.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
            
          </div>
          
        </div>
      </section>

      {/* ==================== OUR PROMISE ==================== */}
      <section className="section-padding">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-wider text-chapter-accent bg-chapter-accent-soft rounded-full border border-chapter-accent/20">
                Our Promise
              </span>
              
              <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-6">
                TechUp is not about teaching children how to use software.
              </h2>
              
              <p className="text-xl text-env-secondary leading-relaxed mb-8">
                It is about helping young Africans learn how to <strong className="text-env-primary">design, build and shape</strong> the digital future of their own communities.
              </p>
              
              <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-chapter-accent/10 to-purple-500/10 border border-chapter-accent/20">
                <p className="text-xl md:text-2xl text-env-primary font-medium mb-2">
                  Forge believes that before Africa can scale technology,
                </p>
                <p className="text-2xl md:text-3xl text-chapter-accent font-bold">
                  we must first scale builders.
                </p>
                <p className="text-lg text-env-secondary mt-4">
                  TechUp is where those builders begin.
                </p>
              </div>
            </div>
          </AnimatedSection>
          
        </div>
      </section>

      {/* ==================== FAQ SECTION ==================== */}
      <section className="section-padding bg-env-secondary">
        <div className="container-forge">
          
          <SectionHeader
            label="FAQ"
            title="Common Questions"
            description="Everything you need to know about bringing TechUp to your school."
          />
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <AnimatedSection key={index} animation="fade-up" delay={index * 75}>
                  <div className="p-6 rounded-xl bg-env-surface border border-env-border hover:border-chapter-accent/30 transition-smooth">
                    <h3 className="text-lg font-semibold text-env-primary mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-env-secondary leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
          
        </div>
      </section>

      {/* ==================== CTA SECTION ==================== */}
      <CTASection
        badge="Get Started"
        headline="Ready to build"
        highlightedText="the next generation?"
        description="Whether you're a school administrator, government official, or organization looking to support digital education — we'd love to discuss how TechUp can work for you."
        primaryAction={{
          label: "Start a Conversation",
          href: "/contact",
        }}
        secondaryAction={{
          label: "Become a Partner",
          href: "/join#partners",
        }}
        backgroundImage="/images/cta/techup-cta.jpg"
        overlayOpacity={80}
      />
      
    </ChapterWrapper>
  );
}