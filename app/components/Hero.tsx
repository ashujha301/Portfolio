"use client";
import React from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ArrowBigDownDash, Github, GithubIcon, Linkedin, Mail } from 'lucide-react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Me from '@/public/assets/Resources/Me.jpg';
import Image from 'next/image';
import Link from 'next/link';
import ScrollProgressBar from './subComponents/Scoller';

function Hero() {
    const WelcomeSection = React.useRef(null);
    const Skills1 = React.useRef(null);
    const Skills2 = React.useRef(null);
    const Skills3 = React.useRef(null);
    const me = React.useRef(null);
    const scrollBall = React.useRef(null);
    const scroll = React.useRef(null);

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.to(Skills1.current, { x: -1000, y: -1000, duration: 90, repeat: 100 });
        gsap.to(Skills2.current, { x: -1000, y: -1000, duration: 90, repeat: 100 });
        gsap.to(Skills3.current, { x: -1000, y: -1000, duration: 90, repeat: 100 });

        const tl = gsap.timeline();
        tl.from(WelcomeSection.current, { scaleX: 0, transformOrigin: "center", opacity: 0 })
          .to(WelcomeSection.current, { scaleX: 1, duration: 0.5 })
          .to(WelcomeSection.current, { y: -1000, duration: 0.5, delay: 1 });

        const mm = gsap.matchMedia();

        // Animation for larger screens
        mm.add("(min-width: 580px)", () => {
            const t2 = gsap.timeline();
            t2.fromTo(
                me.current,
                { opacity: 0 },
                { opacity: 1, duration: 1, delay: 2 }
            ).to(me.current, {
                y: '73vh',
                x:'-23vw',
                fontWeight: "lighter",
                backgroundColor: "white",
                scale: 0.8,
                color: "black",
                duration: 10,
                scrollTrigger: {
                    trigger: me.current,
                    start: "bottom center",
                    end: "bottom 200px",
                    scrub: 2,
                },
            });
        });

        // Animation for smaller screens
        mm.add("(max-width: 579px)", () => {
            const t2 = gsap.timeline();
            t2.fromTo(
                me.current,
                { opacity: 0 },
                { opacity: 1, duration: 1, delay: 2 }
            ).to(me.current, {
                y: 510,
                fontWeight: "lighter",
                backgroundColor: "#f5f3f0",
                scale: 0.8,
                color: "black",
                duration: 10,
                scrollTrigger: {
                    trigger: me.current,
                    start: "bottom center",
                    end: "bottom 200px",
                    scrub: 2,
                },
            });
        });

        gsap.to(scroll.current, { opacity: 1, duration: 1, delay: 4 });
        gsap.to(scrollBall.current, { y: 10, repeat: -1, duration: 1 });

        // Cleanup on unmount
        return () => mm.revert();
    });

    return (
        <div className="h-[100vh]">
            <ScrollProgressBar/>
            <div className="relative overflow-hidden h-full ">
                <p
                    className="text-4xl md:text-6xl text-gray-600 whitespace-nowrap rotate-45 ml-[50dvw] md:ml-[15dvw]"
                    ref={Skills1}
                >
React • Next.js • Express.js • Node.js • Django • MongoDB • PostgreSQL • Tailwind CSS • Redux • Scikit-learn • TensorFlow • Pandas • NumPy • Matplotlib • Python • JavaScript • TypeScript • Prisma ORM • REST APIs • GraphQL • Docker • Git • Heroku • Firebase                </p>
                <p
                    className="text-4xl md:text-6xl text-gray-600 whitespace-nowrap rotate-45 h-[20vh] md:h-[30vh] mr-[105dvw] md:mr-[55dvw]"
                    ref={Skills3}
                >
React • Next.js • Express.js • Node.js • Django • MongoDB • PostgreSQL • Tailwind CSS • Redux • Scikit-learn • TensorFlow • Pandas • NumPy • Matplotlib • Python • JavaScript • TypeScript • Prisma ORM • REST APIs • GraphQL • Docker • Git • Heroku • Firebase                </p>
                <p
                    className="text-4xl md:text-6xl text-gray-600 whitespace-nowrap rotate-45 h-[20vh] md:h-[30vh] mr-[425dvw] relative lg:right-0 right-[30dvw] md:mr-[85dvw]"
                    ref={Skills2}
                >
React • Next.js • Express.js • Node.js • Django • MongoDB • PostgreSQL • Tailwind CSS • Redux • Scikit-learn • TensorFlow • Pandas • NumPy • Matplotlib • Python • JavaScript • TypeScript • Prisma ORM • REST APIs • GraphQL • Docker • Git • Heroku • Firebase                </p>
            </div>

            <div className="h-[30vh] text-center font-bold text-8xl bg-black text-white py-[8vh] w-full relative bottom-[70vh] scale-x-0" ref={WelcomeSection}>
                <p>Welcome</p>
            </div>

            <div className="lg:h-[15rem] h-[45vh] text-center font-bold lg:w-[48rem] text-8xl w-[70dvw] lg:ml-[23dvw] ml-[15dvw] rounded-lg p-0 bg-black relative lg:bottom-[95vh] bottom-[110vh] text-white opacity-0 flex flex-col gap-5" ref={me}>
                <div className="rounded-full h-[150px] w-[165px] relative top-8 left-24">
                    <Image src={Me} className="rounded-full h-[100px] w-[100px] items-center lg:ml-0 ml-[5dvw] relative lg:right-10 right-[8dvw] mt-5" alt="Me" />
                </div>
                <div>
                <p className="lg:text-[5rem] text-6xl font-bold relative lg:bottom-[30vh] bottom-0 lg:top-[-5rem] top-[3vh] lg:ml-[6dvw] ml-0">Hi, I'm Ayush</p>
                <div className='lg:flex flex-row relative gap-10 lg:left-[8dvw] bottom-[-9vh] lg:bottom-[4rem]  hidden'>
               <Link className='hover:cursor-pointer' href={'#'}> <Github className="w-10 h-10 lg:ml-[10dvw] ml-0 " /></Link>
               <Link className='hover:cursor-pointer' href={'#'}> <Linkedin className="w-10 h-10  ml-0 " /></Link>
               <Link className='hover:cursor-pointer' href={'#'}> <Mail className="w-10 h-10  ml-0 " /></Link>

                </div>
                </div>
            </div>

            <div className="relative bottom-[105vh] lg:bottom-[80vh] left-[45dvw] w-[30dvw] opacity-0" ref={scroll}>
                <p>Scroll Down</p>
                <ArrowBigDownDash className="w-11 h-11 ml-5 mt-3" ref={scrollBall} />
            </div>
        </div>
    );
}

export default Hero;