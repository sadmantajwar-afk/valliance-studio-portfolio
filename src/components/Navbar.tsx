import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Terminal } from 'lucide-react';
import { sound } from '../utils/audio';
import { LogoBadge } from './Logo';

interface NavbarProps {
  onOpenContact: () => void;
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navigateTo = (e: React.MouseEvent, href: string) => {
    sound.playClick(600);
    if (href.startsWith('#')) {
      e.preventDefault();
      const lenis = (window as unknown as { __lenis?: { scrollTo: (target: string, opts?: { offset: number; duration: number }) => void } }).__lenis;
      if (lenis) {
        lenis.scrollTo(href, { offset: -60, duration: 1.2 });
      } else {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    sound.playClick(900);
    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number, opts?: { duration: number }) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: 'Work', href: '#work', number: '01' },
    { label: 'Services', href: '#services', number: '02' },
    { label: 'Philosophy', href: '#philosophy', number: '03' },
    { label: 'Process', href: '#process', number: '04' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'py-3 bg-[#0b0908]/80 backdrop-blur-xl border-b border-white/8 shadow-2xl shadow-black/80'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Official Logo Lockup — crimson V on cream disc + brand wordmark */}
            <a
              href="#"
              onClick={scrollToTop}
              className="group flex items-center gap-3 focus:outline-none"
              data-cursor="hover"
              aria-label="Valliance Studio — home"
            >
              <span className="block transition-transform duration-500 group-hover:rotate-[360deg]">
                <LogoBadge className="w-9 h-9 sm:w-10 sm:h-10 drop-shadow-[0_0_14px_rgba(232,0,45,0.35)]" />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display font-black text-[17px] tracking-[-0.02em] uppercase text-[#f7f3eb] group-hover:text-[#ff2a44] transition-colors">
                  Valliance
                </span>
                <span className="font-mono text-[8.5px] tracking-[0.34em] text-[#a79e8f] uppercase mt-[3px]">
                  Studio
                </span>
              </span>
            </a>

            {/* Desktop Center Navigation */}
            <nav className="hidden lg:flex items-center gap-1 glass-panel px-4 py-1.5 rounded-full border border-white/10">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => navigateTo(e, link.href)}
                  onMouseEnter={() => sound.playHover()}
                  className="px-3.5 py-1 text-xs font-mono uppercase tracking-wider text-[#cfc8ba] hover:text-[#e8002d] hover:bg-white/5 rounded-full transition-all duration-200"
                  data-cursor="hover"
                >
                  <span className="text-[#8a8172] mr-1 text-[10px]">{link.number}</span>
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Right Action Bar */}
            <div className="flex items-center gap-3">

              {/* Primary Inquire CTA */}
              <button
                onClick={() => {
                  sound.playClick(800);
                  onOpenContact();
                }}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-[#e8002d] hover:bg-[#ff2a44] text-[#fff6ec] font-mono font-bold text-xs uppercase tracking-wider rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(232,0,45,0.4)] hover:scale-[1.02]"
                data-cursor="hover"
              >
                <span>LET’S TALK</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => {
                  sound.playClick(500);
                  setMobileMenuOpen(!mobileMenuOpen);
                }}
                className="lg:hidden p-2 rounded-full bg-white/5 border border-white/10 text-[#f7f3eb]"
                aria-label="Open Mobile Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Navigation Drawer */}
      <div
        aria-hidden={!mobileMenuOpen}
        className={`fixed inset-0 z-40 bg-[#0b0908]/95 backdrop-blur-2xl flex flex-col justify-between p-6 pt-24 lg:hidden transition-all duration-300 ease-out ${
          mobileMenuOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-white/10 text-xs font-mono text-[#8a8172]">
            <Terminal className="w-4 h-4 text-[#e8002d]" />
            <span>NAVIGATION MATRIX // VALLIANCE STUDIO</span>
          </div>

          <div className="flex flex-col space-y-3">
            {navLinks.map((link, idx) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  navigateTo(e, link.href);
                }}
                className="flex items-baseline justify-between py-2 border-b border-white/5 text-[#f7f3eb] hover:text-[#e8002d] transition-colors"
              >
                <span className="font-display text-2xl font-bold tracking-tight">
                  {link.label}
                </span>
                <span className="font-mono text-xs text-[#8a8172]">0{idx + 1}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-4 pt-6 border-t border-white/10">
          <div className="flex items-center justify-between text-xs font-mono text-[#cfc8ba]">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#e8002d] animate-pulse" />
              STUDIO ARCHIVE
            </span>
            <span className="text-[#e8002d]">ACCEPTING PROJECTS</span>
          </div>

          <button
            onClick={() => {
              sound.playClick(800);
              setMobileMenuOpen(false);
              onOpenContact();
            }}
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#e8002d] text-[#fff6ec] font-mono font-bold text-sm tracking-wider uppercase rounded-xl"
          >
            <span>START A PROJECT</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
};
