const express = require("express");
const router = express.Router();
const tmdbService = require("../services/tmdbService");

// Search movies
router.get("/search", async (req, res) => {
  try {
    const { query, page = 1 } = req.query;
    if (!query) return res.status(400).json({ message: "Search query is required" });

    const data = await tmdbService.searchMovies(query, page);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error searching movies", error: error.message });
  }
});

// Popular movies
router.get("/popular", async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const data = await tmdbService.getPopularMovies(page);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching popular movies", error: error.message });
  }
});

// Movie details
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await tmdbService.getMovieDetails(id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching movie details", error: error.message });
  }
});

// Movies by genre
router.get("/genre/:genreId", async (req, res) => {
  try {
    const { genreId } = req.params;
    const { page = 1 } = req.query;
    const data = await tmdbService.getMoviesByGenre(genreId, page);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching movies by genre", error: error.message });
  }
});

// Genres list
router.get("/genres/list", async (req, res) => {
  try {
    const data = await tmdbService.getGenres();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching genres", error: error.message });
  }
});

module.exports = router;
