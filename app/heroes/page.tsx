"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Shield, Zap, Target, Cpu, Trophy } from "lucide-react";
import ScrollToTop from "../components/ScrollToTop";

/* ─────────────────── Heroes Background ─────────────────── */
const HeroBackground = () => (
  <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
    <div className="absolute inset-0 opacity-40 mix-blend-screen bg-[radial-gradient(circle_at_50%_0%,rgba(var(--primary-rgb),0.2),transparent_70%)] animate-[pulse_8s_infinite_alternate]" />
    <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]" />
  </div>
);

/* ─────────────────── Hero Card Component ─────────────────── */
const HeroCard = ({ hero, index }: { hero: any; index: number }) => {
  const [portraitUrl, setPortraitUrl] = useState<string | null>(null);

  useEffect(() => {
    const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || "15d2ea6d0dc1d476efbca3eba2b9bbfb";
    // We search for the hero name + "marvel" to get specific character-focused posters
    const query = encodeURIComponent(`${hero.name} Marvel`);
    
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`)
      .then(res => res.json())
      .then(data => {
        if (data.results && data.results.length > 0) {
          // Find a result that likely has a good poster (usually the first main movie)
          const bestMatch = data.results.find((m: any) => 
            m.title.toLowerCase().includes(hero.name.toLowerCase()) && m.poster_path
          ) || data.results[0];
          
          if (bestMatch.poster_path) {
            setPortraitUrl(`https://image.tmdb.org/t/p/w780${bestMatch.poster_path}`);
          }
        }
      })
      .catch(err => console.error("Error fetching hero image:", err));
  }, [hero.name]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: (index % 4) * 0.1 }}
      className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden group border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] cursor-pointer"
    >
      {portraitUrl ? (
        <Image
          fill
          src={portraitUrl}
          className="object-cover object-center transition-transform duration-[2.5s] ease-out group-hover:scale-110"
          alt={hero.name}
        />
      ) : (
        <div className="absolute inset-0 bg-zinc-900 flex flex-col items-center justify-center p-8 text-center bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb),0.1),transparent_70%)]">
             <Shield className="w-12 h-12 text-white/5 mb-4 animate-pulse" />
             <div className="h-4 w-24 bg-white/5 rounded animate-pulse mb-2" />
             <div className="h-3 w-32 bg-white/5 rounded animate-pulse" />
        </div>
      )}
      
      {/* HUD Overlay Elements */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90 transition-opacity group-hover:opacity-70" />
      
      {/* Corner Accents */}
      <div className="absolute top-6 left-6 w-8 h-[1px] bg-white/20" />
      <div className="absolute top-6 left-6 w-[1px] h-8 bg-white/20" />
      <div className="absolute top-6 right-6 text-[8px] font-mono text-white/20 uppercase tracking-widest text-right">
        REC_{hero.name.substring(0, 3).toUpperCase()}/S{100 + index} <br /> LVL: {(hero.stats.combat + hero.stats.intel + hero.stats.strength + hero.stats.tech) / 4}
      </div>

      {/* Main Content */}
      <div className="absolute inset-0 p-10 flex flex-col justify-end">
        <div className="transition-transform duration-700 group-hover:-translate-y-4">
          <p className="text-[10px] font-mono text-primary font-black uppercase tracking-[0.4em] mb-2">
             {hero.affiliation}
          </p>
          <h4 className="text-3xl lg:text-4xl font-black text-white uppercase italic tracking-tighter leading-none mb-1">
            {hero.name}
          </h4>
          <p className="text-sm font-light text-zinc-400 italic mb-6">
            {hero.alias}
          </p>

          <div className="flex items-center gap-6 pt-6 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
            <div className="flex flex-col gap-1">
               <span className="text-[8px] font-mono text-white/30 uppercase tracking-[0.2em]">Primary Role</span>
               <span className="text-[10px] font-bold text-white/80 uppercase tracking-wider">{hero.role}</span>
            </div>
          </div>
        </div>

        {/* Stats HUD (Revealed on Hover) */}
        <div className="absolute inset-0 bg-black/85 backdrop-blur-md p-10 flex flex-col justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none group-hover:pointer-events-auto">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-primary/30 animate-[scan_2s_linear_infinite]" />
          <h5 className="text-[10px] font-mono text-primary uppercase tracking-[0.5em] mb-8 flex items-center gap-2">
            <Zap className="w-3 h-3" /> Tactical Analytics
          </h5>

          <div className="space-y-6">
            {[
              { label: "Combat", val: hero.stats.combat, icon: Shield },
              { label: "Intel", val: hero.stats.intel, icon: Cpu },
              { label: "Strength", val: hero.stats.strength, icon: Trophy },
              { label: "Tech", val: hero.stats.tech, icon: Target },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2">
                    <item.icon className="w-3 h-3 text-white/20" /> {item.label}
                  </span>
                  <span className="text-[10px] font-mono text-primary font-black">{item.val}%</span>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.val}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-primary shadow-[0_0_10px_rgba(230,36,41,0.5)]"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-6 border-t border-white/5">
              <p className="text-[9px] font-mono text-white/20 uppercase tracking-[0.4em] text-center">
                A.I. Analysis Complete
              </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function HeroesPage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const heroes = [
    { name: "Iron Man", alias: "Tony Stark", spec: "Armor", color: "red-500", stats: { combat: 85, intel: 100, strength: 80, tech: 100 }, role: "Strategic Tech Specialist", affiliation: "Avengers" },
    { name: "Captain America", alias: "Steve Rogers", spec: "Shield", color: "blue-600", stats: { combat: 100, intel: 80, strength: 85, tech: 20 }, role: "Tactical Field Commander", affiliation: "Avengers" },
    { name: "Thor", alias: "Thor Odinson", spec: "Hammer", color: "cyan-400", stats: { combat: 95, intel: 75, strength: 100, tech: 30 }, role: "Asgardian Heavy Hitter", affiliation: "Avengers" },
    { name: "Spider-Man", alias: "Peter Parker", spec: "Webs", color: "red-500", stats: { combat: 80, intel: 90, strength: 85, tech: 80 }, role: "Urban Infiltrator", affiliation: "New Avengers" },
    { name: "Black Widow", alias: "Natasha Romanoff", spec: "Espionage", color: "zinc-800", stats: { combat: 100, intel: 95, strength: 40, tech: 60 }, role: "Covert Ops Expert", affiliation: "Avengers" },
    { name: "Hulk", alias: "Bruce Banner", spec: "Rage", color: "green-600", stats: { combat: 70, intel: 100, strength: 100, tech: 70 }, role: "Planetary Siege Weapon", affiliation: "Avengers" },
    { name: "Black Panther", alias: "T'Challa", spec: "Suit", color: "purple-900", stats: { combat: 95, intel: 90, strength: 85, tech: 95 }, role: "Wakandan Vanguard", affiliation: "Wakanda" },
    { name: "Doctor Strange", alias: "Stephen Strange", spec: "Magic", color: "red-800", stats: { combat: 80, intel: 100, strength: 30, tech: 20 }, role: "Master of Mystic Arts", affiliation: "Masters of the Arts" },
    { name: "Scarlet Witch", alias: "Wanda Maximoff", spec: "Chaos", color: "red-900", stats: { combat: 85, intel: 80, strength: 90, tech: 10 }, role: "Omega-Level Reality Warper", affiliation: "Independent" },
    { name: "Hawkeye", alias: "Clint Barton", spec: "Archery", color: "purple-800", stats: { combat: 95, intel: 80, strength: 50, tech: 70 }, role: "Precision Strike Specialist", affiliation: "Avengers" },
    { name: "Captain America", alias: "Sam Wilson", spec: "Wings", color: "blue-500", stats: { combat: 90, intel: 85, strength: 75, tech: 75 }, role: "Aerial Combatant", affiliation: "Avengers" },
    { name: "Winter Soldier", alias: "Bucky Barnes", spec: "Cybernetic", color: "zinc-700", stats: { combat: 95, intel: 80, strength: 90, tech: 60 }, role: "Stealth Operative", affiliation: "Thunderbolts" },
    { name: "Vision", alias: "Vision", spec: "Solar", color: "red-600", stats: { combat: 85, intel: 100, strength: 95, tech: 100 }, role: "Synthetic Data Analyst", affiliation: "Avengers" },
    { name: "Ant-Man", alias: "Scott Lang", spec: "Shrink", color: "red-700", stats: { combat: 75, intel: 85, strength: 85, tech: 90 }, role: "Subatomic Explorer", affiliation: "Ant-Family" },
    { name: "Captain Marvel", alias: "Carol Danvers", spec: "Kree", color: "yellow-500", stats: { combat: 90, intel: 85, strength: 100, tech: 50 }, role: "Universal Protector", affiliation: "S.A.B.E.R." },
    { name: "Loki", alias: "Loki Laufeyson", spec: "Illusion", color: "emerald-600", stats: { combat: 90, intel: 95, strength: 80, tech: 40 }, role: "Keeper of Timelines", affiliation: "TVA" },
    { name: "Shang-Chi", alias: "Shang-Chi", spec: "Rings", color: "red-600", stats: { combat: 100, intel: 85, strength: 85, tech: 30 }, role: "Master of Martial Arts", affiliation: "Freelance" },
    { name: "Deadpool", alias: "Wade Wilson", spec: "Heal", color: "red-700", stats: { combat: 95, intel: 70, strength: 80, tech: 50 }, role: "Regenerative Mercenary", affiliation: "Unknown" },
    { name: "Wolverine", alias: "Logan", spec: "Claws", color: "yellow-600", stats: { combat: 100, intel: 75, strength: 95, tech: 20 }, role: "Unyielding Berserker", affiliation: "X-Men" },
    { name: "Star-Lord", alias: "Peter Quill", spec: "Galaxy", color: "red-400", stats: { combat: 85, intel: 85, strength: 75, tech: 85 }, role: "Legendary Outlaw", affiliation: "Guardians" },
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="min-h-screen bg-black relative overflow-x-hidden pt-24 pb-48">
      <HeroBackground />
      
      {/* Mouse glow */}
      <div
        className="fixed inset-0 pointer-events-none z-10 opacity-30"
        style={{ background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(var(--primary-rgb),0.1), transparent 80%)` }}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
        {/* Header Section */}
        <div className="mb-20 text-center md:text-left">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mb-4 justify-center md:justify-start"
          >
            <div className="w-12 h-[1px] bg-primary" />
            <span className="text-xs font-mono text-primary uppercase tracking-[0.5em] font-black">
              System Personnel Core
            </span>
          </motion.div>
          
          <div className="flex flex-col gap-6">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-9xl font-black text-white italic tracking-tighter leading-[0.8] uppercase"
            >
              Earth's <br /> <span className="text-primary italic">Mightiest</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-zinc-400 text-lg md:text-xl font-light italic leading-relaxed max-w-4xl"
            >
              "There was an idea, Stark knows this, called the Avengers Initiative. The idea was to bring together a group of remarkable people, to see if they could become something more."
            </motion.p>
          </div>
        </div>

        {/* Hero Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
          {heroes.map((h, i) => (
            <HeroCard key={h.name + i} hero={h} index={i} />
          ))}
        </div>
      </div>

      <ScrollToTop />
    </section>
  );
}
