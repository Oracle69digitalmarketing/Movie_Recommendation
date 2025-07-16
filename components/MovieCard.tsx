"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Plus, Star, Eye, EyeOff, Share2 } from "lucide-react"
import Image from "next/image"

interface Movie {
  id: number
  title: string
  poster_path: string
  overview: string
  vote_average: number
  release_date: string
  genre_ids?: number[]
  genres?: string[]
  runtime?: number
  adult?: boolean
}

interface MovieCardProps {
  movie: Movie
  onAddToFavorites?: (movieId: number) => void
  onAddToWatchlist?: (movieId: number) => void
  onMarkAsWatched?: (movieId: number) => void
  onRate?: (movieId: number, rating: number) => void
  onShare?: (movieId: number) => void
  onViewDetails?: (movieId: number) => void
  isFavorite?: boolean
  isInWatchlist?: boolean
  isWatched?: boolean
  userRating?: number
}

export function MovieCard({
  // Changed to named export
  movie,
  onAddToFavorites,
  onAddToWatchlist,
  onMarkAsWatched,
  onRate,
  onShare,
  onViewDetails,
  isFavorite = false,
  isInWatchlist = false,
  isWatched = false,
  userRating,
}: MovieCardProps) {
  const [showRating, setShowRating] = useState(false)
  const [hoveredRating, setHoveredRating] = useState(0)

  const handleFavoriteClick = () => {
    if (onAddToFavorites) {
      onAddToFavorites(movie.id)
    }
  }

  const handleWatchlistClick = () => {
    if (onAddToWatchlist) {
      onAddToWatchlist(movie.id)
    }
  }

  const handleWatchedClick = () => {
    if (onMarkAsWatched) {
      onMarkAsWatched(movie.id)
    }
  }

  const handleRatingClick = (rating: number) => {
    if (onRate) {
      onRate(movie.id, rating)
      setShowRating(false)
    }
  }

  const handleShareClick = () => {
    if (onShare) {
      onShare(movie.id)
    }
  }

  const handleDetailsClick = () => {
    if (onViewDetails) {
      onViewDetails(movie.id)
    }
  }

  const formatReleaseDate = (dateString: string) => {
    return new Date(dateString).getFullYear()
  }

  const getRatingColor = (rating: number) => {
    if (rating >= 8) return "text-green-500"
    if (rating >= 6) return "text-yellow-500"
    return "text-red-500"
  }

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/placeholder.svg?width=200&height=300"

  return (
    <Card className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105 w-full max-w-xs">
      <CardHeader className="p-0">
        <div className="relative w-full h-64">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={movie.title}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg?width=200&height=300"
            }}
          />
          <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-sm px-2 py-1 rounded-md flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg font-bold truncate">{movie.title}</CardTitle>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {movie.release_date ? formatReleaseDate(movie.release_date) : "N/A"}
        </p>
        <p className="text-xs text-gray-600 dark:text-gray-300 mt-2 line-clamp-3">
          {movie.overview || "No overview available."}
        </p>
      </CardContent>
      <CardFooter className="flex justify-around p-4 border-t">
        <Button variant="ghost" size="icon" onClick={handleFavoriteClick} aria-label="Add to Favorites">
          <Heart className={`w-5 h-5 ${isFavorite ? "text-red-500" : "text-gray-500"}`} />
        </Button>
        <Button variant="ghost" size="icon" onClick={handleWatchlistClick} aria-label="Add to Watchlist">
          <Plus className={`w-5 h-5 ${isInWatchlist ? "text-blue-500" : "text-gray-500"}`} />
        </Button>
        <Button variant="ghost" size="icon" onClick={handleWatchedClick} aria-label="Mark as Watched">
          {isWatched ? <Eye className="w-5 h-5 text-green-500" /> : <EyeOff className="w-5 h-5 text-gray-500" />}
        </Button>
        <Button variant="ghost" size="icon" onClick={() => setShowRating(!showRating)} aria-label="Rate Movie">
          <Star className={`w-5 h-5 ${userRating ? "text-yellow-500" : "text-gray-500"}`} />
        </Button>
        <Button variant="ghost" size="icon" onClick={handleShareClick} aria-label="Share Movie">
          <Share2 className="w-5 h-5 text-green-500" />
        </Button>
      </CardFooter>

      {/* Rating overlay */}
      {showRating && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((rating) => (
              <Button
                key={rating}
                size="sm"
                variant="ghost"
                className="p-1"
                onMouseEnter={() => setHoveredRating(rating)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => handleRatingClick(rating)}
              >
                <Star
                  className={`h-6 w-6 ${
                    rating <= (hoveredRating || userRating || 0) ? "fill-current text-yellow-500" : "text-gray-400"
                  }`}
                />
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Top badges */}
      <div className="absolute top-2 left-2 flex flex-col gap-1">
        {movie.adult && (
          <Badge variant="destructive" className="text-xs">
            18+
          </Badge>
        )}
        {isWatched && (
          <Badge variant="secondary" className="text-xs">
            Watched
          </Badge>
        )}
      </div>

      {/* Rating badge */}
      <div className="absolute top-2 right-2">
        <Badge variant="secondary" className={`text-xs ${getRatingColor(movie.vote_average)}`}>
          <Star className="h-3 w-3 mr-1 fill-current" />
          {movie.vote_average.toFixed(1)}
        </Badge>
      </div>
    </Card>
  )
}
