import { ArrowDown, ArrowRight, CalendarDays, Code, MapPin } from 'lucide-react'
import React from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from 'next/link';
import {
  SiReact, SiNextdotjs, SiTypescript, SiNodedotjs, SiFastify, SiExpress,
  SiPython, SiDjango, SiMongodb, SiMysql, SiAmazon, SiDocker
} from "react-icons/si";

function AboutMe() {
  const location = React.useRef<HTMLDivElement | null>(null)
  const Xp = React.useRef<HTMLDivElement | null>(null)
  const Skill = React.useRef<HTMLDivElement | null>(null)
  const abtMe = React.useRef<HTMLParagraphElement | null>(null)

  // Skill bubble refs (not used for animation, but keeping structure)
  const Skill1 = React.useRef<HTMLDivElement | null>(null)
  const Skill2 = React.useRef<HTMLDivElement | null>(null)
  const Skill3 = React.useRef<HTMLDivElement | null>(null)
  const Skill4 = React.useRef<HTMLDivElement | null>(null)
  const Skill5 = React.useRef<HTMLDivElement | null>(null)
  const Skill6 = React.useRef<HTMLDivElement | null>(null)
  const Skill7 = React.useRef<HTMLDivElement | null>(null)
  const Skill8 = React.useRef<HTMLDivElement | null>(null)
  const Skill9 = React.useRef<HTMLDivElement | null>(null)
  const Skill10 = React.useRef<HTMLDivElement | null>(null)
  const Skill11 = React.useRef<HTMLDivElement | null>(null)
  const Skill12 = React.useRef<HTMLDivElement | null>(null)

  // Unique value adds (animated)
  const Service1 = React.useRef<HTMLDivElement | null>(null)
  const Service2 = React.useRef<HTMLDivElement | null>(null)
  const Service3 = React.useRef<HTMLDivElement | null>(null)
  const Service4 = React.useRef<HTMLDivElement | null>(null)


  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    const serviceElements = [Service1.current, Service2.current, Service3.current, Service4.current];

    // Animation for all screen sizes
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
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
          },
        }
      );
    });
  });

  // Core skill bubbles (icons) — from resume + experience
  const skillsJson = [
    { name: "React.js", icon: <SiReact className="text-white w-5 h-5" />, ref: Skill1 },
    { name: "Next.js", icon: <SiNextdotjs className="text-white w-5 h-5" />, ref: Skill2 },
    { name: "TypeScript", icon: <SiTypescript className="text-white w-5 h-5" />, ref: Skill3 },
    { name: "Node.js", icon: <SiNodedotjs className="text-white w-5 h-5" />, ref: Skill4 },
    { name: "Fastify", icon: <SiFastify className="text-white w-5 h-5" />, ref: Skill5 },
    { name: "Express", icon: <SiExpress className="text-white w-5 h-5" />, ref: Skill6 },
    { name: "Python", icon: <SiPython className="text-white w-5 h-5" />, ref: Skill7 },
    { name: "Django", icon: <SiDjango className="text-white w-5 h-5" />, ref: Skill8 },
    { name: "MongoDB", icon: <SiMongodb className="text-white w-5 h-5" />, ref: Skill9 },
    { name: "MySQL", icon: <SiMysql className="text-white w-5 h-5" />, ref: Skill10 },
    { name: "AWS", icon: <SiAmazon className="text-white w-5 h-5" />, ref: Skill11 },
    { name: "Docker", icon: <SiDocker className="text-white w-5 h-5" />, ref: Skill12 },
  ];

  const skills = skillsJson.map((element, idx) => (
    <div
      key={element.name + idx}
      className='
        lg:w-[10dvw] w-[30dvw]
        h-[50px]
        bg-black
        flex
        justify-center
        items-center
        rounded-full
        flex-row
        gap-2
        p-2
        sm:w-full sm:h-auto sm:flex-col sm:gap-1
      '
      ref={element.ref}
    >
      <div className='text-center'>{element.icon}</div>
      <p className='text-white text-sm sm:text-xs'>{element.name}</p>
    </div>
  ));

  // Additional skills (text pills) to cover *all* from resume
  const additionalSkills = [
    "JavaScript", "HTML/CSS",
    "FastAPI", "Firebase", "PostgreSQL",
    "Redis", "Kafka", "Jenkins", "Git/GitHub",
    "Jest (React)", "Mocha (Node.js)", "PHP", "C++"
  ];

  return (
    <div className="relative overflow-hidden lg:h-[150vh] w-full">
      <div className="font-sans flex flex-col lg:flex-row py-[10vh] w-full">
        {/* Left Section (About) */}
        <div className="text-m w-full lg:w-1/2 flex flex-col items-center justify-center px-4 sm:px-2 mb-10 lg:mb-0">
          <div className="h-[35vh] lg:h-[25vh]" />
          <div className="flex flex-col gap-3 w-full max-w-md mx-auto">
            <div className="flex flex-row gap-2 items-center" ref={location}>
              <MapPin />
              <p className="mt-1 break-words">Bengaluru, India</p>
            </div>
            <div className="flex flex-row gap-2 items-center" ref={Xp}>
              <CalendarDays />
              <p className="mt-1 break-words">1.5+ years of experience</p>
            </div>
            <div className="flex flex-row gap-2 items-center" ref={Skill}>
              <Code />
              <p className="mt-1 break-words">Software Engineer · Full-Stack Developer</p>
            </div>
          </div>

          <p className="mt-6 w-full max-w-md text-left text-base sm:text-m break-words" ref={abtMe}>
            Results-driven Software Engineer who loves solving hard problems and shipping impact. Based out of Bangalore, India.
            I pair curiosity with disciplined execution to deliver maintainable software that moves the needle. I thrive in teams
            that prize ownership, clarity, and momentum.
          </p>

          <button
            className="mt-10 bg-black rounded-lg flex flex-row items-center justify-center text-white p-3 gap-2 w-full max-w-xs hover:border-4 hover:border-blue-900 transition-all duration-100 ease-in"
            onClick={() => window.open("https://drive.usercontent.google.com/download?authuser=0&export=download&id=1BHgqgwwfa2cGDUrNMEtYDIwNoA8mULeu", "_blank")}
          >
            <ArrowDown /> Portfolio
          </button>
        </div>

        {/* Right Section (Skills & Value Adds) */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-4 sm:px-2">
          <div className="w-full max-w-xl z-10">
            <p className="lg:text-3xl text-2xl text-center">Skills</p>
            <div className="mt-6 flex flex-wrap gap-3 justify-center w-full">
              {skills}
            </div>

            {/* Additional skills as pills */}
            <div className="mt-5 flex flex-wrap gap-2 justify-center">
              {additionalSkills.map(s => (
                <span
                  key={s}
                  className="text-xs sm:text-[11px] px-3 py-1 rounded-full bg-neutral-800 text-neutral-200 border border-neutral-700"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="w-full max-w-xl mt-10">
            <p className="text-2xl text-center mt-4">Beyond the code</p>
            <div className="flex flex-col text-base md:text-base gap-4 mt-3 w-full">
              <div className="flex flex-row gap-3 items-start sm:opacity-0" ref={Service1}>
                <ArrowRight className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <p className="break-words leading-relaxed">
                  Anime & figure collector — proud weeb; favorites: <strong>Eren Yeager</strong> (AoT) & <strong>Roronoa Zoro</strong> (One Piece).
                </p>
              </div>
              <div className="flex flex-row gap-3 items-start sm:opacity-0" ref={Service2}>
                <ArrowRight className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <p className="break-words leading-relaxed">
                  Traveler & beach person — love road trips and coastal drives; beaches? always yes.
                </p>
              </div>
              <div className="flex flex-row gap-3 items-start sm:opacity-0" ref={Service3}>
                <ArrowRight className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <p className="break-words leading-relaxed">
                  Sports & games — basketball regular, recently picked up pickleball, always up for badminton, football and down for game nights.
                </p>
              </div>
              <div className="flex flex-row gap-3 items-start sm:opacity-0" ref={Service4}>
                <ArrowRight className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <p className="break-words leading-relaxed">
                  Certified spontaneous friend — I'm always ready for sudden plans: hikes, beaches, parties—say the word and I'm in.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default AboutMe
