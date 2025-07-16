"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Search, Filter, X, Sparkles } from "lucide-react"

interface SearchFilters {
  query: string
  genres: string[]
  yearRange: [number, number]
  ratingRange: [number, number]
  runtimeRange: [number, number]
  sortBy: string
  includeAdult: boolean
  language: string
}

const genres = [
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "History",
  "Horror",
  "Music",
  "Mystery",
  "Romance",
  "Science Fiction",
  "TV Movie",
  "Thriller",
  "War",
  "Western",
]

const sortOptions = [
  { value: "popularity.desc", label: "Most Popular" },
  { value: "vote_average.desc", label: "Highest Rated" },
  { value: "release_date.desc", label: "Newest First" },
  { value: "release_date.asc", label: "Oldest First" },
  { value: "title.asc", label: "A-Z" },
  { value: "title.desc", label: "Z-A" },
]

const languages = [
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "it", label: "Italian" },
  { value: "ja", label: "Japanese" },
  { value: "ko", label: "Korean" },
]

interface SmartSearchProps {
  onSearch: (filters: SearchFilters) => void
  onAISearch?: (query: string) => void
}

export default function SmartSearch({ onSearch, onAISearch }: SmartSearchProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    genres: [],
    yearRange: [1990, 2024],
    ratingRange: [0, 10],
    runtimeRange: [60, 180],
    sortBy: "popularity.desc",
    includeAdult: false,
    language: "en",
  })

  const [showAdvanced, setShowAdvanced] = useState(false)
  const [aiQuery, setAiQuery] = useState("")

  const handleGenreToggle = (genre: string) => {
    setFilters((prev) => ({
      ...prev,
      genres: prev.genres.includes(genre) ? prev.genres.filter((g) => g !== genre) : [...prev.genres, genre],
    }))
  }

  const handleSearch = () => {
    onSearch(filters)
  }

  const handleAISearch = () => {
    if (onAISearch && aiQuery.trim()) {
      onAISearch(aiQuery)
    }
  }

  const clearFilters = () => {
    setFilters({
      query: "",
      genres: [],
      yearRange: [1990, 2024],
      ratingRange: [0, 10],
      runtimeRange: [60, 180],
      sortBy: "popularity.desc",
      includeAdult: false,
      language: "en",
    })
  }

  const activeFiltersCount =
    (filters.query ? 1 : 0) +
    filters.genres.length +
    (filters.yearRange[0] !== 1990 || filters.yearRange[1] !== 2024 ? 1 : 0) +
    (filters.ratingRange[0] !== 0 || filters.ratingRange[1] !== 10 ? 1 : 0) +
    (filters.runtimeRange[0] !== 60 || filters.runtimeRange[1] !== 180 ? 1 : 0) +
    (filters.sortBy !== "popularity.desc" ? 1 : 0) +
    (filters.includeAdult ? 1 : 0) +
    (filters.language !== "en" ? 1 : 0)

  return (
    <div className="space-y-6">
      {/* AI-Powered Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            AI-Powered Search
          </CardTitle>
          <CardDescription>Describe what you're looking for in natural language</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="e.g., 'Show me recent sci-fi movies with good ratings' or 'Find comedies from the 90s'"
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAISearch()}
            />
            <Button onClick={handleAISearch} disabled={!aiQuery.trim()}>
              <Sparkles className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Traditional Search */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Advanced Search
              </CardTitle>
              <CardDescription>Use detailed filters to find exactly what you want</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              {activeFiltersCount > 0 && (
                <Badge variant="secondary">
                  {activeFiltersCount} filter{activeFiltersCount !== 1 ? "s" : ""} active
                </Badge>
              )}
              <Button variant="outline" size="sm" onClick={() => setShowAdvanced(!showAdvanced)}>
                <Filter className="h-4 w-4 mr-2" />
                {showAdvanced ? "Hide" : "Show"} Filters
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Search */}
          <div className="flex gap-2">
            <Input
              placeholder="Search movies by title, actor, director..."
              value={filters.query}
              onChange={(e) => setFilters((prev) => ({ ...prev, query: e.target.value }))}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
            <Button onClick={handleSearch}>
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>

          {/* Advanced Filters */}
          {showAdvanced && (
            <div className="space-y-6 pt-4 border-t">
              {/* Genres */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Genres</Label>
                <div className="flex flex-wrap gap-2">
                  {genres.map((genre) => (
                    <Badge
                      key={genre}
                      variant={filters.genres.includes(genre) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => handleGenreToggle(genre)}
                    >
                      {genre}
                      {filters.genres.includes(genre) && <X className="h-3 w-3 ml-1" />}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Year Range */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">
                  Release Year: {filters.yearRange[0]} - {filters.yearRange[1]}
                </Label>
                <Slider
                  value={filters.yearRange}
                  onValueChange={(value) => setFilters((prev) => ({ ...prev, yearRange: value as [number, number] }))}
                  min={1900}
                  max={2024}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Rating Range */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">
                  Rating: {filters.ratingRange[0]} - {filters.ratingRange[1]}
                </Label>
                <Slider
                  value={filters.ratingRange}
                  onValueChange={(value) => setFilters((prev) => ({ ...prev, ratingRange: value as [number, number] }))}
                  min={0}
                  max={10}
                  step={0.1}
                  className="w-full"
                />
              </div>

              {/* Runtime Range */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">
                  Runtime: {filters.runtimeRange[0]} - {filters.runtimeRange[1]} minutes
                </Label>
                <Slider
                  value={filters.runtimeRange}
                  onValueChange={(value) =>
                    setFilters((prev) => ({ ...prev, runtimeRange: value as [number, number] }))
                  }
                  min={30}
                  max={300}
                  step={5}
                  className="w-full"
                />
              </div>

              {/* Sort and Language */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Sort By</Label>
                  <Select
                    value={filters.sortBy}
                    onValueChange={(value) => setFilters((prev) => ({ ...prev, sortBy: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {sortOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Language</Label>
                  <Select
                    value={filters.language}
                    onValueChange={(value) => setFilters((prev) => ({ ...prev, language: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.value} value={lang.value}>
                          {lang.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Include Adult Content */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includeAdult"
                  checked={filters.includeAdult}
                  onCheckedChange={(checked) => setFilters((prev) => ({ ...prev, includeAdult: checked as boolean }))}
                />
                <Label htmlFor="includeAdult" className="text-sm">
                  Include adult content
                </Label>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4">
                <Button onClick={handleSearch} className="flex-1">
                  Apply Filters
                </Button>
                <Button variant="outline" onClick={clearFilters}>
                  Clear All
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
