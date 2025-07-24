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
}

export const authAPI = new ApiService()
export const movieAPI = new ApiService()
export const userAPI = new ApiService()
