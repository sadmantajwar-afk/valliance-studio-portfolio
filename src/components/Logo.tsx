import React from 'react';

/**
 * Valliance Studio official logo mark.
 * Vector recreation of the brand identity: a crimson geometric "V"
 * built from two offset blades — the left blade descends to the point,
 * the right blade is shorter, separated by a diagonal cut —
 * set on the warm cream disc from the original artwork.
 */

export const V_MARK_PATHS = {
  // Left blade: flat top, descends to the bottom point
  left: 'M0 0 H173 L370 295 L283 431 Z',
  // Right blade: flat top, shorter, ends mid-height
  right: 'M410 0 H573 L380 284 L297 156 Z',
};

interface LogoMarkProps {
  className?: string;
  /** crimson by default; pass a color to recolor the blades */
  color?: string;
}

/** The bare crimson "V" blades (no background). viewBox: 0 0 573 431 */
export const LogoMark: React.FC<LogoMarkProps> = ({ className = 'w-8 h-8', color = '#E8002D' }) => (
  <svg viewBox="0 0 573 431" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Valliance Studio logo mark">
    <path d={V_MARK_PATHS.left} fill={color} />
    <path d={V_MARK_PATHS.right} fill={color} />
  </svg>
);

interface LogoBadgeProps {
  className?: string;
  bladeColor?: string;
  discColor?: string;
}

/** The full official lockup: crimson V centred on the warm cream disc. */
export const LogoBadge: React.FC<LogoBadgeProps> = ({
  className = 'w-9 h-9',
  bladeColor = '#E8002D',
  discColor = '#F3EBDD',
}) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Valliance Studio logo">
    <circle cx="50" cy="50" r="50" fill={discColor} />
    <g transform="translate(19.5 27.5) scale(0.1055)">
      <path d={V_MARK_PATHS.left} fill={bladeColor} />
      <path d={V_MARK_PATHS.right} fill={bladeColor} />
    </g>
  </svg>
);

interface LogoLockupProps {
  className?: string;
  /** 'light' for dark backgrounds, 'dark' for cream backgrounds */
  tone?: 'light' | 'dark';
  compact?: boolean;
}

/** Badge + VALLIANCE STUDIO wordmark in the brand geometric type. */
export const LogoLockup: React.FC<LogoLockupProps> = ({ className = '', tone = 'light', compact = false }) => (
  <span className={`inline-flex items-center gap-3 ${className}`}>
    <LogoBadge className={compact ? 'w-8 h-8' : 'w-10 h-10'} />
    <span className="flex flex-col leading-none">
      <span
        className={`font-display font-black tracking-[-0.02em] uppercase ${
          compact ? 'text-base' : 'text-lg'
        } ${tone === 'light' ? 'text-[#f7f3eb]' : 'text-[#14100c]'}`}
      >
        Valliance
      </span>
      <span
        className={`font-mono uppercase tracking-[0.32em] mt-1 ${
          compact ? 'text-[8px]' : 'text-[9px]'
        } ${tone === 'light' ? 'text-[#a79e8f]' : 'text-[#8a7f6d]'}`}
      >
        Studio
      </span>
    </span>
  </span>
);
