import React, { useState } from 'react';
import { ArrowUpRight, Sparkles, Terminal, Eye } from 'lucide-react';
import { Project, PROJECTS } from '../data/projects';
import { CaseStudyModal } from './CaseStudyModal';
import { sound } from '../utils/audio';

interface SelectedWorkProps {
  onOpenContact: () => void;
}

export const SelectedWork: React.FC<SelectedWorkProps> = ({ onOpenContact }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const categories = ['All', 'Digital Experiences', 'Commerce & Systems'];

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === selectedCategory);

  return (
    <section id="work" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#0b0908] border-b border-white/10">
      {/* Background radial glow */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#e8002d]/4 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-white/10">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-[#e8002d] uppercase tracking-wider">
              <Terminal className="w-4 h-4" />
              <span>INDEX // 01 — SELECTED WORK</span>
            </div>
            <h2 className="font-display font-extrabold text-[clamp(2.2rem,7vw,5rem)] tracking-tight text-[#f7f3eb] uppercase leading-[0.95]">
              GOOD WORK. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e8002d] to-[#f7f3eb]">
                NO ORDINARY.
              </span>
            </h2>
          </div>

          <div className="space-y-6 lg:max-w-md">
            <p className="text-sm sm:text-base text-[#cfc8ba] font-sans font-light leading-relaxed">
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
                  className={`min-h-[40px] px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 flex items-center justify-center ${
                    selectedCategory === cat
                      ? 'bg-[#e8002d] text-[#fff6ec] font-bold shadow-[0_0_15px_rgba(232,0,45,0.3)]'
                      : 'bg-white/5 text-[#cfc8ba] hover:text-[#f7f3eb] hover:bg-white/10 border border-white/10'
                  }`}
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
                  } font-display font-extrabold text-[7rem] sm:text-[12rem] lg:text-[15rem] leading-none text-white/[0.02] select-none pointer-events-none z-0`}
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
                    className="relative aspect-[16/11] sm:aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden glass-panel border border-white/15 cursor-pointer group shadow-2xl transition-all duration-500 hover:border-[#e8002d]/50"
                    data-cursor="project"
                    data-cursor-text="EXPLORE"
                  >
                    <img
                      src={project.image}
                      srcSet={project.image640 ? `${project.image640} 640w, ${project.image} 1200w` : undefined}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 58vw, 750px"
                      width={1200}
                      height={750}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 filter brightness-100 contrast-105 will-change-transform"
                      style={{ objectPosition: project.imagePosition || 'center' }}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b0908]/90 via-[#0b0908]/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

                    {/* Top Floating Badge */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#f7f3eb]">
                      <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#e8002d]" />
                        {project.category}
                      </span>
                      <span className="px-2.5 py-1 rounded bg-black/60 backdrop-blur-md border border-[#e8002d]/40 text-[#e8002d] font-bold flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#e8002d]" />
                        {project.isStudioConcept ? 'STUDIO CONCEPT' : 'LIVE PROJECT'}
                      </span>
                    </div>

                    {/* Bottom Preview Telemetry */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                      <div className="space-y-1">
                        <span className="font-mono text-xs text-[#e8002d]">
                          CORE ARCHITECTURE SPEC
                        </span>
                        <div className="font-display text-xl sm:text-2xl font-bold text-[#f7f3eb]">
                          {project.metrics[0].value}{' '}
                          <span className="font-mono text-xs font-normal text-[#cfc8ba]">
                            ({project.metrics[0].label})
                          </span>
                        </div>
                      </div>

                      <div className="w-10 h-10 rounded-full bg-[#e8002d] text-[#fff6ec] flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-45 transition-all duration-300 shadow-[0_0_20px_rgba(232,0,45,0.5)]">
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
                    <span className="font-display text-2xl font-bold text-[#e8002d]">
                      {project.number}
                    </span>
                    <span className="w-12 h-[1px] bg-white/20" />
                    <span className="font-mono text-xs text-[#8a8172] uppercase tracking-wider">
                      {project.client}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#f7f3eb] tracking-tight uppercase group-hover:text-[#e8002d] transition-colors">
                      {project.title}
                    </h3>
                    <p className="font-space text-lg text-[#cfc8ba] font-medium leading-relaxed">
                      {project.tagline}
                    </p>
                  </div>

                  <p className="text-sm text-[#8e8b82] leading-relaxed font-light">
                    {project.overview}
                  </p>

                  {/* Deliverables Tags */}
                  <div className="space-y-2 pt-2">
                    <div className="text-[11px] font-mono text-[#8a8172] uppercase tracking-wider">
                      DELIVERABLES &amp; CAPABILITIES:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.deliverables.map((deliv, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded bg-white/5 border border-white/10 font-mono text-xs text-[#f7f3eb]"
                        >
                          {deliv}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Interactive Action Buttons */}
                  <div className="pt-4 flex flex-col sm:flex-row sm:items-center gap-3">
                    <button
                      onClick={() => {
                        sound.playChime();
                        setActiveProject(project);
                      }}
                      className="inline-flex items-center justify-center gap-2 min-h-[44px] px-6 py-3 bg-[#e8002d] hover:bg-[#ff2a44] text-[#fff6ec] font-mono font-bold text-xs uppercase tracking-wider rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(232,0,45,0.3)] hover:scale-[1.02] w-full sm:w-auto"
                    >
                      <Eye className="w-4 h-4" />
                      <span>INSPECT CASE STUDY</span>
                    </button>

                    {project.livePreviewUrl && (
                      <a
                        href={project.livePreviewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => sound.playClick(600)}
                        className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-3 bg-white/5 hover:bg-white/10 text-[#f7f3eb] hover:text-[#fff6ec] font-mono font-bold text-xs uppercase tracking-wider rounded-full border border-white/15 hover:border-white/30 transition-all duration-300 group/link w-full sm:w-auto"
                      >
                        <span>VISIT LIVE SITE</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#e8002d] transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom Banner to Contact */}
        <div className="p-6 sm:p-12 rounded-3xl bg-gradient-to-r from-white/5 via-white/[0.02] to-transparent border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-2">
            <h4 className="font-display text-2xl sm:text-3xl font-bold text-[#f7f3eb] uppercase">
              Ready to elevate your flagship?
            </h4>
            <p className="text-sm text-[#cfc8ba]">
              We take on a limited number of high-impact engagements each quarter.
            </p>
          </div>
          <button
            onClick={() => {
              sound.playChime();
              onOpenContact();
            }}
            className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 bg-[#e8002d] text-[#fff6ec] font-mono font-bold text-xs uppercase tracking-wider rounded-full hover:bg-[#ff2a44] shrink-0 flex items-center justify-center"
          >
            DISCUSS YOUR PROJECT
          </button>
        </div>
      </div>

      {/* Case Study Full Deep Dive Modal */}
      <CaseStudyModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
        onOpenContact={onOpenContact}
      />
    </section>
  );
};
