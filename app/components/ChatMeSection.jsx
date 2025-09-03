"use client"
import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import dynamic from 'next/dynamic';

import Developer from '../components/Model/Developer.jsx';
import CanvasLoader from '../components/ui/Loading.jsx';
import { workExperiences } from '../components/Experience/index.js';
import Image from 'next/image';

// Dynamically import the Canvas component to prevent SSR issues
const DynamicCanvas = dynamic(
  () => {
    return Promise.resolve(({ children }) => (
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
  const [animationName, setAnimationName] = useState('idle');
  const [activeButton, setActiveButton] = useState(null);

  const interactionButtons = [
    {
      id: 1,
      text: "Talk to Virtual Me",
      animation: "salute",
      icon: "💬",
      gradient: "from-green-500 to-emerald-600"
    },
    {
      id: 2,
      text: "Thanks for Exploring",
      animation: "clapping",
      icon: "👏",
      gradient: "from-blue-500 to-cyan-600"
    },
    {
      id: 3,
      text: "See You Soon!",
      animation: "victory",
      icon: "👋",
      gradient: "from-purple-500 to-pink-600"
    }
  ];

  const handleButtonClick = (button) => {
    setActiveButton(button.id);
    setAnimationName(button.animation);
    
    // Reset after animation duration
    setTimeout(() => {
      setActiveButton(null);
      setAnimationName('idle');
    }, 3000);
  };

  return (
    <section className="c-space my-20" id="work">
      <div className="w-full text-white-600">
        {/* Large heading */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-gray_gradient mb-4">
            Virtual Me
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
            Interact with my 3D avatar and explore different animations
          </p>
        </div>

        {/* Main container with centered developer */}
        <div className="relative max-w-6xl mx-auto">
          {/* Main translucent card */}
          <div className="relative h-[300px] md:h-[400px] lg:h-[600px] rounded-3xl overflow-hidden bg-gradient-to-br from-black-200/40 via-black-300/30 to-black-200/50 backdrop-blur-lg border border-white/20 shadow-2xl">
            
            {/* 3D Developer in the center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full">
                <DynamicCanvas>
                  <Suspense fallback={<CanvasLoader />}>
                    <Developer 
                      position-y={-7.5} 
                      scale={5.5} 
                      animationName={animationName} 
                    />
                  </Suspense>
                </DynamicCanvas>
              </div>
            </div>

            {/* Experience icons floating around */}
            <div className="absolute top-20 right-8 space-y-4">
              {workExperiences.map((item, index) => (
                <div 
                  key={index}
                  className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110"
                >
                  <Image
                    className="w-8 h-8 object-contain opacity-80"
                    src={item.icon}
                    alt={item.name}
                    width={32}
                    height={32}
                    unoptimized
                  />
                </div>
              ))}
            </div>

            {/* Interaction buttons at the bottom */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {interactionButtons.map((button) => (
                  <button
                    key={button.id}
                    onClick={() => handleButtonClick(button)}
                    disabled={activeButton === button.id}
                    className={`
                      group relative overflow-hidden rounded-2xl p-6 border-2 transition-all duration-500 transform
                      ${activeButton === button.id
                        ? `bg-gradient-to-r ${button.gradient} border-white/50 scale-105 shadow-lg shadow-${button.gradient.split('-')[1]}-500/25`
                        : 'bg-black/40 border-white/20 hover:border-white/40 hover:bg-black/60 hover:scale-105'
                      }
                      backdrop-blur-sm disabled:cursor-not-allowed
                    `}
                  >
                    {/* Button content */}
                    <div className="relative z-10 flex flex-col items-center gap-3">
                      <span className="text-3xl">{button.icon}</span>
                      <span className={`
                        font-semibold text-lg transition-colors duration-300
                        ${activeButton === button.id ? 'text-white' : 'text-gray-200 group-hover:text-white'}
                      `}>
                        {button.text}
                      </span>
                      
                      {activeButton === button.id && (
                        <div className="flex items-center gap-2 text-sm text-white/80">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                          Playing animation...
                        </div>
                      )}
                    </div>

                    {/* Animated background effect */}
                    <div className={`
                      absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                      bg-gradient-to-r ${button.gradient} 
                    `} style={{ opacity: activeButton === button.id ? 0.2 : 0 }} />

                    {/* Ripple effect */}
                    {activeButton === button.id && (
                      <div className="absolute inset-0 rounded-2xl">
                        <div className={`
                          absolute inset-0 rounded-2xl animate-ping
                          bg-gradient-to-r ${button.gradient} opacity-20
                        `} />
                      </div>
                    )}
                  </button>
                ))}
              </div>
              
              {/* Helper text */}
              <div className="text-center mt-6">
                <p className="text-gray-400 text-sm">
                  💡 Click the buttons above to interact with the virtual me
                </p>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tl from-purple-500/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-500/5 to-pink-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatMe;