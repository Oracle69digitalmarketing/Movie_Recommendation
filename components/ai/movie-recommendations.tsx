"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useAuth } from "@/contexts/auth-context"
import { Sparkles, RefreshCw, Heart, Plus, Star } from "lucide-react"

interface Movie {
  id: number
  title: string
  poster_path: string
  overview: string
  vote_average: number
  release_date: string
  genre_ids: number[]
  reason?: string
}

const mockRecommendations: Movie[] = [
  {
    id: 1,
    title: "Inception",
    poster_path: "/placeholder.svg?height=300&width=200",
    overview:
      "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    vote_average: 8.8,
    release_date: "2010-07-16",
    genre_ids: [28, 878, 53],
    reason: "Based on your love for mind-bending sci-fi films",
  },
  {
    id: 2,
    title: "The Dark Knight",
    poster_path: "/placeholder.svg?height=300&width=200",
    overview:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.",
    vote_average: 9.0,
    release_date: "2008-07-18",
    genre_ids: [28, 80, 18],
    reason: "Perfect match for your action preferences",
  },
  {
    id: 3,
    title: "Interstellar",
    poster_path: "/placeholder.svg?height=300&width=200",
    overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    vote_average: 8.6,
    release_date: "2014-11-07",
    genre_ids: [18, 878],
    reason: "Recommended for fans of space epics",
  },
]

export default function AIMovieRecommendations() {
  const { user } = useAuth()
  const [recommendations, setRecommendations] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    if (user) {
      loadRecommendations()
    }
  }, [user])

  const loadRecommendations = async () => {
    setLoading(true)
    try {
      // Simulate AI recommendation API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setRecommendations(mockRecommendations)
    } catch (error) {
      console.error("Failed to load recommendations:", error)
    } finally {
      setLoading(false)
    }
  }

  const refreshRecommendations = async () => {
    setRefreshing(true)
    try {
      // Simulate refreshing recommendations
      await new Promise((resolve) => setTimeout(resolve, 1000))
      // Shuffle the mock data for variety
      const shuffled = [...mockRecommendations].sort(() => Math.random() - 0.5)
      setRecommendations(shuffled)
    } catch (error) {
      console.error("Failed to refresh recommendations:", error)
    } finally {
      setRefreshing(false)
    }
  }

  const addToWatchlist = (movieId: number) => {
    // Mock add to watchlist functionality
    console.log(`Added movie ${movieId} to watchlist`)
  }

  const addToFavorites = (movieId: number) => {
    // Mock add to favorites functionality
    console.log(`Added movie ${movieId} to favorites`)
  }

  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            AI Recommendations
          </CardTitle>
          <CardDescription>Get personalized movie suggestions</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">Please log in to get personalized recommendations</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              AI Recommendations
            </CardTitle>
            <CardDescription>Personalized picks just for you</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={refreshRecommendations} disabled={refreshing}>
            <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex space-x-4">
                <Skeleton className="h-24 w-16 rounded" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {recommendations.map((movie) => (
              <div key={movie.id} className="flex space-x-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <img
                  src={movie.poster_path || "/placeholder.svg"}
                  alt={movie.title}
                  className="w-16 h-24 object-cover rounded"
                />
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold">{movie.title}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{movie.vote_average}</span>
                        <span>•</span>
                        <span>{new Date(movie.release_date).getFullYear()}</span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" onClick={() => addToFavorites(movie.id)}>
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => addToWatchlist(movie.id)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{movie.overview}</p>
                  {movie.reason && (
                    <Badge variant="secondary" className="text-xs">
                      <Sparkles className="h-3 w-3 mr-1" />
                      {movie.reason}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
