"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { HelpCircle, Lightbulb, RefreshCw } from "lucide-react"
import { AIService } from "@/lib/ai-service"

interface MovieTriviaProps {
  movieTitle: string
}

interface TriviaItem {
  question: string
  answer: string
}

export default function MovieTrivia({ movieTitle }: MovieTriviaProps) {
  const [trivia, setTrivia] = useState<TriviaItem[]>([])
  const [loading, setLoading] = useState(false)
  const [showAnswers, setShowAnswers] = useState<boolean[]>([])

  const generateTrivia = async () => {
    setLoading(true)
    try {
      const triviaData = await AIService.generateMovieTrivia(movieTitle)
      setTrivia(triviaData)
      setShowAnswers(new Array(triviaData.length).fill(false))
    } catch (error) {
      console.error("Failed to generate trivia:", error)
    } finally {
      setLoading(false)
    }
  }

  const toggleAnswer = (index: number) => {
    const newShowAnswers = [...showAnswers]
    newShowAnswers[index] = !newShowAnswers[index]
    setShowAnswers(newShowAnswers)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-blue-500" />
          Movie Trivia
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={generateTrivia} disabled={loading} className="w-full">
          {loading ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Lightbulb className="w-4 h-4 mr-2" />}
          {loading ? "Generating Trivia..." : "Generate Trivia"}
        </Button>

        {trivia.length > 0 && (
          <div className="space-y-4">
            {trivia.map((item, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-medium pr-4">{item.question}</h4>
                  <Badge variant="outline">#{index + 1}</Badge>
                </div>

                <Button variant="outline" size="sm" onClick={() => toggleAnswer(index)} className="mb-3">
                  {showAnswers[index] ? "Hide Answer" : "Show Answer"}
                </Button>

                {showAnswers[index] && (
                  <div className="p-3 bg-muted rounded-md">
                    <p className="text-sm">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {trivia.length === 0 && !loading && (
          <div className="text-center py-6">
            <p className="text-muted-foreground">
              Click the button above to generate interesting trivia about "{movieTitle}"!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
