"use client";
import { useLenis } from "@studio-freight/react-lenis";
import { AnimatePresence, motion } from "framer-motion";
import { MenuIcon, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeSelector } from "./ThemeSelector";
import { useTheme } from "next-themes";

type Props = {
  setHovered: (value: boolean) => void;
};

const Navbar: React.FC<Props> = ({ setHovered }) => {
  const lenis = useLenis();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { id: 2, name: "Virtual Me", link: "#work" },
    { id: 3, name: "Projects", link: "#projects" },
    { id: 4, name: "Experience", link: "#experience" },
    { id: 5, name: "Contacts", link: "#contacts" },
  ];

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  const burgerVariants = {
    closed: { rotate: 0, scale: 1 },
    open: { rotate: 180, scale: 1.1 },
  };

  const overlayVariants = {
    closed: { opacity: 0, backdropFilter: "blur(0px)" },
    open: {
      opacity: 1,
      backdropFilter: "blur(20px)",
      transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } as any, // Type assertion to bypass the error
    },
  } as any;

  const menuVariants = {
    closed: { x: "100%", transition: { type: "spring" as const, damping: 20, stiffness: 300 } },
    open: { x: "0%", transition: { type: "spring" as const, damping: 20, stiffness: 300 } },
  };

  const containerVariants = {
    closed: {},
    open: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const Links = () => (
    <ul
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="hidden md:flex gap-x-6 text-sm font-semibold font-sans relative items-center"
    >
      <li className="flex items-center">
        <ThemeSelector />
      </li>
      {links.map(({ id, link, name }) => (
        <li
          onClick={() => lenis?.scrollTo(link)}
          key={id}
          className="cursor-pointer hover:opacity-80 transition-opacity duration-200"
        >
          <Link href={link}>
            <p>{name.toUpperCase()}</p>
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <motion.div
        className={`navbar-fixed cursor-auto md:cursor-none fixed top-0 left-0 right-0 z-50 ${
          theme === "dark" ? "text-white" : "text-black"
        }`}
        animate={{
          height: isScrolled ? "60px" : "80px",
          backgroundColor: isScrolled ? "rgba(0, 0, 0, 0.05)" : "rgba(0, 0, 0, 0)",
          backdropFilter: isScrolled ? "blur(20px)" : "blur(0px)",
          borderBottom: isScrolled ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(255, 255, 255, 0)",
        }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 300,
          duration: 0.3,
        }}
      >
        <div className="container mx-auto px-2 sm:px-4 h-full overflow-hidden navbar-content">
          <div className="flex justify-between items-center h-full">
            <motion.h1
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="font-sans font-semibold truncate max-w-[45%]"
              animate={{ opacity: isScrolled ? 0.9 : 1 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
            >
              Ayush Jha
            </motion.h1>
            <div className="flex md:hidden items-center gap-2 max-w-[45%]">
              <div className="max-w-full overflow-hidden">
                <ThemeSelector />
              </div>
              <motion.button
                variants={burgerVariants}
                animate={mobileMenuOpen ? "open" : "closed"}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="relative z-[70] p-1 sm:p-2 focus:outline-none"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <MenuIcon size={20} />
              </motion.button>
            </div>
            <Links />
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="absolute top-0 right-0 h-full w-2/3 sm:w-64 md:w-72 lg:w-80 xl:w-96 bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl border-l border-white/10"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <div className="flex flex-col h-full pt-24 px-3 sm:px-8">
                <motion.button
                  onClick={() => setMobileMenuOpen(false)}
                  className="absolute top-6 right-6 p-1 sm:p-2 text-white hover:text-gray-300 transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <X size={20} />
                </motion.button>
                <motion.nav
                  variants={containerVariants}
                  initial="closed"
                  animate="open"
                  className="flex flex-col space-y-4"
                >
                  {links.map(({ id, link, name }) => (
                    <motion.a
                      key={id}
                      href={link}
                      className="text-white text-lg font-semibold cursor-pointer"
                      variants={containerVariants}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {name}
                    </motion.a>
                  ))}
                </motion.nav>
                <div className="mt-auto mb-8 space-y-4"></div>
              </div>
              <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="absolute top-1/4 right-8 w-32 h-32 border border-white/20 rounded-full"></div>
                <div className="absolute bottom-1/4 right-16 w-20 h-20 border border-white/10 rounded-full"></div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;