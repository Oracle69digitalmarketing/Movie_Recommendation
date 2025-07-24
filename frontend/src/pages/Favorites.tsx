"use client"

import type React from "react"
import { useState, useEffect } from "react"
import MovieCard from "../components/MovieCard"
import { userAPI } from "../services/api"
import toast from "react-hot-toast"

interface FavoriteMovie {
  movieId: number
  title: string
  poster_path: string
  release_date: string
  vote_average: number
  overview: string
  addedAt: string
}

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<FavoriteMovie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadFavorites()
  }, [])

  const loadFavorites = async () => {
    setLoading(true)
    try {
      const favoritesData = await userAPI.getFavorites()
      setFavorites(favoritesData)
    } catch (error) {
      toast.error("Failed to load favorites")
    } finally {
      setLoading(false)
    }
  }

  const handleFavoriteToggle = () => {
    loadFavorites() // Reload favorites after toggle
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">My Favorites</h1>
        <p className="text-gray-400 text-lg">
          {favorites.length} movie{favorites.length !== 1 ? "s" : ""} in your favorites
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg mb-4">No favorite movies yet.</p>
          <p className="text-gray-500">Start exploring and add movies to your favorites!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {favorites.map((movie) => (
            <MovieCard
              key={movie.movieId}
              movie={{
                id: movie.movieId,
                title: movie.title,
                poster_path: movie.poster_path,
                release_date: movie.release_date,
                vote_average: movie.vote_average,
                overview: movie.overview || "",
              }}
              isFavorite={true}
              onFavoriteToggle={handleFavoriteToggle}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Favorites
