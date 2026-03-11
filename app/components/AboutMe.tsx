import { ArrowRight, CalendarDays, Code, MapPin } from 'lucide-react'
import React, { useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from 'next/link';
import {
  SiReact, SiNextdotjs, SiTypescript, SiNodedotjs, SiFastify, SiExpress,
  SiPython, SiMysql, SiAmazon, SiGooglecloud, SiTerraform, SiNetlify, SiDocker, SiMongodb, SiFirebase,
  SiPostgresql, SiRedis, SiApache, SiJenkins, SiGithubactions,
  SiTensorflow, SiPytorch, SiOpencv, SiFastapi, SiScikitlearn,
  SiGit, SiLinux, SiVercel,
} from "react-icons/si";
import { motion } from "framer-motion";

function AboutMe() {
  // State for active skill category
  const [activeCategory, setActiveCategory] = useState<'web' | 'ml' | 'devops'>('web');

  const location = React.useRef<HTMLDivElement | null>(null)
  const Xp       = React.useRef<HTMLDivElement | null>(null)
  const Skill    = React.useRef<HTMLDivElement | null>(null)
  const abtMe    = React.useRef<HTMLParagraphElement | null>(null)

  const Service1 = React.useRef<HTMLDivElement | null>(null)
  const Service2 = React.useRef<HTMLDivElement | null>(null)
  const Service3 = React.useRef<HTMLDivElement | null>(null)
  const Service4 = React.useRef<HTMLDivElement | null>(null)

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    const serviceElements = [Service1.current, Service2.current, Service3.current, Service4.current];
    serviceElements.forEach((el) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { x: -300, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'back',
          scrollTrigger: { trigger: el, start: 'top 80%' },
        }
      );
    });
  });

  // ── same bubble shape as original ────────────────────────────────────────
  const bubbleClass = `
    lg:w-[10dvw] w-[30dvw]
    h-[50px]
    bg-black
    flex justify-center items-center
    rounded-full flex-row gap-2 p-2
    sm:w-full sm:h-auto sm:flex-col sm:gap-1
  `;

  const renderBubbles = (items: { name: string; icon: React.ReactNode }[]) =>
    items.map((el, idx) => (
      <div key={el.name + idx} className={bubbleClass}>
        <div className="text-center">{el.icon}</div>
        <p className="text-white text-sm sm:text-xs">{el.name}</p>
      </div>
    ));

  // ── Web / Full-Stack ──────────────────────────────────────────────────────
  const webSkills = [
    { name: "React.js",   icon: <SiReact      className="text-white w-5 h-5" /> },
    { name: "Next.js",    icon: <SiNextdotjs  className="text-white w-5 h-5" /> },
    { name: "TypeScript", icon: <SiTypescript className="text-white w-5 h-5" /> },
    { name: "Node.js",    icon: <SiNodedotjs  className="text-white w-5 h-5" /> },
    { name: "Fastify",    icon: <SiFastify    className="text-white w-5 h-5" /> },
    { name: "Express",    icon: <SiExpress    className="text-white w-5 h-5" /> },
    { name: "MongoDB",    icon: <SiMongodb    className="text-white w-5 h-5" /> },
    { name: "MySQL",      icon: <SiMysql      className="text-white w-5 h-5" /> },
    { name: "PostgreSQL", icon: <SiPostgresql className="text-white w-5 h-5" /> },
    { name: "Firebase",   icon: <SiFirebase   className="text-white w-5 h-5" /> },
    { name: "Redis",      icon: <SiRedis      className="text-white w-5 h-5" /> },
  ];

  // ── AI / ML ───────────────────────────────────────────────────────────────
  const mlSkills = [
    { name: "Python",       icon: <SiPython      className="text-white w-5 h-5" /> },
    { name: "PyTorch",      icon: <SiPytorch     className="text-white w-5 h-5" /> },
    { name: "TensorFlow",   icon: <SiTensorflow  className="text-white w-5 h-5" /> },
    { name: "scikit-learn", icon: <SiScikitlearn className="text-white w-5 h-5" /> },
    { name: "OpenCV",       icon: <SiOpencv      className="text-white w-5 h-5" /> },
    { name: "FastAPI",      icon: <SiFastapi     className="text-white w-5 h-5" /> },
    { name: "Kafka",        icon: <SiApache       className="text-white w-5 h-5" /> },
  ];

  const mlExtras = [
    "LangGraph", "RAG", "LLMs", "MLOps", "Feature Engineering",
    "MediaPipe", "Computer Vision", "Vector DB", "Whisper API",
    "OpenAI API", "Deep Learning", "CNNs",
  ];

  // ── DevOps / Cloud ────────────────────────────────────────────────────────
  const devopsSkills = [
    { name: "Docker",         icon: <SiDocker        className="text-white w-5 h-5" /> },
    { name: "AWS",            icon: <SiAmazon        className="text-white w-5 h-5" /> },
    { name: "GCP",            icon: <SiGooglecloud        className="text-white w-5 h-5" /> },
    { name: "Netlify",        icon: <SiNetlify        className="text-white w-5 h-5" /> },
    { name: "Terraform",      icon: <SiTerraform        className="text-white w-5 h-5" /> },
    { name: "GitHub Actions", icon: <SiGithubactions className="text-white w-5 h-5" /> },
    { name: "Jenkins",        icon: <SiJenkins       className="text-white w-5 h-5" /> },
    { name: "Git",            icon: <SiGit           className="text-white w-5 h-5" /> },
    { name: "Linux",          icon: <SiLinux         className="text-white w-5 h-5" /> },
    { name: "Vercel",         icon: <SiVercel        className="text-white w-5 h-5" /> },
  ];

  // ── misc text pills ───────────────────────────────────────────────────────
  const miscExtras = [
    "JavaScript", "HTML/CSS", "PHP", "C++",
    "Jest", "Mocha", "Go (basics)", "SARIF",
  ];

  const pillClass = "text-xs sm:text-[11px] px-3 py-1 rounded-full bg-neutral-800 text-neutral-200 border border-neutral-700";

  const buttonVariants = {
    hover: { scale: 1.1, backgroundColor: "#333", transition: { duration: 0.3, type: "spring" as const, stiffness: 200 } },
    tap:   { scale: 0.95, backgroundColor: "#222", transition: { duration: 0.2 } },
  };

  const MotionLink = motion(Link);

  // Category button style - active gets different background
  const categoryButtonClass = (isActive: boolean) => `
    px-4 py-2 rounded-full text-sm font-medium transition-all
    ${isActive 
      ? 'bg-black text-white border-2 border-white' 
      : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700 border border-neutral-600'
    }
  `;

  return (
    <div className="relative overflow-hidden lg:h-[210vh] w-full">
      <div className="font-sans flex flex-col lg:flex-row py-[10vh] w-full">

        {/* ── Left: Bio ─────────────────────────────────────────────── */}
        <div className="text-m w-full lg:w-1/2 flex flex-col items-center justify-center px-4 sm:px-2 mb-10 lg:mb-0">
          <div className="h-[35vh] lg:h-[25vh]" />
          <div className="flex flex-col gap-3 w-full max-w-md mx-auto">
            <div className="flex flex-row gap-2 items-center" ref={location}>
              <MapPin />
              <p className="mt-1 break-words">Bengaluru, India</p>
            </div>
            <div className="flex flex-row gap-2 items-center" ref={Xp}>
              <CalendarDays />
              <p className="mt-1 break-words">2+ years of experience</p>
            </div>
            <div className="flex flex-row gap-2 items-center" ref={Skill}>
              <Code />
              <p className="break-words">Machine Learning Engineer · Software Engineer</p>
            </div>
          </div>

          <p className="mt-6 w-full max-w-md text-left text-base sm:text-m break-words" ref={abtMe}>
            AI/ML Engineer building end-to-end ML and software systems for real products — from data pipelines,
            modeling, and APIs to deployment and iteration. Comfortable moving fast, owning problems, and turning
            ideas into reliable, scalable systems.
          </p>

          <MotionLink href="/assets/AyushJhaResume.pdf" target="_blank" rel="noopener noreferrer" locale={false}>
            <motion.button
              className="mt-10 bg-black rounded-lg flex flex-row items-center justify-center text-white p-3 gap-2 w-full max-w-xs hover:border-4 hover:border-blue-900 transition-all duration-100 ease-in"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Download Resume
            </motion.button>
          </MotionLink>
        </div>

        {/* ── Right: Skills & Beyond ────────────────────────────────── */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-4 sm:px-2">
          <div className="w-full max-w-xl z-10">

            <p className="lg:text-3xl text-2xl text-center">Skills</p>

            {/* Category selector buttons */}
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <button
                className={categoryButtonClass(activeCategory === 'web')}
                onClick={() => setActiveCategory('web')}
              >
                Web / Full-Stack
              </button>
              <button
                className={categoryButtonClass(activeCategory === 'ml')}
                onClick={() => setActiveCategory('ml')}
              >
                AI / ML
              </button>
              <button
                className={categoryButtonClass(activeCategory === 'devops')}
                onClick={() => setActiveCategory('devops')}
              >
                DevOps / Cloud
              </button>
            </div>

            {/* Active category content */}
            <div className="mt-8">
              {activeCategory === 'web' && (
                <div className="flex flex-wrap gap-3 justify-center w-full">
                  {renderBubbles(webSkills)}
                </div>
              )}

              {activeCategory === 'ml' && (
                <>
                  <div className="flex flex-wrap gap-3 justify-center w-full">
                    {renderBubbles(mlSkills)}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2 justify-center">
                    {mlExtras.map(s => <span key={s} className={pillClass}>{s}</span>)}
                  </div>
                </>
              )}

              {activeCategory === 'devops' && (
                <>
                  <div className="flex flex-wrap gap-3 justify-center w-full">
                    {renderBubbles(devopsSkills)}
                  </div>
                </>
              )}
            </div>

          </div>

          {/* Beyond the code — unchanged */}
          <div className="w-full max-w-xl mt-10">
            <p className="text-2xl text-center mt-4">Beyond the code</p>
            <div className="flex flex-col text-base md:text-base gap-4 mt-3 w-full">
              <div className="flex flex-row gap-3 items-start sm:opacity-0" ref={Service1}>
                <ArrowRight className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <p className="break-words leading-relaxed">
                  Anime & figure collector - proud weeb; favorites: <strong>Eren Yeager</strong> (AoT) & <strong>Roronoa Zoro</strong> (One Piece).
                </p>
              </div>
              <div className="flex flex-row gap-3 items-start sm:opacity-0" ref={Service2}>
                <ArrowRight className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <p className="break-words leading-relaxed">
                  Traveler & beach person - love road trips and coastal drives; beaches? always yes.
                </p>
              </div>
              <div className="flex flex-row gap-3 items-start sm:opacity-0" ref={Service3}>
                <ArrowRight className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <p className="break-words leading-relaxed">
                  Sports & games - basketball regular, recently picked up pickleball, always up for badminton, football and down for game nights.
                </p>
              </div>
              <div className="flex flex-row gap-3 items-start sm:opacity-0" ref={Service4}>
                <ArrowRight className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <p className="break-words leading-relaxed">
                  Certified spontaneous friend - I'm always ready for sudden plans: hikes, beaches, parties - say the word and I'm in.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AboutMe;