'use client';

import { useState } from 'react';
import { useFormSubmit } from '@/hooks/useFormSubmit';

const inquiryTypes = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'schools', label: 'Schools / Education' },
  { value: 'careers', label: 'Careers' },
  { value: 'press', label: 'Press / Media' },
  { value: 'support', label: 'Support' },
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: 'general',
    subject: '',
    message: '',
  });

  const { submitForm, isLoading, error, success, reset } = useFormSubmit({
  endpoint: '/api/contact',
  onSuccess: () => {
      setFormData({
        name: '',
        email: '',
        inquiryType: 'general',
        subject: '',
        message: '',
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitForm(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (error) reset();
  };

  // Success state
  if (success) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/10 flex items-center justify-center">
          <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-[var(--env-text-primary)] mb-3">
          Message Sent!
        </h3>
        <p className="text-[var(--env-text-secondary)] mb-6">
          Thank you for reaching out. We'll get back to you within 24-48 hours.
        </p>
        <button
          onClick={() => reset()}
          className="px-6 py-3 rounded-xl bg-[var(--chapter-accent)] hover:bg-[var(--chapter-accent-hover)] text-white font-semibold transition-all"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Error Display */}
      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Name & Email Row */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-[var(--env-text-primary)] mb-2">
            Your Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="John Doe"
            className="
              w-full px-4 py-3.5 rounded-xl
              bg-[var(--env-bg-primary)] border border-[var(--env-border)]
              text-[var(--env-text-primary)] placeholder:text-[var(--env-text-tertiary)]
              focus:outline-none focus:border-[var(--chapter-accent)] focus:ring-2 focus:ring-[var(--chapter-accent)]/20
              transition-all duration-300
            "
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[var(--env-text-primary)] mb-2">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="john@example.com"
            className="
              w-full px-4 py-3.5 rounded-xl
              bg-[var(--env-bg-primary)] border border-[var(--env-border)]
              text-[var(--env-text-primary)] placeholder:text-[var(--env-text-tertiary)]
              focus:outline-none focus:border-[var(--chapter-accent)] focus:ring-2 focus:ring-[var(--chapter-accent)]/20
              transition-all duration-300
            "
          />
        </div>
      </div>

      {/* Inquiry Type */}
      <div>
        <label htmlFor="inquiryType" className="block text-sm font-medium text-[var(--env-text-primary)] mb-2">
          What's this about?
        </label>
        <select
          id="inquiryType"
          name="inquiryType"
          value={formData.inquiryType}
          onChange={handleChange}
          className="
            w-full px-4 py-3.5 rounded-xl
            bg-[var(--env-bg-primary)] border border-[var(--env-border)]
            text-[var(--env-text-primary)]
            focus:outline-none focus:border-[var(--chapter-accent)] focus:ring-2 focus:ring-[var(--chapter-accent)]/20
            transition-all duration-300
            cursor-pointer
          "
        >
          {inquiryTypes.map(type => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-[var(--env-text-primary)] mb-2">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Brief subject of your message"
          className="
            w-full px-4 py-3.5 rounded-xl
            bg-[var(--env-bg-primary)] border border-[var(--env-border)]
            text-[var(--env-text-primary)] placeholder:text-[var(--env-text-tertiary)]
            focus:outline-none focus:border-[var(--chapter-accent)] focus:ring-2 focus:ring-[var(--chapter-accent)]/20
            transition-all duration-300
          "
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-[var(--env-text-primary)] mb-2">
          Your Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          placeholder="Tell us how we can help you..."
          className="
            w-full px-4 py-3.5 rounded-xl
            bg-[var(--env-bg-primary)] border border-[var(--env-border)]
            text-[var(--env-text-primary)] placeholder:text-[var(--env-text-tertiary)]
            focus:outline-none focus:border-[var(--chapter-accent)] focus:ring-2 focus:ring-[var(--chapter-accent)]/20
            transition-all duration-300
            resize-none
          "
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="
          w-full py-4 rounded-xl
          bg-[var(--chapter-accent)] hover:bg-[var(--chapter-accent-hover)]
          text-white font-semibold text-lg
          transition-all duration-300
          hover:shadow-lg hover:shadow-[var(--chapter-accent)]/25
          disabled:opacity-50 disabled:cursor-not-allowed
          flex items-center justify-center gap-3
        "
      >
        {isLoading ? (
          <>
            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>Sending...</span>
          </>
        ) : (
          <>
            <span>Send Message</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </>
        )}
      </button>

      {/* Privacy Note */}
      <p className="text-center text-sm text-[var(--env-text-tertiary)]">
        By submitting this form, you agree to our{' '}
        <a href="/privacy" className="text-[var(--chapter-accent)] hover:underline">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}