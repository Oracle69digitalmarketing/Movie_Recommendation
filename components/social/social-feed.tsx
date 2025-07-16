"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { useAuth } from "@/contexts/auth-context"
import { Heart, MessageCircle, Share2, Star, Clock, Users } from "lucide-react"

interface SocialActivity {
  id: string
  user: {
    id: string
    username: string
    avatar: string
  }
  type: "watched" | "rated" | "reviewed" | "added_to_watchlist"
  movie: {
    id: number
    title: string
    poster_path: string
    year: number
  }
  rating?: number
  review?: string
  timestamp: string
  likes: number
  comments: number
  isLiked: boolean
}

const mockActivities: SocialActivity[] = [
  {
    id: "1",
    user: {
      id: "2",
      username: "moviebuff_sarah",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    type: "rated",
    movie: {
      id: 550,
      title: "Fight Club",
      poster_path: "/placeholder.svg?height=60&width=40",
      year: 1999,
    },
    rating: 5,
    review: "Absolutely mind-blowing! The plot twist at the end completely changed my perspective on the entire film.",
    timestamp: "2 hours ago",
    likes: 12,
    comments: 3,
    isLiked: false,
  },
  {
    id: "2",
    user: {
      id: "3",
      username: "cinema_alex",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    type: "watched",
    movie: {
      id: 157336,
      title: "Interstellar",
      poster_path: "/placeholder.svg?height=60&width=40",
      year: 2014,
    },
    timestamp: "4 hours ago",
    likes: 8,
    comments: 1,
    isLiked: true,
  },
  {
    id: "3",
    user: {
      id: "4",
      username: "film_critic_mike",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    type: "added_to_watchlist",
    movie: {
      id: 27205,
      title: "Inception",
      poster_path: "/placeholder.svg?height=60&width=40",
      year: 2010,
    },
    timestamp: "6 hours ago",
    likes: 5,
    comments: 0,
    isLiked: false,
  },
]

export default function SocialFeed() {
  const { user } = useAuth()
  const [activities, setActivities] = useState<SocialActivity[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      loadSocialFeed()
    }
  }, [user])

  const loadSocialFeed = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setActivities(mockActivities)
    } catch (error) {
      console.error("Failed to load social feed:", error)
    } finally {
      setLoading(false)
    }
  }

  const toggleLike = (activityId: string) => {
    setActivities((prev) =>
      prev.map((activity) =>
        activity.id === activityId
          ? {
              ...activity,
              isLiked: !activity.isLiked,
              likes: activity.isLiked ? activity.likes - 1 : activity.likes + 1,
            }
          : activity,
      ),
    )
  }

  const getActivityIcon = (type: SocialActivity["type"]) => {
    switch (type) {
      case "watched":
        return <Clock className="h-4 w-4 text-green-500" />
      case "rated":
        return <Star className="h-4 w-4 text-yellow-500" />
      case "reviewed":
        return <MessageCircle className="h-4 w-4 text-blue-500" />
      case "added_to_watchlist":
        return <Users className="h-4 w-4 text-purple-500" />
      default:
        return null
    }
  }

  const getActivityText = (activity: SocialActivity) => {
    switch (activity.type) {
      case "watched":
        return "watched"
      case "rated":
        return `rated ${activity.rating}/5`
      case "reviewed":
        return "reviewed"
      case "added_to_watchlist":
        return "added to watchlist"
      default:
        return ""
    }
  }

  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Social Feed
          </CardTitle>
          <CardDescription>See what your friends are watching</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">Please log in to see your social feed</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Social Feed
        </CardTitle>
        <CardDescription>Recent activity from your network</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex space-x-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                  <div className="flex space-x-4">
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-8 w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.username} />
                  <AvatarFallback>{activity.user.username[0].toUpperCase()}</AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">{activity.user.username}</span>
                    {getActivityIcon(activity.type)}
                    <span className="text-sm text-muted-foreground">{getActivityText(activity)}</span>
                    <span className="font-semibold text-sm">{activity.movie.title}</span>
                    <span className="text-xs text-muted-foreground">({activity.movie.year})</span>
                  </div>

                  {activity.review && (
                    <p className="text-sm text-muted-foreground bg-muted p-2 rounded">"{activity.review}"</p>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleLike(activity.id)}
                        className={activity.isLiked ? "text-red-500" : ""}
                      >
                        <Heart className={`h-4 w-4 mr-1 ${activity.isLiked ? "fill-current" : ""}`} />
                        {activity.likes}
                      </Button>

                      <Button variant="ghost" size="sm">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        {activity.comments}
                      </Button>

                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                  </div>
                </div>

                <img
                  src={activity.movie.poster_path || "/placeholder.svg"}
                  alt={activity.movie.title}
                  className="w-10 h-15 object-cover rounded"
                />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
