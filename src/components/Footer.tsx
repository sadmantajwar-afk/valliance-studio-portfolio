import React from 'react';
import { ArrowUp } from 'lucide-react';
import { sound } from '../utils/audio';
import { LogoLockup } from './Logo';
import { openCookiePreferences } from './CookieConsent';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    sound.playClick(600);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className="relative border-t pt-20 pb-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200"
      style={{
        backgroundColor: 'var(--theme-bg-deep)',
        color: 'var(--theme-text-primary)',
        borderColor: 'var(--theme-border)',
      }}
    >
      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto space-y-16">
        {/* Top Split */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start pb-12 border-b" style={{ borderColor: 'var(--theme-border)' }}>
          <div className="md:col-span-6 space-y-5">
            <LogoLockup />
            <p className="text-sm max-w-sm font-light leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>
              Engineering category-defining digital flagships, autonomous conversational agents, and friction-free operational systems for visionary enterprises across the US and UK.
            </p>
          </div>

          <div className="md:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs font-mono">
            {/* Quick Links */}
            <div className="space-y-3">
              <span className="text-[#F3264B] uppercase tracking-wider block font-bold">
                INDEX
              </span>
              <ul className="space-y-2" style={{ color: 'var(--theme-text-secondary)' }}>
                <li><a href="#work" className="hover:text-[#F3264B] transition-colors py-1 inline-block">01 Demo Projects</a></li>
                <li><a href="#process" className="hover:text-[#F3264B] transition-colors py-1 inline-block">02 Process</a></li>
                <li><a href="#pricing" className="hover:text-[#F3264B] transition-colors py-1 inline-block">03 Pricing &amp; Plans</a></li>
                <li><a href="#contact" className="hover:text-[#F3264B] transition-colors py-1 inline-block">04 Collaboration</a></li>
              </ul>
            </div>

            {/* Social Channels */}
            <div className="space-y-3">
              <span className="text-[#F3264B] uppercase tracking-wider block font-bold">
                CHANNELS
              </span>
              <ul className="space-y-2" style={{ color: 'var(--theme-text-secondary)' }}>
                <li><a href="https://www.facebook.com/share/1Kbs7Etq2y/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="hover:text-[#F3264B] transition-colors py-1 inline-block">Facebook Page ↗</a></li>
                <li><a href="https://www.instagram.com/valliance.studio?mdxt=aDBvaTdtMGNuYzcx" target="_blank" rel="noopener noreferrer" className="hover:text-[#F3264B] transition-colors py-1 inline-block">Instagram ↗</a></li>
              </ul>
            </div>

            {/* Status & Availability */}
            <div className="space-y-3">
              <span className="text-[#F3264B] uppercase tracking-wider block font-bold">
                STATUS
              </span>
              <ul className="space-y-2" style={{ color: 'var(--theme-text-muted)' }}>
                <li>US (USD) &amp; UK (GBP)</li>
                <li className="text-[#F3264B] font-semibold">Open for New Projects</li>
                <li>Optional Care SLA</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t text-xs font-mono" style={{ borderColor: 'var(--theme-border)', color: 'var(--theme-text-muted)' }}>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-2 text-center sm:text-left">
            <span>© 2026 VALLIANCE STUDIO LTD. ALL RIGHTS RESERVED.</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">BUILT WITH INTENT &amp; CODE</span>
            <span className="hidden sm:inline">·</span>
            <button
              type="button"
              onClick={() => {
                sound.playClick(600);
                openCookiePreferences();
              }}
              className="hover:text-[#F3264B] transition-colors underline underline-offset-4 cursor-pointer"
            >
              COOKIE PREFERENCES
            </button>
          </div>

          <button
            onClick={scrollToTop}
            className="btn-tactile inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 rounded-full border transition-all active:scale-[0.97] hover:text-[#F3264B]"
            style={{
              backgroundColor: 'var(--theme-surface-elevated)',
              borderColor: 'var(--theme-border)',
              color: 'var(--theme-text-primary)',
            }}
            data-cursor="hover"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
