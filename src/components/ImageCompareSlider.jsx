import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import './ImageCompareSlider.css';

export default function ImageCompareSlider({ beforeImage, afterImage, alt = 'comparison' }) {
  const containerRef = useRef(null);
  
  // Motion value tracking the slider's percentage position (0 to 100)
  const sliderPosition = useMotionValue(50);
  
  // Spring configuration for silky smooth, cinematic snapping and trailing
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const smoothSliderPosition = useSpring(sliderPosition, springConfig);

  // Derive clipPath for the "After" image. 
  // 'inset(0% 0% 0% X%)' clips the left side. So "Before" (Raw) shows on the left, "After" (Graded) on the right.
  const clipPath = useTransform(
    smoothSliderPosition,
    (val) => `inset(0% 0% 0% ${val}%)`
  );

  // Derive position for the handle line natively
  const handleLeft = useTransform(smoothSliderPosition, (val) => `${val}%`);

  const handlePointerDown = (e) => {
    if (!containerRef.current) return;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (err) {}
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e) => {
    if (!containerRef.current) return;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      updatePosition(e.clientX);
    }
  };

  const handlePointerUp = (e) => {
    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch (err) {}
  };

  const updatePosition = (clientX) => {
    const rect = containerRef.current.getBoundingClientRect();
    let x = (clientX - rect.left) / rect.width;
    x = Math.max(0, Math.min(1, x)); // clamp between 0 and 1
    sliderPosition.set(x * 100);
  };

  // Keyboard accessibility for ADA compliance
  const handleKeyDown = (e) => {
    const step = 5; // 5%
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      sliderPosition.set(Math.max(0, sliderPosition.get() - step));
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      sliderPosition.set(Math.min(100, sliderPosition.get() + step));
    } else if (e.key === 'Home') {
      e.preventDefault();
      sliderPosition.set(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      sliderPosition.set(100);
    }
  };

  return (
    <div
      className="image-compare"
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={{ touchAction: 'none' }} // strictly prevents browser native scrolling during swipe
    >
      {/* Underlying Frame (Before) */}
      <img
        src={beforeImage}
        alt={`${alt} before`}
        className="ic-image ic-before"
        draggable={false}
        onDragStart={(e) => e.preventDefault()}
      />

      {/* Frame On Top (After), revealed based on clipPath */}
      <motion.img
        src={afterImage}
        alt={`${alt} after`}
        className="ic-image ic-after"
        style={{ clipPath, WebkitClipPath: clipPath }}
        draggable={false}
        onDragStart={(e) => e.preventDefault()}
      />

      {/* Interactable Drag Handle */}
      <motion.div
        className="ic-handle"
        style={{ left: handleLeft }}
        role="slider"
        tabIndex={0}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(sliderPosition.get())}
        aria-label="Before after slider"
        onKeyDown={handleKeyDown}
      >
        <div className="ic-line" />
        <div className="ic-knob">
          {/* Left Arrow */}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {/* Right Arrow */}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </motion.div>

      <div className="ic-label ic-label-left">RAW</div>
      <div className="ic-label ic-label-right">GRADED</div>
    </div>
  );
}
