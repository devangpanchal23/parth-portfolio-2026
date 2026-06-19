import React, { useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import lostDreamBanner from '../assets/images/lost_dream_banner.jpg';
import dreamsRealityBanner from '../assets/images/dreams_reality_banner.jpg';
import img11 from '../assets/images/1.1.png';
import img12 from '../assets/images/1.2.png';
import img21 from '../assets/images/2.1.png';
import img22 from '../assets/images/2.2.png';
import img31 from '../assets/images/3.1.png';
import img32 from '../assets/images/3.2.png';
import img33 from '../assets/images/3.3.png';

const SLIDER_ITEMS = [
  { src: lostDreamBanner, alt: 'The Lost Dream Project' },
  { src: img33, alt: 'Urban Studio Commercial' },
  { src: dreamsRealityBanner, alt: 'From Dreams to Reality' },
  { src: img11, alt: 'Cinematic color grade still' },
  { src: img22, alt: 'Travel narrative frame' },
  { src: img32, alt: 'Fashion commercial look' },
  { src: img12, alt: 'Editorial film still' },
  { src: img31, alt: 'Look development frame' },
];

const SLIDE_WIDTH = {
  mobile: 148,
  tablet: 172,
  desktop: 208,
};

const SLIDE_HEIGHT = {
  mobile: 92,
  tablet: 108,
  desktop: 130,
};

const ShowcaseSlide = ({ item, index, eager }) => (
  <div
    className="hero-showcase-slide flex-shrink-0 overflow-hidden rounded-[14px] bg-zinc-900 shadow-[0_8px_32px_rgba(0,0,0,0.45)] ring-1 ring-white/[0.06]"
    aria-hidden={index >= SLIDER_ITEMS.length}
  >
    <img
      src={item.src}
      alt={index < SLIDER_ITEMS.length ? item.alt : ''}
      width={SLIDE_WIDTH.desktop}
      height={SLIDE_HEIGHT.desktop}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      draggable={false}
      className="h-full w-full object-cover select-none"
    />
  </div>
);

const HeroShowcaseSlider = ({ className = '', animationDelay = 1.1 }) => {
  const [isPaused, setIsPaused] = useState(false);
  const touchTimeoutRef = useRef(null);

  const pause = useCallback(() => setIsPaused(true), []);

  const resume = useCallback(() => {
    if (touchTimeoutRef.current) {
      clearTimeout(touchTimeoutRef.current);
    }
    setIsPaused(false);
  }, []);

  const handleTouchStart = useCallback(() => {
    if (touchTimeoutRef.current) {
      clearTimeout(touchTimeoutRef.current);
    }
    setIsPaused(true);
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (touchTimeoutRef.current) {
      clearTimeout(touchTimeoutRef.current);
    }
    touchTimeoutRef.current = setTimeout(() => setIsPaused(false), 1200);
  }, []);

  const duplicatedItems = [...SLIDER_ITEMS, ...SLIDER_ITEMS];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: animationDelay, ease: [0.16, 1, 0.3, 1] }}
      className={`w-full ${className}`}
      onMouseEnter={pause}
      onMouseLeave={resume}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      <div
        className="hero-showcase-viewport relative w-full overflow-hidden"
        aria-label="Portfolio showcase"
        role="region"
      >
        <div
          className="hero-showcase-track flex w-max gap-3 md:gap-4"
          style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
        >
          {duplicatedItems.map((item, index) => (
            <ShowcaseSlide
              key={`${item.alt}-${index}`}
              item={item}
              index={index}
              eager={index < SLIDER_ITEMS.length}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default HeroShowcaseSlider;
