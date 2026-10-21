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
    // Only bypass Lenis on actual small-screen mobile phones (< 768px with coarse touch pointer).
    // On all PCs, laptops (including touchscreen laptops and Surface devices), and desktops,
    // Lenis provides continuous, ultra-smooth momentum scrolling.
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
        lerp: 0.09, // Silky smooth physics damping for continuous fluid glide on PC mice and trackpads
        wheelMultiplier: 1.0,
        touchMultiplier: 1.2,
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
    document.body.style.overflow = 'unset';
    const performScroll = () => {
      const lenis = (window as unknown as { __lenis?: { scrollTo: (target: string, opts?: { offset: number }) => void } }).__lenis;
      if (lenis) {
        lenis.scrollTo('#contact', { offset: -40 });
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
    document.body.style.overflow = 'unset';
    const performScroll = () => {
      const lenis = (window as unknown as { __lenis?: { scrollTo: (target: string, opts?: { offset: number }) => void } }).__lenis;
      if (lenis) {
        lenis.scrollTo('#work', { offset: -40 });
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
