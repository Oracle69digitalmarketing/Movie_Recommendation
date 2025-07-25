// routes/tvshows.js
const express = require("express")
const { getPopularTVShows, getTVShowDetails, searchTVShows } = require("../controllers/tvshowsController")

const router = express.Router()

router.get("/popular", getPopularTVShows)
router.get("/search", searchTVShows)
router.get("/:id", getTVShowDetails)

module.exports = router
