"use client";
import React from 'react';
import { useMovies } from '../context/MovieContext';

export default function Header() {
  const { searchQuery, setSearchQuery } = useMovies();

  return (
    <header className="fixed top-0 w-full z-40 bg-background/50 backdrop-blur-xl px-6 md:px-12 py-4 md:py-6 flex justify-between items-center border-b border-white/5">
      <div className="flex flex-col md:flex-row items-center gap-3">
         <div className="w-10 h-10 md:w-12 md:h-12 relative flex items-center justify-center">
             <img src="/logo.svg" alt="Avengers Logo" className="w-full h-full drop-shadow-[0_0_10px_rgba(230,36,41,0.5)]" />
         </div>
         <div className="flex flex-col">
            <div className="text-xl md:text-2xl font-black tracking-tighter text-white uppercase mt-0.5">AVENGERS</div>
            <div className="text-[10px] md:text-xs font-mono tracking-[0.4em] text-primary uppercase mt-[-4px] font-bold">DATABASE</div>
         </div>
      </div>
      <div className="hidden md:flex items-center relative group">
        <span className="material-symbols-outlined text-sm absolute left-4 text-white/50 pointer-events-none z-10">search</span>
        <input 
           type="text" 
           placeholder="Query Chronology..." 
           value={searchQuery}
           onChange={(e) => setSearchQuery(e.target.value)}
           className="bg-white/5 border border-white/10 rounded-full py-2.5 pl-10 pr-6 text-xs font-mono uppercase tracking-widest text-white outline-none focus:bg-white/10 focus:border-white/30 transition-all duration-500 w-48 focus:w-80 placeholder:text-white/20 shadow-inner"
        />
      </div>
    </header>
  );
}
