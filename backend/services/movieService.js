// backend/services/movieService.js

const axios = require("axios");

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

async function searchMovies(query, page = 1) {
  if (!query) return { success: false, message: "Search query is required" };

  try {
    const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
      params: { api_key: TMDB_API_KEY, query, page },
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: "Error searching movies", error: error.message };
  }
}

async function getPopularMovies(page = 1) {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/popular`, {
      params: { api_key: TMDB_API_KEY, page },
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: "Error fetching popular movies", error: error.message };
  }
}

async function getMovieDetails(id) {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/${id}`, {
      params: {
        api_key: TMDB_API_KEY,
        append_to_response: "credits,videos",
      },
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: "Error fetching movie details", error: error.message };
  }
}

async function getMoviesByGenre(genreId, page = 1) {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/discover/movie`, {
      params: {
        api_key: TMDB_API_KEY,
        with_genres: genreId,
        page,
      },
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: "Error fetching movies by genre", error: error.message };
  }
}

async function getGenres() {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/genre/movie/list`, {
      params: { api_key: TMDB_API_KEY },
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: "Error fetching genres", error: error.message };
  }
}

module.exports = {
  searchMovies,
  getPopularMovies,
  getMovieDetails,
  getMoviesByGenre,
  getGenres,
};
