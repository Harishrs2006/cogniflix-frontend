/*
FILE: MovieContext.tsx

PURPOSE:
Provides global state for movie-related data (e.g., watch list).

FLOW:
Context -> Components -> UI Update based on data

USED BY:
App.tsx, MovieCard.tsx

NEXT FLOW:
None

*/
import React, { createContext, useContext, useState } from "react";
import type { Movie } from "../services/movieService";

interface MovieContextType {
  heroMovie: Movie | null;
  setHeroMovie: (movie: Movie) => void;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export function MovieProvider({ children }: { children: React.ReactNode }) {
  const [heroMovie, setHeroMovie] = useState<Movie | null>(null);

  return (
    <MovieContext.Provider value={{ heroMovie, setHeroMovie }}>
      {children}
    </MovieContext.Provider>
  );
}

export function useMovieContext() {
  const context = useContext(MovieContext);
  if (context === undefined) {
    throw new Error("useMovieContext must be used within a MovieProvider");
  }
  return context;
}
