import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const Home = ({ setIsImageHovered }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const navigate = useNavigate();

  // Simulate a loading animation from 0% to 100%
  useEffect(() => {
    const duration = 2500; // 2.5 seconds
    const intervalTime = 20;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = Math.min((currentStep / steps) * 100, 100);
      setLoadingProgress(progress);
      if (currentStep >= steps) clearInterval(timer);
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full relative">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="h-[100dvh] w-full flex flex-col justify-between relative px-8 pt-24 pb-10">
        <main className="flex-1 flex items-center justify-center relative w-full">
          <div className="relative inline-block px-4">
            <h1
              className="text-center font-black tracking-tighter"
              style={{ fontSize: 'clamp(72px, 18vw, 220px)', lineHeight: 1, color: 'rgba(255, 255, 255, 0.15)' }}
            >
              Parth Panchal
            </h1>
            <motion.div
              className="absolute top-0 left-0 h-full overflow-hidden whitespace-nowrap px-4"
              style={{ width: `${loadingProgress}%` }}
            >
              <h1 className="text-center font-black tracking-tighter text-white" style={{ fontSize: 'clamp(72px, 18vw, 220px)', lineHeight: 1 }}>
                Parth Panchal
              </h1>
            </motion.div>
          </div>
        </main>
        <footer className="w-full relative flex justify-center items-end text-center">
          <p className="text-[10px] sm:text-[11px] max-w-sm tracking-[0.1em] text-gray-400 leading-relaxed font-semibold uppercase">
            Video Editor Based Worldwide,<br />
            Crafting Cinematic Stories and Emotional Impact<br />
            Through Precision Editing
          </p>
        </footer>
      </section>

      {/* --- SELECTED WORK SECTION --- */}
      <section id="work" className="w-full px-8 py-24 mt-12 border-t border-[#222]">
        <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter mb-16 lowercase">
          selected work.
        </h2>

        {/* FIRST ROW */}
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 w-full">
          {/* Canada Goose */}
          <motion.div
            className="w-full md:w-[40%] flex flex-col gap-4 group"
            initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}
          >
            <div
              className="w-full overflow-hidden aspect-video bg-[#1a1a1a] cursor-hover relative"
              onMouseEnter={() => setIsImageHovered && setIsImageHovered(true)} onMouseLeave={() => setIsImageHovered && setIsImageHovered(false)}
              onClick={() => navigate('/project/canada-goose')}
            >
              <img src="https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=1600&q=80" alt="Canada Goose" className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 ease-out" />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-white text-lg md:text-xl font-medium tracking-tight">Canada Goose: Heritage & Craftsmanship</h3>
              <p className="text-[9px] text-[#666] tracking-widest uppercase font-semibold">Colour</p>
            </div>
          </motion.div>

          {/* Pepsi */}
          <motion.div
            className="w-full md:w-[60%] flex flex-col gap-4 group"
            initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div
              className="w-full overflow-hidden aspect-[4/3] bg-[#1a1a1a] cursor-hover relative"
              onMouseEnter={() => setIsImageHovered && setIsImageHovered(true)} onMouseLeave={() => setIsImageHovered && setIsImageHovered(false)}
              onClick={() => navigate('/project/pepsi-generation')}
            >
              <img src="https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=1600&q=80" alt="Pepsi" className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 ease-out" />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-white text-lg md:text-xl font-medium tracking-tight">Pepsi: The New Generation</h3>
              <p className="text-[9px] text-[#666] tracking-widest uppercase font-semibold">Colour</p>
            </div>
          </motion.div>
        </div>

        {/* SECOND ROW */}
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 w-full mt-12 md:mt-24">
          {/* Under Armour */}
          <motion.div
            className="w-full md:w-[65%] flex flex-col gap-4 group"
            initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}
          >
            <div
              className="w-full overflow-hidden aspect-[16/10] bg-[#1a1a1a] relative cursor-hover"
              onMouseEnter={() => setIsImageHovered && setIsImageHovered(true)} onMouseLeave={() => setIsImageHovered && setIsImageHovered(false)}
              onClick={() => navigate('/project/project-rock')}
            >
              <img src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=1600&q=80" alt="Under Armour" className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 ease-out" />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-white text-lg md:text-xl font-medium tracking-tight">Under Armour x Project Rock</h3>
              <p className="text-[9px] text-[#666] tracking-widest uppercase font-semibold">Colour</p>
            </div>
          </motion.div>

          {/* EA FC 25 */}
          <motion.div
            className="w-full md:w-[35%] flex flex-col gap-4 group"
            initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div
              className="w-full overflow-hidden aspect-video bg-[#1a1a1a] cursor-hover relative"
              onMouseEnter={() => setIsImageHovered && setIsImageHovered(true)} onMouseLeave={() => setIsImageHovered && setIsImageHovered(false)}
              onClick={() => navigate('/project/ea-fc')}
            >
              <img src="https://images.unsplash.com/photo-1587329310686-91414b8e3cb7?w=1600&q=80" alt="EA FC" className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 ease-out" />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-white text-lg md:text-xl font-medium tracking-tight">EA FC 25: Ultimate Edition</h3>
              <p className="text-[9px] text-[#666] tracking-widest uppercase font-semibold">Colour</p>
            </div>
          </motion.div>
        </div>

        {/* THIRD ROW (FULL WIDTH) */}
        <div className="w-full mt-12 md:mt-24">
          <motion.div
            className="w-full flex flex-col gap-4 group"
            initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}
          >
            <div
              className="w-full overflow-hidden aspect-video md:aspect-[24/9] lg:aspect-[3/1] max-h-[600px] bg-[#1a1a1a] cursor-hover relative"
              onMouseEnter={() => setIsImageHovered && setIsImageHovered(true)} onMouseLeave={() => setIsImageHovered && setIsImageHovered(false)}
              onClick={() => navigate('/project/leaf-moon')}
            >
              <img src="https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=2000&q=80" alt="A Leaf From The Moon" className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 ease-out" />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-white text-lg md:text-2xl font-medium tracking-tight">A Leaf From The Moon</h3>
              <p className="text-[9px] text-[#666] tracking-widest uppercase font-semibold">Colour</p>
            </div>
          </motion.div>
        </div>

        <div className="w-full flex justify-center mt-20 md:mt-32 pb-4">
          <button className="bg-white text-black rounded-full px-8 py-3 text-[10px] md:text-xs font-bold tracking-widest uppercase hover:scale-105 transition-transform duration-300 cursor-pointer">
            See Them All
          </button>
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section id="about" className="w-full max-w-[1500px] mx-auto px-6 md:px-12 pt-16 md:pt-24 pb-16 flex flex-col md:flex-row gap-16 md:gap-24 lg:gap-32 items-start justify-between border-t border-[#222] mt-12 md:mt-20">
        <motion.div className="w-full md:w-1/2 flex flex-col gap-10" initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1, ease: "easeOut" }}>
          <h2 className="text-6xl md:text-[100px] lg:text-[130px] font-bold leading-[1.0] tracking-tighter text-white">
            Hi there,<br />I’m Parth
          </h2>
          <p className="text-[10px] md:text-[11px] text-[#888] tracking-widest uppercase leading-[1.8] max-w-[550px] font-semibold">
            Passionate video editor with a strong eye for cinematic storytelling. I specialize in transforming raw footage into emotionally engaging visuals that connect with audiences. Born in India, processing globally, and driven by the power of visual language to connect across cultures and create work that feels both personal and universal.
          </p>
        </motion.div>
        <motion.div className="w-full md:w-1/2 flex justify-start md:justify-end" initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}>
          <div className="w-full md:w-[90%] lg:w-[700px] overflow-hidden bg-[#1a1a1a] cursor-hover rounded-[2px]" onMouseEnter={() => setIsImageHovered && setIsImageHovered(true)} onMouseLeave={() => setIsImageHovered && setIsImageHovered(false)}>
            <img src="/profilePic.avif" alt="Parth Panchal" className="w-full h-auto aspect-[3/4] object-cover grayscale opacity-90 hover:grayscale-0 hover:opacity-100 hover:scale-105 transition-all duration-700 ease-out" />
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};
