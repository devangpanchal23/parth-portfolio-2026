import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import { Footer } from '../components/Footer';
import ImageWithCursor from '../components/ImageWithCursor';
import { Skeleton } from 'boneyard-js/react';
import { projectsData } from '../data';
import parth1 from '../assets/images/parth1.jpg';
import parth2 from '../assets/images/parth2.jpg';
import lostDreamBanner from '../assets/images/lost_dream_banner.jpg';
import dreamsRealityBanner from '../assets/images/dreams_reality_banner.jpg';

export const Home = ({ setIsImageHovered, isPreloaderDone }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    if (isPreloaderDone) {
      const timer = setTimeout(() => setIsLoading(false), 800);
      return () => clearTimeout(timer);
    }
  }, [isPreloaderDone]);


  return (
    <div className="w-full relative bg-black">
      {/* --- HERO SECTION --- */}
      <HeroSection isPreloaderDone={isPreloaderDone} />

      {/* --- SELECTED WORK SECTION --- */}
      <section id="work" className="w-full pt-24 pb-12 md:pb-16 lg:pb-24 mt-12 border-t border-[#222]">
        <div className="w-full max-w-[1500px] mx-auto px-6 md:px-12">
          <h2 className="font-display text-4xl md:text-5xl lg:text-7xl font-semibold tracking-[-1px] mb-16 lowercase text-white">
            selected work.
          </h2>

          {/* FIRST ROW */}
          <div className="flex flex-col md:flex-row gap-8 lg:gap-12 w-full">
            {/* Canada Goose */}
            <Skeleton name="home-work-canada" loading={isLoading} className="w-full md:w-[40%]">
            <motion.div
              className="w-full flex flex-col gap-4 group"
              initial={{ opacity: 0, y: 60, filter: "blur(10px)" }} 
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} 
              viewport={{ once: true, margin: "-100px" }} 
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <ImageWithCursor 
                className="w-full overflow-hidden aspect-video bg-[#1a1a1a] cursor-hover relative"
                onMouseEnter={() => setIsImageHovered && setIsImageHovered(true)} 
                onMouseLeave={() => setIsImageHovered && setIsImageHovered(false)}
                onClick={() => navigate('/project/canada-goose')}
              >
                <img 
                  src={lostDreamBanner} 
                  alt="The Lost Dream Project" 
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 ease-out" 
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-500 ease-out pointer-events-none" />
              </ImageWithCursor>
              <div className="flex flex-col gap-[6px] mt-2">
                <h3 className="font-sans text-[20px] md:text-[28px] leading-[1.2] md:leading-[28px] font-medium text-white">
                  {projectsData["canada-goose"]?.title || "Canada Goose: Heritage & Craftsmanship"}
                </h3>
                <p className="font-sans text-xs md:text-[14px] text-neutral-400 font-light leading-relaxed max-w-[90%] line-clamp-2 my-[2px]">
                  {projectsData["canada-goose"]?.description}
                </p>
                <p className="font-sans text-[10px] text-[#888] tracking-widest uppercase font-semibold">Editorial / Film</p>
              </div>
            </motion.div>
            </Skeleton>

            {/* Pepsi */}
            <Skeleton name="home-work-pepsi" loading={isLoading} className="w-full md:w-[60%]">
            <motion.div
              className="w-full flex flex-col gap-4 group"
              initial={{ opacity: 0, y: 60, filter: "blur(10px)" }} 
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} 
              viewport={{ once: true, margin: "-100px" }} 
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            >
              <ImageWithCursor 
                className="w-full overflow-hidden aspect-[4/3] bg-[#1a1a1a] cursor-hover relative"
                onMouseEnter={() => setIsImageHovered && setIsImageHovered(true)} 
                onMouseLeave={() => setIsImageHovered && setIsImageHovered(false)}
                onClick={() => navigate('/project/pepsi-generation')}
              >
                <img 
                  src={dreamsRealityBanner} 
                  alt="From Dreams to Reality" 
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 ease-out" 
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-500 ease-out pointer-events-none" />
              </ImageWithCursor>
              <div className="flex flex-col gap-[6px] mt-2">
                <h3 className="font-sans text-[20px] md:text-[28px] leading-[1.2] md:leading-[28px] font-medium text-white">
                  {projectsData["pepsi-generation"]?.title || "Pepsi: The New Generation"}
                </h3>
                <p className="font-sans text-xs md:text-[14px] text-neutral-400 font-light leading-relaxed max-w-[90%] line-clamp-2 my-[2px]">
                  {projectsData["pepsi-generation"]?.description}
                </p>
                <p className="font-sans text-[10px] text-[#888] tracking-widest uppercase font-semibold">Commercial / Colour</p>
              </div>
            </motion.div>
            </Skeleton>
          </div>

          {/* SECOND ROW */}
          <div className="flex flex-col md:flex-row gap-8 lg:gap-12 w-full mt-12 md:mt-24">
            {/* Under Armour */}
            <Skeleton name="home-work-underarmour" loading={isLoading} className="w-full">
            <motion.div
              className="w-full flex flex-col gap-4 group"
              initial={{ opacity: 0, y: 60, filter: "blur(10px)" }} 
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} 
              viewport={{ once: true, margin: "-100px" }} 
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <ImageWithCursor
                className="w-full overflow-hidden aspect-[16/10] bg-[#1a1a1a] cursor-hover relative"
                onMouseEnter={() => setIsImageHovered && setIsImageHovered(true)}
                onMouseLeave={() => setIsImageHovered && setIsImageHovered(false)}
                onClick={() => navigate('/project/project-rock')}
              >
                <img
                  src={projectsData["project-rock"]?.heroImage}
                  alt={projectsData["project-rock"]?.title || "Urban Studio Commercial"}
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-500 ease-out pointer-events-none" />
              </ImageWithCursor>

              <div className="flex flex-col gap-[6px] mt-2">
                <h3 className="font-sans text-[20px] md:text-[28px] leading-[1.2] md:leading-[28px] font-medium text-white">
                  {projectsData["project-rock"]?.title || "Under Armour x Project Rock"}
                </h3>
                <p className="font-sans text-xs md:text-[14px] text-neutral-400 font-light leading-relaxed max-w-[90%] line-clamp-2 my-[2px]">
                  {projectsData["project-rock"]?.description}
                </p>
                <p className="font-sans text-[10px] text-[#888] tracking-widest uppercase font-semibold">Sport / Cinematic</p>
              </div>
            </motion.div>
            </Skeleton>
          </div>

          <div className="w-full flex justify-center mt-20 md:mt-32 pb-4">
            <button className="font-sans bg-white text-black rounded-full px-8 py-3 text-[11px] md:text-xs font-semibold tracking-wide uppercase hover:scale-105 transition-transform duration-300 cursor-pointer">
              See Them All
            </button>
          </div>
        </div>
      </section>


      {/* --- ABOUT SECTION --- */}
      <section id="about" className="w-full pt-12 pb-24 md:pt-16 lg:pt-24 mt-8 md:mt-12 lg:mt-20 border-t border-[#222]">
        <div className="w-full max-w-[1500px] mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-16 md:gap-24 lg:gap-32 items-start justify-between">
          <motion.div 
            className="w-full md:w-1/2 flex flex-col gap-10" 
            initial={{ opacity: 0, x: -50, filter: "blur(10px)" }} 
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }} 
            viewport={{ once: true, margin: "-100px" }} 
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-display text-6xl md:text-[90px] lg:text-[110px] font-semibold leading-[0.95] tracking-[-2px] text-white">
              Hi,<br />I’m Parth
            </h2>
            <div className="font-sans text-[14px] md:text-[16px] text-[#aaa] leading-[1.8] max-w-[550px] font-medium flex flex-col gap-6">
              <p>
                A colorist focused on creating cinematic visuals that elevate storytelling and bring creative visions to life. I specialize in transforming raw footage into polished, impactful imagery through thoughtful color grading and a strong understanding of visual language.
              </p>
              <p>
                While color grading is my primary focus, I also offer editing support when needed, helping clients streamline their post-production process without relying on multiple creatives.
              </p>
              <p>
                Based in India and working with clients worldwide, I create visuals that are not only refined and cinematic but also meaningful and memorable.
              </p>
            </div>
          </motion.div>
          <motion.div 
            className="w-full md:w-1/2 flex justify-start md:justify-end" 
            initial={{ opacity: 0, x: 50, filter: "blur(10px)" }} 
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }} 
            viewport={{ once: true, margin: "-100px" }} 
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          >
            <Skeleton name="home-about-image" loading={isLoading} className="w-full md:w-[90%] lg:w-[700px]">
            <ImageWithCursor 
              className="w-full overflow-hidden bg-[#1a1a1a] cursor-hover rounded-[2px] relative group" 
              onMouseEnter={() => setIsImageHovered && setIsImageHovered(true)} 
              onMouseLeave={() => setIsImageHovered && setIsImageHovered(false)}
            >
              <img 
                src={parth1} 
                alt="Parth Panchal" 
                className="w-full h-auto aspect-[3/4] object-cover grayscale opacity-90 group-hover:opacity-0 transition-all duration-700 ease-out" 
              />
              <img 
                src={parth2} 
                alt="Parth Panchal Hover" 
                className="w-full h-full absolute inset-0 object-cover opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out" 
              />
            </ImageWithCursor>
            </Skeleton>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
