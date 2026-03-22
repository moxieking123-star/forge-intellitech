"use client";

import { useState } from "react";
import Link from "next/link";
import { ChapterWrapper } from "../../../components/ChapterWrapper";
import AnimatedSection from "../../../components/AnimatedSection";
import { IconArrowRight, IconCheck } from "../../../components/icons/ForgeIcons";

// Form field types
interface FormData {
  // Personal Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  
  // School Info
  schoolName: string;
  schoolType: string;
  schoolAddress: string;
  classLevel: string;
  
  // Business Idea
  ideaTitle: string;
  ideaCategory: string;
  ideaDescription: string;
  problemSolving: string;
  targetAudience: string;
  
  // Additional Info
  teamMembers: string;
  howHeard: string;
  whyParticipate: string;
  previousExperience: string;
  
  // Guardian Info
  guardianName: string;
  guardianPhone: string;
  guardianEmail: string;
  guardianRelationship: string;
  
  // Consent
  agreeTerms: boolean;
  agreeContact: boolean;
}

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  gender: "",
  schoolName: "",
  schoolType: "",
  schoolAddress: "",
  classLevel: "SSS3",
  ideaTitle: "",
  ideaCategory: "",
  ideaDescription: "",
  problemSolving: "",
  targetAudience: "",
  teamMembers: "",
  howHeard: "",
  whyParticipate: "",
  previousExperience: "",
  guardianName: "",
  guardianPhone: "",
  guardianEmail: "",
  guardianRelationship: "",
  agreeTerms: false,
  agreeContact: false,
};

const ideaCategories = [
  "Technology / App",
  "Fashion / Clothing",
  "Food / Restaurant",
  "Education / Tutoring",
  "Health / Wellness",
  "Agriculture / Farming",
  "Entertainment / Media",
  "Finance / Fintech",
  "Environment / Sustainability",
  "Transportation / Logistics",
  "Other",
];

const howHeardOptions = [
  "School announcement",
  "Teacher/Principal",
  "Friend/Classmate",
  "Social media",
  "Parent/Guardian",
  "Website",
  "Other",
];

export default function ApplyPage() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const totalSteps = 4;

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

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
          setError("Please fill in all required fields");
          return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          setError("Please enter a valid email address");
          return false;
        }
        break;
      case 2:
        if (!formData.schoolName || !formData.schoolType) {
          setError("Please fill in all required school information");
          return false;
        }
        break;
      case 3:
        if (!formData.ideaTitle || !formData.ideaDescription) {
          setError("Please describe your business idea");
          return false;
        }
        break;
      case 4:
        if (!formData.guardianName || !formData.guardianPhone) {
          setError("Parent/Guardian information is required");
          return false;
        }
        if (!formData.agreeTerms) {
          setError("You must agree to the terms and conditions");
          return false;
        }
        break;
    }
    setError("");
    return true;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(currentStep)) return;
    
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/launchpad/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit application");
      }

      setIsSuccess(true);
      setFormData(initialFormData);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success Screen
  if (isSuccess) {
    return (
      <ChapterWrapper chapter="rise">
        <section className="min-h-screen flex items-center justify-center section-padding">
          <div className="max-w-2xl mx-auto text-center">
            <AnimatedSection animation="scale-in">
              <div 
                className="p-12 rounded-3xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(82, 183, 136, 0.2), rgba(82, 183, 136, 0.05))',
                  border: '2px solid rgba(82, 183, 136, 0.5)'
                }}
              >
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#52B788] flex items-center justify-center">
                  <IconCheck size={48} color="#fff" />
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold text-env-primary mb-4">
                  Application Submitted! 🎉
                </h1>
                
                <p className="text-xl text-env-secondary mb-6">
                  Congratulations! You've taken your first step toward becoming an entrepreneur.
                </p>
                
                <div className="p-6 rounded-xl bg-env-surface border border-env-border mb-8 text-left">
                  <h3 className="font-bold text-env-primary mb-4">What happens next?</h3>
                  <ul className="space-y-3 text-env-secondary">
                    <li className="flex items-start gap-3">
                      <span className="text-[#52B788]">1.</span>
                      <span>We'll review your application within 5-7 business days</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#52B788]">2.</span>
                      <span>You'll receive a confirmation email at <strong>{formData.email || "your email"}</strong></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#52B788]">3.</span>
                      <span>Selected students will be invited for the training program</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#52B788]">4.</span>
                      <span>Start preparing your pitch!</span>
                    </li>
                  </ul>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/launchpad"
                    className="px-8 py-4 bg-[#FF8C42] hover:bg-[#E85D04] text-[#1A1A1A] font-bold rounded-xl transition-all"
                  >
                    Back to LaunchPad
                  </Link>
                  <Link
                    href="/"
                    className="px-8 py-4 bg-env-surface border border-env-border text-env-primary font-bold rounded-xl hover:border-[#FF8C42] transition-all"
                  >
                    Go to Homepage
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </ChapterWrapper>
    );
  }

  return (
    <ChapterWrapper chapter="rise">
      <section className="min-h-screen section-padding pt-24 md:pt-32">
        <div className="container-forge">
          <div className="max-w-3xl mx-auto">
            
            {/* Header */}
            <AnimatedSection animation="fade-up">
              <div className="text-center mb-10">
                <Link 
                  href="/launchpad"
                  className="inline-flex items-center gap-2 text-[#FF8C42] hover:underline mb-4"
                >
                  ← Back to LaunchPad
                </Link>
                <span className="text-6xl block mb-4">🚀</span>
                <h1 className="text-3xl md:text-4xl font-bold text-env-primary mb-4">
                  LaunchPad 2026 Application
                </h1>
                <p className="text-lg text-env-secondary">
                  Fill out the form below to apply. It takes about 10-15 minutes.
                </p>
              </div>
            </AnimatedSection>

            {/* Progress Bar */}
            <AnimatedSection animation="fade-up" delay={100}>
              <div className="mb-8">
                <div className="flex justify-between mb-2">
                  {[1, 2, 3, 4].map((step) => (
                    <div 
                      key={step}
                      className={`flex items-center justify-center w-10 h-10 rounded-full font-bold transition-all ${
                        step === currentStep 
                          ? 'bg-[#FF8C42] text-[#1A1A1A]' 
                          : step < currentStep 
                            ? 'bg-[#52B788] text-white'
                            : 'bg-env-surface border border-env-border text-env-tertiary'
                      }`}
                    >
                      {step < currentStep ? <IconCheck size={20} color="#fff" /> : step}
                    </div>
                  ))}
                </div>
                <div className="h-2 bg-env-surface rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#FF8C42] transition-all duration-300"
                    style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-xs text-env-tertiary">
                  <span>Personal Info</span>
                  <span>School Info</span>
                  <span>Your Idea</span>
                  <span>Guardian & Submit</span>
                </div>
              </div>
            </AnimatedSection>

            {/* Form */}
            <AnimatedSection animation="fade-up" delay={200}>
              <form 
                onSubmit={handleSubmit}
                className="p-6 md:p-8 rounded-2xl bg-env-surface border-2 border-[#FF8C42]/30"
              >
                {/* Error Message */}
                {error && (
                  <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400">
                    {error}
                  </div>
                )}

                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-env-primary mb-6">
                      👤 Personal Information
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-env-primary mb-2">
                          First Name <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl bg-env-bg-primary border border-env-border text-env-primary focus:border-[#FF8C42] focus:outline-none transition-colors"
                          placeholder="Enter your first name"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-env-primary mb-2">
                          Last Name <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl bg-env-bg-primary border border-env-border text-env-primary focus:border-[#FF8C42] focus:outline-none transition-colors"
                          placeholder="Enter your last name"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-env-primary mb-2">
                        Email Address <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-env-bg-primary border border-env-border text-env-primary focus:border-[#FF8C42] focus:outline-none transition-colors"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-env-primary mb-2">
                        Phone Number <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-env-bg-primary border border-env-border text-env-primary focus:border-[#FF8C42] focus:outline-none transition-colors"
                        placeholder="08012345678"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-env-primary mb-2">
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          name="dateOfBirth"
                          value={formData.dateOfBirth}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-env-bg-primary border border-env-border text-env-primary focus:border-[#FF8C42] focus:outline-none transition-colors"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-env-primary mb-2">
                          Gender
                        </label>
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-env-bg-primary border border-env-border text-env-primary focus:border-[#FF8C42] focus:outline-none transition-colors"
                        >
                          <option value="">Select gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Prefer not to say</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: School Information */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-env-primary mb-6">
                      🏫 School Information
                    </h2>
                    
                    <div>
                      <label className="block text-sm font-medium text-env-primary mb-2">
                        School Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="schoolName"
                        value={formData.schoolName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-env-bg-primary border border-env-border text-env-primary focus:border-[#FF8C42] focus:outline-none transition-colors"
                        placeholder="Enter your school name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-env-primary mb-2">
                        School Type <span className="text-red-400">*</span>
                      </label>
                      <select
                        name="schoolType"
                        value={formData.schoolType}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-env-bg-primary border border-env-border text-env-primary focus:border-[#FF8C42] focus:outline-none transition-colors"
                      >
                        <option value="">Select school type</option>
                        <option value="public">Public School</option>
                        <option value="private">Private School</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-env-primary mb-2">
                        School Address
                      </label>
                      <textarea
                        name="schoolAddress"
                        value={formData.schoolAddress}
                        onChange={handleChange}
                        rows={2}
                        className="w-full px-4 py-3 rounded-xl bg-env-bg-primary border border-env-border text-env-primary focus:border-[#FF8C42] focus:outline-none transition-colors resize-none"
                        placeholder="Enter your school address"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-env-primary mb-2">
                        Current Class
                      </label>
                      <select
                        name="classLevel"
                        value={formData.classLevel}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-env-bg-primary border border-env-border text-env-primary focus:border-[#FF8C42] focus:outline-none transition-colors"
                      >
                        <option value="SSS3">SSS 3</option>
                        <option value="SSS2">SSS 2</option>
                        <option value="SSS1">SSS 1</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Step 3: Business Idea */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-env-primary mb-6">
                      💡 Your Business Idea
                    </h2>
                    
                    <div>
                      <label className="block text-sm font-medium text-env-primary mb-2">
                        Idea Title <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="ideaTitle"
                        value={formData.ideaTitle}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-env-bg-primary border border-env-border text-env-primary focus:border-[#FF8C42] focus:outline-none transition-colors"
                        placeholder="Give your idea a catchy name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-env-primary mb-2">
                        Category
                      </label>
                      <select
                        name="ideaCategory"
                        value={formData.ideaCategory}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-env-bg-primary border border-env-border text-env-primary focus:border-[#FF8C42] focus:outline-none transition-colors"
                      >
                        <option value="">Select a category</option>
                        {ideaCategories.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-env-primary mb-2">
                        Describe Your Idea <span className="text-red-400">*</span>
                      </label>
                      <textarea
                        name="ideaDescription"
                        value={formData.ideaDescription}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl bg-env-bg-primary border border-env-border text-env-primary focus:border-[#FF8C42] focus:outline-none transition-colors resize-none"
                        placeholder="What is your business idea? Explain it like you're telling a friend..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-env-primary mb-2">
                        What Problem Does It Solve?
                      </label>
                      <textarea
                        name="problemSolving"
                        value={formData.problemSolving}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl bg-env-bg-primary border border-env-border text-env-primary focus:border-[#FF8C42] focus:outline-none transition-colors resize-none"
                        placeholder="What problem are you trying to fix? Who has this problem?"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-env-primary mb-2">
                        Who Is Your Target Audience?
                      </label>
                      <input
                        type="text"
                        name="targetAudience"
                        value={formData.targetAudience}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-env-bg-primary border border-env-border text-env-primary focus:border-[#FF8C42] focus:outline-none transition-colors"
                        placeholder="e.g., Students, Parents, Small business owners..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-env-primary mb-2">
                        Team Members (if any)
                      </label>
                      <input
                        type="text"
                        name="teamMembers"
                        value={formData.teamMembers}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-env-bg-primary border border-env-border text-env-primary focus:border-[#FF8C42] focus:outline-none transition-colors"
                        placeholder="Names of team members (or leave blank if solo)"
                      />
                    </div>
                  </div>
                )}

                {/* Step 4: Guardian Info & Submit */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-env-primary mb-6">
                      👨‍👩‍👧 Parent/Guardian Information
                    </h2>
                    
                    <div 
                      className="p-4 rounded-xl mb-6"
                      style={{ 
                        backgroundColor: 'rgba(255, 140, 66, 0.1)',
                        border: '1px solid rgba(255, 140, 66, 0.2)'
                      }}
                    >
                      <p className="text-env-secondary text-sm">
                        Since you're under 18, we need your parent or guardian's consent to participate.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-env-primary mb-2">
                          Guardian Full Name <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          name="guardianName"
                          value={formData.guardianName}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl bg-env-bg-primary border border-env-border text-env-primary focus:border-[#FF8C42] focus:outline-none transition-colors"
                          placeholder="Parent/Guardian name"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-env-primary mb-2">
                          Relationship
                        </label>
                        <select
                          name="guardianRelationship"
                          value={formData.guardianRelationship}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-env-bg-primary border border-env-border text-env-primary focus:border-[#FF8C42] focus:outline-none transition-colors"
                        >
                          <option value="">Select relationship</option>
                          <option value="mother">Mother</option>
                          <option value="father">Father</option>
                          <option value="guardian">Guardian</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-env-primary mb-2">
                        Guardian Phone Number <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="tel"
                        name="guardianPhone"
                        value={formData.guardianPhone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-env-bg-primary border border-env-border text-env-primary focus:border-[#FF8C42] focus:outline-none transition-colors"
                        placeholder="08012345678"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-env-primary mb-2">
                        Guardian Email
                      </label>
                      <input
                        type="email"
                        name="guardianEmail"
                        value={formData.guardianEmail}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-env-bg-primary border border-env-border text-env-primary focus:border-[#FF8C42] focus:outline-none transition-colors"
                        placeholder="guardian@email.com (optional)"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-env-primary mb-2">
                        How did you hear about LaunchPad?
                      </label>
                      <select
                        name="howHeard"
                        value={formData.howHeard}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-env-bg-primary border border-env-border text-env-primary focus:border-[#FF8C42] focus:outline-none transition-colors"
                      >
                        <option value="">Select an option</option>
                        {howHeardOptions.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-env-primary mb-2">
                        Why do you want to participate? (Optional)
                      </label>
                      <textarea
                        name="whyParticipate"
                        value={formData.whyParticipate}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl bg-env-bg-primary border border-env-border text-env-primary focus:border-[#FF8C42] focus:outline-none transition-colors resize-none"
                        placeholder="Tell us what excites you about LaunchPad..."
                      />
                    </div>

                    {/* Consent Checkboxes */}
                    <div className="space-y-4 p-4 rounded-xl bg-env-bg-primary border border-env-border">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          name="agreeTerms"
                          checked={formData.agreeTerms}
                          onChange={handleChange}
                          className="mt-1 w-5 h-5 rounded border-env-border text-[#FF8C42] focus:ring-[#FF8C42]"
                        />
                        <span className="text-env-secondary text-sm">
                          I agree to the{" "}
                          <Link href="/terms" className="text-[#FF8C42] hover:underline">
                            Terms & Conditions
                          </Link>{" "}
                          and{" "}
                          <Link href="/privacy" className="text-[#FF8C42] hover:underline">
                            Privacy Policy
                          </Link>
                          . I confirm that my parent/guardian consents to my participation.
                          <span className="text-red-400"> *</span>
                        </span>
                      </label>
                      
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          name="agreeContact"
                          checked={formData.agreeContact}
                          onChange={handleChange}
                          className="mt-1 w-5 h-5 rounded border-env-border text-[#FF8C42] focus:ring-[#FF8C42]"
                        />
                        <span className="text-env-secondary text-sm">
                          I agree to receive updates about LaunchPad via email and SMS.
                        </span>
                      </label>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t border-env-border">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-6 py-3 rounded-xl border border-env-border text-env-primary hover:border-[#FF8C42] transition-all font-medium"
                    >
                      ← Previous
                    </button>
                  ) : (
                    <div />
                  )}
                  
                  {currentStep < totalSteps ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="px-8 py-3 bg-[#FF8C42] hover:bg-[#E85D04] text-[#1A1A1A] font-bold rounded-xl transition-all flex items-center gap-2"
                    >
                      Next Step
                      <IconArrowRight size={18} color="#1A1A1A" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-3 bg-[#52B788] hover:bg-[#40916C] text-white font-bold rounded-xl transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Application 🚀
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>
            </AnimatedSection>

          </div>
        </div>
      </section>
    </ChapterWrapper>
  );
}