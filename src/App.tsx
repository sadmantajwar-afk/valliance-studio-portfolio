import { useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { SelectedWork } from './components/SelectedWork';
import { ProcessSection } from './components/ProcessSection';
import { PricingSection } from './components/PricingSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CookieConsent } from './components/CookieConsent';
import { initMetaPixel, trackMetaEvent } from './utils/metaPixel';

export function App() {
  useEffect(() => {
    // Initialize Meta Pixel tracking safely on mount
    initMetaPixel();

    // Only bypass Lenis on actual small-screen mobile phones (< 768px with coarse touch pointer).
    // On all PCs, laptops, and desktops, Lenis provides continuous momentum scrolling.
    const isMobilePhone =
      typeof window !== 'undefined' &&
      window.innerWidth < 768 &&
      (/Android|iPhone|iPod/i.test(navigator.userAgent) ||
        window.matchMedia('(hover: none) and (pointer: coarse)').matches);

    if (isMobilePhone) {
      (window as unknown as { __lenis: unknown }).__lenis = null;
      return;
    }

    let lenisInstance: { destroy: () => void } | null = null;

    // Dynamically load Lenis for desktop and laptop PC users
    Promise.all([
      import('lenis'),
      import('lenis/dist/lenis.css'),
    ]).then(([{ default: Lenis }]) => {
      const lenis = new Lenis({
        autoRaf: true,
        lerp: 0.14, // Responsive, high-performance glide without lag
        wheelMultiplier: 1.0,
        touchMultiplier: 1.0,
        smoothWheel: true,
        syncTouch: false,
        autoResize: true,
        anchors: {
          offset: -60,
        },
        prevent: (node: unknown) => {
          return Boolean(
            node instanceof HTMLElement &&
              (node.closest('.modal-scroll-container') ||
                node.closest('[data-lenis-prevent]'))
          );
        },
      });

      lenisInstance = lenis;
      (window as unknown as { __lenis: unknown }).__lenis = lenis;
    });

    return () => {
      if (lenisInstance) lenisInstance.destroy();
      (window as unknown as { __lenis: unknown }).__lenis = null;
    };
  }, []);

  const scrollToContact = () => {
    trackMetaEvent('Contact', { content_name: 'Initiate Contact CTA' });
    document.body.style.overflow = 'unset';
    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: string, opts?: { offset: number; duration?: number }) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo('#contact', { offset: -40, duration: 0.5 });
    } else {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToWork = () => {
    document.body.style.overflow = 'unset';
    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: string, opts?: { offset: number; duration?: number }) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo('#work', { offset: -40, duration: 0.5 });
    } else {
      const el = document.getElementById('work');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className="relative min-h-screen overflow-x-hidden selection:bg-[#F3264B] selection:text-[#FFFFFF] transition-colors duration-200"
      style={{
        backgroundColor: 'var(--theme-bg)',
        color: 'var(--theme-text-primary)',
      }}
    >
      {/* Global Navigation Header with Theme Toggle & Market Switcher */}
      <Navbar onOpenContact={scrollToContact} />

      {/* Main Content Flow */}
      <main>
        {/* 01. Hero Section — Rendered immediately on first frame */}
        <Hero
          onOpenContact={scrollToContact}
          onExploreWork={scrollToWork}
        />

        {/* 02. Kinetic Typography Marquee */}
        <Marquee />

        {/* 03. Selected Work Editorial Showcase */}
        <SelectedWork onOpenContact={scrollToContact} />

        {/* 04. Systematic Process Timeline */}
        <ProcessSection onOpenContact={scrollToContact} />

        {/* 05. US & UK Regional Pricing & Commercial Architecture */}
        <PricingSection onOpenContact={scrollToContact} />

        {/* 06. Smart Multi-Step Project Inquiry Form */}
        <ContactSection />

        {/* Global Footer */}
        <Footer />
      </main>

      {/* UK GDPR / PECR Cookie & Analytics Consent Notice */}
      <CookieConsent />
    </div>
  );
}

export default App;
