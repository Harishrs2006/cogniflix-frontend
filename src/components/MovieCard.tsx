import "./moviecard.css";
import type { Movie } from "../services/movieService";

interface Props {
  movie: Movie;
}

export default function MovieCard({ movie }: Props) {
  return (
    <div className="movie-card" id={`movie-${movie.id}`}>
      <img 
        src={movie.poster_url || "https://via.placeholder.com/300x450?text=No+Poster"} 
        alt={movie.title} 
        loading="lazy"
      />
      <div className="movie-info">
        <h3>{movie.title}</h3>
      </div>
    </div>
  );
}