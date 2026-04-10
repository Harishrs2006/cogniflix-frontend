import { useRef } from "react";
import MovieCard from "./MovieCard";
import type { Movie } from "../services/movieService";
import "./movierow.css";

interface Props {
  title: string;
  movies: Movie[];
}

export default function MovieRow({ title, movies }: Props) {
  const rowRef = useRef<HTMLDivElement>(null);

  return (
    <div className="row-container">
      <h2>{title}</h2>

      <div className="row-wrapper">
        <div className="row" ref={rowRef}>
          {movies.map((m) => (
            <MovieCard key={m.id} movie={m} />
          ))}
        </div>
      </div>
    </div>
  );
}