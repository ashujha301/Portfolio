"use client";

import { Suspense, useState, useRef, useCallback, SetStateAction } from "react";
import dynamic from "next/dynamic";
import ChatModal from "./ChatModal";
import { useTheme } from "next-themes";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Developer from "./Model/Developer";
import CanvasLoader from "./ui/Loading";

// Dynamically import the Canvas component to prevent SSR issues
import { ReactNode } from "react";

type DynamicCanvasProps = {
    children: ReactNode;
};

const DynamicCanvas = dynamic<DynamicCanvasProps>(
    () => {
        return Promise.resolve(({ children }: DynamicCanvasProps) => (
            <Canvas>
                <ambientLight intensity={7} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <directionalLight position={[10, 10, 10]} intensity={1} />
                <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2} />
                {children}
            </Canvas>
        ));
    },
    {
        ssr: false,
        loading: () => (
            <div className="flex items-center justify-center h-full">
                <div className="text-white-600 animate-pulse">Loading 3D Scene...</div>
            </div>
        ),
    }
);

const ChatMe = () => {
    const [animationName, setAnimationName] = useState("idle");
    const [isChatOpen, setIsChatOpen] = useState(false);
    const animationIntervalRef = useRef<number | null>(null);
    const { theme } = useTheme();
    // Buttons (same size)
    const BTN_SIZE = "w-20 h-20 md:w-24 md:h-24"; // ensures same size for both

    const talkToMe = {
        id: 1,
        text: "Talk to Me",
        animation: "victory",
        gradient: "from-emerald-500 via-teal-500 to-cyan-500",
        icon: (
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M4 5a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H9.83L6 19.83V16H7a3 3 0 0 1-3-3V5z" />
            </svg>
        ),
    };

    const salute = {
        id: 2,
        text: "Salute",
        animation: "salute",
        gradient: "from-blue-500 via-indigo-500 to-purple-500",
        // Clean arrow-down icon
        icon: (
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 4a1 1 0 0 1 1 1v10.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-4.004 4.004a1.25 1.25 0 0 1-1.768 0l-4.004-4.004a1 1 0 1 1 1.414-1.414L11 15.586V5a1 1 0 0 1 1-1z" />
            </svg>
        ),
    };

    const handleHoverAnim = (name: SetStateAction<string>) => {
        setAnimationName(name);
        if (animationIntervalRef.current) clearInterval(animationIntervalRef.current);
        animationIntervalRef.current = window.setInterval(() => setAnimationName(name), 3000);
    };

    const clearHover = () => {
        if (animationIntervalRef.current) {
            clearInterval(animationIntervalRef.current);
            animationIntervalRef.current = null;
        }
        setAnimationName("idle");
    };

    const handleTalkClick = () => {
        setIsChatOpen(true);
    };

    const handleSaluteClick = useCallback(() => {
        // Scroll down a bit
        if (typeof window !== "undefined") {
            const heroSection = document.getElementById("hero");
            if (heroSection) {
                heroSection.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, []);

    return (
        <section className="c-space my-20" id="work">
            <div className="w-full text-white-600">
                {/* Heading */}
                <div className="text-center mb-4">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-gray_gradient mb-2 tracking-tight">
                        Virtual Me
                    </h1>
                    <div className="max-w-4xl mx-auto">
                        <p className="text-base md:text-lg text-gray-400 leading-relaxed">
                            Want to explore my portfolio? Scroll down to discover my work
                        </p>
                        {/* Show on desktop & tablet (Click) */}
                        <p className="hidden sm:block text-gray-400 text-sm">
                            💡 Click the buttons below to interact with the virtual me
                        </p>

                        {/* Show only on mobile (Hold) */}
                        <p className="sm:hidden text-gray-400 text-sm">
                            💡 Hold the buttons below to interact with the virtual me
                        </p>
                    </div>
                </div>

                {/* Card */}
                <div className="relative max-w-3xl md:max-w-7xl mx-auto px-4 md:px-0">
                    {/* Keep your current aesthetic; if you later want translucent-only, remove gradients/blur */}
                    <div className="relative h-[60svh] min-h-[520px] max-h-[860px] md:h-[420px] lg:h-[600px] rounded-3xl overflow-hidden ...">


                        {/* Soft overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5" />

                        {/* 3D */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-full h-full">
                                <DynamicCanvas>
                                    <Suspense fallback={<CanvasLoader />}>
                                        <Developer position-y={-7.5} scale={5.5} animationName={animationName} />
                                    </Suspense>
                                </DynamicCanvas>
                            </div>
                        </div>

                        {/* DESKTOP BUTTONS (equal size), middle height */}
                        {/* Talk to Me - Left */}
                        <div className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 flex-col items-center space-y-4">
                            <button
                                onClick={handleTalkClick}
                                onMouseEnter={() => handleHoverAnim(talkToMe.animation)}
                                onMouseLeave={clearHover}
                                className={`relative ${BTN_SIZE} bg-gradient-to-br ${talkToMe.gradient} rounded-2xl border border-white/30 shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center`}
                                aria-label="Talk to Me"
                            >
                                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${talkToMe.gradient} opacity-0 hover:opacity-40 blur-xl transition-opacity`} />
                                <div className="relative text-white">{talkToMe.icon}</div>
                            </button>

                            {/* ALWAYS-VISIBLE TEXT (both lines here) */}
                            <div className="max-w-sm">
                                <p className={`text-m ${theme === "dark" ? "text-white/90" : "text-black/90"} leading-relaxed`}>
                                    Click to interact with my AI assistant.
                                </p>
                            </div>
                        </div>

                        {/* Salute - Right */}
                        <div className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col items-center space-y-4">
                            <button
                                onClick={handleSaluteClick}
                                onMouseEnter={() => handleHoverAnim(salute.animation)}
                                onMouseLeave={clearHover}
                                className={`relative ${BTN_SIZE} bg-gradient-to-br ${salute.gradient} rounded-2xl border border-white/30 shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center`}
                                aria-label="Scroll down"
                            >
                                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${salute.gradient} opacity-0 hover:opacity-40 blur-xl transition-opacity`} />
                                <div className="relative text-white">{salute.icon}</div>
                            </button>
                            {/* ALWAYS-VISIBLE TEXT (both lines here) */}
                            <div className="max-w-sm">
                                <p className={`text-m ${theme === "dark" ? "text-white/90" : "text-black/90"} leading-relaxed`}>
                                    Click to Scroll down to explore the portfolio.
                                </p>
                            </div>
                        </div>

                        {/* MOBILE: Buttons in card corners, NO TEXT */}
                        <div className="md:hidden absolute bottom-6 left-0 right-0 flex justify-between px-6">
                            <button
                                onClick={handleTalkClick}
                                onMouseEnter={() => handleHoverAnim(talkToMe.animation)}
                                onMouseLeave={clearHover}
                                className={`relative ${BTN_SIZE} bg-gradient-to-br ${talkToMe.gradient} rounded-xl border border-white/30 flex items-center justify-center shadow-lg active:scale-95 transition`}
                                aria-label="Talk to Me"
                            >
                                <div className="relative text-white">{talkToMe.icon}</div>
                            </button>

                            <button
                                onClick={handleSaluteClick}
                                onMouseEnter={() => handleHoverAnim(salute.animation)}
                                onMouseLeave={clearHover}
                                className={`relative ${BTN_SIZE} bg-gradient-to-br ${salute.gradient} rounded-xl border border-white/30 flex items-center justify-center shadow-lg active:scale-95 transition`}
                                aria-label="Scroll down"
                            >
                                <div className="relative text-white">{salute.icon}</div>
                            </button>
                        </div>

                        {/* Decorative elements (kept) */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden">
                            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-cyan-500/15 to-transparent rounded-full blur-3xl animate-pulse" />
                            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tl from-purple-500/15 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-pink-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
                        </div>
                    </div>

                    {/* MOBILE: Texts together BELOW the card */}
                    <div className="md:hidden mt-8 space-y-3 px-2">
                        <p className={`text-center ${theme === "dark" ? "text-white/90" : "text-black/90"} text-sm leading-relaxed max-w-sm mx-auto`}>
                            💡 Click on “Chat” to interact with my AI assistant and get to know me through an immersive virtual experience.
                        </p>
                        <p className={`text-center ${theme === "dark" ? "text-white/90" : "text-black/90"} text-sm leading-relaxed max-w-sm mx-auto`}>
                            💡 Click on "Arrow" to scroll down to explore the portfolio.
                        </p>
                    </div>
                </div>
            </div>

            {/* Chat Modal */}
            <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
        </section>
    );
};

export default ChatMe;
