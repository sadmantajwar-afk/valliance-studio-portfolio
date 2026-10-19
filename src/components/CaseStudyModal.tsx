import React, { useEffect, useRef } from 'react';
import { X, ArrowUpRight, CheckCircle2, Cpu, Sparkles, ShieldCheck } from 'lucide-react';
import { Project } from '../data/projects';
import { sound } from '../utils/audio';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenContact: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose, onOpenContact }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  // Isolate wheel and touch events within the modal so Lenis or window listeners cannot cancel them
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !project) return;

    const stopScrollEvents = (e: Event) => {
      e.stopPropagation();
    };

    container.addEventListener('wheel', stopScrollEvents, { passive: true, capture: true });
    container.addEventListener('touchmove', stopScrollEvents, { passive: true, capture: true });
    return () => {
      container.removeEventListener('wheel', stopScrollEvents, { capture: true });
      container.removeEventListener('touchmove', stopScrollEvents, { capture: true });
    };
  }, [project]);

  if (!project) return null;

  return (
    <div
      ref={scrollContainerRef}
      className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden bg-black/90 backdrop-blur-2xl modal-scroll-container overscroll-contain"
      style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-y' }}
      data-lenis-prevent
      data-lenis-prevent-wheel
      data-lenis-prevent-touch
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
    >
      {/* Centering wrapper allowing natural, unrestricted vertical scrolling on mobile & desktop */}
      <div
        className="min-h-screen w-full flex justify-center p-2.5 sm:p-6 lg:p-8 py-6 sm:py-16"
        onClick={() => {
          sound.playClick(400);
          onClose();
        }}
      >
        <div
          className="relative w-full max-w-5xl bg-[#0c0c10] border border-white/15 rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 lg:p-10 text-[#f7f3eb] h-fit cursor-default animate-modal-enter"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs px-2.5 py-1 rounded bg-[#e8002d] text-[#fff6ec] font-bold">
                {project.isStudioConcept ? 'CONCEPT' : 'PROJECT'} {project.number}
              </span>
              <span className="font-mono text-xs text-[#8a8172] uppercase tracking-wider">
                {project.category} · {project.year}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {project.livePreviewUrl && (
                <a
                  href={project.livePreviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick(600)}
                  className="btn-tactile hidden sm:inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-mono font-bold text-[#f7f3eb] uppercase tracking-wider border border-white/20 transition-all group/toplink active:scale-[0.97]"
                >
                  <span>LAUNCH LIVE SITE</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#e8002d] transition-transform group-hover/toplink:translate-x-0.5 group-hover/toplink:-translate-y-0.5" />
                </a>
              )}
              <button
                onClick={() => {
                  sound.playClick(400);
                  onClose();
                }}
                className="btn-tactile min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-white/5 hover:bg-white/15 text-[#f7f3eb] transition-colors border border-white/10 active:scale-[0.97]"
                aria-label="Close Case Study"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Hero Banner inside modal */}
          <div className="py-6 sm:py-8 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#f7f3eb] uppercase break-words">
                {project.title}
              </h2>
              {project.livePreviewUrl && (
                <a
                  href={project.livePreviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick(600)}
                  className="sm:hidden inline-flex items-center gap-2 px-4 py-2 w-fit rounded-full bg-white/10 hover:bg-white/20 text-xs font-mono font-bold text-[#f7f3eb] uppercase tracking-wider border border-white/20"
                >
                  <span>LAUNCH LIVE SITE</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#e8002d]" />
                </a>
              )}
            </div>
            <p className="font-space text-lg sm:text-2xl text-[#e8002d] font-medium leading-relaxed">
              {project.tagline}
            </p>
            <p className="text-sm sm:text-base text-[#cfc8ba] leading-relaxed max-w-3xl font-light">
              {project.overview}
            </p>
          </div>

          {/* Featured Imagery Split */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 my-6">
            <div className="md:col-span-8 rounded-2xl overflow-hidden border border-white/10 aspect-[16/10] bg-[#14141a]">
              <img
                src={project.image}
                srcSet={
                  project.image400
                    ? `${project.image400} 400w, ${project.image800 || project.image640 || project.image} 800w, ${project.image} 1200w`
                    : project.image800
                    ? `${project.image800} 800w, ${project.image} 1200w`
                    : undefined
                }
                sizes="(max-width: 640px) calc(100vw - 32px), 800px"
                width={1200}
                height={750}
                alt={project.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
                style={{ objectPosition: project.imagePosition || 'center' }}
              />
            </div>
            <div className="md:col-span-4 rounded-2xl overflow-hidden border border-white/10 aspect-[16/10] md:aspect-auto bg-[#14141a]">
              <img
                src={project.secondaryImage}
                srcSet={
                  project.secondaryImage400
                    ? `${project.secondaryImage400} 400w, ${project.secondaryImage800 || project.secondaryImage640 || project.secondaryImage} 800w, ${project.secondaryImage} 1200w`
                    : project.secondaryImage800
                    ? `${project.secondaryImage800} 800w, ${project.secondaryImage} 1200w`
                    : undefined
                }
                sizes="(max-width: 640px) calc(100vw - 32px), 400px"
                width={1200}
                height={750}
                alt={`${project.title} Detail`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
                style={{ objectPosition: project.secondaryImagePosition || 'center' }}
              />
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 my-8">
            {project.metrics.map((metric, i) => (
              <div key={i} className="space-y-1">
                <span className="font-display text-2xl sm:text-3xl font-bold text-[#e8002d]">
                  {metric.value}
                </span>
                <p className="font-mono text-xs text-[#8a8172] uppercase tracking-wider">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>

          {/* Challenge & Solution Architecture */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6 border-t border-white/10">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#e8002d] uppercase tracking-wider">
                <Cpu className="w-4 h-4" />
                <span>THE ARCHITECTURAL CHALLENGE</span>
              </div>
              <p className="text-sm text-[#cfc8ba] leading-relaxed">
                {project.challenge}
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#e8002d] uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>THE VALLIANCE SOLUTION</span>
              </div>
              <p className="text-sm text-[#cfc8ba] leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Key Engineering Features */}
          <div className="py-6 border-t border-white/10 space-y-4">
            <h3 className="font-display text-lg font-bold text-[#f7f3eb] uppercase tracking-wider">
              Core Capabilities &amp; Interactivity
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-[#cfc8ba]">
                  <CheckCircle2 className="w-4 h-4 text-[#e8002d] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Tags */}
          <div className="py-6 border-t border-white/10 space-y-3">
            <h4 className="font-mono text-xs text-[#8a8172] uppercase tracking-wider">
              ENGINEERED WITH
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-xs text-[#f7f3eb]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>


          {/* Bottom Action Footer */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-mono text-[#8a8172]">
              <ShieldCheck className="w-4 h-4 text-[#e8002d]" />
              <span>
                {project.isStudioConcept
                  ? 'STUDIO CONCEPT ARCHIVE // VALLIANCE LABS'
                  : 'VERIFIED PRODUCTION DEPLOYMENT // CLIENT ARCHIVE'}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              {project.livePreviewUrl && (
                <a
                  href={project.livePreviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick(600)}
                  className="btn-tactile inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-mono font-bold text-[#f7f3eb] uppercase tracking-wider border border-white/20 hover:border-white/40 transition-all group/livebtn active:scale-[0.97] w-full sm:w-auto"
                >
                  <span>LAUNCH LIVE SITE</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#e8002d] transition-transform group-hover/livebtn:translate-x-0.5 group-hover/livebtn:-translate-y-0.5" />
                </a>
              )}
              <button
                onClick={() => {
                  sound.playClick(400);
                  onClose();
                }}
                className="btn-tactile min-h-[44px] px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-xs font-mono text-[#f7f3eb] uppercase tracking-wider flex items-center justify-center active:scale-[0.97] w-full sm:w-auto"
              >
                CLOSE
              </button>
              <button
                onClick={() => {
                  sound.playChime();
                  onClose();
                  onOpenContact();
                }}
                className="btn-tactile inline-flex items-center justify-center gap-2 min-h-[44px] px-6 py-2.5 bg-[#e8002d] text-[#fff6ec] font-mono font-bold text-xs uppercase tracking-wider rounded-full hover:bg-[#ff2a44] shadow-[0_0_20px_rgba(232,0,45,0.3)] transition-all active:scale-[0.97] w-full sm:w-auto"
              >
                <span>BUILD SIMILAR EXPERIENCE</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
