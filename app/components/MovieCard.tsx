"use client";
import React from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Plus, Check } from 'lucide-react';
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
      className={`group cursor-pointer flex flex-col relative glass-card p-2 md:p-3 rounded-2xl transition-all duration-300 shadow-2xl ${
        isPhaseComplete 
          ? "ring-4 ring-primary/40 shadow-[0_0_40px_rgba(230,36,41,0.4)]" 
          : movie.status === 'WATCHED'
            ? "ring-2 ring-tertiary/20 shadow-[0_0_30px_rgba(40,167,69,0.3)]"
            : "hover:ring-2 hover:ring-white/10"
      }`}
      onClick={() => onSelectMovie(movie)}
    >
      <div className="aspect-[2/3] w-full overflow-hidden rounded-xl mb-3 md:mb-4 relative bg-surface-container-highest isolate shadow-inner">
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
           <div className={`w-full h-full bg-white/5 animate-pulse flex flex-col items-center justify-center p-4 md:p-6 bg-gradient-to-b from-surface-container-highest to-background ${posterUrl ? 'absolute inset-0' : ''}`}>
             <div className="w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white/10 flex items-center justify-center mb-4 md:mb-6 shadow-inner">
                <span className="material-symbols-outlined text-white/20 text-xl md:text-3xl">image</span>
             </div>
             <div className="w-3/4 h-2 md:h-3 bg-white/10 rounded-full mb-2 md:mb-3"></div>
             <div className="w-1/2 h-2 md:h-3 bg-white/10 rounded-full"></div>
             
             {/* Invisible textual overlay for screen readers/fallback */}
             <span className="sr-only">{movie.title} - Loading Image</span>
           </div>
        )}
        
        {/* Status Toggle Button Overlay */}
        <button 
           onClick={cycleStatus} 
           className="absolute top-2 right-2 md:top-3 md:right-3 z-30 bg-background/60 backdrop-blur-md rounded-full shadow-lg p-1 md:p-1.5 hover:scale-110 active:scale-95 transition-transform flex items-center justify-center border border-white/10"
           title="Toggle Watch Status"
        >
          {movie.status === 'WATCHED' ? <Check className="w-3.5 h-3.5 md:w-4 md:h-4 text-tertiary drop-shadow-[0_0_8px_rgba(40,167,69,0.6)]" /> : 
           movie.status === 'TO_WATCH' ? <Plus className="w-3.5 h-3.5 md:w-4 md:h-4 text-secondary drop-shadow-[0_0_8px_rgba(0,176,215,0.6)]" /> :
           <Plus className="w-3.5 h-3.5 md:w-4 md:h-4 text-white/30" />}
        </button>

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Hover Action Overlay - Desktop only */}
        <div className="hidden md:flex absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-col items-center justify-center backdrop-blur-sm gap-2 pointer-events-none z-20">
          <span className="material-symbols-outlined text-primary text-6xl font-light scale-90 group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_15px_#E62429]">play_circle</span>
          <span className="text-white text-[10px] font-black uppercase tracking-[0.3em] bg-primary/20 px-4 py-1.5 rounded-full border border-primary/30 shadow-[0_0_20px_rgba(230,36,41,0.2)]">Classified Data</span>
        </div>
      </div>

      <div className="flex flex-col gap-1.5 px-0.5 pb-1">
        <div className="flex items-center justify-between gap-2 overflow-hidden">
          <span className="text-[8px] md:text-[9px] font-mono uppercase tracking-[0.2em] text-primary font-black truncate">{movie.phase}</span>
          <div className="flex items-center gap-1 shrink-0">
             <span className="material-symbols-outlined text-[10px] md:text-[12px] text-zinc-500">schedule</span>
             <span className="text-[9px] md:text-[10px] font-mono text-zinc-400 font-bold">{movie.runtime}m</span>
          </div>
        </div>
        
        <h4 className="text-[11px] md:text-[13px] font-black text-white/90 leading-tight uppercase tracking-tight group-hover:text-primary transition-colors duration-300 line-clamp-2 md:line-clamp-1 h-[2.2em] md:h-auto">{movie.title}</h4>
        
        <div className="flex items-center gap-1.5 mt-0.5">
           <div className={`w-5 h-5 md:w-7 md:h-7 rounded-lg border flex items-center justify-center transition-all ${
             movie.status === 'WATCHED' ? 'bg-tertiary/10 border-tertiary/30 text-tertiary' : 'bg-white/5 border-white/10 text-white/20'
           }`}>
             <span className="material-symbols-outlined text-[12px] md:text-[16px]">{getHeroIcon(movie)}</span>
           </div>
           <div className="flex-1 h-[1px] bg-white/5" />
           <div className="flex items-center gap-1">
              {[...Array(movie.postCredits)].map((_, i) => (
                <div key={i} className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-primary/40 shadow-[0_0_5px_rgba(230,36,41,0.5)]" />
              ))}
           </div>
        </div>
      </div>
      
    </motion.div>
  );
}

function getHeroIcon(movie: any) {
  const t = movie.title.toLowerCase();
  if (t.includes('iron man') || t.includes('stark')) return 'iron';
  if (t.includes('captain america') || t.includes('rogers')) return 'shield';
  if (t.includes('thor') || t.includes('thunder')) return 'bolt';
  if (t.includes('hulk') || t.includes('banner')) return 'potted_plant';
  if (t.includes('black widow') || t.includes('romanoff')) return 'spider';
  if (t.includes('doctor strange')) return 'magic_button';
  if (t.includes('spider-man') || t.includes('parker')) return 'visibility';
  if (t.includes('black panther')) return 'pets';
  if (t.includes('ant-man')) return 'bug_report';
  if (t.includes('guardians') || t.includes('star-lord')) return 'rocket_launch';
  return 'movie';
}
