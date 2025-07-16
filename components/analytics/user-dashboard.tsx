import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import { Trophy, Film, Clock, Users } from "lucide-react"

interface UserDashboardProps {
  totalMoviesWatched: number
  totalHoursWatched: number
  favoriteGenre: string
  friendsWatchedTogether: number
  genreDistribution: { name: string; value: number }[]
  viewingActivity: { name: string; movies: number }[]
  achievements: string[]
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"]

export function UserDashboard({
  totalMoviesWatched,
  totalHoursWatched,
  favoriteGenre,
  friendsWatchedTogether,
  genreDistribution,
  viewingActivity,
  achievements,
}: UserDashboardProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 p-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Movies Watched</CardTitle>
          <Film className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalMoviesWatched}</div>
          <p className="text-xs text-muted-foreground">Your cinematic journey so far</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Hours Watched</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalHoursWatched.toFixed(1)} hrs</div>
          <p className="text-xs text-muted-foreground">Time well spent on screen</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Favorite Genre</CardTitle>
          <Trophy className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{favoriteGenre || "N/A"}</div>
          <p className="text-xs text-muted-foreground">Your go-to movie category</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Friends Watched Together</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{friendsWatchedTogether}</div>
          <p className="text-xs text-muted-foreground">Shared movie experiences</p>
        </CardContent>
      </Card>

      <Card className="col-span-full lg:col-span-2">
        <CardHeader>
          <CardTitle>Genre Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={genreDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {genreDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="col-span-full lg:col-span-1">
        <CardHeader>
          <CardTitle>Viewing Activity (Last 6 Months)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={viewingActivity} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="movies" fill="#82ca9d" name="Movies Watched" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2">
            {achievements.length > 0 ? (
              achievements.map((achievement, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  {achievement}
                </li>
              ))
            ) : (
              <p className="text-muted-foreground">No achievements unlocked yet. Keep watching!</p>
            )}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
