"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

interface SmartSearchProps {
  onSearch: (query: string, filters: SearchFilters) => void
  initialQuery?: string
  initialFilters?: SearchFilters
}

export interface SearchFilters {
  genre?: string
  year?: [number, number]
  rating?: [number, number]
  runtime?: [number, number] // in minutes
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

export function SmartSearch({ onSearch, initialQuery = "", initialFilters }: SmartSearchProps) {
  const [query, setQuery] = useState(initialQuery)
  const [filters, setFilters] = useState<SearchFilters>(
    initialFilters || {
      year: [1900, new Date().getFullYear()],
      rating: [0, 10],
      runtime: [0, 300],
    },
  )
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  useEffect(() => {
    setQuery(initialQuery)
    setFilters(
      initialFilters || {
        year: [1900, new Date().getFullYear()],
        rating: [0, 10],
        runtime: [0, 300],
      },
    )
  }, [initialQuery, initialFilters])

  const handleSearch = useCallback(() => {
    if (!query.trim()) {
      toast.warning("Search Input Empty", {
        description: "Please enter a search query before searching.",
      })
      return
    }
    onSearch(query, filters)
    setIsPopoverOpen(false) // Close popover after search
  }, [query, filters, onSearch])

  const handleClear = useCallback(() => {
    setQuery("")
    setFilters({
      year: [1900, new Date().getFullYear()],
      rating: [0, 10],
      runtime: [0, 300],
    })
    onSearch("", {
      // Trigger search with empty query and default filters
      year: [1900, new Date().getFullYear()],
      rating: [0, 10],
      runtime: [0, 300],
    })
    setIsPopoverOpen(false)
  }, [onSearch])

  const handleFilterChange = useCallback((key: keyof SearchFilters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }, [])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleSearch()
      }
    },
    [handleSearch],
  )

  return (
    <div className="flex w-full max-w-2xl items-center space-x-2">
      <Input
        type="text"
        placeholder="Search movies, genres, actors..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-grow"
        aria-label="Movie search input"
      />
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon" aria-label="Open filter options">
            <SlidersHorizontal className="h-5 w-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4 space-y-4">
          <h4 className="font-medium text-lg">Filters</h4>
          <div className="space-y-2">
            <Label htmlFor="genre-select">Genre</Label>
            <Select value={filters.genre || ""} onValueChange={(value) => handleFilterChange("genre", value)}>
              <SelectTrigger id="genre-select">
                <SelectValue placeholder="Select a genre" />
              </SelectTrigger>
              <SelectContent>
                {genres.map((genre) => (
                  <SelectItem key={genre} value={genre}>
                    {genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>
              Release Year: {filters.year?.[0]} - {filters.year?.[1]}
            </Label>
            <Slider
              min={1900}
              max={new Date().getFullYear()}
              step={1}
              value={filters.year}
              onValueChange={(value) => handleFilterChange("year", value)}
              range
              aria-label="Release year range slider"
            />
          </div>
          <div className="space-y-2">
            <Label>
              Rating: {filters.rating?.[0]} - {filters.rating?.[1]}
            </Label>
            <Slider
              min={0}
              max={10}
              step={0.1}
              value={filters.rating}
              onValueChange={(value) => handleFilterChange("rating", value)}
              range
              aria-label="Rating range slider"
            />
          </div>
          <div className="space-y-2">
            <Label>
              Runtime (min): {filters.runtime?.[0]} - {filters.runtime?.[1]}
            </Label>
            <Slider
              min={0}
              max={300}
              step={5}
              value={filters.runtime}
              onValueChange={(value) => handleFilterChange("runtime", value)}
              range
              aria-label="Runtime range slider"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleClear}>
              <X className="h-4 w-4 mr-2" /> Clear Filters
            </Button>
            <Button onClick={handleSearch}>
              <Search className="h-4 w-4 mr-2" /> Apply Search
            </Button>
          </div>
        </PopoverContent>
      </Popover>
      <Button onClick={handleSearch} aria-label="Perform search">
        <Search className="h-5 w-5" />
      </Button>
    </div>
  )
}
