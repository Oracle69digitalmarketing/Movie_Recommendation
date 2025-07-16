const express = require("express")
const auth = require("../middleware/auth")
const User = require("../models/User")

const router = express.Router()

// Get user's social feed
router.get("/feed", auth, async (req, res) => {
  try {
    // Mock social feed - implement actual social features
    const feed = [
      {
        id: "1",
        userId: "user1",
        username: "MovieBuff123",
        avatar: "/avatars/user1.jpg",
        content: "Just watched Dune: Part Two and it was absolutely incredible!",
        movieId: 693134,
        movieTitle: "Dune: Part Two",
        rating: 9,
        likes: 24,
        comments: 8,
        timestamp: new Date(),
        type: "review",
      },
      {
        id: "2",
        userId: "user2",
        username: "CinemaLover",
        avatar: "/avatars/user2.jpg",
        content: "Added 5 new movies to my 'Must Watch' list this week!",
        likes: 12,
        comments: 3,
        timestamp: new Date(Date.now() - 86400000),
        type: "watchlist",
      },
    ]

    res.json({ feed })
  } catch (error) {
    res.status(500).json({ message: "Failed to load feed", error: error.message })
  }
})

// Create a social post
router.post("/post", auth, async (req, res) => {
  try {
    const { content, movieId, movieTitle, rating, type } = req.body

    // In production, save to database
    const post = {
      id: Date.now().toString(),
      userId: req.user._id,
      username: req.user.username,
      content,
      movieId,
      movieTitle,
      rating,
      type,
      likes: 0,
      comments: 0,
      timestamp: new Date(),
    }

    res.status(201).json({ post, message: "Post created successfully" })
  } catch (error) {
    res.status(500).json({ message: "Failed to create post", error: error.message })
  }
})

// Like a post
router.post("/like/:postId", auth, async (req, res) => {
  try {
    const { postId } = req.params

    // In production, update database
    res.json({ message: "Post liked successfully" })
  } catch (error) {
    res.status(500).json({ message: "Failed to like post", error: error.message })
  }
})

// Follow/unfollow user
router.post("/follow/:userId", auth, async (req, res) => {
  try {
    const { userId } = req.params
    const currentUser = await User.findById(req.user._id)

    // Add following/followers logic here
    res.json({ message: "User followed successfully" })
  } catch (error) {
    res.status(500).json({ message: "Failed to follow user", error: error.message })
  }
})

module.exports = router
