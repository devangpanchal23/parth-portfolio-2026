import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import VideoShowcase from './VideoShowcase';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import ImageWithCursor from './ImageWithCursor';

const FeaturedProject = ({ 
  project, 
  slug, 
  reverse = false, 
  btn1Text = "Watch Project", 
  btn2Text = "Behind The Scenes",
  setIsImageHovered
}) => {
  const navigate = useNavigate();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const videoUrl = project.sections?.find(s => s.type === 'video')?.src || "";
  const posterUrl = project.sections?.find(s => s.type === 'video')?.poster || project.heroImage;

  return (
    <section className="w-full py-24 md:py-32 overflow-hidden border-b border-white/5">
      <div className="max-w-[1500px] mx-auto px-6 md:px-12">
        <div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-24`}>
          
          {/* Media Section */}
          <motion.div 
            className="w-full lg:w-[55%] relative group"
            initial={{ opacity: 0, scale: 0.95, x: reverse ? 50 : -50 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <ImageWithCursor 
              className="relative z-10 block"
              onMouseEnter={() => setIsImageHovered && setIsImageHovered(true)}
              onMouseLeave={() => setIsImageHovered && setIsImageHovered(false)}
            >
              <VideoShowcase 
                videoSrc={videoUrl}
                posterImage={posterUrl}
                className="aspect-video lg:aspect-[16/10] rounded-[4px]"
              />
            </ImageWithCursor>
            
            {/* Background Glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
          </motion.div>

          {/* Content Section */}
          <motion.div 
            className="w-full lg:w-[45%] flex flex-col gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="flex flex-col gap-4">
              <motion.span 
                variants={itemVariants}
                className="font-sans text-[10px] md:text-[12px] text-purple-400 tracking-[0.3em] uppercase font-bold"
              >
                {project.deliverables}
              </motion.span>
              <motion.h3 
                variants={itemVariants}
                className="font-display text-4xl md:text-5xl lg:text-7xl font-semibold leading-tight tracking-tight text-white"
              >
                {project.title}
              </motion.h3>
            </div>

            <motion.p 
              variants={itemVariants}
              className="font-sans text-base md:text-lg text-white/60 leading-relaxed max-w-[500px]"
            >
              {project.description}
            </motion.p>

            {/* Software Used */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
              {project.software?.map((tool, i) => (
                <span key={i} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] md:text-[11px] text-white/70 font-medium tracking-wide">
                  {tool}
                </span>
              ))}
            </motion.div>

            {/* Highlights */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6">
              {project.highlights?.map((h, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-purple-500/60" />
                  <span className="text-[12px] md:text-[13px] text-white/80 font-medium">{h}</span>
                </div>
              ))}
            </motion.div>

            {/* Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mt-4">
              <button 
                onClick={() => navigate(`/project/${slug}`)}
                className="group relative px-8 py-3.5 bg-white text-black rounded-full font-bold text-[11px] md:text-[12px] uppercase tracking-widest overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {btn1Text}
                  <ArrowUpRight size={16} className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              </button>
              
              <button 
                onClick={() => navigate(`/project/${slug}`)}
                className="px-8 py-3.5 border border-white/20 rounded-full font-bold text-[11px] md:text-[12px] uppercase tracking-widest text-white hover:bg-white/10 hover:border-white/40 transition-all duration-300"
              >
                {btn2Text}
              </button>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default FeaturedProject;
