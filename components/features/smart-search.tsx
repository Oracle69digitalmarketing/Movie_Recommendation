"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Sparkles, X } from "lucide-react"
import { AIService } from "@/lib/ai-service"

interface SmartSearchProps {
  onSearch: (params: any) => void
}

export default function SmartSearch({ onSearch }: SmartSearchProps) {
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [searchParams, setSearchParams] = useState<any>(null)

  const handleSmartSearch = async () => {
    if (!query.trim()) return

    setLoading(true)
    try {
      const params = await AIService.smartMovieSearch(query)
      setSearchParams(params)
      onSearch(params)
    } catch (error) {
      console.error("Smart search failed:", error)
      // Fallback to regular search
      onSearch({ keywords: query })
    } finally {
      setLoading(false)
    }
  }

  const clearSearch = () => {
    setQuery("")
    setSearchParams(null)
    onSearch({})
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Try: 'sci-fi movies from the 90s with time travel' or 'funny movies with Ryan Reynolds'"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSmartSearch()}
            className="pl-10"
          />
        </div>
        <Button onClick={handleSmartSearch} disabled={loading || !query.trim()}>
          {loading ? <Sparkles className="w-4 h-4 animate-pulse" /> : <Sparkles className="w-4 h-4" />}
        </Button>
        {searchParams && (
          <Button variant="outline" onClick={clearSearch}>
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {searchParams && (
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium">Search filters:</span>
              {searchParams.genres?.map((genre: string) => (
                <Badge key={genre} variant="secondary">
                  Genre: {genre}
                </Badge>
              ))}
              {searchParams.year && <Badge variant="secondary">Year: {searchParams.year}</Badge>}
              {searchParams.actors?.map((actor: string) => (
                <Badge key={actor} variant="secondary">
                  Actor: {actor}
                </Badge>
              ))}
              {searchParams.director && <Badge variant="secondary">Director: {searchParams.director}</Badge>}
              {searchParams.mood && <Badge variant="secondary">Mood: {searchParams.mood}</Badge>}
              {searchParams.keywords && <Badge variant="secondary">Keywords: {searchParams.keywords}</Badge>}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
