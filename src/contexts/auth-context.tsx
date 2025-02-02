"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { authService } from "../services/auth-service"
import type { UserInfo } from "../types/auth"
import type React from "react"

interface AuthContextType {
  user: UserInfo | null
  isLoading: boolean
  setUser: (user: UserInfo | null) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserInfo | null>(null)
  const queryClient = useQueryClient()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token && window.location.pathname !== "/sign-in" && window.location.pathname !== "/sign-up") {
      window.location.href = "/sign-in"
    }
  }, [])

  const { data: userInfo, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: authService.getUserInfo,
    enabled: !!localStorage.getItem("token"),
    retry: false,
    onError: () => {
      localStorage.removeItem("token")
      setUser(null)
      if (window.location.pathname !== "/sign-in" && window.location.pathname !== "/sign-up") {
        window.location.href = "/sign-in"
      }
    },
    staleTime: 300000, 
    cacheTime: 3600000, 
  })

  useEffect(() => {
    if (userInfo) {
      setUser(userInfo)
    }
  }, [userInfo])

  const logout = () => {
    authService.logout()
    setUser(null)
    queryClient.clear()
  }

  return <AuthContext.Provider value={{ user, isLoading, setUser, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

