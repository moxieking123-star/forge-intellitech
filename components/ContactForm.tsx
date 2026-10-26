"use client";

import { useEffect, useState } from "react";
import { sourceForInterest } from "@/lib/notification-routing";
import { useFormSubmit } from "@/hooks/useFormSubmit";

const inquiryTypes = [
  { value: "general", label: "General Inquiry" },
  { value: "partnership", label: "Partnership" },
  { value: "schools", label: "Schools / Education" },
  { value: "careers", label: "Careers" },
  { value: "press", label: "Press / Media" },
  { value: "support", label: "Support" },
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    inquiryType: "general",
    subject: "",
    message: "",
  });

  useEffect(() => {
    const interest = new URLSearchParams(window.location.search).get(
      "interest",
    );
    const contexts: Record<string, { inquiryType: string; subject: string }> = {
      launchpad: {
        inquiryType: "partnership",
        subject: "Launchpad 2.0 — conversation or support enquiry",
      },
      "in-school-launchpad": {
        inquiryType: "schools",
        subject: "In-school LaunchPad — school or student enterprise enquiry",
      },
      internship: {
        inquiryType: "careers",
        subject: "Intern with Forge — school-leaver internship enquiry",
      },
      seminars: {
        inquiryType: "schools",
        subject: "Endless Possibilities — government-school seminar enquiry",
      },
      volunteer: {
        inquiryType: "support",
        subject: "Endless Possibilities — volunteer enquiry",
      },
      educator: {
        inquiryType: "support",
        subject: "Endless Possibilities — educator enquiry",
      },
      sponsor: {
        inquiryType: "support",
        subject: "Endless Possibilities — sponsorship enquiry",
      },
      patron: {
        inquiryType: "partnership",
        subject: "Endless Possibilities — patron enquiry",
      },
      schools: {
        inquiryType: "schools",
        subject: "TechUp & ElyTech — school programme enquiry",
      },
      laptop: {
        inquiryType: "support",
        subject: "Give a Child a Laptop — donor interest",
      },
      movement: {
        inquiryType: "support",
        subject: "Endless Possibilities — offer support",
      },
      "student-support": {
        inquiryType: "support",
        subject: "Endless Possibilities — student support enquiry",
      },
      partnership: {
        inquiryType: "partnership",
        subject: "Partnership or investment enquiry",
      },
    };
    if (interest && contexts[interest]) {
      setFormData((previous) => ({ ...previous, ...contexts[interest] }));
    }
  }, []);

  const { submitForm, isLoading, error, success, reset } = useFormSubmit({
    endpoint: "/api/contact",
    onSuccess: () => {
      setFormData({
        name: "",
        email: "",
        inquiryType: "general",
        subject: "",
        message: "",
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const interest = new URLSearchParams(window.location.search).get(
      "interest",
    );
    await submitForm({
      ...formData,
      submissionSource: sourceForInterest(interest),
    });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (error) reset();
  };

  if (success)
    return (
      <div role="status">
        <h2>Enquiry received.</h2>
        <p>
          Thank you for starting the conversation. Forge will review your
          message and follow up about the next steps.
        </p>
        <button type="button" onClick={reset}>
          Send another enquiry
        </button>
      </div>
    );
  return (
    <form onSubmit={handleSubmit}>
      <h2>Tell us what you have in mind.</h2>
      {error && (
        <div role="alert">
          {error} Your answers are still here. You can try again or use the
          relevant contact route below.
        </div>
      )}
      <label htmlFor="name">Your name</label>
      <input
        id="name"
        name="name"
        autoComplete="name"
        required
        maxLength={120}
        value={formData.name}
        onChange={handleChange}
      />
      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        required
        maxLength={254}
        value={formData.email}
        onChange={handleChange}
      />
      <label htmlFor="inquiryType">What would you like to discuss?</label>
      <select
        id="inquiryType"
        name="inquiryType"
        value={formData.inquiryType}
        onChange={handleChange}
      >
        {inquiryTypes.map((i) => (
          <option key={i.value} value={i.value}>
            {i.label}
          </option>
        ))}
      </select>
      <label htmlFor="subject">Subject</label>
      <input
        id="subject"
        name="subject"
        required
        maxLength={250}
        value={formData.subject}
        onChange={handleChange}
      />
      <label htmlFor="message">Your message</label>
      <textarea
        id="message"
        name="message"
        required
        maxLength={20000}
        value={formData.message}
        onChange={handleChange}
      />
      <label className="consent">
        <input type="checkbox" required />I have read the{" "}
        <a href="/privacy">privacy notice</a> and agree that Forge may use these
        details to review and respond to my enquiry.
      </label>
      <button
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "Sending…" : "Send enquiry →"}
      </button>
    </form>
  );
}
