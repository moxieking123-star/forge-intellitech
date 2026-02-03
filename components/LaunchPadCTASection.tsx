'use client';

import { useState } from 'react';
import { FormModal, StudentApplicationForm, SponsorApplicationForm } from './LaunchPadForms';
import { AnimatedSection } from './AnimatedSection';
import { LAUNCHPAD_CONFIG } from '@/lib/launchpadData';

export function LaunchPadCTASection() {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isSponsorModalOpen, setIsSponsorModalOpen] = useState(false);

  return (
    <>
      {/* Inline Apply Section */}
      <section id="apply" className="section-padding scroll-mt-20">
        <div className="container-forge">
          <AnimatedSection animation="fade-up">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-chapter-accent bg-chapter-accent-soft rounded-full border border-chapter-accent/20">
                  Apply Now
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-4">
                  Join LaunchPad {LAUNCHPAD_CONFIG.currentYear}
                </h2>
                <p className="text-env-secondary max-w-2xl mx-auto">
                  Ready to transform your ideas into reality? Complete the application below.
                  Applications are open until {new Date(LAUNCHPAD_CONFIG.applicationDeadline).toLocaleDateString('en-NG', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })}.
                </p>
              </div>
              
              {/* Embedded Application Form */}
              <div className="p-6 md:p-8 rounded-2xl bg-env-surface border border-env-border">
                <StudentApplicationForm />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Inline Sponsor Section */}
      <section id="sponsor" className="section-padding bg-env-secondary scroll-mt-20">
        <div className="container-forge">
          <AnimatedSection animation="fade-up">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-purple-400 bg-purple-500/10 rounded-full border border-purple-500/20">
                  Become a Sponsor
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-env-primary mb-4">
                  Invest in Nigeria's Future
                </h2>
                <p className="text-env-secondary max-w-2xl mx-auto">
                  Partner with us to empower the next generation of Nigerian entrepreneurs.
                  Select a tier and submit your sponsorship inquiry below.
                </p>
              </div>
              
              {/* Embedded Sponsor Form */}
              <div className="p-6 md:p-8 rounded-2xl bg-env-surface border border-env-border">
                <SponsorApplicationForm />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Quick Action Buttons (Fixed on mobile) */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-env-bg-primary/95 backdrop-blur-sm border-t border-env-border md:hidden z-40">
        <div className="flex gap-3">
          <a
            href="#apply"
            className="flex-1 py-3 bg-chapter-accent text-env-text-inverse font-semibold rounded-lg text-center transition-smooth"
          >
            Apply Now
          </a>
          <a
            href="#sponsor"
            className="flex-1 py-3 bg-purple-600 text-white font-semibold rounded-lg text-center transition-smooth"
          >
            Sponsor
          </a>
        </div>
      </div>
    </>
  );
}

/* Alternative: Modal-based forms */
export function LaunchPadModals() {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isSponsorModalOpen, setIsSponsorModalOpen] = useState(false);

  return (
    <>
      {/* Trigger Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => setIsApplyModalOpen(true)}
          className="px-8 py-4 bg-chapter-accent hover:bg-chapter-accent-hover text-env-text-inverse font-semibold rounded-lg transition-smooth glow hover-lift"
        >
          🚀 Apply for LaunchPad {LAUNCHPAD_CONFIG.currentYear}
        </button>
        <button
          onClick={() => setIsSponsorModalOpen(true)}
          className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-smooth hover-lift"
        >
          🤝 Become a Sponsor
        </button>
      </div>

      {/* Application Modal */}
      <FormModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        title={`Apply for LaunchPad ${LAUNCHPAD_CONFIG.currentYear}`}
      >
        <StudentApplicationForm />
      </FormModal>

      {/* Sponsor Modal */}
      <FormModal
        isOpen={isSponsorModalOpen}
        onClose={() => setIsSponsorModalOpen(false)}
        title="Become a LaunchPad Sponsor"
      >
        <SponsorApplicationForm />
      </FormModal>
    </>
  );
}