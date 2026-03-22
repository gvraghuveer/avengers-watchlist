"use client";
import React from 'react';
import { useMovies } from '../context/MovieContext';

export default function Header() {
  const { searchQuery, setSearchQuery } = useMovies();

  return (
    <header className="fixed top-0 w-full z-40 bg-background/50 backdrop-blur-xl px-4 md:px-12 py-3 md:py-6 flex justify-between items-center border-b border-white/5">
      <div className="flex items-center gap-3">
         <div className="w-8 h-8 md:w-12 md:h-12 relative flex items-center justify-center shrink-0">
             <img src="/logo.svg" alt="Avengers Logo" className="w-full h-full drop-shadow-[0_0_10px_rgba(230,36,41,0.5)]" />
         </div>
         <div className="flex flex-col">
            <div className="text-lg md:text-2xl font-black tracking-tighter text-white uppercase mt-0.5 leading-none">AVENGERS</div>
            <div className="text-[8px] md:text-xs font-mono tracking-[0.4em] text-primary uppercase mt-0.5 font-bold">DATABASE</div>
         </div>
      </div>
      <div className="flex items-center relative group max-w-[150px] md:max-w-none">
        <span className="material-symbols-outlined text-[12px] md:text-sm absolute left-3 md:left-4 text-white/50 pointer-events-none z-10">search</span>
        <input 
           type="text" 
           placeholder="Search..." 
           value={searchQuery}
           onChange={(e) => setSearchQuery(e.target.value)}
           className="bg-white/5 border border-white/10 rounded-full py-1.5 md:py-2.5 pl-9 md:pl-10 pr-4 md:pr-6 text-[10px] md:text-xs font-mono uppercase tracking-widest text-white outline-none focus:bg-white/10 focus:border-white/30 transition-all duration-500 w-full md:w-48 md:focus:w-80 placeholder:text-white/20 shadow-inner"
        />
      </div>
    </header>
  );
}
