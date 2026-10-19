import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, CheckCircle2, Clock, Layers, ArrowUpRight } from 'lucide-react';
import { PROCESS_STEPS } from '../data/projects';
import { sound } from '../utils/audio';

interface ProcessSectionProps {
  onOpenContact: () => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onOpenContact }) => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const activeStep = PROCESS_STEPS[activeStepIndex];

  return (
    <section id="process" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#0b0908] border-b border-white/10">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-white/10">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-[#e8002d] uppercase tracking-wider">
              <Terminal className="w-4 h-4" />
              <span>INDEX // 04 — SYSTEMATIC EXECUTION</span>
            </div>
            <h2 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight text-[#f7f3eb] uppercase">
              DESIGNED, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e8002d] to-[#f7f3eb]">
                NOT JUST LISTED.
              </span>
            </h2>
          </div>

          <div className="space-y-4 lg:max-w-md">
            <p className="text-sm sm:text-base text-[#cfc8ba] font-sans font-light leading-relaxed">
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
                className={`p-5 sm:p-6 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden ${
                  isSelected
                    ? 'bg-[#e8002d]/10 border-[#e8002d] shadow-[0_0_25px_rgba(232,0,45,0.25)]'
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
                data-cursor="hover"
              >
                {/* Active Top Line Indicator */}
                {isSelected && (
                  <motion.div
                    layoutId="active-indicator"
                    className="absolute top-0 left-0 right-0 h-1 bg-[#e8002d]"
                  />
                )}

                <div className="flex items-center justify-between mb-3">
                  <span className={`font-mono text-sm font-bold ${isSelected ? 'text-[#e8002d]' : 'text-[#8a8172]'}`}>
                    PHASE {step.step}
                  </span>
                  <span className="text-[10px] font-mono text-[#cfc8ba] px-2 py-0.5 rounded bg-white/5">
                    {step.duration}
                  </span>
                </div>

                <div className="font-display font-extrabold text-xl sm:text-2xl text-[#f7f3eb] uppercase">
                  {step.name}
                </div>
                <div className="text-xs text-[#8a8172] line-clamp-1 mt-1 font-space">
                  {step.phase}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Deep-Dive Showcase Box */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep.step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="p-8 sm:p-12 rounded-3xl glass-panel border border-white/15 shadow-2xl space-y-8"
          >
            {/* Top Stage Overview */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs px-2.5 py-1 rounded bg-[#e8002d] text-[#fff6ec] font-bold">
                    SPRINT PHASE {activeStep.step}
                  </span>
                  <span className="text-xs font-mono text-[#8a8172] uppercase flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#e8002d]" />
                    {activeStep.duration}
                  </span>
                </div>
                <h3 className="font-display text-3xl sm:text-5xl font-extrabold text-[#f7f3eb] uppercase">
                  {activeStep.name} · {activeStep.phase}
                </h3>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-right">
                <span className="text-[10px] font-mono text-[#8a8172] uppercase tracking-wider block">
                  PRIMARY STAGE BENCHMARK
                </span>
                <span className="font-display text-2xl font-bold text-[#e8002d]">
                  {activeStep.metrics}
                </span>
              </div>
            </div>

            {/* Stage Description & Tagline */}
            <div className="space-y-4 max-w-4xl">
              <p className="font-space text-xl sm:text-2xl text-[#f7f3eb] font-medium leading-relaxed">
                “{activeStep.tagline}”
              </p>
              <p className="text-sm sm:text-base text-[#cfc8ba] font-light leading-relaxed">
                {activeStep.description}
              </p>
            </div>

            {/* Deliverables Checklist Grid */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono text-[#e8002d] uppercase tracking-wider">
                <Layers className="w-4 h-4" />
                <span>WHAT YOU RECEIVE IN HAND:</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeStep.deliverables.map((deliv, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-[#f7f3eb]"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#e8002d] shrink-0" />
                    <span>{deliv}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stage Next Step Controller */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs font-mono text-[#8a8172]">
                PHASE {activeStep.step} OF 04 COMPLETE
              </div>

              <div className="flex items-center gap-3">
                {activeStepIndex < PROCESS_STEPS.length - 1 ? (
                  <button
                    onClick={() => {
                      sound.playClick(700);
                      setActiveStepIndex((idx) => idx + 1);
                    }}
                    className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-mono text-[#f7f3eb] uppercase tracking-wider transition-all"
                  >
                    NEXT PHASE ({PROCESS_STEPS[activeStepIndex + 1].name.toUpperCase()}) →
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      sound.playChime();
                      onOpenContact();
                    }}
                    className="px-6 py-2.5 rounded-full bg-[#e8002d] hover:bg-[#ff2a44] text-[#fff6ec] font-mono font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(232,0,45,0.3)] transition-all flex items-center gap-2"
                  >
                    <span>INITIATE SPRINT 01</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
