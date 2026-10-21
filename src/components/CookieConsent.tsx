import React, { useState, useEffect } from 'react';
import { ShieldCheck } from 'lucide-react';
import { getStoredConsent, grantMetaConsent, revokeMetaConsent } from '../utils/metaPixel';
import { sound } from '../utils/audio';

export function openCookiePreferences() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('openCookiePreferences'));
  }
}

export const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentConsent, setCurrentConsent] = useState<'granted' | 'denied' | null>(getStoredConsent());

  useEffect(() => {
    // Show on initial visit if no choice was previously recorded
    const existing = getStoredConsent();
    if (!existing) {
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    // Provide a persistent entry point to withdraw or change consent anytime
    const handleOpen = () => {
      setCurrentConsent(getStoredConsent());
      setIsMinimized(false);
      setIsVisible(true);
    };

    window.addEventListener('openCookiePreferences', handleOpen);
    return () => {
      window.removeEventListener('openCookiePreferences', handleOpen);
    };
  }, []);

  if (!isVisible) return null;

  const handleAccept = () => {
    sound.playClick(800);
    grantMetaConsent();
    setCurrentConsent('granted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    sound.playClick(400);
    revokeMetaConsent();
    setCurrentConsent('denied');
    setIsVisible(false);
  };

  // Minimized floating pill mode (takes negligible screen space)
  if (isMinimized) {
    return (
      <aside
        aria-label="Cookie Privacy Preferences"
        className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 z-40"
      >
        <button
          type="button"
          onClick={() => setIsMinimized(false)}
          className="btn-tactile flex items-center gap-2 px-3 py-1.5 rounded-full border shadow-lg backdrop-blur-md text-[11px] font-mono uppercase tracking-wider transition-all hover:border-[#E01A40]"
          style={{
            backgroundColor: 'var(--theme-surface-card)',
            borderColor: 'var(--theme-border-card)',
            color: 'var(--theme-text-primary)',
          }}
          aria-label="Expand Cookie and Privacy Consent"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-[#E01A40]" />
          <span>PRIVACY</span>
        </button>
      </aside>
    );
  }

  return (
    <aside
      aria-label="Cookie and Privacy Consent"
      className="fixed bottom-3 left-3 right-3 sm:left-auto sm:right-4 sm:bottom-4 sm:max-w-sm z-40 p-3 sm:p-4 rounded-xl border shadow-2xl backdrop-blur-xl transition-all duration-300"
      style={{
        backgroundColor: 'var(--theme-surface-card)',
        borderColor: 'var(--theme-border-card)',
        color: 'var(--theme-text-primary)',
      }}
    >
      <div className="space-y-2.5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-[#E01A40] uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>PRIVACY &amp; META PIXEL</span>
          </div>
          <div className="flex items-center gap-1.5">
            {currentConsent && (
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded border" style={{ borderColor: 'var(--theme-border)', color: 'var(--theme-text-muted)' }}>
                {currentConsent.toUpperCase()}
              </span>
            )}
            <button
              type="button"
              onClick={() => setIsMinimized(true)}
              className="text-[10px] font-mono px-1.5 py-0.5 rounded text-neutral-400 hover:text-white cursor-pointer"
              aria-label="Minimize cookie banner"
            >
              ✕
            </button>
          </div>
        </div>

        <p className="text-[11px] font-sans leading-relaxed line-clamp-2 sm:line-clamp-none" style={{ color: 'var(--theme-text-secondary)' }}>
          We use Meta Pixel telemetry to measure campaigns under UK GDPR / PECR. Withdraw consent anytime.
        </p>

        <div className="flex items-center gap-2 pt-0.5">
          <button
            type="button"
            onClick={handleAccept}
            className="btn-tactile flex-1 min-h-[36px] py-1.5 px-3 rounded-lg bg-[#E01A40] hover:bg-[#FF2A44] text-white font-mono text-[11px] uppercase tracking-wider font-bold transition-all shadow-[0_0_15px_rgba(224,26,64,0.3)] active:scale-[0.97]"
          >
            ACCEPT
          </button>
          <button
            type="button"
            onClick={handleDecline}
            className="btn-tactile min-h-[36px] py-1.5 px-3 rounded-lg border font-mono text-[11px] uppercase tracking-wider font-medium transition-all hover:border-[#E01A40] active:scale-[0.97]"
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
