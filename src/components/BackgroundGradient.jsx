import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const BackgroundGradient = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 250]);
  
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Calculate normalized mouse position for subtle parallax
      const x = (e.clientX / window.innerWidth - 0.5) * 60;
      const y = (e.clientY / window.innerHeight - 0.5) * 60;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#050505] pointer-events-none">
      {/* 
        Optional Background Video loop:
        If you want a video background instead, uncomment this and provide a cinematic clip! 
        <video 
          autoPlay loop muted playsInline 
          className="absolute inset-0 w-full h-full object-cover opacity-10 blur-md pointer-events-none"
        >
          <source src="/your-cinematic-reel.mp4" type="video/mp4" />
        </video>
      */}

      {/* Cinematic Glowing Orbs for that premium feel */}
      <motion.div 
        className="absolute w-[90vw] h-[90vw] md:w-[60vw] md:h-[60vw] rounded-full blur-[140px] opacity-30 pointer-events-none mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.45) 0%, rgba(0,0,0,0) 70%)',
          top: '30%',
          left: '50%',
          marginTop: '-30vw',
          marginLeft: '-30vw',
          y,
        }}
        animate={{
          x: mousePos.x * -1,
          y: mousePos.y * -1,
        }}
        transition={{ type: "spring", stiffness: 40, damping: 30 }}
      />
      
      <motion.div 
        className="absolute w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] rounded-full blur-[120px] opacity-15 pointer-events-none mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.5) 0%, rgba(0,0,0,0) 70%)',
          bottom: '-10%',
          right: '-10%',
        }}
        animate={{
          x: mousePos.x * -1.5,
          y: mousePos.y * -1.5,
        }}
        transition={{ type: "spring", stiffness: 35, damping: 25 }}
      />
    </div>
  );
};

export default BackgroundGradient;
