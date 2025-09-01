"use client";
import { motion } from "framer-motion";
import CTA from "./components/Cta";
import Experience from "./components/Experience";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import AboutMe from "./components/AboutMe";
import { Navbar } from "./components/Navbar";
import Projects from "./components/Projects";
import TextPath from "./components/TextPath";
import useCustomCursor from "./hooks/useCustomCursor";

export default function Home() {
  const { CURSOR_SIZE, setHovered, smoothMouse } = useCustomCursor();

  return (
    <div className="h-full">
      <motion.div
        initial={false}
        animate={{
          width: CURSOR_SIZE,
          height: CURSOR_SIZE,
        }}
        style={{
          top: smoothMouse.y,
          left: smoothMouse.x,
        }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 300,
        }}
        className="hidden md:block
          bg-black rounded-full fixed pointer-events-none
        "
      ></motion.div>
      <Navbar setHovered={setHovered} />
      <Hero />
      <AboutMe/>
      <TextPath />
      <Projects />
      <Experience />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}
