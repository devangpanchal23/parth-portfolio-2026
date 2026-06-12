import React, { useState } from 'react';
import { motion } from 'framer-motion';
import EmailModal from './EmailModal';

export const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <EmailModal isOpen={isModalOpen} onClose={closeModal} />
      <section id="contact" className="w-full bg-[#0a0a0a] flex flex-col pt-12 md:pt-20 lg:pt-40 pb-8 md:pb-12 lg:pb-32 text-white relative z-10">
        <div className="w-full max-w-[1500px] mx-auto px-6 md:px-12 flex flex-col">
          <motion.div
            className="w-full flex justify-center mb-10 md:mb-16 lg:mb-40"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.h2
              className="font-display text-4xl md:text-[70px] lg:text-[120px] font-semibold tracking-[-2px] md:tracking-[-2.5px] lg:tracking-[-3px] text-white cursor-pointer opacity-20 hover:opacity-100 transition-opacity duration-700 ease-in-out"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              Thank you.
            </motion.h2>
          </motion.div>
          <div className="w-full flex flex-col md:flex-row justify-between items-center md:items-end gap-6 md:gap-0">
            <motion.div
              className="flex flex-col gap-2 text-center md:text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >

              <a href="https://www.instagram.com/parthh.films" target="_blank" rel="noopener noreferrer" className="text-[9px] md:text-[10px] lg:text-[11px] text-[#A1A1A1] uppercase tracking-widest font-semibold hover:text-white transition-colors cursor-pointer block">Instagram</a>
              <a href="https://www.linkedin.com/in/parth-panchal29/" target="_blank" rel="noopener noreferrer" className="text-[9px] md:text-[10px] lg:text-[11px] text-[#A1A1A1] uppercase tracking-widest font-semibold hover:text-white transition-colors cursor-pointer block">LinkedIn</a>
              <a href="mailto:Parth.media06@gmail.com" className="text-[9px] md:text-[10px] lg:text-[11px] text-[#A1A1A1] uppercase tracking-widest font-semibold hover:text-white transition-colors cursor-pointer block">Email</a>
              <div className="mt-4 md:mt-6 lg:mt-12 text-[8px] lg:text-[9px] text-[#555] tracking-widest uppercase font-semibold">2026 &copy; Parth Panchal</div>
            </motion.div>
            <motion.div
              className="flex flex-col gap-1 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <p className="text-[9px] md:text-[10px] lg:text-[11px] text-[#A1A1A1] uppercase tracking-widest font-semibold">India</p>
            </motion.div>
            <motion.div
              className="flex flex-col items-center md:items-end gap-3 md:gap-4 lg:gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <p className="font-display text-[17px] md:text-[21px] lg:text-3xl font-medium tracking-tight text-white mb-0.5 md:mb-1 lg:mb-2">Let's chat :)</p>
              <button
                onClick={openModal}
                className="font-sans bg-white text-black px-6 md:px-7 lg:px-8 py-2 md:py-2.5 lg:py-3 rounded-full text-[9px] md:text-[10px] lg:text-[11px] font-semibold tracking-wide uppercase hover:scale-105 hover:bg-gray-200 transition-all duration-300 cursor-pointer shadow-lg shadow-white/5"
              >
                Let's Connect
              </button>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};
