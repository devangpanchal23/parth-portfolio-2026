import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Toggle body overflow hidden on menu state toggles to prevent underlying page scrolling
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape key press for optimal keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

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

  return (
    <>
      <nav className="fixed top-0 left-0 w-full py-8 z-50 mix-blend-difference pointer-events-none">
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
            <a href="/">Parth Panchal</a>
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
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center justify-center w-8 h-8 focus:outline-none"
              aria-label={isOpen ? "Close Menu" : "Open Menu"}
              aria-expanded={isOpen}
            >
              <div className="w-6 h-6 flex items-center justify-center relative">
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

      {/* MOBILE FULL-SCREEN PANEL */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            variants={menuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed top-0 left-0 w-full h-[100dvh] bg-black/98 backdrop-blur-md z-[45] flex flex-col justify-center items-center pointer-events-auto border-b border-neutral-800"
          >
            <motion.div
              variants={containerVariants}
              initial="initial"
              animate="animate"
              className="flex flex-col items-center gap-4 text-2xl font-display font-medium tracking-[0.18em] text-gray-200 uppercase text-center"
            >
              <motion.div variants={itemVariants}>
                <a
                  href="/#work"
                  onClick={() => setIsOpen(false)}
                  className="hover:text-white transition-colors block py-3 cursor-hover animate-none"
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
                  onClick={() => setIsOpen(false)}
                  className="hover:text-white transition-colors block py-3 cursor-hover animate-none"
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
                  onClick={() => setIsOpen(false)}
                  className="hover:text-white transition-colors block py-3 cursor-hover animate-none"
                >
                  CONTACT
                </a>
              </motion.div>
              
              <motion.div variants={itemVariants} className="mt-8 text-xs tracking-widest text-neutral-500 font-sans font-normal normal-case">
                ©2026 Parth Panchal
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
