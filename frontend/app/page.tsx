"use client"; // This directive makes this a Client Component, allowing useState and useEffect

import { useEffect, useState } from 'react';
import axios from 'axios'; // Axios is already installed
import Link from 'next/link'; // For potential future navigation

interface Movie {
  _id: string;
  title: string;
  genre?: string;
  releaseYear?: number;
  // Add other movie properties as per your backend schema
}

export default function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Ensure this URL matches your backend's movie endpoint
        const response = await axios.get('http://localhost:5000/api/movies');
        setMovies(response.data);
      } catch (err) {
        console.error("Error fetching movies:", err);
        setError("Failed to load movies. Please ensure the backend server is running and accessible at http://localhost:5000/api/movies.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []); // Empty dependency array means this runs once on component mount

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-background text-foreground">
        <h1 className="text-3xl font-bold text-primary">Loading Movies...</h1>
        <p className="text-muted-foreground mt-4">Connecting to backend...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-background text-red-500">
        <h1 className="text-3xl font-bold">Error Loading Movies</h1>
        <p className="mt-4 text-center">{error}</p>
        <p className="mt-2 text-sm text-muted-foreground">Check your backend server console for issues.</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-background text-foreground">
      <h1 className="text-5xl font-extrabold mb-10 text-primary-foreground drop-shadow-lg">
        Enhanced Movie App
      </h1>

      <h2 className="text-3xl font-semibold mb-8 text-secondary-foreground">Featured Movies</h2>

      {movies.length === 0 ? (
        <div className="text-center p-8 border rounded-lg bg-card shadow-lg max-w-md w-full">
          <p className="text-xl text-muted-foreground">No movies found in the database.</p>
          <p className="text-sm text-accent-foreground mt-2">
            Make sure your backend database has some movie entries.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {movies.map((movie) => (
            <div key={movie._id} className="p-6 border border-border rounded-lg shadow-md bg-card text-card-foreground hover:shadow-lg transition-shadow duration-200 ease-in-out">
              <h3 className="text-2xl font-bold mb-2 text-primary">{movie.title}</h3>
              {movie.genre && <p className="text-md text-muted-foreground">Genre: {movie.genre}</p>}
              {movie.releaseYear && <p className="text-md text-muted-foreground">Released: {movie.releaseYear}</p>}
              {/* Add more movie details here as needed */}
              <div className="mt-4 text-right">
                <Link href={`/movie/${movie._id}`} className="text-sm font-medium text-accent hover:underline">
                  View Details &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* You can keep or remove the original features list here, or move it */}
      {/* Example of original content, styled with Tailwind */}
      <div className="mt-16 w-full max-w-4xl text-center">
        <h2 className="text-3xl font-semibold mb-6 text-primary-foreground">App Capabilities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <div className="p-6 border border-border rounded-lg bg-card shadow-md">
            <h3 className="text-xl font-bold text-accent mb-3">AI Features</h3>
            <ul className="list-disc list-inside text-foreground">
              <li>Smart movie recommendations</li>
              <li>Natural language search</li>
              <li>Review sentiment analysis</li>
              <li>Movie trivia generator</li>
              <li>Voice search support</li>
            </ul>
          </div>
          <div className="p-6 border border-border rounded-lg bg-card shadow-md">
            <h3 className="text-xl font-bold text-accent mb-3">Enhanced Features</h3>
            <ul className="list-disc list-inside text-foreground">
              <li>Streaming availability checker</li>
              <li>Social feed and sharing</li>
              <li>Advanced analytics dashboard</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

