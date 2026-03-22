"use client";
import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-12 px-6 md:px-12 border-t border-white/5 bg-background relative z-20 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent shadow-[0_0_20px_rgba(230,36,41,0.5)]" />
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-3">
             <div className="w-6 h-6 relative opacity-50 grayscale hover:grayscale-0 transition-all">
                <img src="/logo.svg" alt="Avengers Logo" className="w-full h-full" />
             </div>
             <p className="text-[10px] font-mono tracking-[0.4em] text-white/40 uppercase font-black italic">Avenger Archives</p>
          </div>
          <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest mt-1">Sacred Timeline Synchronization Complete</p>
        </div>

        <div className="flex flex-col items-center md:items-end gap-2">
           <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">&copy; {currentYear} The Avengers Database</p>
           <p className="text-[9px] font-mono text-white/10 uppercase tracking-widest italic">Data authorized by TMDB Protocols</p>
        </div>
      </div>
    </footer>
  );
}
