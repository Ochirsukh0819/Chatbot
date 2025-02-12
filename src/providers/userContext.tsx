"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { getUser, logoutUser } from "@/server/api/auth/actions/auth.actions"
import { User } from "@/server/api/auth/types/auth.types"

type UserContextType = {
  user: User | null
  loadUser: () => Promise<void>
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  logout: () => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const loadUserFromCookies = async () => {
      const existingUser = await getUser()
      if (existingUser) {
        setUser(existingUser)
      }
    }
    loadUserFromCookies()
    return () => setUser(null)
  }, [])

  const loadUser = async () => {
    const existingUser = await getUser()
    if (existingUser) {
      setUser(existingUser)
    }
  }

  const logout = async () => {
    await logoutUser()
    setUser(null)
  }

  return <UserContext.Provider value={{ user, loadUser, setUser, logout }}>{children}</UserContext.Provider>
}

export const useUser = (): UserContextType => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
