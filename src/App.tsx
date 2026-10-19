import { useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { SelectedWork } from './components/SelectedWork';
import { ServicesSection } from './components/ServicesSection';
import { Philosophy } from './components/Philosophy';
import { ProcessSection } from './components/ProcessSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export function App() {
  useEffect(() => {
    // On mobile / touch devices, bypass Lenis and its RAF loop.
    // iOS and Android provide native 120Hz ProMotion inertial scrolling out of the box.
    const isMobileOrTouch =
      typeof window !== 'undefined' &&
      (window.matchMedia('(hover: none) and (pointer: coarse)').matches ||
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.innerWidth < 1024);

    if (isMobileOrTouch) {
      (window as unknown as { __lenis: unknown }).__lenis = null;
      return;
    }

    let lenisInstance: { raf: (time: number) => void; destroy: () => void } | null = null;
    let rafId: number;

    // Dynamically load Lenis only for desktop users with a mouse pointer
    Promise.all([
      import('lenis'),
      import('lenis/dist/lenis.css'),
    ]).then(([{ default: Lenis }]) => {
      const lenis = new Lenis({
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.95,
        touchMultiplier: 0,
        syncTouch: false,
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

      function raf(time: number) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);
    });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (lenisInstance) lenisInstance.destroy();
      (window as unknown as { __lenis: unknown }).__lenis = null;
    };
  }, []);

  const scrollToContact = () => {
    const performScroll = () => {
      const lenis = (window as unknown as { __lenis?: { scrollTo: (target: string, opts?: { offset: number; duration: number }) => void } }).__lenis;
      if (lenis) {
        lenis.scrollTo('#contact', { offset: -40, duration: 1.2 });
      } else {
        const el = document.getElementById('contact');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    };

    if (document.getElementById('contact')) {
      performScroll();
    } else {
      setTimeout(performScroll, 100);
    }
  };

  const scrollToWork = () => {
    const performScroll = () => {
      const lenis = (window as unknown as { __lenis?: { scrollTo: (target: string, opts?: { offset: number; duration: number }) => void } }).__lenis;
      if (lenis) {
        lenis.scrollTo('#work', { offset: -40, duration: 1.2 });
      } else {
        const el = document.getElementById('work');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    };

    if (document.getElementById('work')) {
      performScroll();
    } else {
      setTimeout(performScroll, 100);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0b0908] text-[#f7f3eb] overflow-x-hidden selection:bg-[#e8002d] selection:text-[#fff6ec]">
      {/* Global Navigation Header */}
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

        {/* 04. High-Contrast Editorial Services Section */}
        <ServicesSection onOpenContact={scrollToContact} />

        {/* 06. Agency Philosophy & Manifesto */}
        <Philosophy onOpenContact={scrollToContact} />

        {/* 08. Systematic Process Timeline */}
        <ProcessSection onOpenContact={scrollToContact} />

        {/* 09. Contact & Project Estimator */}
        <ContactSection />

        {/* Global Footer */}
        <Footer />
      </main>
    </div>
  );
}

export default App;
