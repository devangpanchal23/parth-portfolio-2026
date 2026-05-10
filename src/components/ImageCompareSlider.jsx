import React, { useRef, useEffect, useCallback } from 'react';
import './ImageCompareSlider.css';

const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));

export default function ImageCompareSlider({ beforeImage, afterImage, alt = 'comparison' }) {
  const containerRef = useRef(null);
  const afterImageRef = useRef(null);
  const handleRef = useRef(null);
  const rafRef = useRef(null);
  const targetRef = useRef(0.5);
  const currentRef = useRef(0.5);

  const updateUI = useCallback(() => {
    const container = containerRef.current;
    const afterImage = afterImageRef.current;
    const handle = handleRef.current;
    if (!container || !afterImage || !handle) return;

    // smooth linear interpolation
    currentRef.current += (targetRef.current - currentRef.current) * 0.15;
    const pct = currentRef.current;

    // We use inset percentage format strictly to be perfectly compatible cross-browser.
    const clipString = `inset(0% 0% 0% ${pct * 100}%)`;
    afterImage.style.clipPath = clipString;
    afterImage.style.WebkitClipPath = clipString;
    handle.style.left = `${pct * 100}%`;
    handle.setAttribute('aria-valuenow', Math.round(pct * 100));

    // loop if there's still notable distance
    if (Math.abs(targetRef.current - currentRef.current) > 0.0001) {
      rafRef.current = requestAnimationFrame(updateUI);
    } else {
      rafRef.current = null;
    }
  }, []);

  const setPositionFromClientX = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clamp((clientX - rect.left) / rect.width, 0, 1);
    targetRef.current = x;

    // Kickstart animation loop if it's currently dormant
    if (!rafRef.current) rafRef.current = requestAnimationFrame(updateUI);
  }, [updateUI]);

  // Keyboard accessibility
  useEffect(() => {
    const el = handleRef.current;
    if (!el) return;
    const onKey = (e) => {
      const step = 0.05;
      if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
        targetRef.current = clamp(targetRef.current - step);
        if (!rafRef.current) rafRef.current = requestAnimationFrame(updateUI);
        e.preventDefault();
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        targetRef.current = clamp(targetRef.current + step);
        if (!rafRef.current) rafRef.current = requestAnimationFrame(updateUI);
        e.preventDefault();
      } else if (e.key === 'Home') {
        targetRef.current = 0;
        if (!rafRef.current) rafRef.current = requestAnimationFrame(updateUI);
        e.preventDefault();
      } else if (e.key === 'End') {
        targetRef.current = 1;
        if (!rafRef.current) rafRef.current = requestAnimationFrame(updateUI);
        e.preventDefault();
      }
    };
    el.addEventListener('keydown', onKey);
    return () => el.removeEventListener('keydown', onKey);
  }, [updateUI]);

  // Setup loop safely and accurately position at center
  useEffect(() => {
    targetRef.current = 0.5;
    currentRef.current = 0.5;
    if (!rafRef.current) rafRef.current = requestAnimationFrame(updateUI);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    }
  }, [updateUI]);

  return (
    <div
      className="image-compare"
      ref={containerRef}
      onPointerDown={(e) => {
        // Setting pointer capture locks events entirely to this div ensuring
        // maximum reliable stability even across drag outsides etc.
        try {
          if (e.currentTarget && e.currentTarget.setPointerCapture) {
            e.currentTarget.setPointerCapture(e.pointerId);
          }
        } catch (err) { }
        setPositionFromClientX(e.clientX);
      }}
      onPointerMove={(e) => {
        // Track move continuously if we hold the pointer capture
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
          setPositionFromClientX(e.clientX);
        }
      }}
      onPointerUp={(e) => {
        try {
          if (e.currentTarget.hasPointerCapture(e.pointerId)) {
            e.currentTarget.releasePointerCapture(e.pointerId);
          }
        } catch (err) { }
      }}
      onPointerCancel={(e) => {
        try {
          if (e.currentTarget.hasPointerCapture(e.pointerId)) {
            e.currentTarget.releasePointerCapture(e.pointerId);
          }
        } catch (err) { }
      }}
      style={{ touchAction: 'none' }} // strictly prevents browser native scrolling during swipe
    >
      {/* Underlying Raw Frame */}
      <img
        src={beforeImage}
        alt={`${alt} before`}
        className="ic-image ic-before"
        draggable={false}
        onDragStart={e => e.preventDefault()}
      />

      {/* Fully Graded Processed Frame On Top */}
      <img
        src={afterImage}
        alt={`${alt} after`}
        className="ic-image ic-after"
        ref={afterImageRef}
        draggable={false}
        onDragStart={e => e.preventDefault()}
      />

      {/* Interactable Drag Logic Center */}
      <div
        className="ic-handle"
        ref={handleRef}
        role="slider"
        tabIndex={0}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={50}
        aria-label="Before after slider"
      >
        <div className="ic-line" />
        <div className="ic-knob" />
      </div>

      <div className="ic-label ic-label-left">Raw</div>
      <div className="ic-label ic-label-right">Graded</div>
    </div>
  );
}
