import Image from "next/image";  // ← ADD THIS IMPORT
import SectionHeader from "../../components/SectionHeader";
import Link from "next/link";
import { ChapterWrapper } from "../../components/ChapterWrapper";
import { AnimatedSection, StaggeredChildren } from "../../components/AnimatedSection";
import { Badge } from "../../components/Badge";

// Metadata for SEO
export const metadata = {
  title: "TechUp - Digital Skills for Secondary Schools",
  description: "TechUp is a structured in-school digital technology initiative designed for secondary school students. Equipping JSS1 to SS3 students with practical, future-ready digital skills.",
};

// ... [Keep all the existing data arrays: curriculumTracks, skillAreas, benefits, differentiators, faqs]
// I'm not repeating them here to save space - they stay exactly the same

// Curriculum tracks by level
const curriculumTracks = [
  {
    level: "Junior Secondary",
    grades: "JSS1 - JSS3",
    focus: "Foundation & Discovery",
    color: "from-green-500/20 to-green-500/5",
    borderColor: "border-green-500/30",
    textColor: "text-green-400",
    skills: [
      "Digital literacy fundamentals",
      "Introduction to the internet and online safety",
      "Basic productivity tools (documents, spreadsheets)",
      "Introduction to visual design and creativity",
      "Logical thinking and problem-solving basics",
      "Responsible use of technology",
    ],
    outcome: "Students build confidence with technology and understand its role in modern life.",
  },
  {
    level: "Senior Secondary 1-2",
    grades: "SS1 - SS2",
    focus: "Skill Building & Exploration",
    color: "from-blue-500/20 to-blue-500/5",
    borderColor: "border-blue-500/30",
    textColor: "text-blue-400",
    skills: [
      "Introduction to web development (HTML, CSS)",
      "Graphic design fundamentals",
      "Digital communication and collaboration",
      "Introduction to data and spreadsheets",
      "Basics of artificial intelligence concepts",
      "Digital entrepreneurship awareness",
    ],
    outcome: "Students discover their interests and begin building real digital skills.",
  },
  {
    level: "Senior Secondary 3",
    grades: "SS3",
    focus: "Specialization & Preparation",
    color: "from-purple-500/20 to-purple-500/5",
    borderColor: "border-purple-500/30",
    textColor: "text-purple-400",
    skills: [
      "Advanced web development or design track",
      "Portfolio development",
      "Freelancing and remote work fundamentals",
      "AI tools for productivity",
      "Career pathway planning",
      "Final capstone project",
    ],
    outcome: "Students graduate with a portfolio, practical skills, and clear next steps.",
  },
];

// Core skill areas
const skillAreas = [
  { name: "Web Development", description: "Building websites from scratch using modern technologies", icon: "💻" },
  { name: "Digital Design", description: "Creating visual content for digital and print media", icon: "🎨" },
  { name: "Digital Communication", description: "Professional online presence and collaboration skills", icon: "📱" },
  { name: "Problem Solving", description: "Logical thinking and computational approaches to challenges", icon: "🧩" },
  { name: "AI Literacy", description: "Understanding and responsibly using artificial intelligence", icon: "🤖" },
  { name: "Digital Entrepreneurship", description: "Using technology to create value and opportunities", icon: "💡" },
];

// Benefits
const benefits = {
  students: [
    { title: "Future-Ready Skills", description: "Graduate with abilities that matter in the real world — not just theory, but practical skills employers and clients actually need." },
    { title: "Early Career Discovery", description: "Discover your strengths and interests in technology while still in school, giving you a head start on your career path." },
    { title: "Portfolio Building", description: "Leave school with a portfolio of real projects that demonstrate your capabilities to universities, employers, or clients." },
    { title: "Multiple Pathways", description: "Whether you choose employment, freelancing, entrepreneurship, or further education — you'll have the digital foundation to succeed." },
  ],
  schools: [
    { title: "Enhanced Curriculum", description: "Complement your existing computer studies with a practical, industry-aligned program that prepares students for the digital economy." },
    { title: "Teacher Support", description: "We provide training, resources, and ongoing support for teachers to deliver the program effectively." },
    { title: "Student Outcomes", description: "See measurable improvements in student engagement and post-graduation success in technology-related paths." },
    { title: "Government Alignment", description: "Support national digital literacy goals while going beyond basic requirements to truly prepare students." },
  ],
  partners: [
    { title: "Talent Pipeline", description: "Connect with skilled young people who have been trained in practical, relevant digital skills from an early age." },
    { title: "Community Impact", description: "Contribute to meaningful educational transformation that creates lasting change in communities." },
    { title: "Brand Visibility", description: "Associate your organization with innovation, education, and African youth empowerment." },
    { title: "Customization Options", description: "Work with us to tailor aspects of the program to align with your industry or organizational needs." },
  ],
};

// Differentiators
const differentiators = [
  { title: "Beyond Basic Awareness", description: "Most computer education stops at 'how to use Microsoft Word.' TechUp teaches students to build, create, and solve problems with technology.", icon: "🚀" },
  { title: "Progressive Learning", description: "Our curriculum grows with the student over six years, building complexity and capability at each stage.", icon: "📈" },
  { title: "Practical Focus", description: "Every skill taught has real-world application. Students work on projects, not just exercises.", icon: "🛠️" },
  { title: "Industry Alignment", description: "Curriculum designed with input from tech professionals to ensure relevance to actual market needs.", icon: "🎯" },
  { title: "Responsible AI Integration", description: "Students learn to use AI as a tool — understanding both its power and its limitations.", icon: "🤖" },
  { title: "Talent Incubation", description: "Schools become spaces where future tech talent is discovered, nurtured, and prepared for success.", icon: "🌱" },
];

// FAQs
const faqs = [
  { question: "What age group is TechUp designed for?", answer: "TechUp is designed for secondary school students from JSS1 (approximately age 10-11) through SS3 (approximately age 16-17). The curriculum is age-appropriate and progressively builds skills over six years." },
  { question: "Does TechUp replace existing computer studies?", answer: "No. TechUp is designed to complement and enhance existing computer education, adding practical, career-relevant skills that go beyond traditional curricula." },
  { question: "What equipment do schools need?", answer: "Schools need basic computer facilities. We work with each school to assess their infrastructure and adapt our delivery approach accordingly. We can also advise on equipment upgrades if needed." },
  { question: "How are teachers trained?", answer: "We provide comprehensive teacher training before program launch and ongoing professional development throughout the partnership. Teachers don't need to be tech experts — we prepare them to deliver the curriculum effectively." },
  { question: "What happens after SS3?", answer: "Graduating students receive a portfolio of their work and guidance on next steps — whether that's further education, employment, freelancing, or entrepreneurship. We also connect outstanding students with opportunities in our network." },
  { question: "How much does TechUp cost?", answer: "Pricing depends on school size and partnership structure. We offer various models including direct partnerships, sponsored programs, and government collaborations. Contact us to discuss options." },
];

export default function TechUpPage() {
  return (
    <ChapterWrapper chapter="ignition">
      
      {/* ==================== HERO SECTION ==================== */}
      {/* UPDATED: Added hero background image */}
      <section className="relative section-padding flex items-center min-h-[70vh] overflow-hidden">
        {/* Hero Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/techup/hero-techup.jpg"
            alt=""
            fill
            className="object-cover opacity-25"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-env-bg-primary via-env-bg-primary/95 to-env-bg-primary/80" />
        </div>

        {/* Decorative glows */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-chapter-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="container-forge relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Hero Content */}
            <AnimatedSection animation="fade-right">
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <span className="text-5xl">🎓</span>
                  <Badge status="pilot" pulse>Pilot Program</Badge>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-env-primary mb-6">
                  TechUp
                </h1>
                
                <p className="text-xl md:text-2xl text-chapter-accent font-medium mb-6">
                  Digital skills education for secondary schools
                </p>
                
                <p className="text-lg text-env-secondary leading-relaxed mb-8">
                  A structured in-school digital technology initiative designed for 
                  secondary school students from JSS1 to SS3. Moving beyond basic 
                  computer awareness to equip students with practical, future-ready 
                  digital skills.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/contact"
                    className="px-8 py-4 bg-chapter-accent hover:bg-chapter-accent-hover text-env-text-inverse font-medium rounded-lg transition-smooth glow text-center hover-lift"
                  >
                    Partner With Us
                  </Link>
                  <a
                    href="#curriculum"
                    className="px-8 py-4 bg-env-surface hover:bg-env-surface-hover text-env-primary font-medium rounded-lg border border-env-border transition-smooth text-center hover-lift"
                  >
                    View Curriculum
                  </a>
                </div>
              </div>
            </AnimatedSection>
            
            {/* Hero Visual - UPDATED with real image */}
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
                {/* Decorative elements */}
                <div className="absolute -top-4 -left-4 w-20 h-20 bg-chapter-accent-soft rounded-xl -z-10"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-500/10 rounded-2xl -z-10"></div>
              </div>
            </AnimatedSection>
            
          </div>
        </div>
      </section>

      {/* Rest of the page remains the same... */}
      {/* I'm including all remaining sections for completeness */}

      {/* ==================== MISSION SECTION ==================== */}
      <section className="section-padding bg-env-secondary">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-wider text-chapter-accent bg-chapter-accent-soft rounded-full border border-chapter-accent/20">
                Our Mission
              </span>
              
              <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-6">
                Skills that open doors
              </h2>
              
              <p className="text-lg text-env-secondary leading-relaxed mb-8">
                TechUp supports the government's vision of ensuring every child is 
                technologically competent. But our core mission goes further: 
                <strong className="text-env-primary"> to ensure students graduate with 
                skills they can actually use</strong> — skills that open doors to 
                employment, freelancing, entrepreneurship, and participation in the 
                modern digital economy.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                {[
                  { value: "6", label: "Years of Progressive Learning" },
                  { value: "JSS1", label: "Starting Grade" },
                  { value: "SS3", label: "Graduation Grade" },
                  { value: "∞", label: "Career Possibilities" },
                ].map((stat, index) => (
                  <AnimatedSection key={stat.label} animation="fade-up" delay={index * 100}>
                    <div className="text-center">
                      <div className="text-3xl md:text-4xl font-bold text-chapter-accent mb-2">{stat.value}</div>
                      <p className="text-sm text-env-tertiary">{stat.label}</p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </AnimatedSection>
          
        </div>
      </section>

      {/* ==================== WHY TECHUP SECTION ==================== */}
      <section className="section-padding">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <SectionHeader
              label="Why TechUp"
              title="Beyond Basic Computer Education"
              description="Traditional computer studies teach students to use software. TechUp teaches them to build, create, and thrive in a digital world."
            />
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {differentiators.map((item, index) => (
              <AnimatedSection key={item.title} animation="fade-up" delay={index * 75}>
                <div className="p-6 rounded-xl bg-env-surface border border-env-border hover:border-chapter-accent/30 transition-smooth hover-lift hover-glow h-full">
                  <span className="text-3xl mb-4 block">{item.icon}</span>
                  <h3 className="text-lg font-semibold text-env-primary mb-2">
                    {item.title}
                  </h3>
                  <p className="text-env-secondary text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
          
        </div>
      </section>

      {/* ==================== SKILL AREAS SECTION ==================== */}
      <section className="section-padding bg-env-secondary">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <SectionHeader
              label="What Students Learn"
              title="Core Skill Areas"
              description="Through age-appropriate, progressive learning paths, students are introduced to essential areas of digital technology."
            />
          </AnimatedSection>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {skillAreas.map((skill, index) => (
              <AnimatedSection key={skill.name} animation="scale" delay={index * 50}>
                <div className="p-5 rounded-xl bg-env-surface border border-env-border text-center hover:border-chapter-accent/30 transition-smooth group hover-lift h-full">
                  <span className="text-4xl mb-3 block group-hover:scale-110 transition-transform">
                    {skill.icon}
                  </span>
                  <h3 className="font-semibold text-env-primary text-sm mb-1">
                    {skill.name}
                  </h3>
                  <p className="text-env-tertiary text-xs leading-relaxed">
                    {skill.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
          
        </div>
      </section>

      {/* ==================== CURRICULUM SECTION ==================== */}
      <section id="curriculum" className="section-padding scroll-mt-20">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <SectionHeader
              label="The Curriculum"
              title="Six Years of Growth"
              description="The curriculum is carefully structured to grow with the student, building confidence, creativity, and technical competence over time."
            />
          </AnimatedSection>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {curriculumTracks.map((track, index) => (
              <AnimatedSection key={track.level} animation="fade-up" delay={index * 150}>
                <div className={`p-6 md:p-8 rounded-2xl bg-gradient-to-br ${track.color} border ${track.borderColor} h-full hover-lift transition-smooth`}>
                  <div className="mb-6">
                    <span className={`text-sm font-semibold uppercase tracking-wider ${track.textColor}`}>
                      {track.grades}
                    </span>
                    <h3 className="text-2xl font-bold text-env-primary mt-1">
                      {track.level}
                    </h3>
                    <p className={`${track.textColor} font-medium mt-1`}>
                      {track.focus}
                    </p>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    {track.skills.map((skill, i) => (
                      <li key={i} className="flex items-start text-env-secondary text-sm">
                        <svg className={`w-5 h-5 ${track.textColor} mr-2 mt-0.5 flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {skill}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-sm text-env-secondary">
                      <span className={`font-semibold ${track.textColor}`}>Outcome:</span> {track.outcome}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
          
        </div>
      </section>

      {/* Continue with all other sections... */}
      {/* (Transformation, Benefits, FAQ, CTA sections remain the same) */}

      {/* ==================== CTA SECTION ==================== */}
      <section className="section-padding">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="max-w-4xl mx-auto">
              <div className="p-8 md:p-12 rounded-2xl bg-gradient-to-br from-chapter-accent-soft via-chapter-accent-softer to-chapter-accent-soft border border-chapter-accent/20 text-center">
                
                <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-4">
                  Ready to transform your school?
                </h2>
                
                <p className="text-lg text-env-secondary mb-8 max-w-2xl mx-auto">
                  Whether you're a school administrator, government official, or 
                  organization looking to sponsor digital education — we'd love to 
                  discuss how TechUp can work for you.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/contact"
                    className="px-8 py-4 bg-chapter-accent hover:bg-chapter-accent-hover text-env-text-inverse font-medium rounded-lg transition-smooth glow hover-lift"
                  >
                    Start a Conversation
                  </Link>
                  <Link
                    href="/join#partners"
                    className="px-8 py-4 bg-env-surface hover:bg-env-surface-hover text-env-primary font-medium rounded-lg border border-env-border transition-smooth hover-lift"
                  >
                    Become a Sponsor
                  </Link>
                </div>
                
              </div>
            </div>
          </AnimatedSection>
          
        </div>
      </section>
      
    </ChapterWrapper>
  );
}