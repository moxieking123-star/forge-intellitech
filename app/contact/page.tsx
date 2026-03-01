import { ChapterWrapper } from "../../components/ChapterWrapper";
import { AnimatedSection } from "../../components/AnimatedSection";
import ContactForm from "../../components/ContactForm";

// Metadata for SEO
export const metadata = {
  title: "Contact Us",
  description: "Get in touch with Forge Intellitech. We'd love to hear from you about partnerships, programs, or just to say hello.",
};

// Contact methods
const contactMethods = [
  {
    icon: "📧",
    title: "Email",
    description: "Send us a message anytime",
    value: "admin@forgeintellitech.com",
    href: "mailto:admin@forgeintellitech.com",
  },
  {
    icon: "📍",
    title: "Location",
    description: "Based in Lagos, Nigeria",
    value: "Lagos, Nigeria",
    href: null,
  },
  {
    icon: "💬",
    title: "Social",
    description: "Follow us for updates",
    value: "@forgeintelli",
    href: "https://twitter.com/forgeintelli",
  },
  {
    icon: "",
    title: "Call/Whatsapp Number",
    description: "Calls Forge on",
    value: "09015175807",
    href: "https://wa.link/fcu0jk",
  },
];

// Inquiry types
const inquiryTypes = [
  {
    icon: "🤝",
    title: "Partnership",
    description: "Collaborate with us on programs or products",
  },
  {
    icon: "🏫",
    title: "Schools",
    description: "Bring TechUp to your school",
  },
  {
    icon: "💼",
    title: "Careers",
    description: "Join our team",
  },
  {
    icon: "📰",
    title: "Press",
    description: "Media inquiries and interviews",
  },
];

export default function ContactPage() {
  return (
    <ChapterWrapper chapter="forge">
      
      {/* ==================== HERO SECTION ==================== */}
      <section className="section-padding">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="max-w-3xl mx-auto text-center">
              
              <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-wider text-chapter-accent bg-chapter-accent-soft rounded-full border border-chapter-accent/20">
                Contact Us
              </span>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-env-primary mb-6">
                Let's start a 
                <span className="gradient-text"> conversation</span>
              </h1>
              
              <p className="text-xl text-env-secondary leading-relaxed">
                Whether you're interested in partnering with us, bringing our programs 
                to your school, or just want to say hello — we'd love to hear from you.
              </p>
              
            </div>
          </AnimatedSection>
          
        </div>
      </section>

      {/* ==================== CONTACT METHODS ==================== */}
      <section className="pb-12">
        <div className="container-forge">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {contactMethods.map((method, index) => (
              <AnimatedSection key={method.title} animation="fade-up" delay={index * 100}>
                <div className="p-6 rounded-xl bg-env-surface border border-env-border text-center hover:border-chapter-accent/30 transition-smooth hover-lift">
                  <span className="text-3xl block mb-3">{method.icon}</span>
                  <h3 className="font-semibold text-env-primary mb-1">{method.title}</h3>
                  <p className="text-env-tertiary text-sm mb-2">{method.description}</p>
                  {method.href ? (
                    <a 
                      href={method.href}
                      className="text-chapter-accent hover:underline font-medium"
                      target={method.href.startsWith('http') ? '_blank' : undefined}
                      rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      {method.value}
                    </a>
                  ) : (
                    <span className="text-env-primary font-medium">{method.value}</span>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
          
        </div>
      </section>

      {/* ==================== INQUIRY TYPES ==================== */}
      <section className="py-12 bg-env-secondary">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <h2 className="text-2xl font-bold text-env-primary text-center mb-8">
              How can we help?
            </h2>
          </AnimatedSection>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {inquiryTypes.map((type, index) => (
              <AnimatedSection key={type.title} animation="fade-up" delay={index * 75}>
                <div className="p-4 rounded-xl bg-env-surface border border-env-border text-center hover:border-chapter-accent/30 transition-smooth group">
                  <span className="text-2xl block mb-2 group-hover:scale-110 transition-transform">
                    {type.icon}
                  </span>
                  <h3 className="font-semibold text-env-primary text-sm mb-1">{type.title}</h3>
                  <p className="text-env-tertiary text-xs">{type.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
          
        </div>
      </section>

      {/* ==================== CONTACT FORM ==================== */}
      <section className="section-padding">
        <div className="container-forge">
          
          <div className="max-w-2xl mx-auto">
            <AnimatedSection animation="fade-up">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-env-primary mb-4">
                  Send us a message
                </h2>
                <p className="text-env-secondary">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>
              
              <div className="p-6 md:p-8 rounded-2xl bg-env-surface border border-env-border">
                <ContactForm />
              </div>
            </AnimatedSection>
          </div>
          
        </div>
      </section>

      {/* ==================== MAP/LOCATION SECTION ==================== */}
      <section className="py-16 bg-env-secondary">
        <div className="container-forge">
          
          <AnimatedSection animation="fade-up">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-env-primary mb-4">
                Based in Lagos, Building for Africa
              </h2>
              <p className="text-env-secondary mb-8">
                Our headquarters is in Lagos, Nigeria, but our vision spans the entire continent.
                We work with partners across Africa and welcome collaborations from anywhere in the world.
              </p>
              
              {/* Map placeholder */}
              <div className="aspect-video rounded-2xl bg-env-surface border border-env-border flex items-center justify-center">
                <div className="text-center">
                  <span className="text-5xl block mb-4">🌍</span>
                  <p className="text-env-tertiary">Lagos, Nigeria</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
          
        </div>
      </section>
      
    </ChapterWrapper>
  );
}