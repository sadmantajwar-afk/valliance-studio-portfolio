import React, { useState } from 'react';
import { Terminal, CheckCircle2, Clock, Layers, ArrowUpRight } from 'lucide-react';
import { PROCESS_STEPS } from '../data/projects';
import { sound } from '../utils/audio';

interface ProcessSectionProps {
  onOpenContact: () => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onOpenContact }) => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const activeStep = PROCESS_STEPS[activeStepIndex] || PROCESS_STEPS[0];

  return (
    <section
      id="process"
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b transition-colors duration-200"
      style={{
        backgroundColor: 'var(--theme-bg)',
        color: 'var(--theme-text-primary)',
        borderColor: 'var(--theme-border)',
      }}
    >
      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b" style={{ borderColor: 'var(--theme-border)' }}>
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-[#F3264B] uppercase tracking-wider">
              <Terminal className="w-4 h-4" />
              <span>INDEX // 02 — SYSTEMATIC EXECUTION</span>
            </div>
            <h2 className="font-display font-extrabold text-[clamp(2.2rem,7vw,5rem)] tracking-tight uppercase leading-[0.95] break-words" style={{ color: 'var(--theme-text-primary)' }}>
              DESIGNED, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F3264B] via-[#FF2A44] to-[#8A8172]">
                NOT JUST LISTED.
              </span>
            </h2>
          </div>

          <div className="space-y-4 lg:max-w-md">
            <p className="text-sm sm:text-base font-sans font-light leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>
              We operate in concentrated, high-velocity sprints. Every milestone produces tangible, testable code and crystal-clear architectural assets.
            </p>
          </div>
        </div>

        {/* Interactive Step Selector Timeline Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {PROCESS_STEPS.map((step, idx) => {
            const isSelected = idx === activeStepIndex;

            return (
              <button
                key={step.step}
                onClick={() => {
                  sound.playClick(600 + idx * 100);
                  setActiveStepIndex(idx);
                }}
                className={`btn-tactile p-5 sm:p-6 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden active:scale-[0.98] ${
                  isSelected
                    ? 'border-[#F3264B] shadow-[0_0_25px_rgba(243,38,75,0.25)]'
                    : 'hover:border-opacity-60'
                }`}
                style={{
                  backgroundColor: isSelected ? 'var(--theme-surface-card)' : 'var(--theme-surface-elevated)',
                  borderColor: isSelected ? '#F3264B' : 'var(--theme-border)',
                }}
                data-cursor="hover"
              >
                {/* Active Top Line Indicator */}
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#F3264B]" />
                )}

                <div className="space-y-2">
                  <span className="font-mono text-xs text-[#F3264B] font-bold block">
                    PHASE {step.step}
                  </span>
                  <div className="font-display font-bold text-lg uppercase tracking-tight" style={{ color: 'var(--theme-text-primary)' }}>
                    {step.name}
                  </div>
                  <div className="font-mono text-xs" style={{ color: 'var(--theme-text-muted)' }}>
                    {step.duration}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Step Deep-Dive Showcase */}
        <div
          className="p-8 sm:p-12 rounded-3xl border space-y-8 shadow-xl transition-all"
          style={{
            backgroundColor: 'var(--theme-surface-card)',
            borderColor: 'var(--theme-border-card)',
          }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b" style={{ borderColor: 'var(--theme-border)' }}>
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3264B]/10 border border-[#F3264B]/30 text-xs font-mono text-[#F3264B] uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5" />
                <span>TIMELINE: {activeStep.duration}</span>
              </div>
              <h3 className="font-display font-extrabold text-2xl sm:text-4xl uppercase tracking-tight" style={{ color: 'var(--theme-text-primary)' }}>
                {activeStep.name} — {activeStep.phase}
              </h3>
            </div>

            <button
              onClick={() => {
                sound.playChime();
                onOpenContact();
              }}
              className="btn-tactile inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#E01A40] hover:bg-[#FF2A44] text-white font-mono text-xs uppercase tracking-wider font-bold transition-all shadow-[0_0_20px_rgba(224,26,64,0.4)] whitespace-nowrap active:scale-[0.97]"
            >
              <span>DISCUSS THIS WORKFLOW</span>
              <ArrowUpRight className="w-4 h-4 font-bold" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-4">
              <p className="text-base sm:text-lg leading-relaxed font-sans" style={{ color: 'var(--theme-text-secondary)' }}>
                {activeStep.description}
              </p>

              <div
                className="p-4 rounded-xl border text-xs font-mono flex items-center gap-3"
                style={{
                  backgroundColor: 'var(--theme-surface-elevated)',
                  borderColor: 'var(--theme-border)',
                  color: 'var(--theme-text-muted)',
                }}
              >
                <Layers className="w-4 h-4 text-[#F3264B] shrink-0" />
                <span>PRIMARY OUTCOME: <strong style={{ color: 'var(--theme-text-primary)' }}>{activeStep.metrics}</strong></span>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-3">
              <span className="font-mono text-xs uppercase tracking-wider font-bold block" style={{ color: 'var(--theme-text-muted)' }}>
                KEY MILESTONE DELIVERABLES:
              </span>
              <div className="space-y-2.5">
                {(activeStep.deliverables || []).map((detail, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-xl border text-xs"
                    style={{
                      backgroundColor: 'var(--theme-surface-elevated)',
                      borderColor: 'var(--theme-border)',
                      color: 'var(--theme-text-secondary)',
                    }}
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#F3264B] shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
