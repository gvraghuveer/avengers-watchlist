"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down more than 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 md:right-12 z-[100] p-4 bg-primary text-white rounded-full shadow-[0_0_30px_rgba(230,36,41,0.5)] border border-white/20 hover:shadow-[0_0_50px_rgba(230,36,41,0.8)] transition-all group"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6 transition-transform group-hover:-translate-y-1" />
          
          {/* Subtle glow pulse */}
          <span className="absolute inset-0 rounded-full animate-ping bg-primary/20 pointer-events-none" />
          
          {/* HUD scanline effect */}
          <span className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
            <span className="absolute top-0 left-0 w-full h-[1px] bg-white/20 animate-[scan_2s_linear_infinite]" />
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
