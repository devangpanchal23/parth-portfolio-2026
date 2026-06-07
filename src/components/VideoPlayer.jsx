import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize } from 'lucide-react';

export default function VideoPlayer({ videoSrc, posterImage, className = "aspect-video", autoPlay = false, ignoreVerticalSizing = false }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(true); // Default muted for smooth autoplay or initial load
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(null);

  // --- CONTROLS VISIBILITY LOGIC ---
  const handleMouseMove = useCallback(() => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 2500); // Hide controls after 2.5s of inactivity
    }
  }, [isPlaying]);

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (isPlaying) {
      setShowControls(false);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setShowControls(true);
  };

  // --- VIDEO PLAYBACK LOGIC ---
  const togglePlay = (e) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play().catch(e => console.log("Playback failed:", e));
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
      setShowControls(true); // Ensure controls show when paused
    }
  };

  const toggleMute = (e) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const toggleFullscreen = async (e) => {
    if (e) e.stopPropagation();
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      try {
        await containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } catch (err) {
        console.error("Fullscreen failed", err);
      }
    } else {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  // --- EVENT LISTENERS ---
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration;
    setCurrentTime(current);
    if (total > 0) {
      setProgress((current / total) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      const width = videoRef.current.videoWidth;
      const height = videoRef.current.videoHeight;
      if (width && height) {
        setAspectRatio(width / height);
      }
      if (autoPlay) {
        videoRef.current.play().catch(e => console.log("Autoplay failed:", e));
      }
    }
  };

  const handleSeek = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const newTime = (parseFloat(e.target.value) / 100) * duration;
    videoRef.current.currentTime = newTime;
    setProgress(e.target.value);
  };

  // --- FORMATTING ---
  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds)) return "0:00";
    const m = Math.floor(timeInSeconds / 60);
    const s = Math.floor(timeInSeconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const isVertical = !ignoreVerticalSizing && aspectRatio && aspectRatio < 1;
  const verticalClasses = isVertical 
    ? "mx-auto w-full max-w-[280px] sm:max-w-[300px] lg:max-w-[320px] xl:max-w-[360px]" 
    : "";

  return (
    <motion.div
      ref={containerRef}
      className={`relative overflow-hidden bg-black rounded-[4px] border border-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.5)] group ${className} ${verticalClasses}`}
      style={{
        aspectRatio: aspectRatio ? aspectRatio : undefined
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={togglePlay} // Click video body to toggle play/pause
    >
      <video
        ref={videoRef}
        src={videoSrc}
        poster={posterImage}
        preload="metadata"
        className="w-full h-full object-cover transition-transform duration-700 ease-out"
        style={{
          transform: isHovered && !isPlaying && !isFullscreen ? 'scale(1.02)' : 'scale(1)'
        }}
        playsInline
        muted={isMuted}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => {
          setIsPlaying(false);
          setShowControls(true);
        }}
        onClick={(e) => e.stopPropagation()} // Let container handle the click
      />

      {/* Center Play Button Overlay */}
      <AnimatePresence>
        {!isPlaying && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center bg-black/20 z-10 pointer-events-none"
          >
            <div className="w-16 h-16 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white shadow-2xl transition-transform duration-300 group-hover:scale-110">
              <Play size={28} fill="currentColor" className="ml-1" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>



      {/* --- CUSTOM CONTROL BAR --- */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            className="absolute bottom-0 left-0 w-full px-4 pb-4 pt-16 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-20 flex flex-col gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()} // Prevent toggling play when clicking controls
            onMouseEnter={() => {
              if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
            }}
            onMouseLeave={handleMouseMove}
          >
            {/* Timeline Scrubber */}
            <div className="w-full group/scrubber relative h-1.5 bg-white/20 rounded-full cursor-pointer flex items-center">
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={handleSeek}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div
                className="h-full bg-white rounded-full transition-all duration-100 relative"
                style={{ width: `${progress}%` }}
              >
                {/* Scrubber Knob */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-white rounded-full scale-0 group-hover/scrubber:scale-100 transition-transform shadow-lg" />
              </div>
            </div>

            {/* Bottom Controls Row */}
            <div className="w-full flex justify-between items-center px-1">
              {/* Left Side: Play/Pause & Time */}
              <div className="flex items-center gap-4">
                <button
                  onClick={togglePlay}
                  className="text-white/80 hover:text-white transition-colors"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
                </button>
                <div className="flex items-center gap-1 font-mono text-[11px] md:text-xs text-white/70">
                  <span>{formatTime(currentTime)}</span>
                  <span>/</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Right Side: Volume & Fullscreen */}
              <div className="flex items-center gap-4">
                <button
                  onClick={toggleMute}
                  className="text-white/80 hover:text-white transition-colors"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                <button
                  onClick={toggleFullscreen}
                  className="text-white/80 hover:text-white transition-colors"
                  aria-label={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                >
                  {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
