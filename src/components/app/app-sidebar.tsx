"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sun, LayoutDashboard, FolderKanban, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/projects", label: "Projects", icon: FolderKanban },
  { href: "/settings", label: "Settings", icon: Settings },
]

interface AppSidebarProps {
  orgName?: string
}

export function AppSidebar({ orgName }: AppSidebarProps) {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-gray-900 min-h-screen flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <Link href="/dashboard" className="flex items-center gap-2 text-white font-bold text-lg">
          <Sun className="h-6 w-6 text-amber-500" />
          <span>SolarIntake</span>
        </Link>
        {orgName && (
          <p className="text-gray-400 text-sm mt-1 truncate">{orgName}</p>
        )}
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-amber-500 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
