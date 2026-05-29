import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ onComplete }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Run preloader sequence then unmount
    const timer = setTimeout(() => {
      setIsLoaded(true);
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 800); // Wait for exit animation
    }, 2200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  // Apple-style custom ease
  const ease = [0.16, 1, 0.3, 1];
  
  const text = "Parth Panchal";

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      scale: 1.05,
      filter: "blur(10px)",
      transition: { duration: 0.8, ease },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    show: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.8, ease }
    },
  };

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.8, ease, delay: 0.4 }
          }}
        >
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            exit="exit"
            className="flex overflow-hidden"
          >
            {text.split('').map((char, index) => (
              <motion.span
                key={index}
                variants={item}
                className="text-white font-display text-[2rem] md:text-[3rem] font-semibold tracking-[-1px] select-none"
                style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
              >
                {char}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
