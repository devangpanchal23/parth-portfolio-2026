import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { ProjectDetail } from './pages/ProjectDetail';
import NoiseOverlay from './components/NoiseOverlay';
import Preloader from './components/Preloader';
import Lenis from '@studio-freight/lenis';
import { scrollToSection, getSectionIdFromHref, isHomeSectionLink } from './utils/smoothScroll';

function App() {
  const [isPreloaderDone, setIsPreloaderDone] = useState(
    () => sessionStorage.getItem('hasLoadedBefore') === 'true'
  );
  const location = useLocation();
  const navigate = useNavigate();
  const pendingHashScroll = useRef(false);

  const handlePreloaderComplete = () => {
    sessionStorage.setItem('hasLoadedBefore', 'true');
    setIsPreloaderDone(true);
  };

  // Prevent browser scroll restoration from jumping past the hero on load
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // Initialize Lenis globally for smooth scrolling across the entire portfolio
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    window.lenis = lenis;
    lenis.scrollTo(0, { immediate: true });

    let animationFrameId;
    function raf(time) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  // Always open at the top on route change; clear stale hash fragments on fresh home loads
  useEffect(() => {
    if (pendingHashScroll.current && location.pathname === '/' && location.hash) {
      return;
    }

    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }

    if (location.pathname === '/' && location.hash && !pendingHashScroll.current) {
      window.history.replaceState(null, '', '/');
    }
  }, [location.pathname]);

  // Smooth-scroll to a section only after explicit cross-page nav link clicks
  useEffect(() => {
    if (!pendingHashScroll.current) return;
    if (location.pathname !== '/' || !location.hash) {
      pendingHashScroll.current = false;
      return;
    }

    const sectionId = location.hash.slice(1);
    let frameId;
    let attempts = 0;
    let cancelled = false;

    const tryScroll = () => {
      if (cancelled) return;

      const el = document.getElementById(sectionId);
      if (el) {
        pendingHashScroll.current = false;
        scrollToSection(el);
        return;
      }

      if (attempts < 24) {
        attempts += 1;
        frameId = requestAnimationFrame(tryScroll);
      } else {
        pendingHashScroll.current = false;
      }
    };

    frameId = requestAnimationFrame(tryScroll);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frameId);
    };
  }, [location.pathname, location.hash]);

  // Intercept in-page and cross-page section links for Lenis smooth scrolling
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const link = e.target.closest('a[href*="#"]');
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href || !isHomeSectionLink(href)) return;

      const sectionId = getSectionIdFromHref(href);
      if (!sectionId) return;

      e.preventDefault();

      if (location.pathname !== '/') {
        pendingHashScroll.current = true;
        navigate(`/#${sectionId}`);
        return;
      }

      scrollToSection(sectionId);
      window.history.replaceState(null, '', `#${sectionId}`);
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, [location.pathname, navigate]);

  return (
    <div className="bg-black min-h-screen w-full selection:bg-white/20">
      {!isPreloaderDone && (
        <Preloader onComplete={handlePreloaderComplete} />
      )}
      <NoiseOverlay />
      <Routes>
        <Route path="/" element={<Home isPreloaderDone={isPreloaderDone} />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/project/:slug" element={<ProjectDetail />} />
      </Routes>
    </div>
  );
}

export default App;
