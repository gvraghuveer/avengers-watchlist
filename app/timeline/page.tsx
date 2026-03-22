"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useMovies } from "../context/MovieContext";
import { Movie } from "../lib/data";

const TimelineNode = ({ movie, onClick, hideInfo = false }: { movie: Movie, onClick: () => void, hideInfo?: boolean }) => {
  const [posterUrl, setPosterUrl] = useState<string | null>(movie.poster || null);
  useEffect(() => {
    if (posterUrl) return;
    const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || '15d2ea6d0dc1d476efbca3eba2b9bbfb';
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

export default function TimelinePage() {
  const { movies, searchQuery, setSelectedMovie } = useMovies();
  const timelineRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);

  const filteredMovies = movies.filter(m => 
     m.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
     m.phase.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const { scrollYProgress } = useScroll({ 
     target: timelineRef,
     offset: ["start start", "end end"]
  });
  
  useEffect(() => {
     if (containerRef.current) {
        setScrollRange(containerRef.current.scrollWidth - window.innerWidth);
        const handleResize = () => setScrollRange(containerRef.current!.scrollWidth - window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
     }
  }, [filteredMovies]);

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  const taglines: Record<string, string> = {
    "Iron Man": "The birth of a hero - and a universe.",
    "The Incredible Hulk": "A fugitive battles his inner monster.",
    "Iron Man 2": "Tony Stark faces his past - and legacy.",
    "Thor": "Two worlds collide - one God falls.",
    "Captain America: The First Avenger": "The first super-soldier is born.",
    "The Avengers": "Earth's mightiest heroes finally unite.",
    "Iron Man 3": "The hero must face his demons alone.",
    "Thor: The Dark World": "An ancient threat returns to the Nine Realms.",
    "Captain America: The Winter Soldier": "S.H.I.L.D. is compromised - trust no one.",
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
    <motion.section key="timeline" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full relative -mt-32">
      <div ref={timelineRef} className="h-[350vh] relative w-full">
         <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-background">
            <div className="absolute bottom-0 left-0 right-0 h-[30vh] bg-gradient-to-t from-black/40 to-transparent pointer-events-none z-0"></div>

            <div className="absolute top-12 left-8 md:left-24 z-0 pointer-events-none opacity-40">
               <h2 className="text-4xl md:text-9xl font-black text-white/[0.03] uppercase tracking-tighter leading-none select-none">The Sacred<br/><span className="text-primary/20 italic">Timeline</span></h2>
            </div>

            <div className="w-full relative flex items-center h-[70vh]">
               <motion.div ref={containerRef} style={{ x }} className="flex flex-row items-center gap-16 md:gap-32 pl-[25vw] pr-[15vw] xl:pr-[25vw] w-max relative h-full">
                  
                  <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-y-1/2 z-0 pointer-events-none shadow-[0_0_20px_rgba(255,255,255,0.2)]"></div>
                  <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/40 transform -translate-y-1/2 z-0 pointer-events-none blur-[1px]"></div>

                  {[...filteredMovies].sort((a,b) => parseInt(a.year) - parseInt(b.year)).map((m, i, arr) => {
                     const prevM = i > 0 ? arr[i-1] : null;
                     const showPhaseMarker = !prevM || prevM.phase !== m.phase;
                     const phaseLabel = m.phase.replace('Phase ', '').toUpperCase();

                     return (
                        <div key={m.id} className="relative z-10 flex flex-col items-center justify-center w-[320px] shrink-0 group h-full">
                           {showPhaseMarker && (
                           <div className="absolute -left-12 md:-left-24 top-0 bottom-0 flex flex-col justify-center pointer-events-none">
                              <div className="h-[40vh] w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
                              <div className="absolute left-4 top-[10%] opacity-10">
                                 <span className="text-8xl font-black italic tracking-tighter">0{phaseLabel}</span>
                              </div>
                           </div>
                           )}

                           <div className="absolute top-[10%] opacity-0 group-hover:opacity-100 transition-all duration-700 -translate-y-2 group-hover:translate-y-0 pointer-events-none text-center w-full z-30">
                              <p className="text-[10px] font-mono text-primary font-bold uppercase tracking-[0.3em] mb-1">{m.year}</p>
                              <h5 className="text-xl font-bold tracking-tight text-white/90">{m.title}</h5>
                           </div>
                           <div className="relative z-20 scale-90 group-hover:scale-100 transition-transform duration-700">
                              <TimelineNode movie={m} onClick={() => setSelectedMovie(m)} hideInfo={true} />
                           </div>
                           
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
}
