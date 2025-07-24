import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export class AIService {
  // AI-powered movie recommendations
  static async getPersonalizedRecommendations(userPreferences: {
    favoriteGenres: string[]
    favoriteMovies: string[]
    watchHistory: string[]
    mood?: string
  }) {
    const prompt = `Based on user preferences:
    - Favorite genres: ${userPreferences.favoriteGenres.join(", ")}
    - Favorite movies: ${userPreferences.favoriteMovies.join(", ")}
    - Recent watches: ${userPreferences.watchHistory.join(", ")}
    - Current mood: ${userPreferences.mood || "any"}
    
    Recommend 10 movies with brief explanations why they'd enjoy each one.
    Format as JSON array with: title, reason, genre, year.`

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      temperature: 0.7,
    })

    try {
      return JSON.parse(text)
    } catch {
      return []
    }
  }

  // AI movie review analysis
  static async analyzeReview(reviewText: string) {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `Analyze this movie review and provide:
      1. Sentiment (positive/negative/neutral)
      2. Key themes mentioned
      3. Rating prediction (1-10)
      4. Summary in one sentence
      
      Review: "${reviewText}"
      
      Respond in JSON format.`,
    })

    try {
      return JSON.parse(text)
    } catch {
      return { sentiment: "neutral", themes: [], rating: 5, summary: "Unable to analyze" }
    }
  }

  // Smart search with natural language
  static async smartMovieSearch(query: string) {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `Convert this natural language movie search into structured search parameters:
      Query: "${query}"
      
      Extract:
      - genres (if mentioned)
      - year/decade (if mentioned)
      - actors (if mentioned)
      - director (if mentioned)
      - mood/theme (if mentioned)
      - keywords for title search
      
      Return as JSON object.`,
    })

    try {
      return JSON.parse(text)
    } catch {
      return { keywords: query }
    }
  }

  // Generate movie trivia
  static async generateMovieTrivia(movieTitle: string) {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `Generate 5 interesting trivia facts about the movie "${movieTitle}".
      Include behind-the-scenes facts, easter eggs, or production details.
      Format as JSON array with question and answer fields.`,
    })

    try {
      return JSON.parse(text)
    } catch {
      return []
    }
  }
}
