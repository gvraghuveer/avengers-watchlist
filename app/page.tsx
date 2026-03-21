"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { initialMovies, Status, Movie } from "./lib/data";
import BottomNav from "./components/BottomNav";
import MovieCard from "./components/MovieCard";
import MovieDetailsModal from "./components/MovieDetailsModal";

const TimelineNode = ({ movie, onClick, hideInfo = false }: { movie: Movie, onClick: () => void, hideInfo?: boolean }) => {
  const [posterUrl, setPosterUrl] = useState<string | null>(movie.poster || null);
  useEffect(() => {
    if (posterUrl) return;
    const API_KEY = '15d2ea6d0dc1d476efbca3eba2b9bbfb';
    let query = movie.title.replace('The Fantastic Four: First Steps', 'Fantastic Four').replace('Thunderbolts*', 'Thunderbolts');
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&year=${movie.year}`)
      .then(r => r.json())
      .then(d => { if (d.results && d.results[0]?.poster_path) setPosterUrl(`https://image.tmdb.org/t/p/w500${d.results[0].poster_path}`); })
      .catch(e => console.error(e));
  }, [movie]);

  return (
    <div className="flex flex-col group cursor-pointer w-full max-w-[300px]" onClick={onClick}>
      <div className="w-full aspect-[2/3] rounded-xl overflow-hidden mb-4 border border-white/10 group-hover:border-primary/50 transition-colors shadow-2xl relative bg-surface-container-highest">
        {posterUrl ? (
          <img src={posterUrl} alt={movie.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        ) : (
          <div className="w-full h-full animate-pulse flex items-center justify-center">
            <span className="material-symbols-outlined text-white/20 text-4xl">image</span>
          </div>
        )}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
           <span className="font-mono text-xs uppercase tracking-widest text-primary font-black">Decrypt</span>
        </div>
      </div>
      {!hideInfo && (
        <>
          <h4 className="text-xl md:text-2xl font-black text-white group-hover:text-primary transition-colors tracking-tighter leading-tight drop-shadow-lg">{movie.title}</h4>
          <p className="text-secondary font-mono text-xs tracking-widest uppercase mt-2">{movie.year} • {movie.phase}</p>
        </>
      )}
    </div>
  );
};

// Extracted dedicated component for the Timeline to force useScroll ref matching on mount!
const TimelineView = ({ filteredMovies, setSelectedMovie }: { filteredMovies: Movie[], setSelectedMovie: (m: Movie) => void }) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);

  const { scrollYProgress } = useScroll({ 
     target: timelineRef,
     offset: ["start start", "end end"]
  });
  
  // Calculate precise mathematical pan distance in pixels directly
  useEffect(() => {
     if (containerRef.current) {
        // Compute strict translation: Total absolute inner width minus the screen boundaries
        setScrollRange(containerRef.current.scrollWidth - window.innerWidth);
        
        // Re-measure on physical screen resize to prevent overflow chopping
        const handleResize = () => setScrollRange(containerRef.current!.scrollWidth - window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
     }
  }, [filteredMovies]);

  // Dynamic horizontal translation strictly utilizing raw numerical matrices to bypass Framer string-parsing crashes
  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  return (
    <motion.section key="timeline" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full relative">
      <div ref={timelineRef} className="h-[350vh] relative w-full">
         <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-background">
            {/* Museum Floor Depth */}
            <div className="absolute bottom-0 left-0 right-0 h-[30vh] bg-gradient-to-t from-black/40 to-transparent pointer-events-none z-0"></div>

            <div className="absolute top-12 left-8 md:left-24 z-0 pointer-events-none opacity-40">
               <h2 className="text-4xl md:text-9xl font-black text-white/[0.03] uppercase tracking-tighter leading-none select-none">The Sacred<br/><span className="text-primary/20 italic">Timeline</span></h2>
            </div>

            <div className="w-full relative flex items-center h-[70vh]">
               <motion.div ref={containerRef} style={{ x }} className="flex flex-row items-center gap-16 md:gap-32 pl-[25vw] pr-[15vw] xl:pr-[25vw] w-max relative h-full">
                  
                  {/* Continuous Filament Filaments */}
                  <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-y-1/2 z-0 pointer-events-none shadow-[0_0_20px_rgba(255,255,255,0.2)]"></div>
                  <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/40 transform -translate-y-1/2 z-0 pointer-events-none blur-[1px]"></div>

                  {[...filteredMovies].sort((a,b) => parseInt(a.year) - parseInt(b.year)).map((m, i, arr) => {
                     const prevM = i > 0 ? arr[i-1] : null;
                     const showPhaseMarker = !prevM || prevM.phase !== m.phase;
                     const phaseLabel = m.phase.replace('Phase ', '').toUpperCase();

                     const taglines: Record<string, string> = {
                        "Iron Man": "The birth of a hero - and a universe.",
                        "The Incredible Hulk": "A fugitive battles his inner monster.",
                        "Iron Man 2": "Tony Stark faces his past - and legacy.",
                        "Thor": "Two worlds collide - one God falls.",
                        "Captain America: The First Avenger": "The first super-soldier is born.",
                        "The Avengers": "Earth's mightiest heroes finally unite.",
                        "Iron Man 3": "The hero must face his demons alone.",
                        "Thor: The Dark World": "An ancient threat returns to the Nine Realms.",
                        "Captain America: The Winter Soldier": "S.H.I.E.L.D. is compromised - trust no one.",
                        "Guardians of the Galaxy": "A team of outlaws saves the galaxy.",
                        "Avengers: Age of Ultron": "The heroes face their own creation.",
                        "Ant-Man": "Small hero - big impact.",
                        "Captain America: Civil War": "A house divided cannot stand.",
                        "Black Widow": "Family returns for one last mission.",
                        "Black Panther": "Long live the King.",
                        "Spider-Man: Homecoming": "A young hero finds his feet.",
                        "Doctor Strange": "Magic enters the Marvel Universe.",
                        "Thor: Ragnarok": "Asgard's end - a new beginning.",
                        "Ant-Man and the Wasp": "A partner in crime-fighting.",
                        "Avengers: Infinity War": "Half the universe vanishes.",
                        "Avengers: Endgame": "The final stand - whatever it takes.",
                        "Spider-Man: Far From Home": "Stepping out of the shadow.",
                        "Shang-Chi and the Legend of the Ten Rings": "The legend begins.",
                        "Spider-Man: No Way Home": "Multiple universes - one Spider-Man.",
                        "Doctor Strange in the Multiverse of Madness": "The multiverse is unleashed.",
                        "Black Panther: Wakanda Forever": "A new Protector rises.",
                        "Guardians of the Galaxy Vol. 3": "One last ride for the team.",
                        "Deadpool & Wolverine": "The ultimate team-up.",
                        "Avengers: Doomsday": "A new threat emerges.",
                        "Avengers: Secret Wars": "The final battle for existence."
                     };

                     return (
                        <div key={m.id} className="relative z-10 flex flex-col items-center justify-center w-[320px] shrink-0 group h-full">
                           
                           {/* Phase Separator */}
                           {showPhaseMarker && (
                           <div className="absolute -left-12 md:-left-24 top-0 bottom-0 flex flex-col justify-center pointer-events-none">
                              <div className="h-[40vh] w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
                              <div className="absolute left-4 top-[10%] opacity-10">
                                 <span className="text-8xl font-black italic tracking-tighter">0{phaseLabel}</span>
                              </div>
                           </div>
                           )}

                           {/* Info Reveal (Above) */}
                           <div className="absolute top-[10%] opacity-0 group-hover:opacity-100 transition-all duration-700 -translate-y-2 group-hover:translate-y-0 pointer-events-none text-center w-full z-30">
                              <p className="text-[10px] font-mono text-primary font-bold uppercase tracking-[0.3em] mb-1">{m.year}</p>
                              <h5 className="text-xl font-bold tracking-tight text-white/90">{m.title}</h5>
                           </div>                           {/* Main Node */}
                           <div className="relative z-20 scale-90 group-hover:scale-100 transition-transform duration-700">
                              <TimelineNode movie={m} onClick={() => setSelectedMovie(m)} hideInfo={true} />
                           </div>
                           
                           {/* Connection Pillar Tracker (Below) */}
                           <div className="absolute bottom-[5%] w-full flex flex-col items-center scale-90 group-hover:scale-100 transition-all duration-700">
                           <div className="relative flex items-center justify-center">
                              <div className={`absolute w-[1px] h-20 ${m.status === 'WATCHED' ? 'bg-tertiary/60' : 'bg-white/10'} -top-20 -z-10`}></div>
                              <div className={`w-10 h-10 rounded-full border-[8px] border-background z-20 transition-all duration-500 flex items-center justify-center cursor-pointer ${m.status === 'WATCHED' ? 'bg-tertiary shadow-[0_0_20px_rgba(40,167,69,0.9)]' : m.status === 'TO_WATCH' ? 'bg-secondary' : 'bg-white/10'}`}>
                                 {m.status === 'WATCHED' && <span className="material-symbols-outlined text-[16px] text-black font-black">check</span>}
                              </div>
                           </div>
                           <div className="mt-4 flex flex-col items-center gap-2 text-center px-4">
                              <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 font-bold bg-white/5 px-4 py-1.5 rounded-full border border-white/5 transition-all group-hover:border-primary/30 group-hover:text-primary">Phase {phaseLabel}</span>
                              <p className="text-[9px] leading-relaxed text-zinc-400 font-medium italic opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 max-w-[200px]">"{taglines[m.title] || "The saga continues..."}"</p>
                           </div>
                           </div>
                        </div>
                     );
                  })}
               </motion.div>
            </div>
         </div>
      </div>
    </motion.section>
  );
};

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("Archive");
  const [movies, setMovies] = useState(initialMovies);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("mcu-archive-save");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setMovies(initialMovies.map(m => {
          const found = parsed.find((p:Movie) => p.id === m.id);
          return found && found.status ? { ...m, status: found.status } : m;
        }));
      } catch (e) { console.error(e); }
    }
  }, []);

  useEffect(() => {
    if (mounted) {
       localStorage.setItem("mcu-archive-save", JSON.stringify(movies));
    }
  }, [movies, mounted]);

  const handleNavigateModal = (direction: 'next' | 'prev') => {
     if (!selectedMovie) return;
     const currentIdx = filteredMovies.findIndex(m => m.id === selectedMovie.id);
     if (currentIdx === -1) return;
     
     let nextIdx = direction === 'next' ? currentIdx + 1 : currentIdx - 1;
     if (nextIdx >= filteredMovies.length) nextIdx = 0;
     if (nextIdx < 0) nextIdx = filteredMovies.length - 1;
     
     setSelectedMovie(filteredMovies[nextIdx]);
  };

  if (!mounted) return null;

  const toggleStatus = (id: string, nextStatus: Status) => {
     setMovies(prev => prev.map(m => m.id === id ? { ...m, status: nextStatus } : m));
  };

  const archiveCount = movies.filter(m => m.status === 'WATCHED').length;
  const filteredMovies = movies.filter(m => 
     m.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
     m.phase.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <header className="fixed top-0 w-full z-40 bg-background/50 backdrop-blur-xl px-6 md:px-12 py-4 md:py-6 flex justify-between items-center border-b border-white/5">
        <div className="flex flex-col md:flex-row items-center gap-3">
           <div className="w-8 h-8 md:w-10 md:h-10 rounded bg-primary flex items-center justify-center shadow-[0_0_15px_#E62429]">
               <span className="material-symbols-outlined text-white text-base md:text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>movie</span>
           </div>
           <div className="text-xl md:text-2xl font-black tracking-tighter text-white uppercase mt-1">AVENGERS</div>
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

      <main className="relative z-10 px-6 md:px-12 pb-48 pt-32 min-h-screen">
        <AnimatePresence mode="wait">
          {activeTab === "Archive" && (
            <motion.section key="archive" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div className="mb-12 flex justify-between items-end">
                <div>
                  <h2 className="text-primary text-xs font-black tracking-[0.3em] uppercase mb-3 drop-shadow-[0_0_5px_#E62429]">Cinematic Universe</h2>
                  <h3 className="text-5xl md:text-6xl font-light tracking-tight text-on-surface">Avengers Archive</h3>
                </div>
                <div className="hidden md:flex items-center gap-5 bg-white/5 border border-white/10 px-5 py-3 rounded-3xl shadow-2xl backdrop-blur-md">
                  <div className="text-right">
                    <p className="text-[9px] font-mono tracking-[0.2em] uppercase text-secondary mb-1">Archive Completion</p>
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
                    <span className="material-symbols-outlined text-[16px] text-white/50">movie</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8 min-h-[50vh]">
                {filteredMovies.length > 0 ? filteredMovies.map((movie, idx) => (
                  <MovieCard key={movie.id} movie={movie} index={idx} onToggleStatus={toggleStatus} onSelectMovie={setSelectedMovie} />
                )) : (
                  <div className="col-span-full flex flex-col items-center justify-center p-12 opacity-50">
                     <span className="material-symbols-outlined text-6xl text-on-surface-variant mb-4">search_off</span>
                     <p className="font-mono uppercase tracking-widest text-sm text-secondary">No MCU records matched your query.</p>
                  </div>
                )}
              </div>
            </motion.section>
          )}

          {activeTab === "Timeline" && (
            <TimelineView filteredMovies={filteredMovies} setSelectedMovie={setSelectedMovie} />
          )}

          {activeTab === "Heroes" && (
            <motion.section 
              key="heroes" 
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                show: { transition: { staggerChildren: 0.1 } }
              }}
              className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
                {[
                  { name: "Iron Man", alias: "Tony Stark", spec: "Mark LXXXV Armor", color: "from-red-600 to-yellow-500", src: "https://image.tmdb.org/t/p/w1280/cKvDv2LpwVEqbdXWoQl4XgGN6le.jpg", stats: { combat: 85, intel: 100, strength: 80, tech: 100 } },
                  { name: "Captain America", alias: "Steve Rogers", spec: "Vibranium Shield", color: "from-blue-700 to-red-600", src: "https://image.tmdb.org/t/p/w1280/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg", stats: { combat: 100, intel: 80, strength: 85, tech: 20 } },
                  { name: "Thor", alias: "Thor Odinson", spec: "Stormbreaker", color: "from-cyan-400 to-blue-800", src: "https://image.tmdb.org/t/p/w1280/cDJ61O1STtbWNBwefuqVrRe3d7l.jpg", stats: { combat: 95, intel: 75, strength: 100, tech: 30 } },
                  { name: "Spider-Man", alias: "Peter Parker", spec: "Iron Spider Suit", color: "from-red-500 to-blue-700", src: "https://image.tmdb.org/t/p/w1280/fn4n6uOYcB6Uh89nbNPoU2w80RV.jpg", stats: { combat: 80, intel: 90, strength: 85, tech: 80 } },
                  { name: "Black Widow", alias: "Natasha Romanoff", spec: "Widow's Bite", color: "from-zinc-800 to-red-900", src: "https://image.tmdb.org/t/p/w1280/keIxh0wPr2Ymj0Btjh4gW7JJ89e.jpg", stats: { combat: 100, intel: 95, strength: 40, tech: 60 } },
                  { name: "Hulk", alias: "Bruce Banner", spec: "Gamma Radiation", color: "from-green-600 to-emerald-900", src: "https://image.tmdb.org/t/p/w1280/jPu8yiadqgzwFPGKJmGo637ASVP.jpg", stats: { combat: 70, intel: 100, strength: 100, tech: 70 } },
                  { name: "Black Panther", alias: "T'Challa", spec: "Vibranium Habit", color: "from-purple-900 to-zinc-900", src: "https://image.tmdb.org/t/p/w1280/19Ed4XgjahPm4U8JT7SnntERIlt.jpg", stats: { combat: 95, intel: 90, strength: 85, tech: 95 } },
                  { name: "Doctor Strange", alias: "Stephen Strange", spec: "Eye of Agamotto", color: "from-red-800 to-blue-900", src: "https://image.tmdb.org/t/p/w1280/3zvZ699gMW2RhWc0GisIukzq0Ls.jpg", stats: { combat: 80, intel: 100, strength: 30, tech: 20 } },
                  { name: "Scarlet Witch", alias: "Wanda Maximoff", spec: "Chaos Magic", color: "from-red-900 to-purple-800", src: "https://image.tmdb.org/t/p/w1280/dLWoJnYXhFeNouon4NmBLAr92rf.jpg", stats: { combat: 85, intel: 80, strength: 90, tech: 10 } },
                  { name: "Hawkeye", alias: "Clint Barton", spec: "Custom Bow & Quiver", color: "from-purple-800 to-zinc-900", src: "https://image.tmdb.org/t/p/w1280/9BBTo63ANSmhC4e6r62OJFuK2GL.jpg", stats: { combat: 95, intel: 80, strength: 50, tech: 70 } },
                ].map((h, i) => (
                  <motion.div 
                    key={h.name}
                    variants={{
                      hidden: { opacity: 0, scale: 0.9, y: 20 },
                      show: { opacity: 1, scale: 1, y: 0 }
                    }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden glass-card group border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] cursor-pointer"
                  >
                      {/* Character Backdrop */}
                      <img src={h.src} className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-[2.5s] ease-out group-hover:scale-110" alt={h.name} />
                      
                      {/* Character Specific Gradient Glow */}
                      <div className={`absolute inset-0 bg-gradient-to-tr ${h.color} mix-blend-soft-light opacity-50 group-hover:opacity-70 transition-opacity duration-1000`}></div>
                      
                      {/* Scrims */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-700"></div>
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 backdrop-blur-[2px]"></div>

                      {/* Power Stats Overlay - Revealed on Hover */}
                      <div className="absolute inset-x-8 top-16 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0 space-y-4">
                         <div className="space-y-1">
                            <p className="text-[10px] font-mono text-white/40 uppercase tracking-[0.3em]">Identity</p>
                            <p className="text-xl font-bold text-white tracking-tight">{h.alias}</p>
                         </div>
                         <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                            {Object.entries(h.stats).map(([label, val]) => (
                               <div key={label}>
                                  <p className="text-[9px] font-mono text-white/30 uppercase tracking-[0.2em] mb-1">{label}</p>
                                  <div className="h-0.5 w-full bg-white/10 rounded-full overflow-hidden">
                                     <motion.div 
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${val}%` }}
                                        transition={{ duration: 1.5, delay: 0.2 }}
                                        className="h-full bg-white/60"
                                     />
                                  </div>
                               </div>
                            ))}
                         </div>
                      </div>

                      {/* Static Bottom Details */}
                      <div className="absolute bottom-10 left-8 right-8 z-10 transition-all duration-700 group-hover:translate-y-2 opacity-100 group-hover:opacity-50">
                        <h4 className="text-4xl font-black text-white uppercase tracking-tighter drop-shadow-2xl leading-none mb-2">{h.name}</h4>
                        <div className="flex items-center gap-3">
                           <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${h.color} shadow-[0_0_10px_currentColor]`}></div>
                           <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-[0.2em]">{h.spec}</p>
                        </div>
                      </div>

                      {/* Hover Flash Effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 bg-white pointer-events-none"></div>
                  </motion.div>
                ))}
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-40"></div>

      <AnimatePresence>
        {selectedMovie && (
          <MovieDetailsModal 
            movie={selectedMovie} 
            onClose={() => setSelectedMovie(null)} 
            onNavigate={handleNavigateModal}
            onToggleStatus={(id, status) => {
               toggleStatus(id, status);
               setSelectedMovie((prev) => prev ? { ...prev, status } : null);
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
