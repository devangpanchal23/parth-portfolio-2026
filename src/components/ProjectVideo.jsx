import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const ProjectVideo = ({ src, className = "aspect-[16/9]" }) => {
  // Ensure the YouTube URL has the cleanest possible parameters for a portfolio
  const cleanUrl = useMemo(() => {
    if (!src) return "";
    try {
      const url = new URL(src);
      // Only modify YouTube URLs
      if (url.hostname.includes('youtube.com') || url.hostname.includes('youtu.be')) {
        url.searchParams.set('rel', '0');
        url.searchParams.set('modestbranding', '1');
        url.searchParams.set('showinfo', '0');
        url.searchParams.set('color', 'white');
        url.searchParams.set('playsinline', '1');
      }
      return url.toString();
    } catch {
      return src; // Fallback to raw src if parsing fails
    }
  }, [src]);

  if (!src) return null;

  return (
    <motion.div 
      className={`relative overflow-hidden bg-black rounded-[4px] border border-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.5)] group ${className}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
    >
      <iframe
        src={cleanUrl}
        title="Project Video"
        className="absolute top-0 left-0 w-full h-full"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
      ></iframe>
    </motion.div>
  );
};

export default ProjectVideo;
