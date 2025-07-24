"use client"

import type React from "react"
import { Link } from "react-router-dom"
import { Heart, Plus, Star } from "lucide-react"
import { useAuth } from "../contexts/AuthContext"
import { userAPI } from "../services/api"
import toast from "react-hot-toast"

interface Movie {
  id: number
  title: string
  poster_path: string
  release_date: string
  vote_average: number
  overview: string
}

interface MovieCardProps {
  movie: Movie
  isFavorite?: boolean
  onFavoriteToggle?: () => void
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, isFavorite = false, onFavoriteToggle }) => {
  const { user } = useAuth()
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/placeholder.svg?height=750&width=500"

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!user) {
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
      onFavoriteToggle?.()
    } catch (error) {
      toast.error("Failed to update favorites")
    }
  }

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
      <Link to={`/movie/${movie.id}`} className="block">
        <div className="relative">
          <img
            src={imageUrl || "/placeholder.svg"}
            alt={movie.title}
            className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300" />

          {/* Action buttons */}
          <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleFavoriteClick}
              className={`p-2 rounded-full ${
                isFavorite ? "bg-red-500 text-white" : "bg-black bg-opacity-50 text-white hover:bg-red-500"
              } transition-colors duration-200`}
            >
              <Heart className="w-4 h-4" fill={isFavorite ? "currentColor" : "none"} />
            </button>
            <button className="p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-blue-500 transition-colors duration-200">
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{movie.title}</h3>
          <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
            <span>{new Date(movie.release_date).getFullYear()}</span>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
              <span>{movie.vote_average.toFixed(1)}</span>
            </div>
          </div>
          <p className="text-sm text-gray-300 line-clamp-3">{movie.overview}</p>
        </div>
      </Link>
    </div>
  )
}

export default MovieCard
