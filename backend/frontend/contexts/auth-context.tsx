"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  username: string
  email: string
  token: string
}

interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Simulate checking for a stored token on mount
    const storedToken = typeof window !== "undefined" ? localStorage.getItem("jwt_token") : null
    if (storedToken) {
      // In a real app, you'd validate this token with your backend
      // For now, we'll just assume it's valid and set a mock user
      setUser({
        id: "mock-user-id",
        username: "mockuser",
        email: "mock@example.com",
        token: storedToken,
      })
    }
    setIsLoading(false)
  }, [])

  const login = useCallback(
    async (username, password) => {
      setIsLoading(true)
      setError(null)
      try {
        // Simulate API call for login
        await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate network delay

        if (username === "user" && password === "password") {
          const mockToken = "mock_jwt_token_12345"
          const loggedInUser: User = {
            id: "user-123",
            username: username,
            email: `${username}@example.com`,
            token: mockToken,
          }
          setUser(loggedInUser)
          if (typeof window !== "undefined") {
            localStorage.setItem("jwt_token", mockToken)
          }
          router.push("/dashboard") // Redirect to dashboard on successful login
        } else {
          throw new Error("Invalid username or password")
        }
      } catch (err: any) {
        setError(err.message || "Login failed")
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    },
    [router],
  )

  const logout = useCallback(() => {
    setUser(null)
    if (typeof window !== "undefined") {
      localStorage.removeItem("jwt_token")
    }
    router.push("/login") // Redirect to login page on logout
  }, [router])

  const isAuthenticated = !!user

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
