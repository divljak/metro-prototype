"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Lock } from "lucide-react"

const SITE_PASSWORD = "metro"
const STORAGE_KEY = "prototype-auth"

export function PasswordGate({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) === "true") {
      setAuthenticated(true)
    }
    setChecking(false)
  }, [])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (password === SITE_PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, "true")
      setAuthenticated(true)
      setError(false)
    } else {
      setError(true)
    }
  }

  if (checking) return null

  if (authenticated) return <>{children}</>

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="flex flex-col items-center space-y-3">
          <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-2xl">M</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Metro Bank</h1>
          <p className="text-sm text-muted-foreground text-center">
            This prototype is password protected.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError(false)
              }}
              className={`pl-10 ${error ? "border-red-500 focus-visible:ring-red-500" : ""}`}
              autoFocus
            />
          </div>
          {error && (
            <p className="text-sm text-red-500">Incorrect password. Please try again.</p>
          )}
          <Button type="submit" className="w-full">
            Enter
          </Button>
        </form>
      </div>
    </div>
  )
}
