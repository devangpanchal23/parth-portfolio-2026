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
      <main className="max-w-[1500px] mx-auto px-6 md:px-12 pt-36 pb-24">
        <h1 className="text-5xl md:text-[80px] font-bold mb-12">All Projects</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {entries.map(([slug, project]) => (
            <div key={slug} className="group">
              <div
                role="button"
                tabIndex={0}
                onClick={() => navigate(`/project/${slug}`)}
                onKeyDown={(e) => { if (e.key === 'Enter') navigate(`/project/${slug}`); }}
                className="cursor-hover w-full overflow-hidden bg-[#1a1a1a] rounded-[4px] h-56 flex items-center justify-center"
                data-cursor-size={100}
              >
                <img src={project.heroImage} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              </div>
              <div className="mt-3">
                <h3 className="text-lg font-semibold">{project.title}</h3>
                <p className="text-xs text-[#888] uppercase tracking-widest mt-1">{project.year} • {project.role}</p>
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
