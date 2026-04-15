import React from 'react';
import { motion } from 'framer-motion';

export const Navbar = () => (
  <nav className="fixed top-0 left-0 w-full px-8 py-8 flex justify-between items-start text-xs md:text-sm tracking-widest font-semibold uppercase text-gray-200 z-50 mix-blend-difference pointer-events-none">
    <div className="w-1/3 text-left pointer-events-auto">
      <a href="/">Parth Panchal</a>
    </div>
    <div className="w-1/3 flex justify-center gap-6 pointer-events-auto">
      <a href="/#work" className="hover:text-white transition-colors cursor-pointer">Work</a>
      <a href="/#about" className="hover:text-white transition-colors cursor-pointer">About</a>
      <a href="/#contact" className="hover:text-white transition-colors cursor-pointer">Contact</a>
    </div>
    <div className="w-1/3 text-right pointer-events-auto">
      ©2026
    </div>
  </nav>
);
