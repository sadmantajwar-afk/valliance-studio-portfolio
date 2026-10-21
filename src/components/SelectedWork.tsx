import React, { useState, lazy, Suspense } from 'react';
import { ArrowUpRight, Sparkles, Terminal, Eye } from 'lucide-react';
import { Project, PROJECTS } from '../data/projects';
import { sound } from '../utils/audio';
import { useTheme } from '../utils/theme';

const CaseStudyModal = lazy(() =>
  import('./CaseStudyModal').then((m) => ({ default: m.CaseStudyModal }))
);

interface SelectedWorkProps {
  onOpenContact: () => void;
}

export const SelectedWork: React.FC<SelectedWorkProps> = ({ onOpenContact }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const { isDark } = useTheme();

  const categories = ['All', 'Digital Experiences', 'Commerce & Systems'];

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === selectedCategory);

  return (
    <section
      id="work"
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b transition-colors duration-200"
      style={{
        backgroundColor: 'var(--theme-bg)',
        color: 'var(--theme-text-primary)',
        borderColor: 'var(--theme-border)',
      }}
    >
      {/* Background radial glow */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#F3264B]/4 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b" style={{ borderColor: 'var(--theme-border)' }}>
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-[#F3264B] uppercase tracking-wider">
              <Terminal className="w-4 h-4" />
              <span>INDEX // 01 — DEMO PROJECTS</span>
            </div>
            <h2 className="font-display font-extrabold text-[clamp(2.2rem,7vw,5rem)] tracking-tight uppercase leading-[0.95]" style={{ color: 'var(--theme-text-primary)' }}>
              GOOD WORK. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F3264B] via-[#FF2A44] to-[#8A8172]">
                NO ORDINARY.
              </span>
            </h2>
          </div>

          <div className="space-y-6 lg:max-w-md">
            <p className="text-sm sm:text-base font-sans font-light leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>
              Every project is an editorial canvas. We don’t repeat templates; we sculpt bespoke digital identities and autonomous AI architectures tailored to world-class brands.
            </p>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    sound.playClick(700);
                    setSelectedCategory(cat);
                  }}
                  className={`btn-tactile min-h-[40px] px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 flex items-center justify-center active:scale-[0.97] border ${
                    selectedCategory === cat
                      ? 'bg-[#F3264B] text-white font-bold shadow-[0_0_15px_rgba(243,38,75,0.3)]'
                      : 'hover:opacity-90'
                  }`}
                  style={{
                    backgroundColor: selectedCategory === cat ? '#F3264B' : 'var(--theme-surface-elevated)',
                    color: selectedCategory === cat ? '#FFFFFF' : 'var(--theme-text-secondary)',
                    borderColor: selectedCategory === cat ? '#F3264B' : 'var(--theme-border)',
                  }}
                  data-cursor="hover"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Project Editorial Showcase Rows */}
        <div className="space-y-24 sm:space-y-32">
          {filteredProjects.map((project, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <article
                key={project.id}
                className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center group overflow-hidden rounded-3xl"
              >
                {/* Background Large Monospace Number Watermark */}
                <div
                  className={`absolute -top-12 sm:-top-20 ${
                    isEven ? 'right-0' : 'left-0'
                  } font-display font-extrabold text-[7rem] sm:text-[12rem] lg:text-[15rem] leading-none select-none pointer-events-none z-0`}
                  style={{
                    color: isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(8, 9, 11, 0.03)',
                  }}
                >
                  {project.number}
                </div>

                {/* Imagery Column */}
                <div
                  className={`lg:col-span-7 relative z-10 ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div
                    onClick={() => {
                      sound.playChime();
                      setActiveProject(project);
                    }}
                    className="relative aspect-[16/11] sm:aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden border cursor-pointer group shadow-2xl transition-all duration-500 hover:border-[#F3264B]/50"
                    style={{
                      backgroundColor: 'var(--theme-surface-card)',
                      borderColor: 'var(--theme-border)',
                    }}
                    data-cursor="project"
                    data-cursor-text="EXPLORE"
                  >
                    <img
                      src={project.image}
                      srcSet={
                        project.image400
                          ? `${project.image400} 400w, ${project.image800 || project.image640 || project.image} 800w, ${project.image} 1200w`
                          : project.image800
                          ? `${project.image800} 800w, ${project.image} 1200w`
                          : undefined
                      }
                      sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 1024px) 90vw, 750px"
                      width={1200}
                      height={750}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 filter brightness-100 contrast-105 will-change-transform"
                      style={{ objectPosition: project.imagePosition || 'center' }}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-75 group-hover:opacity-50 transition-opacity duration-500" />

                    {/* Top Floating Badge */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-white">
                      <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#F3264B]" />
                        {project.category}
                      </span>
                      <span className="px-2.5 py-1 rounded bg-black/60 backdrop-blur-md border border-[#F3264B]/40 text-[#F3264B] font-bold flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F3264B]" />
                        {project.isStudioConcept ? 'STUDIO CONCEPT' : 'DEMO PROJECT'}
                      </span>
                    </div>

                    {/* Bottom Preview Telemetry */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                      <div className="space-y-1">
                        <span className="font-mono text-xs text-[#F3264B]">
                          CORE ARCHITECTURE SPEC
                        </span>
                        <div className="font-display text-xl sm:text-2xl font-bold text-white">
                          {project.metrics[0].value}{' '}
                          <span className="font-mono text-xs font-normal text-white/80">
                            ({project.metrics[0].label})
                          </span>
                        </div>
                      </div>

                      <div className="w-10 h-10 rounded-full bg-[#F3264B] text-white flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-45 transition-all duration-300 shadow-[0_0_20px_rgba(243,38,75,0.5)]">
                        <ArrowUpRight className="w-5 h-5 font-bold" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Typography / Metadata Column */}
                <div
                  className={`lg:col-span-5 relative z-10 space-y-6 ${
                    isEven ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-display text-2xl font-bold text-[#F3264B]">
                      {project.number}
                    </span>
                    <span className="w-12 h-[1px]" style={{ backgroundColor: 'var(--theme-border-strong)' }} />
                    <span className="font-mono text-xs uppercase tracking-wider" style={{ color: 'var(--theme-text-muted)' }}>
                      {project.client}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <h3
                      className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight uppercase group-hover:text-[#F3264B] transition-colors"
                      style={{ color: 'var(--theme-text-primary)' }}
                    >
                      {project.title}
                    </h3>
                    <p className="font-space text-base sm:text-lg italic font-medium leading-relaxed" style={{ color: 'var(--theme-text-primary)' }}>
                      “{project.tagline}”
                    </p>
                    <p className="text-sm font-sans font-light leading-relaxed pt-1" style={{ color: 'var(--theme-text-secondary)' }}>
                      {project.description}
                    </p>
                  </div>

                  {/* Deliverables / Tech Stack Badges */}
                  <div className="space-y-3 pt-2">
                    <div className="font-mono text-xs uppercase tracking-wider font-semibold" style={{ color: 'var(--theme-text-muted)' }}>
                      ENGINEERED DELIVERABLES:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.deliverables.map((item, dIdx) => (
                        <span
                          key={dIdx}
                          className="px-3 py-1.5 rounded-lg border text-xs font-mono"
                          style={{
                            backgroundColor: 'var(--theme-surface-elevated)',
                            borderColor: 'var(--theme-border)',
                            color: 'var(--theme-text-secondary)',
                          }}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex flex-wrap items-center gap-4 pt-4 border-t" style={{ borderColor: 'var(--theme-border)' }}>
                    <button
                      onClick={() => {
                        sound.playChime();
                        setActiveProject(project);
                      }}
                      className="btn-tactile inline-flex items-center gap-2 px-6 py-3 rounded-full border text-xs font-mono uppercase tracking-wider font-bold transition-all hover:border-[#F3264B]"
                      style={{
                        backgroundColor: 'var(--theme-surface-elevated)',
                        borderColor: 'var(--theme-border)',
                        color: 'var(--theme-text-primary)',
                      }}
                      data-cursor="hover"
                    >
                      <Eye className="w-4 h-4 text-[#F3264B]" />
                      <span>INSPECT ARCHITECTURE</span>
                    </button>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => sound.playClick(800)}
                        className="btn-tactile inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#F3264B] hover:underline"
                        data-cursor="hover"
                      >
                        <span>VISIT PRODUCTION SITE</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Case Study Modal */}
      {activeProject && (
        <Suspense fallback={null}>
          <CaseStudyModal
            project={activeProject}
            onClose={() => setActiveProject(null)}
            onOpenContact={() => {
              setActiveProject(null);
              onOpenContact();
            }}
          />
        </Suspense>
      )}
    </section>
  );
};
