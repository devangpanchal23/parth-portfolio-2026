import React from 'react';
import { useNavigate } from 'react-router-dom';
import { projectsData, extraProjects } from '../data';
import ImageWithCursor from '../components/ImageWithCursor';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const Projects = () => {
  const navigate = useNavigate();

  // Merge core projects + extras into one list (preserve keys)
  const merged = { ...projectsData, ...extraProjects };

  const entries = Object.entries(merged);

  return (
    <div className="w-full relative bg-[#0A0A0A] text-white min-h-screen">
      <Navbar />
      <main className="w-full max-w-[1500px] mx-auto px-6 md:px-12 pt-36 pb-24">
        <h1 className="font-display text-5xl md:text-[80px] font-semibold tracking-[-2px] mb-12">All Projects</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {entries.map(([slug, project]) => (
            <div key={slug} className="group">
              <div
                role="button"
                tabIndex={0}
                onClick={() => navigate(`/project/${slug}`)}
                onKeyDown={(e) => { if (e.key === 'Enter') navigate(`/project/${slug}`); }}
                className="cursor-hover w-full overflow-hidden bg-[#1a1a1a] rounded-[4px] h-56 flex items-center justify-center relative"
                data-cursor-size={100}
              >
                <img src={project.heroImage} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.08]" loading="lazy" />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-500 ease-out pointer-events-none" />
              </div>
              <div className="mt-4 flex flex-col gap-[6px]">
                <h3 className="font-sans text-[20px] md:text-[28px] leading-[1.2] md:leading-[28px] font-medium text-white truncate">{project.title}</h3>
                <p className="font-sans text-xs md:text-[14px] text-neutral-400 font-light leading-relaxed line-clamp-2 my-[2px]">{project.description}</p>
                <p className="font-sans text-[10px] text-[#888] uppercase tracking-widest">{project.year} • {project.role}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Projects;
