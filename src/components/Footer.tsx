import React from 'react';
import { ArrowUp, Terminal } from 'lucide-react';
import { sound } from '../utils/audio';
import { LogoLockup } from './Logo';

interface FooterProps {
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const scrollToTop = () => {
    sound.playClick(600);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#060505] text-[#f7f3eb] border-t border-white/10 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto space-y-16">
        {/* Top Split */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start pb-12 border-b border-white/10">
          <div className="md:col-span-6 space-y-5">
            <LogoLockup />
            <p className="text-sm text-[#8e8b82] max-w-sm font-light leading-relaxed">
              Engineering category-defining digital flagships, autonomous conversational agents, and friction-free operational systems for visionary enterprises across the US and UK.
            </p>
          </div>

          <div className="md:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs font-mono">
            {/* Quick Links */}
            <div className="space-y-3">
              <span className="text-[#e8002d] uppercase tracking-wider block">
                INDEX
              </span>
              <ul className="space-y-2 text-[#cfc8ba]">
                <li><a href="#work" className="hover:text-[#f7f3eb] transition-colors py-1 inline-block">01 Demo Projects</a></li>
                <li><a href="#process" className="hover:text-[#f7f3eb] transition-colors py-1 inline-block">02 Process</a></li>
                <li><a href="#pricing" className="hover:text-[#f7f3eb] transition-colors py-1 inline-block">03 Pricing &amp; Plans</a></li>
                <li><a href="#contact" className="hover:text-[#f7f3eb] transition-colors py-1 inline-block">04 Collaboration</a></li>
              </ul>
            </div>

            {/* Social Channels */}
            <div className="space-y-3">
              <span className="text-[#e8002d] uppercase tracking-wider block">
                CHANNELS
              </span>
              <ul className="space-y-2 text-[#cfc8ba]">
                <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#f7f3eb] transition-colors py-1 inline-block">Facebook Page ↗</a></li>
                <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#f7f3eb] transition-colors py-1 inline-block">Instagram ↗</a></li>
              </ul>
            </div>

            {/* Status & Availability */}
            <div className="space-y-3">
              <span className="text-[#e8002d] uppercase tracking-wider block">
                STATUS
              </span>
              <ul className="space-y-2 text-[#8e8b82]">
                <li>US (USD) &amp; UK (GBP)</li>
                <li className="text-[#e8002d]">Open for New Projects</li>
                <li>Mandatory Care SLA</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-white/10 text-xs font-mono text-[#8a8172]">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-2 text-center sm:text-left">
            <span>© 2026 VALLIANCE STUDIO LTD. ALL RIGHTS RESERVED.</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">BUILT WITH INTENT &amp; CODE</span>
            <span className="hidden sm:inline">·</span>
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="hover:text-[#e8002d] transition-colors inline-flex items-center gap-1 cursor-pointer"
                title="Studio Lead Operations Terminal (Passcode Protected)"
              >
                <Terminal className="w-3 h-3 text-[#e8002d]" />
                <span>STUDIO TERMINAL</span>
              </button>
            )}
          </div>

          <button
            onClick={scrollToTop}
            className="btn-tactile inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-[#f7f3eb] hover:text-[#e8002d] border border-white/10 transition-all active:scale-[0.97]"
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
