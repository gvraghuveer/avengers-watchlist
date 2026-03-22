"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { initialMovies, Movie, Status } from "../lib/data";

interface MovieContextType {
  movies: Movie[];
  setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
  toggleStatus: (id: string, s: Status) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedMovie: Movie | null;
  setSelectedMovie: React.Dispatch<React.SetStateAction<Movie | null>>;
  sortBy: "RELEASE" | "CHRONO";
  setSortBy: (s: "RELEASE" | "CHRONO") => void;
  selectedPhase: string;
  setSelectedPhase: (p: string) => void;
  selectedHero: string;
  setSelectedHero: (h: string) => void;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export function MovieProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [movies, setMovies] = useState(initialMovies);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [sortBy, setSortBy] = useState<"RELEASE" | "CHRONO">("RELEASE");
  const [selectedPhase, setSelectedPhase] = useState("All Phases");
  const [selectedHero, setSelectedHero] = useState("All Heroes");

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("mcu-archive-save");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setMovies(
          initialMovies.map((m) => {
            const found = parsed.find((p: any) => p.id === m.id);
            return found && found.status ? { ...m, status: found.status } : m;
          }),
        );
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("mcu-archive-save", JSON.stringify(movies));
    }
  }, [movies, mounted]);

  const toggleStatus = (id: string, nextStatus: Status) => {
    setMovies((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: nextStatus } : m)),
    );
  };

  return (
    <MovieContext.Provider
      value={{
        movies,
        setMovies,
        toggleStatus,
        searchQuery,
        setSearchQuery,
        selectedMovie,
        setSelectedMovie,
        sortBy,
        setSortBy,
        selectedPhase,
        setSelectedPhase,
        selectedHero,
        setSelectedHero,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}

export function useMovies() {
  const context = useContext(MovieContext);
  if (context === undefined) {
    throw new Error("useMovies must be used within a MovieProvider");
  }
  return context;
}
