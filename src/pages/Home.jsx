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
      <section className="h-[100dvh] w-full flex flex-col justify-between relative pt-24 pb-10">
        <div className="w-full h-full flex flex-col justify-between px-6 md:px-12">
          <main className="flex-1 flex items-center justify-center relative w-full">
            <motion.div
              className="relative inline-block px-4 origin-center whitespace-nowrap"
              initial={{ scale: 1, opacity: 1 }}
              animate={
                loadingProgress === 100
                  ? { scale: [1, 1.08, 1], opacity: [1, 0.95, 1] }
                  : { scale: 1, opacity: 1 }
              }
              transition={{
                duration: 0.9,
                times: [0, 0.4, 1],
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <h1
                className="font-display text-center font-bold tracking-[-2px]"
                style={{ fontSize: 'clamp(52px, 16vw, 190px)', lineHeight: 0.95, color: 'rgba(255, 255, 255, 0.15)' }}
              >
                Parth Panchal
              </h1>
              <motion.div
                className="absolute top-0 left-0 h-full overflow-hidden whitespace-nowrap px-4"
                style={{ width: `${loadingProgress}%` }}
              >
                <h1 className="font-display text-center font-bold tracking-[-2px] text-white" style={{ fontSize: 'clamp(52px, 16vw, 190px)', lineHeight: 0.95 }}>
                  Parth Panchal
                </h1>
              </motion.div>
            </motion.div>
          </main>
          <footer className="w-full relative flex justify-center items-end text-center">
            <p className="text-[10px] sm:text-[11px] max-w-sm tracking-[0.1em] text-gray-400 leading-relaxed font-semibold uppercase">
              Video Editor Based Worldwide,<br />
              Crafting Cinematic Stories and Emotional Impact<br />
              Through Precision Editing
            </p>
          </footer>
        </div>
      </section>

      {/* --- SELECTED WORK SECTION --- */}
      <section id="work" className="w-full py-24 mt-12 border-t border-[#222]">
        <div className="w-full max-w-[1500px] mx-auto px-6 md:px-12">
          <h2 className="font-display text-4xl md:text-5xl lg:text-7xl font-semibold tracking-[-1px] mb-16 lowercase">
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
                <img src="https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=1600&q=80" alt="Canada Goose" className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.08]" />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-500 ease-out pointer-events-none" />
              </div>
              <div className="flex flex-col gap-[6px] mt-2">
                <h3 className="font-sans text-[20px] md:text-[28px] leading-[1.2] md:leading-[28px] font-medium text-white">Canada Goose: Heritage & Craftsmanship</h3>
                <p className="font-sans text-[10px] text-[#888] tracking-widest uppercase font-semibold">Colour</p>
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
                <img src="https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=1600&q=80" alt="Pepsi" className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.08]" />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-500 ease-out pointer-events-none" />
              </div>
              <div className="flex flex-col gap-[6px] mt-2">
                <h3 className="font-sans text-[20px] md:text-[28px] leading-[1.2] md:leading-[28px] font-medium text-white">Pepsi: The New Generation</h3>
                <p className="font-sans text-[10px] text-[#888] tracking-widest uppercase font-semibold">Colour</p>
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
                <img src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=1600&q=80" alt="Under Armour" className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.08]" />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-500 ease-out pointer-events-none" />
              </div>
              <div className="flex flex-col gap-[6px] mt-2">
                <h3 className="font-sans text-[20px] md:text-[28px] leading-[1.2] md:leading-[28px] font-medium text-white">Under Armour x Project Rock</h3>
                <p className="font-sans text-[10px] text-[#888] tracking-widest uppercase font-semibold">Colour</p>
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
                <img src="https://images.unsplash.com/photo-1587329310686-91414b8e3cb7?w=1600&q=80" alt="EA FC" className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.08]" />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-500 ease-out pointer-events-none" />
              </div>
              <div className="flex flex-col gap-[6px] mt-2">
                <h3 className="font-sans text-[20px] md:text-[28px] leading-[1.2] md:leading-[28px] font-medium text-white">EA FC 25: Ultimate Edition</h3>
                <p className="font-sans text-[10px] text-[#888] tracking-widest uppercase font-semibold">Colour</p>
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
                <img src="https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=2000&q=80" alt="A Leaf From The Moon" className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.08]" />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-500 ease-out pointer-events-none" />
              </div>
              <div className="flex flex-col gap-[6px] mt-2">
                <h3 className="font-sans text-[20px] md:text-[28px] leading-[1.2] md:leading-[28px] font-medium text-white">A Leaf From The Moon</h3>
                <p className="font-sans text-[10px] text-[#888] tracking-widest uppercase font-semibold">Colour</p>
              </div>
            </motion.div>
          </div>

          <div className="w-full flex justify-center mt-20 md:mt-32 pb-4">
            <button className="font-sans bg-white text-black rounded-full px-8 py-3 text-[11px] md:text-xs font-semibold tracking-wide uppercase hover:scale-105 transition-transform duration-300 cursor-pointer">
              See Them All
            </button>
          </div>
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section id="about" className="w-full py-24 mt-12 md:mt-20 border-t border-[#222]">
        <div className="w-full max-w-[1500px] mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-16 md:gap-24 lg:gap-32 items-start justify-between">
          <motion.div className="w-full md:w-1/2 flex flex-col gap-10" initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1, ease: "easeOut" }}>
            <h2 className="font-display text-6xl md:text-[90px] lg:text-[110px] font-semibold leading-[0.95] tracking-[-2px] text-white">
              Hi there,<br />I’m Parth
            </h2>
            <p className="font-sans text-[14px] md:text-[16px] text-[#aaa] leading-[1.8] max-w-[550px] font-medium">
              Passionate video editor with a strong eye for cinematic storytelling. I specialize in transforming raw footage into emotionally engaging visuals that connect with audiences. Born in India, processing globally, and driven by the power of visual language to connect across cultures and create work that feels both personal and universal.
            </p>
          </motion.div>
          <motion.div className="w-full md:w-1/2 flex justify-start md:justify-end" initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}>
            <div className="w-full md:w-[90%] lg:w-[700px] overflow-hidden bg-[#1a1a1a] cursor-hover rounded-[2px]" onMouseEnter={() => setIsImageHovered && setIsImageHovered(true)} onMouseLeave={() => setIsImageHovered && setIsImageHovered(false)}>
              <img src="/profilePic.avif" alt="Parth Panchal" className="w-full h-auto aspect-[3/4] object-cover grayscale opacity-90 hover:grayscale-0 hover:opacity-100 hover:scale-105 transition-all duration-700 ease-out" />
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
