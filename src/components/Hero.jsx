import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

// Mixed aspect ratios: Portrait (9:16), Landscape (16:9), Square (1:1)
const images = [
  'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=540&h=960&fit=crop', // 9:16
  'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=960&h=540&fit=crop', // 16:9
  'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=800&h=800&fit=crop', // 1:1
  'https://images.unsplash.com/photo-1515238152791-38cadbf34645?w=540&h=960&fit=crop', // 9:16
  'https://images.unsplash.com/photo-1542385151-efd9000785a0?w=960&h=540&fit=crop', // 16:9
  'https://images.unsplash.com/photo-1505322022379-7c3353ee6291?w=800&h=800&fit=crop', // 1:1
];

const Hero = () => {
  const containerRef = useRef(null);

  // Preload Images
  useEffect(() => {
    images.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let lastMousePos = null;
    let activeImages = [];
    let imgIndex = 0;
    let zIndexCounter = 1;
    let currentThreshold = 100; // dynamic threshold between 80 and 120
    let ticking = false;

    const spawnImage = (x, y) => {
      const img = document.createElement('img');
      img.src = images[imgIndex % images.length];
      imgIndex++;
      
      // Responsive sizing: max-width 35vw or 400px
      const targetWidth = window.innerWidth > 768 
        ? Math.floor(Math.random() * 50 + 300) 
        : Math.floor(Math.random() * 50 + 200);
        
      img.className = 'absolute object-cover rounded-md pointer-events-none will-change-transform';
      img.style.width = `${targetWidth}px`;
      // Max image size constraint
      img.style.maxWidth = 'min(35vw, 400px)';
      // Visual design rule: Box shadow for layered depth
      img.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
      img.style.left = '0px';
      img.style.top = '0px';
      img.style.zIndex = zIndexCounter++;

      container.appendChild(img);

      // Organic rotation between -5deg and +5deg
      const rotation = Math.random() * 10 - 5;

      // STARTING POSITIONS (GSAP)
      gsap.set(img, { 
        x: x, 
        y: y, 
        xPercent: -50, 
        yPercent: -50, 
        scale: 0.7, 
        opacity: 0,
        rotation: rotation
      });

      // ENFORCING FIFO (Max 10 Images)
      if (activeImages.length >= 10) {
        const oldest = activeImages.shift();
        gsap.killTweensOf(oldest);
        gsap.to(oldest, {
          opacity: 0,
          scale: 0.9,
          duration: 0.25,
          ease: "power2.out",
          onComplete: () => {
            if (oldest.parentNode) oldest.parentNode.removeChild(oldest);
          }
        });
      }

      activeImages.push(img);

      // CINEMATIC ENTRY TIMELINE (Pop-and-Settle)
      const tl = gsap.timeline();
      
      // Opacity fade 0 -> 1 in 150ms
      tl.to(img, { opacity: 1, duration: 0.15 }, 0);
      
      // Scale pop overshoot using back.out(1.7), handles the scale pop automatically
      tl.to(img, { 
        scale: 1, 
        duration: 0.6, 
        ease: "back.out(1.7)" 
      }, 0);

      // EXIT ANIMATION lifecycle (~1200ms delay)
      gsap.to(img, {
        opacity: 0,
        scale: 0.9,
        duration: 0.4,
        delay: 1.2, // Lifespan delay
        ease: "power2.out",
        onComplete: () => {
          if (img.parentNode) img.parentNode.removeChild(img);
          const index = activeImages.indexOf(img);
          if (index > -1) activeImages.splice(index, 1);
        }
      });
      
      // randomize next spawn threshold slightly
      currentThreshold = Math.random() * 40 + 80;
    };

    const handleMouseMove = (e) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const rect = container.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          if (!lastMousePos) {
            spawnImage(x, y);
            lastMousePos = { x, y };
          } else {
            const dist = Math.hypot(x - lastMousePos.x, y - lastMousePos.y);
            if (dist > currentThreshold) {
              spawnImage(x, y);
              lastMousePos = { x, y };
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      activeImages.forEach(img => gsap.killTweensOf(img));
    };
  }, []);

  return (
    <section 
      className="relative w-full h-[100dvh] flex items-center justify-center overflow-hidden"
      style={{
        backgroundColor: '#000000', // Pure black as requested
      }}
    >
      <div 
        ref={containerRef} 
        className="absolute inset-0 z-0 pointer-events-none"
      />
      
      <h1 className="name tracking-tight text-center drop-shadow-xl z-10">
        Parth Panchal
      </h1>
    </section>
  );
};

export default Hero;

