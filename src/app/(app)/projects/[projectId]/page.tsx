"use client"

import { useState, useEffect, useCallback } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ProjectChecklist } from "@/components/app/project-checklist"
import { ActivityLog } from "@/components/app/activity-log"
import { ProgressBar } from "@/components/app/progress-ring"
import {
  updateProjectStage,
  addCustomChecklistItem,
  addProjectNote,
} from "@/app/actions/projects"
import {
  ArrowLeft,
  Link2,
  Mail,
  Bell,
  Download,
  Plus,
  Loader2,
} from "lucide-react"
import { toast } from "sonner"

const STAGES = [
  "NEW_INTAKE",
  "WAITING_ON_CUSTOMER",
  "READY_FOR_PROPOSAL",
  "PERMIT_PREP",
  "AHJ_SUBMITTED",
  "UTILITY_INTERCONNECTION",
  "COMPLETE",
]

interface ProjectData {
  id: string
  title: string
  projectType: string
  stage: string
  notes: string | null
  customer: {
    name: string
    email: string
    phone: string | null
    address: string | null
  }
  checklistItems: {
    id: string
    label: string
    description: string | null
    category: string
    isRequired: boolean
    isCompleted: boolean
    completedAt: string | null
    documents: { id: string; fileName: string }[]
  }[]
  activityLogs: {
    id: string
    type: string
    message: string
    createdAt: string
    userId: string | null
  }[]
}

export default function ProjectDetailPage() {
  const params = useParams()
  const projectId = params.projectId as string

  const [project, setProject] = useState<ProjectData | null>(null)
  const [loading, setLoading] = useState(true)
  const [portalUrl, setPortalUrl] = useState("")
  const [newItemLabel, setNewItemLabel] = useState("")
  const [newItemCategory, setNewItemCategory] = useState("CUSTOM")
  const [addingItem, setAddingItem] = useState(false)
  const [note, setNote] = useState("")
  const [addingNote, setAddingNote] = useState(false)
  const [stageUpdating, setStageUpdating] = useState(false)

  const fetchProject = useCallback(async () => {
    const res = await fetch(`/api/projects/${projectId}/detail`)
    if (res.ok) {
      const data = await res.json()
      setProject(data)
    }
    setLoading(false)
  }, [projectId])

  useEffect(() => {
    void Promise.resolve().then(fetchProject)
  }, [fetchProject])

  const handleStageChange = async (stage: string) => {
    setStageUpdating(true)
    try {
      await updateProjectStage(projectId, stage)
      toast.success("Stage updated")
      await fetchProject()
    } catch {
      toast.error("Failed to update stage")
    } finally {
      setStageUpdating(false)
    }
  }

  const handleGeneratePortalLink = async () => {
    const res = await fetch(`/api/projects/${projectId}/portal-link`, { method: "POST" })
    if (res.ok) {
      const data = await res.json()
      setPortalUrl(data.url)
      navigator.clipboard.writeText(data.url).catch(() => {})
      toast.success("Portal link copied to clipboard!")
    } else {
      toast.error("Failed to generate link")
    }
  }

  const handleSendInvite = async () => {
    const res = await fetch(`/api/projects/${projectId}/send-invite`, { method: "POST" })
    if (res.ok) {
      toast.success("Invite sent!")
    } else {
      toast.error("Failed to send invite")
    }
  }

  const handleSendReminder = async () => {
    const res = await fetch(`/api/projects/${projectId}/send-reminder`, { method: "POST" })
    if (res.ok) {
      toast.success("Reminder sent!")
    } else {
      toast.error("Failed to send reminder")
    }
  }

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newItemLabel) return
    setAddingItem(true)
    try {
      await addCustomChecklistItem(projectId, newItemLabel, newItemCategory)
      setNewItemLabel("")
      toast.success("Item added")
      await fetchProject()
    } catch {
      toast.error("Failed to add item")
    } finally {
      setAddingItem(false)
    }
  }

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!note) return
    setAddingNote(true)
    try {
      await addProjectNote(projectId, note)
      setNote("")
      toast.success("Note added")
      await fetchProject()
    } catch {
      toast.error("Failed to add note")
    } finally {
      setAddingNote(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-6 w-6 animate-spin text-amber-500" />
      </div>
    )
  }

  if (!project) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500">Project not found</p>
        <Link href="/projects">
          <Button variant="ghost" className="mt-4">Back to projects</Button>
        </Link>
      </div>
    )
  }

  const completedItems = project.checklistItems.filter((i) => i.isCompleted).length
  const totalItems = project.checklistItems.length

  return (
    <div className="max-w-5xl space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <Link href="/projects">
            <Button variant="ghost" size="sm" className="mt-0.5">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
          </Link>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{project.customer.name}</h2>
            <p className="text-gray-500 text-sm">{project.customer.address}</p>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline">{project.projectType}</Badge>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Select value={project.stage} onValueChange={(v) => { if (v) handleStageChange(v) }} disabled={stageUpdating}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {STAGES.map((s) => (
                <SelectItem key={s} value={s}>
                  {s.replace(/_/g, " ")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <a href={`/api/projects/${projectId}/export`} download>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>

      {/* Progress */}
      <ProgressBar completed={completedItems} total={totalItems} />

      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={handleGeneratePortalLink}>
          <Link2 className="h-4 w-4 mr-2" />
          Get Portal Link
        </Button>
        <Button variant="outline" size="sm" onClick={handleSendInvite}>
          <Mail className="h-4 w-4 mr-2" />
          Send Invite
        </Button>
        <Button variant="outline" size="sm" onClick={handleSendReminder}>
          <Bell className="h-4 w-4 mr-2" />
          Send Reminder
        </Button>
      </div>

      {portalUrl && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-xs text-blue-700 font-medium mb-1">Customer Portal Link (copied):</p>
          <p className="text-xs text-blue-600 break-all">{portalUrl}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Checklist */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">
                Checklist
                <span className="text-gray-400 font-normal ml-2">
                  {completedItems}/{totalItems} complete
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ProjectChecklist
                items={project.checklistItems}
                projectId={projectId}
              />

              <Separator className="my-4" />

              {/* Add custom item */}
              <form onSubmit={handleAddItem} className="flex gap-2">
                <Input
                  value={newItemLabel}
                  onChange={(e) => setNewItemLabel(e.target.value)}
                  placeholder="Add custom item..."
                  className="flex-1"
                />
                <Select
                  value={newItemCategory}
                  onValueChange={(v) => { if (v) setNewItemCategory(v) }}
                >
                  <SelectTrigger className="w-36">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["UTILITY_BILL", "USAGE_DATA", "RATE_SCHEDULE", "AUTHORIZATION", "SITE_DOCUMENTS", "AHJ_PERMIT", "INTERCONNECTION", "CUSTOM"].map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button type="submit" size="sm" disabled={addingItem}>
                  {addingItem ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Right: Customer info + Activity */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Customer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 text-sm text-gray-600">
              <p className="font-medium text-gray-900">{project.customer.name}</p>
              <p>{project.customer.email}</p>
              {project.customer.phone && <p>{project.customer.phone}</p>}
              {project.customer.address && <p>{project.customer.address}</p>}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddNote} className="space-y-2">
                <Textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Add a note..."
                  rows={3}
                  className="text-sm"
                />
                <Button type="submit" size="sm" disabled={addingNote || !note}>
                  {addingNote ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : null}
                  Add Note
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ActivityLog
                entries={project.activityLogs.map((log) => ({
                  ...log,
                  createdAt: new Date(log.createdAt),
                }))}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
