"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeSelector() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-md border border-secondary/20 bg-background/50 backdrop-blur-sm animate-pulse" />
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative w-9 h-9 rounded-md border border-secondary/20 bg-background/50 backdrop-blur-sm hover:bg-secondary/10 transition-all duration-300 flex items-center justify-center group"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
    >
      {/* Sun Icon for Light Theme */}
      <Sun className={`h-4 w-4 text-foreground transition-all duration-300 ${
        theme === "light" 
          ? "rotate-0 scale-100 opacity-100" 
          : "rotate-90 scale-0 opacity-0"
      }`} />

      {/* Moon Icon for Dark Theme */}
      <Moon className={`absolute h-4 w-4 text-foreground transition-all duration-300 ${
        theme === "dark" 
          ? "rotate-0 scale-100 opacity-100" 
          : "-rotate-90 scale-0 opacity-0"
      }`} />

      {/* Smooth background indicator */}
      <div className="absolute inset-0 rounded-md bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </button>
  );
}