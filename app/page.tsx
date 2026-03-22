"use client";
import React from "react";
import { motion } from "framer-motion";
import { useMovies } from "./context/MovieContext";
import MovieCard from "./components/MovieCard";

export default function ArchivePage() {
  const { 
    movies, 
    searchQuery, 
    setSelectedMovie, 
    toggleStatus,
    sortBy, setSortBy,
    selectedPhase, setSelectedPhase,
    selectedHero, setSelectedHero
  } = useMovies();

  const archiveCount = movies.filter(m => m.status === 'WATCHED').length;
  
  // Analytics
  const totalRuntime = movies.reduce((acc, m) => acc + m.runtime, 0);
  const watchedRuntime = movies.filter(m => m.status === 'WATCHED').reduce((acc, m) => acc + m.runtime, 0);
  const remainingRuntime = totalRuntime - watchedRuntime;

  const filteredMovies = movies.filter(m => {
    const search = searchQuery.toLowerCase().replace(/[^a-z0-9]/g, '');
    const title = m.title.toLowerCase().replace(/[^a-z0-9]/g, '');
    const phase = m.phase.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    const matchesSearch = title.includes(search) || phase.includes(search);
    const matchesPhase = selectedPhase === "All Phases" || m.phase === selectedPhase;
    const matchesHero = selectedHero === "All Heroes" || m.cast?.includes(selectedHero.toLowerCase().replace(' ', '_'));
    return matchesSearch && matchesPhase && matchesHero;
  });

  const sortedMovies = [...filteredMovies].sort((a, b) => {
    if (sortBy === "CHRONO") {
      return parseInt(a.year) - parseInt(b.year);
    }
    return movies.findIndex(m => m.id === a.id) - movies.findIndex(m => m.id === b.id);
  });

  return (
    <motion.section key="archive" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="w-full -mt-4">
      {/* Sticky Top Bar (Stats + Filters) */}
      <div className="sticky top-20 z-30 mb-12 -mx-6 md:-mx-12 px-6 md:px-12 py-6 bg-background/80 backdrop-blur-3xl border-b border-white/5 shadow-2xl">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          <div className="flex flex-col gap-1">
            <h3 className="text-3xl md:text-4xl font-light tracking-tight text-on-surface">Avengers Archive</h3>
            
            {/* Redesigned Filters */}
            <div className="flex flex-wrap gap-3 mt-4">
              <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
                  <button 
                    onClick={() => setSortBy("RELEASE")}
                    className={`px-4 py-1.5 rounded-lg text-[9px] font-mono tracking-widest uppercase transition-all ${sortBy === "RELEASE" ? "bg-primary text-white shadow-[0_0_15px_rgba(230,36,41,0.3)]" : "text-white/40 hover:text-white/60"}`}
                  >
                    Release
                  </button>
                  <button 
                    onClick={() => setSortBy("CHRONO")}
                    className={`px-4 py-1.5 rounded-lg text-[9px] font-mono tracking-widest uppercase transition-all ${sortBy === "CHRONO" ? "bg-primary text-white shadow-[0_0_15px_rgba(230,36,41,0.3)]" : "text-white/40 hover:text-white/60"}`}
                  >
                    Chrono
                  </button>
              </div>

              <div className="h-8 w-px bg-white/10 hidden md:block" />

              <div className="flex gap-2">
                {[
                  { label: "Phase", value: selectedPhase, options: ["All Phases", "Phase 1", "Phase 2", "Phase 3", "Phase 4", "Phase 5", "Phase 6"], setter: setSelectedPhase },
                  { label: "Hero", value: selectedHero, options: ["All Heroes", "Stark", "Rogers", "Thor", "Banner", "Romanoff", "Strange", "Parker", "Maximoff", "Danvers", "Lang", "Fury"], setter: setSelectedHero }
                ].map(filter => (
                  <div key={filter.label} className="relative group/filter">
                    <select 
                      value={filter.value}
                      onChange={(e) => filter.setter(e.target.value)}
                      className="bg-white/5 border border-white/5 rounded-xl px-4 py-2 text-[9px] font-mono uppercase tracking-widest text-white/50 outline-none hover:border-white/20 transition-all cursor-pointer appearance-none pr-8 min-w-[120px]"
                    >
                      {filter.options.map(opt => <option key={opt} value={opt} className="bg-surface-container">{opt}</option>)}
                    </select>
                    <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-[14px] text-white/20 pointer-events-none transition-transform group-hover/filter:rotate-180">expand_more</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 w-full lg:w-auto">
            {/* Runtime Stats */}
            <div className="hidden sm:flex items-center gap-6 bg-white/5 border border-white/5 px-6 py-3 rounded-[2rem] shadow-inner flex-1 lg:flex-none">
              <div className="text-right">
                <p className="text-[9px] font-mono tracking-[0.2em] uppercase text-zinc-500 mb-1">Remaining</p>
                <p className="text-xl font-bold text-white tracking-tighter leading-none">{(remainingRuntime/60).toFixed(1)}<span className="text-[10px] text-zinc-500 ml-1">HRS</span></p>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="text-right">
                <p className="text-[9px] font-mono tracking-[0.2em] uppercase text-zinc-500 mb-1">Watched</p>
                <p className="text-xl font-bold text-tertiary tracking-tighter leading-none">{(watchedRuntime/60).toFixed(1)}<span className="text-[10px] text-zinc-500 ml-1">HRS</span></p>
              </div>
            </div>

            <div className="flex items-center gap-5 bg-white/5 border border-white/10 px-5 py-3 rounded-[2rem] shadow-2xl backdrop-blur-md flex-1 lg:flex-none">
              <div className="text-right">
                <p className="text-[9px] font-mono tracking-[0.2em] uppercase text-secondary mb-1">Timeline Progress</p>
                <div className="text-2xl font-black text-white tracking-tighter leading-none">
                  <span className="text-tertiary drop-shadow-[0_0_10px_rgba(40,167,69,0.5)]">{archiveCount}</span> 
                  <span className="text-white/20 mx-2 text-xl">/</span> 
                  <span className="text-white/60">{movies.length}</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full border-2 border-surface-container flex items-center justify-center relative bg-surface-container-highest">
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle cx="22" cy="22" r="20" className="stroke-white/5" strokeWidth="4" fill="none" />
                  <circle cx="22" cy="22" r="20" className="stroke-tertiary drop-shadow-[0_0_5px_rgba(40,167,69,0.8)] transition-all duration-1000 ease-out" strokeWidth="4" fill="none" strokeDasharray="125.6" strokeDashoffset={125.6 - (125.6 * (archiveCount / movies.length))} strokeLinecap="round" />
                </svg>
                <span className="material-symbols-outlined text-[16px] text-white/50">data_exploration</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8 min-h-[50vh]">
        {sortedMovies.map((movie, idx) => {
          const phaseMovies = movies.filter(m => m.phase === movie.phase);
          const isPhaseComplete = phaseMovies.every(m => m.status === 'WATCHED');
          return (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              index={idx} 
              onToggleStatus={toggleStatus} 
              onSelectMovie={setSelectedMovie} 
              isPhaseComplete={isPhaseComplete}
            />
          );
        })}
      </div>
    </motion.section>
  );
}
