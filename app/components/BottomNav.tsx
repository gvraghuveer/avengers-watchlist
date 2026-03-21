import React from 'react';
import { motion } from 'framer-motion';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  const tabs = [
    { id: "Archive", icon: "movie_filter", label: "Archive" },
    { id: "Timeline", icon: "timeline", label: "Timeline" },
    { id: "Heroes", icon: "bolt", label: "Heroes" }
  ];

  return (
      <nav className="fixed bottom-8 left-0 right-0 z-50 flex justify-center items-center pointer-events-none">
        <div className="bg-surface-container-highest/60 backdrop-blur-3xl w-auto rounded-full p-2 flex justify-center items-center gap-2 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] pointer-events-auto">
          {tabs.map((tab) => (
             <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)} 
                className={`relative px-6 py-3 md:px-8 md:py-4 rounded-full flex flex-col items-center justify-center transition-colors duration-500 z-10 group ${activeTab === tab.id ? 'text-white' : 'text-white/40 hover:text-white/80'}`}
             >
                {activeTab === tab.id && (
                  <motion.div 
                     layoutId="nav-pill" 
                     className="absolute inset-0 bg-white/10 rounded-full shadow-inner border border-white/5" 
                     transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="material-symbols-outlined relative z-20 text-2xl md:text-3xl transition-transform group-hover:scale-110 duration-500" style={activeTab === tab.id ? { fontVariationSettings: "'FILL' 1" } : {}}>{tab.icon}</span>
                <span className={`text-[8px] font-mono uppercase tracking-widest mt-1 transition-opacity duration-300 absolute -top-6 bg-black/80 px-2 py-1 rounded opacity-0 group-hover:opacity-100 border border-white/10 ${activeTab === tab.id ? 'text-primary' : ''}`}>{tab.label}</span>
             </button>
          ))}
        </div>
      </nav>
  )
}
