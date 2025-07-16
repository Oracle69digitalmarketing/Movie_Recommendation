"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { TrendingUp, Award, Calendar, Star } from "lucide-react"
import { AnalyticsService, type UserAnalytics } from "@/lib/analytics-service"
import { useAuth } from "@/contexts/auth-context"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export default function UserDashboard() {
  const { user } = useAuth()
  const [analytics, setAnalytics] = useState<UserAnalytics | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadAnalytics = async () => {
      if (!user) return

      setLoading(true)
      try {
        const data = await AnalyticsService.getUserAnalytics(user.id)
        setAnalytics(data)
      } catch (error) {
        console.error("Failed to load analytics:", error)
      } finally {
        setLoading(false)
      }
    }

    loadAnalytics()
  }, [user])

  if (!user) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">Login to see your movie analytics</p>
        </CardContent>
      </Card>
    )
  }

  if (loading || !analytics) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse space-y-3">
                <div className="h-4 bg-muted rounded w-1/2"></div>
                <div className="h-8 bg-muted rounded w-3/4"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium">Movies Watched</span>
            </div>
            <p className="text-3xl font-bold mt-2">{analytics.totalMoviesWatched}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium">Watching Streak</span>
            </div>
            <p className="text-3xl font-bold mt-2">{analytics.watchingStreak} days</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="text-sm font-medium">Average Rating</span>
            </div>
            <p className="text-3xl font-bold mt-2">{analytics.averageRating}/10</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-500" />
              <span className="text-sm font-medium">This Month</span>
            </div>
            <p className="text-3xl font-bold mt-2">
              {analytics.monthlyStats[analytics.monthlyStats.length - 1]?.watched || 0}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Activity Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.monthlyStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="watched" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Genre Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Favorite Genres</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analytics.favoriteGenres}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ genre, count }) => `${genre}: ${count}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {analytics.favoriteGenres.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Actors */}
        <Card>
          <CardHeader>
            <CardTitle>Favorite Actors</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {analytics.topActors.map((actor, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="font-medium">{actor.name}</span>
                <Badge variant="secondary">{actor.movies} movies</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Top Directors */}
        <Card>
          <CardHeader>
            <CardTitle>Favorite Directors</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {analytics.topDirectors.map((director, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="font-medium">{director.name}</span>
                <Badge variant="secondary">{director.movies} movies</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
