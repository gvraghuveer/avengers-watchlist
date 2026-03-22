import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Loader2, Plus, Check, Eye, EyeOff, ChevronLeft, ChevronRight } from "lucide-react";
import { Movie, Status } from '../lib/data';

interface MovieDetailsModalProps {
  movie: Movie;
  onClose: () => void;
  onToggleStatus: (id: string, s: Status) => void;
  onNavigate?: (dir: 'next' | 'prev') => void;
}

export default function MovieDetailsModal({ movie, onClose, onToggleStatus, onNavigate }: MovieDetailsModalProps) {
  const [details, setDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showTrailer) setShowTrailer(false);
        else onClose();
      }
      if (e.key === 'ArrowRight' && onNavigate) { e.preventDefault(); onNavigate('next'); }
      if (e.key === 'ArrowLeft' && onNavigate) { e.preventDefault(); onNavigate('prev'); }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose, onNavigate, showTrailer]);

  useEffect(() => {
    async function fetchData() {
      try {
        const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || '15d2ea6d0dc1d476efbca3eba2b9bbfb';
        let query = movie.title.replace('The Fantastic Four: First Steps', 'Fantastic Four').replace('Thunderbolts*', 'Thunderbolts');
        
        const searchRes = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&year=${movie.year}`);
        const searchData = await searchRes.json();
        
        if (searchData.results && searchData.results.length > 0) {
          const tmdbId = searchData.results[0].id;
          const detailRes = await fetch(`https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${API_KEY}&append_to_response=watch/providers,credits,videos`);
          const detailData = await detailRes.json();
          
          if (!detailData.poster_path && searchData.results[0].poster_path) {
             detailData.poster_path = searchData.results[0].poster_path;
          }
          setDetails(detailData);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    setLoading(true);
    setShowTrailer(false);
    fetchData();
  }, [movie.id]);

  const getStreamingInfo = () => {
    const defaultHotstar = `https://www.hotstar.com/in/explore?search_query=${encodeURIComponent(movie.title)}`;
    if (!details || !details.watch?.providers) return { name: 'Disney+ Hotstar', url: defaultHotstar, bg: 'bg-[#01147c] border-[#01147c] shadow-[0_0_20px_rgba(1,20,124,0.5)]' };
    const providers = details.watch.providers.results?.IN?.flatrate || details.watch.providers.results?.US?.flatrate || [];
    const netflix = providers.find((p:any) => p.provider_name.toLowerCase().includes('netflix'));
    const prime = providers.find((p:any) => p.provider_name.toLowerCase().includes('prime'));
    const hotstar = providers.find((p:any) => p.provider_name.toLowerCase().includes('hotstar') || p.provider_name.toLowerCase().includes('disney'));
    if (netflix) return { name: 'Netflix', url: `https://www.netflix.com/search?q=${encodeURIComponent(movie.title)}`, bg: 'bg-[#E50914] border-[#E50914] shadow-[0_0_20px_rgba(229,9,20,0.5)]' };
    if (prime) return { name: 'Prime Video', url: `https://www.primevideo.com/region/eu/search/ref=atv_sr_sug_1?phrase=${encodeURIComponent(movie.title)}`, bg: 'bg-[#00A8E1] border-[#00A8E1] shadow-[0_0_20px_rgba(0,168,225,0.5)]' };
    return { name: 'Disney+ Hotstar', url: defaultHotstar, bg: 'bg-[#01147c] border-[#01147c] shadow-[0_0_20px_rgba(1,20,124,0.5)]' };
  };

  const director = details?.credits?.crew?.find((c: any) => c.job === 'Director')?.name || 'Marvel Archives';
  const trailer = details?.videos?.results?.find((v: any) => v.type === 'Trailer' && v.site === 'YouTube')?.key;
  const streamInfo = getStreamingInfo();
  const currentPoster = movie.poster || (details?.poster_path ? `https://image.tmdb.org/t/p/w500${details.poster_path}` : null);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-background/95 backdrop-blur-3xl overflow-y-auto"
      onClick={onClose}
    >
      <AnimatePresence>
        {showTrailer && trailer && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-[110] bg-black/95 flex items-center justify-center p-4 md:p-12"
            onClick={(e) => { e.stopPropagation(); setShowTrailer(false); }}
          >
             <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors">
                <X className="w-8 h-8" />
             </button>
             <iframe 
                src={`https://www.youtube.com/embed/${trailer}?autoplay=1`}
                className="w-full max-w-5xl aspect-video rounded-2xl shadow-[0_0_100px_rgba(230,36,41,0.2)] border border-white/10"
                allow="autoplay; encrypted-media"
                allowFullScreen
             />
          </motion.div>
        )}
      </AnimatePresence>

      {onNavigate && (
        <>
          <motion.button 
             whileTap={{ scale: 0.95 }}
             onClick={(e) => { e.stopPropagation(); onNavigate('prev'); }}
             className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-[110] w-14 h-14 rounded-full bg-background/50 backdrop-blur-xl border border-white/10 items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all shadow-2xl"
          >
             <ChevronLeft className="w-8 h-8 ml-[-2px]" />
          </motion.button>
          <motion.button 
             whileTap={{ scale: 0.95 }}
             onClick={(e) => { e.stopPropagation(); onNavigate('next'); }}
             className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-[110] w-14 h-14 rounded-full bg-background/50 backdrop-blur-xl border border-white/10 items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all shadow-2xl"
          >
             <ChevronRight className="w-8 h-8 mr-[-2px]" />
          </motion.button>
        </>
      )}
      <motion.div 
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        onClick={e => e.stopPropagation()}
        className="w-full max-w-6xl bg-surface-container border border-white/10 md:rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row relative my-auto min-h-[100dvh] md:min-h-0 md:h-[80vh]"
      >
        <button onClick={onClose} className="absolute top-4 right-4 z-50 p-2 glass-card rounded-full text-white hover:text-primary transition-colors border border-white/10">
          <X className="w-5 h-5 relative z-10" />
        </button>

        {/* Poster Side */}
        <div className="w-full md:w-[40%] h-[60vh] md:h-full relative shrink-0 overflow-hidden">
           {currentPoster ? (
             <img src={currentPoster} alt={movie.title} className="w-full h-full object-cover" />
           ) : (
             <div className="w-full h-full bg-surface-container-highest flex items-center justify-center">
               <span className="material-symbols-outlined text-6xl text-on-surface-variant">movie</span>
             </div>
           )}
           <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-surface-container via-surface-container/20 to-transparent" style={{ background: 'linear-gradient(to right, transparent 0%, rgba(25,25,25,0.8) 80%, #191919 100%)'}} />
           
           {trailer && (
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowTrailer(true)}
              className="absolute bottom-8 left-8 p-4 bg-primary text-white rounded-full shadow-[0_0_30px_rgba(230,36,41,0.6)] flex items-center justify-center border border-white/20 group hover:bg-white hover:text-primary transition-all duration-500"
            >
              <Play className="w-6 h-6 fill-current group-hover:scale-110" />
            </motion.button>
           )}
        </div>

        {/* Details Side */}
        <div className="w-full md:w-[60%] p-8 md:p-14 flex flex-col relative z-10 bg-surface-container md:h-full overflow-hidden">
           <div className="flex flex-wrap gap-4 text-xs font-mono text-secondary mb-4 uppercase tracking-[0.2em] shrink-0">
              <span className="text-white">{movie.phase}</span>
              <span>•</span>
              <span>{details?.release_date?.substring(0, 4) || movie.year}</span>
              <span>•</span>
              <span className="text-primary font-bold">{director}</span>
           </div>
           
           <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tighter mb-4 leading-tight uppercase shrink-0">{movie.title}</h2>
           
           <div className="flex-1 overflow-y-auto pr-2 md:pr-6 custom-scrollbar mb-8 flex flex-col">
              {loading ? (
                 <div className="flex flex-col pt-2 animate-pulse w-full max-w-2xl text-white">
                   <div className="w-3/4 h-6 bg-white/5 rounded mb-8"></div>
                   <div className="flex gap-2 mb-8">
                     <div className="w-16 h-4 bg-white/5 rounded-full"></div>
                     <div className="w-20 h-4 bg-white/5 rounded-full"></div>
                     <div className="w-14 h-4 bg-white/5 rounded-full"></div>
                   </div>
                   <div className="w-full h-3 bg-white/5 rounded mb-3"></div>
                   <div className="w-full h-3 bg-white/5 rounded mb-3"></div>
                   <div className="w-5/6 h-3 bg-white/5 rounded mb-3"></div>
                   <div className="w-2/3 h-3 bg-white/5 rounded"></div>
                 </div>
              ) : details ? (
                 <>
                   <div className="flex items-center gap-6 mb-8">
                      <div className="flex flex-col">
                         <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">Runtime</p>
                         <p className="text-xl font-bold text-white">{movie.runtime}m</p>
                      </div>
                      <div className="w-px h-8 bg-white/10" />
                      <div className="flex flex-col">
                         <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">Post-Credits</p>
                         <div className="flex items-center gap-1">
                            <p className="text-xl font-bold text-white">{movie.postCredits}</p>
                            <span className="material-symbols-outlined text-primary text-sm">stars</span>
                         </div>
                      </div>
                      <div className="w-px h-8 bg-white/10 hidden sm:block" />
                      <div className="hidden sm:flex flex-col">
                         <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">Status</p>
                         <span className={`text-[10px] font-bold uppercase tracking-widest ${movie.status === 'WATCHED' ? 'text-tertiary' : 'text-secondary'}`}>
                            {movie.status === 'WATCHED' ? 'Archived' : movie.status === 'TO_WATCH' ? 'In Queue' : 'Unread'}
                         </span>
                      </div>
                   </div>

                   {details.tagline && <p className="text-base md:text-xl text-primary font-medium italic mb-6">"{details.tagline}"</p>}
                   
                   <div className="flex flex-wrap gap-2 mb-6">
                      {details.genres?.map((g: any) => (
                        <span key={g.id} className="px-3 py-1 border border-white/10 rounded-full text-[10px] uppercase font-bold tracking-widest text-on-surface-variant bg-white/5 text-white/60">
                          {g.name}
                        </span>
                      ))}
                   </div>
                   
                   <p className="text-on-surface text-sm md:text-base leading-relaxed text-white/80 font-light max-w-2xl">
                      {details.overview || "No overview available in the sacred timeline archives."}
                   </p>
                 </>
              ) : (
                 <div className="flex items-center text-secondary h-full text-white">
                    <p className="font-mono text-xs tracking-widest uppercase">Failed to retrieve API transmission.</p>
                 </div>
              )}
           </div>

           <div className="pt-6 border-t border-white/10 mt-auto shrink-0 flex flex-col xl:flex-row gap-6 xl:items-end justify-between">
              <div>
                <p className="text-[10px] text-secondary font-mono tracking-[0.3em] uppercase mb-4 font-bold">Authorized Transmissions</p>
                <div className="flex flex-wrap gap-3">
                  <motion.a 
                    whileTap={{ scale: 0.97 }}
                    href={streamInfo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-3 px-8 py-4 rounded-xl text-white font-bold uppercase tracking-widest text-xs transition-shadow shadow-2xl border ${streamInfo.bg}`}
                  >
                    <Play className="w-4 h-4 fill-current" /> Watch on {streamInfo.name}
                  </motion.a>
                </div>
              </div>
              
              <div className="flex items-center gap-4 self-end xl:mb-1">
                <div className="flex flex-col items-center gap-2">
                  <motion.button 
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onToggleStatus(movie.id, movie.status === 'TO_WATCH' ? 'UNWATCHED' : 'TO_WATCH')}
                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-xl border ${movie.status === 'TO_WATCH' ? 'bg-secondary text-black border-secondary shadow-[0_0_20px_rgba(0,176,215,0.4)]' : 'bg-white/5 text-white border-white/10 hover:bg-white/10'}`}
                    title="Add to Queue"
                  >
                     {movie.status === 'TO_WATCH' ? <Check className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
                  </motion.button>
                  <span className="text-[9px] font-mono text-secondary tracking-widest uppercase">Queue</span>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <motion.button 
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onToggleStatus(movie.id, movie.status === 'WATCHED' ? 'UNWATCHED' : 'WATCHED')}
                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-xl border ${movie.status === 'WATCHED' ? 'bg-tertiary text-black border-tertiary shadow-[0_0_20px_rgba(40,167,69,0.4)]' : 'bg-white/5 text-white border-white/10 hover:bg-white/10'}`}
                    title="Mark Watched"
                  >
                     {movie.status === 'WATCHED' ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                  </motion.button>
                  <span className="text-[9px] font-mono text-tertiary tracking-widest uppercase">Watched</span>
                </div>
              </div>
           </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
