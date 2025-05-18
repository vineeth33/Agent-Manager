"use client"
import { useState } from "react"
import LoginForm from "@/components/LoginForm"
import Dashboard from "@/components/Dashboard"

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  const handleLoginSuccess = (userData) => {
    setUser(userData)
    setIsLoggedIn(true)
    // Store token in localStorage
    localStorage.setItem("token", userData.token)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUser(null)
    localStorage.removeItem("token")
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {!isLoggedIn ? (
        <div className="flex justify-center items-center min-h-screen">
          <LoginForm onLoginSuccess={handleLoginSuccess} />
        </div>
      ) : (
        <Dashboard user={user} onLogout={handleLogout} />
      )}
    </main>
  )
}
