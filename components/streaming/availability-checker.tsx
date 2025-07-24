"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Play } from "lucide-react"
import type { StreamingProvider } from "@/lib/streaming-service"
import { streamingAPI } from "@/services/api"

interface AvailabilityCheckerProps {
  movieId: number
  movieTitle: string
}

export default function AvailabilityChecker({ movieId, movieTitle }: AvailabilityCheckerProps) {
  const [providers, setProviders] = useState<StreamingProvider[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAvailability = async () => {
      setLoading(true)
      try {
        const response = await streamingAPI.getStreamingAvailability(movieId)
        setProviders(response.providers)
      } catch (error) {
        console.error("Failed to check availability:", error)
      } finally {
        setLoading(false)
      }
    }

    checkAvailability()
  }, [movieId])

  const availableProviders = providers.filter((p) => p.available)
  const unavailableProviders = providers.filter((p) => !p.available)

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-12 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Play className="w-5 h-5" />
          Where to Watch
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {availableProviders.length > 0 && (
          <div>
            <h4 className="font-medium mb-3 text-green-600">Available Now</h4>
            <div className="space-y-2">
              {availableProviders.map((provider, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <img
                      src={provider.logo || "/placeholder.svg"}
                      alt={provider.name}
                      className="w-8 h-8 rounded"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg?height=32&width=32"
                      }}
                    />
                    <div>
                      <p className="font-medium">{provider.name}</p>
                      <div className="flex gap-2">
                        <Badge variant="outline" className="text-xs">
                          {provider.price}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {provider.quality}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" asChild>
                    <a href={provider.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Watch
                    </a>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {unavailableProviders.length > 0 && (
          <div>
            <h4 className="font-medium mb-3 text-muted-foreground">Not Available</h4>
            <div className="grid grid-cols-2 gap-2">
              {unavailableProviders.map((provider, index) => (
                <div key={index} className="flex items-center gap-2 p-2 opacity-50">
                  <img
                    src={provider.logo || "/placeholder.svg"}
                    alt={provider.name}
                    className="w-6 h-6 rounded grayscale"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg?height=24&width=24"
                    }}
                  />
                  <span className="text-sm">{provider.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {availableProviders.length === 0 && (
          <div className="text-center py-6">
            <p className="text-muted-foreground">
              "{movieTitle}" is not currently available on major streaming platforms.
            </p>
            <p className="text-sm text-muted-foreground mt-2">Check back later or rent/buy from digital stores.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
