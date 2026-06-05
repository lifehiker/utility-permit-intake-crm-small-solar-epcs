"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { createProject } from "@/app/actions/projects"
import { Loader2, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface Template {
  id: string
  name: string
  projectType: string | null
}

interface Member {
  id: string
  userId: string
  user: { name: string | null; email: string }
}

export default function NewProjectPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [templates, setTemplates] = useState<Template[]>([])
  const [members, setMembers] = useState<Member[]>([])
  const [orgId, setOrgId] = useState("")
  const [form, setForm] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    customerAddress: "",
    projectType: "RESIDENTIAL",
    templateId: "",
    assignedToId: "",
  })

  useEffect(() => {
    fetch("/api/org/context")
      .then((r) => r.json())
      .then((data) => {
        setOrgId(data.orgId)
        setTemplates(data.templates || [])
        setMembers(data.members || [])
        // Set default template
        const defaultTemplate = data.templates?.find((t: Template) => t.projectType === "RESIDENTIAL")
        if (defaultTemplate) {
          setForm((f) => ({ ...f, templateId: defaultTemplate.id }))
        }
      })
      .catch(() => {})
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!orgId) {
      setError("Organization not found. Please complete onboarding.")
      return
    }
    setError("")
    setLoading(true)

    try {
      const project = await createProject({ ...form, orgId })
      router.push(`/projects/${project.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create project")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl space-y-4">
      <div className="flex items-center gap-3">
        <Link href="/projects">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
        </Link>
        <h2 className="text-2xl font-bold text-gray-900">New Project</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customer Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-700 text-sm p-3 rounded-md border border-red-200">
                {error}
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="customerName">Customer name *</Label>
                <Input
                  id="customerName"
                  value={form.customerName}
                  onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                  placeholder="John Smith"
                  required
                />
              </div>
              <div>
                <Label htmlFor="customerEmail">Email *</Label>
                <Input
                  id="customerEmail"
                  type="email"
                  value={form.customerEmail}
                  onChange={(e) => setForm({ ...form, customerEmail: e.target.value })}
                  placeholder="john@example.com"
                  required
                />
              </div>
              <div>
                <Label htmlFor="customerPhone">Phone</Label>
                <Input
                  id="customerPhone"
                  type="tel"
                  value={form.customerPhone}
                  onChange={(e) => setForm({ ...form, customerPhone: e.target.value })}
                  placeholder="(555) 555-5555"
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="customerAddress">Property address</Label>
                <Input
                  id="customerAddress"
                  value={form.customerAddress}
                  onChange={(e) => setForm({ ...form, customerAddress: e.target.value })}
                  placeholder="123 Main St, City, State 12345"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <Label>Project type *</Label>
                <Select
                  value={form.projectType}
                  onValueChange={(v) => { if (v) setForm({ ...form, projectType: v }) }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="RESIDENTIAL">Residential</SelectItem>
                    <SelectItem value="COMMERCIAL">Commercial</SelectItem>
                    <SelectItem value="LIGHT_COMMERCIAL">Light Commercial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Checklist template</Label>
                <Select
                  value={form.templateId}
                  onValueChange={(v) => setForm({ ...form, templateId: v ?? "" })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">No template</SelectItem>
                    {templates.map((t) => (
                      <SelectItem key={t.id} value={t.id}>
                        {t.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {members.length > 0 && (
                <div>
                  <Label>Assign to</Label>
                  <Select
                    value={form.assignedToId}
                    onValueChange={(v) => setForm({ ...form, assignedToId: v ?? "" })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Unassigned" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Unassigned</SelectItem>
                      {members.map((m) => (
                        <SelectItem key={m.userId} value={m.userId}>
                          {m.user.name || m.user.email}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="submit"
                className="bg-amber-500 hover:bg-amber-600 text-white"
                disabled={loading}
              >
                {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                Create Project
              </Button>
              <Link href="/projects">
                <Button type="button" variant="outline">Cancel</Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
