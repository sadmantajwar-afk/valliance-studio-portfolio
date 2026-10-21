import React, { useState, useEffect } from 'react';
import { ShieldCheck } from 'lucide-react';
import { getStoredConsent, grantMetaConsent, revokeMetaConsent } from '../utils/metaPixel';
import { sound } from '../utils/audio';

export const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show only if no explicit choice has been recorded
    const existing = getStoredConsent();
    if (!existing) {
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!isVisible) return null;

  const handleAccept = () => {
    sound.playClick(800);
    grantMetaConsent();
    setIsVisible(false);
  };

  const handleDecline = () => {
    sound.playClick(400);
    revokeMetaConsent();
    setIsVisible(false);
  };

  return (
    <aside
      aria-label="Cookie and Privacy Consent"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-md z-40 p-4 sm:p-5 rounded-2xl border shadow-2xl backdrop-blur-xl transition-all duration-300"
      style={{
        backgroundColor: 'var(--theme-surface-card)',
        borderColor: 'var(--theme-border-card)',
        color: 'var(--theme-text-primary)',
      }}
    >
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#F3264B] uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>PRIVACY &amp; ANALYTICS</span>
        </div>

        <p className="text-xs font-sans leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>
          We respect your privacy. We use anonymous analytics cookies to refine performance and understand visitor journeys in accordance with UK GDPR and PECR.
        </p>

        <div className="flex items-center gap-2.5 pt-1">
          <button
            type="button"
            onClick={handleAccept}
            className="btn-tactile flex-1 py-2 px-3.5 rounded-lg bg-[#F3264B] hover:bg-[#FF2A44] text-white font-mono text-xs uppercase tracking-wider font-bold transition-all shadow-[0_0_15px_rgba(243,38,75,0.3)] active:scale-[0.97]"
          >
            ACCEPT
          </button>
          <button
            type="button"
            onClick={handleDecline}
            className="btn-tactile py-2 px-3.5 rounded-lg border font-mono text-xs uppercase tracking-wider font-medium transition-all hover:border-[#F3264B] active:scale-[0.97]"
            style={{
              borderColor: 'var(--theme-border)',
              color: 'var(--theme-text-muted)',
              backgroundColor: 'var(--theme-surface-elevated)',
            }}
          >
            DECLINE
          </button>
        </div>
      </div>
    </aside>
  );
};
