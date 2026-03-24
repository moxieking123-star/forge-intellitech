"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChapterWrapper } from "../../../components/ChapterWrapper";
import AnimatedSection from "../../../components/AnimatedSection";
import { IconArrowRight, IconCheck } from "../../../components/icons/ForgeIcons";

// ==================== TYPES ====================
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
  schoolLGA: string;
  schoolAddress: string;
  classLevel: string;
  
  // Business Idea - Upgraded with structured thinking
  ideaTitle: string;
  ideaCategory: string;
  ideaDescription: string;
  problemWho: string;        // Who specifically has this problem?
  problemFrequency: string;  // How often do they face it?
  problemConsequence: string; // What happens if it's not solved?
  targetAudience: string;
  uniqueness: string;        // What makes your solution different?
  
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

interface ValidationError {
  field: string;
  message: string;
}

const STORAGE_KEY = "launchpad_application_2026";
const MIN_AGE = 14;
const MAX_AGE = 20;

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  gender: "",
  schoolName: "",
  schoolType: "",
  schoolLGA: "",
  schoolAddress: "",
  classLevel: "SSS3",
  ideaTitle: "",
  ideaCategory: "",
  ideaDescription: "",
  problemWho: "",
  problemFrequency: "",
  problemConsequence: "",
  targetAudience: "",
  uniqueness: "",
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
  "Retail / E-commerce",
  "Services",
  "Other",
];

const lagosLGAs = [
  "Agege", "Ajeromi-Ifelodun", "Alimosho", "Amuwo-Odofin", "Apapa",
  "Badagry", "Epe", "Eti-Osa", "Ibeju-Lekki", "Ifako-Ijaiye",
  "Ikeja", "Ikorodu", "Kosofe", "Lagos Island", "Lagos Mainland",
  "Mushin", "Ojo", "Oshodi-Isolo", "Shomolu", "Surulere"
];

const howHeardOptions = [
  "School announcement",
  "Teacher/Principal",
  "Friend/Classmate",
  "Social media (Instagram)",
  "Social media (Twitter/X)",
  "Social media (TikTok)",
  "WhatsApp",
  "Parent/Guardian",
  "Forge Intellitech Website",
  "Previous LaunchPad participant",
  "Other",
];

// ==================== VALIDATION HELPERS ====================
const validateNigerianPhone = (phone: string): boolean => {
  // Remove spaces and dashes
  const cleaned = phone.replace(/[\s-]/g, '');
  // Nigerian phone: starts with 0 or +234, followed by 7-9, then 9 more digits
  const nigerianPhoneRegex = /^(\+234|0)[789]\d{9}$/;
  return nigerianPhoneRegex.test(cleaned);
};

const calculateAge = (dateOfBirth: string): number => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/[\s-]/g, '');
  if (cleaned.startsWith('+234')) {
    return cleaned;
  }
  if (cleaned.startsWith('0')) {
    return '+234' + cleaned.substring(1);
  }
  return cleaned;
};

// ==================== COMPONENT ====================
export default function ApplyPage() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [showSavedNotice, setShowSavedNotice] = useState(false);

  const totalSteps = 4;

  // ==================== PERSISTENCE ====================
  // Load saved data on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setFormData(parsed.data);
        setCurrentStep(parsed.step || 1);
        setLastSaved(new Date(parsed.timestamp));
        setShowSavedNotice(true);
        
        // Hide notice after 5 seconds
        setTimeout(() => setShowSavedNotice(false), 5000);
      }
    } catch (e) {
      console.error('Failed to load saved form data:', e);
    }
  }, []);

  // Auto-save on change (debounced)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (formData.firstName || formData.email) { // Only save if user has started
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify({
            data: formData,
            step: currentStep,
            timestamp: new Date().toISOString()
          }));
          setLastSaved(new Date());
        } catch (e) {
          console.error('Failed to save form data:', e);
        }
      }
    }, 1000); // Debounce 1 second

    return () => clearTimeout(timeoutId);
  }, [formData, currentStep]);

  // Auto-scroll on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  // ==================== HANDLERS ====================
  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    
    // Clear error for this field
    setErrors(prev => prev.filter(err => err.field !== name));
  }, []);

  const handleSaveProgress = async () => {
    setIsSaving(true);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        data: formData,
        step: currentStep,
        timestamp: new Date().toISOString()
      }));
      setLastSaved(new Date());
      
      // Show success feedback
      alert('Progress saved! You can close this page and continue later.');
    } catch (e) {
      alert('Failed to save progress. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const clearSavedData = () => {
    localStorage.removeItem(STORAGE_KEY);
    setFormData(initialFormData);
    setCurrentStep(1);
    setLastSaved(null);
  };

  // ==================== VALIDATION ====================
  const validateStep = (step: number): boolean => {
    const newErrors: ValidationError[] = [];

    switch (step) {
      case 1: // Personal Information
        if (!formData.firstName.trim()) {
          newErrors.push({ field: 'firstName', message: 'First name is required' });
        } else if (formData.firstName.trim().length < 2) {
          newErrors.push({ field: 'firstName', message: 'First name must be at least 2 characters' });
        }
        
        if (!formData.lastName.trim()) {
          newErrors.push({ field: 'lastName', message: 'Last name is required' });
        } else if (formData.lastName.trim().length < 2) {
          newErrors.push({ field: 'lastName', message: 'Last name must be at least 2 characters' });
        }
        
        if (!formData.email.trim()) {
          newErrors.push({ field: 'email', message: 'Email is required' });
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.push({ field: 'email', message: 'Please enter a valid email address' });
        }
        
        if (!formData.phone.trim()) {
          newErrors.push({ field: 'phone', message: 'Phone number is required' });
        } else if (!validateNigerianPhone(formData.phone)) {
          newErrors.push({ field: 'phone', message: 'Please enter a valid Nigerian phone number (e.g., 08012345678)' });
        }
        
        if (formData.dateOfBirth) {
          const age = calculateAge(formData.dateOfBirth);
          if (age < MIN_AGE || age > MAX_AGE) {
            newErrors.push({ 
              field: 'dateOfBirth', 
              message: `You must be between ${MIN_AGE} and ${MAX_AGE} years old to apply` 
            });
          }
        }
        break;

      case 2: // School Information
        if (!formData.schoolName.trim()) {
          newErrors.push({ field: 'schoolName', message: 'School name is required' });
        } else if (formData.schoolName.trim().length < 3) {
          newErrors.push({ field: 'schoolName', message: 'Please enter your full school name' });
        }
        
        if (!formData.schoolType) {
          newErrors.push({ field: 'schoolType', message: 'Please select your school type' });
        }
        
        if (!formData.schoolLGA) {
          newErrors.push({ field: 'schoolLGA', message: 'Please select your school\'s Local Government Area' });
        }
        break;

      case 3: // Business Idea
        if (!formData.ideaTitle.trim()) {
          newErrors.push({ field: 'ideaTitle', message: 'Give your idea a title' });
        } else if (formData.ideaTitle.trim().length < 3) {
          newErrors.push({ field: 'ideaTitle', message: 'Idea title must be at least 3 characters' });
        }
        
        if (!formData.ideaCategory) {
          newErrors.push({ field: 'ideaCategory', message: 'Please select a category for your idea' });
        }
        
        if (!formData.ideaDescription.trim()) {
          newErrors.push({ field: 'ideaDescription', message: 'Please describe your idea' });
        } else if (formData.ideaDescription.trim().length < 100) {
          newErrors.push({ 
            field: 'ideaDescription', 
            message: `Please provide more detail (${formData.ideaDescription.trim().length}/100 characters minimum)` 
          });
        }
        
        if (!formData.problemWho.trim()) {
          newErrors.push({ field: 'problemWho', message: 'Tell us who has this problem' });
        } else if (formData.problemWho.trim().length < 20) {
          newErrors.push({ 
            field: 'problemWho', 
            message: 'Please be more specific about who has this problem' 
          });
        }
        
        if (!formData.problemConsequence.trim()) {
          newErrors.push({ field: 'problemConsequence', message: 'Explain what happens if the problem isn\'t solved' });
        }
        break;

      case 4: // Guardian Info & Consent
        if (!formData.guardianName.trim()) {
          newErrors.push({ field: 'guardianName', message: 'Parent/Guardian name is required' });
        } else if (formData.guardianName.trim().length < 3) {
          newErrors.push({ field: 'guardianName', message: 'Please enter the full name' });
        }
        
        if (!formData.guardianPhone.trim()) {
          newErrors.push({ field: 'guardianPhone', message: 'Parent/Guardian phone is required' });
        } else if (!validateNigerianPhone(formData.guardianPhone)) {
          newErrors.push({ field: 'guardianPhone', message: 'Please enter a valid Nigerian phone number' });
        }
        
        if (formData.guardianPhone === formData.phone) {
          newErrors.push({ field: 'guardianPhone', message: 'Guardian phone must be different from your phone number' });
        }
        
        if (!formData.guardianRelationship) {
          newErrors.push({ field: 'guardianRelationship', message: 'Please select the relationship' });
        }
        
        if (!formData.agreeTerms) {
          newErrors.push({ field: 'agreeTerms', message: 'You must agree to the terms and conditions' });
        }
        break;
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const getFieldError = (fieldName: string): string | undefined => {
    return errors.find(err => err.field === fieldName)?.message;
  };

  // ==================== NAVIGATION ====================
  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    } else {
      // Scroll to first error
      const firstError = document.querySelector('[data-error="true"]');
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    setErrors([]);
  };

  // ==================== SUBMISSION ====================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevent double submission
    if (isSubmitting) return;
    
    if (!validateStep(currentStep)) {
      const firstError = document.querySelector('[data-error="true"]');
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    
    setIsSubmitting(true);
    setErrors([]);

    try {
      // Format phone numbers before submission
      const submissionData = {
        ...formData,
        phone: formatPhoneNumber(formData.phone),
        guardianPhone: formatPhoneNumber(formData.guardianPhone),
        submittedAt: new Date().toISOString(),
      };

      const response = await fetch("/api/launchpad/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error('Submission error:', result);
        
        if (result.code === 'DUPLICATE_EMAIL') {
          setErrors([{ field: 'email', message: 'This email has already been used to apply' }]);
          setCurrentStep(1);
          return;
        }
        
        if (result.code === 'DUPLICATE_PHONE') {
          setErrors([{ field: 'phone', message: 'This phone number has already been used to apply' }]);
          setCurrentStep(1);
          return;
        }
        
        throw new Error(result.error || "Failed to submit application");
      }

      // Success! Clear saved data
      localStorage.removeItem(STORAGE_KEY);
      setIsSuccess(true);
      
    } catch (err) {
      console.error('Submission failed:', err);
      setErrors([{ 
        field: 'submit', 
        message: err instanceof Error ? err.message : "Something went wrong. Please try again." 
      }]);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ==================== RENDER: SUCCESS SCREEN ====================
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
                  Congratulations, <strong>{formData.firstName}</strong>! You've taken your first step toward becoming an entrepreneur.
                </p>
                
                <div className="p-6 rounded-xl bg-env-surface border border-env-border mb-8 text-left">
                  <h3 className="font-bold text-env-primary mb-4">What happens next?</h3>
                  <ul className="space-y-3 text-env-secondary">
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-[#52B788] text-white flex items-center justify-center text-sm flex-shrink-0">1</span>
                      <span>Check your email (<strong>{formData.email}</strong>) for a confirmation message</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-[#52B788] text-white flex items-center justify-center text-sm flex-shrink-0">2</span>
                      <span>We'll review your application within 5-7 business days</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-[#52B788] text-white flex items-center justify-center text-sm flex-shrink-0">3</span>
                      <span>Selected students will be invited for the training program</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-[#52B788] text-white flex items-center justify-center text-sm flex-shrink-0">4</span>
                      <span>Start preparing your pitch!</span>
                    </li>
                  </ul>
                </div>

                {/* Join Community CTA */}
                <div className="p-4 rounded-xl bg-[#FF8C42]/10 border border-[#FF8C42]/20 mb-8">
                  <p className="text-env-primary font-medium mb-2">
                    📱 Join our WhatsApp Community
                  </p>
                  <p className="text-env-secondary text-sm mb-3">
                    Connect with other applicants, get updates, and access exclusive resources.
                  </p>
                  <a 
                    href="https://chat.whatsapp.com/YOUR_COMMUNITY_LINK"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white rounded-lg font-medium hover:bg-[#128C7E] transition-colors"
                  >
                    Join Community
                    <IconArrowRight size={16} color="#fff" />
                  </a>
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

  // ==================== RENDER: FORM ====================
  return (
    <ChapterWrapper chapter="rise">
      <section className="min-h-screen section-padding pt-24 md:pt-32">
        <div className="container-forge">
          <div className="max-w-3xl mx-auto">
            
            {/* Header */}
            <AnimatedSection animation="fade-up">
              <div className="text-center mb-8">
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
                <p className="text-lg text-env-secondary mb-4">
                  Fill out the form below to apply. It takes about 10-15 minutes.
                </p>
                
                {/* Scarcity & Status Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF8C42]/10 border border-[#FF8C42]/20">
                  <span className="w-2 h-2 rounded-full bg-[#FF8C42] animate-pulse" />
                  <span className="text-[#FF8C42] font-medium text-sm">
                    Only 100 students will be selected from Lagos State
                  </span>
                </div>
              </div>
            </AnimatedSection>

            {/* Saved Notice */}
            {showSavedNotice && lastSaved && (
              <AnimatedSection animation="fade-up">
                <div className="mb-6 p-4 rounded-xl bg-[#52B788]/10 border border-[#52B788]/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <IconCheck size={20} color="#52B788" />
                    <span className="text-[#52B788] text-sm">
                      We found your saved progress from {lastSaved.toLocaleDateString()}
                    </span>
                  </div>
                  <button 
                    onClick={() => {
                      if (confirm('Start fresh? This will clear all saved data.')) {
                        clearSavedData();
                      }
                    }}
                    className="text-env-tertiary text-sm hover:text-red-400 transition-colors"
                  >
                    Start Fresh
                  </button>
                </div>
              </AnimatedSection>
            )}

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
                    className="h-full bg-gradient-to-r from-[#FF8C42] to-[#52B788] transition-all duration-500"
                    style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-xs text-env-tertiary">
                  <span className={currentStep >= 1 ? 'text-[#FF8C42]' : ''}>Personal</span>
                  <span className={currentStep >= 2 ? 'text-[#FF8C42]' : ''}>School</span>
                  <span className={currentStep >= 3 ? 'text-[#FF8C42]' : ''}>Your Idea</span>
                  <span className={currentStep >= 4 ? 'text-[#FF8C42]' : ''}>Submit</span>
                </div>
              </div>
            </AnimatedSection>

            {/* Form */}
            <AnimatedSection animation="fade-up" delay={200}>
              <form 
                onSubmit={handleSubmit}
                className="p-6 md:p-8 rounded-2xl bg-env-surface border-2 border-[#FF8C42]/30"
              >
                {/* Global Error Message */}
                {errors.find(e => e.field === 'submit') && (
                  <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400">
                    {errors.find(e => e.field === 'submit')?.message}
                  </div>
                )}

                {/* ==================== STEP 1: PERSONAL INFO ==================== */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-env-primary mb-2">
                      👤 Personal Information
                    </h2>
                    <p className="text-env-secondary text-sm mb-6">
                      Tell us about yourself. All fields marked with <span className="text-red-400">*</span> are required.
                    </p>
                    
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
                          data-error={!!getFieldError('firstName')}
                          className={`w-full px-4 py-3 rounded-xl bg-env-bg-primary border text-env-primary focus:outline-none transition-colors ${
                            getFieldError('firstName') 
                              ? 'border-red-500 focus:border-red-500' 
                              : 'border-env-border focus:border-[#FF8C42]'
                          }`}
                          placeholder="Enter your first name"
                        />
                        {getFieldError('firstName') && (
                          <p className="mt-1 text-sm text-red-400">{getFieldError('firstName')}</p>
                        )}
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
                          data-error={!!getFieldError('lastName')}
                          className={`w-full px-4 py-3 rounded-xl bg-env-bg-primary border text-env-primary focus:outline-none transition-colors ${
                            getFieldError('lastName') 
                              ? 'border-red-500 focus:border-red-500' 
                              : 'border-env-border focus:border-[#FF8C42]'
                          }`}
                          placeholder="Enter your last name"
                        />
                        {getFieldError('lastName') && (
                          <p className="mt-1 text-sm text-red-400">{getFieldError('lastName')}</p>
                        )}
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
                        data-error={!!getFieldError('email')}
                        className={`w-full px-4 py-3 rounded-xl bg-env-bg-primary border text-env-primary focus:outline-none transition-colors ${
                          getFieldError('email') 
                            ? 'border-red-500 focus:border-red-500' 
                            : 'border-env-border focus:border-[#FF8C42]'
                        }`}
                        placeholder="your.email@example.com"
                      />
                      {getFieldError('email') && (
                        <p className="mt-1 text-sm text-red-400">{getFieldError('email')}</p>
                      )}
                      <p className="mt-1 text-xs text-env-tertiary">
                        We'll send your confirmation and updates here
                      </p>
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
                        data-error={!!getFieldError('phone')}
                        className={`w-full px-4 py-3 rounded-xl bg-env-bg-primary border text-env-primary focus:outline-none transition-colors ${
                          getFieldError('phone') 
                            ? 'border-red-500 focus:border-red-500' 
                            : 'border-env-border focus:border-[#FF8C42]'
                        }`}
                        placeholder="08012345678"
                      />
                      {getFieldError('phone') && (
                        <p className="mt-1 text-sm text-red-400">{getFieldError('phone')}</p>
                      )}
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
                          data-error={!!getFieldError('dateOfBirth')}
                          max={new Date(new Date().setFullYear(new Date().getFullYear() - MIN_AGE)).toISOString().split('T')[0]}
                          min={new Date(new Date().setFullYear(new Date().getFullYear() - MAX_AGE)).toISOString().split('T')[0]}
                          className={`w-full px-4 py-3 rounded-xl bg-env-bg-primary border text-env-primary focus:outline-none transition-colors ${
                            getFieldError('dateOfBirth') 
                              ? 'border-red-500 focus:border-red-500' 
                              : 'border-env-border focus:border-[#FF8C42]'
                          }`}
                        />
                        {getFieldError('dateOfBirth') && (
                          <p className="mt-1 text-sm text-red-400">{getFieldError('dateOfBirth')}</p>
                        )}
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

                {/* ==================== STEP 2: SCHOOL INFO ==================== */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-env-primary mb-2">
                      🏫 School Information
                    </h2>
                    <p className="text-env-secondary text-sm mb-6">
                      Tell us about your school. This helps us coordinate with your teachers.
                    </p>
                    
                    <div>
                      <label className="block text-sm font-medium text-env-primary mb-2">
                        School Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="schoolName"
                        value={formData.schoolName}
                        onChange={handleChange}
                        data-error={!!getFieldError('schoolName')}
                        className={`w-full px-4 py-3 rounded-xl bg-env-bg-primary border text-env-primary focus:outline-none transition-colors ${
                          getFieldError('schoolName') 
                            ? 'border-red-500 focus:border-red-500' 
                            : 'border-env-border focus:border-[#FF8C42]'
                        }`}
                        placeholder="Enter your school's full name"
                      />
                      {getFieldError('schoolName') && (
                        <p className="mt-1 text-sm text-red-400">{getFieldError('schoolName')}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-env-primary mb-2">
                          School Type <span className="text-red-400">*</span>
                        </label>
                        <select
                          name="schoolType"
                          value={formData.schoolType}
                          onChange={handleChange}
                          data-error={!!getFieldError('schoolType')}
                          className={`w-full px-4 py-3 rounded-xl bg-env-bg-primary border text-env-primary focus:outline-none transition-colors ${
                            getFieldError('schoolType') 
                              ? 'border-red-500 focus:border-red-500' 
                              : 'border-env-border focus:border-[#FF8C42]'
                          }`}
                        >
                          <option value="">Select school type</option>
                          <option value="public">Public School</option>
                          <option value="private">Private School</option>
                        </select>
                        {getFieldError('schoolType') && (
                          <p className="mt-1 text-sm text-red-400">{getFieldError('schoolType')}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-env-primary mb-2">
                          Local Government Area <span className="text-red-400">*</span>
                        </label>
                        <select
                          name="schoolLGA"
                          value={formData.schoolLGA}
                          onChange={handleChange}
                          data-error={!!getFieldError('schoolLGA')}
                          className={`w-full px-4 py-3 rounded-xl bg-env-bg-primary border text-env-primary focus:outline-none transition-colors ${
                            getFieldError('schoolLGA') 
                              ? 'border-red-500 focus:border-red-500' 
                              : 'border-env-border focus:border-[#FF8C42]'
                          }`}
                        >
                          <option value="">Select LGA</option>
                          {lagosLGAs.map((lga) => (
                            <option key={lga} value={lga}>{lga}</option>
                          ))}
                        </select>
                        {getFieldError('schoolLGA') && (
                          <p className="mt-1 text-sm text-red-400">{getFieldError('schoolLGA')}</p>
                        )}
                      </div>
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
                        placeholder="Street address of your school"
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

                {/* ==================== STEP 3: BUSINESS IDEA ==================== */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-env-primary mb-2">
                        💡 Your Business Idea
                      </h2>
                      <p className="text-env-secondary text-sm">
                        This is the most important part! Take your time to explain your idea clearly.
                      </p>
                      
                      {/* Incentive clarity */}
                      <div className="mt-4 p-3 rounded-lg bg-[#52B788]/10 border border-[#52B788]/20">
                        <p className="text-[#52B788] text-sm font-medium">
                          🏆 Top ideas will receive up to ₦2,000,000 in funding + mentorship from successful entrepreneurs
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-env-primary mb-2">
                        Idea Title <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="ideaTitle"
                        value={formData.ideaTitle}
                        onChange={handleChange}
                        data-error={!!getFieldError('ideaTitle')}
                        className={`w-full px-4 py-3 rounded-xl bg-env-bg-primary border text-env-primary focus:outline-none transition-colors ${
                          getFieldError('ideaTitle') 
                            ? 'border-red-500 focus:border-red-500' 
                            : 'border-env-border focus:border-[#FF8C42]'
                        }`}
                        placeholder="Give your idea a catchy name"
                      />
                      {getFieldError('ideaTitle') && (
                        <p className="mt-1 text-sm text-red-400">{getFieldError('ideaTitle')}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-env-primary mb-2">
                        Category <span className="text-red-400">*</span>
                      </label>
                      <select
                        name="ideaCategory"
                        value={formData.ideaCategory}
                        onChange={handleChange}
                        data-error={!!getFieldError('ideaCategory')}
                        className={`w-full px-4 py-3 rounded-xl bg-env-bg-primary border text-env-primary focus:outline-none transition-colors ${
                          getFieldError('ideaCategory') 
                            ? 'border-red-500 focus:border-red-500' 
                            : 'border-env-border focus:border-[#FF8C42]'
                        }`}
                      >
                        <option value="">Select a category</option>
                        {ideaCategories.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                      {getFieldError('ideaCategory') && (
                        <p className="mt-1 text-sm text-red-400">{getFieldError('ideaCategory')}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-env-primary mb-2">
                        Describe Your Idea <span className="text-red-400">*</span>
                      </label>
                      <textarea
                        name="ideaDescription"
                        value={formData.ideaDescription}
                        onChange={handleChange}
                        data-error={!!getFieldError('ideaDescription')}
                        rows={4}
                        className={`w-full px-4 py-3 rounded-xl bg-env-bg-primary border text-env-primary focus:outline-none transition-colors resize-none ${
                          getFieldError('ideaDescription') 
                            ? 'border-red-500 focus:border-red-500' 
                            : 'border-env-border focus:border-[#FF8C42]'
                        }`}
                        placeholder="What is your business idea? Explain it like you're telling a friend who has never heard of it before..."
                      />
                      <div className="flex justify-between mt-1">
                        {getFieldError('ideaDescription') ? (
                          <p className="text-sm text-red-400">{getFieldError('ideaDescription')}</p>
                        ) : (
                          <p className="text-xs text-env-tertiary">Minimum 100 characters</p>
                        )}
                        <span className={`text-xs ${
                          formData.ideaDescription.length >= 100 ? 'text-[#52B788]' : 'text-env-tertiary'
                        }`}>
                          {formData.ideaDescription.length}/100
                        </span>
                      </div>
                    </div>

                    {/* Structured Problem Questions */}
                    <div className="p-4 rounded-xl bg-env-bg-primary border border-env-border">
                      <h3 className="font-semibold text-env-primary mb-4 flex items-center gap-2">
                        <span>🎯</span> Understanding the Problem
                      </h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-env-primary mb-2">
                            Who specifically has this problem? <span className="text-red-400">*</span>
                          </label>
                          <textarea
                            name="problemWho"
                            value={formData.problemWho}
                            onChange={handleChange}
                            data-error={!!getFieldError('problemWho')}
                            rows={2}
                            className={`w-full px-4 py-3 rounded-xl bg-env-surface border text-env-primary focus:outline-none transition-colors resize-none ${
                              getFieldError('problemWho') 
                                ? 'border-red-500 focus:border-red-500' 
                                : 'border-env-border focus:border-[#FF8C42]'
                            }`}
                            placeholder="E.g., 'Students in Lagos who struggle to find affordable study materials' or 'Small shop owners who can't track their sales'"
                          />
                          {getFieldError('problemWho') && (
                            <p className="mt-1 text-sm text-red-400">{getFieldError('problemWho')}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-env-primary mb-2">
                            How often do they face this problem?
                          </label>
                          <select
                            name="problemFrequency"
                            value={formData.problemFrequency}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-env-surface border border-env-border text-env-primary focus:border-[#FF8C42] focus:outline-none transition-colors"
                          >
                            <option value="">Select frequency</option>
                            <option value="daily">Every day</option>
                            <option value="weekly">Every week</option>
                            <option value="monthly">Every month</option>
                            <option value="occasionally">Occasionally</option>
                            <option value="specific-events">Only during specific events</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-env-primary mb-2">
                            What happens if this problem isn't solved? <span className="text-red-400">*</span>
                          </label>
                          <textarea
                            name="problemConsequence"
                            value={formData.problemConsequence}
                            onChange={handleChange}
                            data-error={!!getFieldError('problemConsequence')}
                            rows={2}
                            className={`w-full px-4 py-3 rounded-xl bg-env-surface border text-env-primary focus:outline-none transition-colors resize-none ${
                              getFieldError('problemConsequence') 
                                ? 'border-red-500 focus:border-red-500' 
                                : 'border-env-border focus:border-[#FF8C42]'
                            }`}
                            placeholder="E.g., 'They fail their exams' or 'They lose money because they can't track inventory'"
                          />
                          {getFieldError('problemConsequence') && (
                            <p className="mt-1 text-sm text-red-400">{getFieldError('problemConsequence')}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-env-primary mb-2">
                        What makes your solution different?
                      </label>
                      <textarea
                        name="uniqueness"
                        value={formData.uniqueness}
                        onChange={handleChange}
                        rows={2}
                        className="w-full px-4 py-3 rounded-xl bg-env-bg-primary border border-env-border text-env-primary focus:border-[#FF8C42] focus:outline-none transition-colors resize-none"
                        placeholder="Why would people choose your solution over what exists today?"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-env-primary mb-2">
                        Target Audience
                      </label>
                      <input
                        type="text"
                        name="targetAudience"
                        value={formData.targetAudience}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-env-bg-primary border border-env-border text-env-primary focus:border-[#FF8C42] focus:outline-none transition-colors"
                        placeholder="e.g., Students aged 15-25 in urban areas"
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
                      <p className="mt-1 text-xs text-env-tertiary">
                        Solo founders are welcome! Teams of up to 3 are also accepted.
                      </p>
                    </div>
                  </div>
                )}

                {/* ==================== STEP 4: GUARDIAN & SUBMIT ==================== */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-env-primary mb-2">
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
                        <strong>Why do we need this?</strong> Since participants are under 18, we need your parent or guardian's consent. 
                        We'll contact them to confirm your participation if you're selected.
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
                          data-error={!!getFieldError('guardianName')}
                          className={`w-full px-4 py-3 rounded-xl bg-env-bg-primary border text-env-primary focus:outline-none transition-colors ${
                            getFieldError('guardianName') 
                              ? 'border-red-500 focus:border-red-500' 
                              : 'border-env-border focus:border-[#FF8C42]'
                          }`}
                          placeholder="Parent/Guardian name"
                        />
                        {getFieldError('guardianName') && (
                          <p className="mt-1 text-sm text-red-400">{getFieldError('guardianName')}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-env-primary mb-2">
                          Relationship <span className="text-red-400">*</span>
                        </label>
                        <select
                          name="guardianRelationship"
                          value={formData.guardianRelationship}
                          onChange={handleChange}
                          data-error={!!getFieldError('guardianRelationship')}
                          className={`w-full px-4 py-3 rounded-xl bg-env-bg-primary border text-env-primary focus:outline-none transition-colors ${
                            getFieldError('guardianRelationship') 
                              ? 'border-red-500 focus:border-red-500' 
                              : 'border-env-border focus:border-[#FF8C42]'
                          }`}
                        >
                          <option value="">Select relationship</option>
                          <option value="mother">Mother</option>
                          <option value="father">Father</option>
                          <option value="guardian">Guardian</option>
                          <option value="other">Other</option>
                        </select>
                        {getFieldError('guardianRelationship') && (
                          <p className="mt-1 text-sm text-red-400">{getFieldError('guardianRelationship')}</p>
                        )}
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
                        data-error={!!getFieldError('guardianPhone')}
                        className={`w-full px-4 py-3 rounded-xl bg-env-bg-primary border text-env-primary focus:outline-none transition-colors ${
                          getFieldError('guardianPhone') 
                            ? 'border-red-500 focus:border-red-500' 
                            : 'border-env-border focus:border-[#FF8C42]'
                        }`}
                        placeholder="08012345678"
                      />
                      {getFieldError('guardianPhone') && (
                        <p className="mt-1 text-sm text-red-400">{getFieldError('guardianPhone')}</p>
                      )}
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
                        placeholder="guardian@email.com (optional but recommended)"
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
                        Why do you want to participate?
                      </label>
                      <textarea
                        name="whyParticipate"
                        value={formData.whyParticipate}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl bg-env-bg-primary border border-env-border text-env-primary focus:border-[#FF8C42] focus:outline-none transition-colors resize-none"
                        placeholder="What excites you about LaunchPad? What do you hope to achieve?"
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
                          data-error={!!getFieldError('agreeTerms')}
                          className="mt-1 w-5 h-5 rounded border-env-border text-[#FF8C42] focus:ring-[#FF8C42]"
                        />
                        <span className="text-env-secondary text-sm">
                          I agree to the{" "}
                          <Link href="/terms" className="text-[#FF8C42] hover:underline" target="_blank">
                            Terms & Conditions
                          </Link>{" "}
                          and{" "}
                          <Link href="/privacy" className="text-[#FF8C42] hover:underline" target="_blank">
                            Privacy Policy
                          </Link>
                          . I confirm that my parent/guardian consents to my participation.
                          <span className="text-red-400"> *</span>
                        </span>
                      </label>
                      {getFieldError('agreeTerms') && (
                        <p className="text-sm text-red-400 ml-8">{getFieldError('agreeTerms')}</p>
                      )}
                      
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          name="agreeContact"
                          checked={formData.agreeContact}
                          onChange={handleChange}
                          className="mt-1 w-5 h-5 rounded border-env-border text-[#FF8C42] focus:ring-[#FF8C42]"
                        />
                        <span className="text-env-secondary text-sm">
                          I agree to receive updates about LaunchPad via email, SMS, and WhatsApp.
                        </span>
                      </label>
                    </div>

                    {/* Final Motivation */}
                    <div className="p-4 rounded-xl bg-gradient-to-r from-[#FF8C42]/10 to-[#52B788]/10 border border-[#FF8C42]/20">
                      <p className="text-env-primary text-center font-medium">
                        🎯 You're about to join an exclusive group of young Nigerian entrepreneurs!
                      </p>
                    </div>
                  </div>
                )}

                {/* ==================== NAVIGATION BUTTONS ==================== */}
                <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8 pt-6 border-t border-env-border">
                  <div className="flex gap-2">
                    {currentStep > 1 && (
                      <button
                        type="button"
                        onClick={prevStep}
                        className="px-6 py-3 rounded-xl border border-env-border text-env-primary hover:border-[#FF8C42] transition-all font-medium"
                      >
                        ← Previous
                      </button>
                    )}
                    
                    <button
                      type="button"
                      onClick={handleSaveProgress}
                      disabled={isSaving}
                      className="px-4 py-3 rounded-xl border border-env-border text-env-tertiary hover:text-env-primary hover:border-[#52B788] transition-all text-sm"
                    >
                      {isSaving ? 'Saving...' : '💾 Save Progress'}
                    </button>
                  </div>
                  
                  {currentStep < totalSteps ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="px-8 py-3 bg-[#FF8C42] hover:bg-[#E85D04] text-[#1A1A1A] font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                      Next Step
                      <IconArrowRight size={18} color="#1A1A1A" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-3 bg-[#52B788] hover:bg-[#40916C] text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed min-w-[200px]"
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

                {/* Auto-save indicator */}
                {lastSaved && (
                  <p className="text-center text-xs text-env-tertiary mt-4">
                    Progress auto-saved at {lastSaved.toLocaleTimeString()}
                  </p>
                )}
              </form>
            </AnimatedSection>

          </div>
        </div>
      </section>
    </ChapterWrapper>
  );
}