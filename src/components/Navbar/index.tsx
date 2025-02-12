"use client"
import { LoginModal } from "@/components/LoginModal"
import { RegisterModal } from "@/components/RegisterModal"
import { Button } from "@/components/ui/Button/button"
import { useUser } from "@/providers/userContext"
import React from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { LogOut } from "lucide-react"

function Navbar() {
  const { user, logout } = useUser()
  return (
    <header className="flex w-full items-center justify-between p-4">
      <Button className="text-lg">My project</Button>

      {/* If user is logged in */}
      {user !== null ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="cursor-pointer text-snow">Hi, {user.username}</div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-10">
            <DropdownMenuItem>
              <Button onClick={logout} className="flex cursor-pointer items-center gap-2">
                <p>Log out </p>
                <LogOut className="size-4" />
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        // Show login and register modal if user is not logged in
        <div className="flex items-center gap-3">
          <LoginModal />
          <RegisterModal />
        </div>
      )}
    </header>
  )
}

export default Navbar
