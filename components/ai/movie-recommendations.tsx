"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Sparkles } from "lucide-react"
import { toast } from "sonner"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

interface AIMovieRecommendationsProps {
  userId: string // For personalized recommendations
  onRecommend: (recommendations: string[]) => void
}

export function AIMovieRecommendations({ userId, onRecommend }: AIMovieRecommendationsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [prompt, setPrompt] = useState("")
  const [recommendations, setRecommendations] = useState<string[]>([])

  const fetchRecommendations = useCallback(
    async (userPrompt: string) => {
      setIsLoading(true)
      setRecommendations([])
      try {
        // In a real app, you'd send userId and prompt to your backend AI route
        // For now, simulate AI SDK call directly
        const fullPrompt = `As an expert movie recommender, suggest 5 movies based on the following user preference: "${userPrompt}". Provide only the movie titles, one per line.`

        const { text } = await generateText({
          model: openai("gpt-4o"), // Using gpt-4o as per instructions
          prompt: fullPrompt,
          temperature: 0.7,
        })

        const parsedRecommendations = text
          .split("\n")
          .map((line) => line.replace(/^\d+\.\s*/, "").trim()) // Remove numbering
          .filter((line) => line.length > 0)

        setRecommendations(parsedRecommendations)
        onRecommend(parsedRecommendations)
        toast.success("Recommendations Generated", {
          description: "AI has provided new movie suggestions!",
        })
      } catch (error) {
        console.error("Error fetching AI recommendations:", error)
        toast.error("Recommendation Error", {
          description: "Failed to fetch AI recommendations. Please try again.",
        })
        setRecommendations([])
      } finally {
        setIsLoading(false)
      }
    },
    [onRecommend],
  )

  const handleGenerateClick = () => {
    if (!prompt.trim()) {
      toast.warning("Empty Prompt", {
        description: "Please enter your preferences to get recommendations.",
      })
      return
    }
    fetchRecommendations(prompt)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-500" /> AI Movie Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Tell our AI what you're in the mood for, and get personalized movie suggestions.
        </p>
        <div className="flex gap-2">
          <Input
            placeholder="e.g., 'sci-fi movies with strong female leads' or 'feel-good comedies from the 80s'"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleGenerateClick()}
            disabled={isLoading}
            aria-label="AI recommendation prompt input"
          />
          <Button onClick={handleGenerateClick} disabled={isLoading}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            <span className="ml-2">Generate</span>
          </Button>
        </div>
        {recommendations.length > 0 && (
          <div className="mt-4">
            <h3 className="text-md font-semibold mb-2">Your AI Picks:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {recommendations.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </div>
        )}
        {isLoading && recommendations.length === 0 && (
          <div className="text-center text-muted-foreground">Generating recommendations...</div>
        )}
      </CardContent>
    </Card>
  )
}
