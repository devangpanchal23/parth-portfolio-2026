import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useCustomCursor } from '../hooks/useCustomCursor';

const CustomCursor = () => {
  const { cursorRef } = useCustomCursor(true);

  return (
    <div
      ref={cursorRef}
      aria-hidden
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[100] opacity-0 transition-opacity duration-300 ease-out"
      style={{
        width: 'var(--cursor-size, 100px)',
        height: 'var(--cursor-size, 100px)',
        // Glassmorphism effect
        background: 'rgba(255, 255, 255, 0.04)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '2px solid rgba(255, 255, 255, 0.95)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
        mixBlendMode: 'normal',
        // center transform origin; actual positioning applied in JS using translate3d
        transform: 'translate3d(-50%, -50%, 0) scale(0)',
        willChange: 'transform, opacity',
        transition: 'opacity 260ms ease, box-shadow 260ms ease',
      }}
    >
      {/* Arrow icon in center (slight rotation) */}
      <div className="absolute inset-0 flex items-center justify-center">
        <ArrowUpRight
          size={20}
          strokeWidth={1.6}
          style={{ transform: 'rotate(45deg)', color: '#fff' }}
        />
      </div>

      {/* Subtle inner radial glow */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          opacity: 0.22,
          background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.18) 0%, transparent 60%)',
          mixBlendMode: 'screen',
        }}
      />
    </div>
  );
};

export default CustomCursor;
