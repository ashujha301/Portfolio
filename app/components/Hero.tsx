"use client";
import React, { useEffect } from 'react';
import { useTheme } from "next-themes";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ArrowBigDownDash, Github, GithubIcon, Linkedin, Mail } from 'lucide-react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Me from '@/public/assets/Resources/Me.jpg';
import Image from 'next/image';
import Link from 'next/link';
import ScrollProgressBar from './subComponents/Scoller';

// Extend the Window interface to include THREE and VANTA
declare global {
    interface Window {
        THREE?: any;
        VANTA?: any;
    }
}

function Hero() {
    const WelcomeSection = React.useRef(null);
    const Skills1 = React.useRef(null);
    const Skills2 = React.useRef(null);
    const Skills3 = React.useRef(null);
    const me = React.useRef(null);
    const scrollBall = React.useRef(null);
    const scroll = React.useRef(null);
    const vantaRef = React.useRef(null);
    const vantaEffect = React.useRef<any>(null);
    const { theme } = useTheme();
    

    useEffect(() => {
        // Helper to load a script only once
        const loadScript = (src: string): Promise<void> => {
            return new Promise((resolve) => {
                if (document.querySelector(`script[src="${src}"]`)) {
                    resolve();
                    return;
                }
                const script = document.createElement('script');
                script.src = src;
                script.async = true;
                script.onload = () => resolve();
                document.head.appendChild(script);
            });
        };

        // Clean up previous effect
        if (vantaEffect.current) {
            vantaEffect.current.destroy();
            vantaEffect.current = null;
        }

        // Load Three.js and the correct Vanta effect
        const loadVantaEffect = async () => {
            await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js');
            if (theme === 'dark') {
                await loadScript('https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.dots.min.js');
                if (window.VANTA && window.THREE && vantaRef.current) {
                    vantaEffect.current = window.VANTA.DOTS({
                        el: vantaRef.current,
                        mouseControls: true,
                        touchControls: true,
                        gyroControls: false,
                        minHeight: 200.00,
                        minWidth: 200.00,
                        scale: 1.00,
                        scaleMobile: 1.00,
                        backgroundColor: 0x131111,
                        showLines: false
                    });
                }
            } else {
                await loadScript('https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.waves.min.js');
                if (window.VANTA && window.THREE && vantaRef.current) {
                    vantaEffect.current = window.VANTA.WAVES({
                        el: vantaRef.current,
                        mouseControls: true,
                        touchControls: true,
                        gyroControls: false,
                        minHeight: 200.00,
                        minWidth: 200.00,
                        scale: 1.00,
                        scaleMobile: 1.00,
                        color: 0x848282
                    });
                }
            }
        };

        loadVantaEffect();

        // Cleanup function
        return () => {
            if (vantaEffect.current) {
                vantaEffect.current.destroy();
                vantaEffect.current = null;
            }
        };
    }, [theme]);

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

        // Animation for larger screens - Updated with theme-aware colors
        mm.add("(min-width: 580px)", () => {
            const t2 = gsap.timeline();
            t2.fromTo(
                me.current,
                { opacity: 0 },
                { opacity: 1, duration: 1, delay: 2 }
            ).to(me.current, {
                y: '73vh',
                x: '-23vw',
                fontWeight: "lighter",
                backgroundColor: "var(--background)", // Use CSS variable instead of hardcoded color
                scale: 0.8,
                color: "var(--foreground)", // Use CSS variable instead of hardcoded color
                duration: 10,
                scrollTrigger: {
                    trigger: me.current,
                    start: "bottom center",
                    end: "bottom 200px",
                    scrub: 2,
                },
            });
        });

        // Animation for smaller screens - Updated with theme-aware colors
        mm.add("(max-width: 579px)", () => {
            const t2 = gsap.timeline();
            t2.fromTo(
                me.current,
                { opacity: 0 },
                { opacity: 1, duration: 1, delay: 2 }
            ).to(me.current, {
                y: 510,
                fontWeight: "lighter",
                backgroundColor: "var(--background)", // Use CSS variable instead of hardcoded color
                scale: 0.8,
                color: "var(--foreground)", // Use CSS variable instead of hardcoded color
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
            <ScrollProgressBar />
            {/* Vanta.js Background Container */}
            <div
                ref={vantaRef}
                className="relative overflow-hidden h-full"
                style={{ zIndex: -1 }}
            />

            {/* Welcome Section - Updated with theme-aware styling */}
            <div 
                className="h-[30vh] text-center font-bold text-8xl py-[8vh] w-full relative bottom-[70vh] scale-x-0" 
                ref={WelcomeSection}
                style={{
                    backgroundColor: 'var(--background)',
                    color: 'var(--foreground)'
                }}
            >
                <p>Welcome</p>
            </div>

            {/* Hero Card - Updated with theme-aware styling */}
            <div 
                className="lg:h-[15rem] h-[45vh] text-center font-bold lg:w-[48rem] text-8xl w-[70dvw] lg:ml-[23dvw] ml-[15dvw] rounded-lg p-0 relative lg:bottom-[95vh] bottom-[110vh] opacity-0 flex flex-col gap-5" 
                ref={me}
                style={{
                    backgroundColor: 'var(--background)',
                    color: 'var(--foreground)'
                }}
            >
                <div className="rounded-full h-[150px] w-[165px] relative top-8 left-24">
                    <Image src={Me} className="rounded-full h-[100px] w-[100px] items-center lg:ml-0 ml-[5dvw] relative lg:right-10 right-[8dvw] mt-5" alt="Me" />
                </div>
                <div>
                    <p className="lg:text-[5rem] text-6xl font-bold relative lg:bottom-[30vh] bottom-0 lg:top-[-5rem] top-[3vh] lg:ml-[6dvw] ml-0">Hi, I'm Ayush</p>
                    <div className='lg:flex flex-row relative gap-10 lg:left-[11dvw] bottom-[-9vh] lg:bottom-[4rem] hidden'>
                        <Link className='hover:cursor-pointer' href={'https://github.com/ashujha301'}> <Github className="w-10 h-10 lg:ml-[10dvw] ml-0 " /></Link>
                        <Link className='hover:cursor-pointer' href={'https://www.linkedin.com/in/ayush-jha301/'}> <Linkedin className="w-10 h-10 ml-0 " /></Link>
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