import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

/* ── Cinematic Image Config ────────────────────────────────────── */
const IMAGES = [
  { src: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80', aspect: '16/9' },
  { src: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&q=80', aspect: '4/3' },
  { src: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=800&q=80', aspect: '3/4' },
  { src: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&q=80', aspect: '16/9' },
  { src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80', aspect: '4/3' },
  { src: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80', aspect: '1/1' },
];

const POOL_SIZE = 20;
const SPAWN_DISTANCE = 90; // Pixels distance before spawning next image

const HeroSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subtextRef = useRef(null);
  const poolRefs = useRef([]);

  // State refs for the requestAnimationFrame loop
  const mouse = useRef({ x: 0, y: 0, isActive: false });
  const smoothMouse = useRef({ x: 0, y: 0 });
  const lastSpawn = useRef({ x: 0, y: 0 });
  const currentIndex = useRef(0);
  const imgIndex = useRef(0);
  const globalZIndex = useRef(10);
  const rafId = useRef(null);

  /* ── Entry Animations ──────────────────────────────────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main Heading reveal
      gsap.from(headingRef.current, {
        opacity: 0,
        scale: 0.95,
        y: 40,
        duration: 2,
        ease: 'expo.out',
        delay: 0.3,
      });

      // Subtext reveal
      gsap.from(subtextRef.current, {
        opacity: 0,
        y: 20,
        duration: 1.5,
        ease: 'expo.out',
        delay: 0.8,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* ── Cinematic Image Trail Logic ───────────────────────────── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Initialize initial mouse position to center of section
    const rect = section.getBoundingClientRect();
    smoothMouse.current = { x: rect.width / 2, y: rect.height / 2 };
    lastSpawn.current = { x: rect.width / 2, y: rect.height / 2 };

    const lerp = (a, b, n) => (1 - n) * a + n * b;
    const distance = (x1, y1, x2, y2) => Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

    const onMouseMove = (e) => {
      const bRect = section.getBoundingClientRect();
      mouse.current.x = e.clientX - bRect.left;
      mouse.current.y = e.clientY - bRect.top;
      mouse.current.isActive = true;
    };

    const onMouseLeave = () => {
      mouse.current.isActive = false;
    };

    const spawnImage = (x, y, velocityX, velocityY) => {
      const el = poolRefs.current[currentIndex.current];
      if (!el) return;

      // Assign cinematic image and aspect ratio
      const imgData = IMAGES[imgIndex.current];
      const imgNode = el.querySelector('img');
      imgNode.src = imgData.src;
      el.style.aspectRatio = imgData.aspect;
      
      // Update cyclers
      imgIndex.current = (imgIndex.current + 1) % IMAGES.length;

      // Manage Z-Index stacking
      el.style.zIndex = globalZIndex.current++;

      // Randomize initial rotation for organic feel
      const rot = Math.random() * 16 - 8; // -8deg to 8deg
      
      // Calculate smooth inertia target
      const inertiaFactor = 0.8;
      const targetX = x + velocityX * inertiaFactor;
      const targetY = y + velocityY * inertiaFactor;

      // Cancel any ongoing animations on this recycled element
      gsap.killTweensOf(el);

      // Set instantaneous spawn state
      gsap.set(el, {
        x: x - el.offsetWidth / 2,
        y: y - el.offsetHeight / 2,
        rotation: rot,
        scale: 0.5,
        opacity: 0,
      });

      // Phase 1: Reveal smoothly
      gsap.to(el, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: 'power2.out',
      });

      // Phase 2: Inertia drift
      gsap.to(el, {
        x: targetX - el.offsetWidth / 2,
        y: targetY - el.offsetHeight / 2,
        duration: 1.5,
        ease: 'power3.out',
      });

      // Phase 3: Dissolve
      gsap.to(el, {
        opacity: 0,
        scale: 0.85,
        duration: 0.6,
        delay: 0.7,
        ease: 'power2.inOut',
      });

      // Advance pool pointer
      currentIndex.current = (currentIndex.current + 1) % POOL_SIZE;
    };

    const tick = () => {
      if (mouse.current.isActive) {
        // Compute velocity for inertia
        const prevX = smoothMouse.current.x;
        const prevY = smoothMouse.current.y;

        // Fluid lerping
        smoothMouse.current.x = lerp(smoothMouse.current.x, mouse.current.x, 0.12);
        smoothMouse.current.y = lerp(smoothMouse.current.y, mouse.current.y, 0.12);

        const velocityX = smoothMouse.current.x - prevX;
        const velocityY = smoothMouse.current.y - prevY;

        const dist = distance(lastSpawn.current.x, lastSpawn.current.y, smoothMouse.current.x, smoothMouse.current.y);

        if (dist > SPAWN_DISTANCE) {
          // Multiply velocity by arbitrary factor for stronger visual inertia
          spawnImage(smoothMouse.current.x, smoothMouse.current.y, velocityX * 5, velocityY * 5);
          lastSpawn.current.x = smoothMouse.current.x;
          lastSpawn.current.y = smoothMouse.current.y;
        }
      }

      rafId.current = requestAnimationFrame(tick);
    };

    section.addEventListener('mousemove', onMouseMove);
    section.addEventListener('mouseleave', onMouseLeave);
    rafId.current = requestAnimationFrame(tick);

    return () => {
      section.removeEventListener('mousemove', onMouseMove);
      section.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[100vh] bg-black overflow-hidden flex items-center justify-center cursor-crosshair"
    >
      {/* --- Dynamic Image Pool --- */}
      <div className="absolute inset-0 pointer-events-none z-[10]">
        {Array.from({ length: POOL_SIZE }).map((_, i) => (
          <div
            key={i}
            ref={(el) => (poolRefs.current[i] = el)}
            className="absolute top-0 left-0 w-[clamp(140px,18vw,300px)] opacity-0 overflow-hidden bg-zinc-900"
            style={{ willChange: 'transform, opacity' }}
          >
            <img
              src=""
              alt=""
              className="w-full h-full object-cover select-none"
            />
          </div>
        ))}
      </div>

      {/* --- Center Text --- */}
      <div className="relative z-[1000] pointer-events-none select-none text-center">
        <h1
          ref={headingRef}
          className="text-[clamp(60px,15vw,220px)] font-black tracking-tighter leading-none text-white mix-blend-difference"
        >
          Parth Panchal
        </h1>
        <p
          ref={subtextRef}
          className="mt-6 text-[clamp(8px,1vw,12px)] uppercase tracking-[0.4em] font-bold text-white/40"
        >
          Cinematic Storytelling through Precision Editing
        </p>
      </div>

      {/* --- Corner UI --- */}
      <div className="absolute inset-0 z-[2000] pointer-events-none p-10 flex flex-col justify-between mix-blend-difference text-[10px] tracking-[0.2em] font-bold uppercase text-white/70">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <span>Parth Panchal</span>
            <span className="text-white/30">Video Editor</span>
          </div>
          <div className="flex gap-10">
            <a href="#work" className="pointer-events-auto hover:text-white transition-colors">Work</a>
            <a href="#about" className="pointer-events-auto hover:text-white transition-colors">About</a>
            <a href="#contact" className="pointer-events-auto hover:text-white transition-colors">Contact</a>
          </div>
        </div>
        <div className="flex justify-between items-end">
          <span>Based Worldwide</span>
          <span>©2026</span>
        </div>
      </div>

      {/* --- Vignette --- */}
      <div className="absolute inset-0 pointer-events-none z-[500] bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
    </section>
  );
};

export default HeroSection;
