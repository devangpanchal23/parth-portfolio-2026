import React from 'react';
import { motion } from 'framer-motion';

export const Navbar = () => (
  <nav className="fixed top-0 left-0 w-full py-8 z-50 mix-blend-difference pointer-events-none">
    <div className="w-full max-w-[1500px] mx-auto px-6 md:px-12 flex justify-between items-start text-xs md:text-sm tracking-widest font-semibold uppercase text-gray-200">
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

      <motion.div 
        className="w-1/3 flex justify-center gap-8 md:gap-12 pointer-events-auto text-xs md:text-sm font-medium tracking-widest"
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

      <motion.div 
        className="w-1/3 text-right pointer-events-auto"
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
    </div>
  </nav>
);
