"use client"

import type React from "react"
import type { Movie } from "../types"
import Image from "next/image"
import { HeartIcon, StarIcon } from "@heroicons/react/24/solid"

interface MovieCardProps {
  movie: Movie
  isFavorite?: boolean
  onFavoriteToggle?: (movie: Movie) => void
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, isFavorite = false, onFavoriteToggle }) => {
  const handleFavoriteClick = () => {
    if (onFavoriteToggle) {
      onFavoriteToggle(movie)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-56">
        <Image
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">{movie.title}</h2>
          {onFavoriteToggle && (
            <button onClick={handleFavoriteClick}>
              {isFavorite ? (
                <HeartIcon className="h-6 w-6 text-red-500" />
              ) : (
                <HeartIcon className="h-6 w-6 text-gray-400" />
              )}
            </button>
          )}
        </div>
        <div className="flex items-center mb-2">
          <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
          <span>{movie.vote_average}</span>
        </div>
        <p className="text-gray-700 text-sm">{movie.overview}</p>
      </div>
    </div>
  )
}

export default MovieCard
