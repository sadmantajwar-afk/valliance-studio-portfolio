import React from 'react';
import { Terminal, ArrowUpRight, Flame, Layers, Zap, Eye } from 'lucide-react';
import { sound } from '../utils/audio';

interface PhilosophyProps {
  onOpenContact: () => void;
}

export const Philosophy: React.FC<PhilosophyProps> = ({ onOpenContact }) => {
  const pillars = [
    {
      number: '01',
      title: 'Craft Over Commodity',
      icon: Flame,
      desc: 'We refuse generic website builders and cookie-cutter frameworks. Every digital flagship is custom-sculpted with bespoke typography, spatial shaders, and uncompromising taste.'
    },
    {
      number: '02',
      title: 'Intelligence Embedded',
      icon: Zap,
      desc: 'AI is not a novelty gimmick or a floating chat bubble. We embed intelligence directly into your core business mechanics, automating workflows and unlocking new revenue channels.'
    },
    {
      number: '03',
      title: 'Frictionless Velocity',
      icon: Layers,
      desc: 'Speed is a luxury feature. Our code is engineered for instantaneous hydration, fluid cinematic transitions, and real-time conversational voice interactions.'
    },
    {
      number: '04',
      title: 'Measurable Artistry',
      icon: Eye,
      desc: 'Breathtaking visual design must drive commercial growth. We measure our success through real conversion lifts, eliminated manual labor hours, and category dominance.'
    }
  ];

  return (
    <section id="philosophy" className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 bg-[#080606] border-b border-white/10 overflow-hidden">
      {/* Background glow and subtle grid */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-[#e8002d]/4 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-20">
        {/* Section Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#e8002d] uppercase tracking-wider">
            <Terminal className="w-4 h-4" />
            <span>INDEX // 03 — STUDIO MANIFESTO</span>
          </div>

          <h2 className="font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tight text-[#f7f3eb] uppercase leading-[0.92]">
            LESS REPETITION. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e8002d] via-[#f7f3eb] to-[#e8e2d6]">
              MORE POSSIBILITY.
            </span>
          </h2>
        </div>

        {/* Dramatic Editorial Manifesto Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pb-12 border-b border-white/10">
          <div className="lg:col-span-8">
            <p className="font-space text-2xl sm:text-4xl text-[#f7f3eb] font-light leading-snug tracking-tight">
              “We combine thoughtful design, modern development, and practical AI to help businesses create better customer experiences and work more intelligently.”
            </p>
          </div>

          <div className="lg:col-span-4 space-y-4 text-sm text-[#cfc8ba] font-light leading-relaxed">
            <p>
              In an era saturated with generic AI noise and templated design, true differentiation demands conviction. We treat software as digital architecture and intelligence as our core material.
            </p>
            <div className="pt-2">
              <span className="font-mono text-xs text-[#e8002d]">
                VALLIANCE STUDIO // CREATIVE &amp; AI ENGINEERING
              </span>
            </div>
          </div>
        </div>

        {/* 4 Pillars Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;

            return (
              <div
                key={pillar.number}
                className="p-8 rounded-3xl glass-panel border border-white/10 hover:border-[#e8002d]/40 transition-all duration-300 space-y-6 group"
                data-cursor="hover"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-bold text-[#e8002d]">
                    {pillar.number}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-white/5 group-hover:bg-[#e8002d]/10 flex items-center justify-center transition-colors">
                    <Icon className="w-5 h-5 text-[#cfc8ba] group-hover:text-[#e8002d] transition-colors" />
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-display font-bold text-xl text-[#f7f3eb] uppercase tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#8e8b82] leading-relaxed font-light">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Ticker */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-white/5 border border-white/10">
          <div className="font-mono text-xs text-[#cfc8ba]">
            HAVE A VISION THAT DEMANDS CATEGORY LEADERSHIP?
          </div>
          <button
            onClick={() => {
              sound.playChime();
              onOpenContact();
            }}
            className="flex items-center gap-2 text-xs font-mono font-bold text-[#e8002d] hover:text-[#f7f3eb] transition-colors"
          >
            <span>JOIN FORCES WITH OUR STUDIO</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
