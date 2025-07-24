const express = require("express")
const axios = require("axios")

const router = express.Router()

// Get streaming availability for a movie
router.get("/availability/:movieId", async (req, res) => {
  try {
    const { movieId } = req.params

    // Mock streaming data - integrate with JustWatch API or similar
    const providers = [
      {
        name: "Netflix",
        logo: "/logos/netflix.png",
        available: Math.random() > 0.5,
        url: `https://netflix.com/title/${movieId}`,
        price: "Subscription",
        quality: "4K",
      },
      {
        name: "Amazon Prime Video",
        logo: "/logos/prime.png",
        available: Math.random() > 0.5,
        url: `https://primevideo.com/detail/${movieId}`,
        price: Math.random() > 0.7 ? "Free" : "$3.99",
        quality: "HD",
      },
      {
        name: "Disney+",
        logo: "/logos/disney.png",
        available: Math.random() > 0.6,
        url: `https://disneyplus.com/movies/${movieId}`,
        price: "Subscription",
        quality: "4K",
      },
    ]

    res.json({ providers })
  } catch (error) {
    res.status(500).json({ message: "Failed to check availability", error: error.message })
  }
})

// Search across multiple streaming services
router.get("/search", async (req, res) => {
  try {
    const { query } = req.query

    // Mock cross-platform search results
    const results = {
      netflix: {
        available: Math.random() > 0.5,
        url: `https://netflix.com/search?q=${encodeURIComponent(query)}`,
      },
      prime: {
        available: Math.random() > 0.5,
        url: `https://primevideo.com/search/ref=atv_nb_sr?phrase=${encodeURIComponent(query)}`,
      },
      disney: {
        available: Math.random() > 0.7,
        url: `https://disneyplus.com/search?q=${encodeURIComponent(query)}`,
      },
    }

    res.json({ results })
  } catch (error) {
    res.status(500).json({ message: "Cross-platform search failed", error: error.message })
  }
})

module.exports = router
