import { formatDistanceToNow } from "date-fns"
import { FileText, Upload, CheckCircle, AlertCircle, MessageSquare, RefreshCw } from "lucide-react"

interface ActivityLogEntry {
  id: string
  type: string
  message: string
  createdAt: Date
  userId?: string | null
}

interface ActivityLogProps {
  entries: ActivityLogEntry[]
}

function getIcon(type: string) {
  switch (type) {
    case "DOCUMENT_UPLOADED":
    case "CUSTOMER_UPLOAD":
      return <Upload className="h-4 w-4 text-blue-500" />
    case "ITEM_COMPLETED":
      return <CheckCircle className="h-4 w-4 text-green-500" />
    case "STAGE_CHANGED":
      return <RefreshCw className="h-4 w-4 text-purple-500" />
    case "INVITE_SENT":
    case "REMINDER_SENT":
      return <AlertCircle className="h-4 w-4 text-orange-500" />
    case "NOTE":
      return <MessageSquare className="h-4 w-4 text-gray-500" />
    default:
      return <FileText className="h-4 w-4 text-gray-400" />
  }
}

export function ActivityLog({ entries }: ActivityLogProps) {
  if (entries.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p className="text-sm">No activity yet</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {entries.map((entry) => (
        <div key={entry.id} className="flex items-start gap-3">
          <div className="mt-0.5 flex-shrink-0">{getIcon(entry.type)}</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-700">{entry.message}</p>
            <p className="text-xs text-gray-400 mt-0.5">
              {formatDistanceToNow(new Date(entry.createdAt), { addSuffix: true })}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
