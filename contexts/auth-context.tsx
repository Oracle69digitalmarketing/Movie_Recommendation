"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  username: string
  email: string
  avatar?: string
  preferences?: {
    favoriteGenres: string[]
    language: string
    region: string
  }
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (username: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  loading: boolean
  updateUser: (userData: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing token on mount
    const checkAuth = () => {
      try {
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
        if (token) {
          // Mock user data for now - replace with actual API call
          setUser({
            id: "1",
            username: "demo_user",
            email: "demo@example.com",
            preferences: {
              favoriteGenres: ["Action", "Sci-Fi"],
              language: "en",
              region: "US",
            },
          })
        }
      } catch (error) {
        console.error("Auth check failed:", error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true)
      // Mock login - replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockUser: User = {
        id: "1",
        username: email.split("@")[0],
        email,
        preferences: {
          favoriteGenres: ["Action", "Drama"],
          language: "en",
          region: "US",
        },
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("token", "mock-jwt-token")
      }
      setUser(mockUser)
      return true
    } catch (error) {
      console.error("Login failed:", error)
      return false
    } finally {
      setLoading(false)
    }
  }

  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true)
      // Mock registration - replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockUser: User = {
        id: "1",
        username,
        email,
        preferences: {
          favoriteGenres: [],
          language: "en",
          region: "US",
        },
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("token", "mock-jwt-token")
      }
      setUser(mockUser)
      return true
    } catch (error) {
      console.error("Registration failed:", error)
      return false
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token")
    }
    setUser(null)
  }

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData })
    }
  }

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    loading,
    updateUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
