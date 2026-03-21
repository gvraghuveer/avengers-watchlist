"use client";

import React from 'react';
import { LayoutTemplate, Menu, X, Popcorn } from "lucide-react";

interface SidebarProps {
  phases: string[];
  selectedPhase: string;
  setSelectedPhase: (phase: string) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ phases, selectedPhase, setSelectedPhase, isSidebarOpen, setIsSidebarOpen }: SidebarProps) {
  return (
    <>
      {/* Mobile Top Nav */}
      <header className="lg:hidden fixed top-0 w-full z-50 glass border-b border-outlineVariant flex items-center justify-between p-4 h-16">
         <div className="flex items-center gap-2">
            <Popcorn className="w-6 h-6 text-white" />
            <span className="font-display font-bold text-lg text-textPrimary">Cinematica</span>
         </div>
         <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-textPrimary hover:text-white transition-colors">
            {isSidebarOpen ? <X /> : <Menu />}
         </button>
      </header>

      {/* Desktop & Mobile Sidebar Navigation */}
      <aside className={`fixed lg:sticky top-0 left-0 h-screen w-64 glass border-r border-outlineVariant/50 flex flex-col z-40 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} pt-16 lg:pt-0 shrink-0`}>
        <div className="hidden lg:flex p-6 h-24 items-center gap-3 border-b border-outlineVariant/50 shrink-0">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
            <Popcorn className="w-4 h-4 text-white" />
          </div>
          <h1 className="font-display font-bold text-xl uppercase tracking-widest text-white">Cinematica</h1>
        </div>
        
        <nav className="flex-1 p-6 flex flex-col gap-2 overflow-y-auto">
           <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-3 font-mono">Curated Collections</div>
           {phases.map(phase => (
              <button 
                key={phase}
                onClick={() => { setSelectedPhase(phase); setIsSidebarOpen(false); }}
                className={`text-left px-5 py-3 rounded-xl text-sm font-semibold transition-all relative overflow-hidden group ${selectedPhase === phase ? 'bg-white/10 text-white' : 'text-zinc-400 hover:bg-surfaceContainerHighest hover:text-white'}`}
              >
                {/* Active Indicator Line */}
                <div className={`absolute left-0 top-0 w-1 h-full transition-all duration-300 ${selectedPhase === phase ? 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.3)]' : 'bg-transparent group-hover:bg-white/20'}`} />
                {phase === "All" ? "Complete Archive" : phase}
              </button>
           ))}
        </nav>
      </aside>
    </>
  );
}
