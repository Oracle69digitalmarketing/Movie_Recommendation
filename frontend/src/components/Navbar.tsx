"use client"

import type React from "react"
import { Link, useNavigate } from "react-router-dom"
import { Film, Heart, List, User, LogOut } from "lucide-react"
import { useAuth } from "../contexts/AuthContext"

const Navbar: React.FC = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-white">
            <Film className="w-8 h-8 text-blue-500" />
            MovieApp
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-300 hover:text-white transition-colors">
              Home
            </Link>
            {user && (
              <>
                <Link
                  to="/favorites"
                  className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors"
                >
                  <Heart className="w-4 h-4" />
                  Favorites
                </Link>
                <Link
                  to="/watchlists"
                  className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors"
                >
                  <List className="w-4 h-4" />
                  Watchlists
                </Link>
              </>
            )}
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">{user.username}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-gray-300 hover:text-white transition-colors">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
