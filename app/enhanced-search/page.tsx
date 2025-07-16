"use client"

import { useState } from "react"
import SmartSearch from "@/components/features/smart-search"
import VoiceSearch from "@/components/features/voice-search"
import MovieCard from "@/components/MovieCard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, Mic, Sparkles } from "lucide-react"

interface Movie {
  id: number
  title: string
  poster_path: string
  overview: string
  vote_average: number
  release_date: string
  genres: string[]
  runtime: number
}

const mockMovies: Movie[] = [
  {
    id: 1,
    title: "The Matrix",
    poster_path: "/placeholder.svg?height=400&width=300",
    overview:
      "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    vote_average: 8.7,
    release_date: "1999-03-31",
    genres: ["Action", "Sci-Fi"],
    runtime: 136,
  },
  {
    id: 2,
    title: "Inception",
    poster_path: "/placeholder.svg?height=400&width=300",
    overview:
      "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    vote_average: 8.8,
    release_date: "2010-07-16",
    genres: ["Action", "Sci-Fi", "Thriller"],
    runtime: 148,
  },
  {
    id: 3,
    title: "The Dark Knight",
    poster_path: "/placeholder.svg?height=400&width=300",
    overview:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.",
    vote_average: 9.0,
    release_date: "2008-07-18",
    genres: ["Action", "Crime", "Drama"],
    runtime: 152,
  },
]

export default function EnhancedSearchPage() {
  const [searchResults, setSearchResults] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("smart")

  const handleSearch = async (filters: any) => {
    setLoading(true)
    setSearchQuery(filters.query || "Advanced search")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSearchResults(mockMovies)
    } catch (error) {
      console.error("Search failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAISearch = async (query: string) => {
    setLoading(true)
    setSearchQuery(query)

    try {
      // Simulate AI-powered search
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setSearchResults(mockMovies)
    } catch (error) {
      console.error("AI search failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleVoiceResult = (transcript: string) => {
    handleAISearch(transcript)
  }

  const handleVoiceError = (error: string) => {
    console.error("Voice search error:", error)
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Enhanced Movie Search</h1>
        <p className="text-muted-foreground">
          Use AI-powered search, voice commands, or advanced filters to find your perfect movie
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="smart" className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            Smart Search
          </TabsTrigger>
          <TabsTrigger value="voice" className="flex items-center gap-2">
            <Mic className="h-4 w-4" />
            Voice Search
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Advanced
          </TabsTrigger>
        </TabsList>

        <TabsContent value="smart">
          <SmartSearch onSearch={handleSearch} onAISearch={handleAISearch} />
        </TabsContent>

        <TabsContent value="voice">
          <VoiceSearch onResult={handleVoiceResult} onError={handleVoiceError} />
        </TabsContent>

        <TabsContent value="advanced">
          <SmartSearch onSearch={handleSearch} />
        </TabsContent>
      </Tabs>

      {/* Search Results */}
      {(loading || searchResults.length > 0) && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Search Results</CardTitle>
                {searchQuery && <CardDescription>Results for: "{searchQuery}"</CardDescription>}
              </div>
              {!loading && searchResults.length > 0 && (
                <Badge variant="secondary">
                  {searchResults.length} movie{searchResults.length !== 1 ? "s" : ""} found
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="space-y-3">
                    <Skeleton className="h-64 w-full rounded" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {searchResults.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onAddToFavorites={(id) => console.log(`Added ${id} to favorites`)}
                    onAddToWatchlist={(id) => console.log(`Added ${id} to watchlist`)}
                    onMarkAsWatched={(id) => console.log(`Marked ${id} as watched`)}
                    onRate={(id, rating) => console.log(`Rated ${id} with ${rating} stars`)}
                    onShare={(id) => console.log(`Shared movie ${id}`)}
                    onViewDetails={(id) => console.log(`View details for ${id}`)}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
