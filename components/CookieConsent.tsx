'use client';

import { useState, useEffect } from 'react';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('forge-cookie-consent');
    if (!consent) {
      // Show banner after a short delay
      const timer = setTimeout(() => setShowBanner(true), 2000);
      return () => clearTimeout(timer);
    } else {
      try {
        const saved = JSON.parse(consent);
        setPreferences(saved);
        applyConsent(saved);
      } catch {
        // Invalid stored consent, show banner
        setShowBanner(true);
      }
    }
  }, []);

  const applyConsent = (prefs: CookiePreferences) => {
    // Apply analytics consent (Google Analytics)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        analytics_storage: prefs.analytics ? 'granted' : 'denied',
        ad_storage: prefs.marketing ? 'granted' : 'denied',
      });
    }

    // You can add more tracking services here
    if (prefs.analytics) {
      console.log('✅ Analytics cookies enabled');
    }
    if (prefs.marketing) {
      console.log('✅ Marketing cookies enabled');
    }
  };

  const saveConsent = (prefs: CookiePreferences) => {
    localStorage.setItem('forge-cookie-consent', JSON.stringify(prefs));
    localStorage.setItem('forge-cookie-consent-date', new Date().toISOString());
    applyConsent(prefs);
  };

  const acceptAll = () => {
    const allConsent = { necessary: true, analytics: true, marketing: true };
    setPreferences(allConsent);
    saveConsent(allConsent);
    setShowBanner(false);
  };

  const acceptSelected = () => {
    saveConsent(preferences);
    setShowBanner(false);
    setShowPreferences(false);
  };

  const rejectAll = () => {
    const minimalConsent = { necessary: true, analytics: false, marketing: false };
    setPreferences(minimalConsent);
    saveConsent(minimalConsent);
    setShowBanner(false);
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return; // Can't disable necessary cookies
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      {showBanner && (
        <div
          className={`fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6 transition-all duration-300 ease-out ${
            isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
          }`}
        >
          <div className="max-w-4xl mx-auto bg-[var(--env-surface)] rounded-2xl shadow-2xl border border-[var(--env-border)] overflow-hidden">
            
            {/* Main Banner View */}
            {!showPreferences ? (
              <div className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  {/* Cookie Icon */}
                  <div className="text-4xl hidden sm:block">🍪</div>
                  
                  <div className="flex-1">
                    <h3 className="font-heading font-bold text-lg md:text-xl text-[var(--env-text-primary)] mb-2">
                      We value your privacy
                    </h3>
                    <p className="text-sm md:text-base text-[var(--env-text-secondary)] leading-relaxed">
                      We use cookies to enhance your browsing experience, analyze site traffic, 
                      and personalize content. By clicking "Accept All", you consent to our use 
                      of cookies. You can customize your preferences or reject non-essential cookies.
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <button
                    onClick={acceptAll}
                    className="
                      flex-1 sm:flex-none px-6 py-3 rounded-xl
                      bg-[var(--chapter-accent)] hover:bg-[var(--chapter-accent-hover)]
                      text-white font-semibold
                      transition-all duration-300
                      hover:shadow-lg hover:shadow-[var(--chapter-accent)]/25
                    "
                  >
                    Accept All
                  </button>
                  <button
                    onClick={rejectAll}
                    className="
                      flex-1 sm:flex-none px-6 py-3 rounded-xl
                      bg-transparent border border-[var(--env-border)]
                      text-[var(--env-text-primary)] font-semibold
                      hover:bg-[var(--env-border)]/50
                      transition-all duration-300
                    "
                  >
                    Reject All
                  </button>
                  <button
                    onClick={() => setShowPreferences(true)}
                    className="
                      flex-1 sm:flex-none px-6 py-3
                      text-[var(--chapter-accent)] font-semibold
                      hover:underline
                      transition-all duration-300
                    "
                  >
                    Customize
                  </button>
                </div>
              </div>
            ) : (
              /* Preferences View */
              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-heading font-bold text-lg md:text-xl text-[var(--env-text-primary)]">
                    Cookie Preferences
                  </h3>
                  <button
                    onClick={() => setShowPreferences(false)}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--env-text-secondary)] hover:text-[var(--env-text-primary)] hover:bg-[var(--env-border)] transition-colors"
                    aria-label="Close preferences"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Necessary Cookies */}
                  <div className="flex items-center justify-between p-4 bg-[var(--env-bg-primary)] rounded-xl">
                    <div className="flex-1 pr-4">
                      <h4 className="font-semibold text-[var(--env-text-primary)]">
                        Necessary Cookies
                      </h4>
                      <p className="text-sm text-[var(--env-text-tertiary)] mt-1">
                        Required for the website to function properly. Cannot be disabled.
                      </p>
                    </div>
                    <div 
                      className="w-12 h-7 rounded-full relative bg-[var(--chapter-accent)] cursor-not-allowed opacity-80"
                    >
                      <div className="absolute right-1 top-1 w-5 h-5 bg-white rounded-full shadow-sm" />
                    </div>
                  </div>

                  {/* Analytics Cookies */}
                  <div className="flex items-center justify-between p-4 bg-[var(--env-bg-primary)] rounded-xl">
                    <div className="flex-1 pr-4">
                      <h4 className="font-semibold text-[var(--env-text-primary)]">
                        Analytics Cookies
                      </h4>
                      <p className="text-sm text-[var(--env-text-tertiary)] mt-1">
                        Help us understand how visitors interact with our website.
                      </p>
                    </div>
                    <button
                      onClick={() => togglePreference('analytics')}
                      className={`
                        w-12 h-7 rounded-full relative transition-colors duration-300
                        ${preferences.analytics 
                          ? 'bg-[var(--chapter-accent)]' 
                          : 'bg-[var(--env-border)]'
                        }
                      `}
                      aria-label="Toggle analytics cookies"
                    >
                      <div 
                        className={`
                          absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm transition-all duration-300
                          ${preferences.analytics ? 'right-1' : 'left-1'}
                        `}
                      />
                    </button>
                  </div>

                  {/* Marketing Cookies */}
                  <div className="flex items-center justify-between p-4 bg-[var(--env-bg-primary)] rounded-xl">
                    <div className="flex-1 pr-4">
                      <h4 className="font-semibold text-[var(--env-text-primary)]">
                        Marketing Cookies
                      </h4>
                      <p className="text-sm text-[var(--env-text-tertiary)] mt-1">
                        Used to deliver personalized advertisements and measure their effectiveness.
                      </p>
                    </div>
                    <button
                      onClick={() => togglePreference('marketing')}
                      className={`
                        w-12 h-7 rounded-full relative transition-colors duration-300
                        ${preferences.marketing 
                          ? 'bg-[var(--chapter-accent)]' 
                          : 'bg-[var(--env-border)]'
                        }
                      `}
                      aria-label="Toggle marketing cookies"
                    >
                      <div 
                        className={`
                          absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm transition-all duration-300
                          ${preferences.marketing ? 'right-1' : 'left-1'}
                        `}
                      />
                    </button>
                  </div>
                </div>

                {/* Save Button */}
                <button
                  onClick={acceptSelected}
                  className="
                    w-full mt-6 px-6 py-4 rounded-xl
                    bg-[var(--chapter-accent)] hover:bg-[var(--chapter-accent-hover)]
                    text-white font-semibold
                    transition-all duration-300
                    hover:shadow-lg hover:shadow-[var(--chapter-accent)]/25
                  "
                >
                  Save Preferences
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}