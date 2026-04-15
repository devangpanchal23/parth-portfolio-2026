import React from 'react';
import { motion } from 'framer-motion';

const ScrollIndicator = () => {
  return (
    <motion.div 
      className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 1 }}
    >
      <span className="text-[10px] uppercase tracking-[0.2em] text-secondary font-medium">Scroll</span>
      <div className="w-[1px] h-12 bg-white/10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1/3 bg-white animate-bounce-slow"></div>
      </div>
    </motion.div>
  );
};

export default ScrollIndicator;
