import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projectsData } from '../data';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import ImageCompareSlider from '../components/ImageCompareSlider';
import VideoPlayer from '../components/VideoPlayer';
import ProjectVideo from '../components/ProjectVideo';

// Optimized helper to map media to compact, low-height widescreen aspect ratios specifically on mobile devices
const getResponsiveAspect = (aspectClass) => {
  if (!aspectClass) return 'aspect-video sm:aspect-[16/10]';
  const clean = aspectClass.trim();
  
  if (clean.includes('21/9')) {
    return 'aspect-[2.39/1] xs:aspect-[21/9]';
  }
  if (clean.includes('24/9')) {
    return 'aspect-[2.39/1] xs:aspect-[24/9]';
  }
  if (clean.includes('16/9') || clean.includes('aspect-video')) {
    return 'aspect-video';
  }
  if (clean.includes('16/10')) {
    return 'aspect-video sm:aspect-[16/10]';
  }
  if (clean.includes('4/5')) {
    return 'aspect-video sm:aspect-[4/5]';
  }
  
  return clean;
};

export const ProjectDetail = ({ setIsImageHovered }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = projectsData[slug];

  // Global scroll restoration using Lenis
  useEffect(() => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-bold tracking-tighter mb-4">Project Not Found</h1>
        <Link to="/" className="text-gray-400 hover:text-white underline tracking-widest text-sm uppercase">Return Home</Link>
      </div>
    );
  }

  const projectKeys = Object.keys(projectsData);
  const currentIndex = projectKeys.indexOf(slug);
  const nextSlug = projectKeys[(currentIndex + 1) % projectKeys.length];

  return (
    <div className="w-full relative bg-[#0A0A0A] text-white">
      <Navbar />

      {/* --- PROJECT HEADER --- */}
      <section className="w-full max-w-[1200px] mx-auto px-6 md:px-12 pt-16 sm:pt-24 md:pt-44 pb-6 md:pb-16 flex flex-col lg:flex-row gap-6 md:gap-16 lg:gap-24">
        {/* Left: Title & Description */}
        <motion.div
          className="w-full lg:w-[60%] flex flex-col gap-4 sm:gap-6 will-change-gpu"
          initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="font-display text-3xl xs:text-4xl md:text-[64px] lg:text-[80px] font-semibold leading-[1.0] tracking-[-2px]" style={{ textWrap: 'balance' }}>
            {project.title}
          </h1>
          <p className="font-sans text-[14px] xs:text-[15px] md:text-[18px] leading-[1.6] max-w-[550px] text-white/70">
            {project.description}
          </p>
        </motion.div>

        {/* Right: Metadata Grid */}
        <motion.div
          className="w-full lg:w-[40%] grid grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-4 sm:gap-y-8 content-start lg:pt-2 will-change-gpu"
          initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex flex-col gap-1">
            <h4 className="font-sans text-[8px] md:text-[9px] text-[#555] tracking-[0.15em] uppercase font-bold">Client</h4>
            <p className="font-sans text-[10px] md:text-[11px] text-[#eee] tracking-[0.1em] uppercase font-bold">{project.client}</p>
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="font-sans text-[8px] md:text-[9px] text-[#555] tracking-[0.15em] uppercase font-bold">Year</h4>
            <p className="font-sans text-[10px] md:text-[11px] text-[#eee] tracking-[0.1em] uppercase font-bold">{project.year}</p>
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="font-sans text-[8px] md:text-[9px] text-[#555] tracking-[0.15em] uppercase font-bold">Role</h4>
            <p className="font-sans text-[10px] md:text-[11px] text-[#eee] tracking-[0.1em] uppercase font-bold">{project.role}</p>
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="font-sans text-[8px] md:text-[9px] text-[#555] tracking-[0.15em] uppercase font-bold">Deliverables</h4>
            <p className="font-sans text-[10px] md:text-[11px] text-[#eee] tracking-[0.1em] uppercase font-bold">{project.deliverables}</p>
          </div>

          {project.software && (
            <div className="flex flex-col gap-1 col-span-2 mt-2">
              <h4 className="font-sans text-[8px] md:text-[9px] text-[#555] tracking-[0.15em] uppercase font-bold">Software</h4>
              <div className="flex flex-wrap gap-2 mt-1">
                {project.software.map((s, i) => (
                  <span key={i} className="text-[10px] md:text-[11px] text-white/80 bg-white/5 px-2 py-1 rounded border border-white/10 uppercase tracking-wider font-bold">{s}</span>
                ))}
              </div>
            </div>
          )}

          {project.highlights && (
            <div className="flex flex-col gap-1 col-span-2 mt-2">
              <h4 className="font-sans text-[8px] md:text-[9px] text-[#555] tracking-[0.15em] uppercase font-bold">Highlights</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
                {project.highlights.map((h, i) => (
                  <li key={i} className="text-[10px] md:text-[11px] text-white/70 flex items-center gap-2 uppercase tracking-tight font-medium">
                    <span className="w-1 h-1 bg-purple-500 rounded-full" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      </section>

      {/* --- MEDIA (images + videos) --- */}
      {project.media && project.media.length ? (
        project.media.map((item, idx) => {
          // Render image
          if (item.type === 'image') {
            return (
              <section key={idx} className="w-full max-w-[1200px] mx-auto px-[15%] lg:px-12 pb-8 sm:pb-16 md:pb-24">
                <motion.div
                  className={`w-full overflow-hidden bg-[#1a1a1a] border border-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.5)] rounded-[4px] cursor-hover will-change-gpu ${getResponsiveAspect(item.aspect)}`}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  onMouseEnter={() => setIsImageHovered && setIsImageHovered(true)}
                  onMouseLeave={() => setIsImageHovered && setIsImageHovered(false)}
                >
                  <img src={item.src} alt={item.alt || project.title} className="w-full h-full object-cover" loading="lazy" />
                </motion.div>
              </section>
            );
          }

          // Render video
          if (item.type === 'video') {
            return (
              <section key={idx} className="w-full max-w-[1200px] mx-auto px-[15%] lg:px-12 pb-8 sm:pb-16 md:pb-24">
                <div className="w-full cursor-hover will-change-gpu" onMouseEnter={() => setIsImageHovered && setIsImageHovered(true)} onMouseLeave={() => setIsImageHovered && setIsImageHovered(false)}>
                  <VideoPlayer 
                    videoSrc={item.src}
                    posterImage={item.poster || ""}
                    className="w-full aspect-video"
                    autoPlay={false}
                  />
                </div>
              </section>
            );
          }

          // Unknown media type -> skip
          return null;
        })
      ) : (
        // Fallback to existing hero + sections rendering for backward compatibility
        <>
          {/* --- HERO MEDIA --- */}
          <motion.section
            className="w-full max-w-[1200px] mx-auto px-[15%] lg:px-12 pb-8 sm:pb-16 md:pb-24"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }}
          >
            <div
              className="w-full overflow-hidden aspect-video bg-[#1a1a1a] border border-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.5)] rounded-[4px] cursor-hover will-change-gpu"
              onMouseEnter={() => setIsImageHovered && setIsImageHovered(true)} onMouseLeave={() => setIsImageHovered && setIsImageHovered(false)}
            >
              <img src={project.heroImage} alt={project.title} className="w-full h-full object-cover" fetchPriority="high" />
            </div>
          </motion.section>

          {/* --- MEDIA SECTIONS --- */}
          {project.sections.map((section, idx) => (
            <section key={idx} className="w-full max-w-[1200px] mx-auto px-[15%] lg:px-12 pb-8 sm:pb-16 md:pb-24">
              {section.type === 'full' && (
                <motion.div
                  className="w-full overflow-hidden aspect-video sm:aspect-[16/10] bg-[#1a1a1a] border border-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.5)] rounded-[4px] cursor-hover will-change-gpu"
                  initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  onMouseEnter={() => setIsImageHovered && setIsImageHovered(true)} onMouseLeave={() => setIsImageHovered && setIsImageHovered(false)}
                >
                  <img src={section.src} className="w-full h-full object-cover" loading="lazy" alt="Project Shot" />
                </motion.div>
              )}

              {section.type === 'compare' && (
                <motion.div
                  className={`w-full overflow-hidden bg-[#1a1a1a] border border-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.5)] rounded-[4px] cursor-hover will-change-gpu ${getResponsiveAspect(section.aspect)}`}
                  initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  onMouseEnter={() => setIsImageHovered && setIsImageHovered(true)} onMouseLeave={() => setIsImageHovered && setIsImageHovered(false)}
                >
                  <div className="w-full h-full relative group">
                    <ImageCompareSlider
                      beforeImage={section.before}
                      afterImage={section.after}
                      alt="Before and After Grade"
                    />
                  </div>
                </motion.div>
              )}

              {section.type === 'video' && (
                <div className="w-full cursor-hover will-change-gpu" onMouseEnter={() => setIsImageHovered && setIsImageHovered(true)} onMouseLeave={() => setIsImageHovered && setIsImageHovered(false)}>
                  <VideoPlayer
                    videoSrc={section.src}
                    posterImage={section.poster}
                    className="w-full aspect-video"
                  />
                </div>
              )}

              {section.type === 'youtube' && (
                <div className="w-full cursor-hover will-change-gpu" onMouseEnter={() => setIsImageHovered && setIsImageHovered(true)} onMouseLeave={() => setIsImageHovered && setIsImageHovered(false)}>
                  <ProjectVideo src={section.src} className="w-full aspect-video" />
                </div>
              )}

              {section.type === 'grid' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10">
                  <motion.div
                    className={`w-full overflow-hidden ${section.aspect ? getResponsiveAspect(section.aspect) : 'aspect-[4/3] sm:aspect-[4/5]'} bg-[#1a1a1a] border border-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.5)] rounded-[4px] cursor-hover will-change-gpu`}
                    initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    onMouseEnter={() => setIsImageHovered && setIsImageHovered(true)} onMouseLeave={() => setIsImageHovered && setIsImageHovered(false)}
                  >
                    {section.isVideo ? (
                      <VideoPlayer 
                        videoSrc={section.src1} 
                        posterImage={section.poster1} 
                        className="w-full h-full"
                        autoPlay={false}
                      />
                    ) : (
                      <img src={section.src1} className="w-full h-full object-cover" loading="lazy" alt="Project Shot" />
                    )}
                  </motion.div>
                  <motion.div
                    className={`w-full overflow-hidden ${section.aspect ? getResponsiveAspect(section.aspect) : 'aspect-[4/3] sm:aspect-[4/5]'} bg-[#1a1a1a] border border-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.5)] rounded-[4px] cursor-hover will-change-gpu`}
                    initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    onMouseEnter={() => setIsImageHovered && setIsImageHovered(true)} onMouseLeave={() => setIsImageHovered && setIsImageHovered(false)}
                  >
                    {section.isVideo ? (
                      <VideoPlayer 
                        videoSrc={section.src2} 
                        posterImage={section.poster2} 
                        className="w-full h-full"
                        autoPlay={false}
                      />
                    ) : (
                      <img src={section.src2} className="w-full h-full object-cover" loading="lazy" alt="Project Shot" />
                    )}
                  </motion.div>
                </div>
              )}
            </section>
          ))}
        </>
      )}

      {/* --- NEXT PROJECT CTA --- */}
      {nextSlug && (
        <section 
          className="w-full py-16 sm:py-24 md:py-36 border-t border-white/5 flex flex-col items-center justify-center text-center px-4 group cursor-pointer overflow-hidden bg-[#070707] hover:bg-[#0A0A0A] transition-colors duration-700 ease-out" 
          onClick={() => navigate(`/project/${nextSlug}`)}
        >
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center will-change-gpu"
          >
            <p className="font-sans text-[10px] md:text-[11px] text-[#555] tracking-[0.25em] uppercase font-bold mb-3 transition-colors duration-500 group-hover:text-purple-400">
              Next Project
            </p>
            <h2
              className="font-display text-3xl md:text-[64px] lg:text-[80px] font-semibold leading-[1.1] tracking-[-2px] text-white/80 transition-all duration-700 ease-out group-hover:scale-[1.01] group-hover:text-white max-w-[900px] mx-auto origin-center"
              style={{ textWrap: 'balance' }}
            >
              {projectsData[nextSlug].title}
            </h2>
          </motion.div>
        </section>
      )}

      <Footer />
    </div>
  );
};
