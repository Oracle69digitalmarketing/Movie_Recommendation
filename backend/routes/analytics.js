const express = require("express")
const auth = require("../middleware/auth")
const User = require("../models/User")

const router = express.Router()

// Get user analytics dashboard
router.get("/dashboard", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)

    // Mock analytics data - implement actual analytics
    const analytics = {
      totalMoviesWatched: user.favorites.length + 50, // Mock calculation
      favoriteGenres: [
        { genre: "Action", count: 45 },
        { genre: "Drama", count: 32 },
        { genre: "Comedy", count: 28 },
        { genre: "Thriller", count: 22 },
        { genre: "Sci-Fi", count: 18 },
      ],
      watchingStreak: 15,
      averageRating: 7.8,
      monthlyStats: [
        { month: "Jan", watched: 12 },
        { month: "Feb", watched: 8 },
        { month: "Mar", watched: 15 },
        { month: "Apr", watched: 10 },
        { month: "May", watched: 18 },
        { month: "Jun", watched: 14 },
      ],
      topActors: [
        { name: "Ryan Gosling", movies: 8 },
        { name: "Margot Robbie", movies: 6 },
        { name: "Leonardo DiCaprio", movies: 5 },
      ],
      topDirectors: [
        { name: "Christopher Nolan", movies: 5 },
        { name: "Denis Villeneuve", movies: 4 },
        { name: "Quentin Tarantino", movies: 3 },
      ],
      yearlyProgress: {
        target: 100,
        current: 67,
        percentage: 67,
      },
    }

    res.json({ analytics })
  } catch (error) {
    res.status(500).json({ message: "Failed to load analytics", error: error.message })
  }
})

// Track user activity
router.post("/track", auth, async (req, res) => {
  try {
    const { action, data } = req.body

    // In production, save analytics data to database
    console.log(`User ${req.user._id} performed action: ${action}`, data)

    res.json({ message: "Activity tracked successfully" })
  } catch (error) {
    res.status(500).json({ message: "Failed to track activity", error: error.message })
  }
})

// Get personalized insights
router.get("/insights", auth, async (req, res) => {
  try {
    const insights = [
      {
        type: "genre_trend",
        title: "You're watching more sci-fi lately!",
        description: "Your sci-fi movie consumption increased by 40% this month",
        icon: "🚀",
      },
      {
        type: "streak",
        title: "15-day watching streak!",
        description: "Keep it up! You're on track to beat your personal record",
        icon: "🔥",
      },
      {
        type: "recommendation",
        title: "Try some documentaries",
        description: "Based on your interests, you might enjoy nature documentaries",
        icon: "📚",
      },
    ]

    res.json({ insights })
  } catch (error) {
    res.status(500).json({ message: "Failed to load insights", error: error.message })
  }
})

module.exports = router
