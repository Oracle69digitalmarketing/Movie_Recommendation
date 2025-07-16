"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, X, Filter } from "lucide-react"

interface SearchFilters {
  keywords: string
  genre: string
  year: number[]
  rating: number[]
  runtime: number[]
  language: string
  sortBy: string
}

interface SmartSearchProps {
  onSearch: (filters: SearchFilters) => void
}

const genres = [
  { value: "28", label: "Action" },
  { value: "12", label: "Adventure" },
  { value: "16", label: "Animation" },
  { value: "35", label: "Comedy" },
  { value: "80", label: "Crime" },
  { value: "99", label: "Documentary" },
  { value: "18", label: "Drama" },
  { value: "10751", label: "Family" },
  { value: "14", label: "Fantasy" },
  { value: "36", label: "History" },
  { value: "27", label: "Horror" },
  { value: "10402", label: "Music" },
  { value: "9648", label: "Mystery" },
  { value: "10749", label: "Romance" },
  { value: "878", label: "Science Fiction" },
  { value: "10770", label: "TV Movie" },
  { value: "53", label: "Thriller" },
  { value: "10752", label: "War" },
  { value: "37", label: "Western" },
]

const languages = [
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "it", label: "Italian" },
  { value: "ja", label: "Japanese" },
  { value: "ko", label: "Korean" },
  { value: "zh", label: "Chinese" },
]

const sortOptions = [
  { value: "popularity.desc", label: "Most Popular" },
  { value: "vote_average.desc", label: "Highest Rated" },
  { value: "release_date.desc", label: "Newest First" },
  { value: "release_date.asc", label: "Oldest First" },
  { value: "title.asc", label: "A-Z" },
  { value: "title.desc", label: "Z-A" },
]

export default function SmartSearch({ onSearch }: SmartSearchProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    keywords: "",
    genre: "",
    year: [1990, 2024],
    rating: [0, 10],
    runtime: [60, 180],
    language: "",
    sortBy: "popularity.desc",
  })

  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const handleSearch = () => {
    onSearch(filters)
    updateActiveFilters()
  }

  const updateActiveFilters = () => {
    const active: string[] = []

    if (filters.keywords) active.push(`Keywords: ${filters.keywords}`)
    if (filters.genre) {
      const genreLabel = genres.find((g) => g.value === filters.genre)?.label
      if (genreLabel) active.push(`Genre: ${genreLabel}`)
    }
    if (filters.year[0] !== 1990 || filters.year[1] !== 2024) {
      active.push(`Year: ${filters.year[0]}-${filters.year[1]}`)
    }
    if (filters.rating[0] !== 0 || filters.rating[1] !== 10) {
      active.push(`Rating: ${filters.rating[0]}-${filters.rating[1]}`)
    }
    if (filters.runtime[0] !== 60 || filters.runtime[1] !== 180) {
      active.push(`Runtime: ${filters.runtime[0]}-${filters.runtime[1]} min`)
    }
    if (filters.language) {
      const langLabel = languages.find((l) => l.value === filters.language)?.label
      if (langLabel) active.push(`Language: ${langLabel}`)
    }

    setActiveFilters(active)
  }

  const clearFilter = (filterText: string) => {
    if (filterText.startsWith("Keywords:")) {
      setFilters((prev) => ({ ...prev, keywords: "" }))
    } else if (filterText.startsWith("Genre:")) {
      setFilters((prev) => ({ ...prev, genre: "" }))
    } else if (filterText.startsWith("Year:")) {
      setFilters((prev) => ({ ...prev, year: [1990, 2024] }))
    } else if (filterText.startsWith("Rating:")) {
      setFilters((prev) => ({ ...prev, rating: [0, 10] }))
    } else if (filterText.startsWith("Runtime:")) {
      setFilters((prev) => ({ ...prev, runtime: [60, 180] }))
    } else if (filterText.startsWith("Language:")) {
      setFilters((prev) => ({ ...prev, language: "" }))
    }

    setTimeout(updateActiveFilters, 0)
  }

  const clearAllFilters = () => {
    setFilters({
      keywords: "",
      genre: "",
      year: [1990, 2024],
      rating: [0, 10],
      runtime: [60, 180],
      language: "",
      sortBy: "popularity.desc",
    })
    setActiveFilters([])
  }

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="flex gap-2">
        <div className="flex-1">
          <Input
            placeholder="Search for movies, actors, directors..."
            value={filters.keywords}
            onChange={(e) => setFilters((prev) => ({ ...prev, keywords: e.target.value }))}
            className="w-full"
          />
        </div>
        <Button onClick={handleSearch} className="px-6">
          <Search className="w-4 h-4 mr-2" />
          Search
        </Button>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm font-medium">Active filters:</span>
          {activeFilters.map((filter, index) => (
            <Badge key={index} variant="secondary" className="cursor-pointer">
              {filter}
              <X className="w-3 h-3 ml-1" onClick={() => clearFilter(filter)} />
            </Badge>
          ))}
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            Clear all
          </Button>
        </div>
      )}

      {/* Advanced Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Advanced Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Genre */}
            <div className="space-y-2">
              <Label>Genre</Label>
              <Select
                value={filters.genre}
                onValueChange={(value) => setFilters((prev) => ({ ...prev, genre: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select genre" />
                </SelectTrigger>
                <SelectContent>
                  {genres.map((genre) => (
                    <SelectItem key={genre.value} value={genre.value}>
                      {genre.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Language */}
            <div className="space-y-2">
              <Label>Language</Label>
              <Select
                value={filters.language}
                onValueChange={(value) => setFilters((prev) => ({ ...prev, language: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
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

          {/* Year Range */}
          <div className="space-y-2">
            <Label>
              Release Year: {filters.year[0]} - {filters.year[1]}
            </Label>
            <Slider
              value={filters.year}
              onValueChange={(value) => setFilters((prev) => ({ ...prev, year: value }))}
              min={1900}
              max={2024}
              step={1}
              className="w-full"
            />
          </div>

          {/* Rating Range */}
          <div className="space-y-2">
            <Label>
              Rating: {filters.rating[0]} - {filters.rating[1]}
            </Label>
            <Slider
              value={filters.rating}
              onValueChange={(value) => setFilters((prev) => ({ ...prev, rating: value }))}
              min={0}
              max={10}
              step={0.1}
              className="w-full"
            />
          </div>

          {/* Runtime Range */}
          <div className="space-y-2">
            <Label>
              Runtime: {filters.runtime[0]} - {filters.runtime[1]} minutes
            </Label>
            <Slider
              value={filters.runtime}
              onValueChange={(value) => setFilters((prev) => ({ ...prev, runtime: value }))}
              min={30}
              max={300}
              step={5}
              className="w-full"
            />
          </div>

          {/* Sort By */}
          <div className="space-y-2">
            <Label>Sort By</Label>
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
        </CardContent>
      </Card>
    </div>
  )
}
