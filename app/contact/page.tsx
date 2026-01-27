"use client";

import { useState } from "react";
import Link from "next/link";

// Contact categories
const contactCategories = [
  { value: "general", label: "General Inquiry" },
  { value: "partnership", label: "Partnership Opportunity" },
  { value: "investment", label: "Investment Inquiry" },
  { value: "schools", label: "School Registration (TechUp)" },
  { value: "launchpad", label: "LaunchPad Application" },
  { value: "media", label: "Media & Press" },
  { value: "careers", label: "Careers & Talent" },
];

// FAQ items
const faqs = [
  {
    question: "How quickly will I receive a response?",
    answer: "We aim to respond to all inquiries within 2-3 business days. For urgent partnership or investment inquiries, we prioritize faster responses.",
  },
  {
    question: "I'm a student. How do I apply for LaunchPad?",
    answer: "Select 'LaunchPad Application' from the category dropdown and tell us about yourself and your business idea. We'll send you the full application details.",
  },
  {
    question: "How can my school join TechUp?",
    answer: "Select 'School Registration (TechUp)' and provide your school details. Our team will reach out to discuss partnership options.",
  },
  {
    question: "Are you open to investors?",
    answer: "Yes! We're always open to conversations with aligned investors who share our vision for African technology. Select 'Investment Inquiry' to start the conversation.",
  },
];

export default function ContactPage() {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    category: "general",
    message: "",
  });
  
  // Form status
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        organization: "",
        category: "general",
        message: "",
      });
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Failed to send message");
    }
  };

  return (
    <div>
      
      {/* ==================== HERO SECTION ==================== */}
      <section className="section-padding pb-8">
        <div className="container-forge">
          <div className="max-w-3xl">
            
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-wider text-primary-400 bg-primary-500/10 rounded-full border border-primary-500/20">
              Contact Us
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-forge-light mb-6">
              Let's Start a Conversation
            </h1>
            
            <p className="text-xl text-forge-muted leading-relaxed">
              Whether you're interested in partnership, investment, or just want to 
              learn more about what we're building — we'd love to hear from you.
            </p>
            
          </div>
        </div>
      </section>

      {/* ==================== CONTACT FORM & INFO ==================== */}
      <section className="section-padding pt-8">
        <div className="container-forge">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="p-6 md:p-8 rounded-2xl bg-white/5 border border-forge-border">
                
                <h2 className="text-2xl font-bold text-forge-light mb-6">
                  Send Us a Message
                </h2>

                {/* Success Message */}
                {status === "success" && (
                  <div className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">✅</span>
                      <div>
                        <h3 className="font-semibold text-green-400 mb-1">Message Sent!</h3>
                        <p className="text-forge-muted text-sm">
                          Thank you for reaching out. We'll get back to you within 2-3 business days.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {status === "error" && (
                  <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">❌</span>
                      <div>
                        <h3 className="font-semibold text-red-400 mb-1">Something went wrong</h3>
                        <p className="text-forge-muted text-sm">{errorMessage}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-forge-light mb-2">
                        Full Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your full name"
                        className="w-full px-4 py-3 bg-forge-dark border border-forge-border rounded-lg text-forge-light placeholder:text-forge-muted focus:outline-none focus:border-primary-500 transition-smooth"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-forge-light mb-2">
                        Email Address <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 bg-forge-dark border border-forge-border rounded-lg text-forge-light placeholder:text-forge-muted focus:outline-none focus:border-primary-500 transition-smooth"
                      />
                    </div>
                  </div>

                  {/* Organization & Category Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="organization" className="block text-sm font-medium text-forge-light mb-2">
                        Organization <span className="text-forge-muted">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        id="organization"
                        name="organization"
                        value={formData.organization}
                        onChange={handleChange}
                        placeholder="Company, school, or organization"
                        className="w-full px-4 py-3 bg-forge-dark border border-forge-border rounded-lg text-forge-light placeholder:text-forge-muted focus:outline-none focus:border-primary-500 transition-smooth"
                      />
                    </div>
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-forge-light mb-2">
                        Inquiry Type <span className="text-red-400">*</span>
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-forge-dark border border-forge-border rounded-lg text-forge-light focus:outline-none focus:border-primary-500 transition-smooth"
                      >
                        {contactCategories.map((cat) => (
                          <option key={cat.value} value={cat.value}>
                            {cat.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-forge-light mb-2">
                      Your Message <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      placeholder="Tell us about your inquiry, project, or how you'd like to collaborate..."
                      className="w-full px-4 py-3 bg-forge-dark border border-forge-border rounded-lg text-forge-light placeholder:text-forge-muted focus:outline-none focus:border-primary-500 transition-smooth resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full md:w-auto px-8 py-4 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-600/50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-smooth glow"
                  >
                    {status === "loading" ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      "Send Message"
                    )}
                  </button>

                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              
              {/* Direct Contact */}
              <div className="p-6 rounded-xl bg-white/5 border border-forge-border">
                <h3 className="text-lg font-semibold text-forge-light mb-4">
                  Direct Contact
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <span className="text-xl">📧</span>
                    <div>
                      <p className="text-sm text-forge-muted">Email</p>
                      <a 
                        href="mailto:hello@forgeintelli.com" 
                        className="text-primary-400 hover:text-primary-300 transition-smooth"
                      >
                        hello@forgeintelli.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-xl">📍</span>
                    <div>
                      <p className="text-sm text-forge-muted">Location</p>
                      <p className="text-forge-light">Lagos, Nigeria</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="p-6 rounded-xl bg-white/5 border border-forge-border">
                <h3 className="text-lg font-semibold text-forge-light mb-4">
                  Follow Us
                </h3>
                <div className="flex space-x-4">
                  <a 
                    href="https://twitter.com/forgeintelli" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 border border-forge-border flex items-center justify-center text-forge-muted hover:text-primary-400 transition-smooth"
                    aria-label="Twitter"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://linkedin.com/company/forge-intellitech" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 border border-forge-border flex items-center justify-center text-forge-muted hover:text-primary-400 transition-smooth"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://github.com/forge-intellitech" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 border border-forge-border flex items-center justify-center text-forge-muted hover:text-primary-400 transition-smooth"
                    aria-label="GitHub"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Response Time */}
              <div className="p-6 rounded-xl bg-primary-500/10 border border-primary-500/20">
                <h3 className="text-lg font-semibold text-forge-light mb-2">
                  Response Time
                </h3>
                <p className="text-forge-muted text-sm">
                  We typically respond within <strong className="text-forge-light">2-3 business days</strong>. 
                  For urgent matters, please indicate so in your message.
                </p>
              </div>

              {/* Quick Links */}
              <div className="p-6 rounded-xl bg-white/5 border border-forge-border">
                <h3 className="text-lg font-semibold text-forge-light mb-4">
                  Quick Links
                </h3>
                <div className="space-y-2">
                  <Link 
                    href="/join" 
                    className="flex items-center text-forge-muted hover:text-primary-400 transition-smooth"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Join Our Team
                  </Link>
                  <Link 
                    href="/techup" 
                    className="flex items-center text-forge-muted hover:text-primary-400 transition-smooth"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    TechUp Program
                  </Link>
                  <Link 
                    href="/launchpad" 
                    className="flex items-center text-forge-muted hover:text-primary-400 transition-smooth"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    LaunchPad Program
                  </Link>
                </div>
              </div>

            </div>
            
          </div>
          
        </div>
      </section>

      {/* ==================== FAQ SECTION ==================== */}
      <section className="section-padding bg-forge-darker">
        <div className="container-forge">
          
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-forge-light mb-8 text-center">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div 
                  key={index}
                  className="p-6 rounded-xl bg-white/5 border border-forge-border"
                >
                  <h3 className="font-semibold text-forge-light mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-forge-muted text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </section>

      {/* ==================== MAP/LOCATION SECTION ==================== */}
      <section className="section-padding">
        <div className="container-forge">
          
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-4xl block mb-4">🌍</span>
            <h2 className="text-2xl font-bold text-forge-light mb-4">
              Based in Lagos, Building for Africa
            </h2>
            <p className="text-forge-muted mb-8">
              We're headquartered in Lagos, Nigeria — the beating heart of African innovation. 
              But our vision extends across the entire continent.
            </p>
            
            {/* Map placeholder */}
            <div className="aspect-video rounded-2xl bg-white/5 border border-forge-border flex items-center justify-center">
              <div className="text-center p-8">
                <span className="text-6xl block mb-4">🗺️</span>
                <p className="text-forge-muted">[Map or location image]</p>
              </div>
            </div>
          </div>
          
        </div>
      </section>
      
    </div>
  );
}