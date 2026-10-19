import React from 'react';

export const Marquee: React.FC = () => {
  const track1 = [
    'DIGITAL EXPERIENCES',
    'AI THAT WORKS',
    'AUTOMATION WITHOUT FRICTION',
    'BUILT FOR WHAT’S NEXT',
    'CATEGORY-DEFINING CODE',
    'AUTONOMOUS COMMERCE'
  ];

  const track2 = [
    'SWISS TYPOGRAPHY',
    'REAL-TIME VOICE AI',
    'EXECUTIVE COCKPITS',
    'NEURAL AGENTS',
    'MICHELIN & LUXURY FLAGSHIPS',
    'ZERO BUSYWORK'
  ];

  return (
    <section className="relative py-12 bg-[#080606] border-y border-white/10 overflow-hidden select-none">
      {/* Background scanline glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#e8002d]/5 via-transparent to-[#e8002d]/5 pointer-events-none" />

      {/* Track 1: Moving Left */}
      <div className="relative flex overflow-x-hidden py-2">
        <div className="animate-marquee whitespace-nowrap flex items-center">
          {track1.concat(track1).map((item, idx) => (
            <div key={`t1-${idx}`} className="flex items-center mx-4 sm:mx-6 gap-4 sm:gap-6 shrink-0">
              <span className="font-display font-extrabold text-2xl sm:text-5xl lg:text-6xl text-[#f7f3eb] tracking-tight uppercase hover:text-[#e8002d] transition-colors duration-300">
                {item}
              </span>
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-[#e8002d] rotate-45 transform inline-block shadow-[0_0_12px_#e8002d]" />
            </div>
          ))}
        </div>
      </div>

      {/* Track 2: Moving Right with Outlined / Secondary Styling */}
      <div className="relative flex overflow-x-hidden py-2 mt-2">
        <div className="animate-marquee-reverse whitespace-nowrap flex items-center">
          {track2.concat(track2).map((item, idx) => (
            <div key={`t2-${idx}`} className="flex items-center mx-4 sm:mx-6 gap-4 sm:gap-6 shrink-0">
              <span className="font-display font-bold text-xl sm:text-4xl lg:text-5xl text-stroke hover:text-[#e8002d] hover:text-stroke-crimson tracking-tight uppercase transition-all duration-300">
                {item}
              </span>
              <span className="text-[#8a8172] font-mono text-xs sm:text-sm tracking-widest">
                [// 0{((idx % 6) + 1)}]
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
