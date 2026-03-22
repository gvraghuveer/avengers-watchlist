"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default React.memo(function HeroesPage() {
  const heroes = [
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
  ];

  return (
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
        {heroes.map((h, i) => (
          <motion.div 
            key={h.name}
            variants={{
              hidden: { opacity: 0, scale: 0.9, y: 20 },
              show: { opacity: 1, scale: 1, y: 0 }
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden glass-card group border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] cursor-pointer"
          >
              <Image fill src={h.src} className="object-cover object-center transition-transform duration-[2.5s] ease-out group-hover:scale-110" alt={h.name} />
              <div className={`absolute inset-0 bg-gradient-to-tr ${h.color} mix-blend-soft-light opacity-50 group-hover:opacity-70 transition-opacity duration-1000`}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-700"></div>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 backdrop-blur-[2px]"></div>

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

              <div className="absolute bottom-10 left-8 right-8 z-10 transition-all duration-700 group-hover:translate-y-2 opacity-100 group-hover:opacity-50">
                <h4 className="text-4xl font-black text-white uppercase tracking-tighter drop-shadow-2xl leading-none mb-2">{h.name}</h4>
                <div className="flex items-center gap-3">
                   <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${h.color} shadow-[0_0_10px_currentColor]`}></div>
                   <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-[0.2em]">{h.spec}</p>
                </div>
              </div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 bg-white pointer-events-none"></div>
          </motion.div>
        ))}
    </motion.section>
  );
}
