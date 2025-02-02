"use client"

import type React from "react" 
import { createContext, useContext, useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { authService } from "../services/auth-service"
import type { UserInfo } from "../types/auth"

interface AuthContextType {
  user: UserInfo | null
  isLoading: boolean
  setUser: (user: UserInfo | null) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserInfo | null>(null)

  const { data: userInfo, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: authService.getUserInfo,
    enabled: !!localStorage.getItem("token"),
    retry: false,
  })

  useEffect(() => {
    if (userInfo) {
      setUser(userInfo)
    }
  }, [userInfo])

  return <AuthContext.Provider value={{ user, isLoading, setUser }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

