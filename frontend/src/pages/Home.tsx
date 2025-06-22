"use client"

import type React from "react"
import { useState, useEffect } from "react"
import SearchBar from "../components/SearchBar"
import MovieCard from "../components/MovieCard"
import { movieAPI } from "../services/api"
import toast from "react-hot-toast"

interface Movie {
  id: number
  title: string
  poster_path: string
  release_date: string
  vote_average: number
  overview: string
}

const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    loadPopularMovies()
  }, [])

  const loadPopularMovies = async () => {
    setLoading(true)
    try {
      const response = await movieAPI.getPopularMovies()
      setMovies(response.results)
    } catch (error) {
      toast.error("Failed to load movies")
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (query: string) => {
    setSearchQuery(query)
    setLoading(true)
    try {
      const response = await movieAPI.searchMovies(query)
      setMovies(response.results)
    } catch (error) {
      toast.error("Failed to search movies")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
          Discover Amazing Movies
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Search through thousands of movies, save your favorites, and create custom watchlists
        </p>
      </div>

      {/* Search Bar */}
      <SearchBar onSearch={handleSearch} />

      {/* Movies Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {searchQuery ? `Search Results for "${searchQuery}"` : "Popular Movies"}
          </h2>
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery("")
                loadPopularMovies()
              }}
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Clear Search
            </button>
          )}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}

        {!loading && movies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              {searchQuery ? "No movies found for your search." : "No movies available."}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
