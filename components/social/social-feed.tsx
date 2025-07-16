"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Share2, Star } from "lucide-react"
import { SocialService, type SocialPost } from "@/lib/social-service"
import { useAuth } from "@/contexts/AuthContext"

export default function SocialFeed() {
  const { user } = useAuth()
  const [posts, setPosts] = useState<SocialPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadFeed = async () => {
      if (!user) return

      setLoading(true)
      try {
        const feedPosts = await SocialService.getUserFeed(user.id)
        setPosts(feedPosts)
      } catch (error) {
        console.error("Failed to load social feed:", error)
      } finally {
        setLoading(false)
      }
    }

    loadFeed()
  }, [user])

  const handleLike = (postId: string) => {
    setPosts(posts.map((post) => (post.id === postId ? { ...post, likes: post.likes + 1 } : post)))
  }

  const handleShare = async (post: SocialPost) => {
    const shareText = `Check out this movie review: ${post.content}`
    const shareUrl = await SocialService.shareToSocial("twitter", shareText)
    window.open(shareUrl, "_blank")
  }

  const getPostTypeIcon = (type: string) => {
    switch (type) {
      case "review":
        return "📝"
      case "recommendation":
        return "👍"
      case "watchlist":
        return "📋"
      case "rating":
        return "⭐"
      default:
        return "🎬"
    }
  }

  if (!user) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">Login to see your social feed</p>
        </CardContent>
      </Card>
    )
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-muted rounded-full"></div>
                  <div className="space-y-1">
                    <div className="h-4 bg-muted rounded w-24"></div>
                    <div className="h-3 bg-muted rounded w-16"></div>
                  </div>
                </div>
                <div className="h-16 bg-muted rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Social Feed</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="border-b pb-4 last:border-b-0">
            <div className="flex items-start gap-3">
              <Avatar>
                <AvatarImage src={post.avatar || "/placeholder.svg"} />
                <AvatarFallback>{post.username[0]}</AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{post.username}</span>
                  <Badge variant="outline" className="text-xs">
                    {getPostTypeIcon(post.type)} {post.type}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{post.timestamp.toLocaleDateString()}</span>
                </div>

                {post.movieTitle && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{post.movieTitle}</span>
                    {post.rating && (
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
                        <span className="text-sm">{post.rating}/10</span>
                      </div>
                    )}
                  </div>
                )}

                <p className="text-sm">{post.content}</p>

                <div className="flex items-center gap-4 pt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(post.id)}
                    className="text-muted-foreground hover:text-red-500"
                  >
                    <Heart className="w-4 h-4 mr-1" />
                    {post.likes}
                  </Button>

                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    {post.comments}
                  </Button>

                  <Button variant="ghost" size="sm" onClick={() => handleShare(post)} className="text-muted-foreground">
                    <Share2 className="w-4 h-4 mr-1" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {posts.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No posts in your feed yet.</p>
            <p className="text-sm text-muted-foreground mt-1">Follow other users to see their movie activities!</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
