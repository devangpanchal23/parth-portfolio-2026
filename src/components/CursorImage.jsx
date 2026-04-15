import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useMousePosition } from '../hooks/useMousePosition';

export default function CursorImage({ imageUrl }) {
  const cursorRef = useRef(null);
  const mousePosition = useMousePosition();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Reveal cursor only when mouse moves
    const handleMouseMove = () => {
      if (!isVisible) setIsVisible(true);
      window.removeEventListener('mousemove', handleMouseMove);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isVisible]);

  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;

    // Use GSAP ticker and quickTo for smooth lerp effect
    gsap.set(el, { xPercent: -50, yPercent: -50 });

    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });
    const scaleTo = gsap.quickTo(el, "scale", { duration: 0.4, ease: "power3.out" });
    const rotateTo = gsap.quickTo(el, "rotation", { duration: 0.4, ease: "power3.out" });

    let lastX = window.innerWidth / 2;
    let lastY = window.innerHeight / 2;

    const update = () => {
      const { x, y } = mousePosition.current;
      
      // Calculate delta for scaling & rotation
      const deltaX = x - lastX;
      const deltaY = y - lastY;
      const velocity = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      // Scale slightly when moving fast, max scale 1.15
      const scale = Math.min(1 + velocity * 0.004, 1.15);
      
      // Subtle rotation proportional to X movement
      const rotation = deltaX * 0.05;

      xTo(x);
      yTo(y);
      scaleTo(scale);
      rotateTo(rotation);

      lastX = x;
      lastY = y;
    };

    gsap.ticker.add(update);

    return () => {
      gsap.ticker.remove(update);
    };
  }, [mousePosition]);

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.8s ease-in-out',
        mixBlendMode: 'difference'
      }}
    >
      <img 
        src={imageUrl} 
        alt="Cinematic Lens" 
        style={{
          width: '400px',
          height: '400px',
          objectFit: 'cover',
          borderRadius: '24px',
          filter: 'grayscale(15%) contrast(110%) brightness(0.9)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}
      />
    </div>
  );
}
