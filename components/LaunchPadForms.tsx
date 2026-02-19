"use client";

import { useState } from "react";
import { supabase, isSupabaseReady } from "@/lib/supabase";
import { LAUNCHPAD_CONFIG, sponsorshipTiers } from "@/lib/launchpadData";

// ============================================
// FORM MODAL COMPONENT
// ============================================

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function FormModal({ isOpen, onClose, title, children }: FormModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="flex min-h-full items-center justify-center p-4">
        {/* Modal Content */}
        <div className="relative w-full max-w-2xl bg-env-surface border border-env-border rounded-2xl shadow-2xl transform transition-all">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-env-border">
            <h2 className="text-xl font-bold text-env-primary">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-env-secondary transition-colors"
              aria-label="Close modal"
            >
              <svg 
                className="w-5 h-5 text-env-secondary" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
            </button>
          </div>
          
          {/* Body */}
          <div className="p-6 max-h-[70vh] overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// STUDENT APPLICATION FORM
// ============================================

export function StudentApplicationForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    schoolName: "",
    schoolLevel: "",
    parentName: "",
    parentPhone: "",
    businessCategory: "",
    businessTitle: "",
    problemStatement: "",
    solution: "",
    aiIntegration: "",
    whyJoin: "",
    parentConsent: false,
    termsAccepted: false,
  });
  
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    if (!isSupabaseReady()) {
      setStatus("error");
      setErrorMessage("Application system is temporarily unavailable. Please try again later.");
      return;
    }

    try {
      const { error } = await supabase
        .from("launchpad_applications")
        .insert([
          {
            ...formData,
            submittedAt: new Date().toISOString(),
          },
        ]);

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      setStatus("success");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        gender: "",
        schoolName: "",
        schoolLevel: "",
        parentName: "",
        parentPhone: "",
        businessCategory: "",
        businessTitle: "",
        problemStatement: "",
        solution: "",
        aiIntegration: "",
        whyJoin: "",
        parentConsent: false,
        termsAccepted: false,
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
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-baobab-500/20 flex items-center justify-center">
          <svg className="w-8 h-8 text-baobab-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-env-primary mb-2">Application Submitted!</h3>
        <p className="text-env-secondary max-w-md mx-auto">
          Thank you for applying to LaunchPad {LAUNCHPAD_CONFIG.currentYear}. 
          We'll review your application and contact you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Personal Information */}
      <div>
        <h3 className="text-lg font-semibold text-env-primary mb-4 flex items-center">
          <span className="text-chapter-accent mr-2">👤</span>
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="student-fullName" className="block text-sm font-medium text-env-secondary mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="student-fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-env-surface border border-env-border text-env-primary placeholder-env-tertiary focus:border-chapter-accent focus:ring-1 focus:ring-chapter-accent transition-smooth"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label htmlFor="student-email" className="block text-sm font-medium text-env-secondary mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="student-email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-env-surface border border-env-border text-env-primary placeholder-env-tertiary focus:border-chapter-accent focus:ring-1 focus:ring-chapter-accent transition-smooth"
              placeholder="your.email@example.com"
            />
          </div>
          <div>
            <label htmlFor="student-phone" className="block text-sm font-medium text-env-secondary mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              id="student-phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-env-surface border border-env-border text-env-primary placeholder-env-tertiary focus:border-chapter-accent focus:ring-1 focus:ring-chapter-accent transition-smooth"
              placeholder="+234..."
            />
          </div>
          <div>
            <label htmlFor="student-gender" className="block text-sm font-medium text-env-secondary mb-2">
              Gender *
            </label>
            <select
              id="student-gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-env-surface border border-env-border text-env-primary focus:border-chapter-accent focus:ring-1 focus:ring-chapter-accent transition-smooth"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </div>

      {/* School Information */}
      <div>
        <h3 className="text-lg font-semibold text-env-primary mb-4 flex items-center">
          <span className="text-chapter-accent mr-2">🏫</span>
          School Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="student-schoolName" className="block text-sm font-medium text-env-secondary mb-2">
              School Name *
            </label>
            <input
              type="text"
              id="student-schoolName"
              name="schoolName"
              value={formData.schoolName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-env-surface border border-env-border text-env-primary placeholder-env-tertiary focus:border-chapter-accent focus:ring-1 focus:ring-chapter-accent transition-smooth"
              placeholder="Enter your school name"
            />
          </div>
          <div>
            <label htmlFor="student-schoolLevel" className="block text-sm font-medium text-env-secondary mb-2">
              Current Level *
            </label>
            <select
              id="student-schoolLevel"
              name="schoolLevel"
              value={formData.schoolLevel}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-env-surface border border-env-border text-env-primary focus:border-chapter-accent focus:ring-1 focus:ring-chapter-accent transition-smooth"
            >
              <option value="">Select level</option>
              <option value="SS1">SS1</option>
              <option value="SS2">SS2</option>
              <option value="SS3">SS3</option>
            </select>
          </div>
        </div>
      </div>

      {/* Parent/Guardian Information */}
      <div>
        <h3 className="text-lg font-semibold text-env-primary mb-4 flex items-center">
          <span className="text-chapter-accent mr-2">👨‍👩‍👧</span>
          Parent/Guardian Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="student-parentName" className="block text-sm font-medium text-env-secondary mb-2">
              Parent/Guardian Name *
            </label>
            <input
              type="text"
              id="student-parentName"
              name="parentName"
              value={formData.parentName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-env-surface border border-env-border text-env-primary placeholder-env-tertiary focus:border-chapter-accent focus:ring-1 focus:ring-chapter-accent transition-smooth"
              placeholder="Enter parent/guardian name"
            />
          </div>
          <div>
            <label htmlFor="student-parentPhone" className="block text-sm font-medium text-env-secondary mb-2">
              Parent/Guardian Phone *
            </label>
            <input
              type="tel"
              id="student-parentPhone"
              name="parentPhone"
              value={formData.parentPhone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-env-surface border border-env-border text-env-primary placeholder-env-tertiary focus:border-chapter-accent focus:ring-1 focus:ring-chapter-accent transition-smooth"
              placeholder="+234..."
            />
          </div>
        </div>
      </div>

      {/* Business Idea */}
      <div>
        <h3 className="text-lg font-semibold text-env-primary mb-4 flex items-center">
          <span className="text-chapter-accent mr-2">💡</span>
          Your Business Idea
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="student-businessCategory" className="block text-sm font-medium text-env-secondary mb-2">
                Business Category *
              </label>
              <select
                id="student-businessCategory"
                name="businessCategory"
                value={formData.businessCategory}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-env-surface border border-env-border text-env-primary focus:border-chapter-accent focus:ring-1 focus:ring-chapter-accent transition-smooth"
              >
                <option value="">Select category</option>
                <option value="technology">Technology</option>
                <option value="education">Education</option>
                <option value="health">Health</option>
                <option value="agriculture">Agriculture</option>
                <option value="finance">Finance</option>
                <option value="environment">Environment</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="student-businessTitle" className="block text-sm font-medium text-env-secondary mb-2">
                Business Title *
              </label>
              <input
                type="text"
                id="student-businessTitle"
                name="businessTitle"
                value={formData.businessTitle}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-env-surface border border-env-border text-env-primary placeholder-env-tertiary focus:border-chapter-accent focus:ring-1 focus:ring-chapter-accent transition-smooth"
                placeholder="Give your idea a name"
              />
            </div>
          </div>
          <div>
            <label htmlFor="student-problemStatement" className="block text-sm font-medium text-env-secondary mb-2">
              What problem are you solving? *
            </label>
            <textarea
              id="student-problemStatement"
              name="problemStatement"
              value={formData.problemStatement}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-4 py-3 rounded-lg bg-env-surface border border-env-border text-env-primary placeholder-env-tertiary focus:border-chapter-accent focus:ring-1 focus:ring-chapter-accent transition-smooth resize-none"
              placeholder="Describe the problem you want to solve..."
            />
          </div>
          <div>
            <label htmlFor="student-solution" className="block text-sm font-medium text-env-secondary mb-2">
              Your proposed solution *
            </label>
            <textarea
              id="student-solution"
              name="solution"
              value={formData.solution}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-4 py-3 rounded-lg bg-env-surface border border-env-border text-env-primary placeholder-env-tertiary focus:border-chapter-accent focus:ring-1 focus:ring-chapter-accent transition-smooth resize-none"
              placeholder="How will your idea solve this problem?"
            />
          </div>
          <div>
            <label htmlFor="student-aiIntegration" className="block text-sm font-medium text-env-secondary mb-2">
              How will you use AI in your solution?
            </label>
            <textarea
              id="student-aiIntegration"
              name="aiIntegration"
              value={formData.aiIntegration}
              onChange={handleChange}
              rows={2}
              className="w-full px-4 py-3 rounded-lg bg-env-surface border border-env-border text-env-primary placeholder-env-tertiary focus:border-chapter-accent focus:ring-1 focus:ring-chapter-accent transition-smooth resize-none"
              placeholder="Optional: Describe how AI could enhance your solution..."
            />
          </div>
        </div>
      </div>

      {/* Consents */}
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="student-parentConsent"
            name="parentConsent"
            checked={formData.parentConsent}
            onChange={handleChange}
            required
            className="w-5 h-5 mt-0.5 rounded border-env-border text-chapter-accent focus:ring-chapter-accent"
          />
          <label htmlFor="student-parentConsent" className="text-sm text-env-secondary cursor-pointer">
            I confirm that my parent/guardian has given permission for me to participate in LaunchPad {LAUNCHPAD_CONFIG.currentYear}. *
          </label>
        </div>
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="student-termsAccepted"
            name="termsAccepted"
            checked={formData.termsAccepted}
            onChange={handleChange}
            required
            className="w-5 h-5 mt-0.5 rounded border-env-border text-chapter-accent focus:ring-chapter-accent"
          />
          <label htmlFor="student-termsAccepted" className="text-sm text-env-secondary cursor-pointer">
            I agree to the terms and conditions of the LaunchPad program. *
          </label>
        </div>
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
        className="w-full py-4 bg-chapter-accent hover:bg-chapter-accent-hover text-white font-semibold rounded-lg transition-smooth glow disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Submitting..." : "Submit Application"}
      </button>
    </form>
  );
}

// ============================================
// SPONSOR APPLICATION FORM
// ============================================

export function SponsorApplicationForm() {
  const [formData, setFormData] = useState({
    organizationName: "",
    organizationType: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    tier: "",
    sponsorshipGoals: "",
    termsAccepted: false,
  });
  
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    if (!isSupabaseReady()) {
      setStatus("error");
      setErrorMessage("System is temporarily unavailable. Please try again later.");
      return;
    }

    try {
      const { error } = await supabase
        .from("sponsor_inquiries")
        .insert([
          {
            ...formData,
            submittedAt: new Date().toISOString(),
          },
        ]);

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      setStatus("success");
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
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-purple-500/20 flex items-center justify-center">
          <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-env-primary mb-2">Inquiry Received!</h3>
        <p className="text-env-secondary max-w-md mx-auto">
          Thank you for your interest in sponsoring LaunchPad. 
          Our partnerships team will contact you within 48 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Organization Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="sponsor-organizationName" className="block text-sm font-medium text-env-secondary mb-2">
            Organization Name *
          </label>
          <input
            type="text"
            id="sponsor-organizationName"
            name="organizationName"
            value={formData.organizationName}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-env-surface border border-env-border text-env-primary placeholder-env-tertiary focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-smooth"
            placeholder="Enter organization name"
          />
        </div>
        <div>
          <label htmlFor="sponsor-organizationType" className="block text-sm font-medium text-env-secondary mb-2">
            Organization Type *
          </label>
          <select
            id="sponsor-organizationType"
            name="organizationType"
            value={formData.organizationType}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-env-surface border border-env-border text-env-primary focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-smooth"
          >
            <option value="">Select type</option>
            <option value="corporate">Corporate</option>
            <option value="foundation">Foundation/NGO</option>
            <option value="government">Government Agency</option>
            <option value="individual">Individual Donor</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      {/* Contact Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="sponsor-contactName" className="block text-sm font-medium text-env-secondary mb-2">
            Contact Name *
          </label>
          <input
            type="text"
            id="sponsor-contactName"
            name="contactName"
            value={formData.contactName}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-env-surface border border-env-border text-env-primary placeholder-env-tertiary focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-smooth"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="sponsor-contactEmail" className="block text-sm font-medium text-env-secondary mb-2">
            Email *
          </label>
          <input
            type="email"
            id="sponsor-contactEmail"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-env-surface border border-env-border text-env-primary placeholder-env-tertiary focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-smooth"
            placeholder="email@organization.com"
          />
        </div>
        <div>
          <label htmlFor="sponsor-contactPhone" className="block text-sm font-medium text-env-secondary mb-2">
            Phone *
          </label>
          <input
            type="tel"
            id="sponsor-contactPhone"
            name="contactPhone"
            value={formData.contactPhone}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-env-surface border border-env-border text-env-primary placeholder-env-tertiary focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-smooth"
            placeholder="+234..."
          />
        </div>
      </div>

      {/* Sponsorship Tier */}
      <div>
        <label htmlFor="sponsor-tier" className="block text-sm font-medium text-env-secondary mb-2">
          Interested Sponsorship Tier *
        </label>
        <select
          id="sponsor-tier"
          name="tier"
          value={formData.tier}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg bg-env-surface border border-env-border text-env-primary focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-smooth"
        >
          <option value="">Select a tier</option>
          {sponsorshipTiers.map((tier) => (
            <option key={tier.name} value={tier.name}>
              {tier.name} ({tier.amount})
            </option>
          ))}
          <option value="custom">Custom Amount</option>
        </select>
      </div>

      {/* Goals */}
      <div>
        <label htmlFor="sponsor-sponsorshipGoals" className="block text-sm font-medium text-env-secondary mb-2">
          What are your sponsorship goals?
        </label>
        <textarea
          id="sponsor-sponsorshipGoals"
          name="sponsorshipGoals"
          value={formData.sponsorshipGoals}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-3 rounded-lg bg-env-surface border border-env-border text-env-primary placeholder-env-tertiary focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-smooth resize-none"
          placeholder="Tell us what you hope to achieve through this partnership..."
        />
      </div>

      {/* Consent */}
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="sponsor-termsAccepted"
          name="termsAccepted"
          checked={formData.termsAccepted}
          onChange={handleChange}
          required
          className="w-5 h-5 mt-0.5 rounded border-env-border text-purple-500 focus:ring-purple-500"
        />
        <label htmlFor="sponsor-termsAccepted" className="text-sm text-env-secondary cursor-pointer">
          I agree to be contacted regarding sponsorship opportunities. *
        </label>
      </div>

      {/* Error */}
      {status === "error" && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
          {errorMessage}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Submitting..." : "Submit Sponsorship Inquiry"}
      </button>
    </form>
  );
}