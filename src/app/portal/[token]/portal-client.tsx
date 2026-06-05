"use client"

import { useState } from "react"
import { PortalDocumentUpload } from "@/components/app/document-upload-card"
import { CheckCircle, Circle, Clock, Sun } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface PortalClientProps {
  token: string
  expired: boolean
  project: {
    id: string
    customer: {
      name: string
      email: string
      address: string | null
    }
    organization: {
      name: string
      logoUrl: string | null
      brandColor: string
    }
    checklistItems: {
      id: string
      label: string
      description: string | null
      category: string
      isRequired: boolean
      isCompleted: boolean
      documents: { id: string; fileName: string; createdAt: Date }[]
    }[]
  } | null
}

const CATEGORY_LABELS: Record<string, string> = {
  UTILITY_BILL: "Utility Bill",
  USAGE_DATA: "Usage Data",
  RATE_SCHEDULE: "Rate Schedule",
  AUTHORIZATION: "Authorization",
  SITE_DOCUMENTS: "Site Documents",
  AHJ_PERMIT: "AHJ Permit",
  INTERCONNECTION: "Interconnection",
  CUSTOM: "Other",
}

export function PortalClient({ token, expired, project }: PortalClientProps) {
  const [completedItems, setCompletedItems] = useState<Set<string>>(
    new Set(project?.checklistItems.filter((i) => i.isCompleted).map((i) => i.id) || [])
  )

  if (expired) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Link Expired</h1>
          <p className="text-gray-600">
            This upload link has expired. Please contact your solar installer for a new link.
          </p>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Invalid Link</h1>
        </div>
      </div>
    )
  }

  const { organization, customer, checklistItems } = project
  const brandColor = organization.brandColor || "#f59e0b"

  // Group items by category
  const grouped = checklistItems.reduce<
    Record<string, typeof checklistItems>
  >((acc, item) => {
    if (!acc[item.category]) acc[item.category] = []
    acc[item.category].push(item)
    return acc
  }, {})

  const totalRequired = checklistItems.filter((i) => i.isRequired).length
  const completedRequired = checklistItems.filter(
    (i) => i.isRequired && (i.isCompleted || completedItems.has(i.id))
  ).length
  const allDone = completedRequired === totalRequired

  const handleUploaded = (itemId: string) => {
    setCompletedItems((prev) => new Set([...prev, itemId]))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header
        className="py-6 px-4 text-white"
        style={{ backgroundColor: brandColor }}
      >
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            {organization.logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={organization.logoUrl} alt={organization.name} className="h-8" />
            ) : (
              <Sun className="h-7 w-7 text-white" />
            )}
            <h1 className="text-xl font-bold">{organization.name}</h1>
          </div>
          <p className="text-white/80 text-sm">Solar Project Document Portal</p>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        {/* Welcome */}
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-1">Hi {customer.name}!</h2>
          {customer.address && (
            <p className="text-gray-500 text-sm mb-3">{customer.address}</p>
          )}
          <p className="text-gray-700">
            Please upload the documents below so we can prepare your solar proposal.
            Required documents are marked with a red badge.
          </p>

          {/* Progress */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-gray-600">Required documents</span>
              <span className="font-medium">{completedRequired}/{totalRequired}</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${totalRequired === 0 ? 0 : (completedRequired / totalRequired) * 100}%`,
                  backgroundColor: brandColor,
                }}
              />
            </div>
          </div>
        </div>

        {allDone && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <CheckCircle className="h-10 w-10 text-green-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-green-800">All done! Thank you!</h3>
            <p className="text-green-700 mt-1">
              {organization.name} will review your documents and be in touch soon.
            </p>
          </div>
        )}

        {/* Checklist by category */}
        {Object.entries(grouped).map(([category, items]) => (
          <div key={category} className="bg-white rounded-lg border overflow-hidden">
            <div className="px-4 py-3 border-b bg-gray-50">
              <h3 className="font-medium text-gray-900">
                {CATEGORY_LABELS[category] || category}
              </h3>
            </div>
            <div className="divide-y">
              {items.map((item) => {
                const isDone = item.isCompleted || completedItems.has(item.id)
                return (
                  <div key={item.id} className="px-4 py-4 flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      {isDone ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      ) : (
                        <Circle className="h-5 w-5 text-gray-300 mt-0.5 flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`text-sm font-medium ${
                              isDone ? "line-through text-gray-400" : "text-gray-800"
                            }`}
                          >
                            {item.label}
                          </span>
                          {item.isRequired && !isDone && (
                            <Badge
                              variant="outline"
                              className="text-xs text-red-600 border-red-200"
                            >
                              Required
                            </Badge>
                          )}
                          {isDone && (
                            <Badge className="text-xs bg-green-100 text-green-700">
                              Uploaded
                            </Badge>
                          )}
                        </div>
                        {item.description && (
                          <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                        )}
                        {item.documents.length > 0 && (
                          <p className="text-xs text-gray-400 mt-0.5">
                            {item.documents.map((d) => d.fileName).join(", ")}
                          </p>
                        )}
                      </div>
                    </div>
                    {!isDone && (
                      <PortalDocumentUpload
                        token={token}
                        checklistItemId={item.id}
                        onUploaded={() => handleUploaded(item.id)}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}

        <div className="text-center text-xs text-gray-400 py-4">
          Powered by SolarIntake &mdash; Secure document portal for solar EPCs
        </div>
      </div>
    </div>
  )
}
