import { Progress } from "@/components/ui/progress"

interface ProgressRingProps {
  completed: number
  total: number
  className?: string
}

export function ProgressBar({ completed, total, className }: ProgressRingProps) {
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100)

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm text-gray-600">Progress</span>
        <span className="text-sm font-medium text-gray-900">
          {completed}/{total} items ({percentage}%)
        </span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  )
}
