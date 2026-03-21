"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function CosmicBackground() {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <>
      {/* Background Soft Spotlight Parallax */}
      <motion.div 
        className="fixed inset-0 z-0 opacity-40 pointer-events-none"
        style={{ background: "radial-gradient(circle at 50% 0%, rgba(39, 39, 42, 0.6) 0%, transparent 70%), radial-gradient(circle at 10% 90%, rgba(24, 24, 27, 0.4) 0%, transparent 40%)" }}
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Film Grain / Subtle Grid overlay */}
      <motion.div 
        className="fixed inset-0 z-0 pointer-events-none opacity-20"
        style={{
          y: backgroundY,
          backgroundImage: 'radial-gradient(1px 1px at 20px 30px, rgba(255,255,255,0.1), transparent), radial-gradient(1px 1px at 80px 120px, rgba(255,255,255,0.05), transparent), radial-gradient(1px 1px at 140px 60px, rgba(255,255,255,0.05), transparent)',
          backgroundSize: '200px 200px',
        }}
      />
    </>
  );
}
