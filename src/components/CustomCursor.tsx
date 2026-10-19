import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState<'default' | 'hover' | 'project' | 'drag' | 'active'>('default');

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(-100, springConfig);
  const cursorY = useSpring(-100, springConfig);

  useEffect(() => {
    // Only enable on desktop with fine pointer
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible((prev) => (prev ? prev : true));
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('[data-cursor]');
      if (interactive) {
        const type = interactive.getAttribute('data-cursor');
        const text = interactive.getAttribute('data-cursor-text') || '';
        setCursorText(text);

        if (type === 'project') setCursorVariant('project');
        else if (type === 'drag') setCursorVariant('drag');
        else if (type === 'active') setCursorVariant('active');
        else setCursorVariant('hover');
      } else {
        const isClickable = target.closest('button, a, input, textarea, select, [role="button"]');
        if (isClickable) {
          setCursorVariant('hover');
          setCursorText('');
        } else {
          setCursorVariant('default');
          setCursorText('');
        }
      }
    };

    window.addEventListener('mouseover', handleElementHover);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseover', handleElementHover);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block overflow-hidden">
      {/* Outer Ring / Aura */}
      <motion.div
        className="fixed top-0 left-0 rounded-full flex items-center justify-center pointer-events-none"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: cursorVariant === 'project' ? 84 : cursorVariant === 'hover' ? 48 : cursorVariant === 'drag' ? 64 : 14,
          height: cursorVariant === 'project' ? 84 : cursorVariant === 'hover' ? 48 : cursorVariant === 'drag' ? 64 : 14,
          backgroundColor:
            cursorVariant === 'project'
              ? 'rgba(232, 0, 45, 0.95)'
              : cursorVariant === 'hover'
              ? 'rgba(232, 0, 45, 0.2)'
              : cursorVariant === 'drag'
              ? 'rgba(255, 255, 255, 0.2)'
              : 'rgba(232, 0, 45, 0.8)',
          borderColor: cursorVariant === 'hover' ? '#e8002d' : 'transparent',
          borderWidth: cursorVariant === 'hover' ? 1 : 0,
          backdropFilter: cursorVariant === 'project' ? 'none' : 'blur(2px)',
        }}
        transition={{ type: 'spring', damping: 22, stiffness: 300 }}
      >
        {cursorText && (
          <span className="font-mono text-[10px] font-bold tracking-widest text-[#fff6ec] uppercase select-none">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Center pinpoint */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-[#e8002d] rounded-full pointer-events-none"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: cursorVariant === 'project' ? 0 : 1,
          scale: cursorVariant === 'hover' ? 0.5 : 1,
        }}
      />
    </div>
  );
};
