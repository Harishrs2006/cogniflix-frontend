import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchMovieById, postInteraction } from "../services/movieService";
import type { Movie } from "../services/movieService";
import { ChevronLeft, Play, ThumbsUp, Star } from "lucide-react";
import "./movieinfo.css";

export default function MovieInfoPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    const loadMovie = async () => {
      try {
        setLoading(true);
        const data = await fetchMovieById(id);
        setMovie(data);
      } catch (err) {
        console.error("Failed to load movie", err);
      } finally {
        setLoading(false);
      }
    };
    loadMovie();
  }, [id]);

  const handleInteraction = async (type: 'watch' | 'like' | 'rate') => {
    if (!movie) return;
    try {
      setActionLoading(true);
      await postInteraction(movie.id, type);
      // Optional: Add visual feedback (like a toast notification)
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <div className="loader">Loading...</div>;
  if (!movie) return <div className="loader">Movie not found.</div>;

  return (
    <div className="movie-info-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <ChevronLeft size={24} /> Back
      </button>

      <div className="movie-info-hero">
        <div className="movie-info-poster">
          <img 
            src={movie.poster_url || "https://via.placeholder.com/400x600?text=No+Poster"} 
            alt={movie.title} 
          />
        </div>

        <div className="movie-info-details">
          <h1 className="movie-title">{movie.title}</h1>
          
          <div className="movie-meta">
            <span className="match-score">{movie.popularity_score ? Math.round(movie.popularity_score * 10) : 85}% Match</span>
            <span className="region">{movie.region || 'Global'}</span>
            <span className="language">{movie.language?.toUpperCase() || 'EN'}</span>
            {movie.genre && <span className="genre-tag">{movie.genre}</span>}
          </div>

          <p className="movie-description">
            {movie.description || "No description available for this title."}
          </p>

          {movie.emotion_name && (
            <div className="movie-emotion">
              Mood: <span>{movie.emotion_name}</span>
            </div>
          )}

          <div className="movie-actions-large">
            <button 
              className="btn-primary" 
              disabled={actionLoading} 
              onClick={() => handleInteraction('watch')}
            >
              <Play size={20} fill="currentColor" /> Watch Now
            </button>
            <button 
              className="btn-secondary" 
              disabled={actionLoading} 
              onClick={() => handleInteraction('like')}
            >
              <ThumbsUp size={20} /> Like
            </button>
            <button 
              className="btn-secondary" 
              disabled={actionLoading} 
              onClick={() => handleInteraction('rate')}
            >
              <Star size={20} /> Rate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
