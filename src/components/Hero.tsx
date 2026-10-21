import React, { useEffect, useRef } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { sound } from '../utils/audio';
import { LogoMark } from './Logo';
import { useTheme } from '../utils/theme';

interface HeroProps {
  onOpenContact: () => void;
  onExploreWork: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenContact, onExploreWork }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const { isDark } = useTheme();

  // Desktop-only smooth inertial scroll fade via hardware transform
  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth < 1024) return;
    const heroContent = heroContentRef.current;
    if (!heroContent) return;

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY;
          if (heroContent) {
            if (y < 450) {
              const op = Math.max(0.2, 1 - y / 400);
              const sc = Math.max(0.95, 1 - (y / 400) * 0.05);
              heroContent.style.opacity = String(op);
              heroContent.style.transform = `scale(${sc})`;
            } else {
              heroContent.style.opacity = '0.2';
              heroContent.style.transform = 'scale(0.95)';
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Interactive Particle Canvas in Hero — desktop only
  useEffect(() => {
    const isMobile = typeof window !== 'undefined' && (window.innerWidth < 768 || window.matchMedia('(hover: none) and (pointer: coarse)').matches);
    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const particleCount = Math.min(48, Math.floor(width / 32));
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 1.5 + 1.2,
      baseAlpha: Math.random() * 0.25 + 0.15,
    }));

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (watermarkRef.current) {
        const offX = (e.clientX / window.innerWidth - 0.5) * -12;
        const offY = (e.clientY / window.innerHeight - 0.5) * -12;
        watermarkRef.current.style.transform = `translateY(-50%) translate3d(${offX}px, ${offY}px, 0)`;
      }
    };

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animationFrameId) {
          animationFrameId = requestAnimationFrame(render);
        }
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const render = () => {
      if (!isVisible) {
        animationFrameId = 0;
        return;
      }

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        const dx = mouseX - p1.x;
        const dy = mouseY - p1.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          p1.x -= (dx / dist) * 0.4;
          p1.y -= (dy / dist) * 0.4;
        }

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(243, 38, 75, ${p1.baseAlpha})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distNodes = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (distNodes < 140) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(243, 38, 75, ${0.14 * (1 - distNodes / 140)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] flex flex-col justify-between pt-28 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-200"
      style={{
        backgroundColor: 'var(--theme-bg)',
        color: 'var(--theme-text-primary)',
      }}
    >
      {/* Background Interactive Canvas — desktop only */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0 opacity-80 hidden md:block"
      />

      {/* Atmospheric Radial Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#F3264B]/8 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div
        className="absolute bottom-10 right-10 w-[450px] h-[450px] rounded-full blur-[120px] pointer-events-none"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(8,9,11,0.03) 0%, transparent 70%)',
        }}
      />

      {/* Grid overlay lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, var(--theme-grid-lines) 1px, transparent 1px), linear-gradient(to bottom, var(--theme-grid-lines) 1px, transparent 1px)`,
          backgroundSize: '4rem 4rem',
        }}
      />

      {/* Giant brand V watermark */}
      <div
        ref={watermarkRef}
        aria-hidden="true"
        className="absolute -right-24 top-1/2 -translate-y-1/2 pointer-events-none z-0 opacity-[0.055] hidden md:block will-change-transform"
        style={{ transform: 'translateY(-50%) translate3d(0, 0, 0)' }}
      >
        <LogoMark className="w-[620px] h-auto" color="#F3264B" />
      </div>

      <div
        ref={heroContentRef}
        className="relative z-10 max-w-7xl 2xl:max-w-[1536px] mx-auto w-full my-auto py-6 sm:py-8 will-change-transform"
      >
        {/* Studio Status Bar */}
        <div className="flex flex-wrap items-center gap-3 mb-6 sm:mb-8">
          <div
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border backdrop-blur-md"
            style={{
              backgroundColor: 'var(--theme-surface-elevated)',
              borderColor: 'var(--theme-border)',
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F3264B]"></span>
            </span>
            <span className="font-mono text-xs font-semibold tracking-wider text-[#F3264B] uppercase">
              DESIGN × TECHNOLOGY × AI
            </span>
          </div>
        </div>

        {/* Monumental Hero Typography & CTAs */}
        <div className="max-w-4xl space-y-6 sm:space-y-8">
          <div>
            <h1
              className="font-display font-extrabold text-[clamp(2.35rem,8.5vw,6.5rem)] tracking-tight leading-[0.92] uppercase break-words"
              style={{ color: 'var(--theme-text-primary)' }}
            >
              WE BUILD <br />
              <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#F3264B] via-[#FF2A44] to-[#8A8172]">
                WHAT’S NEXT.
              </span>
            </h1>
          </div>

          {/* Supporting Headline */}
          <div className="space-y-3 sm:space-y-4 max-w-2xl">
            <p className="font-space text-lg sm:text-2xl font-medium leading-relaxed tracking-tight" style={{ color: 'var(--theme-text-primary)' }}>
              “Exceptional digital experiences. Intelligent AI. Business without the busywork.”
            </p>
            <p className="text-sm sm:text-base font-sans font-light leading-relaxed max-w-xl" style={{ color: 'var(--theme-text-secondary)' }}>
              Valliance Studio is an independent creative and AI engineering studio. We architect category-defining brand websites, high-velocity e-commerce flagships, autonomous AI agents, and enterprise automation pipelines for visionary leaders.
            </p>
          </div>

          {/* Interactive CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
            <button
              onClick={() => {
                sound.playChime();
                onOpenContact();
              }}
              className="btn-tactile group relative inline-flex items-center justify-center gap-3 min-h-[48px] px-8 py-4 bg-[#E01A40] hover:bg-[#FF2A44] text-white font-mono font-bold text-xs sm:text-sm uppercase tracking-widest rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(224,26,64,0.5)] active:scale-[0.97] w-full sm:w-auto"
              data-cursor="hover"
            >
              <span>LET’S BUILD SOMETHING</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>

            <button
              onClick={() => {
                sound.playClick(600);
                onExploreWork();
              }}
              className="btn-tactile inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-4 rounded-full transition-all duration-300 border font-mono text-xs sm:text-sm uppercase tracking-wider active:scale-[0.97] w-full sm:w-auto hover:border-[#E01A40] hover:bg-[#E01A40]/10 hover:shadow-[0_0_20px_rgba(224,26,64,0.25)] hover:-translate-y-0.5"
              style={{
                backgroundColor: 'var(--theme-surface-elevated)',
                borderColor: 'var(--theme-border)',
              }}
              data-cursor="hover"
            >
              <span className="text-[var(--theme-text-primary)] hover:text-[#E01A40] transition-colors">EXPLORE DEMO PROJECTS</span>
              <span className="text-lg leading-none text-[#E01A40]">↘</span>
            </button>
          </div>
        </div>

        {/* Micro Stats Matrix on Bottom Hero */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 sm:pt-12 mt-8 border-t" style={{ borderColor: 'var(--theme-border)' }}>
          <div className="space-y-1">
            <span className="font-display text-2xl sm:text-3xl font-bold text-[#E01A40]">04</span>
            <p className="font-mono text-xs uppercase tracking-wider" style={{ color: 'var(--theme-text-muted)' }}>Live Web Flagships</p>
          </div>
          <div className="space-y-1">
            <span className="font-display text-2xl sm:text-3xl font-bold" style={{ color: 'var(--theme-text-primary)' }}>Full-Stack</span>
            <p className="font-mono text-xs uppercase tracking-wider" style={{ color: 'var(--theme-text-muted)' }}>Design &amp; Engineering</p>
          </div>
          <div className="space-y-1">
            <span className="font-display text-2xl sm:text-3xl font-bold text-[#E01A40]">Custom</span>
            <p className="font-mono text-xs uppercase tracking-wider" style={{ color: 'var(--theme-text-muted)' }}>Tailored UI Systems</p>
          </div>
          <div className="space-y-1">
            <span className="font-display text-2xl sm:text-3xl font-bold" style={{ color: 'var(--theme-text-primary)' }}>Next.js</span>
            <p className="font-mono text-xs uppercase tracking-wider" style={{ color: 'var(--theme-text-muted)' }}>Modern Production Stack</p>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="relative z-10 max-w-7xl 2xl:max-w-[1536px] mx-auto w-full flex items-center justify-between text-xs font-mono pt-4" style={{ color: 'var(--theme-text-muted)' }}>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E01A40]" />
          <span>SCROLL TO DISCOVER</span>
        </div>
        <a
          href="#work"
          onClick={() => sound.playClick(400)}
          className="btn-tactile min-h-[44px] px-3.5 py-2 rounded-full border border-transparent hover:border-[#E01A40]/40 hover:bg-[#E01A40]/10 flex items-center gap-2 hover:text-[#E01A40] transition-all active:scale-[0.97]"
        >
          <span>INDEX 01 / 04</span>
          <ArrowDown className="w-3.5 h-3.5 text-[#E01A40]" />
        </a>
      </div>
    </section>
  );
};
