"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Star, Heart, Plus, Calendar, Clock } from "lucide-react"
import { movieAPI, userAPI } from "../services/api"
import { useAuth } from "../contexts/AuthContext"
import toast from "react-hot-toast"

interface MovieDetails {
  id: number
  title: string
  overview: string
  poster_path: string
  backdrop_path: string
  release_date: string
  runtime: number
  vote_average: number
  vote_count: number
  genres: { id: number; name: string }[]
  credits: {
    cast: { id: number; name: string; character: string; profile_path: string }[]
  }
}

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { user } = useAuth()
  const [movie, setMovie] = useState<MovieDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    if (id) {
      loadMovieDetails(id)
    }
  }, [id])

  const loadMovieDetails = async (movieId: string) => {
    setLoading(true)
    try {
      const movieData = await movieAPI.getMovieDetails(movieId)
      setMovie(movieData)

      // Check if movie is in favorites
      if (user) {
        const favorites = await userAPI.getFavorites()
        setIsFavorite(favorites.some((fav: any) => fav.movieId === Number.parseInt(movieId)))
      }
    } catch (error) {
      toast.error("Failed to load movie details")
    } finally {
      setLoading(false)
    }
  }

  const handleFavoriteToggle = async () => {
    if (!user || !movie) {
      toast.error("Please login to add favorites")
      return
    }

    try {
      if (isFavorite) {
        await userAPI.removeFromFavorites(movie.id)
        toast.success("Removed from favorites")
      } else {
        await userAPI.addToFavorites(movie)
        toast.success("Added to favorites")
      }
      setIsFavorite(!isFavorite)
    } catch (error) {
      toast.error("Failed to update favorites")
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!movie) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">Movie not found.</p>
      </div>
    )
  }

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
    : "/placeholder.svg?height=720&width=1280"

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/placeholder.svg?height=750&width=500"

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0">
          <img src={backdropUrl || "/placeholder.svg"} alt={movie.title} className="w-full h-96 object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-16">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <img
              src={posterUrl || "/placeholder.svg"}
              alt={movie.title}
              className="w-64 h-96 object-cover rounded-lg shadow-xl"
            />

            <div className="flex-1 space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-white">{movie.title}</h1>

              <div className="flex flex-wrap items-center gap-4 text-gray-300">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(movie.release_date).getFullYear()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{movie.runtime} min</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                  <span>
                    {movie.vote_average.toFixed(1)} ({movie.vote_count.toLocaleString()} votes)
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span key={genre.id} className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">
                    {genre.name}
                  </span>
                ))}
              </div>

              <p className="text-gray-300 text-lg leading-relaxed max-w-3xl">{movie.overview}</p>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleFavoriteToggle}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                    isFavorite
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : "bg-gray-700 hover:bg-red-600 text-gray-300 hover:text-white"
                  }`}
                >
                  <Heart className="w-5 h-5" fill={isFavorite ? "currentColor" : "none"} />
                  {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                </button>

                <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                  <Plus className="w-5 h-5" />
                  Add to Watchlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cast Section */}
      {movie.credits?.cast && movie.credits.cast.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Cast</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {movie.credits.cast.slice(0, 12).map((actor) => (
              <div key={actor.id} className="text-center">
                <img
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                      : "/placeholder.svg?height=278&width=185"
                  }
                  alt={actor.name}
                  className="w-full h-48 object-cover rounded-lg mb-2"
                />
                <h3 className="font-medium text-sm">{actor.name}</h3>
                <p className="text-gray-400 text-xs">{actor.character}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default MovieDetails
