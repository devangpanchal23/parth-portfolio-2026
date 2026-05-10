import React, { useEffect, useRef, useState } from 'react';

// Exact 15 continuous high-quality cinematic images from Unsplash
const IMAGES = [
  'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&q=80',
  'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80',
  'https://images.unsplash.com/photo-1601514930193-ee70edbf5af3?w=800&q=80',
  'https://images.unsplash.com/photo-1594464132338-7bbccf18d780?w=800&q=80',
  'https://images.unsplash.com/photo-1607519965306-6510cd57ba41?w=800&q=80',
  'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80',
  'https://images.unsplash.com/photo-1518131672697-613becd4fab5?w=800&q=80',
  'https://images.unsplash.com/photo-1585641774312-d96f4fc9dff1?w=800&q=80',
  'https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?w=800&q=80',
  'https://images.unsplash.com/photo-1522021140916-00ca89bfe033?w=800&q=80',
  'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&q=80',
  'https://images.unsplash.com/photo-1626808642875-0aa5454647b2?w=800&q=80',
  'https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?w=800&q=80',
  'https://images.unsplash.com/photo-1512411833503-4f0563459c7f?w=800&q=80',
  'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&q=80'
];

export const HeroImageSequence = () => {
  const [isClient, setIsClient] = useState(false);
  const containerRef = useRef(null);
  
  const imageRefs = useRef([]);
  const mouseRaw = useRef({ x: -1000, y: -1000 }); 
  const masterSmooth = useRef({ x: -1000, y: -1000 }); // Independent master lerp anchor
  
  // Permanent mathematical scatter logic explicitly providing tight offsets within ~100px of center
  const staticOffsets = useRef(IMAGES.map((_, i) => {
    const angle = i * 137.5 * (Math.PI / 180); 
    const radius = 25 + Math.random() * 55; 
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
      rot: (Math.random() - 0.5) * 8 // +/- 4 deg resting rotation
    };
  }));

  // Setup render targets internally. Using React refs ensures strictly 0 re-renders impacting app latency
  const opacities = useRef(IMAGES.map(() => 0));
  const scales = useRef(IMAGES.map(() => 0.95)); // Starting entry threshold (0.95 per req)
  const blurs = useRef(IMAGES.map(() => 10));

  const globalIndex = useRef(0);
  const rafId = useRef(null);
  const isMobile = useRef(false);

  useEffect(() => {
    setIsClient(true);
    isMobile.current = window.innerWidth < 768;

    IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    const handleResize = () => {
      isMobile.current = window.innerWidth < 768;
    };

    const handleMouseMove = (e) => {
      if (isMobile.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const localX = e.clientX - rect.left;
      const localY = e.clientY - rect.top;

      if (mouseRaw.current.x === -1000) {
        masterSmooth.current.x = localX;
        masterSmooth.current.y = localY;
      }
      mouseRaw.current = { x: localX, y: localY };
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Flow sequence loops infinitely across the stack every ~900ms pushing nodes logically backward into queue
    const loopInterval = setInterval(() => {
      globalIndex.current++;
    }, 1000); 

    const frameLoop = () => {
      if (!isMobile.current && mouseRaw.current.x !== -1000) {
        
        // Central delayed easing: prevents raw snapping to cursor completely, generating deep premium fluidity
        masterSmooth.current.x += (mouseRaw.current.x - masterSmooth.current.x) * 0.08;
        masterSmooth.current.y += (mouseRaw.current.y - masterSmooth.current.y) * 0.08;

        const time = Date.now() * 0.001;
        const activeLayers = isMobile.current ? 3 : 5;
        const intensity = isMobile.current ? 0.3 : 1; // Performance & visuals toned down for mobile hardware

        for (let i = 0; i < 15; i++) {
          let el = imageRefs.current[i];
          if (!el) continue;

          // Depth hierarchy logic dynamically resolves current slot
          let d = (globalIndex.current - i) % 15;
          if (d < 0) d += 15;

          // Inactive defaults perfectly mapped to exit transitions requested (scale=0.95)
          let targetOpacity = 0;
          let targetScale = 0.95; 
          let targetBlur = 10;
          
          if (d < activeLayers) {
            // Newest active image naturally blooms in -> (0.95 -> 1.0)
            if (d === 0) { targetOpacity = 0.95; targetScale = 1.0; targetBlur = 0; } 
            else if (d === 1) { targetOpacity = 0.70; targetScale = 0.99; targetBlur = 0; } 
            else if (d === 2) { targetOpacity = 0.50; targetScale = 0.98; targetBlur = 2; }
            else if (d === 3) { targetOpacity = 0.35; targetScale = 0.97; targetBlur = 4; }
            else if (d === 4) { targetOpacity = 0.15; targetScale = 0.96; targetBlur = 6; }
          }

          // Generate dynamic floating (breathing) effect directly satisfying "floating motion even when cursor stops"
          // Mapped uniquely to `i` so images float organically against each other rather than as a uniform un-natural block
          const floatX = Math.cos(time * 0.8 + i) * (8 * intensity); 
          const floatY = Math.sin(time * 1.2 + i * 0.5) * (8 * intensity); 
          const floatRot = Math.sin(time * 0.5 + i) * 3; // Premium ±3 deg micro-rotation variance

          const isEntering = targetOpacity > opacities.current[i];
          
          // Easing logic: Fade-in execution demands speed (~200ms entry) vs. fade-out requires elegance (~500ms exiting)
          // 0.15 heavily tracks fast entry. 0.04 trails slowly off resolving perfectly down to targets.
          const currentEasing = isEntering ? 0.15 : 0.04; 
          
          opacities.current[i] += (targetOpacity - opacities.current[i]) * currentEasing;
          scales.current[i] += (targetScale - scales.current[i]) * (currentEasing * 1.2);
          blurs.current[i] += (targetBlur - blurs.current[i]) * currentEasing;

          // Mathematical layer order locking guarantees fading-out images gracefully sit in the background
          let zIndex = 50 - d; 
          
          // Absolute X/Y coordinate construction + trigonometric float modifiers
          const trackX = masterSmooth.current.x + staticOffsets.current[i].x + floatX;
          const trackY = masterSmooth.current.y + staticOffsets.current[i].y + floatY;
          const rotate = staticOffsets.current[i].rot + floatRot;

          el.style.transform = `translate(${trackX}px, ${trackY}px) translate(-50%, -50%) scale(${scales.current[i]}) rotate(${rotate}deg)`;
          el.style.opacity = opacities.current[i];
          el.style.filter = `blur(${blurs.current[i]}px)`;
          el.style.zIndex = zIndex;
        }
      }
      rafId.current = requestAnimationFrame(frameLoop);
    };
    rafId.current = requestAnimationFrame(frameLoop);

    // Absolute zero leakage teardown logic
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(loopInterval);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  if (!isClient) return null;

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 z-50 pointer-events-none overflow-hidden" 
    >
      {IMAGES.map((src, i) => (
        <img
          key={i}
          ref={(el) => (imageRefs.current[i] = el)}
          src={src}
          alt={`cinematic-cluster-${i}`}
          className="absolute left-0 top-0 w-32 md:w-40 lg:w-[150px] aspect-[4/5] object-cover rounded-[12px] shadow-[0_15px_40px_rgba(0,0,0,0.5)] border border-white/5 opacity-0"
          style={{ willChange: 'transform, opacity, filter' }} 
        />
      ))}
    </div>
  );
};
