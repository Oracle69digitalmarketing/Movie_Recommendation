"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Plus, List } from "lucide-react"
import { userAPI } from "../services/api"
import toast from "react-hot-toast"

interface Watchlist {
  _id: string
  name: string
  movies: any[]
  createdAt: string
}

const Watchlists: React.FC = () => {
  const [watchlists, setWatchlists] = useState<Watchlist[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newWatchlistName, setNewWatchlistName] = useState("")

  useEffect(() => {
    loadWatchlists()
  }, [])

  const loadWatchlists = async () => {
    setLoading(true)
    try {
      const watchlistsData = await userAPI.getWatchlists()
      setWatchlists(watchlistsData)
    } catch (error) {
      toast.error("Failed to load watchlists")
    } finally {
      setLoading(false)
    }
  }

  const handleCreateWatchlist = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newWatchlistName.trim()) return

    try {
      await userAPI.createWatchlist(newWatchlistName)
      toast.success("Watchlist created successfully")
      setNewWatchlistName("")
      setShowCreateForm(false)
      loadWatchlists()
    } catch (error) {
      toast.error("Failed to create watchlist")
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">My Watchlists</h1>
          <p className="text-gray-400 text-lg mt-2">
            {watchlists.length} watchlist{watchlists.length !== 1 ? "s" : ""}
          </p>
        </div>

        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Create Watchlist
        </button>
      </div>

      {/* Create Watchlist Form */}
      {showCreateForm && (
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Create New Watchlist</h3>
          <form onSubmit={handleCreateWatchlist} className="flex gap-4">
            <input
              type="text"
              value={newWatchlistName}
              onChange={(e) => setNewWatchlistName(e.target.value)}
              placeholder="Watchlist name..."
              className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              autoFocus
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors"
            >
              Create
            </button>
            <button
              type="button"
              onClick={() => {
                setShowCreateForm(false)
                setNewWatchlistName("")
              }}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-md transition-colors"
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* Watchlists Grid */}
      {watchlists.length === 0 ? (
        <div className="text-center py-12">
          <List className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 text-lg mb-4">No watchlists yet.</p>
          <p className="text-gray-500">Create your first watchlist to organize your movies!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {watchlists.map((watchlist) => (
            <div key={watchlist._id} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <List className="w-5 h-5 text-blue-400" />
                <h3 className="text-xl font-semibold">{watchlist.name}</h3>
              </div>

              <div className="space-y-2">
                <p className="text-gray-400">
                  {watchlist.movies.length} movie{watchlist.movies.length !== 1 ? "s" : ""}
                </p>
                <p className="text-sm text-gray-500">Created {new Date(watchlist.createdAt).toLocaleDateString()}</p>
              </div>

              {watchlist.movies.length > 0 && (
                <div className="mt-4 flex -space-x-2">
                  {watchlist.movies.slice(0, 4).map((movie, index) => (
                    <img
                      key={movie.movieId}
                      src={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
                          : "/placeholder.svg?height=138&width=92"
                      }
                      alt={movie.title}
                      className="w-12 h-18 object-cover rounded border-2 border-gray-800"
                      style={{ zIndex: 4 - index }}
                    />
                  ))}
                  {watchlist.movies.length > 4 && (
                    <div className="w-12 h-18 bg-gray-700 rounded border-2 border-gray-800 flex items-center justify-center text-xs text-gray-300">
                      +{watchlist.movies.length - 4}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Watchlists
