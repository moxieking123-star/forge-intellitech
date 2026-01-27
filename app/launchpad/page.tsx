import SectionHeader from "../../components/SectionHeader";
import Link from "next/link";

// Metadata for SEO
export const metadata = {
  title: "LaunchPad - Youth Entrepreneurship & AI Innovation Program",
  description: "Forge LaunchPad empowers Nigerian secondary school students with real-world business, AI-assisted ideation, and pitching skills. Apply for LaunchPad 2026.",
};

// LaunchPad 2025 Impact Stats
const impactStats = [
  { value: "11", label: "Students Participated" },
  { value: "2", label: "Partner Schools" },
  { value: "₦500K+", label: "Prize Money Awarded" },
  { value: "1", label: "LGA Partnership" },
];

// Prize structure
const prizes = [
  {
    position: "1st Place",
    amount: "₦300,000",
    color: "from-yellow-500/20 to-yellow-600/10",
    borderColor: "border-yellow-500/30",
    icon: "🥇",
  },
  {
    position: "2nd Place",
    amount: "₦200,000",
    color: "from-gray-400/20 to-gray-500/10",
    borderColor: "border-gray-400/30",
    icon: "🥈",
  },
];

// Student testimonials (placeholder - replace with real testimonials)
const testimonials = [
  {
    name: "Student Name 1",
    school: "Partner School Name",
    quote: "LaunchPad taught me that my ideas have value. Before this program, I never thought a student like me could pitch a business idea. Now I know I can build something real.",
    image: null,
  },
  {
    name: "Student Name 2",
    school: "Partner School Name",
    quote: "Learning how to use AI to develop my business idea was incredible. The mentors showed us that technology is a tool we can use to solve real problems in our community.",
    image: null,
  },
  {
    name: "Student Name 3",
    school: "Partner School Name",
    quote: "The pitching competition was nerve-wracking but amazing. I learned to present my ideas with confidence. This experience will stay with me forever.",
    image: null,
  },
];

// Program benefits
const programBenefits = [
  {
    title: "Business Fundamentals",
    description: "Learn how to identify problems, develop solutions, and create viable business models that can scale.",
    icon: "💼",
  },
  {
    title: "AI-Assisted Innovation",
    description: "Discover how to leverage artificial intelligence tools to research, ideate, and develop your business concepts.",
    icon: "🤖",
  },
  {
    title: "Pitching & Presentation",
    description: "Master the art of presenting your ideas confidently to investors, judges, and potential partners.",
    icon: "🎤",
  },
  {
    title: "Problem-Solving Skills",
    description: "Develop critical thinking abilities to tackle real-world challenges in your community and beyond.",
    icon: "🧩",
  },
  {
    title: "Mentorship Access",
    description: "Connect with experienced entrepreneurs and business leaders who guide you through your journey.",
    icon: "👥",
  },
  {
    title: "Real Prize Money",
    description: "Compete for substantial cash prizes that can help kickstart your entrepreneurial journey.",
    icon: "🏆",
  },
];

// Why sponsor/partner
const partnerBenefits = [
  {
    title: "Youth Empowerment",
    description: "Directly impact young lives by funding programs that give students practical, future-ready skills.",
    icon: "🌟",
  },
  {
    title: "Talent Discovery",
    description: "Get early access to Nigeria's brightest young minds and future entrepreneurs.",
    icon: "🔍",
  },
  {
    title: "Government Alignment",
    description: "Support initiatives that align with Lagos State's digital literacy and youth development goals.",
    icon: "🏛️",
  },
  {
    title: "Brand Visibility",
    description: "Associate your organization with innovation, education, and African youth excellence.",
    icon: "📣",
  },
];

// Application requirements
const applicationSteps = [
  {
    step: "01",
    title: "Check Eligibility",
    description: "You must be a secondary school student writing your final examinations (WAEC/NECO) in 2026.",
  },
  {
    step: "02",
    title: "Develop Your Idea",
    description: "Think about a problem in your community or Nigeria that you want to solve with a business solution.",
  },
  {
    step: "03",
    title: "Write Your Essay",
    description: "Submit an essay explaining your business idea, the problem it solves, how it can scale, and how AI supports your solution.",
  },
  {
    step: "04",
    title: "Submit Application",
    description: "Complete the application form and submit before the deadline. Selected students will be invited to the program.",
  },
];

// 2025 Partners and Supporters
const partners2025 = [
  {
    name: "Ikosi-Isheri LCDA",
    role: "Local Government Partner",
    contribution: "Official partnership and program endorsement",
  },
  {
    name: "Princess Samiat Bada",
    role: "Chairman, Ikosi-Isheri LCDA",
    contribution: "Provided council hall venue during election period",
  },
  {
    name: "Chief Alaka",
    role: "Lagos State President, NAPPS",
    contribution: "Cash sponsorship for prizes",
  },
];

export default function LaunchPadPage() {
  return (
    <div>
      
      {/* ==================== HERO SECTION ==================== */}
      <section className="section-padding flex items-center min-h-[90vh] relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/30 via-forge-dark to-accent-900/20 pointer-events-none" />
        
        <div className="container-forge relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            
            {/* Badge */}
            <div className="flex items-center justify-center space-x-3 mb-6">
              <span className="text-5xl">🚀</span>
              <span className="px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-green-400 bg-green-500/10 rounded-full border border-green-500/20">
                Applications Open for 2026
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-forge-light mb-6">
              Forge LaunchPad
            </h1>
            
            <p className="text-xl md:text-2xl text-primary-400 font-medium mb-6">
              Youth Entrepreneurship & AI Innovation Program
            </p>
            
            <p className="text-lg md:text-xl text-forge-muted leading-relaxed mb-8 max-w-3xl mx-auto">
              Empowering Nigerian secondary school students with real-world business skills, 
              AI-assisted ideation, and the confidence to pitch their ideas. 
              Leave school with more than a certificate — leave with a viable future.
            </p>
            
            {/* Key info */}
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <div className="px-4 py-2 bg-white/5 rounded-lg border border-forge-border">
                <span className="text-forge-muted text-sm">📅 Event Date:</span>
                <span className="text-forge-light font-semibold ml-2">21st August 2026</span>
              </div>
              <div className="px-4 py-2 bg-white/5 rounded-lg border border-forge-border">
                <span className="text-forge-muted text-sm">👥 Participants:</span>
                <span className="text-forge-light font-semibold ml-2">26 Students</span>
              </div>
              <div className="px-4 py-2 bg-white/5 rounded-lg border border-forge-border">
                <span className="text-forge-muted text-sm">🎓 Eligibility:</span>
                <span className="text-forge-light font-semibold ml-2">Final Year Students (2026)</span>
              </div>
            </div>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#apply"
                className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-smooth glow text-lg"
              >
                Apply for LaunchPad 2026
              </Link>
              <Link
                href="#sponsor"
                className="px-8 py-4 bg-white/5 hover:bg-white/10 text-forge-light font-semibold rounded-lg border border-forge-border transition-smooth text-lg"
              >
                Become a Sponsor
              </Link>
            </div>
            
          </div>
        </div>
      </section>

      {/* ==================== WHAT IS LAUNCHPAD SECTION ==================== */}
      <section className="section-padding bg-forge-darker">
        <div className="container-forge">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div>
              <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-primary-400 bg-primary-500/10 rounded-full border border-primary-500/20">
                About The Program
              </span>
              
              <h2 className="text-3xl md:text-4xl font-bold text-forge-light mb-6">
                More than a competition — a transformation
              </h2>
              
              <div className="space-y-4 text-forge-muted leading-relaxed">
                <p>
                  Forge LaunchPad is a youth entrepreneurship and AI innovation program 
                  designed specifically for Nigerian secondary school students from JSS1 to SS3, 
                  with a special focus on final-year students preparing to enter the world.
                </p>
                <p>
                  The program equips students with <strong className="text-forge-light">real-world 
                  business skills, problem-solving abilities, AI-assisted ideation techniques, 
                  and professional pitching capabilities</strong> — ensuring they graduate with 
                  more than academic knowledge.
                </p>
                <p>
                  In a rapidly changing economy, young Nigerians need more than traditional 
                  education. They need the confidence and skills to create their own opportunities. 
                  LaunchPad provides exactly that.
                </p>
              </div>
            </div>
            
            {/* Visual placeholder */}
            <div className="relative">
              <div className="aspect-video rounded-2xl bg-gradient-to-br from-primary-500/20 via-accent-500/10 to-primary-500/20 border border-forge-border flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-7xl mb-4">🚀</div>
                  <p className="text-forge-muted">
                    [LaunchPad event photo or video]
                  </p>
                </div>
              </div>
            </div>
            
          </div>
          
        </div>
      </section>

      {/* ==================== 2025 IMPACT SECTION ==================== */}
      <section className="section-padding">
        <div className="container-forge">
          
          <SectionHeader
            label="Proof of Impact"
            title="LaunchPad 2025 — Where It All Began"
            description="Our inaugural edition proved that when you invest in young people, extraordinary things happen."
          />
          
          {/* Impact Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {impactStats.map((stat) => (
              <div 
                key={stat.label}
                className="text-center p-6 rounded-xl bg-white/5 border border-forge-border"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-forge-muted text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* 2025 Story */}
          <div className="max-w-4xl mx-auto">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-primary-500/10 to-accent-500/5 border border-primary-500/20">
              
              <h3 className="text-2xl font-bold text-forge-light mb-6 text-center">
                The LaunchPad 2025 Story
              </h3>
              
              <div className="space-y-4 text-forge-muted leading-relaxed">
                <p>
                  In 2025, Forge LaunchPad launched its pilot program in partnership with 
                  <strong className="text-forge-light"> Ikosi-Isheri Local Council Development Area (LCDA)</strong>. 
                  Despite being an election period, <strong className="text-forge-light">Chairman Princess 
                  Samiat Bada</strong> demonstrated exceptional commitment to youth development by providing 
                  the local government council hall as our venue.
                </p>
                <p>
                  <strong className="text-forge-light">Chief Alaka, Lagos State President of NAPPS 
                  (National Association of Proprietors of Private Schools)</strong>, believed in our 
                  vision and provided cash sponsorship that enabled us to award substantial prizes 
                  to our winning students.
                </p>
                <p>
                  <strong className="text-forge-light">11 students from 2 schools</strong> participated 
                  in the program, learning business fundamentals, AI-assisted innovation, and pitching skills. 
                  They competed for real prizes — <strong className="text-forge-light">₦300,000 for 
                  first place and ₦200,000 for second place</strong>.
                </p>
              </div>
              
            </div>
          </div>

          {/* Prize Display */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mt-10">
            {prizes.map((prize) => (
              <div 
                key={prize.position}
                className={`p-6 rounded-xl bg-gradient-to-br ${prize.color} border ${prize.borderColor} text-center`}
              >
                <span className="text-5xl block mb-3">{prize.icon}</span>
                <h4 className="text-xl font-bold text-forge-light mb-1">{prize.position}</h4>
                <p className="text-2xl font-bold text-primary-400">{prize.amount}</p>
              </div>
            ))}
          </div>

          {/* 2025 Partners */}
          <div className="mt-16">
            <h3 className="text-xl font-semibold text-forge-light text-center mb-8">
              LaunchPad 2025 Partners & Supporters
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {partners2025.map((partner) => (
                <div 
                  key={partner.name}
                  className="p-6 rounded-xl bg-white/5 border border-forge-border text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-500/20 flex items-center justify-center">
                    <span className="text-2xl">🤝</span>
                  </div>
                  <h4 className="font-semibold text-forge-light mb-1">{partner.name}</h4>
                  <p className="text-primary-400 text-sm mb-2">{partner.role}</p>
                  <p className="text-forge-muted text-sm">{partner.contribution}</p>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </section>

      {/* ==================== TESTIMONIALS SECTION ==================== */}
      <section className="section-padding bg-forge-darker">
        <div className="container-forge">
          
          <SectionHeader
            label="Student Voices"
            title="Hear From Our Students"
            description="Real stories from real students whose lives were changed by LaunchPad."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="p-6 rounded-xl bg-white/5 border border-forge-border"
              >
                {/* Quote icon */}
                <div className="text-4xl text-primary-500/30 mb-4">"</div>
                
                {/* Quote */}
                <p className="text-forge-muted leading-relaxed mb-6 italic">
                  {testimonial.quote}
                </p>
                
                {/* Student info */}
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500/30 to-accent-500/30 flex items-center justify-center">
                    <span className="text-lg">👤</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-forge-light text-sm">
                      {testimonial.name}
                    </h4>
                    <p className="text-forge-muted text-xs">{testimonial.school}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <p className="text-center text-forge-muted mt-8 text-sm">
            [Replace with real student photos, names, and testimonials]
          </p>
          
        </div>
      </section>

      {/* ==================== WHAT STUDENTS LEARN SECTION ==================== */}
      <section className="section-padding">
        <div className="container-forge">
          
          <SectionHeader
            label="Program Benefits"
            title="What Students Gain"
            description="LaunchPad equips students with skills that traditional education doesn't provide."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programBenefits.map((benefit) => (
              <div 
                key={benefit.title}
                className="p-6 rounded-xl bg-white/5 border border-forge-border hover:border-primary-500/30 transition-smooth"
              >
                <span className="text-4xl mb-4 block">{benefit.icon}</span>
                <h3 className="text-lg font-semibold text-forge-light mb-2">
                  {benefit.title}
                </h3>
                <p className="text-forge-muted text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
          
        </div>
      </section>

      {/* ==================== LAUNCHPAD 2026 SECTION ==================== */}
      <section className="section-padding bg-gradient-to-b from-forge-darker to-forge-dark">
        <div className="container-forge">
          
          <div className="max-w-4xl mx-auto text-center">
            
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-wider text-green-400 bg-green-500/10 rounded-full border border-green-500/20">
              Coming Soon
            </span>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-forge-light mb-6">
              LaunchPad 2026
            </h2>
            
            <p className="text-xl text-primary-400 font-medium mb-6">
              Bigger. Bolder. More Impact.
            </p>
            
            <p className="text-lg text-forge-muted leading-relaxed mb-10">
              Building on the success of our pilot, LaunchPad 2026 will expand to 
              <strong className="text-forge-light"> 26 students</strong> from multiple schools. 
              We're scaling our impact while maintaining the quality and personal attention 
              that made 2025 special.
            </p>
            
            {/* Key Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="p-6 rounded-xl bg-white/5 border border-forge-border">
                <span className="text-3xl block mb-3">📅</span>
                <h4 className="font-semibold text-forge-light mb-1">Event Date</h4>
                <p className="text-primary-400 font-bold">21st August 2026</p>
              </div>
              <div className="p-6 rounded-xl bg-white/5 border border-forge-border">
                <span className="text-3xl block mb-3">👥</span>
                <h4 className="font-semibold text-forge-light mb-1">Participants</h4>
                <p className="text-primary-400 font-bold">26 Students</p>
              </div>
              <div className="p-6 rounded-xl bg-white/5 border border-forge-border">
                <span className="text-3xl block mb-3">🎓</span>
                <h4 className="font-semibold text-forge-light mb-1">Eligibility</h4>
                <p className="text-primary-400 font-bold">2026 Final Year Students</p>
              </div>
            </div>

            {/* Vision Statement */}
            <div className="p-8 rounded-2xl bg-gradient-to-r from-primary-500/10 via-accent-500/10 to-primary-500/10 border border-primary-500/20">
              <p className="text-lg text-forge-muted leading-relaxed">
                Our vision is to transition from LGA-level sponsorship to 
                <strong className="text-forge-light"> Lagos State Government partnership</strong>, 
                making LaunchPad accessible to students across all local governments. 
                Every young Nigerian deserves the chance to discover their entrepreneurial potential.
              </p>
            </div>
            
          </div>
          
        </div>
      </section>

      {/* ==================== APPLICATION SECTION ==================== */}
      <section id="apply" className="section-padding scroll-mt-20">
        <div className="container-forge">
          
          <SectionHeader
            label="How to Apply"
            title="Join LaunchPad 2026"
            description="Ready to transform your ideas into reality? Here's how to apply."
          />
          
          {/* Eligibility */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="p-6 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
              <h3 className="font-semibold text-yellow-400 mb-2 flex items-center">
                <span className="mr-2">⚠️</span> Eligibility Requirements
              </h3>
              <p className="text-forge-muted">
                LaunchPad 2026 is open to secondary school students who will be writing their 
                final examinations (WAEC/NECO) in 2026. You must be currently enrolled in a 
                Nigerian secondary school.
              </p>
            </div>
          </div>
          
          {/* Application Steps */}
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {applicationSteps.map((step) => (
                <div 
                  key={step.step}
                  className="p-6 rounded-xl bg-white/5 border border-forge-border"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-400 font-bold">{step.step}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-forge-light mb-2">{step.title}</h4>
                      <p className="text-forge-muted text-sm leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Essay Requirements */}
          <div className="max-w-3xl mx-auto mt-12">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-primary-500/10 to-accent-500/5 border border-primary-500/20">
              <h3 className="text-xl font-semibold text-forge-light mb-4 text-center">
                📝 Essay Requirements
              </h3>
              <p className="text-forge-muted mb-6 text-center">
                Your application essay should address the following:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start text-forge-muted">
                  <svg className="w-5 h-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong className="text-forge-light">Your Business Idea:</strong> What product or service are you proposing?</span>
                </li>
                <li className="flex items-start text-forge-muted">
                  <svg className="w-5 h-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong className="text-forge-light">The Problem:</strong> What specific problem does your idea solve?</span>
                </li>
                <li className="flex items-start text-forge-muted">
                  <svg className="w-5 h-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong className="text-forge-light">Scalability:</strong> How can your idea grow to reach more people?</span>
                </li>
                <li className="flex items-start text-forge-muted">
                  <svg className="w-5 h-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong className="text-forge-light">AI Integration:</strong> How does artificial intelligence support your solution?</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Apply CTA */}
          <div className="text-center mt-12">
            <Link
              href="/contact"
              className="inline-flex items-center px-10 py-5 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-smooth glow text-lg"
            >
              Apply for LaunchPad 2026
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <p className="text-forge-muted mt-4 text-sm">
              Applications are now open. Don't miss your chance!
            </p>
          </div>
          
        </div>
      </section>

      {/* ==================== FOR SCHOOLS SECTION ==================== */}
      <section className="section-padding bg-forge-darker">
        <div className="container-forge">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div>
              <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-blue-400 bg-blue-500/10 rounded-full border border-blue-500/20">
                For Schools
              </span>
              
              <h2 className="text-3xl md:text-4xl font-bold text-forge-light mb-6">
                Register Your School
              </h2>
              
              <p className="text-forge-muted leading-relaxed mb-6">
                Give your students access to LaunchPad. As a registered school, your students 
                can apply to participate in the program, and your institution will be recognized 
                as a partner in youth entrepreneurship development.
              </p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start text-forge-muted">
                  <svg className="w-5 h-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Priority consideration for your students
                </li>
                <li className="flex items-start text-forge-muted">
                  <svg className="w-5 h-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  School recognition at LaunchPad events
                </li>
                <li className="flex items-start text-forge-muted">
                  <svg className="w-5 h-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Access to Forge's educational resources
                </li>
                <li className="flex items-start text-forge-muted">
                  <svg className="w-5 h-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Potential pathway to TechUp partnership
                </li>
              </ul>
              
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-smooth"
              >
                Register Your School
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            
            {/* Visual */}
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-500/20 via-blue-500/5 to-blue-500/20 border border-blue-500/20 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-7xl mb-4">🏫</div>
                  <p className="text-forge-muted">
                    [Partner school image]
                  </p>
                </div>
              </div>
            </div>
            
          </div>
          
        </div>
      </section>

      {/* ==================== SPONSOR SECTION ==================== */}
      <section id="sponsor" className="section-padding scroll-mt-20">
        <div className="container-forge">
          
          <SectionHeader
            label="Partner With Us"
            title="Sponsor LaunchPad 2026"
            description="Invest in the next generation of Nigerian entrepreneurs and innovators."
          />
          
          {/* Partner Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {partnerBenefits.map((benefit) => (
              <div 
                key={benefit.title}
                className="p-6 rounded-xl bg-accent-500/5 border border-accent-500/20"
              >
                <span className="text-3xl mb-4 block">{benefit.icon}</span>
                <h3 className="font-semibold text-forge-light mb-2">{benefit.title}</h3>
                <p className="text-forge-muted text-sm leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>

          {/* Who Should Sponsor */}
          <div className="max-w-4xl mx-auto">
            <div className="p-8 rounded-2xl bg-white/5 border border-forge-border">
              <h3 className="text-xl font-semibold text-forge-light mb-6 text-center">
                Who Should Partner With Us?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-primary-400 mb-3">Government Bodies</h4>
                  <ul className="space-y-2 text-forge-muted text-sm">
                    <li>• Lagos State Government</li>
                    <li>• Local Government Areas (LGAs)</li>
                    <li>• LCDAs across Lagos State</li>
                    <li>• Ministry of Education</li>
                    <li>• Ministry of Youth & Social Development</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-primary-400 mb-3">Private Sector</h4>
                  <ul className="space-y-2 text-forge-muted text-sm">
                    <li>• Corporate organizations (CSR)</li>
                    <li>• Banks and financial institutions</li>
                    <li>• Technology companies</li>
                    <li>• Foundations and NGOs</li>
                    <li>• Individual philanthropists</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Sponsor CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <Link
              href="/contact"
              className="px-8 py-4 bg-accent-600 hover:bg-accent-700 text-white font-medium rounded-lg transition-smooth glow text-center"
            >
              Become a Sponsor
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-white/5 hover:bg-white/10 text-forge-light font-medium rounded-lg border border-forge-border transition-smooth text-center"
            >
              Discuss Partnership Options
            </Link>
          </div>
          
        </div>
      </section>

      {/* ==================== FINAL CTA SECTION ==================== */}
      <section className="section-padding bg-gradient-to-b from-forge-darker to-forge-dark">
        <div className="container-forge">
          
          <div className="max-w-4xl mx-auto text-center">
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-forge-light mb-6">
              The future belongs to those who 
              <span className="gradient-text"> prepare for it today.</span>
            </h2>
            
            <p className="text-lg text-forge-muted mb-10 max-w-2xl mx-auto">
              Whether you're a student with a dream, a school looking to empower your students, 
              or an organization that believes in Nigeria's youth — there's a place for you 
              in LaunchPad 2026.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-smooth glow"
              >
                Apply Now (Students)
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-forge-light font-semibold rounded-lg border border-forge-border transition-smooth"
              >
                Register School
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 bg-accent-600 hover:bg-accent-700 text-white font-semibold rounded-lg transition-smooth"
              >
                Sponsor / Partner
              </Link>
            </div>
            
          </div>
          
        </div>
      </section>
      
    </div>
  );
}
