'use client';

import { useState, useEffect } from 'react';

/* ============================================
   FORM MODAL COMPONENT
   ============================================ */

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function FormModal({ isOpen, onClose, title, children }: FormModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-env-surface border border-env-border rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-env-border bg-env-surface rounded-t-2xl">
          <h2 id="modal-title" className="text-xl font-bold text-env-primary">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-env-tertiary hover:text-env-primary hover:bg-env-surface-hover rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Body */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ============================================
   STUDENT APPLICATION FORM
   ============================================ */

export function StudentApplicationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    gender: '',
    schoolName: '',
    schoolLevel: '',
    parentName: '',
    parentPhone: '',
    businessCategory: '',
    businessTitle: '',
    problemStatement: '',
    solution: '',
    aiIntegration: '',
    whyJoin: '',
    parentConsent: false,
    termsAccepted: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1: return !!(formData.fullName && formData.email && formData.phone && formData.gender);
      case 2: return !!(formData.schoolName && formData.schoolLevel && formData.parentName && formData.parentPhone);
      case 3: return !!(formData.businessCategory && formData.businessTitle && formData.problemStatement && formData.solution && formData.aiIntegration);
      case 4: return formData.parentConsent && formData.termsAccepted;
      default: return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    } else if (!validateStep(currentStep)) {
      setError('Please fill in all required fields');
      setTimeout(() => setError(''), 3000);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(4)) {
      setError('Please accept all terms');
      return;
    }

    setStatus('loading');
    setError('');

    try {
      const response = await fetch('/api/launchpad/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, submittedAt: new Date().toISOString() }),
      });

      if (!response.ok) throw new Error('Submission failed');
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setError('Failed to submit. Please try again.');
    }
  };

  // Success screen
  if (status === 'success') {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">Application Submitted! 🎉</h3>
        <p className="text-gray-400 mb-2">Thank you for applying to LaunchPad 2025!</p>
        <p className="text-gray-500 text-sm mb-8">We'll contact you at {formData.email} within 5 business days.</p>
        <button
          onClick={() => {
            setStatus('idle');
            setCurrentStep(1);
            setFormData({
              fullName: '', email: '', phone: '', gender: '',
              schoolName: '', schoolLevel: '', parentName: '', parentPhone: '',
              businessCategory: '', businessTitle: '', problemStatement: '', solution: '', aiIntegration: '',
              whyJoin: '', parentConsent: false, termsAccepted: false,
            });
          }}
          className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
        >
          Submit Another Application
        </button>
      </div>
    );
  }

  const steps = ['Personal Info', 'School & Parent', 'Business Idea', 'Review'];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
              currentStep >= step ? 'bg-purple-600 text-white' : 'bg-white/10 text-gray-500'
            }`}>
              {currentStep > step ? '✓' : step}
            </div>
            {step < 4 && (
              <div className={`hidden sm:block w-16 h-1 mx-2 ${currentStep > step ? 'bg-purple-600' : 'bg-white/10'}`} />
            )}
          </div>
        ))}
      </div>

      <h3 className="text-lg font-semibold text-white text-center mb-6">
        Step {currentStep}: {steps[currentStep - 1]}
      </h3>

      {error && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          ⚠️ {error}
        </div>
      )}

      {/* Step 1: Personal Info */}
      {currentStep === 1 && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Full Name *</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Your full name"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Phone *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="08012345678"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Gender *</label>
              <div className="flex gap-6 pt-3">
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleChange} className="mr-2" />
                  <span className="text-gray-300">Male</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleChange} className="mr-2" />
                  <span className="text-gray-300">Female</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: School & Parent */}
      {currentStep === 2 && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">School Name *</label>
              <input
                type="text"
                name="schoolName"
                value={formData.schoolName}
                onChange={handleChange}
                placeholder="Your school name"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Class *</label>
              <select
                name="schoolLevel"
                value={formData.schoolLevel}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
                required
              >
                <option value="" className="bg-gray-900">Select class</option>
                <option value="ss3" className="bg-gray-900">SS3 (Final Year)</option>
                <option value="ss2" className="bg-gray-900">SS2</option>
                <option value="ss1" className="bg-gray-900">SS1</option>
                <option value="jss3" className="bg-gray-900">JSS3</option>
              </select>
            </div>
          </div>
          <div className="border-t border-white/10 pt-4 mt-4">
            <p className="text-purple-400 text-sm font-medium mb-4">👨‍👩‍👧 Parent/Guardian Info</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Parent Name *</label>
              <input
                type="text"
                name="parentName"
                value={formData.parentName}
                onChange={handleChange}
                placeholder="Parent/guardian name"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Parent Phone *</label>
              <input
                type="tel"
                name="parentPhone"
                value={formData.parentPhone}
                onChange={handleChange}
                placeholder="08012345678"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500"
                required
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Business Idea */}
      {currentStep === 3 && (
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
            <p className="text-sm text-gray-300">💡 This is the most important part! Tell us about your business idea.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Category *</label>
              <select
                name="businessCategory"
                value={formData.businessCategory}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
                required
              >
                <option value="" className="bg-gray-900">Select category</option>
                <option value="tech" className="bg-gray-900">Technology</option>
                <option value="education" className="bg-gray-900">Education</option>
                <option value="health" className="bg-gray-900">Health</option>
                <option value="agriculture" className="bg-gray-900">Agriculture</option>
                <option value="finance" className="bg-gray-900">Finance</option>
                <option value="other" className="bg-gray-900">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Business Name *</label>
              <input
                type="text"
                name="businessTitle"
                value={formData.businessTitle}
                onChange={handleChange}
                placeholder="Name your idea"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-2">What problem does it solve? *</label>
            <textarea
              name="problemStatement"
              value={formData.problemStatement}
              onChange={handleChange}
              rows={3}
              placeholder="Describe the problem..."
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500 resize-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-2">Your solution *</label>
            <textarea
              name="solution"
              value={formData.solution}
              onChange={handleChange}
              rows={3}
              placeholder="How does your idea solve it?"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500 resize-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-2">How does AI help? *</label>
            <textarea
              name="aiIntegration"
              value={formData.aiIntegration}
              onChange={handleChange}
              rows={3}
              placeholder="How will you use AI?"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500 resize-none"
              required
            />
          </div>
        </div>
      )}

      {/* Step 4: Review */}
      {currentStep === 4 && (
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <h4 className="font-semibold text-white mb-4">📋 Review Your Application</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="text-gray-400">Name:</span> <span className="text-white ml-2">{formData.fullName}</span></div>
              <div><span className="text-gray-400">Email:</span> <span className="text-white ml-2">{formData.email}</span></div>
              <div><span className="text-gray-400">School:</span> <span className="text-white ml-2">{formData.schoolName}</span></div>
              <div><span className="text-gray-400">Idea:</span> <span className="text-white ml-2">{formData.businessTitle}</span></div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-2">Why LaunchPad?</label>
            <textarea
              name="whyJoin"
              value={formData.whyJoin}
              onChange={handleChange}
              rows={2}
              placeholder="What excites you about LaunchPad?"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500 resize-none"
            />
          </div>
          <div className="space-y-3 p-6 rounded-xl bg-white/5 border border-white/10">
            <label className="flex items-start cursor-pointer">
              <input type="checkbox" name="parentConsent" checked={formData.parentConsent} onChange={handleChange} className="mt-1 mr-3" required />
              <span className="text-gray-300 text-sm">My parent/guardian consents to my participation. *</span>
            </label>
            <label className="flex items-start cursor-pointer">
              <input type="checkbox" name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} className="mt-1 mr-3" required />
              <span className="text-gray-300 text-sm">I confirm all information is accurate. *</span>
            </label>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between pt-6 border-t border-white/10">
        {currentStep > 1 ? (
          <button type="button" onClick={prevStep} className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">
            ← Back
          </button>
        ) : <div />}
        
        {currentStep < 4 ? (
          <button type="button" onClick={nextStep} className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors">
            Next →
          </button>
        ) : (
          <button 
            type="submit" 
            disabled={status === 'loading'}
            className="px-8 py-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-semibold rounded-lg transition-colors"
          >
            {status === 'loading' ? 'Submitting...' : '🚀 Submit Application'}
          </button>
        )}
      </div>
    </form>
  );
}

/* ============================================
   SPONSOR APPLICATION FORM
   ============================================ */

export function SponsorApplicationForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const [selectedTier, setSelectedTier] = useState('');
  
  const [formData, setFormData] = useState({
    organizationName: '',
    organizationType: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    sponsorshipGoals: '',
    termsAccepted: false,
  });

  const tiers = [
    { name: 'Bronze', amount: '₦100K - ₦249K', popular: false },
    { name: 'Silver', amount: '₦250K - ₦499K', popular: false },
    { name: 'Gold', amount: '₦500K - ₦999K', popular: true },
    { name: 'Platinum', amount: '₦1M+', popular: false },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
      setError('Please accept the terms');
      return;
    }
    
    setStatus('loading');
    setError('');

    try {
      const response = await fetch('/api/launchpad/sponsor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, tier: selectedTier, submittedAt: new Date().toISOString() }),
      });
      if (!response.ok) throw new Error('Failed');
      setStatus('success');
    } catch {
      setStatus('error');
      setError('Submission failed. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">Inquiry Received! 🤝</h3>
        <p className="text-gray-400 mb-8">Our team will contact you within 2 business days.</p>
        <button
          onClick={() => {
            setStatus('idle');
            setSelectedTier('');
            setFormData({ organizationName: '', organizationType: '', contactName: '', contactEmail: '', contactPhone: '', sponsorshipGoals: '', termsAccepted: false });
          }}
          className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg"
        >
          Submit Another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Tier Selection */}
      <div>
        <h4 className="text-lg font-semibold text-white mb-4">Select Tier</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {tiers.map((tier) => (
            <button
              key={tier.name}
              type="button"
              onClick={() => setSelectedTier(tier.name)}
              className={`p-4 rounded-xl text-left transition-all ${
                selectedTier === tier.name 
                  ? 'bg-purple-600 border-2 border-purple-400' 
                  : 'bg-white/5 border border-white/10 hover:border-purple-500/50'
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className="font-semibold text-white">{tier.name}</span>
                {tier.popular && <span className="text-[10px] px-1.5 py-0.5 bg-yellow-500/20 text-yellow-400 rounded">Popular</span>}
              </div>
              <span className="text-purple-400 text-sm font-medium">{tier.amount}</span>
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          ⚠️ {error}
        </div>
      )}

      {/* Organization */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white">Organization</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">Organization Name *</label>
            <input
              type="text"
              name="organizationName"
              value={formData.organizationName}
              onChange={handleChange}
              placeholder="Company name"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-2">Type *</label>
            <select
              name="organizationType"
              value={formData.organizationType}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
              required
            >
              <option value="" className="bg-gray-900">Select type</option>
              <option value="corporate" className="bg-gray-900">Corporate</option>
              <option value="government" className="bg-gray-900">Government</option>
              <option value="ngo" className="bg-gray-900">NGO/Foundation</option>
              <option value="individual" className="bg-gray-900">Individual</option>
            </select>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white">Contact Person</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">Name *</label>
            <input
              type="text"
              name="contactName"
              value={formData.contactName}
              onChange={handleChange}
              placeholder="Contact name"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-2">Email *</label>
            <input
              type="email"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              placeholder="email@company.com"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-2">Phone *</label>
            <input
              type="tel"
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleChange}
              placeholder="08012345678"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500"
              required
            />
          </div>
        </div>
      </div>

      {/* Goals */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">Sponsorship Goals</label>
        <textarea
          name="sponsorshipGoals"
          value={formData.sponsorshipGoals}
          onChange={handleChange}
          rows={3}
          placeholder="What do you hope to achieve?"
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500 resize-none"
        />
      </div>

      {/* Terms */}
      <div className="p-6 rounded-xl bg-white/5 border border-white/10">
        <label className="flex items-start cursor-pointer">
          <input type="checkbox" name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} className="mt-1 mr-3" required />
          <span className="text-gray-300 text-sm">I am authorized to discuss sponsorship on behalf of my organization. *</span>
        </label>
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full px-8 py-4 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-semibold rounded-lg transition-colors"
      >
        {status === 'loading' ? 'Submitting...' : '🤝 Submit Sponsorship Inquiry'}
      </button>
    </form>
  );
}