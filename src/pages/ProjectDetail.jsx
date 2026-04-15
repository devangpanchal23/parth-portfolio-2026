import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projectsData } from '../data';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

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
          <h1 className="text-5xl md:text-[80px] lg:text-[100px] font-bold leading-[1.05] tracking-tighter">
            {project.title}
          </h1>
          <p className="text-[#a1a1a1] text-sm md:text-base leading-[1.8] max-w-[600px]">
            {project.description}
          </p>
        </motion.div>

        {/* Right: Metadata Grid */}
        <motion.div 
          className="w-full lg:w-[40%] grid grid-cols-2 gap-x-8 gap-y-12 content-start"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex flex-col gap-2">
            <h4 className="text-[10px] text-[#555] tracking-widest uppercase font-bold">Client</h4>
            <p className="text-[11px] md:text-xs text-[#d1d1d1] tracking-widest uppercase font-semibold">{project.client}</p>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-[10px] text-[#555] tracking-widest uppercase font-bold">Year</h4>
            <p className="text-[11px] md:text-xs text-[#d1d1d1] tracking-widest uppercase font-semibold">{project.year}</p>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-[10px] text-[#555] tracking-widest uppercase font-bold">Role</h4>
            <p className="text-[11px] md:text-xs text-[#d1d1d1] tracking-widest uppercase font-semibold">{project.role}</p>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-[10px] text-[#555] tracking-widest uppercase font-bold">Deliverables</h4>
            <p className="text-[11px] md:text-xs text-[#d1d1d1] tracking-widest uppercase font-semibold">{project.deliverables}</p>
          </div>
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
                  <video
                    className="w-full h-full object-cover"
                    src={item.src}
                    preload="metadata"
                    controls
                    muted
                    loop
                    playsInline
                    onError={(e) => { /* swallow and skip if video fails */ }}
                  />
                </motion.div>
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
            className="w-full px-4 md:px-8 pb-32"
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

              {section.type === 'grid' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                  <motion.div
                    className="w-full overflow-hidden aspect-[4/5] bg-[#1a1a1a] rounded-[4px] cursor-hover"
                    initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}
                    onMouseEnter={() => setIsImageHovered && setIsImageHovered(true)} onMouseLeave={() => setIsImageHovered && setIsImageHovered(false)}
                  >
                    <img src={section.src1} className="w-full h-full object-cover" loading="lazy" alt="Project Shot" />
                  </motion.div>
                  <motion.div
                    className="w-full overflow-hidden aspect-[4/5] bg-[#1a1a1a] rounded-[4px] cursor-hover"
                    initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, delay: 0.2 }}
                    onMouseEnter={() => setIsImageHovered && setIsImageHovered(true)} onMouseLeave={() => setIsImageHovered && setIsImageHovered(false)}
                  >
                    <img src={section.src2} className="w-full h-full object-cover" loading="lazy" alt="Project Shot" />
                  </motion.div>
                </div>
              )}
            </section>
          ))}
        </>
      )}

      {/* --- NEXT PROJECT CTA --- */}
      {project.nextSlug && (
        <section className="w-full py-40 border-t border-[#1a1a1a] flex flex-col items-center justify-center text-center px-4 group cursor-pointer" onClick={() => navigate(`/project/${project.nextSlug}`)}>
          <p className="text-[10px] md:text-sm text-[#666] tracking-widest uppercase font-bold mb-8 transition-colors group-hover:text-white">Next Project</p>
          <h2 className="text-5xl md:text-[80px] lg:text-[100px] font-bold tracking-tighter text-white transition-opacity group-hover:opacity-70">
            {project.nextTitle}
          </h2>
        </section>
      )}

      <Footer />
    </div>
  );
};
