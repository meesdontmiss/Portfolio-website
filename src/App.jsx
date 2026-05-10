import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowUpRight,
  Braces,
  ChevronLeft,
  ChevronRight,
  CirclePlay,
  Download,
  Film,
  Mail,
  MousePointer2,
  Sparkles,
} from "lucide-react";

import productResume from "../Misael_De_Jesus_Resume.pdf";
import videoResume from "../Misael_De_Jesus_Videography_Editing_Resume.pdf";
import ctsPromo from "../projects/WEB DESIGN/COMMIT-TO-SHIP-PROMO-1.png";
import ctsPromoAlt from "../projects/WEB DESIGN/CTS-PROMO.png";
import disclawBanner from "../projects/WEB DESIGN/disclaw-banner.png";
import disclawDemo from "../projects/WEB DESIGN/disclaw demo.mp4";
import disclawLogo from "../projects/WEB DESIGN/disclaw-logo.png";
import disclawPromo from "../projects/WEB DESIGN/disclaw promo.png";
import milestoneDemo from "../projects/WEB DESIGN/milestone demo.mp4";
import siteOptimized from "../projects/WEB DESIGN/site optimized.gif";
import pacoAbstractKing from "../projects/WEB DESIGN/paco/abstract-king.png";
import pacoBrickByBrick from "../projects/WEB DESIGN/paco/brick-by-brick.png";
import pacoDevCooking from "../projects/WEB DESIGN/paco/dev-cooking.png";
import pacoFamilyPhoto from "../projects/WEB DESIGN/paco/family-photo-2.png";
import pacoGreenLambo from "../projects/WEB DESIGN/paco/green-lambo-paco.png";
import pacoHesBack from "../projects/WEB DESIGN/paco/hes-back.png";
import pacoCooking from "../projects/WEB DESIGN/paco/PACO-COOKING.png";
import pacoStunts from "../projects/WEB DESIGN/paco/paco-does-his-own-stunts.png";
import amplifiBanner from "../projects/AMPLIFI/amplifi-banner.png";
import amplifiShowcase from "../projects/AMPLIFI/AmpliFiShowcase.mp4";
import amplifiSound from "../projects/AMPLIFI/1.26.26 amplifi vid sound design.mp4";
import amplifiLogoAnimation from "../projects/AMPLIFI/Amplifi Logo Animation (mixed media) w Audio.mp4";
import amplifiGreen from "../projects/AMPLIFI/green-n-yellow.png";
import amplifiGreenPfp from "../projects/AMPLIFI/green-n-yellowPFP.png";
import tenGallonBarrel from "../projects/3D/10 gallon barrel.png";
import bilkGallon from "../projects/3D/bilk gallon.png";
import bilkBanner from "../projects/3D/BILKonBonk-Banner.png";
import bilkstache from "../projects/3D/bilkstache.png";
import bilkMachine from "../projects/3D/bilk_machine_pro.png";
import blantMixtape from "../projects/3D/BLANT MIXTAPE.png";
import cherryBlossom from "../projects/3D/cherry blossom tree.png";
import commonShiba from "../projects/3D/Common Shiba.png";
import cosmicShiba from "../projects/3D/Cosmic Shiba.png";
import freeRxBoy from "../projects/3D/FREE-RX-mailman-hoodie-spin-BOY0001-0110.gif";
import freeRxGirl from "../projects/3D/FREE-RX-mailman-hoodie-spin-GIRL0001-0110.gif";
import freelancePharmacy from "../projects/3D/FREELANCE-PHARMACY-WEBSITE-ANIMATION video.mp4";
import jamjamsJelly from "../projects/3D/JAMJAMS JELLY.mp4";
import kellyFinal from "../projects/3D/KELLY FINAL.png";
import martianConcept from "../projects/3D/life of a martian concept refined.png";
import meesyElliot from "../projects/3D/meesy elliot .png";
import meesyPhoneHome from "../projects/3D/MEESY PHONE HOME.png";
import popstarLifestyle from "../projects/3D/POPSTAR LIFESTYLE.png";
import phoneSnippet from "../projects/3D/watch this phone snippet.mp4";
import wg8l from "../projects/3D/WG8L.gif";
import motionBanner from "../projects/motion graphics/animated-banner-optimized.gif";
import allNight from "../projects/motion graphics/ALL NIGHT LONG KYLA FAJARDO.mp4";
import farris from "../projects/motion graphics/FARRIS SWISHER NEWFIJI.mp4";
import iCantPretend from "../projects/motion graphics/i cant pretend try 2.mp4";
import rooftopDie from "../projects/motion graphics/ROOFTOP DIE ON TOP 2_1.mp4";
import sachaLogoSpin from "../projects/motion graphics/sacha logo SPIN_1.mp4";
import trapatouille from "../projects/editing/mees! trapatouille.mp4";
import bomboStore from "../projects/AI generative work/bombo at the store.png";
import bomboLatcho from "../projects/AI generative work/bombo latcho meme.png";
import bomboWild from "../projects/AI generative work/bombo in the wild.png";
import chromeHeartsBombo from "../projects/AI generative work/chrome hearts bombo.png";
import bilkPromo from "../projects/AI generative work/BILK promo.mp4";
import oballaIntro from "../projects/AI generative work/OBALLA intro.mp4";
import gangPromo from "../projects/AI generative work/$GANG promo.mp4";
import siteOptimizedPoster from "./generated-posters/site-optimized-poster.png";
import motionBannerPoster from "./generated-posters/animated-banner-poster.png";
import freeRxBoyPoster from "./generated-posters/free-rx-boy-poster.png";
import freeRxGirlPoster from "./generated-posters/free-rx-girl-poster.png";
import wg8lPoster from "./generated-posters/wg8l-poster.png";
import { createAsciiShader } from "./asciiShader.js";

const modes = {
  systems: {
    label: "Web Design",
    short: "Interfaces, product systems, Web3 sites",
    icon: Braces,
    intro:
      "Web design and product-facing interface work across launch systems, branded sites, generative-assisted builds, and crypto-native product architecture.",
  },
  motion: {
    label: "Creative Direction",
    short: "Videography, editing, motion, 3D",
    icon: Film,
    intro:
      "Creative direction for cinematic content systems: videography, editing, motion graphics, 3D campaign objects, and generative visual worlds.",
  },
};

const projects = [
  {
    title: "Commit to Ship",
    type: "WEB DESIGN",
    mode: "systems",
    summary:
      "Solana launch accountability assistant with milestone-based release logic, escrow thinking, and founder commitment flows.",
    media: ctsPromo,
    gallery: [
      { src: ctsPromo, kind: "image" },
      { src: ctsPromoAlt, kind: "image" },
      { src: siteOptimized, kind: "image", poster: siteOptimizedPoster, animated: true },
    ],
    kind: "image",
    accent: "#a8ff5f",
  },
  {
    title: "Disclaw Interface",
    type: "WEB DESIGN",
    mode: "systems",
    summary:
      "Polished Web3-facing brand and interface work with animated product presentation and campaign-ready assets.",
    media: disclawDemo,
    fallback: disclawBanner,
    gallery: [
      { src: disclawDemo, kind: "video", fallback: disclawBanner },
      { src: disclawBanner, kind: "image" },
      { src: disclawPromo, kind: "image" },
      { src: disclawLogo, kind: "image" },
    ],
    kind: "video",
    accent: "#5fe7ff",
  },
  {
    title: "Paco the Chicken",
    type: "WEB DESIGN",
    mode: "systems",
    summary:
      "Character-led web experience for pacothechicken.xyz with bold visual direction, meme-native storytelling, and campaign-ready site assets.",
    media: pacoGreenLambo,
    url: "https://www.pacothechicken.xyz",
    gallery: [
      { src: pacoGreenLambo, kind: "image" },
      { src: pacoFamilyPhoto, kind: "image" },
      { src: pacoDevCooking, kind: "image" },
      { src: pacoCooking, kind: "image" },
      { src: pacoHesBack, kind: "image" },
      { src: pacoStunts, kind: "image" },
      { src: pacoBrickByBrick, kind: "image" },
      { src: pacoAbstractKing, kind: "image" },
    ],
    kind: "image",
    accent: "#ffd94a",
  },
  {
    title: "Live Site Loop",
    type: "WEB EXPERIENCE",
    mode: "systems",
    summary:
      "Optimized site motion preview showing interactive polish, responsive product framing, and launch-ready visual rhythm.",
    media: siteOptimized,
    poster: siteOptimizedPoster,
    gallery: [
      { src: siteOptimized, kind: "image", poster: siteOptimizedPoster, animated: true },
      { src: milestoneDemo, kind: "video" },
      { src: ctsPromoAlt, kind: "image" },
    ],
    kind: "image",
    accent: "#76efff",
  },
  {
    title: "Commit to Ship Campaign",
    type: "WEB DESIGN",
    mode: "systems",
    summary:
      "Launch-facing promo art and page direction built around accountability, product clarity, and strong first-impression branding.",
    media: ctsPromoAlt,
    gallery: [
      { src: ctsPromoAlt, kind: "image" },
      { src: ctsPromo, kind: "image" },
      { src: siteOptimized, kind: "image", poster: siteOptimizedPoster, animated: true },
    ],
    kind: "image",
    accent: "#e8fbff",
  },
  {
    title: "Disclaw Brand System",
    type: "BRAND + WEB",
    mode: "systems",
    summary:
      "Logo, banner, and promotional system for a Web3 interface with cohesive identity across product and social placements.",
    media: disclawPromo,
    fallback: disclawLogo,
    gallery: [
      { src: disclawPromo, kind: "image" },
      { src: disclawBanner, kind: "image" },
      { src: disclawLogo, kind: "image" },
      { src: disclawDemo, kind: "video", fallback: disclawBanner },
    ],
    kind: "image",
    accent: "#69edff",
  },
  {
    title: "Milestone Demo",
    type: "PRODUCT FLOW",
    mode: "systems",
    summary:
      "Long-form product demo showing system logic, interaction states, and launchable MVP communication.",
    media: milestoneDemo,
    kind: "video",
    accent: "#f4f7ff",
  },
  {
    title: "AmpliFi Social",
    type: "AMPLIFI",
    mode: "systems",
    summary:
      "Creator-holder reward system with social account linking, verified holdings, leaderboard mechanics, and payout transparency.",
    media: amplifiShowcase,
    fallback: amplifiBanner,
    gallery: [
      { src: amplifiShowcase, kind: "video", fallback: amplifiBanner },
      { src: amplifiBanner, kind: "image" },
      { src: amplifiGreenPfp, kind: "image" },
      { src: amplifiGreen, kind: "image" },
      { src: amplifiSound, kind: "video", fallback: amplifiBanner },
    ],
    kind: "video",
    accent: "#b8ff6a",
  },
  {
    title: "AmpliFi Logo System",
    type: "MOTION",
    mode: "motion",
    summary:
      "Mixed-media identity motion and sound design for a Web3 social-finance product world.",
    media: amplifiSound,
    fallback: amplifiBanner,
    gallery: [
      { src: amplifiSound, kind: "video", fallback: amplifiBanner },
      { src: amplifiLogoAnimation, kind: "video", fallback: amplifiBanner },
      { src: amplifiBanner, kind: "image" },
      { src: amplifiGreenPfp, kind: "image" },
    ],
    kind: "video",
    accent: "#d6ff47",
  },
  {
    title: "BILK Brand Objects",
    type: "3D",
    mode: "motion",
    summary:
      "Surreal branded product objects and 3D campaign assets for internet-native culture worlds.",
    media: bilkBanner,
    gallery: [
      { src: bilkBanner, kind: "image" },
      { src: bilkGallon, kind: "image" },
      { src: tenGallonBarrel, kind: "image" },
      { src: bilkstache, kind: "image" },
      { src: bilkMachine, kind: "image" },
      { src: blantMixtape, kind: "image" },
    ],
    kind: "image",
    accent: "#eff7ff",
  },
  {
    title: "Machine Pro",
    type: "3D",
    mode: "motion",
    summary:
      "Rendered product-object language blending collectible design, meme culture, and polished campaign lighting.",
    media: bilkMachine,
    gallery: [
      { src: bilkMachine, kind: "image" },
      { src: bilkGallon, kind: "image" },
      { src: tenGallonBarrel, kind: "image" },
      { src: bilkBanner, kind: "image" },
    ],
    kind: "image",
    accent: "#87f7ff",
  },
  {
    title: "Phone Home",
    type: "3D VIDEO",
    mode: "motion",
    summary:
      "Vertical 3D motion snippet with object animation, campaign rhythm, and social-ready formatting.",
    media: phoneSnippet,
    gallery: [
      { src: phoneSnippet, kind: "video" },
      { src: meesyPhoneHome, kind: "image" },
      { src: popstarLifestyle, kind: "image" },
      { src: martianConcept, kind: "image" },
    ],
    kind: "video",
    accent: "#ffdf85",
  },
  {
    title: "Animated Banner",
    type: "MOTION",
    mode: "motion",
    summary:
      "Looping motion graphic system designed for fast social recognition and reusable campaign identity.",
    media: motionBanner,
    poster: motionBannerPoster,
    kind: "image",
    animated: true,
    accent: "#57ecff",
  },
  {
    title: "Artist Visual Cuts",
    type: "EDITING",
    mode: "motion",
    summary:
      "Music-first pacing, stylized cutdowns, visual rhythm, color, overlays, and social-native export formats.",
    media: allNight,
    gallery: [
      { src: allNight, kind: "video" },
      { src: farris, kind: "video" },
      { src: iCantPretend, kind: "video" },
      { src: rooftopDie, kind: "video" },
      { src: sachaLogoSpin, kind: "video" },
      { src: motionBanner, kind: "image", poster: motionBannerPoster, animated: true },
    ],
    kind: "video",
    accent: "#ff7d63",
  },
  {
    title: "Farris Swisher",
    type: "MOTION",
    mode: "motion",
    summary:
      "Short-form animated music visual with polished timing, graphic treatments, and replayable framing.",
    media: farris,
    kind: "video",
    accent: "#f6f6f0",
  },
  {
    title: "Release Motion Pack",
    type: "MOTION",
    mode: "motion",
    summary:
      "Short-loop motion assets for artist releases, logo spins, square visuals, and music-first promotional rhythm.",
    media: sachaLogoSpin,
    gallery: [
      { src: sachaLogoSpin, kind: "video" },
      { src: iCantPretend, kind: "video" },
      { src: rooftopDie, kind: "video" },
      { src: motionBanner, kind: "image", poster: motionBannerPoster, animated: true },
    ],
    kind: "video",
    accent: "#8ef4ff",
  },
  {
    title: "Trapatouille Edit",
    type: "EDITING",
    mode: "motion",
    summary:
      "High-resolution edit sample focused on kinetic pacing, timing, and culture-first visual energy.",
    media: trapatouille,
    kind: "video",
    accent: "#caffef",
  },
  {
    title: "FREE RX Pharmacy",
    type: "3D + WEB",
    mode: "motion",
    summary:
      "Freelance pharmacy web animation and hoodie spin assets built as a compact campaign world.",
    media: freelancePharmacy,
    gallery: [
      { src: freelancePharmacy, kind: "video" },
      { src: freeRxBoy, kind: "image", poster: freeRxBoyPoster, animated: true },
      { src: freeRxGirl, kind: "image", poster: freeRxGirlPoster, animated: true },
      { src: wg8l, kind: "image", poster: wg8lPoster, animated: true },
    ],
    kind: "video",
    accent: "#f1ffee",
  },
  {
    title: "Poster Worlds",
    type: "3D ART",
    mode: "motion",
    summary:
      "Poster-grade character and album-world visuals with surreal lighting, stylized composition, and campaign finish.",
    media: martianConcept,
    gallery: [
      { src: martianConcept, kind: "image" },
      { src: kellyFinal, kind: "image" },
      { src: meesyElliot, kind: "image" },
      { src: popstarLifestyle, kind: "image" },
      { src: cherryBlossom, kind: "image" },
      { src: meesyPhoneHome, kind: "image" },
    ],
    kind: "image",
    accent: "#78e9ff",
  },
  {
    title: "Shiba Character Set",
    type: "3D CHARACTER",
    mode: "motion",
    summary:
      "Collectible character variations and visual identity assets built for internet-native brand worlds.",
    media: commonShiba,
    gallery: [
      { src: commonShiba, kind: "image" },
      { src: cosmicShiba, kind: "image" },
      { src: jamjamsJelly, kind: "video" },
    ],
    kind: "image",
    accent: "#b9f6ff",
  },
  {
    title: "Bombo Worlds",
    type: "GENERATIVE VISUAL",
    mode: "motion",
    summary:
      "Generative character-world development with style matching, surreal b-roll, and campaign image direction.",
    media: bomboWild,
    gallery: [
      { src: bomboWild, kind: "image" },
      { src: bomboStore, kind: "image" },
      { src: chromeHeartsBombo, kind: "image" },
      { src: bomboLatcho, kind: "image" },
    ],
    kind: "image",
    accent: "#aefbff",
  },
  {
    title: "OBALLA Intro",
    type: "GENERATIVE VIDEO",
    mode: "motion",
    summary:
      "Generative intro motion built around surreal scene generation, timing, and post-production treatment.",
    media: oballaIntro,
    kind: "video",
    accent: "#f5fbff",
  },
  {
    title: "BILK Promo",
    type: "GENERATIVE VIDEO",
    mode: "motion",
    summary:
      "Generative promo system combining surreal visuals, brand direction, timing, and post-production finish.",
    media: bilkPromo,
    kind: "video",
    accent: "#f7f7f7",
  },
  {
    title: "$GANG Promo",
    type: "GENERATIVE VIDEO",
    mode: "motion",
    summary:
      "Generative campaign video built for fast culture signal, social velocity, and surreal visual identity.",
    media: gangPromo,
    kind: "video",
    accent: "#ddff69",
  },
  {
    title: "Life of a Martian",
    type: "3D ART",
    mode: "motion",
    summary:
      "Album-world visual concept with cinematic composition, stylized character direction, and poster-grade finish.",
    media: martianConcept,
    kind: "image",
    accent: "#78e9ff",
  },
];

const signals = [
  "Web design",
  "Creative direction",
  "Generative build specs",
  "Web3 launch systems",
  "Motion design",
  "3D campaign worlds",
  "Video editing",
];

const landingProjectTitlesList = [
  "BILK Brand Objects",
  "Bombo Worlds",
  "Phone Home",
  "Poster Worlds",
  "BILK Promo",
  "OBALLA Intro",
  "Artist Visual Cuts",
  "FREE RX Pharmacy",
  "Animated Banner",
  "Commit to Ship",
  "Paco the Chicken",
  "AmpliFi Logo System",
];

const landingProjects = landingProjectTitlesList
  .map((title) => projects.find((project) => project.title === title))
  .filter(Boolean);

const landingProjectTitles = new Set(landingProjects.map((project) => project.title));
const archiveProjects = projects.filter((project) => !landingProjectTitles.has(project.title));

const heroDeckTitles = {
  systems: [
    "Commit to Ship",
    "Paco the Chicken",
    "Disclaw Brand System",
    "Commit to Ship Campaign",
    "AmpliFi Social",
  ],
  motion: [
    "Bombo Worlds",
    "BILK Promo",
    "Phone Home",
    "BILK Brand Objects",
    "Poster Worlds",
  ],
};

function moveWeightedPanel(event) {
  const panel = event.currentTarget;
  const rect = panel.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width;
  const y = (event.clientY - rect.top) / rect.height;
  const intensity = panel.classList.contains("signal-stage") ? 4.2 : 8.5;

  panel.style.setProperty("--mx", `${x * 100}%`);
  panel.style.setProperty("--my", `${y * 100}%`);
  panel.style.setProperty("--rx", `${(0.5 - y) * intensity}deg`);
  panel.style.setProperty("--ry", `${(x - 0.5) * intensity}deg`);
}

function resetWeightedPanel(event) {
  const panel = event.currentTarget;
  panel.style.setProperty("--mx", "50%");
  panel.style.setProperty("--my", "50%");
  panel.style.setProperty("--rx", "0deg");
  panel.style.setProperty("--ry", "0deg");
}

function SignalCanvas({ activeMode }) {
  const canvasRef = useRef(null);
  const shaderRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    shaderRef.current = createAsciiShader({
      canvas,
      mode: activeMode === "systems" ? "signal" : "spiral",
      palette: activeMode === "systems" ? ["#5fe7ff", "#bdff5a"] : ["#bdff5a", "#5fe7ff", "#f4f8f8"],
      density: 0.92,
      speed: 0.72,
      seed: 95,
    });

    return () => shaderRef.current?.destroy();
  }, []);

  useEffect(() => {
    const shader = shaderRef.current;
    if (!shader) return;

    shader.setMode(activeMode === "systems" ? "signal" : "spiral");
    shader.setPalette(activeMode === "systems" ? ["#5fe7ff", "#bdff5a"] : ["#bdff5a", "#5fe7ff", "#f4f8f8"]);
  }, [activeMode]);

  return <canvas className="signal-canvas" ref={canvasRef} aria-hidden="true" />;
}

function MediaFrame({ project, compact = false, controls = false }) {
  const gallery = project.gallery || [
    {
      src: project.media,
      kind: project.kind,
      fallback: project.fallback,
      poster: project.poster,
      animated: project.animated,
    },
  ];
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const videoRef = useRef(null);
  const activeMedia = gallery[galleryIndex % gallery.length];
  const hasGallery = gallery.length > 1;
  const displaySrc = activeMedia.animated && !isActive && activeMedia.poster ? activeMedia.poster : activeMedia.src;

  useEffect(() => {
    setGalleryIndex(0);
    setIsActive(false);
  }, [project.title]);

  useEffect(() => {
    if (!hasGallery || compact || !isActive || activeMedia.kind === "video") return undefined;
    const interval = window.setInterval(() => {
      setGalleryIndex((current) => (current + 1) % gallery.length);
    }, 5200);
    return () => window.clearInterval(interval);
  }, [activeMedia.kind, compact, gallery.length, hasGallery, isActive, project.title]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      const playRequest = video.play();
      if (playRequest) {
        playRequest.catch(() => {});
      }
      return;
    }

    video.pause();
    video.currentTime = 0;
  }, [activeMedia.src, isActive]);

  const changeSlide = (direction, event) => {
    event.stopPropagation();
    setGalleryIndex((current) => (current + direction + gallery.length) % gallery.length);
  };

  const showControls = hasGallery && (!compact || controls);

  return (
    <div
      className={`media-frame ${compact ? "media-frame--compact" : ""}`}
      onBlur={() => setIsActive(false)}
      onFocus={() => setIsActive(true)}
      onPointerEnter={() => setIsActive(true)}
      onPointerLeave={() => setIsActive(false)}
      style={{ "--project-accent": project.accent }}
      tabIndex={0}
    >
      {activeMedia.kind === "video" ? (
        <video
          ref={videoRef}
          key={activeMedia.src}
          src={activeMedia.src}
          poster={activeMedia.fallback || project.fallback}
          controls
          muted
          playsInline
          preload="metadata"
        />
      ) : (
        <img key={displaySrc} src={displaySrc} alt="" loading="lazy" />
      )}
      {hasGallery ? (
        <>
          <div className="gallery-count">
            {galleryIndex + 1}/{gallery.length}
          </div>
          {showControls ? (
            <div className="gallery-controls" aria-label={`${project.title} slideshow controls`}>
              <button type="button" onClick={(event) => changeSlide(-1, event)} aria-label="Previous media">
                <ChevronLeft size={16} />
              </button>
              <button type="button" onClick={(event) => changeSlide(1, event)} aria-label="Next media">
                <ChevronRight size={16} />
              </button>
            </div>
          ) : null}
          <div className="gallery-dots" aria-hidden="true">
            {gallery.map((item, index) => (
              <span
                className={index === galleryIndex ? "is-active" : ""}
                key={`${item.src}-${index}`}
              />
            ))}
          </div>
        </>
      ) : null}
      <div className="media-sheen" />
    </div>
  );
}

function App() {
  const [activeMode, setActiveMode] = useState("motion");
  const [activeIndex, setActiveIndex] = useState(0);

  const deckProjects = useMemo(
    () =>
      heroDeckTitles[activeMode]
        .map((title) => projects.find((project) => project.title === title))
        .filter(Boolean),
    [activeMode]
  );

  const activeProject = deckProjects[activeIndex % deckProjects.length];
  const ModeIcon = modes[activeMode].icon;

  const switchMode = (mode) => {
    setActiveMode(mode);
    setActiveIndex(0);
  };

  return (
    <main className={`app-shell mode-${activeMode}`}>
      <SignalCanvas activeMode={activeMode} />
      <div className="page-noise" aria-hidden="true" />

      <header className="top-nav">
        <a className="brand" href="#home" aria-label="Misael De Jesus home">
          <span className="brand-mark">MDJ</span>
          <span>Misael De Jesus</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#systems">Web Design</a>
          <a href="#motion">Creative Direction</a>
          <a href="#resume">Resume</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="hero-section" id="home">
        <div className="hero-copy">
          <h1>Misael De Jesus</h1>
          <p className="hero-lede">
            Creative technologist building product systems, cinematic media, and generative visual worlds.
          </p>

          <div className="mode-switch" aria-label="Portfolio mode selector">
            {Object.entries(modes).map(([key, mode]) => {
              const Icon = mode.icon;
              return (
                <button
                  className={activeMode === key ? "mode-card weighted-panel is-active" : "mode-card weighted-panel"}
                  key={key}
                  type="button"
                  onClick={() => switchMode(key)}
                  onPointerLeave={resetWeightedPanel}
                  onPointerMove={moveWeightedPanel}
                >
                  <Icon size={20} strokeWidth={1.7} />
                  <span>
                    <strong>{mode.label}</strong>
                    <small>{mode.short}</small>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="resume-actions" id="resume">
            <a className="glass-button primary" href={productResume} target="_blank" rel="noreferrer">
              <Download size={17} />
              Web/Product Resume
            </a>
            <a className="glass-button" href={videoResume} target="_blank" rel="noreferrer">
              <Download size={17} />
              Creative Resume
            </a>
          </div>
        </div>

        <div
          className="signal-stage weighted-panel"
          aria-label={`${modes[activeMode].label} featured project console`}
          onPointerLeave={resetWeightedPanel}
          onPointerMove={moveWeightedPanel}
        >
          <div className="stage-orbit" aria-hidden="true" />
          <div className="stage-header">
            <span className="status-dot" />
            <span>{modes[activeMode].label}</span>
            <ModeIcon size={16} />
          </div>

          <div className="selected-project">
            <MediaFrame project={activeProject} />
            <div className="project-dossier">
              <span>{activeProject.type}</span>
              <h2>{activeProject.title}</h2>
              <p>{activeProject.summary}</p>
              {activeProject.url ? (
                <a className="glass-button small" href={activeProject.url} target="_blank" rel="noreferrer">
                  <ArrowUpRight size={16} />
                  Visit Site
                </a>
              ) : (
                <button type="button" className="glass-button small">
                  <CirclePlay size={16} />
                  Preview Signal
                </button>
              )}
            </div>
          </div>

          <div className="mini-deck">
            {deckProjects.map((project, index) => (
              <button
                key={project.title}
                type="button"
                className={index === activeIndex ? "mini-card weighted-panel is-active" : "mini-card weighted-panel"}
                onClick={() => setActiveIndex(index)}
                onPointerLeave={resetWeightedPanel}
                onPointerMove={moveWeightedPanel}
                style={{ "--project-accent": project.accent }}
              >
                <MediaFrame project={project} compact />
                <strong>{project.title}</strong>
                <span>{project.type}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="signal-strip" id="work">
        <div className="section-heading">
          <div>
            <Sparkles size={18} />
            <h2>Signal Spectrum</h2>
          </div>
          <p>A fast scan across web design, product UI, motion graphics, 3D, editing, and generative visual direction.</p>
        </div>
        <div className="signal-grid">
          {landingProjects.map((project, index) => (
            <article
              className="project-tile weighted-panel"
              key={project.title}
              onPointerLeave={resetWeightedPanel}
              onPointerMove={moveWeightedPanel}
              style={{ "--project-accent": project.accent }}
              id={project.title === "Commit to Ship" ? "systems" : project.title === "BILK Brand Objects" ? "motion" : undefined}
            >
              <MediaFrame project={project} compact controls />
              <span>{project.type}</span>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              {project.url ? (
                <a className="project-link" href={project.url} target="_blank" rel="noreferrer">
                  Visit Site
                  <ArrowUpRight size={13} />
                </a>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="signal-strip archive-strip">
        <div className="section-heading">
          <div>
            <Sparkles size={18} />
            <h2>Expanded Archive</h2>
          </div>
          <p>More examples from the folders: campaign objects, character worlds, music visuals, generative video, web motion, and edit samples.</p>
        </div>
        <div className="signal-grid archive-grid">
          {archiveProjects.map((project) => (
            <article
              className="project-tile weighted-panel"
              key={project.title}
              onPointerLeave={resetWeightedPanel}
              onPointerMove={moveWeightedPanel}
              style={{ "--project-accent": project.accent }}
            >
              <MediaFrame project={project} compact controls />
              <span>{project.type}</span>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              {project.url ? (
                <a className="project-link" href={project.url} target="_blank" rel="noreferrer">
                  Visit Site
                  <ArrowUpRight size={13} />
                </a>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section
        className="capability-band weighted-panel"
        onPointerLeave={resetWeightedPanel}
        onPointerMove={moveWeightedPanel}
      >
        <div className="capability-copy">
          <MousePointer2 size={20} />
          <h2>Creative technology for web, motion, and internet-native brands.</h2>
          <p>
            I build polished web experiences, product systems, cinematic edits, 3D campaign assets,
            and generative visuals for projects that need strong taste and fast execution.
          </p>
        </div>
        <div className="signal-list">
          {signals.map((signal) => (
            <span key={signal}>{signal}</span>
          ))}
        </div>
      </section>

      <footer
        className="contact-footer weighted-panel"
        id="contact"
        onPointerLeave={resetWeightedPanel}
        onPointerMove={moveWeightedPanel}
      >
        <div>
          <h2>Available for product, media, and creative technology work.</h2>
          <p>Los Angeles, CA / English and Spanish communication / remote-friendly.</p>
        </div>
        <a className="glass-button primary" href="mailto:dejesusmisael95@gmail.com">
          <Mail size={17} />
          dejesusmisael95@gmail.com
          <ArrowUpRight size={16} />
        </a>
      </footer>
    </main>
  );
}

export default App;
