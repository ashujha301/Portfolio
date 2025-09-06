
import { ArrowDown, ArrowRight, Calendar, Calendar1, CalendarDays, Code, Heart, MapPin } from 'lucide-react'
import React from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from 'next/link';
import { SiReact, SiNextdotjs, SiNodedotjs, SiExpress, SiPython, SiDjango, SiMongodb, SiAdobeillustrator, SiAdobephotoshop, SiFlutter, SiGit, SiFigma } from "react-icons/si";

function AboutMe() {
  const location = React.useRef(null)
  const Xp = React.useRef(null)
  const Skill = React.useRef(null)
  const abtMe = React.useRef(null)
  const skillLevels = React.useRef(null)
  const Skill1 = React.useRef(null)
  const Skill2 = React.useRef(null)
  const Skill3 = React.useRef(null)
  const Skill4 = React.useRef(null)
  const Skill5 = React.useRef(null)
  const Skill6 = React.useRef(null)
  const Skill7 = React.useRef(null)
  const Skill8 = React.useRef(null)
  const Skill9 = React.useRef(null)
  const Skill10 = React.useRef(null)
  const Skill11 = React.useRef(null)
  const Skill12 = React.useRef(null)

  const Service1 = React.useRef(null)
  const Service2 = React.useRef(null)
  const Service3 = React.useRef(null)
  const Service4 = React.useRef(null)


  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    // Only animate the Services section from left to right
    const serviceElements = [Service1.current, Service2.current, Service3.current, Service4.current];
    let mm = gsap.matchMedia();
    mm.add('(min-width: 500px)', () => {
      serviceElements.forEach((el) => {
        gsap.fromTo(
          el,
          { x: -300 },
          {
            x: 0,
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
  });



  const skillsJson = [
    {
      name: "React.js",
      icon: <SiReact className="text-white w-5 h-5" />,
      ref: Skill1
    },
    {
      name: "Next.js",
      icon: <SiNextdotjs className="text-white w-5 h-5" />,
      ref: Skill2
    },
    {
      name: "Node JS",
      icon: <SiNodedotjs className="text-white w-5 h-5" />,
      ref: Skill3
    },
    {
      name: "Express",
      icon: <SiExpress className="text-white w-5 h-5" />,
      ref: Skill4
    },
    {
      name: "Python",
      icon: <SiPython className="text-white w-5 h-5" />,
      ref: Skill5
    },
    {
      name: "Django",
      icon: <SiDjango className="text-white w-5 h-5" />,
      ref: Skill6
    },
    {
      name: "MongoDB",
      icon: <SiMongodb className="text-white w-5 h-5" />,
      ref: Skill7
    },
    {
      name: "Illustrator",
      icon: <SiAdobeillustrator className="text-white w-5 h-5" />,
      ref: Skill8
    },
    {
      name: "PhotoShop",
      icon: <SiAdobephotoshop className="text-white w-5 h-5" />,
      ref: Skill9
    },
    {
      name: "Flutter",
      icon: <SiFlutter className="text-white w-5 h-5" />,
      ref: Skill10
    },
    {
      name: "Git",
      icon: <SiGit className="text-white w-5 h-5" />,
      ref: Skill11
    },
    {
      name: "Figma",
      icon: <SiFigma className="text-white w-5 h-5" />,
      ref: Skill12
    }
  ];

  const skills = skillsJson.map(element => {
    return (
      <div
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

    )
  })

  return (
    <div className="overflow-hidden lg:h-[150vh] w-full">
      <div className="flex flex-col lg:flex-row py-[10vh] w-full">
        {/* Left Section (About) */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-4 sm:px-2 mb-10 lg:mb-0">
          <div className="h-[35vh] lg:h-[25vh]" />
          <div className="flex flex-col gap-3 w-full max-w-md mx-auto">
            <div className="flex flex-row gap-2 items-center" ref={location}>
              <MapPin />
              <p className="mt-1 break-words">Bangalore, India</p>
            </div>
            <div className="flex flex-row gap-2 items-center" ref={Xp}>
              <CalendarDays />
              <p className="mt-1 break-words">2 years of experience</p>
            </div>
            <div className="flex flex-row gap-2 items-center" ref={Skill}>
              <Code />
              <p className="mt-1 break-words">Software Engineer | Full Stack Developer</p>
            </div>
          </div>
          <p
            className="mt-6 w-full max-w-md text-left text-base sm:text-sm break-words"
            ref={abtMe}
          >
            As a passionate developer based in the bustling tech hub of Addis Ababa, I blend Ethiopian ingenuity with modern innovation to craft impactful solutions. I specialize in designing and building scalable web applications that seamlessly merge advanced technologies with user-friendly interfaces.
          </p>
          <Link
            className="mt-10 bg-black rounded-lg flex flex-row items-center justify-center text-white p-3 gap-2 w-full max-w-xs hover:border-4 hover:border-blue-900 transition-all duration-100 ease-in"
            href="https://drive.usercontent.google.com/download?authuser=0&export=download&id=1BHgqgwwfa2cGDUrNMEtYDIwNoA8mULeu"
          >
            <ArrowDown /> Portfolio
          </Link>
        </div>
        {/* Right Section (Skills & Services) */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-4 sm:px-2">
          <div className="w-full max-w-xl z-10">
            <p className="lg:text-3xl text-2xl text-center">Skills</p>
            <div className="mt-6 flex flex-wrap gap-3 justify-center w-full">
              {skills}
            </div>
          </div>
          <div className="w-full max-w-xl mt-10">
            <p className="text-2xl text-center mt-4">Services</p>
            <div className="flex flex-col gap-3 mt-3 w-full">
              <div className="flex flex-row gap-2 items-center" ref={Service1}>
                <ArrowRight />
                <p className="break-words">Make amazing React Native Expo Apps</p>
              </div>
              <div className="flex flex-row gap-2 items-center" ref={Service2}>
                <ArrowRight />
                <p className="break-words">Make amazing React Websites and WebApps</p>
              </div>
              <div className="flex flex-row gap-2 items-center" ref={Service3}>
                <ArrowRight />
                <p className="break-words">Make amazing Next.js websites and Web Apps</p>
              </div>
              <div className="flex flex-row gap-2 items-center" ref={Service4}>
                <ArrowRight />
                <p className="break-words">Make amazing Express and Node Backends with MongoDB websites</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutMe
