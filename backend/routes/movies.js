const express = require("express")
const axios = require("axios")

const router = express.Router()

const TMDB_API_KEY = process.env.TMDB_API_KEY
const TMDB_BASE_URL = "https://api.themoviedb.org/3"

// Search movies
router.get("/search", async (req, res) => {
  try {
    const { query, page = 1 } = req.query

    if (!query) {
      return res.status(400).json({ message: "Search query is required" })
    }

    const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
      params: {
        api_key: TMDB_API_KEY,
        query,
        page,
      },
    })

    res.json(response.data)
  } catch (error) {
    res.status(500).json({ message: "Error searching movies", error: error.message })
  }
})

// Get popular movies
router.get("/popular", async (req, res) => {
  try {
    const { page = 1 } = req.query

    const response = await axios.get(`${TMDB_BASE_URL}/movie/popular`, {
      params: {
        api_key: TMDB_API_KEY,
        page,
      },
    })

    res.json(response.data)
  } catch (error) {
    res.status(500).json({ message: "Error fetching popular movies", error: error.message })
  }
})

// Get movie details
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params

    const response = await axios.get(`${TMDB_BASE_URL}/movie/${id}`, {
      params: {
        api_key: TMDB_API_KEY,
        append_to_response: "credits,videos",
      },
    })

    res.json(response.data)
  } catch (error) {
    res.status(500).json({ message: "Error fetching movie details", error: error.message })
  }
})

// Get movies by genre
router.get("/genre/:genreId", async (req, res) => {
  try {
    const { genreId } = req.params
    const { page = 1 } = req.query

    const response = await axios.get(`${TMDB_BASE_URL}/discover/movie`, {
      params: {
        api_key: TMDB_API_KEY,
        with_genres: genreId,
        page,
      },
    })

    res.json(response.data)
  } catch (error) {
    res.status(500).json({ message: "Error fetching movies by genre", error: error.message })
  }
})

// Get genres list
router.get("/genres/list", async (req, res) => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/genre/movie/list`, {
      params: {
        api_key: TMDB_API_KEY,
      },
    })

    res.json(response.data)
  } catch (error) {
    res.status(500).json({ message: "Error fetching genres", error: error.message })
  }
})

module.exports = router
