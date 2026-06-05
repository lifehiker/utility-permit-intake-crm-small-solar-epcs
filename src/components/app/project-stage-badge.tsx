import { Badge } from "@/components/ui/badge"

const STAGE_CONFIG: Record<string, { label: string; className: string }> = {
  NEW_INTAKE: { label: "New Intake", className: "bg-gray-100 text-gray-700" },
  WAITING_ON_CUSTOMER: { label: "Waiting on Customer", className: "bg-yellow-100 text-yellow-700" },
  READY_FOR_PROPOSAL: { label: "Ready for Proposal", className: "bg-blue-100 text-blue-700" },
  PERMIT_PREP: { label: "Permit Prep", className: "bg-purple-100 text-purple-700" },
  AHJ_SUBMITTED: { label: "AHJ Submitted", className: "bg-orange-100 text-orange-700" },
  UTILITY_INTERCONNECTION: { label: "Utility Interconnection", className: "bg-indigo-100 text-indigo-700" },
  COMPLETE: { label: "Complete", className: "bg-green-100 text-green-700" },
}

interface ProjectStageBadgeProps {
  stage: string
}

export function ProjectStageBadge({ stage }: ProjectStageBadgeProps) {
  const config = STAGE_CONFIG[stage] || { label: stage, className: "bg-gray-100 text-gray-700" }
  return (
    <Badge className={config.className} variant="outline">
      {config.label}
    </Badge>
  )
}
