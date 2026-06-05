"use client"

import { signOut } from "next-auth/react"
import { User, LogOut, ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface AppHeaderProps {
  title: string
  userName?: string | null
  userEmail?: string | null
}

export function AppHeader({ title, userName, userEmail }: AppHeaderProps) {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <h1 className="text-xl font-semibold text-gray-900">{title}</h1>

      <DropdownMenu>
        <DropdownMenuTrigger className="inline-flex h-8 items-center justify-center gap-2 rounded-lg px-2.5 text-sm font-medium transition-colors hover:bg-muted focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50">
          <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-amber-600" />
          </div>
          <span className="text-sm text-gray-700">{userName || userEmail}</span>
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <div className="px-2 py-1.5">
            <p className="text-sm font-medium">{userName}</p>
            <p className="text-xs text-gray-500">{userEmail}</p>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="text-red-600 cursor-pointer"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
