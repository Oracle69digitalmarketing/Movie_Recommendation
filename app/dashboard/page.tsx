import UserDashboard from "@/components/analytics/user-dashboard"
import AIMovieRecommendations from "@/components/ai/movie-recommendations"
import SocialFeed from "@/components/social/social-feed"

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Your Movie Dashboard</h1>
        <p className="text-muted-foreground">
          Discover insights about your movie watching habits and get personalized recommendations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <UserDashboard />
        </div>

        <div className="space-y-6">
          <AIMovieRecommendations />
          <SocialFeed />
        </div>
      </div>
    </div>
  )
}
