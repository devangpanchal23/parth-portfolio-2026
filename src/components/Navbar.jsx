import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useMediaQuery, DESKTOP_NAV_QUERY } from '../hooks/useMediaQuery';
import { useDismissiblePanel } from '../hooks/useDismissiblePanel';

export const Navbar = () => {
  const [openPath, setOpenPath] = useState(null);
  const panelRef = useRef(null);
  const triggerRef = useRef(null);
  const navBarRef = useRef(null);
  const [navOffset, setNavOffset] = useState(88);
  const location = useLocation();
  const isDesktop = useMediaQuery(DESKTOP_NAV_QUERY);

  const isOpen = openPath === location.pathname;
  const closePanel = useCallback(() => setOpenPath(null), []);
  const togglePanel = useCallback(() => {
    setOpenPath((current) =>
      current === location.pathname ? null : location.pathname
    );
  }, [location.pathname]);

  const { handleBackdropClick } = useDismissiblePanel({
    isOpen,
    onClose: closePanel,
    panelRef,
    triggerRef,
    closeOnDesktop: true,
    isDesktop,
  });

  // Measure nav height for panel positioning (prevents layout shifts)
  useEffect(() => {
    const updateOffset = () => {
      if (navBarRef.current) {
        setNavOffset(navBarRef.current.offsetHeight);
      }
    };

    updateOffset();
    window.addEventListener('resize', updateOffset);
    return () => window.removeEventListener('resize', updateOffset);
  }, []);

  // Prevent underlying page scroll when mobile panel is open
  useEffect(() => {
    if (isOpen && !isDesktop) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, isDesktop]);

  const panelVariants = {
    initial: { opacity: 0, y: -12 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
    },
    exit: {
      y: -12,
      opacity: 0,
      transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const backdropVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.25 } },
  };

  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 16 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <>
      <nav
        ref={navBarRef}
        className="fixed top-0 left-0 w-full py-8 z-50 mix-blend-difference pointer-events-none"
        aria-label="Main navigation"
      >
        <div className="w-full max-w-[1500px] mx-auto px-6 md:px-12 flex justify-between items-start text-xs md:text-sm tracking-widest font-semibold uppercase text-gray-200">
          
          {/* BRAND */}
          <motion.div 
            className="w-1/3 text-left pointer-events-auto"
            initial={{ opacity: 0, scale: 1, x: -10 }}
            animate={{ opacity: 1, scale: [1, 1.08, 1], x: 0 }}
            transition={{ 
              duration: 1.5, 
              times: [0, 0.4, 1],
              ease: "easeOut", 
              delay: 0.2 
            }}
          >
            <button
              onClick={() => window.location.href = '/'}
              className="bg-transparent border-0 p-0 text-left text-xs md:text-sm tracking-widest font-semibold uppercase text-gray-200 cursor-pointer hover:opacity-75 transition-opacity duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30 rounded"
              aria-label="Go to home page"
            >
              Parth Panchal
            </button>
          </motion.div>

          {/* DESKTOP NAV LINKS (hidden on mobile) */}
          <motion.div 
            className="hidden md:flex w-1/3 justify-center gap-8 md:gap-12 pointer-events-auto text-xs md:text-sm font-medium tracking-widest"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
          >
            <motion.a 
              href="/#work" 
              className="hover:text-white transition-colors cursor-pointer"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 1.5, times: [0, 0.4, 1], delay: 0.5 }}
            >
              WORK
            </motion.a>
            <motion.a 
              href="/#about" 
              className="hover:text-white transition-colors cursor-pointer"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 1.5, times: [0, 0.4, 1], delay: 0.6 }}
            >
              ABOUT
            </motion.a>
            <motion.a 
              href="/#contact" 
              className="hover:text-white transition-colors cursor-pointer"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 1.5, times: [0, 0.4, 1], delay: 0.7 }}
            >
              CONTACT
            </motion.a>
          </motion.div>

          {/* DESKTOP COPYRIGHT (hidden on mobile) */}
          <motion.div 
            className="hidden md:block w-1/3 text-right pointer-events-auto"
            initial={{ opacity: 0, scale: 1, x: 10 }}
            animate={{ opacity: 1, scale: [1, 1.08, 1], x: 0 }}
            transition={{ 
              duration: 1.5, 
              times: [0, 0.4, 1],
              ease: "easeOut", 
              delay: 0.8 
            }}
          >
            ©2026
          </motion.div>

          {/* MOBILE HAMBURGER BUTTON (visible on mobile only) */}
          <div className="flex md:hidden w-1/3 justify-end pointer-events-auto z-[60]">
            <button
              ref={triggerRef}
              onClick={togglePanel}
              className="flex items-center justify-center w-8 h-8 focus:outline-none focus-visible:ring-1 focus-visible:ring-white/30 rounded"
              aria-label={isOpen ? "Close notification menu" : "Open notification menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-notification-panel"
            >
              <div className="w-6 h-6 flex items-center justify-center relative" aria-hidden="true">
                <motion.span
                  animate={isOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -5 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute h-[1.5px] w-5 bg-white rounded-full block"
                />
                <motion.span
                  animate={isOpen ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="absolute h-[1.5px] w-5 bg-white rounded-full block"
                />
                <motion.span
                  animate={isOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 5 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute h-[1.5px] w-5 bg-white rounded-full block"
                />
              </div>
            </button>
          </div>

        </div>
      </nav>

      {/* MOBILE NOTIFICATION PANEL — slide-down with backdrop */}
      <AnimatePresence>
        {isOpen && !isDesktop && (
          <>
            <motion.div
              key="notification-backdrop"
              variants={backdropVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="fixed left-0 right-0 bottom-0 z-[44] bg-black/50 backdrop-blur-[2px] md:hidden"
              style={{ top: navOffset }}
              onClick={handleBackdropClick}
              aria-hidden="true"
            />
            <motion.div
              key="notification-panel"
              ref={panelRef}
              id="mobile-notification-panel"
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation and notifications"
              variants={panelVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="fixed left-0 right-0 z-[45] md:hidden pointer-events-auto bg-black/98 backdrop-blur-md border-b border-neutral-800 shadow-lg shadow-black/40"
              style={{ top: navOffset }}
            >
              <motion.div
                variants={containerVariants}
                initial="initial"
                animate="animate"
                className="flex flex-col items-center gap-2 py-8 px-6 text-xl font-display font-medium tracking-[0.18em] text-gray-200 uppercase text-center"
              >
                <motion.div variants={itemVariants}>
                  <a
                    href="/#work"
                    onClick={closePanel}
                    className="hover:text-white transition-colors block py-3 cursor-hover animate-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30 rounded"
                  >
                    WORK
                  </a>
                </motion.div>
                
                <motion.div 
                  variants={itemVariants}
                  className="w-[60vw] max-w-[200px] h-[1px] bg-white/10"
                  aria-hidden="true"
                />

                <motion.div variants={itemVariants}>
                  <a
                    href="/#about"
                    onClick={closePanel}
                    className="hover:text-white transition-colors block py-3 cursor-hover animate-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30 rounded"
                  >
                    ABOUT
                  </a>
                </motion.div>
                
                <motion.div 
                  variants={itemVariants}
                  className="w-[60vw] max-w-[200px] h-[1px] bg-white/10"
                  aria-hidden="true"
                />

                <motion.div variants={itemVariants}>
                  <a
                    href="/#contact"
                    onClick={closePanel}
                    className="hover:text-white transition-colors block py-3 cursor-hover animate-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30 rounded"
                  >
                    CONTACT
                  </a>
                </motion.div>
                
                <motion.div variants={itemVariants} className="mt-4 text-xs tracking-widest text-neutral-500 font-sans font-normal normal-case">
                  ©2026 Parth Panchal
                </motion.div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
