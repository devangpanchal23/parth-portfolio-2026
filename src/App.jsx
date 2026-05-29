import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { ProjectDetail } from './pages/ProjectDetail';
import NoiseOverlay from './components/NoiseOverlay';
import Preloader from './components/Preloader';
import Lenis from '@studio-freight/lenis';

function App() {
  const [isPreloaderDone, setIsPreloaderDone] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const hasLoadedBefore = sessionStorage.getItem('hasLoadedBefore');
    if (!hasLoadedBefore) {
      setIsPreloaderDone(false);
      sessionStorage.setItem('hasLoadedBefore', 'true');
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

  // Restore scroll position immediately on page navigation
  useEffect(() => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return (
    <div className="bg-black min-h-screen w-full selection:bg-white/20">
      {!isPreloaderDone && (
        <Preloader onComplete={() => setIsPreloaderDone(true)} />
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
