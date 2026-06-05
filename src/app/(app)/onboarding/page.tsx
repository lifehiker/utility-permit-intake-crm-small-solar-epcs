"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sun, Loader2 } from "lucide-react"

export default function OnboardingPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: "",
    contactEmail: "",
    contactPhone: "",
    brandColor: "#f59e0b",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || "Setup failed")
        return
      }

      router.push("/dashboard")
      router.refresh()
    } catch {
      setError("An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 font-bold text-2xl text-gray-900 mb-2">
            <Sun className="h-7 w-7 text-amber-500" />
            SolarIntake
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Set up your company</h1>
          <p className="text-gray-500 text-sm mt-2">
            Tell us about your solar installation company so we can personalize your intake portal.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Company Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 text-red-700 text-sm p-3 rounded-md border border-red-200">
                  {error}
                </div>
              )}
              <div>
                <Label htmlFor="name">Company name *</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Solar Pro LLC"
                  required
                />
              </div>
              <div>
                <Label htmlFor="contactEmail">Contact email</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={form.contactEmail}
                  onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
                  placeholder="info@solarco.com"
                />
              </div>
              <div>
                <Label htmlFor="contactPhone">Contact phone</Label>
                <Input
                  id="contactPhone"
                  type="tel"
                  value={form.contactPhone}
                  onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
                  placeholder="(555) 555-5555"
                />
              </div>
              <div>
                <Label htmlFor="brandColor">Brand color</Label>
                <div className="flex items-center gap-3">
                  <input
                    id="brandColor"
                    type="color"
                    value={form.brandColor}
                    onChange={(e) => setForm({ ...form, brandColor: e.target.value })}
                    className="h-10 w-20 rounded cursor-pointer border"
                  />
                  <span className="text-sm text-gray-500">
                    Used on your customer portal
                  </span>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-600 text-white"
                disabled={loading}
              >
                {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                Set up my company
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
