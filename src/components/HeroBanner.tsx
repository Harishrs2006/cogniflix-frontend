import type { Movie } from "../services/movieService";
import "./herobanner.css";

export default function HeroBanner({ movie }: { movie: Movie }) {
  if (!movie) return null;

  return (
    <div
      className="hero"
      id="hero-banner"
      style={{
        backgroundImage: `url(${movie.poster_url})`,
      }}
    >
      <div className="hero-content">
        <h1>{movie.title}</h1>
        <div className="buttons">
          <button className="play">
            <span>▶</span> Play
          </button>
          <button className="list">
            <span>+</span> My List
          </button>
        </div>
      </div>
    </div>
  );
}