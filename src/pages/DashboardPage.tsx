import { useEffect, useState } from "react";
import HeroBanner from "../components/HeroBanner";
import MovieRow from "../components/MovieRow";
import { fetchMovies } from "../services/movieService";
import type { Movie } from "../services/movieService";
import "./dashboard.css";

export default function DashboardPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchMovies();

        const sorted = [...data].sort(
          (a, b) => (b.popularity_score || 0) - (a.popularity_score || 0)
        );

        setMovies(sorted);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  // 🔥 EXACT REQUIREMENT
  const moviesPerRow = 20;
  const totalRows = 5;

  const rows: Movie[][] = [];

  for (let i = 0; i < totalRows; i++) {
    const start = i * moviesPerRow;
    const end = start + moviesPerRow;
    rows.push(movies.slice(start, end));
  }

  if (loading) return <div className="loader">Loading...</div>;

  return (
    <div className="dashboard">
      {/* HERO */}
      {movies.length > 0 && <HeroBanner movie={movies[0]} />}

      {/* NETFLIX STYLE ROWS */}
      <div className="rows">
        {rows.map((rowMovies, index) => (
          <MovieRow
            key={index}
            title={
              index === 0
                ? "Popular"
                : index === 1
                ? "Trending Now"
                : index === 2
                ? "Top Picks"
                : index === 3
                ? "Watch Again"
                : "Recommended"
            }
            movies={rowMovies}
          />
        ))}
      </div>
    </div>
  );
}