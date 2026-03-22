"use client";
import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import { useMovies } from "../context/MovieContext";
import { Movie } from "../lib/data";
import ScrollToTop from "../components/ScrollToTop";

/* ─────────────────── Timeline Card ─────────────────── */
const TimelineNode = React.memo(
  ({
    movie,
    index,
    onClick,
    isSelected,
  }: {
    movie: Movie;
    index: number;
    onClick: () => void;
    isSelected: boolean;
  }) => {
    const [posterUrl, setPosterUrl] = React.useState<string | null>(
      movie.poster || null,
    );

    React.useEffect(() => {
      if (posterUrl) return;
      const API_KEY =
        process.env.NEXT_PUBLIC_TMDB_API_KEY ||
        "15d2ea6d0dc1d476efbca3eba2b9bbfb";
      const query = movie.title
        .replace("The Fantastic Four: First Steps", "Fantastic Four")
        .replace("Thunderbolts*", "Thunderbolts");
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&year=${movie.year}`,
      )
        .then((r) => r.json())
        .then((d) => {
          if (d.results?.[0]?.poster_path)
            setPosterUrl(`https://image.tmdb.org/t/p/w500${d.results[0].poster_path}`);
        })
        .catch(console.error);
    }, [movie, posterUrl]);

    return (
      <motion.div
        layout="position"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30, delay: (index % 6) * 0.03 }}
        whileHover={{ scale: 1.05, y: -8, zIndex: 10 }}
        onClick={onClick}
        className="relative group cursor-pointer"
      >
        <div
          className={`relative aspect-[2/3] rounded-lg md:rounded-xl overflow-hidden border transition-all duration-500 shadow-xl ${
            isSelected
              ? "border-primary ring-4 ring-primary/30 scale-[1.02]"
              : "border-white/5 group-hover:border-white/40"
          }`}
        >
          {posterUrl ? (
            <Image
              fill
              src={posterUrl}
              alt={movie.title}
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-surface-container-highest flex flex-col items-center justify-center p-2">
              <span className="material-symbols-outlined text-white/10 text-2xl md:text-5xl animate-pulse">
                movie
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />

          <div className="absolute bottom-2 left-2 right-2 md:bottom-3 md:left-3 flex justify-between items-end">
            <div>
              <p className="text-[7px] md:text-[9px] font-mono text-primary font-black uppercase tracking-widest">
                {movie.year} // CONTINUITY
              </p>
              <h4 className="text-[9px] md:text-[11px] font-black text-white leading-tight uppercase tracking-tighter mt-0.5">
                {movie.title}
              </h4>
            </div>
            <div className="flex gap-0.5 mb-0.5">
              {[...Array(movie.postCredits)].map((_, i) => (
                <div key={i} className="w-1 h-1 rounded-full bg-primary/60 shadow-[0_0_5px_rgba(var(--primary-rgb),0.5)]" />
              ))}
            </div>
          </div>

          {movie.status === "WATCHED" && (
            <div className="absolute top-2 right-2 w-5 h-5 md:w-7 md:h-7 bg-primary rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]">
              <span className="material-symbols-outlined text-[12px] md:text-[16px] text-black font-black">
                check
              </span>
            </div>
          )}
        </div>
      </motion.div>
    );
  },
);
TimelineNode.displayName = "TimelineNode";

/* ─────────────────── Movie Detail Modal ─────────────────── */
function MovieModal({ movie, movies, onClose }: { movie: Movie; movies: Movie[]; onClose: () => void }) {
  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-zinc-950 border border-white/10 rounded-2xl shadow-[0_0_80px_rgba(0,0,0,0.8)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Backdrop blurred poster ── */}
        {movie.poster && (
          <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
            <img
              src={movie.poster}
              alt=""
              className="w-full h-64 object-cover scale-150 blur-3xl opacity-10"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/60 to-zinc-950" />
          </div>
        )}

        {/* ── Close Button – always visible ── */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-sm font-bold rounded-full border-2 border-white/20 shadow-[0_0_25px_rgba(239,68,68,0.5)] transition-all"
          aria-label="Close"
        >
          <X className="w-4 h-4" strokeWidth={3} />
          Close
        </button>

        {/* ── Content ── */}
        <div className="relative z-[1] p-6 md:p-8">
          {/* Header row */}
          <div className="flex gap-6 mb-8">
            {movie.poster && (
              <div className="relative flex-shrink-0 w-28 md:w-36 aspect-[2/3] rounded-xl overflow-hidden border border-white/20 shadow-2xl">
                <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="flex flex-col justify-end pr-16">
              <span className="text-primary font-mono text-[10px] uppercase tracking-[0.3em] font-black mb-1">
                Record No. {movie.id.toUpperCase()}
              </span>
              <h2 className="text-2xl md:text-4xl font-black text-white uppercase italic tracking-tighter leading-[0.9] mb-4">
                {movie.title}
              </h2>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {[
                  { label: "Year", value: movie.year },
                  { label: "Runtime", value: `${movie.runtime} min` },
                  { label: "Phase", value: movie.phase },
                  ...(movie.streamingOn ? [{ label: "Stream", value: movie.streamingOn }] : []),
                ].map((item) => (
                  <div key={item.label} className="flex flex-col">
                    <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">{item.label}</span>
                    <span className="text-sm font-black text-white/80 uppercase">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Synopsis */}
          {movie.synopsis && (
            <div className="mb-6 bg-white/[0.03] border border-white/5 p-5 rounded-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-primary rounded-l-xl" />
              <h5 className="text-[10px] text-primary/60 font-mono uppercase tracking-[0.4em] mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-xs">analytics</span> Mission Overview
              </h5>
              <p className="text-sm text-zinc-300 leading-relaxed italic">{movie.synopsis}</p>
            </div>
          )}

          {/* Cast */}
          {movie.cast && movie.cast.length > 0 && (
            <div className="mb-6">
              <h5 className="text-[10px] text-white/40 font-mono uppercase tracking-[0.4em] mb-3">Tactical Assets (Cast)</h5>
              <div className="flex flex-wrap gap-2">
                {movie.cast.map((heroId) => (
                  <div key={heroId} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 rounded-lg border border-white/10 hover:border-primary/40 transition-all">
                    <span className="material-symbols-outlined text-sm text-primary">shield</span>
                    <span className="text-[10px] font-bold text-white/70 uppercase tracking-wider">{heroId}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Prerequisites */}
          {movie.requires && movie.requires.length > 0 && (
            <div className="mb-6">
              <h5 className="text-[10px] text-white/40 font-mono uppercase tracking-[0.4em] mb-3">Watch First</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {movie.requires.map((reqId) => {
                  const req = movies.find((m) => m.id === reqId);
                  return (
                    <div key={reqId} className="flex items-center gap-3 p-3 bg-primary/5 border border-primary/10 rounded-xl">
                      <div className="w-8 h-10 bg-black/40 rounded border border-white/10 overflow-hidden flex-shrink-0">
                        {req?.poster ? (
                          <img src={req.poster} className="w-full h-full object-cover" alt="" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="material-symbols-outlined text-xs">movie</span>
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-[11px] font-black text-white uppercase tracking-tighter leading-tight">{req?.title || reqId}</p>
                        <p className="text-[8px] font-mono text-primary/60 uppercase">{req?.phase ?? ""}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Nexus Point */}
          {movie.nexusPoint && (
            <div className="bg-red-500/5 border border-red-500/20 p-5 rounded-xl relative overflow-hidden">
              <h5 className="text-[10px] text-red-400 font-mono uppercase tracking-[0.4em] mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-xs">error</span> Continuity Anomaly
              </h5>
              <p className="text-sm text-red-200/80 italic font-bold">"{movie.nexusPoint}"</p>
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-[9px] font-mono text-white/10 uppercase tracking-[0.5em]">
              Global Multiversal Security // Jarvis OS v4.2
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────── Background ─────────────────── */
const TemporalBackground = () => (
  <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
    <div className="absolute inset-0 opacity-40 mix-blend-screen bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb),0.15),transparent_70%),radial-gradient(circle_at_0%_0%,rgba(74,144,226,0.1),transparent_50%),radial-gradient(circle_at_100%_100%,rgba(153,0,0,0.1),transparent_50%)] animate-[pulse_10s_infinite_alternate]" />
    <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]" />
    {[...Array(15)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-px h-20 bg-gradient-to-b from-transparent via-primary/10 to-transparent"
        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
        animate={{ y: [0, 400], opacity: [0, 0.3, 0] }}
        transition={{ duration: 8 + Math.random() * 10, repeat: Infinity, ease: "linear" }}
      />
    ))}
  </div>
);

/* ─────────────────── Page ─────────────────── */
export default function TimelinePage() {
  const { movies } = useMovies();
  const [expandedData, setExpandedData] = useState<Movie | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activePhase, setActivePhase] = useState("Phase 1");

  const phaseSections = useMemo(() => {
    const phases = ["Phase 1", "Phase 2", "Phase 3", "Phase 4", "Phase 5", "Phase 6"];
    return phases
      .map((p) => ({
        title: p,
        movies: movies.filter((m) => m.phase === p).sort((a, b) => parseInt(a.year) - parseInt(b.year)),
      }))
      .filter((p) => p.movies.length > 0);
  }, [movies]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Intersection Observer for active phase highlight
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    phaseSections.forEach((section) => {
      const id = `phase-${section.title.replace(" ", "-")}`;
      const el = document.getElementById(id);
      if (el) {
        const observer = new IntersectionObserver(
          ([entry]) => { if (entry.isIntersecting) setActivePhase(section.title); },
          { threshold: 0.2, rootMargin: "-20% 0px -60% 0px" },
        );
        observer.observe(el);
        observers.push(observer);
      }
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [phaseSections]);

  const scrollToPhase = (title: string) => {
    const el = document.getElementById(`phase-${title.replace(" ", "-")}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="min-h-screen bg-black relative overflow-x-hidden pt-24 pb-48">
      <TemporalBackground />

      {/* Mouse glow */}
      <div
        className="fixed inset-0 pointer-events-none z-10 opacity-30"
        style={{ background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(var(--primary-rgb),0.1), transparent 80%)` }}
      />

      {/* PC Side Navigation */}
      <div className="hidden xl:flex fixed left-12 top-1/2 -translate-y-1/2 flex-col gap-6 z-50">
        <div className="w-px h-32 bg-gradient-to-b from-transparent via-primary/40 to-transparent mx-auto mb-4" />
        {phaseSections.map((p) => {
          const isActive = activePhase === p.title;
          return (
            <button key={p.title} onClick={() => scrollToPhase(p.title)} className="group flex items-center gap-4 text-left">
              <span className={`text-[10px] font-mono transition-all group-hover:text-primary group-hover:translate-x-2 ${isActive ? "text-primary" : "text-white/20"}`}>
                0{p.title.split(" ")[1]}
              </span>
              <div className={`w-2 h-2 rounded-full border transition-all ${isActive ? "bg-primary border-primary scale-150" : "border-white/20 group-hover:bg-primary group-hover:border-primary"}`} />
              <span className={`text-[9px] font-mono uppercase tracking-[0.4em] transition-all -translate-x-4 group-hover:translate-x-0 ${isActive ? "opacity-100 text-white" : "opacity-0 group-hover:opacity-100 text-white/10"}`}>
                {p.title}
              </span>
            </button>
          );
        })}
        <div className="w-px h-32 bg-gradient-to-b from-transparent via-primary/40 to-transparent mx-auto mt-4" />
      </div>

      {/* Timeline Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10 lg:pl-48">
        {phaseSections.map((section) => (
          <div key={section.title} id={`phase-${section.title.replace(" ", "-")}`} className="mb-48 last:mb-0 group">
            <div className="relative mb-12">
              <h3
                className="absolute -top-12 md:-top-24 left-0 text-7xl md:text-[14rem] font-black text-transparent select-none whitespace-nowrap pointer-events-none transition-all duration-1000"
                style={{ WebkitTextStroke: "1px rgba(255,255,255,0.05)" }}
              >
                {section.title.toUpperCase()}
              </h3>
              <div className="relative flex items-end justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-[10px] md:text-xs font-mono text-primary uppercase tracking-[0.5em] font-black mb-1">Sector Progress</p>
                  <h4 className="text-2xl md:text-5xl font-black text-white italic tracking-tighter uppercase leading-none">{section.title}</h4>
                </div>
                <div className="text-right hidden sm:block">
                  <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest">{section.movies.length} Temporal Records</p>
                  <div className="h-1 w-32 bg-white/5 rounded-full mt-2 overflow-hidden">
                    <motion.div
                      className="h-full bg-primary"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(section.movies.filter((m) => m.status === "WATCHED").length / section.movies.length) * 100}%` }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
              {section.movies.map((movie, idx) => (
                <TimelineNode
                  key={movie.id}
                  movie={movie}
                  index={idx}
                  isSelected={expandedData?.id === movie.id}
                  onClick={() => setExpandedData(movie)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Phase HUD */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-black/60 backdrop-blur-3xl border border-white/10 rounded-full flex items-center gap-2 shadow-[0_0_30px_rgba(0,0,0,0.5)] xl:hidden">
        {phaseSections.map((p) => (
          <button
            key={p.title}
            onClick={() => scrollToPhase(p.title)}
            className={`w-8 h-8 rounded-full border flex items-center justify-center text-[10px] font-mono transition-all ${activePhase === p.title ? "border-primary text-primary bg-primary/10" : "border-white/10 text-white/40 hover:text-primary hover:border-primary"}`}
          >
            {p.title.split(" ")[1]}
          </button>
        ))}
      </div>

      {/* Movie Detail Modal */}
      <AnimatePresence>
        {expandedData && (
          <MovieModal
            movie={expandedData}
            movies={movies}
            onClose={() => setExpandedData(null)}
          />
        )}
      </AnimatePresence>
      <ScrollToTop />
    </section>
  );
}
