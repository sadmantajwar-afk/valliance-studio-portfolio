import React from 'react';
import { ArrowUp } from 'lucide-react';
import { sound } from '../utils/audio';
import { LogoLockup } from './Logo';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    sound.playClick(600);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#060505] text-[#f7f3eb] border-t border-white/10 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Top Split */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start pb-12 border-b border-white/10">
          <div className="md:col-span-6 space-y-5">
            <LogoLockup />
            <p className="text-sm text-[#8e8b82] max-w-sm font-light leading-relaxed">
              Engineering category-defining digital flagships, autonomous conversational agents, and friction-free operational systems for visionary enterprises worldwide.
            </p>
          </div>

          <div className="md:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs font-mono">
            {/* Quick Links */}
            <div className="space-y-3">
              <span className="text-[#e8002d] uppercase tracking-wider block">
                INDEX
              </span>
              <ul className="space-y-2 text-[#cfc8ba]">
                <li><a href="#work" className="hover:text-[#f7f3eb] transition-colors">01 Work</a></li>
                <li><a href="#services" className="hover:text-[#f7f3eb] transition-colors">02 Capabilities</a></li>
                <li><a href="#philosophy" className="hover:text-[#f7f3eb] transition-colors">03 Manifesto</a></li>
                <li><a href="#process" className="hover:text-[#f7f3eb] transition-colors">04 Process</a></li>
              </ul>
            </div>

            {/* Social Channels */}
            <div className="space-y-3">
              <span className="text-[#e8002d] uppercase tracking-wider block">
                CHANNELS
              </span>
              <ul className="space-y-2 text-[#cfc8ba]">
                <li><a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#f7f3eb] transition-colors">X / Twitter ↗</a></li>
                <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#f7f3eb] transition-colors">GitHub Labs ↗</a></li>
                <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#f7f3eb] transition-colors">LinkedIn ↗</a></li>
                <li><a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#f7f3eb] transition-colors">Dribbble ↗</a></li>
                <li><a href="https://read.cv" target="_blank" rel="noopener noreferrer" className="hover:text-[#f7f3eb] transition-colors">Read.cv ↗</a></li>
              </ul>
            </div>

            {/* Status & Availability */}
            <div className="space-y-3">
              <span className="text-[#e8002d] uppercase tracking-wider block">
                STATUS
              </span>
              <ul className="space-y-2 text-[#8e8b82]">
                <li>Global &amp; Remote</li>
                <li className="text-[#e8002d]">Open for New Projects</li>
                <li>Production Ready</li>
              </ul>
            </div>
          </div>
        </div>


        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-white/10 text-xs font-mono text-[#8a8172]">
          <div className="flex items-center gap-4">
            <span>© 2026 VALLIANCE STUDIO LTD. ALL RIGHTS RESERVED.</span>
            <span>·</span>
            <span className="hidden sm:inline">BUILT WITH INTENT &amp; CODE</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-[#f7f3eb] hover:text-[#e8002d] border border-white/10 transition-all"
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
