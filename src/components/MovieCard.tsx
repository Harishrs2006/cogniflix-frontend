import { useNavigate } from "react-router-dom";
import "./moviecard.css";
import { type Movie } from "../services/movieService";

interface Props {
  movie: Movie;
  onInteraction?: () => void;
}

export default function MovieCard({ movie }: Props) {
  const navigate = useNavigate();

  return (
    <div 
      className="movie-card" 
      id={`movie-${movie.id}`}
      onClick={() => navigate(`/movie/${movie.id}`)}
    >
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