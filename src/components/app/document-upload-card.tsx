"use client"

import { useState, useRef } from "react"
import { Upload, File, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface DocumentUploadCardProps {
  projectId: string
  checklistItemId: string
  onUploaded?: () => void
}

export function DocumentUploadCard({ projectId, checklistItemId, onUploaded }: DocumentUploadCardProps) {
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("projectId", projectId)
      formData.append("checklistItemId", checklistItemId)

      const res = await fetch("/api/uploads", {
        method: "POST",
        body: formData,
      })

      if (!res.ok) {
        throw new Error("Upload failed")
      }

      toast.success("Document uploaded successfully")
      onUploaded?.()
    } catch {
      toast.error("Failed to upload document")
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ""
    }
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        onChange={handleUpload}
        className="hidden"
        accept=".pdf,.jpg,.jpeg,.png,.csv,.xlsx,.doc,.docx"
      />
      <Button
        variant="outline"
        size="sm"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
      >
        {uploading ? (
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        ) : (
          <Upload className="h-4 w-4 mr-2" />
        )}
        Upload
      </Button>
    </div>
  )
}

interface PortalDocumentUploadProps {
  token: string
  checklistItemId: string
  onUploaded?: () => void
}

export function PortalDocumentUpload({ token, checklistItemId, onUploaded }: PortalDocumentUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [uploaded, setUploaded] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("checklistItemId", checklistItemId)

      const res = await fetch(`/api/portal/upload/${token}`, {
        method: "POST",
        body: formData,
      })

      if (!res.ok) {
        throw new Error("Upload failed")
      }

      setUploaded(true)
      onUploaded?.()
    } catch {
      toast.error("Failed to upload document")
    } finally {
      setUploading(false)
    }
  }

  if (uploaded) {
    return (
      <div className="flex items-center gap-2 text-green-600 text-sm">
        <File className="h-4 w-4" />
        <span>Uploaded</span>
      </div>
    )
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        onChange={handleUpload}
        className="hidden"
        accept=".pdf,.jpg,.jpeg,.png,.csv,.xlsx,.doc,.docx"
      />
      <Button
        variant="outline"
        size="sm"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
      >
        {uploading ? (
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        ) : (
          <Upload className="h-4 w-4 mr-2" />
        )}
        Upload File
      </Button>
    </div>
  )
}
