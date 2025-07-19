"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"
import axios from "axios"

interface User {
  id: number
  email: string
  username?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  fetchUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchUser = async () => {
    const token = localStorage.getItem("token")
    if (!token) {
      setUser(null)
      setLoading(false)
      return
    }
    try {
      const res = await axios.get("http://localhost:8000/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      setUser(res.data)
    } catch {
      setUser(null)
      localStorage.removeItem("token")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      const res = await axios.post("http://localhost:8000/auth/login", { email, password })
      localStorage.setItem("token", res.data.access_token)
      await fetchUser()
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, fetchUser }}>
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
