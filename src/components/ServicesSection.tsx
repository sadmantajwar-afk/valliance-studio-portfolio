import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Terminal, Plus, Minus, Check, Code, Clock } from 'lucide-react';
import { SERVICES } from '../data/projects';
import { sound } from '../utils/audio';

interface ServicesSectionProps {
  onOpenContact: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenContact }) => {
  const [activeServiceId, setActiveServiceId] = useState<string>(SERVICES[0].id);

  return (
    <section id="services" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#f3ebdd] text-[#0a0a0c] transition-colors duration-500">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-[#0a0a0c]/15">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-[#0a0a0c] uppercase tracking-wider font-semibold">
              <Terminal className="w-4 h-4 text-[#b80024]" />
              <span>INDEX // 02 — CAPABILITIES MATRIX</span>
            </div>
            <h2 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight text-[#0a0a0c] uppercase leading-[0.95]">
              FROM FIRST IMPRESSION <br />
              <span className="italic font-normal">TO INTELLIGENT OPERATION.</span>
            </h2>
          </div>

          <div className="space-y-4 lg:max-w-md">
            <p className="text-sm sm:text-base text-[#4a4843] font-sans font-normal leading-relaxed">
              We bridge experimental Swiss design with hardened AI engineering. Our capabilities cover the complete digital spectrum from brand flagships to autonomous enterprise pipelines.
            </p>
          </div>
        </div>

        {/* Interactive Editorial Services Rows */}
        <div className="divide-y divide-[#0a0a0c]/15 border-y border-[#0a0a0c]/15">
          {SERVICES.map((service) => {
            const isActive = activeServiceId === service.id;

            return (
              <div
                key={service.id}
                className={`py-8 sm:py-10 transition-colors duration-300 ${
                  isActive ? 'bg-[#ebe8e0]/60' : 'hover:bg-[#ebe8e0]/30'
                }`}
              >
                {/* Header Row Clickable */}
                <div
                  onClick={() => {
                    sound.playClick(isActive ? 400 : 700);
                    setActiveServiceId(isActive ? '' : service.id);
                  }}
                  className="cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 group"
                  data-cursor="hover"
                >
                  <div className="flex items-baseline gap-4 sm:gap-8">
                    <span className="font-mono text-sm sm:text-base font-bold text-[#b80024]">
                      {service.number}
                    </span>
                    <div className="space-y-1">
                      <h3 className="font-display font-bold text-2xl sm:text-4xl text-[#0a0a0c] group-hover:translate-x-2 transition-transform duration-300">
                        {service.title}
                      </h3>
                      <p className="font-space text-xs sm:text-sm text-[#706d64]">
                        {service.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 self-end md:self-center">
                    <span className="hidden sm:inline-block font-mono text-xs text-[#706d64] uppercase">
                      TIMELINE: {service.timeline}
                    </span>
                    <div
                      className={`w-10 h-10 rounded-full border border-[#0a0a0c]/20 flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? 'bg-[#0a0a0c] text-[#e8002d]'
                          : 'bg-transparent text-[#0a0a0c] group-hover:bg-[#0a0a0c] group-hover:text-[#f3ebdd]'
                      }`}
                    >
                      {isActive ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Details Drawer */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-8 mt-4 border-t border-[#0a0a0c]/10">
                        {/* Description & Deliverables */}
                        <div className="md:col-span-7 space-y-6">
                          <p className="text-base text-[#2c2b28] leading-relaxed">
                            {service.description}
                          </p>

                          <div className="space-y-3">
                            <span className="font-mono text-xs font-bold text-[#0a0a0c] uppercase tracking-wider">
                              KEY DELIVERABLES:
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                              {service.deliverables.map((deliv, idx) => (
                                <div key={idx} className="flex items-start gap-2 text-xs text-[#4a4843]">
                                  <Check className="w-4 h-4 text-[#b80024] shrink-0 mt-0.5" />
                                  <span>{deliv}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Tech Stack & CTA Card */}
                        <div className="md:col-span-5 p-6 rounded-2xl bg-[#0a0a0c] text-[#f7f3eb] space-y-5">
                          <div className="flex items-center justify-between text-xs font-mono">
                            <span className="flex items-center gap-1.5 text-[#e8002d]">
                              <Code className="w-3.5 h-3.5" />
                              STACK &amp; RUNTIME
                            </span>
                            <span className="flex items-center gap-1 text-[#cfc8ba]">
                              <Clock className="w-3 h-3" />
                              {service.timeline}
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-1.5">
                            {service.tech.map((t) => (
                              <span
                                key={t}
                                className="px-2.5 py-1 rounded bg-white/10 font-mono text-[11px] text-[#f7f3eb]"
                              >
                                {t}
                              </span>
                            ))}
                          </div>

                          <button
                            onClick={() => {
                              sound.playChime();
                              onOpenContact();
                            }}
                            className="w-full flex items-center justify-center gap-2 py-3 bg-[#e8002d] hover:bg-[#ff2a44] text-[#fff6ec] font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all"
                          >
                            <span>INQUIRE ABOUT {service.title.toUpperCase()}</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 text-xs font-mono text-[#706d64]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#b80024]" />
            <span>CUSTOM ENGAGEMENTS AVAILABLE FOR GLOBAL ENTERPRISES</span>
          </div>

          <button
            onClick={() => {
              sound.playClick(600);
              onOpenContact();
            }}
            className="flex items-center gap-1.5 text-[#0a0a0c] font-bold hover:text-[#b80024] underline underline-offset-4"
          >
            <span>REQUEST TAILORED ARCHITECTURE PROPOSAL</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
