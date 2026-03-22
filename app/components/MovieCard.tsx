"use client";
import React from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Movie, Status } from '../lib/data';

interface MovieCardProps {
  movie: Movie;
  index: number;
  onToggleStatus: (id: string, s: Status) => void;
  onSelectMovie: (movie: Movie) => void;
  isPhaseComplete?: boolean;
}

const CharacterIcon = ({ id }: { id: string }) => {
  const icons: Record<string, string> = {
    stark: "electric_bolt",
    rogers: "shield",
    thor: "tsunami",
    banner: "Science",
    romanoff: "adjust",
    barton: "gps_fixed",
    fury: "visibility",
    strange: "auto_fix_high",
    parker: "vaping_rooms", // Use a placeholder-like icon that fits
    lang: "zoom_in",
    maximoff: "waves",
    t_challa: "pets",
    quill: "rocket_launch",
    danvers: "star",
    shuri: "settings",
    deadpool: "mood_bad",
    logan: "content_cut"
  };
  return <span className="material-symbols-outlined text-[10px]" style={{ fontVariationSettings: "'FILL' 1" }}>{icons[id] || 'group'}</span>;
};

export default function MovieCard({ movie, index, onToggleStatus, onSelectMovie, isPhaseComplete }: MovieCardProps) {
  const [posterUrl, setPosterUrl] = React.useState<string | null>(movie.poster || null);
  const [imageLoaded, setImageLoaded] = React.useState(false);
  
  // Parallax Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);
  
  const springConfig = { damping: 20, stiffness: 150 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  React.useEffect(() => {
    if (posterUrl) return;
    const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || '15d2ea6d0dc1d476efbca3eba2b9bbfb';
    let query = movie.title.replace('The Fantastic Four: First Steps', 'Fantastic Four').replace('Thunderbolts*', 'Thunderbolts');
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&year=${movie.year}`)
      .then(r => r.json())
      .then(d => {
         if (d.results && d.results[0]?.poster_path) {
            setPosterUrl(`https://image.tmdb.org/t/p/w500${d.results[0].poster_path}`);
         }
      }).catch(e => console.error(e));
  }, [movie]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const getStatusIcon = (status: Status) => {
    switch (status) {
      case "WATCHED": return <span className="material-symbols-outlined text-tertiary rounded-full" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>;
      case "TO_WATCH": return <span className="material-symbols-outlined text-secondary rounded-full" style={{ fontVariationSettings: "'FILL' 1" }}>schedule</span>;
      default: return <span className="material-symbols-outlined text-white/40">radio_button_unchecked</span>;
    }
  };

  const cycleStatus = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const next = (!movie.status || movie.status === 'UNWATCHED') ? 'TO_WATCH' : movie.status === 'TO_WATCH' ? 'WATCHED' : 'UNWATCHED';
    onToggleStatus(movie.id, next);
  };

  const borderColor = movie.status === 'WATCHED' ? 'border-tertiary shadow-[0_0_20px_rgba(40,167,69,0.15)] ring-1 ring-tertiary/50' : 
                      movie.status === 'TO_WATCH' ? 'border-secondary shadow-[0_0_20px_rgba(0,176,215,0.15)] ring-1 ring-secondary/50' : 
                      'border-white/5 hover:border-primary/50';

  const glowClass = isPhaseComplete ? "shadow-[0_0_30px_rgba(255,215,0,0.3)] border-yellow-500/50" : "";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: (index % 10) * 0.05 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        perspective: 1000
      }}
      className={`group cursor-pointer flex flex-col relative glass-card p-3 rounded-2xl transition-all duration-300 shadow-2xl ${
        isPhaseComplete 
          ? "ring-4 ring-primary/40 shadow-[0_0_40px_rgba(230,36,41,0.4)]" 
          : movie.status === 'WATCHED'
            ? "ring-2 ring-tertiary/20 shadow-[0_0_30px_rgba(40,167,69,0.3)]"
            : "hover:ring-2 hover:ring-white/10"
      }`}
      onClick={() => onSelectMovie(movie)}
    >
      <div className="aspect-[2/3] w-full overflow-hidden rounded-xl mb-4 relative bg-surface-container-highest isolate shadow-inner">
        {/* Real TMDB Image Map */}
        {posterUrl ? (
          <img 
            src={posterUrl} 
            alt={movie.title} 
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`} 
          />
        ) : null}
        
        {(!posterUrl || !imageLoaded) && (
           <div className={`w-full h-full bg-white/5 animate-pulse flex flex-col items-center justify-center p-6 bg-gradient-to-b from-surface-container-highest to-background ${posterUrl ? 'absolute inset-0' : ''}`}>
             <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-6 shadow-inner">
                <span className="material-symbols-outlined text-white/20 text-3xl">image</span>
             </div>
             <div className="w-3/4 h-3 bg-white/10 rounded-full mb-3"></div>
             <div className="w-1/2 h-3 bg-white/10 rounded-full"></div>
             
             {/* Invisible textual overlay for screen readers/fallback */}
             <span className="sr-only">{movie.title} - Loading Image</span>
           </div>
        )}
        
        {/* Status Toggle Button Overlay */}
        <button 
           onClick={cycleStatus} 
           className="absolute top-3 right-3 z-30 bg-background/60 backdrop-blur-md rounded-full shadow-lg p-1.5 hover:scale-110 active:scale-95 transition-transform flex items-center justify-center border border-white/10"
           title="Toggle Watch Status"
        >
           {getStatusIcon(movie.status || "UNWATCHED")}
        </button>

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center backdrop-blur-sm gap-2 pointer-events-none z-20">
          <span className="material-symbols-outlined text-primary text-6xl font-light scale-90 group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_15px_#E62429]">play_circle</span>
          <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-white opacity-0 group-hover:opacity-100 transition-opacity duration-700">View Details</span>
        </div>
      </div>
      
      <div className="flex flex-col flex-1">
        <h4 className="text-[15px] font-bold tracking-tight text-white group-hover:text-primary transition-colors truncate px-1">{movie.title}</h4>
        
        <div className="flex justify-between items-center mt-2 px-1">
          <div className="flex items-center gap-1.5">
            <p className="text-[9px] text-secondary font-mono tracking-wider uppercase">{movie.phase}</p>
            {isPhaseComplete && (
              <span className="text-yellow-500 material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
            )}
          </div>
          
          {/* Character Tags */}
          <div className="flex gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
            {movie.cast?.slice(0, 3).map((heroId) => (
              <div key={heroId} className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center border border-background shadow-sm" title={heroId}>
                <CharacterIcon id={heroId} />
              </div>
            ))}
          </div>
        </div>
      </div>
        <p className="text-[10px] text-zinc-500 font-mono mt-1 px-1">{movie.year}</p>
    </motion.div>
  );
}
