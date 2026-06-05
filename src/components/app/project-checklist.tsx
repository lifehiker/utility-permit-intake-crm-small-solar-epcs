"use client"

import { useState } from "react"
import { CheckCircle, Circle, Upload } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DocumentUploadCard } from "@/components/app/document-upload-card"
import { completeChecklistItem } from "@/app/actions/projects"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface ChecklistItem {
  id: string
  label: string
  description?: string | null
  category: string
  isRequired: boolean
  isCompleted: boolean
  completedAt?: Date | string | null
  documents: { id: string; fileName: string }[]
}

interface ProjectChecklistProps {
  items: ChecklistItem[]
  projectId: string
}

const CATEGORY_LABELS: Record<string, string> = {
  UTILITY_BILL: "Utility Bill",
  USAGE_DATA: "Usage Data",
  RATE_SCHEDULE: "Rate Schedule",
  AUTHORIZATION: "Authorization",
  SITE_DOCUMENTS: "Site Documents",
  AHJ_PERMIT: "AHJ Permit",
  INTERCONNECTION: "Interconnection",
  CUSTOM: "Custom",
}

export function ProjectChecklist({ items, projectId }: ProjectChecklistProps) {
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)

  const grouped = items.reduce<Record<string, ChecklistItem[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = []
    acc[item.category].push(item)
    return acc
  }, {})

  const handleComplete = async (itemId: string) => {
    setLoading(itemId)
    try {
      await completeChecklistItem(itemId)
      toast.success("Item marked complete")
      router.refresh()
    } catch {
      toast.error("Failed to update item")
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="space-y-6">
      {Object.entries(grouped).map(([category, categoryItems]) => (
        <div key={category}>
          <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
            {CATEGORY_LABELS[category] || category}
            <Badge variant="outline" className="text-xs">
              {categoryItems.filter((i) => i.isCompleted).length}/{categoryItems.length}
            </Badge>
          </h3>
          <div className="space-y-2">
            {categoryItems.map((item) => (
              <div
                key={item.id}
                className={`flex items-start gap-3 p-3 rounded-lg border ${
                  item.isCompleted
                    ? "bg-green-50 border-green-200"
                    : item.isRequired
                    ? "bg-white border-gray-200"
                    : "bg-gray-50 border-gray-100"
                }`}
              >
                <div className="mt-0.5 flex-shrink-0">
                  {item.isCompleted ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <Circle className="h-5 w-5 text-gray-300" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm ${item.isCompleted ? "line-through text-gray-400" : "text-gray-800"}`}>
                      {item.label}
                    </span>
                    {item.isRequired && !item.isCompleted && (
                      <Badge variant="outline" className="text-xs text-red-600 border-red-200">Required</Badge>
                    )}
                  </div>
                  {item.description && (
                    <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                  )}
                  {item.documents.length > 0 && (
                    <div className="mt-1 space-y-0.5">
                      {item.documents.map((doc) => (
                        <div key={doc.id} className="flex items-center gap-1 text-xs text-blue-600">
                          <Upload className="h-3 w-3" />
                          <a href={`/api/files/${doc.id}`} className="hover:underline">
                            {doc.fileName}
                          </a>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {!item.isCompleted && (
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <DocumentUploadCard
                      projectId={projectId}
                      checklistItemId={item.id}
                      onUploaded={() => router.refresh()}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleComplete(item.id)}
                      disabled={loading === item.id}
                    >
                      Mark Done
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
