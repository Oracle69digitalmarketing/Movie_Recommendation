"use client"

import type React from "react"
import { createContext, useContext, useState, type ReactNode } from "react"

interface AuthContextProps {
  user: any | null // Replace 'any' with your user type
  login: (userData: any) => void // Replace 'any' with your user type
  logout: () => void
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null) // Replace 'any' with your user type

  const login = (userData: any) => {
    // Implement your login logic here (e.g., store user data in local storage)
    setUser(userData)
  }

  const logout = () => {
    // Implement your logout logic here (e.g., remove user data from local storage)
    setUser(null)
  }

  const value: AuthContextProps = {
    user,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export { AuthProvider, useAuth }
