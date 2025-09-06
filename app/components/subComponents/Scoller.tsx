import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ScrollProgressBar = () => {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const percentageRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    // Set up GSAP ScrollTrigger
    gsap.to(progressBarRef.current, {
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          // Calculate progress as a percentage
          const progress = Math.round(self.progress * 100);

          // Update the percentage text
          if (percentageRef.current) {
            percentageRef.current.textContent = `${progress}%`;
          }
        },
      },
      height: "100%", // Animates the height of the progress bar
    });
  }, []);

  return (
    <div className="hidden md:flex fixed top-1/4 left-4 items-center">
      {/* Progress Bar Container */}
      <div className="w-4 h-3/4 border-2 border-gray-300">
        {/* Progress Bar */}
        <div
          ref={progressBarRef}
          className="bg-blue-500 w-full h-0 origin-top"
        ></div>
      </div>
      {/* Percentage Text */}
      <span
        ref={percentageRef}
        className="ml-4 text-blue-500 text-lg font-bold"
      >
        0%
      </span>
    </div>
  );
};

export default ScrollProgressBar;