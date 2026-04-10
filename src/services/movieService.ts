export type Movie = {
  id: string;
  title: string;
  poster_url: string;
  popularity_score?: number;
};

type MovieResponse = {
  movies: Movie[];
};

const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://cogniflix-backend.onrender.com";

export const fetchMovies = async (): Promise<Movie[]> => {
  const res = await fetch(API_BASE_URL + "/api/movies", { credentials: "include" });

  if (!res.ok) throw new Error("Failed to fetch");

  const data: MovieResponse = await res.json();

  return data.movies.sort(
    (a, b) => (b.popularity_score || 0) - (a.popularity_score || 0)
  );
};