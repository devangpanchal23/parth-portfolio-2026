/**
 * HeroSection.jsx — Premium Framer-inspired hero
 * ─────────────────────────────────────────────────────────────────
 * Drop-in, self-contained. Does NOT modify any parent component.
 *
 * Animations:
 *  • Entry: GSAP clip-path reveal (bottom→top) + scale settle
 *  • Scroll: GSAP ScrollTrigger parallax per-image
 *  • Mouse: rAF lerp parallax (slow + smooth = premium)
 *  • Hover: CSS transition scale (GPU composited)
 *
 * Performance: transform + opacity only, will-change, translate3d
 * ─────────────────────────────────────────────────────────────────
 */

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ── Image Config ──────────────────────────────────────────────── */
const IMAGES = [
  {
    id: 'h-tl',
    src: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=640&q=85',
    alt: 'Cinematic portrait',
    style: { top: '8%', left: '2%', width: 'clamp(130px, 18vw, 240px)' },
    aspect: '9/16', speed: -70,  mouseFactor: 0.013, delay: 0.1,  rot: -3,
  },
  {
    id: 'h-tr',
    src: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&q=85',
    alt: 'Mountain landscape',
    style: { top: '5%', right: '3%', width: 'clamp(160px, 25vw, 310px)' },
    aspect: '16/9', speed: -130, mouseFactor: 0.019, delay: 0.25, rot: 2,
  },
  {
    id: 'h-ml',
    src: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=640&q=85',
    alt: 'Square editorial',
    style: { top: '40%', left: '0%', width: 'clamp(110px, 16vw, 200px)' },
    aspect: '1/1',  speed: -45,  mouseFactor: 0.008, delay: 0.4,  rot: -1.5,
  },
  {
    id: 'h-mr',
    src: 'https://images.unsplash.com/photo-1515238152791-38cadbf34645?w=640&q=85',
    alt: 'Abstract motion',
    style: { top: '33%', right: '0%', width: 'clamp(120px, 17vw, 220px)' },
    aspect: '9/16', speed: -155, mouseFactor: 0.023, delay: 0.15, rot: 4,
  },
  {
    id: 'h-bl',
    src: 'https://images.unsplash.com/photo-1542385151-efd9000785a0?w=800&q=85',
    alt: 'Urban architecture',
    style: { bottom: '5%', left: '4%', width: 'clamp(140px, 22vw, 280px)' },
    aspect: '16/9', speed: -90,  mouseFactor: 0.015, delay: 0.35, rot: -2,
  },
  {
    id: 'h-br',
    src: 'https://images.unsplash.com/photo-1505322022379-7c3353ee6291?w=640&q=85',
    alt: 'Night cityscape',
    style: { bottom: '7%', right: '2%', width: 'clamp(130px, 19vw, 245px)' },
    aspect: '1/1',  speed: -55,  mouseFactor: 0.010, delay: 0.5,  rot: 1.5,
  },
];

const N    = IMAGES.length;
const EASE = 'power4.out';
const TRANSITION = `transform 0.38s cubic-bezier(0.22,1,0.36,1), box-shadow 0.38s cubic-bezier(0.22,1,0.36,1)`;

/* ═══════════════════════════════════════════════════════════════ */
const HeroSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subtextRef = useRef(null);

  /* Flat ref arrays — pre-allocated so refs are stable across renders */
  const scrollRefs  = useRef(new Array(N).fill(null));
  const cardRefs    = useRef(new Array(N).fill(null));   // card div (clip + hover)
  const mouseRefs   = useRef(new Array(N).fill(null));   // mouse layer
  const imgRefs     = useRef(new Array(N).fill(null));

  const mouseTarget = useRef({ x: 0, y: 0 });
  const mouseLerp   = useRef({ x: 0, y: 0 });
  const raf         = useRef(null);

  /* ── Entry animations ──────────────────────────────────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Heading */
      if (headingRef.current) {
        gsap.from(headingRef.current, {
          opacity: 0, y: 45, scale: 1.04,
          duration: 1.8, ease: EASE, delay: 0.25,
        });
      }

      /* Subtext */
      if (subtextRef.current) {
        gsap.from(subtextRef.current, {
          opacity: 0, y: 18,
          duration: 1.4, ease: EASE, delay: 0.70,
        });
      }

      /* Per-image staggered reveal */
      IMAGES.forEach((cfg, i) => {
        const card = cardRefs.current[i];
        const img  = imgRefs.current[i];
        const wrapper = mouseRefs.current[i];
        if (!card || !img || !wrapper) return;

        const d = cfg.delay + 0.6;

        /* Card container: animate y slightly for the pop-up feel */
        gsap.from(card, {
          y: 60, opacity: 0,
          duration: 1.4, ease: EASE, delay: d
        });

        /* Image: masked reveal from bottom (yPercent: 100) and scale settle */
        gsap.from(img, {
          yPercent: 100, scale: 1.18,
          duration: 1.6, ease: EASE, delay: d
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Scroll parallax ───────────────────────────────────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      IMAGES.forEach((cfg, i) => {
        const el = scrollRefs.current[i];
        if (!el) return;

        gsap.to(el, {
          y: cfg.speed,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.4,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* ── Mouse parallax (lerped rAF) ───────────────────────────── */
  useEffect(() => {
    const section = sectionRef.current;
    const lerp = (a, b, t) => a + (b - a) * t;
    const SMOOTH = 0.055;

    const onMove = (e) => {
      const r = section.getBoundingClientRect();
      mouseTarget.current.x = (e.clientX - r.left) / r.width  - 0.5;
      mouseTarget.current.y = (e.clientY - r.top)  / r.height - 0.5;
    };
    const onLeave = () => { mouseTarget.current.x = 0; mouseTarget.current.y = 0; };

    const tick = () => {
      mouseLerp.current.x = lerp(mouseLerp.current.x, mouseTarget.current.x, SMOOTH);
      mouseLerp.current.y = lerp(mouseLerp.current.y, mouseTarget.current.y, SMOOTH);

      mouseRefs.current.forEach((el, i) => {
        if (!el) return;
        const dx = (mouseLerp.current.x * IMAGES[i].mouseFactor * window.innerWidth).toFixed(2);
        const dy = (mouseLerp.current.y * IMAGES[i].mouseFactor * window.innerHeight).toFixed(2);
        el.style.transform = `translate3d(${dx}px,${dy}px,0)`;
      });

      raf.current = requestAnimationFrame(tick);
    };

    section.addEventListener('mousemove',  onMove,  { passive: true });
    section.addEventListener('mouseleave', onLeave, { passive: true });
    raf.current = requestAnimationFrame(tick);

    return () => {
      section.removeEventListener('mousemove',  onMove);
      section.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  /* ── Hover handlers (using GSAP to avoid CSS transition conflicts) ── */
  const onEnter = (i, rot) => () => {
    const card = cardRefs.current[i];
    const img = imgRefs.current[i];
    if (card) gsap.to(card, { scale: 1.08, boxShadow: '0 32px 80px rgba(0,0,0,0.68)', duration: 0.38, ease: 'power2.out', overwrite: 'auto' });
    if (img) gsap.to(img, { scale: 1.06, duration: 0.5, ease: 'power2.out', overwrite: 'auto' });
  };
  const onLeave2 = (i, rot) => () => {
    const card = cardRefs.current[i];
    const img = imgRefs.current[i];
    if (card) gsap.to(card, { scale: 1, boxShadow: '0 18px 52px rgba(0,0,0,0.48)', duration: 0.38, ease: 'power2.out', overwrite: 'auto' });
    if (img) gsap.to(img, { scale: 1, duration: 0.5, ease: 'power2.out', overwrite: 'auto' });
  };

  /* ── Render ────────────────────────────────────────────────── */
  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full overflow-hidden bg-[#111111]"
      style={{ height: '100dvh' }}
    >

      {IMAGES.map((cfg, i) => (
        /* LAYER 1: Scroll — GSAP ScrollTrigger writes Y here */
        <div
          key={cfg.id}
          ref={(el) => { scrollRefs.current[i] = el; }}
          className="absolute"
          style={{ ...cfg.style, zIndex: 5, willChange: 'transform' }}
        >

          {/* LAYER 2: Mouse — rAF lerp writes translate3d here */}
          <div
            ref={(el) => { mouseRefs.current[i] = el; }}
            style={{
              width: '100%',
              transform: 'translate3d(0,0,0)',
              willChange: 'transform',
            }}
          >

            {/* CARD: Mask container + hover scale */}
            <div
              ref={(el) => { cardRefs.current[i] = el; }}
              className="w-full overflow-hidden"
              style={{
                aspectRatio: cfg.aspect,
                borderRadius: '3px',
                transform: `rotate(${cfg.rot}deg)`,
                boxShadow: '0 18px 52px rgba(0,0,0,0.48)',
                willChange: 'transform, opacity',
                cursor: 'pointer',
              }}
              onMouseEnter={onEnter(i, cfg.rot)}
              onMouseLeave={onLeave2(i, cfg.rot)}
            >
              <img
                ref={(el) => { imgRefs.current[i] = el; }}
                src={cfg.src}
                alt={cfg.alt}
                loading="eager"
                decoding="async"
                draggable={false}
                className="w-full h-full object-cover block select-none"
                style={{
                  transformOrigin: 'center',
                  willChange: 'transform',
                  transition: `transform 0.5s cubic-bezier(0.22,1,0.36,1)`,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.06)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1.0)'; }}
              />
            </div>

          </div>
        </div>
      ))}

      {/* ── Center text ──────────────────────────────────────── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none px-6 select-none">
        <h1
          ref={headingRef}
          className="text-center font-black tracking-tighter leading-none"
          style={{
            fontSize: 'clamp(64px, 16vw, 200px)',
            willChange: 'transform, opacity',
            background: 'linear-gradient(160deg, #ffffff 52%, rgba(255,255,255,0.38) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Parth Panchal
        </h1>

        <p
          ref={subtextRef}
          className="mt-5 text-center uppercase font-semibold tracking-[0.22em]"
          style={{
            fontSize: 'clamp(8px, 0.9vw, 11px)',
            color: 'rgba(255,255,255,0.35)',
            willChange: 'transform, opacity',
          }}
        >
          Video Editor&nbsp;&middot;&nbsp;Cinematic Storytelling&nbsp;&middot;&nbsp;Based Worldwide
        </p>
      </div>

      {/* ── Edge vignette ────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 6,
          background:
            'radial-gradient(ellipse 65% 65% at 50% 50%, transparent 25%, rgba(17,17,17,0.50) 100%)',
        }}
      />

    </section>
  );
};

export default HeroSection;
