"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <main className="relative min-h-[85vh] w-full flex flex-col justify-end border-b border-outline-variant/30">
        <div className="absolute inset-0 z-0">
          <img className="w-full h-full object-cover object-center grayscale-[0.2] opacity-70" alt="Hero Backdrop" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVrFq11ga9ixzATZAJZNEDTWmPF_jCUwUskO5zVoebK8cLUVBN8BQxV4xXHdgvjAZUjk2O0cJyhWSkW9ZoVowwC68PqyyQl99X6kZYoUpbMu0Rx-kMy-jXSIQb763uw5Kd_5Bs8QWfG_4j_h04iVvmJmigNW5HyQLd0-yFbYIFkxcoMRaZsxAWrp6MXs__WKblMPamYGEIZ6_abNDkVyyUzP8jj8H4ojKsqJIvTJBoN6jYO-9Dgmfm8VjC7KdWVodRBUAXL4BoHkI"/>
          <div className="absolute inset-0 scrim-bottom"></div>
        </div>
        
        <div className="relative z-10 px-6 md:px-12 pb-24 max-w-5xl">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-4 text-primary uppercase tracking-[0.4em] text-[10px] font-black">
              <span>MARVEL STUDIOS</span>
              <span className="w-1 h-1 bg-primary rounded-full shadow-[0_0_8px_#E62429]"></span>
              <span>ORIGINAL FILM</span>
            </div>
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-white leading-none uppercase drop-shadow-2xl">IRON MAN</h1>
            <div className="flex items-center gap-8 mt-6">
              <div className="flex flex-col">
                <span className="text-[10px] text-secondary uppercase tracking-widest font-semibold mb-1">Year</span>
                <span className="text-lg font-bold text-white">2008</span>
              </div>
              <div className="w-[1px] h-8 bg-white/10"></div>
              <div className="flex flex-col">
                <span className="text-[10px] text-secondary uppercase tracking-widest font-semibold mb-1">Duration</span>
                <span className="text-lg font-bold text-white">126 min</span>
              </div>
              <div className="w-[1px] h-8 bg-white/10"></div>
              <div className="flex flex-col">
                <span className="text-[10px] text-secondary uppercase tracking-widest font-semibold mb-1">Genre</span>
                <span className="text-lg font-bold text-white">Action / Sci-Fi</span>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-12 pt-4">
              <button className="px-8 md:px-10 py-4 bg-primary text-white font-black text-sm tracking-[0.2em] uppercase rounded-full hover:scale-105 transition-transform duration-300 shadow-[0_0_30px_rgba(230,36,41,0.4)] hover:shadow-[0_0_40px_rgba(230,36,41,0.6)] flex items-center gap-3">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span> Play Movie
              </button>
              <button className="px-8 md:px-10 py-4 glass-card border border-white/20 text-white font-bold text-sm tracking-widest uppercase rounded-full hover:bg-white/10 transition-all duration-300">
                  Trailer
              </button>
            </div>
          </motion.div>
        </div>
      </main>
  )
}
