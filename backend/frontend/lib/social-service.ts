export interface SocialPost {
  id: string
  userId: string
  username: string
  avatar: string
  content: string
  movieId?: number
  movieTitle?: string
  rating?: number
  likes: number
  comments: number
  timestamp: Date
  type: "review" | "recommendation" | "watchlist" | "rating"
}

export class SocialService {
  static async getUserFeed(userId: string): Promise<SocialPost[]> {
    // Mock social feed - integrate with your backend
    return [
      {
        id: "1",
        userId: "user1",
        username: "MovieBuff123",
        avatar: "/avatars/user1.jpg",
        content: "Just watched Dune: Part Two and it was absolutely incredible! The visuals were stunning.",
        movieId: 693134,
        movieTitle: "Dune: Part Two",
        rating: 9,
        likes: 24,
        comments: 8,
        timestamp: new Date(),
        type: "review",
      },
    ]
  }

  static async shareToSocial(platform: string, content: string, movieData?: any) {
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(content)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
      instagram: "#", // Instagram doesn't support direct sharing
      reddit: `https://reddit.com/submit?title=${encodeURIComponent(content)}`,
    }

    return shareUrls[platform as keyof typeof shareUrls]
  }
}
