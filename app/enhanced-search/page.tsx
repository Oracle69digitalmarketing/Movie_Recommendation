"use client"

import { useState } from "react"
import SmartSearch from "@/components/features/smart-search"
import VoiceSearch from "@/components/features/voice-search"
import MovieCard from "@/components/MovieCard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function EnhancedSearchPage() {
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async (params: any) => {
    setLoading(true)
    try {
      // Implement enhanced search logic here
      console.log("Search params:", params)
      // Mock results for now
      setSearchResults([])
    } catch (error) {
      console.error("Search failed:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Enhanced Movie Search</h1>
        <p className="text-muted-foreground">
          Use AI-powered search and voice commands to find exactly what you're looking for
        </p>
      </div>

      <Tabs defaultValue="smart" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="smart">Smart Search</TabsTrigger>
          <TabsTrigger value="voice">Voice Search</TabsTrigger>
        </TabsList>

        <TabsContent value="smart" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AI-Powered Search</CardTitle>
            </CardHeader>
            <CardContent>
              <SmartSearch onSearch={handleSearch} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="voice" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Voice Search</CardTitle>
            </CardHeader>
            <CardContent>
              <VoiceSearch onSearch={(query) => handleSearch({ keywords: query })} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {loading && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}

      {searchResults.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {searchResults.map((movie: any) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  )
}
