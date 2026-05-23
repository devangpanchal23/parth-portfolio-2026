import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projectsData } from '../data';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import ImageCompareSlider from '../components/ImageCompareSlider';
import VideoPlayer from '../components/VideoPlayer';
import ProjectVideo from '../components/ProjectVideo';

export const ProjectDetail = ({ setIsImageHovered }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = projectsData[slug];

  useEffect(() => {
    window.scrollTo(0, 0);
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
      <section className="w-full max-w-[1500px] mx-auto px-6 md:px-12 pt-40 md:pt-56 pb-20 flex flex-col lg:flex-row gap-16 lg:gap-32">
        {/* Left: Title & Description */}
        <motion.div
          className="w-full lg:w-[60%] flex flex-col gap-8"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
        >
          <h1 className="font-display text-5xl md:text-[80px] lg:text-[100px] font-semibold leading-[0.95] tracking-[-2px]" style={{ textWrap: 'balance' }}>
            {project.title}
          </h1>
          <p className="font-sans text-[18px] md:text-[20px] leading-[1.6] max-w-[600px] text-white/70">
            {project.description}
          </p>
        </motion.div>

        {/* Right: Metadata Grid */}
        <motion.div
          className="w-full lg:w-[40%] grid grid-cols-2 gap-x-8 gap-y-10 content-start lg:pt-2"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex flex-col gap-1.5">
            <h4 className="font-sans text-[8px] md:text-[9px] text-[#666] tracking-[0.15em] uppercase font-bold">Client</h4>
            <p className="font-sans text-[10px] md:text-[11px] text-[#eee] tracking-[0.1em] uppercase font-bold">{project.client}</p>
          </div>
          <div className="flex flex-col gap-1.5">
            <h4 className="font-sans text-[8px] md:text-[9px] text-[#666] tracking-[0.15em] uppercase font-bold">Year</h4>
            <p className="font-sans text-[10px] md:text-[11px] text-[#eee] tracking-[0.1em] uppercase font-bold">{project.year}</p>
          </div>
          <div className="flex flex-col gap-1.5">
            <h4 className="font-sans text-[8px] md:text-[9px] text-[#666] tracking-[0.15em] uppercase font-bold">Role</h4>
            <p className="font-sans text-[10px] md:text-[11px] text-[#eee] tracking-[0.1em] uppercase font-bold">{project.role}</p>
          </div>
          <div className="flex flex-col gap-1.5">
            <h4 className="font-sans text-[8px] md:text-[9px] text-[#666] tracking-[0.15em] uppercase font-bold">Deliverables</h4>
            <p className="font-sans text-[10px] md:text-[11px] text-[#eee] tracking-[0.1em] uppercase font-bold">{project.deliverables}</p>
          </div>

          {project.software && (
            <div className="flex flex-col gap-1.5 col-span-2 mt-4">
              <h4 className="font-sans text-[8px] md:text-[9px] text-[#666] tracking-[0.15em] uppercase font-bold">Software</h4>
              <div className="flex flex-wrap gap-2 mt-1">
                {project.software.map((s, i) => (
                  <span key={i} className="text-[10px] md:text-[11px] text-white/80 bg-white/5 px-2 py-1 rounded border border-white/10 uppercase tracking-wider font-bold">{s}</span>
                ))}
              </div>
            </div>
          )}

          {project.highlights && (
            <div className="flex flex-col gap-1.5 col-span-2 mt-4">
              <h4 className="font-sans text-[8px] md:text-[9px] text-[#666] tracking-[0.15em] uppercase font-bold">Highlights</h4>
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
              <section key={idx} className="w-full max-w-[1500px] mx-auto px-4 md:px-12 pb-32">
                <motion.div
                  className={`w-full overflow-hidden bg-[#1a1a1a] rounded-[4px] cursor-hover ${item.aspect || 'aspect-[16/10]'}`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8 }}
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
              <section key={idx} className="w-full max-w-[1500px] mx-auto px-4 md:px-12 pb-32" onMouseEnter={() => setIsImageHovered && setIsImageHovered(true)} onMouseLeave={() => setIsImageHovered && setIsImageHovered(false)}>
                <VideoPlayer 
                  videoSrc={item.src}
                  posterImage={item.poster || ""}
                  className={`w-full ${item.aspect || 'aspect-[16/10]'}`}
                  autoPlay={false}
                />
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
            className="w-full max-w-[1500px] mx-auto px-4 md:px-12 pb-32"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }}
          >
            <div
              className="w-full overflow-hidden aspect-video md:aspect-[21/9] bg-[#1a1a1a] rounded-[4px] cursor-hover"
              onMouseEnter={() => setIsImageHovered && setIsImageHovered(true)} onMouseLeave={() => setIsImageHovered && setIsImageHovered(false)}
            >
              <img src={project.heroImage} alt={project.title} className="w-full h-full object-cover" />
            </div>
          </motion.section>

          {/* --- MEDIA SECTIONS --- */}
          {project.sections.map((section, idx) => (
            <section key={idx} className="w-full max-w-[1500px] mx-auto px-4 md:px-12 pb-32">
              {section.type === 'full' && (
                <motion.div
                  className="w-full overflow-hidden aspect-[16/10] bg-[#1a1a1a] rounded-[4px] cursor-hover"
                  initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}
                  onMouseEnter={() => setIsImageHovered && setIsImageHovered(true)} onMouseLeave={() => setIsImageHovered && setIsImageHovered(false)}
                >
                  <img src={section.src} className="w-full h-full object-cover" loading="lazy" alt="Project Shot" />
                </motion.div>
              )}

              {section.type === 'compare' && (
                <motion.div
                  className={`w-full overflow-hidden bg-[#1a1a1a] rounded-[4px] cursor-hover ${section.aspect || 'aspect-video'}`}
                  initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}
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
                <div className="w-full cursor-hover" onMouseEnter={() => setIsImageHovered && setIsImageHovered(true)} onMouseLeave={() => setIsImageHovered && setIsImageHovered(false)}>
                  <VideoPlayer
                    videoSrc={section.src}
                    posterImage={section.poster}
                    className="w-full aspect-video"
                  />
                </div>
              )}

              {section.type === 'youtube' && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}
                >
                  <ProjectVideo src={section.src} />
                </motion.div>
              )}

              {section.type === 'grid' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                  <motion.div
                    className={`w-full overflow-hidden ${section.aspect || 'aspect-[4/5]'} bg-[#1a1a1a] rounded-[4px] cursor-hover`}
                    initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}
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
                    className={`w-full overflow-hidden ${section.aspect || 'aspect-[4/5]'} bg-[#1a1a1a] rounded-[4px] cursor-hover`}
                    initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, delay: 0.2 }}
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
        <section className="w-full py-40 border-t border-[#1a1a1a] flex flex-col items-center justify-center text-center px-4 group cursor-pointer overflow-hidden" onClick={() => navigate(`/project/${nextSlug}`)}>
          <h2
            className="font-display text-5xl md:text-[80px] lg:text-[100px] font-semibold tracking-[-2px] text-white transition-all duration-500 ease-in-out group-hover:scale-[1.03] group-hover:opacity-70 max-w-[1000px] mx-auto origin-center"
            style={{ textWrap: 'balance' }}
          >
            Next Project
          </h2>
        </section>
      )}

      <Footer />
    </div>
  );
};
