"use client";
import React from 'react';
import { MovieProvider, useMovies } from '../context/MovieContext';
import Header from './Header';
import BottomNav from './BottomNav';
import Footer from './Footer';
import MovieDetailsModal from './MovieDetailsModal';
import { AnimatePresence } from 'framer-motion';

function GlobalModal() {
  const { selectedMovie, setSelectedMovie, toggleStatus, movies, searchQuery, selectedPhase, selectedHero } = useMovies();
  
  // Filtering logic for the modal's internal navigation (Fuzzy)
  const filteredMovies = movies.filter(m => {
    const search = searchQuery.toLowerCase().replace(/[^a-z0-9]/g, '');
    const title = m.title.toLowerCase().replace(/[^a-z0-9]/g, '');
    const phase = m.phase.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    const matchesSearch = title.includes(search) || phase.includes(search);
    const matchesPhase = selectedPhase === "All Phases" || m.phase === selectedPhase;
    const matchesHero = selectedHero === "All Heroes" || m.cast?.includes(selectedHero.toLowerCase().replace(' ', '_'));
    return matchesSearch && matchesPhase && matchesHero;
  });

  const handleNavigateModal = (direction: 'next' | 'prev') => {
    if (!selectedMovie) return;
    const currentIdx = filteredMovies.findIndex(m => m.id === selectedMovie.id);
    if (currentIdx === -1) return;
    
    let nextIdx = direction === 'next' ? currentIdx + 1 : currentIdx - 1;
    if (nextIdx >= filteredMovies.length) nextIdx = 0;
    if (nextIdx < 0) nextIdx = filteredMovies.length - 1;
    
    setSelectedMovie(filteredMovies[nextIdx]);
  };

  return (
    <AnimatePresence>
      {selectedMovie && (
        <MovieDetailsModal 
          movie={selectedMovie} 
          onClose={() => setSelectedMovie(null)} 
          onNavigate={handleNavigateModal}
          onToggleStatus={(id, status) => {
             toggleStatus(id, status);
             setSelectedMovie((prev) => prev ? { ...prev, status } : null);
          }}
        />
      )}
    </AnimatePresence>
  );
}

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <MovieProvider>
      <Header />
      <main className="relative z-10 px-6 md:px-12 pb-48 pt-32 min-h-screen">
        {children}
      </main>
      <BottomNav />
      <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-40"></div>
      <GlobalModal />
    </MovieProvider>
  );
}
