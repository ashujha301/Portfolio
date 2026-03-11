"use client";

import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import { ExternalLink, Github, Zap, FlaskConical } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect, useCallback } from "react";
import { useTheme } from "next-themes";
import { projects, aimlProjects, UnifiedProject } from "../data";

//Theme hook

function useThemeTokens() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = !mounted || theme === "dark";
  return { isDark };
}

function tokens(isDark: boolean) {
  return {
    cardBg:           isDark ? "#08080d"                     : "#ffffff",
    cardBorder:       isDark ? "rgba(255,255,255,0.06)"      : "rgba(0,0,0,0.08)",
    cardShadow:       isDark ? "0 4px 24px rgba(0,0,0,0.5)" : "0 4px 24px rgba(0,0,0,0.08)",
    hoverBorderAlpha: isDark ? "45"                          : "60",
    hoverShadowBase:  isDark ? "rgba(0,0,0,0.7)"            : "rgba(0,0,0,0.12)",
    title:            isDark ? "#ffffff"                     : "#0f0f12",
    description:      isDark ? "#9ca3af"                     : "#4b5563",
    links:            isDark ? "#6b7280"                     : "#9ca3af",
    linksHover:       isDark ? "#ffffff"                     : "#0f0f12",
    pillBgAlpha:      isDark ? "08"                          : "10",
    pillBorderAlpha:  isDark ? "22"                          : "30",
    pillTextAlpha:    isDark ? "bb"                          : "cc",
    divider:          isDark ? "rgba(255,255,255,0.05)"      : "rgba(0,0,0,0.06)",
    noLink:           isDark ? "#374151"                     : "#d1d5db",
    tabBg:            isDark ? "rgba(255,255,255,0.02)"      : "rgba(0,0,0,0.03)",
    tabBorder:        isDark ? "rgba(255,255,255,0.07)"      : "rgba(0,0,0,0.08)",
    tabInactive:      isDark ? "rgba(255,255,255,0.3)"       : "rgba(0,0,0,0.35)",
    mediaGrad:        isDark
      ? "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.85) 100%)"
      : "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.55) 100%)",
    sectionDesc:      isDark ? "rgba(255,255,255,0.55)"      : "rgba(0,0,0,0.55)",
  };
}

// Status Dot

const StatusDot = ({ live, label }: { live: boolean; label?: string }) => (
  <div
    className="flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md border"
    style={{
      backgroundColor: live ? "rgba(0,255,100,0.09)" : "rgba(255,60,60,0.09)",
      borderColor:     live ? "rgba(0,255,100,0.25)" : "rgba(255,60,60,0.25)",
    }}
  >
    <span className="relative flex h-2 w-2">
      {live && (
        <span
          className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-80"
          style={{ backgroundColor: "#00ff64" }}
        />
      )}
      <span
        className="relative inline-flex rounded-full h-2 w-2"
        style={{
          backgroundColor: live ? "#00c84e" : "#ff3c3c",
          boxShadow: live
            ? "0 0 6px 2px rgba(0,200,78,0.65)"
            : "0 0 6px 2px rgba(255,60,60,0.55)",
        }}
      />
    </span>
    <span
      className="text-[10px] font-mono font-bold tracking-wider uppercase"
      style={{ color: live ? "#00d958" : "#ff6b6b" }}
    >
      {label ?? (live ? "Live" : "In Dev")}
    </span>
  </div>
);

const MediaPreview = ({
  videoPath,
  imagePaths,
  name,
  live,
  isDark,
  cardHovered,
}: {
  videoPath?: string;
  imagePaths: string[];
  name: string;
  live: boolean;
  isDark: boolean;
  cardHovered: boolean;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const t = tokens(isDark);

  //Image cycling
  const [imgIndex, setImgIndex] = useState(0);
  useEffect(() => {
    if (!cardHovered || imagePaths.length <= 1) return;
    const id = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % imagePaths.length);
    }, 1200); // swap every 1.2 s
    return () => clearInterval(id);
  }, [cardHovered, imagePaths.length]);

  // Reset index when un-hovered
  useEffect(() => {
    if (!cardHovered) setImgIndex(0);
  }, [cardHovered]);

  // ── Video play/pause on card hover ──
  useEffect(() => {
    if (!videoRef.current) return;
    if (cardHovered) videoRef.current.play().catch(() => {});
    else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [cardHovered]);

  return (
    <div className="relative w-full aspect-video overflow-hidden">
      {/* Images with crossfade */}
      {imagePaths.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={`${name} ${i + 1}`}
          fill
          className="object-cover"
          style={{
            transform: cardHovered && i === imgIndex ? "scale(1.06)" : "scale(1)",
            opacity: videoPath && cardHovered
              ? 0                         // hide when video takes over
              : i === imgIndex ? 1 : 0,
            transition: "opacity 0.55s ease, transform 0.7s cubic-bezier(0.22,1,0.36,1)",
            zIndex: i === imgIndex ? 1 : 0,
          }}
          sizes="(max-width: 768px) 100vw, 33vw"
          priority={i === 0}
        />
      ))}

      {/* Video — fades in on card hover */}
      {videoPath && (
        <video
          ref={videoRef}
          src={videoPath}
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: cardHovered ? 1 : 0,
            transition: "opacity 0.45s ease",
            zIndex: 2,
          }}
        />
      )}

      {/* Bottom gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: t.mediaGrad, zIndex: 3 }}
      />

      {/* Live/WIP top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          zIndex: 4,
          background: live
            ? "linear-gradient(90deg,transparent,rgba(0,200,78,0.3),rgba(0,200,78,0.95),rgba(0,200,78,0.3),transparent)"
            : "linear-gradient(90deg,transparent,rgba(255,60,60,0.3),rgba(255,60,60,0.75),rgba(255,60,60,0.3),transparent)",
        }}
      />

      {/* Image dot indicators (shown when multi-image) */}
      {imagePaths.length > 1 && (
        <div
          className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1"
          style={{ zIndex: 5 }}
        >
          {imagePaths.map((_, i) => (
            <span
              key={i}
              className="rounded-full transition-all duration-400"
              style={{
                width: i === imgIndex ? "14px" : "5px",
                height: "5px",
                backgroundColor: i === imgIndex ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.35)",
              }}
            />
          ))}
        </div>
      )}

      {/* Video hint pill */}
      {videoPath && (
        <motion.div
          className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded-full pointer-events-none"
          style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)", zIndex: 5 }}
          animate={{ opacity: cardHovered ? 0 : 1 }}
          transition={{ duration: 0.25 }}
        >
          <span className="text-white text-[9px] font-mono tracking-wider">HOVER TO PREVIEW</span>
        </motion.div>
      )}

      {/* CRT scanlines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 6,
          opacity: isDark ? 0.04 : 0.015,
          backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,#000 2px,#000 4px)",
        }}
      />
    </div>
  );
};

const ProjectCard = ({
  project,
  index,
  category,
  isDark,
}: {
  project: UnifiedProject;
  index: number;
  category: "web" | "ai";
  isDark: boolean;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const t = tokens(isDark);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), {
    stiffness: 200, damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 200, damping: 30,
  });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  }, [mouseX, mouseY]);

  const accentColor =
    category === "ai"
      ? project.live ? "#a78bfa" : "#f472b6"
      : project.live ? "#38bdf8" : "#fb923c";

  // Normalise imagePaths — support legacy single imagePath string
  const imagePaths: string[] = project.imagePaths && project.imagePaths.length > 0
    ? project.imagePaths
    : project.imagePath
    ? [project.imagePath]
    : [];

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.65, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX, rotateY, transformPerspective: 1100 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      className="relative w-full"
    >
      <div
        className="relative flex flex-col rounded-2xl overflow-hidden border transition-all duration-500 h-full"
        style={{
          backgroundColor: t.cardBg,
          borderColor: isHovered ? `${accentColor}${t.hoverBorderAlpha}` : t.cardBorder,
          boxShadow: isHovered
            ? `0 0 0 1px ${accentColor}18, 0 24px 64px ${t.hoverShadowBase}, 0 0 80px ${accentColor}${isDark ? "0a" : "08"}`
            : t.cardShadow,
        }}
      >
        {/* Media */}
        <div className="relative">
          <MediaPreview
            videoPath={project.videoPath}
            imagePaths={imagePaths}
            name={project.name}
            live={project.live}
            isDark={isDark}
            cardHovered={isHovered}
          />
          <div className="absolute top-3 right-3 z-20">
            <StatusDot live={project.live} label={project.statusLabel} />
          </div>
        </div>

        {/* Body */}
        <div className="p-5 flex flex-col gap-3 flex-1">
          <p
            className="text-[10px] font-mono uppercase tracking-[0.22em]"
            style={{ color: `${accentColor}${isDark ? "88" : "99"}` }}
          >
            {project.tagline}
          </p>

          <h3
            className="text-[1.25rem] font-black tracking-tight leading-tight font-serif"
            style={{
              color: t.title,
              textShadow: isHovered ? `0 0 30px ${accentColor}30` : "none",
              transition: "text-shadow 0.4s ease",
            }}
          >
            {project.name}
          </h3>

          <p className="text-sm leading-relaxed flex-1" style={{ color: t.description }}>
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mt-1">
            {project.technologies.map((tech, i) => (
              <span
                key={i}
                className="text-[10px] px-2.5 py-0.5 rounded-full font-mono border"
                style={{
                  backgroundColor: `${accentColor}${t.pillBgAlpha}`,
                  borderColor:     `${accentColor}${t.pillBorderAlpha}`,
                  color:           `${accentColor}${t.pillTextAlpha}`,
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4 pt-3 border-t" style={{ borderColor: t.divider }}>
            {project.githubLink && (
              <Link
                href={project.githubLink}
                target="_blank"
                className="flex items-center gap-1.5 text-xs transition-colors duration-200 group/l"
                style={{ color: t.links }}
                onMouseEnter={(e) => (e.currentTarget.style.color = t.linksHover)}
                onMouseLeave={(e) => (e.currentTarget.style.color = t.links)}
                onClick={(e) => e.stopPropagation()}
              >
                <Github size={12} className="group-hover/l:scale-110 transition-transform" />
                Source
              </Link>
            )}
            {project.liveAppLink && (
              <Link
                href={project.liveAppLink}
                target="_blank"
                className="flex items-center gap-1.5 text-xs font-bold transition-colors duration-200 group/l"
                style={{ color: accentColor }}
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={12} className="group-hover/l:scale-110 transition-transform" />
                Live App
              </Link>
            )}
            {!project.githubLink && !project.liveAppLink && (
              <span className="text-[10px] font-mono italic" style={{ color: t.noLink }}>
                Links incoming...
              </span>
            )}
            <motion.span
              className="ml-auto text-xs font-mono"
              style={{ color: accentColor }}
              animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -6 }}
              transition={{ duration: 0.25 }}
            >
              →
            </motion.span>
          </div>
        </div>

        {/* Corner bloom */}
        <motion.div
          className="absolute -bottom-16 -right-16 w-40 h-40 rounded-full pointer-events-none"
          style={{ backgroundColor: accentColor }}
          animate={{ opacity: isHovered ? (isDark ? 0.07 : 0.05) : 0, scale: isHovered ? 1.3 : 0.7 }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </motion.div>
  );
};

// Layout: MAGAZINE
// Row 1: big card left (2/3) + tall card right (1/3)
// Row 2+: 3-col grid
const MagazineLayout = ({
  items, category, isDark,
}: { items: UnifiedProject[]; category: "web" | "ai"; isDark: boolean }) => {
  if (items.length === 0) return null;
  const [a, b, ...rest] = items;
  return (
    <div className="flex flex-col gap-6">
      {/* First row: big + slim */}
      <div className="flex flex-col md:flex-row gap-6">
        {a && (
          <div className="md:w-[62%]">
            <ProjectCard project={a} index={0} category={category} isDark={isDark} />
          </div>
        )}
        {b && (
          <div className="md:w-[38%]">
            <ProjectCard project={b} index={1} category={category} isDark={isDark} />
          </div>
        )}
      </div>
      {/* Rest: 3-col */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {rest.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i + 2} category={category} isDark={isDark} />
        ))}
      </div>
    </div>
  );
};


// ─── Layout dispatcher ────────────────────────────────────────────────────────

const ProjectGrid = ({
  items, category, isDark,
}: { items: UnifiedProject[]; category: "web" | "ai"; isDark: boolean }) => {
  // default: Magazine
  return <MagazineLayout   items={items} category={category} isDark={isDark} />;
};

// Tab Toggle

const TabToggle = ({
  active, onChange, isDark,
}: { active: "web" | "ai"; onChange: (t: "web" | "ai") => void; isDark: boolean }) => {
  const t = tokens(isDark);
  const tabs = [
    { key: "web" as const, label: "Web"},
    { key: "ai"  as const, label: "AI/ML"},
  ];
  return (
    <div className="relative flex items-center p-1 rounded-2xl border"
      style={{ backgroundColor: t.tabBg, borderColor: t.tabBorder }}>
      <motion.div
        className="absolute top-1 bottom-1 rounded-xl"
        animate={{ left: active === "web" ? "4px" : "calc(50% - 4px)" }}
        transition={{ type: "spring", stiffness: 420, damping: 36 }}
        style={{
          width: "calc(50% - 4px)",
          background: active === "web"
            ? `linear-gradient(135deg,rgba(56,189,248,${isDark ? "0.18" : "0.14"}),rgba(56,189,248,0.04))`
            : `linear-gradient(135deg,rgba(167,139,250,${isDark ? "0.18" : "0.14"}),rgba(167,139,250,0.04))`,
          border: active === "web" ? "1px solid rgba(56,189,248,0.28)" : "1px solid rgba(167,139,250,0.28)",
          boxShadow: active === "web" ? "0 0 24px rgba(56,189,248,0.09)" : "0 0 24px rgba(167,139,250,0.09)",
        }}
      />
      {tabs.map((tab) => (
        <button key={tab.key} onClick={() => onChange(tab.key)}
          className="relative z-10 flex items-center justify-center gap-2 px-8 py-3 rounded-xl text-sm font-bold tracking-wide transition-colors duration-300"
          style={{ width: "50%", color: active === tab.key ? (tab.key === "web" ? "#38bdf8" : "#a78bfa") : t.tabInactive }}>
          {tab.label}
        </button>
      ))}
    </div>
  );
};

// ─── Section Header ───────────────────────────────────────────────────────────

const SectionHeader = ({ active, isDark }: { active: "web" | "ai"; isDark: boolean }) => {
  const t = tokens(isDark);
  const cfg = {
    web: { title: "Projects", sub: "Web · Full Stack", desc: "Production-grade web apps — from scalable backends to polished frontends.", color: "#38bdf8" },
    ai:  { title: "Projects",  sub: "AI · ML · LLM",   desc: "Experiments at the intersection of intelligence and engineering - some shipped, some simmering.", color: "#a78bfa" },
  }[active];
  return (
    <AnimatePresence mode="wait">
      <motion.div key={active}
        initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -14, filter: "blur(8px)" }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-14">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-14" style={{ background: `linear-gradient(90deg, transparent, ${cfg.color}55)` }} />
          <span className="text-[20px] font-mono uppercase tracking-[0.3em]" style={{ color: `${cfg.color}70` }}>
            {cfg.sub}
          </span>
          <div className="h-px w-14" style={{ background: `linear-gradient(90deg, ${cfg.color}55, transparent)` }} />
        </div>
        <h1
          className="uppercase font-black tracking-tighter text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif mix-blend-difference text-white mb-4"
          style={{ letterSpacing: "-0.02em" }}>
          {cfg.title}
        </h1>
        <p className="text-base md:text-lg max-w-xl mx-auto leading-relaxed" style={{ color: t.sectionDesc }}>
          {cfg.desc}
        </p>
      </motion.div>
    </AnimatePresence>
  );
};

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function Projects() {
  const [active, setActive] = useState<"web" | "ai">("ai");
  const { isDark } = useThemeTokens();
  const items = active === "web" ? projects : aimlProjects;

  return (
    <div id="projects" className="cursor-auto md:cursor-none px-4 sm:px-6 pt-8 pb-28 mt-[15vh]">
      {/* Ambient glow */}
      <motion.div
        className="fixed inset-0 pointer-events-none -z-10"
        animate={{
          background: active === "web"
            ? `radial-gradient(ellipse 55% 35% at 50% 8%, rgba(56,189,248,${isDark ? "0.04" : "0.025"}) 0%, transparent 70%)`
            : `radial-gradient(ellipse 55% 35% at 50% 8%, rgba(167,139,250,${isDark ? "0.05" : "0.03"}) 0%, transparent 70%)`,
        }}
        transition={{ duration: 1 }}
      />

      <div className="max-w-7xl mx-auto">
        <SectionHeader active={active} isDark={isDark} />

        <div className="flex justify-center mb-12">
          <TabToggle active={active} onChange={setActive} isDark={isDark} />
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={active}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
            <ProjectGrid items={items} category={active} isDark={isDark} />
          </motion.div>
        </AnimatePresence>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center text-[20px] font-mono tracking-widest uppercase mt-16"
          style={{ color: active === "web" ? `rgba(${isDark ? "56,189,248" : "14,116,144"},0.3)` : `rgba(${isDark ? "167,139,250" : "109,40,217"},0.3)` }}>
          {active === "web" ? "More projects on github.com/ashujha301 ->" : "More experiments incoming — stay tuned"}
        </motion.p>
      </div>
    </div>
  );
}