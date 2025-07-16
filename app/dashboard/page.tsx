"use client"

import { CardContent } from "@/components/ui/card"

import { Card } from "@/components/ui/card"

import { UserDashboard } from "@/components/analytics/user-dashboard"
import { AIMovieRecommendations } from "@/components/ai/movie-recommendations"
import { SocialFeed } from "@/components/social/social-feed"
import { useAuth } from "@/contexts/auth-context"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const [aiRecommendations, setAiRecommendations] = useState<string[]>([])

  // Mock data for demonstration
  const mockDashboardData = {
    totalMoviesWatched: 150,
    totalHoursWatched: 300.5,
    favoriteGenre: "Action",
    friendsWatchedTogether: 25,
    genreDistribution: [
      { name: "Action", value: 40 },
      { name: "Comedy", value: 30 },
      { name: "Drama", value: 20 },
      { name: "Sci-Fi", value: 10 },
    ],
    viewingActivity: [
      { name: "Jan", movies: 10 },
      { name: "Feb", movies: 12 },
      { name: "Mar", movies: 8 },
      { name: "Apr", movies: 15 },
      { name: "May", movies: 11 },
      { name: "Jun", movies: 13 },
    ],
    achievements: ["First 100 Movies", "Action Enthusiast", "Social Butterfly (5+ shared movies)"],
  }

  const mockSocialActivities = [
    {
      id: "1",
      type: "watched",
      user: { id: "user-2", username: "JaneDoe", avatarUrl: "/placeholder-user.jpg" },
      movie: { id: "movie-1", title: "The Matrix", poster_path: "/f89U3ADr1rbDPWK0H3Twk8aKud.jpg" },
      timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    },
    {
      id: "2",
      type: "rated",
      user: { id: "user-3", username: "MovieFanatic" },
      movie: { id: "movie-2", title: "Inception", poster_path: "/oYuEqlaYKfF7fNf0yXJp3jXgX0.jpg" },
      rating: 9,
      timestamp: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
    },
    {
      id: "3",
      type: "commented",
      user: { id: "user-1", username: "mockuser" },
      movie: { id: "movie-3", title: "Pulp Fiction", poster_path: "/d5iIlFn5s0ImszBPY82aA5EoZZD.jpg" },
      comment: "Still a classic! Love the dialogues.",
      timestamp: new Date(Date.now() - 10800000).toISOString(), // 3 hours ago
    },
    {
      id: "4",
      type: "favorited",
      user: { id: "user-4", username: "FilmBuff" },
      movie: { id: "movie-4", title: "Spirited Away", poster_path: "/39WmC1g9kmf5f0Jb000000000000000.jpg" },
      timestamp: new Date(Date.now() - 14400000).toISOString(), // 4 hours ago
    },
  ]

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast.error("Authentication Required", {
        description: "Please log in to view your dashboard.",
      })
      // router.push('/login'); // Uncomment if you want to redirect unauthenticated users
    }
  }, [isAuthenticated, isLoading])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading dashboard...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p className="text-muted-foreground">You need to be logged in to view this page.</p>
        {/* <Button onClick={() => router.push('/login')} className="mt-4">Go to Login</Button> */}
      </div>
    )
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <h1 className="text-3xl font-bold">Welcome, {user?.username || "User"}!</h1>
      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        <UserDashboard {...mockDashboardData} />
        <AIMovieRecommendations userId={user?.id || "guest"} onRecommend={setAiRecommendations} />
        <SocialFeed activities={mockSocialActivities} />
      </div>
      {aiRecommendations.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Your Latest AI Recommendations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {aiRecommendations.map((title, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <h3 className="font-semibold">{title}</h3>
                  <p className="text-sm text-muted-foreground">AI Pick</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </main>
  )
}
