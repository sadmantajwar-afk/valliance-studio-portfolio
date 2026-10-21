import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Terminal, Globe2, Sun, Moon } from 'lucide-react';
import { sound } from '../utils/audio';
import { LogoBadge } from './Logo';
import { useMarket, Market, MARKETS } from '../utils/geoPricing';
import { useTheme } from '../utils/theme';

interface NavbarProps {
  onOpenContact: () => void;
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { market, setMarket } = useMarket();
  const { theme, isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Lock body scroll & listen to Escape key when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setMobileMenuOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const navigateTo = (e: React.MouseEvent, href: string) => {
    sound.playClick(600);
    if (href.startsWith('#')) {
      e.preventDefault();
      document.body.style.overflow = 'unset';
      const lenis = (window as unknown as { __lenis?: { scrollTo: (target: string, opts?: { offset: number }) => void } }).__lenis;
      if (lenis) {
        lenis.scrollTo(href, { offset: -60 });
      } else {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    sound.playClick(900);
    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleToggleTheme = () => {
    sound.playClick(850);
    toggleTheme();
  };

  const toggleMarket = () => {
    sound.playClick(700);
    const nextMarket: Market = market === 'US' ? 'UK' : 'US';
    setMarket(nextMarket);
  };

  const navLinks = [
    { label: 'Demo Projects', href: '#work', number: '01' },
    { label: 'Process', href: '#process', number: '02' },
    { label: 'Pricing', href: '#pricing', number: '03' },
    { label: 'Contact', href: '#contact', number: '04' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'py-3 backdrop-blur-xl border-b shadow-lg'
            : 'py-6 bg-transparent'
        }`}
        style={
          isScrolled
            ? {
                backgroundColor: 'var(--theme-glass-bg)',
                borderColor: 'var(--theme-border)',
              }
            : {}
        }
      >
        <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Official Logo Lockup */}
            <a
              href="#"
              onClick={scrollToTop}
              className="group flex items-center gap-3 focus:outline-none min-h-[44px]"
              data-cursor="hover"
              aria-label="Valliance Studio — home"
            >
              <span className="block transition-transform duration-500 group-hover:rotate-[360deg]">
                <LogoBadge className="w-9 h-9 sm:w-10 sm:h-10 drop-shadow-[0_0_14px_rgba(243,38,75,0.35)]" />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display font-black text-[17px] tracking-[-0.02em] uppercase transition-colors group-hover:text-[#F3264B]" style={{ color: 'var(--theme-text-primary)' }}>
                  Valliance
                </span>
                <span className="font-mono text-[8.5px] tracking-[0.34em] uppercase mt-[3px]" style={{ color: 'var(--theme-text-muted)' }}>
                  Studio
                </span>
              </span>
            </a>

            {/* Desktop Center Navigation */}
            <nav
              className="hidden lg:flex items-center gap-1 glass-panel px-4 py-1.5 rounded-full border transition-colors"
              style={{
                backgroundColor: 'var(--theme-surface-elevated)',
                borderColor: 'var(--theme-border)',
              }}
            >
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => navigateTo(e, link.href)}
                  onMouseEnter={() => sound.playHover()}
                  className="px-3.5 py-1 text-xs font-mono uppercase tracking-wider rounded-full transition-all duration-200 hover:text-[#F3264B]"
                  style={{ color: 'var(--theme-text-secondary)' }}
                  data-cursor="hover"
                >
                  <span className="mr-1 text-[10px]" style={{ color: 'var(--theme-text-muted)' }}>{link.number}</span>
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Right Action Bar */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Theme Toggle Button: Sun for light mode, Moon for dark mode */}
              <button
                type="button"
                onClick={handleToggleTheme}
                className="btn-tactile min-w-[38px] min-h-[38px] flex items-center justify-center rounded-full border transition-all duration-200 hover:border-[#F3264B]/50"
                style={{
                  backgroundColor: 'var(--theme-surface-elevated)',
                  borderColor: 'var(--theme-border)',
                  color: 'var(--theme-text-primary)',
                }}
                title={isDark ? 'Dark Mode Active (Click to switch to Light Mode)' : 'Light Mode Active (Click to switch to Dark Mode)'}
                aria-label={isDark ? 'Dark Mode (Moon icon). Click to switch to Light Mode' : 'Light Mode (Sun icon). Click to switch to Dark Mode'}
              >
                {isDark ? (
                  <Moon className="w-4 h-4 text-[#F3264B] hover:-rotate-12 transition-transform" />
                ) : (
                  <Sun className="w-4 h-4 text-amber-500 hover:rotate-45 transition-transform" />
                )}
              </button>

              {/* Country & Currency Selector Switcher */}
              <button
                type="button"
                onClick={toggleMarket}
                className="btn-tactile inline-flex items-center gap-1.5 min-h-[38px] px-3 py-1.5 rounded-full border text-xs font-mono transition-all hover:border-[#F3264B]/40"
                style={{
                  backgroundColor: 'var(--theme-surface-elevated)',
                  borderColor: 'var(--theme-border)',
                  color: 'var(--theme-text-primary)',
                }}
                title={`Switch pricing region (currently ${MARKETS[market].countryName})`}
                aria-label={`Switch region from ${MARKETS[market].countryName}`}
              >
                <span className="text-sm">{MARKETS[market].flag}</span>
                <span className="font-bold text-[11px]">{MARKETS[market].currencyCode}</span>
                <span className="text-[10px]" style={{ color: 'var(--theme-text-muted)' }}>({MARKETS[market].currency})</span>
              </button>

              {/* Primary Inquire CTA */}
              <button
                onClick={() => {
                  sound.playClick(800);
                  onOpenContact();
                }}
                className="btn-tactile hidden sm:inline-flex items-center gap-2 min-h-[40px] px-4 py-2 bg-[#F3264B] hover:bg-[#FF2A44] text-white font-mono font-bold text-xs uppercase tracking-wider rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(243,38,75,0.4)] active:scale-[0.97]"
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
                className="btn-tactile lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full border transition-colors active:scale-[0.97]"
                style={{
                  backgroundColor: 'var(--theme-surface-elevated)',
                  borderColor: 'var(--theme-border)',
                  color: 'var(--theme-text-primary)',
                }}
                aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
                aria-expanded={mobileMenuOpen}
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
        className={`fixed inset-0 z-40 backdrop-blur-2xl flex flex-col justify-between p-6 pt-24 pb-[calc(1.5rem+env(safe-area-inset-bottom))] lg:hidden transition-all duration-300 ease-out overflow-y-auto ${
          mobileMenuOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
        style={{
          backgroundColor: isDark ? 'rgba(8, 9, 11, 0.98)' : 'rgba(245, 243, 237, 0.98)',
          color: 'var(--theme-text-primary)',
        }}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b text-xs font-mono" style={{ borderColor: 'var(--theme-border)', color: 'var(--theme-text-muted)' }}>
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#F3264B]" />
              <span>NAVIGATION MATRIX</span>
            </div>

            <div className="flex items-center gap-2">
              {/* Mobile Theme Toggle */}
              <button
                onClick={handleToggleTheme}
                className="p-1.5 rounded-full border flex items-center justify-center"
                style={{
                  backgroundColor: 'var(--theme-surface-elevated)',
                  borderColor: 'var(--theme-border)',
                }}
                aria-label="Toggle Theme"
              >
                {isDark ? (
                  <Moon className="w-3.5 h-3.5 text-[#F3264B]" />
                ) : (
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                )}
              </button>

              {/* Mobile Market Selector */}
              <button
                onClick={toggleMarket}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border"
                style={{
                  backgroundColor: 'var(--theme-surface-elevated)',
                  borderColor: 'var(--theme-border)',
                  color: 'var(--theme-text-primary)',
                }}
              >
                <span>{MARKETS[market].flag}</span>
                <span className="font-bold">{MARKETS[market].currencyCode}</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            {navLinks.map((link, idx) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  document.body.style.overflow = 'unset';
                  setMobileMenuOpen(false);
                  navigateTo(e, link.href);
                }}
                className="flex items-center justify-between min-h-[48px] py-2.5 border-b hover:text-[#F3264B] transition-colors"
                style={{
                  borderColor: 'var(--theme-border)',
                  color: 'var(--theme-text-primary)',
                }}
              >
                <span className="font-display text-2xl font-bold tracking-tight">
                  {link.label}
                </span>
                <span className="font-mono text-xs" style={{ color: 'var(--theme-text-muted)' }}>0{idx + 1}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-4 pt-6 border-t" style={{ borderColor: 'var(--theme-border)' }}>
          <div className="flex items-center justify-between text-xs font-mono" style={{ color: 'var(--theme-text-secondary)' }}>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F3264B] animate-pulse" />
              STUDIO ARCHIVE
            </span>
            <span className="text-[#F3264B]">OPEN FOR NEW BUILDS</span>
          </div>

          <button
            onClick={() => {
              sound.playClick(800);
              document.body.style.overflow = 'unset';
              setMobileMenuOpen(false);
              onOpenContact();
            }}
            className="btn-tactile w-full min-h-[48px] flex items-center justify-center gap-2 py-3.5 bg-[#F3264B] text-white font-mono font-bold text-sm tracking-wider uppercase rounded-xl hover:bg-[#FF2A44] transition-colors active:scale-[0.97]"
          >
            <span>START A PROJECT</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
};
