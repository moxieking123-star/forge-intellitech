// app/HomePageClient.tsx

"use client";

import Image from "next/image";
import Link from "next/link";
import ProductCard from "../components/ProductCard";
import { ChapterWrapper } from "../components/ChapterWrapper";
import AnimatedSection from "../components/AnimatedSection";
import { CTASection } from "../components/CTASection";
import AnimatedHero from "../components/AnimatedHero";
import {
  IconLearn,
  IconLaunch,
  IconBuild,
  IconScale,
  IconClassroom,
  IconCreator,
  IconAfrica,
  IconHeart,
  IconTime,
  IconCommunity,
  IconQuote,
  IconCamera,
  IconArrowRight,
} from "../components/icons/ForgeIcons";

// Products with new icons
const products = [
  {
    name: "TechUp",
    tagline: "Where young Nigerians learn to build",
    description: "We go into secondary schools and teach students how to actually create with technology — not just use it. Design, code, data, problem-solving. The skills that let you build, not just consume.",
    status: "pilot" as const,
    href: "/techup",
    color: "#14B8B8",
  },
  {
    name: "LaunchPad",
    tagline: "Your idea, your company, your future",
    description: "Got a solution in your head? We give you money, mentorship, and a team that actually wants you to succeed — and we don't take equity. This is about you, not us.",
    status: "development" as const,
    href: "/launchpad",
    color: "#FF8C42",
  },
  {
    name: "BiteBank",
    tagline: "Eating well shouldn't be complicated",
    description: "A meal planning app that understands how we eat here. Nigerian food, local vendors, family portions, your budget. Simple. Healthy. Ours.",
    status: "development" as const,
    href: "/products#bitebank",
    color: "#52B788",
  },
  {
    name: "Trego",
    tagline: "Moving cities forward",
    description: "What if public transport in African cities actually worked? Clean buses, real schedules, safe rides. We're building the mobility system we deserve.",
    status: "development" as const,
    href: "/products#trego",
    color: "#FFD54F",
  },
];

const productIcons = [IconLearn, IconLaunch, IconBuild, IconScale];

// Why Forge
const whyForgePoints = [
  {
    title: "We Build From Here",
    description: "We're not copying Silicon Valley. We're solving Nigerian problems with Nigerian insight. Our context is our superpower.",
    color: "#14B8B8",
  },
  {
    title: "People First. Always.",
    description: "We don't measure success in downloads or valuations. We measure it in students who believe in themselves, and communities that feel seen.",
    color: "#FF8C42",
  },
  {
    title: "We're in This for the Long Run",
    description: "Quick wins don't change systems. We're building things that will matter 20 years from now — infrastructure, not just apps.",
    color: "#52B788",
  },
  {
    title: "Nobody Builds Alone",
    description: "Schools, governments, parents, communities — this only works if we work together. We're not competitors. We're collaborators.",
    color: "#FFD54F",
  },
];

const whyForgeIcons = [IconAfrica, IconHeart, IconTime, IconCommunity];

// Impact stats
const impactStats = [
  { value: "10+", label: "Schools we've entered", subtext: "Lagos and beyond" },
  { value: "2,500+", label: "Students we've trained", subtext: "And counting" },
  { value: "30+", label: "Free workshops given", subtext: "In communities" },
  { value: "4", label: "Products in motion", subtext: "Built for Africa" },
];

// Testimonials
const voices = [
  {
    quote: "Forge isn't just teaching code. They're teaching young people that they can actually build things that matter. That's different. That's what we need.",
    name: "Dr. Amaka Eze",
    role: "Education Policy Researcher, University of Lagos",
    color: "#14B8B8",
  },
  {
    quote: "When Forge came to our school, something shifted. Students started asking 'how does this work?' instead of 'when is break time?' That's not small.",
    name: "Mr. Chukwuemeka Obi",
    role: "Vice Principal, Partner Secondary School",
    color: "#FF8C42",
  },
  {
    quote: "I've seen many NGOs promise to transform education. Forge actually shows up, does the work, and the students can prove what they've learned. That's rare.",
    name: "Mrs. Folake Adeyemi",
    role: "Parent & Education Advocate",
    color: "#52B788",
  },
];

export default function HomePageClient() {
  return (
    <ChapterWrapper chapter="forge">
      
      {/* ANIMATED HERO */}
      <AnimatedHero />

      {/* THE PROBLEM SECTION */}
      <section className="section-padding bg-env-bg-primary">
        <div className="container-forge">
          <div className="max-w-4xl mx-auto">
            
            <AnimatedSection animation="fade-up">
              <div className="text-center mb-12">
                <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-wider text-chapter-accent bg-chapter-accent-soft rounded-full border border-chapter-accent/20">
                  Let's Be Honest
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-env-primary mb-6 leading-tight">
                  Africa has talent.
                  <br />
                  <span className="text-env-secondary">What we don't have is the system to grow it.</span>
                </h2>
              </div>
            </AnimatedSection>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <AnimatedSection animation="fade-up" delay={100}>
                <div className="text-center p-6 rounded-2xl bg-env-surface border border-env-border">
                  <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <IconClassroom size={56} color="#14B8B8" />
                  </div>
                  <h3 className="text-lg font-semibold text-env-primary mb-2">Our Classrooms</h3>
                  <p className="text-env-secondary text-sm leading-relaxed">
                    Still teaching for exams, not for building. Kids memorize, pass, forget. The world moves on.
                  </p>
                </div>
              </AnimatedSection>
              
              <AnimatedSection animation="fade-up" delay={200}>
                <div className="text-center p-6 rounded-2xl bg-env-surface border border-env-border">
                  <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <IconCreator size={56} color="#FF8C42" />
                  </div>
                  <h3 className="text-lg font-semibold text-env-primary mb-2">Our Young People</h3>
                  <p className="text-env-secondary text-sm leading-relaxed">
                    Brilliant, hungry, creative — but told to wait. Wait for jobs. Wait for permission. Wait for someone else to build the future.
                  </p>
                </div>
              </AnimatedSection>
              
              <AnimatedSection animation="fade-up" delay={300}>
                <div className="text-center p-6 rounded-2xl bg-env-surface border border-env-border">
                  <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <IconAfrica size={56} color="#52B788" />
                  </div>
                  <h3 className="text-lg font-semibold text-env-primary mb-2">Our Solutions</h3>
                  <p className="text-env-secondary text-sm leading-relaxed">
                    Built elsewhere, imported here. Designed for problems we don't have, ignoring the ones we do.
                  </p>
                </div>
              </AnimatedSection>
            </div>
            
            <AnimatedSection animation="fade-up" delay={400}>
              <div className="p-8 rounded-2xl bg-gradient-to-br from-chapter-accent/10 to-transparent border border-chapter-accent/20 text-center">
                <p className="text-xl md:text-2xl text-env-primary font-medium leading-relaxed">
                  We looked at this and asked a simple question:
                </p>
                <p className="text-2xl md:text-3xl text-chapter-accent font-bold mt-4">
                  What if we built the pipeline ourselves?
                </p>
              </div>
            </AnimatedSection>
            
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section className="section-padding bg-env-bg-primary">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-chapter-accent bg-chapter-accent-soft rounded-full border border-chapter-accent/20">
                What We're Building
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-env-primary mb-4">
                Real Products. Real Problems. Real Progress.
              </h2>
              <p className="text-lg text-env-secondary max-w-2xl mx-auto">
                These aren't ideas on a whiteboard. They're solutions we're building and testing right now — 
                each one answering a question we've heard from our own communities.
              </p>
            </div>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map((product, index) => {
              const Icon = productIcons[index];
              return (
                <AnimatedSection 
                  key={product.name} 
                  animation="fade-up"
                  delay={index * 100}
                >
                  <Link 
                    href={product.href}
                    className="group block h-full p-6 md:p-8 rounded-2xl bg-env-surface border border-env-border hover:border-transparent transition-all duration-300"
                    style={{
                      '--hover-shadow': `0 20px 40px ${product.color}15`,
                      '--hover-border': product.color,
                    } as React.CSSProperties}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = `0 20px 40px ${product.color}20`;
                      e.currentTarget.style.borderColor = product.color + '50';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.borderColor = 'var(--env-border)';
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div 
                        className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                        style={{ backgroundColor: product.color + '20' }}
                      >
                        <Icon size={32} color={product.color} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-xl font-bold text-env-primary">
                            {product.name}
                          </h3>
                          <span 
                            className="px-2 py-0.5 text-xs font-medium rounded-full"
                            style={{ 
                              backgroundColor: product.status === 'pilot' ? '#52B78820' : '#FF8C4220',
                              color: product.status === 'pilot' ? '#52B788' : '#FF8C42'
                            }}
                          >
                            {product.status === 'pilot' ? 'Live Pilot' : 'In Development'}
                          </span>
                        </div>
                        <p 
                          className="text-sm font-medium mb-3"
                          style={{ color: product.color }}
                        >
                          {product.tagline}
                        </p>
                        <p className="text-env-secondary text-sm leading-relaxed mb-4">
                          {product.description}
                        </p>
                        <span 
                          className="inline-flex items-center text-sm font-medium transition-all duration-300 group-hover:gap-3"
                          style={{ color: product.color }}
                        >
                          Learn more
                          <IconArrowRight size={16} color={product.color} className="ml-1.5 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              );
            })}
          </div>
          
        </div>
      </section>

      {/* WHY FORGE SECTION */}
      <section className="section-padding bg-env-secondary">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-chapter-accent bg-chapter-accent-soft rounded-full border border-chapter-accent/20">
                Our Approach
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-env-primary mb-4">
                Why Forge?
              </h2>
              <p className="text-lg text-env-secondary max-w-2xl mx-auto">
                Plenty of people talk about changing Africa. Here's what makes us different — 
                and why we think it matters.
              </p>
            </div>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whyForgePoints.map((point, index) => {
              const Icon = whyForgeIcons[index];
              return (
                <AnimatedSection 
                  key={point.title}
                  animation="fade-up"
                  delay={index * 75}
                >
                  <div className="h-full p-6 md:p-8 rounded-2xl bg-env-surface border border-env-border hover:border-transparent transition-all duration-300 group"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = `0 15px 30px ${point.color}15`;
                      e.currentTarget.style.borderColor = point.color + '40';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.borderColor = 'var(--env-border)';
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div 
                        className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                        style={{ backgroundColor: point.color + '20' }}
                      >
                        <Icon size={28} color={point.color} />
                      </div>
                      <div>
                        <h3 
                          className="text-xl font-bold mb-2 transition-colors duration-300"
                          style={{ color: 'var(--env-text-primary)' }}
                        >
                          {point.title}
                        </h3>
                        <p className="text-env-secondary leading-relaxed">
                          {point.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
          
        </div>
      </section>

      {/* IMPACT SECTION */}
      <section className="section-padding bg-env-bg-primary">
        <div className="container-forge">

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            <AnimatedSection animation="fade-up">
              <div className="relative h-[350px] md:h-[450px] rounded-2xl overflow-hidden">
                <Image
                  src="/images/africa-go.jpg"
                  alt="Students learning digital skills in a Forge classroom"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-3 mb-2">
                    <IconCamera size={20} color="#FF8C42" />
                    <span className="text-white/80 text-sm">Lagos, Nigeria</span>
                  </div>
                  <p className="text-white text-lg font-medium">
                    TechUp session in action — students building their first websites.
                  </p>
                </div>
              </div>
            </AnimatedSection>

            <div>
              <AnimatedSection animation="fade-up">
                <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-chapter-accent bg-chapter-accent-soft rounded-full border border-chapter-accent/20">
                  So Far
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-4">
                  We're not just talking.
                  <br />
                  <span className="text-chapter-accent">We're showing up.</span>
                </h2>
                <p className="text-lg text-env-secondary mb-8">
                  These aren't projections or goals. These are things that have already happened — 
                  classrooms we've entered, students we've taught, communities we've worked with.
                </p>
              </AnimatedSection>

              <AnimatedSection animation="fade-up" delay={100}>
                <div className="grid grid-cols-2 gap-4">
                  {impactStats.map((stat, index) => (
                    <div 
                      key={stat.label} 
                      className="p-5 rounded-xl bg-env-surface border border-env-border"
                    >
                      <div className="text-3xl md:text-4xl font-bold text-chapter-accent mb-1">
                        {stat.value}
                      </div>
                      <div className="text-env-primary text-sm font-medium mb-1">
                        {stat.label}
                      </div>
                      <div className="text-env-tertiary text-xs">
                        {stat.subtext}
                      </div>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
              
              <AnimatedSection animation="fade-up" delay={200}>
                <p className="mt-6 text-env-secondary">
                  Every number here has a face, a name, a story. That's what keeps us going.
                </p>
              </AnimatedSection>
            </div>

          </div>
          
        </div>
      </section>

      {/* VOICES SECTION */}
      <section className="section-padding bg-env-secondary">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-chapter-accent bg-chapter-accent-soft rounded-full border border-chapter-accent/20">
                What People Say About Forge
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-4">
                Don't take our word for it.
              </h2>
              <p className="text-lg text-env-secondary max-w-2xl mx-auto">
                Educators, parents, and partners who've seen what we do — 
                and why they believe it matters.
              </p>
            </div>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {voices.map((voice, index) => (
              <AnimatedSection key={voice.name} animation="fade-up" delay={index * 100}>
                <div className="h-full p-6 md:p-8 rounded-2xl bg-env-surface border border-env-border flex flex-col">
                  
                  <div className="mb-4">
                    <IconQuote size={40} color={voice.color} />
                  </div>
                  
                  <p className="text-env-primary leading-relaxed flex-1 mb-6 text-lg">
                    "{voice.quote}"
                  </p>
                  
                  <div className="flex items-center gap-3 pt-4 border-t border-env-border">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                      style={{ backgroundColor: voice.color }}
                    >
                      {voice.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-env-primary">
                        {voice.name}
                      </div>
                      <div className="text-sm text-env-secondary">
                        {voice.role}
                      </div>
                    </div>
                  </div>
                  
                </div>
              </AnimatedSection>
            ))}
          </div>
          
        </div>
      </section>

      {/* JOURNEY SECTION */}
      <section className="section-padding bg-env-bg-primary">
        <div className="container-forge">
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            <AnimatedSection animation="fade-up">
              <div className="relative h-[350px] md:h-[400px] rounded-2xl overflow-hidden">
                <Image
                  src="/images/launchpad/students-learning.jpg"
                  alt="Students collaborating on a project"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="fade-up" delay={100}>
              <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-chapter-accent bg-chapter-accent-soft rounded-full border border-chapter-accent/20">
                The Bigger Picture
              </span>
              
              <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-6 leading-tight">
                This isn't about one program.
                <br />
                <span className="text-chapter-accent">It's about changing how Africa builds.</span>
              </h2>
              
              <div className="space-y-4 text-lg text-env-secondary leading-relaxed">
                <p>
                  Right now, most technology that runs Africa was built somewhere else. 
                  We import apps, platforms, and systems designed for contexts that don't look like ours.
                </p>
                <p>
                  That's not sustainable. And honestly? It's not necessary.
                </p>
                <p>
                  Young people here have the ideas. They understand the problems. 
                  What they need is the skills to build — and a system that backs them up.
                </p>
                <p className="text-env-primary font-medium">
                  That's what Forge is building. Not just coders. 
                  <span className="text-chapter-accent"> A generation of builders.</span>
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-chapter-accent hover:bg-chapter-accent-hover text-white font-semibold transition-all duration-300 hover:scale-[1.02]"
                >
                  Read Our Full Story
                  <IconArrowRight size={18} />
                </Link>
                <Link
                  href="/techup"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-env-surface hover:bg-env-surface-hover text-env-primary font-semibold border border-env-border transition-all duration-300"
                >
                  See TechUp in Action
                </Link>
              </div>
            </AnimatedSection>
            
          </div>
          
        </div>
      </section>

      {/* CTA SECTION */}
      <CTASection
        headline="Ready to be part of this"
        highlightedText="?"
        description="Whether you're a school looking to bring TechUp to your students, a funder who believes in long-term change, or just someone who wants to help — we'd love to hear from you. This movement needs more hands."
        primaryAction={{
          label: "Get Involved",
          href: "/contact",
        }}
        secondaryAction={{
          label: "Follow Our Journey",
          href: "/about",
        }}
        backgroundImage="/images/cta/homepage-cta.jpg"
        overlayOpacity={80}
      />
      
    </ChapterWrapper>
  );
}