import { redirect } from "next/navigation"
import Link from "next/link"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ActivityLog } from "@/components/app/activity-log"
import { ProjectStageBadge } from "@/components/app/project-stage-badge"
import {
  FolderKanban,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Plus,
  ArrowRight,
} from "lucide-react"

export const metadata = { title: "Dashboard — SolarIntake" }

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const membership = await prisma.membership.findFirst({
    where: { userId: session.user.id },
    include: { organization: true },
  })

  if (!membership) {
    redirect("/onboarding")
  }

  const orgId = membership.organizationId

  const [totalProjects, waitingCount, readyCount, completeCount] = await Promise.all([
    prisma.project.count({ where: { organizationId: orgId } }),
    prisma.project.count({ where: { organizationId: orgId, stage: "WAITING_ON_CUSTOMER" } }),
    prisma.project.count({ where: { organizationId: orgId, stage: "READY_FOR_PROPOSAL" } }),
    prisma.project.count({ where: { organizationId: orgId, stage: "COMPLETE" } }),
  ])

  // Projects with missing required docs
  const blockedProjects = await prisma.project.findMany({
    where: {
      organizationId: orgId,
      stage: { notIn: ["COMPLETE"] },
      checklistItems: {
        some: { isRequired: true, isCompleted: false },
      },
    },
    include: {
      customer: true,
      checklistItems: {
        where: { isRequired: true, isCompleted: false },
      },
    },
    take: 5,
    orderBy: { updatedAt: "desc" },
  })

  // Recent activity
  const recentActivity = await prisma.activityLog.findMany({
    where: {
      project: { organizationId: orgId },
    },
    orderBy: { createdAt: "desc" },
    take: 10,
  })

  const stats = [
    { label: "Total Projects", value: totalProjects, icon: FolderKanban, color: "text-blue-600" },
    { label: "Waiting on Customer", value: waitingCount, icon: Clock, color: "text-yellow-600" },
    { label: "Ready for Proposal", value: readyCount, icon: CheckCircle2, color: "text-green-600" },
    { label: "Complete", value: completeCount, icon: CheckCircle2, color: "text-gray-600" },
  ]

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Welcome back, {session.user.name || "there"}!
          </h2>
          <p className="text-gray-500">{membership.organization.name}</p>
        </div>
        <Link href="/projects/new">
          <Button className="bg-amber-500 hover:bg-amber-600 text-white">
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`${stat.color}`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs text-gray-500">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Blocked projects */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
              Blocked Projects
              {blockedProjects.length > 0 && (
                <Badge variant="outline" className="text-yellow-700 border-yellow-200 ml-auto">
                  {blockedProjects.length}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {blockedProjects.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">No blocked projects!</p>
            ) : (
              <div className="space-y-3">
                {blockedProjects.map((project) => (
                  <div key={project.id} className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {project.customer.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {project.checklistItems.length} missing
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <ProjectStageBadge stage={project.stage} />
                      <Link href={`/projects/${project.id}`}>
                        <Button variant="ghost" size="sm">
                          <ArrowRight className="h-3 w-3" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent activity */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ActivityLog entries={recentActivity} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
