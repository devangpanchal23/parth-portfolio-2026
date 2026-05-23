import img1Before from "./media/img-1-before.png";
import img1After from "./media/img-1-after.png";
import img2Before from "./media/img-2-before.png";
import img2After from "./media/img-2-after.png";
import img3Before from "./media/img-3-before.png";
import img3After from "./media/img-3-after.png";

export const projectsData = {
  "canada-goose": {
    title: "Canada Goose: Heritage & Craftsmanship",
    client: "Canada Goose",
    year: "2024",
    role: "Video Editor / Colorist",
    deliverables: "Video Editing / Color Grading",
    description: "A deep dive into the legacy of Canada Goose, highlighting their commitment to extreme weather protection and timeless craftsmanship. The edit required precise pacing to balance emotional storytelling intricately with technical product details.",
    heroImage: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=1600&q=80",
    sections: [
      { type: "full", src: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=2000&q=80" },
      { type: "compare", before: img1Before, after: img1After, aspect: "aspect-[16/9]" },
      { type: "youtube", src: "https://www.youtube.com/embed/Jcj6kJvc_Vw" },
    ],
    nextSlug: "pepsi-generation",
    nextTitle: "Pepsi: The New Generation"
  },
  "pepsi-generation": {
    title: "Pepsi: The New Generation",
    client: "Pepsi",
    year: "2023",
    role: "Lead Editor",
    deliverables: "Video Editing / Sound Design",
    description: "A vibrant, fast-paced commercial cutting sharply to an original score. Designed to capture youth culture and high-energy moments.",
    heroImage: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=1600&q=80",
    sections: [
      { type: "compare", before: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=1600&q=80&exp=-40&con=10", after: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=1600&q=80&exp=0", aspect: "aspect-[16/10]" },
      { type: "video", src: "https://videos.pexels.com/video-files/4010134/4010134-uhd_3840_2160_25fps.mp4", poster: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=1600&q=80" },
      { type: "full", src: "https://images.unsplash.com/photo-1587329310686-91414b8e3cb7?w=2000&q=80" },
    ],
    nextSlug: "project-rock",
    nextTitle: "Under Armour x Project Rock"
  },
  "project-rock": {
    title: "Under Armour x Project Rock",
    client: "Under Armour",
    year: "2024",
    role: "Editor / Colorist",
    deliverables: "Video Editing",
    description: "Gritty, powerful, and intense. A sports commercial focusing on pushing limits and breaking barriers.",
    heroImage: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=1600&q=80",
    sections: [
      { type: "compare", before: img2Before, after: img2After, aspect: "aspect-[16/9]" },
      { type: "video", src: "https://videos.pexels.com/video-files/3206020/3206020-uhd_2560_1440_25fps.mp4", poster: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=1600&q=80" },
      { type: "full", src: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=2000&q=80" },
    ],
    nextSlug: "leaf-moon",
    nextTitle: "A Leaf From The Moon"
  },
  "ea-fc": {
    title: "EA FC 25: Ultimate Edition",
    client: "EA Sports",
    year: "2024",
    role: "Editor",
    deliverables: "Video Editing / Promo",
    description: "A high-energy promotional campaign for EA FC 25 focusing on cinematic gameplay and emotional hooks.",
    heroImage: "https://images.unsplash.com/photo-1587329310686-91414b8e3cb7?w=1600&q=80",
    sections: [
      { type: "full", src: "https://images.unsplash.com/photo-1587329310686-91414b8e3cb7?w=2000&q=80" },
      { type: "compare", before: "https://images.unsplash.com/photo-1587329310686-91414b8e3cb7?w=1600&q=80&sat=-40&con=-10", after: "https://images.unsplash.com/photo-1587329310686-91414b8e3cb7?w=1600&q=80&sat=30&con=20", aspect: "aspect-video" },
      { type: "video", src: "https://videos.pexels.com/video-files/853889/853889-hd_1920_1080_25fps.mp4", poster: "https://images.unsplash.com/photo-1587329310686-91414b8e3cb7?w=2000&q=80" },
    ],
    nextSlug: "project-rock",
    nextTitle: "Under Armour x Project Rock"
  },
  "leaf-moon": {
    title: "A Leaf From The Moon",
    client: "Short Film",
    year: "2024",
    role: "Director / Editor",
    deliverables: "Editing",
    description: "A surreal indie narrative film exploring human connection through beautiful cinematic sequences.",
    heroImage: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=2000&q=80",
    sections: [
      { type: "compare", before: img3Before, after: img3After, aspect: "aspect-[24/9]" },
      { type: "video", src: "https://videos.pexels.com/video-files/5199624/5199624-uhd_3840_2160_24fps.mp4", poster: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=2000&q=80" }
    ],
    nextSlug: "midnight-drive",
    nextTitle: "Midnight Drive"
  },
  "midnight-drive": {
    title: "Midnight Drive",
    client: "Luxury Automotive",
    year: "2024",
    role: "Video Editor / Motion Graphics",
    deliverables: "Cinematic Commercial Edit",
    description: "A fast-paced cinematic commercial edit focused on luxury automotive visuals, dramatic transitions, speed ramping, motion blur effects, and high-energy sound synchronization. Designed to create a premium advertisement-style viewing experience with smooth storytelling and intense visual pacing.",
    heroImage: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=1600&q=80",
    software: ["Adobe Premiere Pro", "After Effects", "DaVinci Resolve"],
    highlights: ["Cinematic color grading", "Speed ramp transitions", "Motion blur effects", "Beat-synced editing", "Smooth text animations", "High-end commercial pacing"],
    sections: [
      { type: "video", src: "https://videos.pexels.com/video-files/3206020/3206020-uhd_2560_1440_25fps.mp4", poster: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=1600&q=80" },
      { type: "full", src: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=2000&q=80" },
    ],
    nextSlug: "echo-frames",
    nextTitle: "Echo Frames"
  },
  "echo-frames": {
    title: "Echo Frames",
    client: "Music Artist",
    year: "2024",
    role: "Editor / VFX Artist",
    deliverables: "Music Video Editing",
    description: "A stylish music video editing project focused on rhythm-based cuts, cinematic storytelling, glowing visual effects, smooth transitions, and immersive scene blending. The edit should feel emotionally engaging with a modern creative direction and polished visual atmosphere.",
    heroImage: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=2000&q=80",
    software: ["After Effects", "Premiere Pro", "Blender"],
    highlights: ["Beat-synced transitions", "Glow & light effects", "Cinematic storytelling", "Smooth scene blending", "Creative motion graphics", "Professional color correction"],
    sections: [
      { type: "video", src: "https://videos.pexels.com/video-files/5199624/5199624-uhd_3840_2160_24fps.mp4", poster: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=2000&q=80" },
      { type: "full", src: "https://images.unsplash.com/photo-1587329310686-91414b8e3cb7?w=2000&q=80" },
    ],
    nextSlug: "canada-goose",
    nextTitle: "Canada Goose: Heritage & Craftsmanship"
  }
};

// Additional portfolio entries for "See Them All"
export const extraProjects = {
  "colour-grade-essentials": {
    title: "Colour Grade Essentials",
    client: "Independent",
    year: "2025",
    role: "Colourist",
    deliverables: "Colour Grading",
    description: "A showcase of primary to cinematic colour grades used across commercials and short films.",
    heroImage: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1600&q=80",
    media: [
      { type: 'image', src: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600&q=80' },
      { type: 'image', src: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61?w=1600&q=80' }
    ],
    nextSlug: '',
    nextTitle: ''
  },
  "promo-reel-2025": {
    title: "Promo Reel 2025",
    client: "Self",
    year: "2025",
    role: "Editor / Colourist",
    deliverables: "Showreel",
    description: "A fast-paced promo reel combining edits and grade work to demonstrate storytelling and color craft.",
    heroImage: "https://images.unsplash.com/photo-1505765052759-0b6abf9d9fa2?w=1600&q=80",
    media: [
      { type: 'video', src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4' }
    ],
    nextSlug: '',
    nextTitle: ''
  },
  "brand-film-colour": {
    title: "Brand Film: Colour Narrative",
    client: "Brand X",
    year: "2024",
    role: "Colourist",
    deliverables: "Colour Grade / Dailies",
    description: "A long-form brand film with subtle mood shifts across scenes, highlighting colour-driven storytelling.",
    heroImage: "https://images.unsplash.com/photo-1517604931442-7f2a7f5b6f2d?w=1600&q=80",
    media: [
      { type: 'image', src: 'https://images.unsplash.com/photo-1525186402429-2f3d4a4ee0a6?w=1600&q=80' },
      { type: 'video', src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4' }
    ],
    nextSlug: '',
    nextTitle: ''
  }
};

