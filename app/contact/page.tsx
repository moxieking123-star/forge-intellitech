// app/contact/page.tsx
"use client";

import Link from "next/link";
import { ChapterWrapper } from "../../components/ChapterWrapper";
import AnimatedSection from "../../components/AnimatedSection";
import ContactHero from "../../components/ContactHero";
import ContactForm from "../../components/ContactForm";
import {
  IconMail,
  IconLocation,
  IconPhone,
  IconSocial,
  IconPartnership,
  IconSchool,
  IconCareer,
  IconPress,
  IconArrowRight,
} from "../../components/icons/ForgeIcons";

// Contact methods
const contactMethods = [
  {
    icon: IconMail,
    title: "Email",
    description: "Send us a message anytime",
    value: "admin@forgeintellitech.com",
    href: "mailto:admin@forgeintellitech.com",
    color: "#FF8C42",
  },
  {
    icon: IconPhone,
    title: "Call / WhatsApp",
    description: "Reach us directly",
    value: "09015175807",
    href: "https://wa.link/fcu0jk",
    color: "#52B788",
  },
  {
    icon: IconLocation,
    title: "Location",
    description: "Based in Lagos, Nigeria",
    value: "Lagos, Nigeria 🇳🇬",
    href: null,
    color: "#14B8B8",
  },
  {
    icon: IconSocial,
    title: "Social",
    description: "Follow us for updates",
    value: "@forgeintelli",
    href: "https://twitter.com/forgeintelli",
    color: "#A855F7",
  },
];

// Inquiry types
const inquiryTypes = [
  {
    icon: IconPartnership,
    title: "Partnership",
    description: "Collaborate with us on programs or products",
    color: "#FF8C42",
  },
  {
    icon: IconSchool,
    title: "Schools",
    description: "Bring TechUp to your school",
    color: "#14B8B8",
  },
  {
    icon: IconCareer,
    title: "Careers",
    description: "Join our team",
    color: "#52B788",
  },
  {
    icon: IconPress,
    title: "Press",
    description: "Media inquiries and interviews",
    color: "#FFD54F",
  },
];

export default function ContactPage() {
  return (
    <ChapterWrapper chapter="forge">
      
      {/* ==================== ANIMATED HERO ==================== */}
      <ContactHero />

      {/* ==================== CONTACT METHODS ==================== */}
      <section className="section-padding bg-env-bg-primary">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-env-primary mb-4">
                Ways to Reach Us
              </h2>
              <p className="text-env-secondary max-w-xl mx-auto">
                Choose whatever works best for you. We try to respond within 24-48 hours.
              </p>
            </div>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <AnimatedSection key={method.title} animation="fade-up" delay={index * 100}>
                  <div 
                    className="p-6 rounded-2xl bg-env-surface border border-env-border hover:border-transparent text-center h-full transition-all duration-300"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = method.color + '40';
                      e.currentTarget.style.boxShadow = `0 15px 30px ${method.color}15`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--env-border)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div className="mb-4 flex justify-center">
                      <div 
                        className="w-14 h-14 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: method.color + '15' }}
                      >
                        <Icon size={28} color={method.color} />
                      </div>
                    </div>
                    <h3 className="font-semibold text-env-primary mb-1">{method.title}</h3>
                    <p className="text-env-tertiary text-sm mb-3">{method.description}</p>
                    {method.href ? (
                      <a 
                        href={method.href}
                        className="font-medium text-sm hover:underline transition-colors"
                        style={{ color: method.color }}
                        target={method.href.startsWith('http') ? '_blank' : undefined}
                        rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        {method.value}
                      </a>
                    ) : (
                      <span className="font-medium text-sm text-env-primary">{method.value}</span>
                    )}
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
          
        </div>
      </section>

      {/* ==================== INQUIRY TYPES ==================== */}
      <section className="py-16 bg-env-secondary">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-env-primary mb-4">
                How Can We Help?
              </h2>
              <p className="text-env-secondary max-w-xl mx-auto">
                Let us know what you're looking for, and we'll point you in the right direction.
              </p>
            </div>
          </AnimatedSection>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {inquiryTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <AnimatedSection key={type.title} animation="fade-up" delay={index * 75}>
                  <div 
                    className="p-5 rounded-xl bg-env-surface border border-env-border hover:border-transparent text-center transition-all duration-300 group cursor-pointer"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = type.color + '40';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--env-border)';
                    }}
                  >
                    <div className="mb-3 flex justify-center transition-transform group-hover:scale-110">
                      <Icon size={36} color={type.color} />
                    </div>
                    <h3 className="font-semibold text-env-primary text-sm mb-1">{type.title}</h3>
                    <p className="text-env-tertiary text-xs">{type.description}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
          
        </div>
      </section>

      {/* ==================== CONTACT FORM ==================== */}
      <section id="contact-form" className="section-padding bg-env-bg-primary scroll-mt-20">
        <div className="container-forge">
          
          <div className="max-w-2xl mx-auto">
            <AnimatedSection animation="fade-up">
              <div className="text-center mb-10">
                <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-[#FF8C42] bg-[#FF8C42]/10 rounded-full border border-[#FF8C42]/20">
                  Send a Message
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-4">
                  Drop Us a Line
                </h2>
                <p className="text-env-secondary">
                  Fill out the form below and we'll get back to you as soon as possible. 
                  We read every message.
                </p>
              </div>
              
              <div 
                className="p-6 md:p-8 rounded-2xl bg-env-surface"
                style={{ border: '1px solid var(--env-border)' }}
              >
                <ContactForm />
              </div>
            </AnimatedSection>
          </div>
          
        </div>
      </section>

      {/* ==================== LOCATION ==================== */}
      <section className="section-padding bg-env-secondary">
        <div className="container-forge">
          
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            
            <AnimatedSection animation="fade-up">
              <div>
                <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-[#14B8B8] bg-[#14B8B8]/10 rounded-full border border-[#14B8B8]/20">
                  Our Home
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-6">
                  Based in Lagos,
                  <br /><span className="text-[#14B8B8]">Building for Africa</span>
                </h2>
                <p className="text-lg text-env-secondary leading-relaxed mb-6">
                  Our headquarters is in Lagos, Nigeria, but our vision spans the entire continent. 
                  We work with partners across Africa and welcome collaborations from anywhere in the world.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <IconLocation size={20} color="#14B8B8" />
                    <span className="text-env-primary">Lagos, Nigeria 🇳🇬</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <IconMail size={20} color="#FF8C42" />
                    <a href="mailto:admin@forgeintellitech.com" className="text-[#FF8C42] hover:underline">
                      admin@forgeintellitech.com
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="fade-up" delay={200}>
              <div 
                className="aspect-video rounded-2xl flex items-center justify-center"
                style={{ 
                  backgroundColor: 'var(--env-surface)',
                  border: '1px solid var(--env-border)'
                }}
              >
                <div className="text-center p-8">
                  <span className="text-6xl block mb-4">🌍</span>
                  <p className="text-env-primary font-semibold mb-2">Lagos, Nigeria</p>
                  <p className="text-env-secondary text-sm">
                    Building African technology from the heart of West Africa
                  </p>
                </div>
              </div>
            </AnimatedSection>
            
          </div>
          
        </div>
      </section>

      {/* ==================== QUICK LINKS ==================== */}
      <section className="py-16 bg-env-bg-primary">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-env-primary mb-4">
                Looking for Something Specific?
              </h2>
            </div>
          </AnimatedSection>
          
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { label: 'Bring TechUp to Your School', href: '/techup', color: '#14B8B8' },
              { label: 'Partner With Us', href: '/join#partners', color: '#FF8C42' },
              { label: 'Join Our Team', href: '/join#talent', color: '#52B788' },
              { label: 'Learn About LaunchPad', href: '/launchpad', color: '#A855F7' },
            ].map((link, index) => (
              <AnimatedSection key={link.label} animation="fade-up" delay={index * 50}>
                <Link
                  href={link.href}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-[1.02]"
                  style={{ 
                    backgroundColor: link.color + '10',
                    color: link.color,
                    border: `1px solid ${link.color}20`
                  }}
                >
                  {link.label}
                  <IconArrowRight size={16} color={link.color} />
                </Link>
              </AnimatedSection>
            ))}
          </div>
          
        </div>
      </section>
      
    </ChapterWrapper>
  );
}