const axios = require("axios")

const TMDB_BASE_URL = "https://api.themoviedb.org/3"
const TMDB_API_KEY = process.env.TMDB_API_KEY

// 🔥 Get trending/popular TV shows
exports.getPopularTVShows = async (req, res) => {
  const { page = 1 } = req.query
  try {
    const { data } = await axios.get(`${TMDB_BASE_URL}/tv/popular`, {
      params: { api_key: TMDB_API_KEY, page },
    })
    res.json(data)
  } catch (error) {
    res.status(500).json({ message: "Error fetching popular TV shows", error: error.message })
  }
}

// 🎯 Get detailed info for a single TV show
exports.getTVShowDetails = async (req, res) => {
  const { id } = req.params
  try {
    const { data } = await axios.get(`${TMDB_BASE_URL}/tv/${id}`, {
      params: {
        api_key: TMDB_API_KEY,
        append_to_response: "credits,videos,recommendations", // can add 'images,similar'
      },
    })
    res.json(data)
  } catch (error) {
    res.status(500).json({ message: "Error fetching TV show details", error: error.message })
  }
}

// 🔍 Search TV shows by name
exports.searchTVShows = async (req, res) => {
  const { query, page = 1 } = req.query
  if (!query) return res.status(400).json({ message: "Search query is required" })

  try {
    const { data } = await axios.get(`${TMDB_BASE_URL}/search/tv`, {
      params: { api_key: TMDB_API_KEY, query, page },
    })
    res.json(data)
  } catch (error) {
    res.status(500).json({ message: "Error searching TV shows", error: error.message })
  }
}

// 🎭 Get list of TV genres
exports.getTVGenres = async (req, res) => {
  try {
    const { data } = await axios.get(`${TMDB_BASE_URL}/genre/tv/list`, {
      params: { api_key: TMDB_API_KEY },
    })
    res.json(data)
  } catch (error) {
    res.status(500).json({ message: "Error fetching TV genres", error: error.message })
  }
}

// 🎞️ Get TV shows by genre ID
exports.getShowsByGenre = async (req, res) => {
  const { genreId } = req.params
  const { page = 1 } = req.query

  try {
    const { data } = await axios.get(`${TMDB_BASE_URL}/discover/tv`, {
      params: {
        api_key: TMDB_API_KEY,
        with_genres: genreId,
        page,
      },
    })
    res.json(data)
  } catch (error) {
    res.status(500).json({ message: "Error fetching TV shows by genre", error: error.message })
  }
}
