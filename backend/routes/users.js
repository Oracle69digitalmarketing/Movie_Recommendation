const express = require("express")
const User = require("../models/User")
const auth = require("../middleware/auth")

const router = express.Router()

// Get user favorites
router.get("/favorites", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    res.json(user.favorites)
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

// Add movie to favorites
router.post("/favorites", auth, async (req, res) => {
  try {
    const { movieId, title, poster_path, release_date, vote_average } = req.body

    const user = await User.findById(req.user._id)

    // Check if movie is already in favorites
    const existingFavorite = user.favorites.find((fav) => fav.movieId === movieId)
    if (existingFavorite) {
      return res.status(400).json({ message: "Movie already in favorites" })
    }

    user.favorites.push({
      movieId,
      title,
      poster_path,
      release_date,
      vote_average,
    })

    await user.save()
    res.json({ message: "Movie added to favorites", favorites: user.favorites })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

// Remove movie from favorites
router.delete("/favorites/:movieId", auth, async (req, res) => {
  try {
    const { movieId } = req.params

    const user = await User.findById(req.user._id)
    user.favorites = user.favorites.filter((fav) => fav.movieId !== Number.parseInt(movieId))

    await user.save()
    res.json({ message: "Movie removed from favorites", favorites: user.favorites })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

// Get user watchlists
router.get("/watchlists", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    res.json(user.watchlists)
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

// Create new watchlist
router.post("/watchlists", auth, async (req, res) => {
  try {
    const { name } = req.body

    const user = await User.findById(req.user._id)
    user.watchlists.push({ name, movies: [] })

    await user.save()
    res.json({ message: "Watchlist created", watchlists: user.watchlists })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

// Add movie to watchlist
router.post("/watchlists/:watchlistId/movies", auth, async (req, res) => {
  try {
    const { watchlistId } = req.params
    const { movieId, title, poster_path, release_date, vote_average } = req.body

    const user = await User.findById(req.user._id)
    const watchlist = user.watchlists.id(watchlistId)

    if (!watchlist) {
      return res.status(404).json({ message: "Watchlist not found" })
    }

    // Check if movie is already in watchlist
    const existingMovie = watchlist.movies.find((movie) => movie.movieId === movieId)
    if (existingMovie) {
      return res.status(400).json({ message: "Movie already in watchlist" })
    }

    watchlist.movies.push({
      movieId,
      title,
      poster_path,
      release_date,
      vote_average,
    })

    await user.save()
    res.json({ message: "Movie added to watchlist", watchlist })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

module.exports = router
