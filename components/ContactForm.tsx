"use client";

import { useState } from "react";
import { supabase, isSupabaseReady } from "@/lib/supabase";

const categories = [
  { value: "", label: "Select a category" },
  { value: "partnership", label: "Partnership Inquiry" },
  { value: "school", label: "School Program (TechUp)" },
  { value: "launchpad", label: "LaunchPad Interest" },
  { value: "careers", label: "Career Opportunities" },
  { value: "press", label: "Press & Media" },
  { value: "general", label: "General Inquiry" },
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    category: "",
    message: "",
  });
  
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    // Validation
    if (!formData.name || !formData.email || !formData.category || !formData.message) {
      setStatus("error");
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    if (!isSupabaseReady()) {
      setStatus("error");
      setErrorMessage("Contact form is temporarily unavailable. Please email us directly at hello@forgeintellitech.com");
      return;
    }

    try {
      const { error } = await supabase
        .from("contact_messages")
        .insert([
          {
            name: formData.name,
            email: formData.email,
            organization: formData.organization || null,
            category: formData.category,
            message: formData.message,
          },
        ]);

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        organization: "",
        category: "",
        message: "",
      });
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-chapter-accent-soft flex items-center justify-center">
          <svg className="w-8 h-8 text-chapter-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-env-primary mb-2">Message Sent!</h3>
        <p className="text-env-secondary max-w-md mx-auto">
          Thank you for reaching out. We'll get back to you as soon as possible.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-chapter-accent hover:underline font-medium"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      
      {/* Name & Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-name" className="block text-sm font-medium text-env-secondary mb-2">
            Your Name *
          </label>
          <input
            type="text"
            id="contact-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-env-bg-primary border border-env-border text-env-primary placeholder-env-tertiary focus:border-chapter-accent focus:ring-1 focus:ring-chapter-accent transition-smooth"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium text-env-secondary mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="contact-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-env-bg-primary border border-env-border text-env-primary placeholder-env-tertiary focus:border-chapter-accent focus:ring-1 focus:ring-chapter-accent transition-smooth"
            placeholder="john@example.com"
          />
        </div>
      </div>

      {/* Organization & Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-organization" className="block text-sm font-medium text-env-secondary mb-2">
            Organization
          </label>
          <input
            type="text"
            id="contact-organization"
            name="organization"
            value={formData.organization}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-env-bg-primary border border-env-border text-env-primary placeholder-env-tertiary focus:border-chapter-accent focus:ring-1 focus:ring-chapter-accent transition-smooth"
            placeholder="Your company or school"
          />
        </div>
        <div>
          <label htmlFor="contact-category" className="block text-sm font-medium text-env-secondary mb-2">
            Category *
          </label>
          <select
            id="contact-category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-env-bg-primary border border-env-border text-env-primary focus:border-chapter-accent focus:ring-1 focus:ring-chapter-accent transition-smooth"
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-env-secondary mb-2">
          Message *
        </label>
        <textarea
          id="contact-message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full px-4 py-3 rounded-lg bg-env-bg-primary border border-env-border text-env-primary placeholder-env-tertiary focus:border-chapter-accent focus:ring-1 focus:ring-chapter-accent transition-smooth resize-none"
          placeholder="Tell us how we can help..."
        />
      </div>

      {/* Error Message */}
      {status === "error" && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
          {errorMessage}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-4 bg-chapter-accent hover:bg-chapter-accent-hover text-white font-semibold rounded-lg transition-smooth shadow-glow disabled:opacity-50 disabled:cursor-not-allowed hover-lift"
      >
        {status === "loading" ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Sending...
          </span>
        ) : (
          "Send Message"
        )}
      </button>
      
    </form>
  );
}