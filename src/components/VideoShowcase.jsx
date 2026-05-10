import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play } from 'lucide-react';

export default function VideoShowcase({ videoSrc, posterImage, className = "aspect-video" }) {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handlePlayPause = () => {
        if (!videoRef.current) return;

        if (isPlaying) {
            videoRef.current.pause();
            setIsPlaying(false);
        } else {
            videoRef.current.play();
            setIsPlaying(true);
        }
    };

    return (
        <motion.div
            className={`w-full relative overflow-hidden bg-[#0a0a0a] rounded-[4px] border border-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.5)] group ${className}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Video Element */}
            <video
                ref={videoRef}
                src={videoSrc}
                poster={posterImage}
                preload="metadata"
                className="w-full h-full object-cover transition-transform duration-700 ease-out"
                style={{
                    transform: isHovered && !isPlaying ? 'scale(1.02)' : 'scale(1)'
                }}
                controls={isPlaying} // Reveal browser controls seamlessly only once playing
                onClick={isPlaying ? handlePlayPause : undefined}
                playsInline
            />

            {/* Cinematic Overlay & Grain */}
            <AnimatePresence>
                {!isPlaying && (
                    <motion.div
                        className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer pointer-events-auto"
                        onClick={handlePlayPause}
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        {/* Subtle dark gradient overlay to make play button pop. Fades in stronger on hover */}
                        <div className="absolute inset-0 bg-black/20 transition-opacity duration-700 group-hover:bg-black/40" />

                        {/* Subtle Film Grain (using an inline SVG as a noise generating base to avoid missing assets) */}
                        <div
                            className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                            }}
                        />

                        {/* Play Button */}
                        <div
                            className="relative flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_0_30px_rgba(124,58,237,0.3)] transition-all duration-700 opacity-90 md:opacity-0 group-hover:opacity-100 group-hover:scale-105"
                        >
                            <div className="absolute inset-0 rounded-full bg-[#7c3aed]/20 blur-xl animate-pulse" />
                            <Play className="text-white ml-2 relative z-10" size={32} fill="white" />
                        </div>

                        {/* Play Label */}
                        <div className="absolute bottom-6 left-8 md:bottom-8 md:left-10 opacity-90 md:opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                            <p className="font-sans text-[9px] md:text-[11px] text-white/50 tracking-[0.2em] uppercase font-bold group-hover:text-white/90 transition-colors">
                                Play Project
                            </p>
                        </div>

                        {/* Duration / Status */}
                        <div className="absolute bottom-6 right-8 md:bottom-8 md:right-10 opacity-90 md:opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                            <p className="font-sans text-[9px] md:text-[11px] text-white/50 tracking-[0.2em] uppercase font-bold">
                                Cinematic Reel
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
