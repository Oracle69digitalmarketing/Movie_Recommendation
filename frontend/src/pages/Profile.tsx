"use client"

import type React from "react"
import { User, Heart, List, Calendar } from "lucide-react"
import { useAuth } from "../contexts/AuthContext"

const Profile: React.FC = () => {
  const { user } = useAuth()

  if (!user) {
    return null
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Profile Header */}
      <div className="bg-gray-800 rounded-lg p-8">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center">
            <User className="w-12 h-12 text-white" />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold">{user.username}</h1>
            <p className="text-gray-400">{user.email}</p>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>Member since 2024</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-lg p-6 text-center">
          <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
          <h3 className="text-2xl font-bold">0</h3>
          <p className="text-gray-400">Favorite Movies</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 text-center">
          <List className="w-8 h-8 text-blue-500 mx-auto mb-2" />
          <h3 className="text-2xl font-bold">0</h3>
          <p className="text-gray-400">Watchlists</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 text-center">
          <User className="w-8 h-8 text-green-500 mx-auto mb-2" />
          <h3 className="text-2xl font-bold">0</h3>
          <p className="text-gray-400">Reviews</p>
        </div>
      </div>

      {/* Account Settings */}
      <div className="bg-gray-800 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6">Account Settings</h2>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
            <input
              type="text"
              value={user.username}
              disabled
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white opacity-50 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white opacity-50 cursor-not-allowed"
            />
          </div>

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors">
            Update Profile
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile
