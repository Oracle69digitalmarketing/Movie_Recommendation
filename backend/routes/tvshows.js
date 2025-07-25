const express = require("express")
const {
  getPopularTVShows,
  getTVShowDetails,
  searchTVShows,
  getTVGenres,
  getShowsByGenre
} = require("../controllers/tvshowsController")

const router = express.Router()

// Base: /api/tvshows
router.get("/popular", getPopularTVShows)
router.get("/search", searchTVShows)
router.get("/genres/list", getTVGenres)
router.get("/genre/:genreId", getShowsByGenre)
router.get("/:id", getTVShowDetails)

module.exports = router
