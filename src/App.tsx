"use client"

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { AuthProvider } from "./contexts/auth-context"
import ProtectedRoute from "./components/protected-route"
import SignIn from "./pages/sign-in"
import SignUp from "./pages/sign-up"

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route
              path="/companies/*"
              element={
                <ProtectedRoute>
                  <div>Companies Page</div>
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/companies" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  )
}

