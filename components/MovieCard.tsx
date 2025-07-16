"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Plus, Star, Calendar, Clock, Eye, EyeOff, Share2, Info } from "lucide-react"

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

export default function MovieCard({
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

  return (
    <Card className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105">
      <div className="relative">
        <img
          src={movie.poster_path || "/placeholder.svg?height=400&width=300"}
          alt={movie.title}
          className="w-full h-64 sm:h-80 object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = "/placeholder.svg?height=400&width=300"
          }}
        />

        {/* Overlay with actions - appears on hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={handleFavoriteClick}
              className={isFavorite ? "text-red-500" : ""}
            >
              <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
            </Button>

            <Button
              size="sm"
              variant="secondary"
              onClick={handleWatchlistClick}
              className={isInWatchlist ? "text-blue-500" : ""}
            >
              <Plus className="h-4 w-4" />
            </Button>

            <Button
              size="sm"
              variant="secondary"
              onClick={handleWatchedClick}
              className={isWatched ? "text-green-500" : ""}
            >
              {isWatched ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </Button>

            <Button size="sm" variant="secondary" onClick={() => setShowRating(!showRating)}>
              <Star className={`h-4 w-4 ${userRating ? "fill-current text-yellow-500" : ""}`} />
            </Button>
          </div>
        </div>

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
      </div>

      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-sm line-clamp-2 min-h-[2.5rem]">{movie.title}</h3>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>{formatReleaseDate(movie.release_date)}</span>

            {movie.runtime && (
              <>
                <span>•</span>
                <Clock className="h-3 w-3" />
                <span>{movie.runtime}min</span>
              </>
            )}
          </div>

          {/* Genres */}
          {movie.genres && movie.genres.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {movie.genres.slice(0, 2).map((genre) => (
                <Badge key={genre} variant="outline" className="text-xs">
                  {genre}
                </Badge>
              ))}
              {movie.genres.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{movie.genres.length - 2}
                </Badge>
              )}
            </div>
          )}

          {/* User rating */}
          {userRating && (
            <div className="flex items-center gap-1">
              <span className="text-xs text-muted-foreground">Your rating:</span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-3 w-3 ${star <= userRating ? "fill-current text-yellow-500" : "text-gray-300"}`}
                  />
                ))}
              </div>
            </div>
          )}

          <p className="text-xs text-muted-foreground line-clamp-3">{movie.overview}</p>

          {/* Action buttons */}
          <div className="flex gap-1 pt-2">
            <Button size="sm" variant="outline" onClick={handleDetailsClick} className="flex-1 text-xs bg-transparent">
              <Info className="h-3 w-3 mr-1" />
              Details
            </Button>

            <Button size="sm" variant="outline" onClick={handleShareClick}>
              <Share2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
