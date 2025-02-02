import type React from "react" 
import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../contexts/auth-context"

interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />
  }

  return children
}

