import { AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface MissingItem {
  id: string
  label: string
  category: string
  projectId: string
  projectTitle?: string
}

interface MissingItemsCardProps {
  items: MissingItem[]
}

export function MissingItemsCard({ items }: MissingItemsCardProps) {
  if (items.length === 0) return null

  return (
    <Card className="border-yellow-200 bg-yellow-50">
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center gap-2 text-yellow-800">
          <AlertTriangle className="h-4 w-4" />
          {items.length} Missing Required Document{items.length !== 1 ? "s" : ""}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {items.slice(0, 5).map((item) => (
            <li key={item.id} className="flex items-center justify-between">
              <span className="text-sm text-yellow-900">{item.label}</span>
              <Badge variant="outline" className="text-xs text-yellow-700 border-yellow-300">
                {item.category}
              </Badge>
            </li>
          ))}
          {items.length > 5 && (
            <li className="text-sm text-yellow-700">+{items.length - 5} more</li>
          )}
        </ul>
      </CardContent>
    </Card>
  )
}
