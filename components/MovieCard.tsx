"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Plus, Star, Eye } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

interface Movie {
  id: number
  title: string
  poster_path?: string
  release_date?: string
  vote_average?: number
  overview?: string
  genre_ids?: number[]
}

interface MovieCardProps {
  movie: Movie
}

export default function MovieCard({ movie }: MovieCardProps) {
  const { user } = useAuth()
  const [isFavorite, setIsFavorite] = useState(false)
  const [isInWatchlist, setIsInWatchlist] = useState(false)
  const [isWatched, setIsWatched] = useState(false)

  const handleFavoriteToggle = async () => {
    if (!user) return

    try {
      const response = await fetch(`/api/users/${user.id}/favorites`, {
        method: isFavorite ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ movieId: movie.id }),
      })

      if (response.ok) {
        setIsFavorite(!isFavorite)
      }
    } catch (error) {
      console.error("Error toggling favorite:", error)
    }
  }

  const handleWatchlistToggle = async () => {
    if (!user) return

    try {
      const response = await fetch(`/api/users/${user.id}/watchlist`, {
        method: isInWatchlist ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ movieId: movie.id }),
      })

      if (response.ok) {
        setIsInWatchlist(!isInWatchlist)
      }
    } catch (error) {
      console.error("Error toggling watchlist:", error)
    }
  }

  const handleWatchedToggle = async () => {
    if (!user) return

    try {
      const response = await fetch(`/api/users/${user.id}/watched`, {
        method: isWatched ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ movieId: movie.id }),
      })

      if (response.ok) {
        setIsWatched(!isWatched)
      }
    } catch (error) {
      console.error("Error toggling watched:", error)
    }
  }

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/placeholder.svg?height=750&width=500"

  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A"
  const rating = movie.vote_average ? (movie.vote_average / 2).toFixed(1) : "N/A"

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105">
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={posterUrl || "/placeholder.svg"}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />

        {/* Overlay with actions */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex gap-2">
            {user && (
              <>
                <Button
                  size="sm"
                  variant={isFavorite ? "default" : "secondary"}
                  onClick={handleFavoriteToggle}
                  className="h-8 w-8 p-0"
                >
                  <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
                </Button>

                <Button
                  size="sm"
                  variant={isInWatchlist ? "default" : "secondary"}
                  onClick={handleWatchlistToggle}
                  className="h-8 w-8 p-0"
                >
                  <Plus className="h-4 w-4" />
                </Button>

                <Button
                  size="sm"
                  variant={isWatched ? "default" : "secondary"}
                  onClick={handleWatchedToggle}
                  className="h-8 w-8 p-0"
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Rating badge */}
        {movie.vote_average && movie.vote_average > 0 && (
          <Badge className="absolute top-2 right-2 bg-yellow-500 text-black">
            <Star className="w-3 h-3 mr-1 fill-current" />
            {rating}
          </Badge>
        )}
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-sm mb-1 line-clamp-2 min-h-[2.5rem]">{movie.title}</h3>

        <p className="text-xs text-muted-foreground mb-2">{releaseYear}</p>

        {movie.overview && <p className="text-xs text-muted-foreground line-clamp-3">{movie.overview}</p>}
      </CardContent>
    </Card>
  )
}
