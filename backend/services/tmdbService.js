const axios = require("axios");

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

const fetchFromTMDB = async (endpoint, params = {}) => {
  const response = await axios.get(`${TMDB_BASE_URL}${endpoint}`, {
    params: { api_key: TMDB_API_KEY, ...params },
  });
  return response.data;
};

module.exports = {
  searchMovies: (query, page) => fetchFromTMDB("/search/movie", { query, page }),
  getPopularMovies: (page) => fetchFromTMDB("/movie/popular", { page }),
  getMovieDetails: (id) =>
    fetchFromTMDB(`/movie/${id}`, { append_to_response: "credits,videos" }),
  getMoviesByGenre: (genreId, page) =>
    fetchFromTMDB("/discover/movie", { with_genres: genreId, page }),
  getGenres: () => fetchFromTMDB("/genre/movie/list"),
};
