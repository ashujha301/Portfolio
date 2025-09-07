"use client";

import { Suspense, useState, useRef, useCallback, SetStateAction, useEffect } from "react";
import dynamic from "next/dynamic";
import ChatModal from "./ChatModal";
import { useTheme } from "next-themes";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Developer from "./Model/Developer";
import CanvasLoader from "./ui/Loading";
import { MessageCircle, Trophy, PersonStanding, Hand, ArrowBigDown } from "lucide-react";

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
                <div className="text-white-600 animate-pulse">Loading 3D Ayush...</div>
            </div>
        ),
    }
);

const ChatMe = () => {
    const [animationName, setAnimationName] = useState("idle");
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [hoveredEmote, setHoveredEmote] = useState<string | null>(null);
    const animationTimeoutRef = useRef<number | null>(null);
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);

    // Button sizes
    const BTN_SIZE = "w-20 h-20 md:w-24 md:h-24";
    const EMOTE_BTN_SIZE = "w-24 h-24"; // Emote buttons
    const MOBILE_EMOTE_BTN_SIZE = "w-16 h-16"; // Mobile emote buttons

    const talkToMe = {
        id: 1,
        gradient: "from-emerald-500 via-teal-500 to-cyan-500",
        icon: <MessageCircle className="w-7 h-7 animate-pulse" />,
    };

    const ScrollDownButton = {
        id: 2,
        text: "Salute",
        animation: "salute",
        gradient: "from-blue-500 via-indigo-500 to-purple-500",
        icon: <ArrowBigDown className="w-7 h-7 animate-pulse" />,
    };

    // Emote animations with Lucide React icons
    const emoteAnimations = [
        {
            id: 1,
            name: "victory",
            displayName: "Victory",
            icon: Trophy,
        },
        {
            id: 2,
            name: "salute",
            displayName: "Salute",
            icon: PersonStanding,
        },
        {
            id: 3,
            name: "clapping",
            displayName: "Clap",
            icon: Hand,
        }
    ];

    // Hover handlers that trigger animations
    const handleMouseEnter = (animName: string) => {
        // Clear any existing timeout
        if (animationTimeoutRef.current) {
            clearTimeout(animationTimeoutRef.current);
        }

        // Set hover state for visual feedback
        setHoveredEmote(animName);

        // Set the developer animation
        setAnimationName(animName);
    };

    const handleMouseLeave = () => {
        // Clear hover state
        setHoveredEmote(null);

        // Set timeout to return to idle after leaving hover
        animationTimeoutRef.current = window.setTimeout(() => {
            setAnimationName("idle");
        }, 1000); // 1 second delay before returning to idle
    };

    const handleTalkClick = () => {
        setIsChatOpen(true);
    };

    const handleSaluteClick = useCallback(() => {
        if (typeof window !== "undefined") {
            const heroSection = document.getElementById("hero");
            if (heroSection) {
                heroSection.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, []);

    return (
        <section className="c-space relative mb-80" id="work">
            {/* Heading - Positioned behind the card */}
            <div className="absolute top-[85px] md:top-[80px] lg:top-[80px] left-0 w-full flex justify-center z-0">
                <div className="font-sans font-bold text-center">
                    <h1 className="text-7xl md:text-8xl lg:text-9xl font-black text-gray_gradient tracking-tight opacity-90 whitespace-nowrap">
                        Virtual Ayush
                    </h1>
                </div>
            </div>

            <div className="relative max-w-3xl md:max-w-7xl mx-auto px-4 md:px-0 pt-32 md:pt-40">
                {/* Card */}
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/20 h-[60svh] min-h-[520px] shadow-2xl max-h-[860px] md:h-[420px] lg:h-[600px] z-10">
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

                    {/* DESKTOP: Chat Button - Right side */}
                    <div className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col items-center space-y-4">
                        <button
                            onClick={handleTalkClick}
                            className={`relative ${BTN_SIZE} bg-gradient-to-br ${talkToMe.gradient} rounded-2xl border border-white/30 shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center group hover:scale-105`}
                            aria-label="Talk to Me"
                        >
                            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${talkToMe.gradient} opacity-0 group-hover:opacity-40 blur-xl transition-opacity`} />
                            <div className="relative text-white group-hover:scale-110 transition-transform duration-300">{talkToMe.icon}</div>
                        </button>

                        <div className="max-w-sm">
                            <p className={`font-sans font-bold text-center max-w-xs text-lg ${mounted ? (theme === "dark" ? "text-white/90" : "text-black/90") : "text-transparent"} leading-relaxed`}>
                                Explore my work instantly - just click to chat with my AI Assistant!
                            </p>
                        </div>
                    </div>

                    {/* DESKTOP: Emote Buttons - Left side */}
                    <div className="hidden md:flex absolute left-12 top-1/2 -translate-y-1/2 flex-col items-center space-y-4">
                        <h3 className={`text-xl font-sans font-bold ${mounted ? (theme === "dark" ? "text-white/80" : "text-black/80") : "text-transparent"} mb-2`}>
                            Emotes
                        </h3>
                        {emoteAnimations.map((emote) => {
                            const IconComponent = emote.icon;
                            return (
                                <div key={emote.id} className="font-sans font-bold flex flex-col items-center space-y-1">
                                    <div
                                        onMouseEnter={() => handleMouseEnter(emote.name)}
                                        onMouseLeave={handleMouseLeave}
                                        className={`flex ${EMOTE_BTN_SIZE} ${mounted ? (theme === "dark"
                                            ? "bg-black/40 border-white/20 hover:bg-black/60 hover:border-white/30"
                                            : "bg-white/40 border-black/20 hover:bg-white/60 hover:border-black/30"
                                        ) : "bg-transparent border-transparent hover:bg-transparent hover:border-transparent"} backdrop-blur-sm rounded-xl border shadow-lg hover:shadow-xl transition-all duration-300 flex-col items-center justify-center group hover:scale-110 cursor-pointer`}
                                        aria-label={emote.displayName}
                                    >
                                        <div className={`text-${mounted ? (theme === "dark" ? "white" : "black") : "transparent"}/80 group-hover:text-${mounted ? (theme === "dark" ? "white" : "black") : "transparent"} transition-all duration-300`}>
                                            <IconComponent
                                                className={`w-8 h-8 md:w-10 md:h-10 ${hoveredEmote === emote.name ? "animate-bounce" : ""} transition-all duration-300`}
                                            />
                                        </div>
                                        <span
                                            className={`
                            opacity-0 group-hover:opacity-100 
                            transition-all duration-300
                            text-xs ${mounted ? (theme === "dark" ? "text-white/60" : "text-black/60") : "text-transparent"}
                            text-center
                        `}
                                        >
                                            {emote.displayName}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* MOBILE: Emote Buttons - Bottom center in row */}
                    <div className="md:hidden absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-10">
                        {emoteAnimations.map((emote) => {
                            const IconComponent = emote.icon;
                            return (
                                <div
                                    key={emote.id}
                                    onTouchStart={() => handleMouseEnter(emote.name)}
                                    onTouchEnd={handleMouseLeave}
                                    className={`relative ${MOBILE_EMOTE_BTN_SIZE} ${mounted ? (theme === "dark"
                                        ? "bg-black/40 border-white/20"
                                        : "bg-white/40 border-black/20"
                                    ) : "bg-transparent border-transparent hover:bg-transparent hover:border-transparent"} backdrop-blur-sm rounded-lg border shadow-lg active:scale-95 transition flex items-center justify-center group cursor-pointer`}
                                    aria-label={emote.displayName}
                                >
                                    <div className={`text-${mounted ? (theme === "dark" ? "white" : "black") : "transparent"}/80`}>
                                        <IconComponent
                                            className={`w-6 h-6 ${hoveredEmote === emote.name ? 'animate-bounce' : ''} transition-all duration-300`}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-cyan-500/15 to-transparent rounded-full blur-3xl animate-pulse" />
                        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tl from-purple-500/15 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-pink-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
                    </div>
                </div>

                {/* MOBILE: Main Buttons Below Card */}
                <div className="md:hidden mt-8 flex flex-col space-y-6">
                    {/* Description Text */}
                    <div className="space-y-3 px-2">
                        <p className={`font-sans font-bold text-center text-sm ${mounted ? (theme === "dark" ? "text-white/45" : "text-gray-400") : "text-transparent"} leading-relaxed`}>
                            ✨ Hold on the buttons to try the emotes!
                        </p>
                    </div>
                    {/* Buttons Row */}
                    <div className="flex justify-center space-x-6">
                        <div className="flex flex-col items-center space-y-2">
                            <button
                                onClick={handleTalkClick}
                                className={`relative ${BTN_SIZE} bg-gradient-to-br ${talkToMe.gradient} rounded-xl border border-white/30 flex items-center justify-center shadow-lg active:scale-95 transition`}
                                aria-label="Talk to Me"
                            >
                                <div className="relative text-white">{talkToMe.icon}</div>
                            </button>
                        </div>
                    </div>

                    {/* Description Text */}
                    <div className="space-y-3 px-2">
                        <p className={`font-sans font-bold text-center text-lg ${mounted ? (theme === "dark" ? "text-white/90" : "text-black/90") : "text-transparent"} leading-relaxed`}>
                            Explore my work instantly - just click to chat with my AI Assistant!
                        </p>
                    </div>
                </div>
                {/* {Scroll down to view portfolio} */}
                <div className="mt-8 flex-col space-y-6">
                    <div className="hidden md:block space-y-3 px-2">
                        <p className={`font-sans font-bold text-center text-sm ${mounted ? (theme === "dark" ? "text-white/45" : "text-gray-400") : "text-transparent"} leading-relaxed`}>
                            ✨ Hover over the buttons to try the emotes!
                        </p>
                    </div>
                    {/* Buttons Arrow */}
                    <div className="flex justify-center space-x-6">
                        <div className="flex flex-col items-center space-y-2">
                            <button
                                onClick={handleSaluteClick}
                                className={`relative ${BTN_SIZE} bg-gradient-to-br ${ScrollDownButton.gradient} rounded-xl border border-white/30 flex items-center justify-center shadow-lg active:scale-95 transition`}
                                aria-label="Scroll to Portfolio"
                            >
                                <div className="relative text-white animate-bounce transition">{ScrollDownButton.icon}</div>
                            </button>
                        </div>
                    </div>

                    {/* Description Text */}
                    <div className="space-y-3 px-2">
                        <p className={`font-sans font-bold text-center text-lg ${mounted ? (theme === "dark" ? "text-white/90" : "text-black/90") : "text-transparent"} leading-relaxed`}>
                            tap to view portfolio!
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