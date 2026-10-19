import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Sparkles, Globe, ShieldCheck, Terminal } from 'lucide-react';

export const ImpactMetrics: React.FC = () => {
  const metrics = [
    {
      value: 'Modern',
      label: 'Component Architecture',
      desc: 'Crafted with React 19, TypeScript, and Next.js App Router for zero technical debt and clean maintainability.'
    },
    {
      value: 'Kinetic',
      label: 'Editorial Art Direction',
      desc: 'Fluid micro-interactions, bold typography, and cinematic motion choreographed with Framer Motion.'
    },
    {
      value: 'Edge',
      label: 'Global CDN Deployment',
      desc: 'Optimized build artifacts deployed on global Vercel edge networks for instantaneous worldwide delivery.'
    },
    {
      value: 'Bespoke',
      label: 'Tailored Design Systems',
      desc: 'Zero generic templates. Handcrafted design tokens, responsive layouts, and custom theme orchestration.'
    }
  ];

  const productionStandards = [
    { name: 'React 19 & Next.js App Router', spec: 'Bespoke Production Engineering', icon: Code2 },
    { name: 'Tailwind CSS & Framer Motion', spec: 'Zero-Jank Kinetic Interactions', icon: Sparkles },
    { name: 'Vercel Edge Global Network', spec: 'Low-Latency Worldwide CDN', icon: Globe },
    { name: 'Strict Type Safety', spec: 'Robust TypeScript Systems', icon: ShieldCheck }
  ];

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#080606] border-b border-white/10">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-baseline justify-between gap-4 pb-6 border-b border-white/10">
          <div className="flex items-center gap-2 text-xs font-mono text-[#e8002d] uppercase tracking-wider">
            <Terminal className="w-4 h-4" />
            <span>STUDIO ENGINEERING &amp; PRODUCTION STANDARDS</span>
          </div>
          <div className="font-mono text-xs text-[#8a8172]">
            INTERNATIONAL STANDARD // ZERO COMPROMISE
          </div>
        </div>

        {/* 4 Big Numbers Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((m, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="space-y-3 p-6 rounded-2xl bg-white/[0.02] border border-white/10"
            >
              <div className="font-display font-extrabold text-4xl sm:text-5xl text-[#e8002d] tracking-tight">
                {m.value}
              </div>
              <div className="font-display font-bold text-base text-[#f7f3eb]">
                {m.label}
              </div>
              <p className="text-xs text-[#8e8b82] leading-relaxed font-light">
                {m.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Production Standards Bar */}
        <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
          {productionStandards.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#e8002d]/10 border border-[#e8002d]/25 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-[#e8002d]" />
                </div>
                <div>
                  <div className="font-mono text-xs font-bold text-[#f7f3eb]">{item.name}</div>
                  <div className="text-[10px] font-mono text-[#8a8172]">{item.spec}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
