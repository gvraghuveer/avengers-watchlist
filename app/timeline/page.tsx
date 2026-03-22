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
  const { movies, setSelectedMovie, selectedMovie } = useMovies();
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
                  isSelected={selectedMovie?.id === movie.id}
                  onClick={() => setSelectedMovie(movie)}
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

      {/* GlobalModal in LayoutWrapper handles this automatically */}
      <ScrollToTop />
    </section>
  );
}
