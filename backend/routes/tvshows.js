const express = require("express")
const axios = require("axios")

const router = express.Router()

const TMDB_API_KEY = process.env.TMDB_API_KEY
const TMDB_BASE_URL = "https://api.themoviedb.org/3"

// 🔍 Search TV shows
router.get("/search", async (req, res) => {
  try {
    const { query, page = 1 } = req.query
    if (!query) return res.status(400).json({ message: "Search query is required" })

    const response = await axios.get(`${TMDB_BASE_URL}/search/tv`, {
      params: {
        api_key: TMDB_API_KEY,
        query,
        page,
      },
    })

    res.json(response.data)
  } catch (error) {
    res.status(500).json({ message: "Error searching TV shows", error: error.message })
  }
})

// 📺 Popular TV shows
router.get("/popular", async (req, res) => {
  try {
    const { page = 1 } = req.query

    const response = await axios.get(`${TMDB_BASE_URL}/tv/popular`, {
      params: {
        api_key: TMDB_API_KEY,
        page,
      },
    })

    res.json(response.data)
  } catch (error) {
    res.status(500).json({ message: "Error fetching popular TV shows", error: error.message })
  }
})

// 🎯 Get TV show details
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params

    const response = await axios.get(`${TMDB_BASE_URL}/tv/${id}`, {
      params: {
        api_key: TMDB_API_KEY,
        append_to_response: "credits,videos",
      },
    })

    res.json(response.data)
  } catch (error) {
    res.status(500).json({ message: "Error fetching TV show details", error: error.message })
  }
})

module.exports = router
