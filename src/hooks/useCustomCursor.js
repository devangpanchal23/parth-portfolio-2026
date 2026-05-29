import { useRef, useEffect, useCallback } from 'react';

// Lerp function for smooth interpolation
const lerp = (start, end, factor) => {
  return start + (end - start) * factor;
};

// Performance optimization: throttle mouse events
const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
};

export const useCustomCursor = (isActive = false) => {
  const cursorRef = useRef(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const targetPositionRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef(null);
  const isActiveRef = useRef(isActive);
  const scaleRef = useRef(0); // current scale
  const targetScaleRef = useRef(1); // target scale for lerp
  const defaultSize = 80;

  // Update ref when isActive changes
  useEffect(() => {
    isActiveRef.current = isActive;
  }, [isActive]);

  // Smooth animation loop using requestAnimationFrame
  const animate = useCallback(() => {
    // Lerp position for smooth trailing effect
    const lerpFactor = 0.15; // trail amount
    positionRef.current.x = lerp(positionRef.current.x, targetPositionRef.current.x, lerpFactor);
    positionRef.current.y = lerp(positionRef.current.y, targetPositionRef.current.y, lerpFactor);

    // Lerp scale for appearing/hover effect
    scaleRef.current = lerp(scaleRef.current, targetScaleRef.current, 0.18);

    // Update cursor element position and scale (use translate3d for GPU accel)
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0) translate(-50%, -50%) scale(${scaleRef.current})`;
    }

    // Continue animation loop while visible
    animationFrameRef.current = requestAnimationFrame(animate);
  }, []);

  // (Movement handled via delegated document mousemove listener below)

  // Handle mouse enter - activate cursor for a specific element
  const isHoveringRef = useRef(false);

  const handleMouseEnter = useCallback((el) => {
    if (!cursorRef.current) return;

    // Determine desired size from element data attribute or default
    const size = (el && el.dataset && el.dataset.cursorSize) ? parseInt(el.dataset.cursorSize, 10) : defaultSize;
    cursorRef.current.style.setProperty('--cursor-size', `${size}px`);

    // Hide native cursor only for the hovered element
    if (el && el.style) el.style.cursor = 'none';

    // Show custom cursor
    cursorRef.current.style.opacity = '1';
    cursorRef.current.style.pointerEvents = 'none';

    // Appear animation (scale from 0 -> 1)
    targetScaleRef.current = 1;

    isHoveringRef.current = true;
  }, []);

  // Handle mouse leave - deactivate cursor
  const handleMouseLeave = useCallback(() => {
    if (!cursorRef.current) return;

    // Restore native cursor for all cursor-hover elements
    try {
      const els = document.querySelectorAll('.cursor-hover');
      els.forEach((el) => { if (el && el.style) el.style.cursor = ''; });
    } catch (err) {
      // ignore
    }

    // Fade out
    cursorRef.current.style.opacity = '0';

    // Shrink away
    targetScaleRef.current = 0;

    isHoveringRef.current = false;
  }, []);

  // Setup event listeners when component mounts
  useEffect(() => {
    isActiveRef.current = isActive;

    // Disable custom cursor on touch devices / coarse pointers
    const isCoarse = (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(pointer: coarse)').matches) || (typeof window !== 'undefined' && 'ontouchstart' in window);
    if (!isActive || isCoarse) return;

    // Use event delegation: listen to document mousemove and detect .cursor-hover via closest
    const onDocMove = throttle((e) => {
      // update target position
      targetPositionRef.current = { x: e.clientX, y: e.clientY };

      // detect hovered element
      const el = e.target && e.target.closest ? e.target.closest('.cursor-hover') : null;
      if (el) {
        if (!isHoveringRef.current) {
          handleMouseEnter(el);
        }
      } else {
        if (isHoveringRef.current) {
          handleMouseLeave();
        }
      }

      // start animation loop
      if (!animationFrameRef.current) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    }, 16);

    document.addEventListener('mousemove', onDocMove);

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', onDocMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isActive, handleMouseEnter, handleMouseLeave, animate]);

  // Handle hover state changes
  const setHoverScale = useCallback((scale) => {
    targetScaleRef.current = scale;
  }, []);

  return {
    cursorRef,
    handleMouseEnter,
    handleMouseLeave,
    setHoverScale
  };
};
