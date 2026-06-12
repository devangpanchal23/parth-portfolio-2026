import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import EmailModal from './EmailModal';

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

/* ── High-Performance Interactive Count Component ─────────────── */
const AnimatedCounter = ({ end, duration = 1.5, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTimestamp = null;
          const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };
          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [end, duration]);

  return <span ref={elementRef}>{count}{suffix}</span>;
};

const HeroSection = ({ isPreloaderDone = true }) => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subtextRef = useRef(null);
  const poolRefs = useRef([]);
  const navRef = useRef(null);
  const heroCursorRef = useRef(null);
  const imagePoolContainerRef = useRef(null);
  const mobileHeadingRef = useRef(null);

  // State refs for the requestAnimationFrame loop
  const mouse = useRef({ x: 0, y: 0, isActive: false });
  const smoothMouse = useRef({ x: 0, y: 0 });
  const lastSpawn = useRef({ x: 0, y: 0 });
  const currentIndex = useRef(0);
  const imgIndex = useRef(0);
  const globalZIndex = useRef(10);
  const rafId = useRef(null);

  // High-performance animation and layout references
  const sectionRect = useRef({ left: 0, top: 0, width: 0, height: 0 });
  const smoothParallax = useRef({ x: 0, y: 0 });
  const isFirstMove = useRef(true);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Toggle body overflow hidden on menu state toggles to prevent underlying page scrolling
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    if (isMenuOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  const menuVariants = {
    initial: { y: "-100%" },
    animate: { 
      y: 0,
      transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] }
    },
    exit: { 
      y: "-100%",
      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  /* ── Entry Animations ──────────────────────────────────────── */
  useEffect(() => {
    if (!isPreloaderDone) {
      gsap.set([headingRef.current, mobileHeadingRef.current, subtextRef.current], { opacity: 0 });
      if (navRef.current) {
        gsap.set(navRef.current.querySelectorAll('.nav-anim-item'), { opacity: 0 });
      }
      return;
    }

    const ctx = gsap.context(() => {
      // Main Heading reveal - Progressive Character Reveal with Cinematic Blur (No transforms)
      const headingTl = gsap.timeline({ delay: 0.1 });
      
      // Instantly make container visible so we can reveal individual characters
      gsap.set([headingRef.current, mobileHeadingRef.current], { opacity: 1 });
      
      const chars = document.querySelectorAll('.char-item');
      
      headingTl.fromTo(chars, 
        { 
          opacity: 0.15, 
          filter: 'blur(8px)'
        }, 
        { 
          opacity: 1, 
          filter: 'blur(0px)', 
          duration: 2.2, 
          stagger: 0.12, 
          ease: 'power2.out' 
        }
      );

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

    // Cache section bounding rectangle and update on resize to eliminate DOM layout thrashing
    const handleResize = () => {
      if (sectionRef.current) {
        sectionRect.current = sectionRef.current.getBoundingClientRect();
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Disable custom cursor on touch/coarse pointer devices
    const isCoarse = (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(pointer: coarse)').matches) || (typeof window !== 'undefined' && 'ontouchstart' in window);

    // Initialize initial mouse position to center of section in viewport coordinates
    const rect = sectionRect.current;
    smoothMouse.current = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    lastSpawn.current = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };

    const lerp = (a, b, n) => (1 - n) * a + n * b;
    const distance = (x1, y1, x2, y2) => Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

    const onMouseMove = (e) => {
      const isReentry = !mouse.current.isActive;
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      mouse.current.isActive = true;

      // Smart Snapping on first enter or reentry to prevent cursor/trail teleportation/jumping
      if (isFirstMove.current || isReentry) {
        smoothMouse.current.x = e.clientX;
        smoothMouse.current.y = e.clientY;
        lastSpawn.current.x = e.clientX;
        lastSpawn.current.y = e.clientY;
        isFirstMove.current = false;
      }

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

    const IMG_WIDTH = 245;
    const IMG_HEIGHT = 170;

    const spawnImage = (x, y, velocityX, velocityY) => {
      const el = poolRefs.current[currentIndex.current];
      if (!el) return;

      const bRect = sectionRect.current;
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

      // Set instantaneous spawn state using local offsets and constant width/height to avoid layout reflows
      gsap.set(el, {
        x: localX - IMG_WIDTH / 2,
        y: localY - IMG_HEIGHT / 2,
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
        x: targetX - IMG_WIDTH / 2,
        y: targetY - IMG_HEIGHT / 2,
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

      // Snappy and responsive high-fidelity mouse lerping (increased from 0.08 to 0.16)
      smoothMouse.current.x = lerp(smoothMouse.current.x, mouse.current.x, 0.16);
      smoothMouse.current.y = lerp(smoothMouse.current.y, mouse.current.y, 0.16);

      const velocityX = smoothMouse.current.x - prevX;
      const velocityY = smoothMouse.current.y - prevY;

      // Update custom circular cursor position smoothly using pixel-perfect viewport offset
      if (heroCursorRef.current && !isCoarse && isPreloaderDone) {
        heroCursorRef.current.style.transform = `translate3d(${smoothMouse.current.x}px, ${smoothMouse.current.y}px, 0) translate(-50%, -50%)`;
      }

      // Update image pool container sway/follow parallax dynamically on mouse move
      if (imagePoolContainerRef.current) {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        // Target parallax is proportional to displacement from center
        const targetParallaxX = (mouse.current.x - centerX) * 0.035;
        const targetParallaxY = (mouse.current.y - centerY) * 0.035;
        
        // Lerp the sway/parallax for fluid secondary motion
        smoothParallax.current.x = lerp(smoothParallax.current.x, targetParallaxX, 0.08);
        smoothParallax.current.y = lerp(smoothParallax.current.y, targetParallaxY, 0.08);
        
        imagePoolContainerRef.current.style.transform = `translate3d(${smoothParallax.current.x}px, ${smoothParallax.current.y}px, 0)`;
      }

      // Apply real-time micro-parallax follow effect to each active image in the pool
      poolRefs.current.forEach((el) => {
        if (el && parseFloat(el.style.opacity) > 0) {
          const img = el.querySelector('img');
          if (img) {
            // Sway in opposite direction to container to create stunning 3D depth windows!
            const imgParallaxX = -smoothParallax.current.x * 0.6;
            const imgParallaxY = -smoothParallax.current.y * 0.6;
            img.style.transform = `scale(1.15) translate3d(${imgParallaxX}px, ${imgParallaxY}px, 0)`;
          }
        }
      });

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
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(rafId.current);
    };
  }, [isPreloaderDone]);

  return (
    <>
      {/* Contact Form Email Modal */}
      <EmailModal isOpen={isEmailModalOpen} onClose={() => setIsEmailModalOpen(false)} />

      {/* Fullscreen Video Player Overlay Modal */}
      <AnimatePresence>
        {isVideoPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-4"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsVideoPlaying(false)}
              className="absolute top-6 right-6 text-white hover:text-purple-400 transition-colors z-[10000] cursor-pointer text-3xl font-light"
              aria-label="Close video player"
            >
              &times;
            </button>
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="w-full max-w-[1200px] aspect-video rounded-xl overflow-hidden border border-white/10 shadow-2xl relative"
            >
              <video
                src="https://videos.pexels.com/video-files/3206020/3206020-uhd_2560_1440_25fps.mp4"
                className="w-full h-full object-cover"
                controls
                autoPlay
                playsInline
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE FULL-SCREEN PANEL */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed top-0 left-0 w-full h-[100dvh] bg-black/98 backdrop-blur-md z-[1900] flex flex-col justify-center items-center pointer-events-auto border-b border-neutral-800"
          >
            <motion.div
              variants={containerVariants}
              initial="initial"
              animate="animate"
              className="flex flex-col items-center gap-4 text-2xl font-display font-medium tracking-[0.18em] text-gray-200 uppercase text-center"
            >
              <motion.div variants={itemVariants}>
                <a href="#work" onClick={() => setIsMenuOpen(false)} className="hover:text-white transition-colors block py-3 cursor-hover">WORK</a>
              </motion.div>

              <motion.div 
                variants={itemVariants}
                className="w-[60vw] max-w-[200px] h-[1px] bg-white/10"
                aria-hidden="true"
              />

              <motion.div variants={itemVariants}>
                <a href="#about" onClick={() => setIsMenuOpen(false)} className="hover:text-white transition-colors block py-3 cursor-hover">ABOUT</a>
              </motion.div>

              <motion.div 
                variants={itemVariants}
                className="w-[60vw] max-w-[200px] h-[1px] bg-white/10"
                aria-hidden="true"
              />

              <motion.div variants={itemVariants}>
                <a href="#contact" onClick={() => setIsMenuOpen(false)} className="hover:text-white transition-colors block py-3 cursor-hover">CONTACT</a>
              </motion.div>

              <motion.div variants={itemVariants} className="mt-8 text-xs tracking-widest text-neutral-500 font-sans font-normal normal-case">
                ©2026 Parth Panchal
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- DESKTOP HERO SECTION (hidden on mobile/tablet) --- */}
      <section
        ref={sectionRef}
        className="relative w-full h-[100vh] bg-black overflow-hidden hidden lg:flex items-center justify-center cursor-none"
      >
        {/* --- Premium Custom Circular Cursor --- */}
        <div
          ref={heroCursorRef}
          className="fixed top-0 left-0 pointer-events-none rounded-full bg-white opacity-0 transition-opacity duration-300 ease-out z-[2500] hidden md:block"
          style={{
            width: '10px',
            height: '10px',
            willChange: 'transform, opacity',
          }}
        />
        {/* --- Dynamic Image Pool --- */}
        <div 
          ref={imagePoolContainerRef} 
          className="absolute inset-0 pointer-events-none z-[1500]"
          style={{ willChange: 'transform' }}
        >
          {Array.from({ length: POOL_SIZE }).map((_, i) => (
            <div
              key={i}
              ref={(el) => (poolRefs.current[i] = el)}
              className="absolute top-0 left-0 w-[245px] h-[170px] opacity-0 overflow-hidden bg-zinc-900 shadow-xl"
              style={{ willChange: 'transform, opacity' }}
            >
              <img
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
                    className="inline-block char-item"
                    style={{ opacity: 0.15, filter: 'blur(8px)', willChange: 'opacity, filter' }}
                  >
                    {char}
                  </span>
                ))}
                {wordIndex < arr.length - 1 && (
                  <span className="inline-block char-item" style={{ opacity: 0.15, filter: 'blur(8px)', willChange: 'opacity, filter' }}>&nbsp;</span>
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
            Emotion. Mood. Atmosphere. <br />
            crafted through color
          </p>
        </div>

        {/* --- Top Navigation UI --- */}
        <div 
          ref={navRef}
          className="absolute top-0 left-0 w-full z-[2000] pointer-events-none p-6 md:p-10 flex justify-between items-start mix-blend-difference text-xs md:text-sm tracking-widest font-semibold uppercase text-gray-200"
        >
          {/* LEFT */}
          <button
            onClick={() => window.location.href = '/'}
            className="flex flex-col gap-1 w-[60%] md:w-[30%] text-left nav-anim-item bg-transparent border-0 p-0 cursor-pointer pointer-events-auto hover:opacity-75 transition-opacity duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30 rounded text-xs md:text-sm tracking-widest font-semibold uppercase text-gray-200"
            aria-label="Go to home page"
          >
            <span className="text-white">PARTH PANCHAL</span>
            <span className="text-white/40 text-[10px] md:text-xs">COLORIST</span>
          </button>
          
          {/* CENTER */}
          <div className="hidden md:flex justify-center gap-8 md:gap-12 w-[40%] text-white pointer-events-auto">
            <a href="#work" className="hover:text-white transition-colors duration-300 nav-anim-item cursor-hover" data-cursor-size="60">WORK</a>
            <a href="#about" className="hover:text-white transition-colors duration-300 nav-anim-item cursor-hover" data-cursor-size="60">ABOUT</a>
            <a href="#contact" className="hover:text-white transition-colors duration-300 nav-anim-item cursor-hover" data-cursor-size="60">CONTACT</a>
          </div>

          {/* RIGHT */}
          <div className="hidden md:block w-[30%] text-right text-white nav-anim-item">
            <span>©2026</span>
          </div>

          {/* MOBILE HAMBURGER BUTTON (visible on mobile only) */}
          <div className="flex md:hidden w-[40%] md:w-[30%] justify-end pointer-events-auto z-[60]">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center justify-center w-8 h-8 focus:outline-none"
              aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
              aria-expanded={isMenuOpen}
            >
              <div className="w-6 h-6 flex items-center justify-center relative">
                <motion.span
                  animate={isMenuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -5 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute h-[1.5px] w-5 bg-white rounded-full block"
                />
                <motion.span
                  animate={isMenuOpen ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="absolute h-[1.5px] w-5 bg-white rounded-full block"
                />
                <motion.span
                  animate={isMenuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 5 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute h-[1.5px] w-5 bg-white rounded-full block"
                />
              </div>
            </button>
          </div>
        </div>

        {/* --- Vignette --- */}
        <div className="absolute inset-0 pointer-events-none z-[500] bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
      </section>

      {/* --- MOBILE & TABLET HERO SECTION (lg:hidden, visible on mobile/tablet) --- */}
      <section className="relative w-full min-h-[90dvh] bg-black flex flex-col justify-between items-center pt-28 pb-10 lg:hidden px-0 text-white overflow-hidden pointer-events-auto">
        
        {/* Mobile Header Top Row */}
        <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center text-xs tracking-widest font-semibold uppercase text-gray-200 z-[60]">
          {/* LEFT: Premium stacked editorial nameplate */}
          <button
            onClick={() => window.location.href = '/'}
            className="flex flex-col text-left leading-[0.9] font-sans font-medium tracking-[0.18em] text-[10px] bg-transparent border-0 p-0 cursor-pointer pointer-events-auto hover:opacity-75 transition-opacity duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30 rounded uppercase text-gray-200"
            aria-label="Go to home page"
          >
            <span className="text-white">PARTH</span>
            <span className="text-white/80">PANCHAL</span>
          </button>

          {/* RIGHT: Hamburger Menu Button */}
          <div className="flex justify-end pointer-events-auto">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center justify-center w-8 h-8 focus:outline-none"
              aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
              aria-expanded={isMenuOpen}
            >
              <div className="w-6 h-6 flex items-center justify-center relative">
                <motion.span
                  animate={isMenuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -5 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute h-[1.5px] w-5 bg-white rounded-full block"
                />
                <motion.span
                  animate={isMenuOpen ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="absolute h-[1.5px] w-5 bg-white rounded-full block"
                />
                <motion.span
                  animate={isMenuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 5 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute h-[1.5px] w-5 bg-white rounded-full block"
                />
              </div>
            </button>
          </div>
        </div>

        {/* Main Content Area: Brand H1 -> Video Editor -> Tagline */}
        <div className="flex flex-col items-center text-center px-6 max-w-[500px] mt-6 flex-grow justify-center">
          
          {/* H1: Parth Panchal (Main Brand focal point, progressive-reveal characters) */}
          <h1
            ref={mobileHeadingRef}
            className="font-display text-[clamp(2.5rem,12vw,4.5rem)] font-black tracking-tighter text-white leading-[0.95] uppercase max-w-[450px]"
          >
            {"Parth Panchal".split(" ").map((word, wordIndex, arr) => (
              <span key={wordIndex} className="inline-block whitespace-nowrap">
                {word.split("").map((char, charIndex) => (
                  <span
                    key={charIndex}
                    className="inline-block char-item"
                    style={{ opacity: 0.15, filter: 'blur(8px)', willChange: 'opacity, filter' }}
                  >
                    {char}
                  </span>
                ))}
                {wordIndex < arr.length - 1 && (
                  <span className="inline-block char-item" style={{ opacity: 0.15, filter: 'blur(8px)', willChange: 'opacity, filter' }}>&nbsp;</span>
                )}
              </span>
            ))}
          </h1>

          {/* Subtitle Label: Colorist (with premium accent styling and luxurious spacing) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-[10px] md:text-[11px] tracking-[0.5em] font-medium text-white/50 uppercase mt-4 -mr-[0.5em]"
          >
            Colorist
          </motion.div>

          {/* Tagline H3: Cinematic Storytelling through Precision Editing (luxurious spacing) */}
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs xs:text-sm md:text-base font-sans font-light text-white/80 leading-relaxed max-w-[340px] uppercase tracking-[0.18em] mt-8 text-center"
          >
            Emotion. Mood. Atmosphere. <br className="hidden xs:block" /> crafted through color
          </motion.h3>
        </div>

        {/* Stats Section: 50+ Projects | 1M+ Views (mt-10 creates premium layout spacing) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="w-full max-w-[450px] px-6 flex justify-center items-center gap-6 py-5 border-y border-white/5 mt-10 mb-8 text-center"
        >
          <div className="flex-1">
            <div className="text-3xl font-display font-semibold text-white leading-none mb-1">
              <AnimatedCounter end={50} suffix="+" />
            </div>
            <div className="text-[9px] tracking-widest text-[#555] uppercase font-bold">Projects</div>
          </div>
          <div className="w-[1px] h-8 bg-white/10" />
          <div className="flex-1">
            <div className="text-3xl font-display font-semibold text-white leading-none mb-1">
              <AnimatedCounter end={1} suffix="M+" />
            </div>
            <div className="text-[9px] tracking-widest text-[#555] uppercase font-bold">Views</div>
          </div>
        </motion.div>

        {/* CTA Area */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="w-full px-6 flex flex-col items-center gap-3 mb-10 text-center"
        >
          <span className="text-[10px] text-[#888] font-semibold tracking-widest uppercase">Let's Work Together</span>
          <button
            onClick={() => setIsEmailModalOpen(true)}
            className="font-sans bg-white text-black px-8 py-3 rounded-full text-[10px] font-semibold tracking-widest uppercase hover:scale-105 transition-all duration-300 shadow-xl shadow-white/5 cursor-pointer w-full max-w-[280px]"
          >
            Let's Connect
          </button>
        </motion.div>

        {/* Full-Width Scrolling Marquee */}
        <div className="relative w-full overflow-hidden py-4 bg-[#0a0a0a] border-y border-white/5 pointer-events-none mt-4">
          <div className="animate-marquee flex gap-8 whitespace-nowrap text-[9px] font-bold tracking-[0.3em] text-[#666]">
            <span>COMMERCIALS • REELS • ADS • CINEMATIC FILMS • COMMERCIALS • REELS • ADS • CINEMATIC FILMS •</span>
            <span>COMMERCIALS • REELS • ADS • CINEMATIC FILMS • COMMERCIALS • REELS • ADS • CINEMATIC FILMS •</span>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
