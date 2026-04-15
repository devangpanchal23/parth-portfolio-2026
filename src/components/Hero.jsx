import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section 
      className="relative w-full h-[100dvh] flex items-center justify-center overflow-hidden"
      style={{
        backgroundColor: '#0a0a0a',
        backgroundImage: 'radial-gradient(circle at center, #1a1a1a 0%, #0a0a0a 100%)'
      }}
    >
      <motion.h1 
        className="text-white font-bold tracking-tight text-center drop-shadow-xl z-10"
        style={{
          // Fluid typography scaling from mobile (40px) to tablet (64px) to desktop (96px)
          fontSize: 'clamp(36px, 6vw + 12px, 120px)'
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        Parth Panchal
      </motion.h1>
    </section>
  );
};

export default Hero;
