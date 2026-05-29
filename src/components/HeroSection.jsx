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
const SPAWN_DISTANCE = 160; // Pixels distance before spawning next image (increased from 90 to reduce frequency)

const HeroSection = ({ isPreloaderDone = true }) => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subtextRef = useRef(null);
  const poolRefs = useRef([]);
  const navRef = useRef(null);
  const heroCursorRef = useRef(null);

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
    if (!isPreloaderDone) {
      gsap.set([headingRef.current, subtextRef.current], { opacity: 0 });
      if (navRef.current) {
        gsap.set(navRef.current.querySelectorAll('.nav-anim-item'), { opacity: 0 });
      }
      return;
    }

    const ctx = gsap.context(() => {
      // Main Heading reveal - Progressive Character Reveal with Cinematic Blur
      const headingTl = gsap.timeline({ delay: 0.1 });
      
      // Instantly make container visible so we can reveal individual characters
      gsap.set(headingRef.current, { opacity: 1, y: 0, scale: 1 });
      
      const chars = headingRef.current.querySelectorAll('.char-item');
      
      headingTl.fromTo(chars, 
        { 
          opacity: 0, 
          y: 60, 
          scale: 0.85, 
          rotate: 4,
          filter: 'blur(12px)',
          transformOrigin: 'left top'
        }, 
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          rotate: 0,
          filter: 'blur(0px)', 
          duration: 1.8, 
          stagger: 0.05, 
          ease: 'expo.out' 
        }
      )
      // Subtle pulse on the main header wrapper to align with the original dynamic
      .to(headingRef.current, { scale: 1.05, duration: 0.8, ease: 'power2.out' }, 0.2)
      .to(headingRef.current, { scale: 1, duration: 1.0, ease: 'power3.inOut' });

      // Navigation reveal (Staggered Pulse: 1 -> 1.08 -> 1)
      if (navRef.current) {
        const navItems = navRef.current.querySelectorAll('.nav-anim-item');
        navItems.forEach((item, i) => {
          const itemTl = gsap.timeline({ delay: 0.8 + i * 0.1 });
          itemTl.fromTo(item, 
            { opacity: 0, scale: 1, y: -10 }, 
            { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
          )
          .to(item, { scale: 1.08, duration: 0.4, ease: 'power2.out' }, 0.2)
          .to(item, { scale: 1, duration: 0.6, ease: 'power2.inOut' });
        });
      }

      // Subtext reveal
      gsap.from(subtextRef.current, {
        opacity: 0,
        y: 20,
        duration: 1.5,
        ease: 'expo.out',
        delay: 1.4,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isPreloaderDone]);

  /* ── Cinematic Image Trail Logic ───────────────────────────── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Disable custom cursor on touch/coarse pointer devices
    const isCoarse = (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(pointer: coarse)').matches) || (typeof window !== 'undefined' && 'ontouchstart' in window);

    // Initialize initial mouse position to center of section in viewport coordinates
    const rect = section.getBoundingClientRect();
    smoothMouse.current = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    lastSpawn.current = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };

    const lerp = (a, b, n) => (1 - n) * a + n * b;
    const distance = (x1, y1, x2, y2) => Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

    const onMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      mouse.current.isActive = true;

      // Smart Hover: Hide hero custom cursor when hovering interactive elements to let global cursor dominate
      if (heroCursorRef.current && !isCoarse && isPreloaderDone) {
        const isHoveringInteractive = e.target && e.target.closest && e.target.closest('.cursor-hover, a, button');
        heroCursorRef.current.style.opacity = isHoveringInteractive ? '0' : '1';
      }
    };

    const onMouseLeave = () => {
      mouse.current.isActive = false;
      if (heroCursorRef.current) {
        heroCursorRef.current.style.opacity = '0';
      }
    };

    const spawnImage = (x, y, velocityX, velocityY) => {
      const el = poolRefs.current[currentIndex.current];
      if (!el) return;

      const bRect = section.getBoundingClientRect();
      const localX = x - bRect.left;
      const localY = y - bRect.top;

      // Assign cinematic image
      const imgData = IMAGES[imgIndex.current];
      const imgNode = el.querySelector('img');
      imgNode.src = imgData.src;
      
      // Update cyclers
      imgIndex.current = (imgIndex.current + 1) % IMAGES.length;

      // Manage Z-Index stacking
      el.style.zIndex = globalZIndex.current++;

      // Randomize initial rotation for organic feel
      const rot = Math.random() * 16 - 8; // -8deg to 8deg
      
      // Calculate smooth inertia target inside local coordinate space
      const inertiaFactor = 0.8;
      const targetX = localX + velocityX * inertiaFactor;
      const targetY = localY + velocityY * inertiaFactor;

      // Cancel any ongoing animations on this recycled element
      gsap.killTweensOf(el);

      // Set instantaneous spawn state using local offsets
      gsap.set(el, {
        x: localX - el.offsetWidth / 2,
        y: localY - el.offsetHeight / 2,
        rotation: rot,
        scale: 0.5,
        opacity: 0,
      });

      // Phase 1: Reveal smoothly (longer duration for premium feel)
      gsap.to(el, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'power2.out',
      });

      // Phase 2: Inertia drift (slower, longer cinematic glide)
      gsap.to(el, {
        x: targetX - el.offsetWidth / 2,
        y: targetY - el.offsetHeight / 2,
        duration: 2.4,
        ease: 'power3.out',
      });

      // Phase 3: Dissolve (visible longer before fading out smoothly)
      gsap.to(el, {
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        delay: 1.2,
        ease: 'power2.inOut',
      });

      // Advance pool pointer
      currentIndex.current = (currentIndex.current + 1) % POOL_SIZE;
    };

    const tick = () => {
      // Compute velocity for inertia
      const prevX = smoothMouse.current.x;
      const prevY = smoothMouse.current.y;

      // Fluid lerping (reduced from 0.12 for weightier, smoother response)
      smoothMouse.current.x = lerp(smoothMouse.current.x, mouse.current.x, 0.08);
      smoothMouse.current.y = lerp(smoothMouse.current.y, mouse.current.y, 0.08);

      const velocityX = smoothMouse.current.x - prevX;
      const velocityY = smoothMouse.current.y - prevY;

      // Update custom circular cursor position smoothly (independent of movement check so it lerps to a soft stop)
      if (heroCursorRef.current && !isCoarse && isPreloaderDone) {
        heroCursorRef.current.style.transform = `translate3d(${smoothMouse.current.x}px, ${smoothMouse.current.y}px, 0) translate(-50%, -50%)`;
      }

      if (mouse.current.isActive) {
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
      className="relative w-full h-[100vh] bg-black overflow-hidden flex items-center justify-center cursor-none"
    >
      {/* --- Premium Custom Circular Cursor --- */}
      <div
        ref={heroCursorRef}
        className="fixed pointer-events-none rounded-full bg-white opacity-0 transition-opacity duration-300 ease-out z-[2500] hidden md:block"
        style={{
          width: '10px',
          height: '10px',
          willChange: 'transform, opacity',
        }}
      />
      {/* --- Dynamic Image Pool --- */}
      <div className="absolute inset-0 pointer-events-none z-[1500]">
        {Array.from({ length: POOL_SIZE }).map((_, i) => (
          <div
            key={i}
            ref={(el) => (poolRefs.current[i] = el)}
            className="absolute top-0 left-0 w-[245px] h-[170px] opacity-0 overflow-hidden bg-zinc-900 shadow-xl"
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
          {"Parth Panchal".split(" ").map((word, wordIndex, arr) => (
            <span key={wordIndex} className="inline-block whitespace-nowrap">
              {word.split("").map((char, charIndex) => (
                <span
                  key={charIndex}
                  className="inline-block char-item opacity-0"
                  style={{ opacity: 0, willChange: 'transform, opacity, filter' }}
                >
                  {char}
                </span>
              ))}
              {wordIndex < arr.length - 1 && (
                <span className="inline-block char-item opacity-0" style={{ opacity: 0, willChange: 'transform, opacity, filter' }}>&nbsp;</span>
              )}
            </span>
          ))}
        </h1>
      </div>

      {/* --- Center Bottom Tagline --- */}
      <div className="absolute bottom-10 md:bottom-16 left-1/2 -translate-x-1/2 z-[1000] pointer-events-none select-none w-full text-center px-4">
        <p
          ref={subtextRef}
          className="text-xs md:text-sm lg:text-base uppercase tracking-[0.6em] md:tracking-[0.8em] font-medium text-white/90 leading-[2]"
        >
          Cinematic Storytelling <br />
          through Precision Editing
        </p>
      </div>

      {/* --- Top Navigation UI --- */}
      <div 
        ref={navRef}
        className="absolute top-0 left-0 w-full z-[2000] pointer-events-none p-6 md:p-10 flex justify-between items-start mix-blend-difference text-xs md:text-sm tracking-widest font-medium uppercase text-gray-200"
      >
        {/* LEFT */}
        <div className="flex flex-col gap-1 w-[30%] text-left nav-anim-item">
          <span className="text-white">PARTH PANCHAL</span>
          <span className="text-white/40">VIDEO EDITOR</span>
        </div>
        
        {/* CENTER */}
        <div className="flex justify-center gap-8 md:gap-12 w-[40%] text-white pointer-events-auto">
          <a href="#work" className="hover:text-white transition-colors duration-300 nav-anim-item cursor-hover" data-cursor-size="60">WORK</a>
          <a href="#about" className="hover:text-white transition-colors duration-300 nav-anim-item cursor-hover" data-cursor-size="60">ABOUT</a>
          <a href="#contact" className="hover:text-white transition-colors duration-300 nav-anim-item cursor-hover" data-cursor-size="60">CONTACT</a>
        </div>

        {/* RIGHT */}
        <div className="w-[30%] text-right text-white nav-anim-item">
          <span>©2026</span>
        </div>
      </div>

      {/* --- Vignette --- */}
      <div className="absolute inset-0 pointer-events-none z-[500] bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
    </section>
  );
};

export default HeroSection;
