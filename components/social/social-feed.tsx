import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Share2, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface Activity {
  id: string
  type: "watched" | "rated" | "favorited" | "commented"
  user: {
    id: string
    username: string
    avatarUrl?: string
  }
  movie?: {
    id: string
    title: string
    poster_path?: string
  }
  rating?: number
  comment?: string
  timestamp: string
}

interface SocialFeedProps {
  activities: Activity[]
}

export function SocialFeed({ activities }: SocialFeedProps) {
  const renderActivityContent = (activity: Activity) => {
    switch (activity.type) {
      case "watched":
        return (
          <>
            watched <span className="font-semibold">{activity.movie?.title}</span>
            {activity.movie?.poster_path && (
              <div className="mt-2 relative w-24 h-36 rounded-md overflow-hidden">
                <Image
                  src={`https://image.tmdb.org/t/p/w200${activity.movie.poster_path}`}
                  alt={activity.movie.title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            )}
          </>
        )
      case "rated":
        return (
          <>
            rated <span className="font-semibold">{activity.movie?.title}</span>{" "}
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /> {activity.rating}/10
            </span>
            {activity.movie?.poster_path && (
              <div className="mt-2 relative w-24 h-36 rounded-md overflow-hidden">
                <Image
                  src={`https://image.tmdb.org/t/p/w200${activity.movie.poster_path}`}
                  alt={activity.movie.title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            )}
          </>
        )
      case "favorited":
        return (
          <>
            favorited <span className="font-semibold">{activity.movie?.title}</span>
            {activity.movie?.poster_path && (
              <div className="mt-2 relative w-24 h-36 rounded-md overflow-hidden">
                <Image
                  src={`https://image.tmdb.org/t/p/w200${activity.movie.poster_path}`}
                  alt={activity.movie.title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            )}
          </>
        )
      case "commented":
        return (
          <>
            commented on <span className="font-semibold">{activity.movie?.title}</span>: "
            <span className="italic">{activity.comment}</span>"
            {activity.movie?.poster_path && (
              <div className="mt-2 relative w-24 h-36 rounded-md overflow-hidden">
                <Image
                  src={`https://image.tmdb.org/t/p/w200${activity.movie.poster_path}`}
                  alt={activity.movie.title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            )}
          </>
        )
      default:
        return null
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Social Feed</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {activities.length === 0 ? (
          <p className="text-muted-foreground text-center">
            No recent activity. Start watching movies or connect with friends!
          </p>
        ) : (
          activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-4 border-b pb-4 last:border-b-0 last:pb-0">
              <Avatar className="w-10 h-10">
                <AvatarImage src={activity.user.avatarUrl || "/placeholder-user.jpg"} alt={activity.user.username} />
                <AvatarFallback>{activity.user.username.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-semibold">{activity.user.username}</span> {renderActivityContent(activity)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{new Date(activity.timestamp).toLocaleString()}</p>
                <div className="flex gap-2 mt-3">
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <Heart className="w-4 h-4" /> Like
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" /> Comment
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <Share2 className="w-4 h-4" /> Share
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
