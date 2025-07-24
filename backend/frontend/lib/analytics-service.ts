export interface UserAnalytics {
  totalMoviesWatched: number
  favoriteGenres: { genre: string; count: number }[]
  watchingStreak: number
  averageRating: number
  monthlyStats: { month: string; watched: number }[]
  topActors: { name: string; movies: number }[]
  topDirectors: { name: string; movies: number }[]
}

export class AnalyticsService {
  static async getUserAnalytics(userId: string): Promise<UserAnalytics> {
    // Mock analytics - integrate with your backend
    return {
      totalMoviesWatched: 127,
      favoriteGenres: [
        { genre: "Action", count: 45 },
        { genre: "Drama", count: 32 },
        { genre: "Comedy", count: 28 },
        { genre: "Thriller", count: 22 },
      ],
      watchingStreak: 15,
      averageRating: 7.8,
      monthlyStats: [
        { month: "Jan", watched: 12 },
        { month: "Feb", watched: 8 },
        { month: "Mar", watched: 15 },
        { month: "Apr", watched: 10 },
      ],
      topActors: [
        { name: "Ryan Gosling", movies: 8 },
        { name: "Margot Robbie", movies: 6 },
      ],
      topDirectors: [
        { name: "Christopher Nolan", movies: 5 },
        { name: "Denis Villeneuve", movies: 4 },
      ],
    }
  }

  static trackUserAction(action: string, data: any) {
    // Track user interactions for analytics
    console.log("Analytics:", action, data)
  }
}
