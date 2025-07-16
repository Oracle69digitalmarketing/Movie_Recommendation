"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useAuth } from "@/contexts/auth-context"
import { Calendar, Clock, Star, TrendingUp, Film, Award } from "lucide-react"

const genreData = [
  { name: "Action", count: 45, color: "#8884d8" },
  { name: "Drama", count: 32, color: "#82ca9d" },
  { name: "Comedy", count: 28, color: "#ffc658" },
  { name: "Sci-Fi", count: 24, color: "#ff7300" },
  { name: "Thriller", count: 18, color: "#00ff88" },
]

const monthlyData = [
  { month: "Jan", movies: 12, hours: 24 },
  { month: "Feb", movies: 15, hours: 30 },
  { month: "Mar", movies: 18, hours: 36 },
  { month: "Apr", movies: 22, hours: 44 },
  { month: "May", movies: 25, hours: 50 },
  { month: "Jun", movies: 20, hours: 40 },
]

const ratingData = [
  { rating: "5★", count: 25 },
  { rating: "4★", count: 45 },
  { rating: "3★", count: 30 },
  { rating: "2★", count: 15 },
  { rating: "1★", count: 5 },
]

export default function UserDashboard() {
  const { user } = useAuth()

  if (!user) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Please log in to view your dashboard</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Movies Watched</CardTitle>
            <Film className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">147</div>
            <p className="text-xs text-muted-foreground">+12 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Watch Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">294h</div>
            <p className="text-xs text-muted-foreground">+24h from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2</div>
            <p className="text-xs text-muted-foreground">+0.3 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Streak</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12 days</div>
            <p className="text-xs text-muted-foreground">Current streak</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="genres">Genres</TabsTrigger>
          <TabsTrigger value="ratings">Ratings</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Activity</CardTitle>
                <CardDescription>Movies watched and hours spent</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    movies: {
                      label: "Movies",
                      color: "hsl(var(--chart-1))",
                    },
                    hours: {
                      label: "Hours",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="movies" stroke="var(--color-movies)" strokeWidth={2} />
                      <Line type="monotone" dataKey="hours" stroke="var(--color-hours)" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Genres</CardTitle>
                <CardDescription>Your most watched genres</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    count: {
                      label: "Movies",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={genreData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                      >
                        {genreData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="genres" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Genre Breakdown</CardTitle>
              <CardDescription>Detailed view of your genre preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {genreData.map((genre) => (
                  <div key={genre.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: genre.color }} />
                      <span className="font-medium">{genre.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Progress value={(genre.count / 45) * 100} className="w-24" />
                      <span className="text-sm text-muted-foreground">{genre.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ratings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Rating Distribution</CardTitle>
              <CardDescription>How you rate the movies you watch</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  count: {
                    label: "Movies",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ratingData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="rating" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="count" fill="var(--color-count)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="text-center">
                <Award className="h-12 w-12 mx-auto text-yellow-500" />
                <CardTitle>Movie Buff</CardTitle>
                <CardDescription>Watched 100+ movies</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Badge variant="secondary">Unlocked</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Calendar className="h-12 w-12 mx-auto text-blue-500" />
                <CardTitle>Consistent Viewer</CardTitle>
                <CardDescription>10-day watching streak</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Badge variant="secondary">Unlocked</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Star className="h-12 w-12 mx-auto text-purple-500" />
                <CardTitle>Critic</CardTitle>
                <CardDescription>Rated 50+ movies</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Badge variant="secondary">Unlocked</Badge>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
