import img1Before from "./media/img-1-before.png";
import img1After from "./media/img-1-after.png";
import img2Before from "./media/img-2-before.png";
import img2After from "./media/img-2-after.png";
import img3Before from "./media/img-3-before.png";
import img3After from "./media/img-3-after.png";
// import dreamsToRealityVideo from "./assets/videos/export.mov";
import img11 from "./assets/images/1.1.png";
import img12 from "./assets/images/1.2.png";
import img13 from "./assets/images/1.3.png";
import img14 from "./assets/images/1.4.png";
import img21 from "./assets/images/2.1.png";
import img22 from "./assets/images/2.2.png";
import img31 from "./assets/images/3.1.png";
import img32 from "./assets/images/3.2.png";
import img33 from "./assets/images/3.3.png";
// import commercialLookVideo from "./assets/videos/Commercial Look.mov";
import lostDreamBanner from "./assets/images/lost_dream_banner.jpg";
import dreamsRealityBanner from "./assets/images/dreams_reality_banner.jpg";

export const projectsData = {
  "canada-goose": {
    title: "The Lost Dream Project",
    client: "Self-Initiated Project",
    year: "2026 (or the actual year)",
    role: "Colorist",
    deliverables: "Video Editing / Color Grading",
    description: `A narrative short film exploring themes of ambition, loss, and self-discovery.
The color grade was crafted to enhance the emotional journey of the story,
    using subtle tonal shifts, contrast, and color separation to reinforce mood and
    character progression while maintaining a cinematic visual identity.`,
    heroImage: lostDreamBanner,
    hideHero: true,
    sections: [
      {
        type: "grid-2x2",
        items: [img11, img12, img13, img14]
      }
    ],
    nextSlug: "pepsi-generation",
    nextTitle: "Pepsi: The New Generation"
  },
  "pepsi-generation": {
    title: "From Dreams to Reality",
    client: "Self-Initiated Project / Color Grading Community",
    year: "2026",
    role: "Colorist",
    deliverables: "Color Grading / Look Development",
    description: `A travel-driven narrative following a creator’s path from aspiration to
achievement.The grading focused on creating a cohesive and cinematic visual
experience.`,
    heroImage: dreamsRealityBanner,
    hideHero: true,
    sections: [
      {
        type: "grid-916",
        items: [
          {
            type: "embed",
            src: "https://player.vimeo.com/video/1200485465?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479",
            poster: img21
          },
          { type: "image", src: img21 },
          { type: "image", src: img22 }
        ]
      }
    ],
    nextSlug: "project-rock",
    nextTitle: "Under Armour x Project Rock"
  },
  "project-rock": {
    title: "Urban Studio Commercial",
    client: "Portfolio Project",
    year: "2026",
    role: "Colorist",
    deliverables: "Color Grading / Look Development / Film Emulation",
    heroImage: img33,
    description: `A fashion commercial crafted to showcase the brand’s style and identity. The
color grade combines clean, polished visuals with subtle film-inspired tones to
create a premium and cinematic look..`,
    hideHero: true,
    sections: [
      {
        type: "embed",
        src: "https://player.vimeo.com/video/1200485230?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479",
        poster: img33
      },
      { type: "full", src: img32 },
      { type: "full", src: img33 },
      { type: "full", src: img31 },
    ],
    nextSlug: "leaf-moon",
    nextTitle: "A Leaf From The Moon"
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

