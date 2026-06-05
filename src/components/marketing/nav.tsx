import Link from "next/link"
import { Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

export function MarketingNav() {
  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-gray-900">
            <Sun className="h-6 w-6 text-amber-500" />
            <span>SolarIntake</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/features/utility-bill-intake" className="text-sm text-gray-600 hover:text-gray-900">
              Features
            </Link>
            <Link href="/pricing" className="text-sm text-gray-600 hover:text-gray-900">
              Pricing
            </Link>
            <Link href="/demo" className="text-sm text-gray-600 hover:text-gray-900">
              Demo
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">Log in</Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-white">
                Start free trial
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
