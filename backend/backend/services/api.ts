const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api"

class ApiService {
  private getAuthHeaders() {
    const token = localStorage.getItem("token")
    return token ? { Authorization: `Bearer ${token}` } : {}
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`
    const config = {
      headers: {
        "Content-Type": "application/json",
        ...this.getAuthHeaders(),
        ...options.headers,
      },
      ...options,
    }

    const response = await fetch(url, config)
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong")
    }

    return data
  }

  // Auth endpoints
  async login(email: string, password: string) {
    return this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
  }

  async register(username: string, email: string, password: string) {
    return this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
    })
  }

  async getCurrentUser() {
    return this.request("/auth/me")
  }

  // Movie endpoints
  async searchMovies(query: string, page = 1) {
    return this.request(`/movies/search?query=${encodeURIComponent(query)}&page=${page}`)
  }

  async getPopularMovies(page = 1) {
    return this.request(`/movies/popular?page=${page}`)
  }

  async getMovieDetails(id: string) {
    return this.request(`/movies/${id}`)
  }

  async getGenres() {
    return this.request("/movies/genres/list")
  }

  // User endpoints
  async getFavorites() {
    return this.request("/users/favorites")
  }

  async addToFavorites(movie: any) {
    return this.request("/users/favorites", {
      method: "POST",
      body: JSON.stringify({
        movieId: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
      }),
    })
  }

  async removeFromFavorites(movieId: number) {
    return this.request(`/users/favorites/${movieId}`, {
      method: "DELETE",
    })
  }

  async getWatchlists() {
    return this.request("/users/watchlists")
  }

  async createWatchlist(name: string) {
    return this.request("/users/watchlists", {
      method: "POST",
      body: JSON.stringify({ name }),
    })
  }

  async addToWatchlist(watchlistId: string, movie: any) {
    return this.request(`/users/watchlists/${watchlistId}/movies`, {
      method: "POST",
      body: JSON.stringify({
        movieId: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
      }),
    })
  }

  // AI endpoints
  async getAIRecommendations(preferences: any) {
    return this.request("/ai/recommendations", {
      method: "POST",
      body: JSON.stringify(preferences),
    })
  }

  async smartSearch(query: string) {
    return this.request("/ai/smart-search", {
      method: "POST",
      body: JSON.stringify({ query }),
    })
  }

  async analyzeReview(reviewText: string, movieId: number) {
    return this.request("/ai/analyze-review", {
      method: "POST",
      body: JSON.stringify({ reviewText, movieId }),
    })
  }

  // Streaming endpoints
  async getStreamingAvailability(movieId: number) {
    return this.request(`/streaming/availability/${movieId}`)
  }

  async searchStreaming(query: string) {
    return this.request(`/streaming/search?query=${encodeURIComponent(query)}`)
  }

  // Social endpoints
  async getSocialFeed() {
    return this.request("/social/feed")
  }

  async createPost(postData: any) {
    return this.request("/social/post", {
      method: "POST",
      body: JSON.stringify(postData),
    })
  }

  async likePost(postId: string) {
    return this.request(`/social/like/${postId}`, {
      method: "POST",
    })
  }

  // Analytics endpoints
  async getAnalytics() {
    return this.request("/analytics/dashboard")
  }

  async trackActivity(action: string, data: any) {
    return this.request("/analytics/track", {
      method: "POST",
      body: JSON.stringify({ action, data }),
    })
  }

  async getInsights() {
    return this.request("/analytics/insights")
  }
}

export const authAPI = new ApiService()
export const movieAPI = new ApiService()
export const userAPI = new ApiService()
export const aiAPI = new ApiService()
export const streamingAPI = new ApiService()
export const socialAPI = new ApiService()
export const analyticsAPI = new ApiService()
