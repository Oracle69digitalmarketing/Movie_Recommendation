"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, RefreshCw } from "lucide-react"
import { AIService } from "@/lib/ai-service"
import { useAuth } from "@/contexts/auth-context"

interface AIRecommendation {
  title: string
  reason: string
  genre: string
  year: number
}

export default function AIMovieRecommendations() {
  const { user } = useAuth()
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([])
  const [loading, setLoading] = useState(false)
  const [mood, setMood] = useState<string>("")

  const moods = ["Happy", "Sad", "Excited", "Relaxed", "Adventurous", "Romantic", "Thoughtful"]

  const generateRecommendations = async () => {
    if (!user) return

    setLoading(true)
    try {
      // Mock user preferences - in production, fetch from backend
      const userPreferences = {
        favoriteGenres: ["Action", "Drama", "Sci-Fi"],
        favoriteMovies: ["Inception", "The Dark Knight", "Interstellar"],
        watchHistory: ["Dune", "Blade Runner 2049", "Arrival"],
        mood,
      }

      const aiRecommendations = await AIService.getPersonalizedRecommendations(userPreferences)
      setRecommendations(aiRecommendations)
    } catch (error) {
      console.error("Failed to generate recommendations:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      generateRecommendations()
    }
  }, [user, mood])

  if (!user) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">Login to get AI-powered movie recommendations</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-500" />
          AI Recommendations
        </CardTitle>
        <div className="flex flex-wrap gap-2">
          {moods.map((moodOption) => (
            <Badge
              key={moodOption}
              variant={mood === moodOption ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setMood(mood === moodOption ? "" : moodOption)}
            >
              {moodOption}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button onClick={generateRecommendations} disabled={loading} className="w-full">
            {loading ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
            {loading ? "Generating..." : "Get New Recommendations"}
          </Button>

          <div className="space-y-3">
            {recommendations.map((rec, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold">{rec.title}</h4>
                  <Badge variant="secondary">{rec.genre}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{rec.reason}</p>
                <p className="text-xs text-muted-foreground">Released: {rec.year}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
