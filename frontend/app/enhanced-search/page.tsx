"use client" // This should be at the very top of the file

import { useState, useCallback, useEffect } from "react" // Added useEffect
import type { SearchFilters } from "@/components/features/smart-search"

interface Movie {
  id: string
  title: string
  poster_path: string
  release_date: string
  vote_average: number
  overview: string
}

export default function EnhancedSearchPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentQuery, setCurrentQuery] = useState('');
  const [currentFilters, setCurrentFilters] = useState<SearchFilters>({});

  const fetchMovies = useCallback(async (query: string, filters: SearchFilters) => {
    setLoading(true);
    setError(null);
    setMovies([]); // Clear previous results
    try {
      // Simulate API call to TMDB or your backend
      // In a real app, you'd construct the URL with query and filters
      const mockMovies: Movie[] = [
        {
          id: '1',
          title: 'Dune: Part Two',
          // Corrected: Closed the string and added remaining required properties
          poster_path: '/czQnC0XpT48K3tpfS3smTmlRZNk.jpg',
          release_date: '2024-03-01',
          vote_average: 8.7,
          overview: 'Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.',
        },
        // Add more mock movies here if needed, following the Movie interface structure
        {
          id: '2',
          title: 'The Matrix',
          poster_path: '/f89U3ADr1rbDPWTPLXHqJ9syYUK.jpg',
          release_date: '1999-03-31',
          vote_average: 8.2,
          overview: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
        },
        {
          id: '3',
          title: 'Inception',
          poster_path: '/oYuEqgV1jJq8y3D0NgeN3N6GzW0.jpg',
          release_date: '2010-07-16',
          vote_average: 8.8,
          overview: 'A thief who steals corporate secrets through use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
        },
      ];
      setMovies(mockMovies); // Set the mock movies

    } catch (err) {
      console.error("Failed to fetch movies:", err);
      setError("Failed to load movies. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []); // Depend on nothing for static mock data. For real API calls, dependencies like 'query', 'filters' would be here.

  // Example: Fetch movies on initial component mount or when query/filters change
  useEffect(() => {
    fetchMovies(currentQuery, currentFilters);
  }, [fetchMovies, currentQuery, currentFilters]); // Added currentQuery and currentFilters as dependencies

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Enhanced Movie Search</h1>

      {/* Basic Search and Filter UI (Add your actual components here) */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={currentQuery}
          onChange={(e) => setCurrentQuery(e.target.value)}
          placeholder="Search for movies by title..."
          className="flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <button
          onClick={() => fetchMovies(currentQuery, currentFilters)}
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-center text-lg text-gray-700 dark:text-gray-300 mt-4">Loading movies...</p>}
      {error && <p className="text-center text-red-600 text-lg mt-4">{error}</p>}

      {!loading && !error && movies.length === 0 && currentQuery && (
        <p className="text-center text-gray-500 text-lg mt-4">No movies found for "{currentQuery}".</p>
      )}
      {!loading && !error && movies.length === 0 && !currentQuery && (
        <p className="text-center text-gray-500 text-lg mt-4">Start by searching for movies!</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {movies.map(movie => (
          <div key={movie.id} className="border border-gray-200 rounded-lg overflow-hidden shadow-md transition-shadow duration-300 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
            {movie.poster_path ? (
              // TMDB image base URL structure, ensure your API returns partial paths
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-64 object-cover" // Fixed height for consistent card appearance
              />
            ) : (
              <div className="w-full h-64 bg-gray-300 flex items-center justify-center text-gray-600 text-sm dark:bg-gray-700 dark:text-gray-400">
                No Image Available
              </div>
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white line-clamp-2">{movie.title}</h2>
              <p className="text-gray-600 text-sm dark:text-gray-400">Release: {movie.release_date}</p>
              <p className="text-gray-700 text-sm dark:text-gray-300">Rating: {movie.vote_average.toFixed(1)}/10</p>
              <p className="text-gray-800 text-sm mt-3 line-clamp-3 dark:text-gray-200">{movie.overview}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

