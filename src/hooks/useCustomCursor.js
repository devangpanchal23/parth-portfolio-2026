import { useRef, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

// Lerp function for smooth interpolation
const lerp = (start, end, factor) => {
  return start + (end - start) * factor;
};

export const useCustomCursor = (isActive = false) => {
  const cursorRef = useRef(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const targetPositionRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef(null);
  const isActiveRef = useRef(isActive);
  const scaleRef = useRef(0); // current scale
  const targetScaleRef = useRef(0); // target scale starts at 0 (hidden initially)
  const defaultSize = 80;
  const isHoveringRef = useRef(false);
  const isTouchDeviceRef = useRef(false);

  const location = useLocation();
  const animateRef = useRef(null);

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

    // Performance optimization: stop RAF loop when cursor is completely shrunk and stable
    const isScaleStable = Math.abs(scaleRef.current - targetScaleRef.current) < 0.001;
    const isPositionStable = Math.abs(positionRef.current.x - targetPositionRef.current.x) < 0.05 && 
                             Math.abs(positionRef.current.y - targetPositionRef.current.y) < 0.05;

    if (isScaleStable && isPositionStable && targetScaleRef.current === 0) {
      animationFrameRef.current = null;
      if (cursorRef.current) {
        cursorRef.current.style.display = 'none';
      }
    } else {
      if (animateRef.current) {
        animationFrameRef.current = requestAnimationFrame(animateRef.current);
      }
    }
  }, []);

  // Keep the animateRef updated with the callback reference
  useEffect(() => {
    animateRef.current = animate;
  }, [animate]);

  // Handle mouse enter - activate cursor for a specific element
  const handleMouseEnter = useCallback((el) => {
    if (!cursorRef.current || isTouchDeviceRef.current) return;

    // Determine desired size from element data attribute or default
    const size = (el && el.dataset && el.dataset.cursorSize) ? parseInt(el.dataset.cursorSize, 10) : defaultSize;
    cursorRef.current.style.setProperty('--cursor-size', `${size}px`);

    // Hide native cursor globally
    document.body.style.cursor = 'none';
    if (el && el.style) el.style.cursor = 'none';

    // Show custom cursor
    cursorRef.current.style.display = 'block';
    cursorRef.current.style.opacity = '1';
    cursorRef.current.style.pointerEvents = 'none';

    // Appear animation (scale from 0 -> 1)
    targetScaleRef.current = 1;

    isHoveringRef.current = true;
  }, []);

  // Handle mouse leave - deactivate cursor
  const handleMouseLeave = useCallback(() => {
    if (!cursorRef.current) return;

    // Restore native cursor globally
    document.body.style.cursor = '';
    try {
      const els = document.querySelectorAll('.cursor-hover');
      els.forEach((el) => { if (el && el.style) el.style.cursor = ''; });
    } catch {
      // ignore
    }

    // Fade out & Shrink
    cursorRef.current.style.opacity = '0';
    targetScaleRef.current = 0;

    isHoveringRef.current = false;
  }, []);

  // Route transition tracking - automatically reset cursor states
  useEffect(() => {
    handleMouseLeave();
  }, [location.pathname, handleMouseLeave]);

  // Setup event listeners when component mounts
  useEffect(() => {
    isActiveRef.current = isActive;

    const isCoarse = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
    if (!isActive || isCoarse) return;

    // Listen to actual touch events to handle hybrid device interaction cleanly
    const onTouchStart = () => {
      isTouchDeviceRef.current = true;
      handleMouseLeave();
    };
    window.addEventListener('touchstart', onTouchStart, { passive: true });

    // Instantly track coordinates onMouseMove without throttle for high refresh rate displays
    const onMouseMove = (e) => {
      if (isTouchDeviceRef.current) return;

      // Update absolute target position
      targetPositionRef.current = { x: e.clientX, y: e.clientY };

      // Detect hovered element
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

      // Start animation loop if not already running
      if (!animationFrameRef.current) {
        if (cursorRef.current) {
          cursorRef.current.style.display = 'block';
        }
        if (animateRef.current) {
          animationFrameRef.current = requestAnimationFrame(animateRef.current);
        }
      }
    };

    // Keep hover state synchronized when page scrolls/resizes under a stationary pointer
    const onScrollOrResize = () => {
      if (isTouchDeviceRef.current) return;

      const x = targetPositionRef.current.x;
      const y = targetPositionRef.current.y;

      if (x === 0 && y === 0) return;

      const el = document.elementFromPoint(x, y);
      const hoveredEl = el && el.closest ? el.closest('.cursor-hover') : null;

      if (hoveredEl) {
        if (!isHoveringRef.current) {
          handleMouseEnter(hoveredEl);
        }
      } else {
        if (isHoveringRef.current) {
          handleMouseLeave();
        }
      }

      // Ensure cursor matches viewport position during scroll and updates scale/opacity
      if (!animationFrameRef.current) {
        if (cursorRef.current) {
          cursorRef.current.style.display = 'block';
        }
        if (animateRef.current) {
          animationFrameRef.current = requestAnimationFrame(animateRef.current);
        }
      }
    };

    const onMouseLeaveWindow = () => {
      handleMouseLeave();
    };

    document.addEventListener('mousemove', onMouseMove);
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);
    document.addEventListener('mouseleave', onMouseLeaveWindow);

    // Cleanup
    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
      document.removeEventListener('mouseleave', onMouseLeaveWindow);
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
