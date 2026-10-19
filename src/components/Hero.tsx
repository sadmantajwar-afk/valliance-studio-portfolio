import React, { useEffect, useRef } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { sound } from '../utils/audio';
import { LogoMark } from './Logo';

interface HeroProps {
  onOpenContact: () => void;
  onExploreWork: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenContact, onExploreWork }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

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
          if (y < 450 && heroContent) {
            const op = Math.max(0.2, 1 - y / 400);
            const sc = Math.max(0.95, 1 - (y / 400) * 0.05);
            heroContent.style.opacity = String(op);
            heroContent.style.transform = `scale(${sc})`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Interactive Particle Canvas in Hero — desktop only to maximize mobile FPS & battery
  useEffect(() => {
    const isMobile = typeof window !== 'undefined' && (window.innerWidth < 768 || window.matchMedia('(hover: none) and (pointer: coarse)').matches);
    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    const particleCount = Math.min(Math.floor((width * height) / 22000), 50);
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseAlpha: number;
    }[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 0.8,
        baseAlpha: Math.random() * 0.4 + 0.2,
      });
    }

    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;

      // Update watermark without triggering full React component re-renders (runs at native 120fps)
      if (watermarkRef.current) {
        const offX = (e.clientX / window.innerWidth - 0.5) * -12;
        const offY = (e.clientY / window.innerHeight - 0.5) * -12;
        watermarkRef.current.style.transform = `translateY(-50%) translate3d(${offX}px, ${offY}px, 0)`;
      }
    };

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    // Pause rendering when hero is scrolled out of view to preserve 100% GPU
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

      // Draw subtle connections
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        // Mouse repulsion / attraction
        const dx = mouseX - p1.x;
        const dy = mouseY - p1.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          p1.x -= (dx / dist) * 0.4;
          p1.y -= (dy / dist) * 0.4;
        }

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 0, 45, ${p1.baseAlpha})`;
        ctx.fill();

        // Connect to neighbors
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distNodes = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (distNodes < 140) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(232, 0, 45, ${0.12 * (1 - distNodes / 140)})`;
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
      className="relative min-h-[100svh] flex flex-col justify-between pt-28 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#0b0908]"
    >
      {/* Background Interactive Canvas — desktop only */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0 opacity-80 hidden md:block"
      />

      {/* Atmospheric Radial Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#e8002d]/8 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-gradient-to-bl from-white/3 to-transparent rounded-full blur-[120px] pointer-events-none" />

      {/* Grid overlay lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Giant brand V watermark — hardware accelerated with direct DOM transform */}
      <div
        ref={watermarkRef}
        aria-hidden="true"
        className="absolute -right-24 top-1/2 -translate-y-1/2 pointer-events-none z-0 opacity-[0.055] hidden md:block will-change-transform"
        style={{ transform: 'translateY(-50%) translate3d(0, 0, 0)' }}
      >
        <LogoMark className="w-[620px] h-auto" color="#E8002D" />
      </div>

      <div
        ref={heroContentRef}
        className="relative z-10 max-w-7xl mx-auto w-full my-auto py-8 will-change-transform"
      >
        {/* Studio Status Bar */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#e8002d]"></span>
            </span>
            <span className="font-mono text-xs font-semibold tracking-wider text-[#e8002d] uppercase">
              DESIGN × TECHNOLOGY × AI
            </span>
          </div>
        </div>

        {/* Monumental Hero Typography & CTAs */}
        <div className="max-w-4xl space-y-8">
          <div>
            <h1 className="font-display font-extrabold text-5xl sm:text-7xl lg:text-[5.8rem] xl:text-[6.8rem] tracking-tight leading-[0.92] text-[#f7f3eb] uppercase">
              WE BUILD <br />
              <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#e8002d] via-[#f7f3eb] to-[#e8e2d6]">
                WHAT’S NEXT.
              </span>
            </h1>
          </div>

          {/* Supporting Headline */}
          <div className="space-y-4 max-w-2xl">
            <p className="font-space text-xl sm:text-2xl text-[#f7f3eb] font-medium leading-relaxed tracking-tight">
              “Exceptional digital experiences. Intelligent AI. Business without the busywork.”
            </p>
            <p className="text-sm sm:text-base text-[#cfc8ba] font-sans font-light leading-relaxed max-w-xl">
              Valliance Studio is an independent creative and AI engineering studio. We architect category-defining brand websites, high-velocity e-commerce flagships, autonomous AI agents, and enterprise automation pipelines for visionary leaders.
            </p>
          </div>

          {/* Interactive CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => {
                sound.playChime();
                onOpenContact();
              }}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[#e8002d] hover:bg-[#ff2a44] text-[#fff6ec] font-mono font-bold text-xs sm:text-sm uppercase tracking-widest rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(232,0,45,0.5)] hover:scale-[1.02]"
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
              className="inline-flex items-center gap-2 px-6 py-4 glass-panel hover:bg-white/10 text-[#f7f3eb] hover:text-[#e8002d] font-mono text-xs sm:text-sm uppercase tracking-wider rounded-full transition-all duration-300 border border-white/15"
              data-cursor="hover"
            >
              <span>EXPLORE OUR WORK</span>
              <span className="text-lg leading-none">↘</span>
            </button>
          </div>
        </div>

        {/* Micro Stats Matrix on Bottom Hero */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 mt-8 border-t border-white/10">
          <div className="space-y-1">
            <span className="font-display text-2xl sm:text-3xl font-bold text-[#e8002d]">04</span>
            <p className="font-mono text-xs text-[#8a8172] uppercase tracking-wider">Live Web Flagships</p>
          </div>
          <div className="space-y-1">
            <span className="font-display text-2xl sm:text-3xl font-bold text-[#f7f3eb]">Full-Stack</span>
            <p className="font-mono text-xs text-[#8a8172] uppercase tracking-wider">Design &amp; Engineering</p>
          </div>
          <div className="space-y-1">
            <span className="font-display text-2xl sm:text-3xl font-bold text-[#e8002d]">Custom</span>
            <p className="font-mono text-xs text-[#8a8172] uppercase tracking-wider">Tailored UI Systems</p>
          </div>
          <div className="space-y-1">
            <span className="font-display text-2xl sm:text-3xl font-bold text-[#f7f3eb]">Next.js</span>
            <p className="font-mono text-xs text-[#8a8172] uppercase tracking-wider">Modern Production Stack</p>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between text-xs font-mono text-[#8a8172] pt-4">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#e8002d]" />
          <span>SCROLL TO DISCOVER</span>
        </div>
        <a
          href="#work"
          onClick={() => sound.playClick(400)}
          className="flex items-center gap-2 hover:text-[#e8002d] transition-colors"
        >
          <span>INDEX 01 / 04</span>
          <ArrowDown className="w-3.5 h-3.5" />
        </a>
      </div>
    </section>
  );
};
