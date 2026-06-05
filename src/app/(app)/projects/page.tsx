import { redirect } from "next/navigation"
import Link from "next/link"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProjectStageBadge } from "@/components/app/project-stage-badge"
import { Plus, ArrowRight } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

export const metadata = { title: "Projects — SolarIntake" }

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ stage?: string; type?: string; missing?: string }>
}) {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const params = await searchParams

  const membership = await prisma.membership.findFirst({
    where: { userId: session.user.id },
  })

  if (!membership) redirect("/onboarding")

  const whereClause: {
    organizationId: string
    stage?: string
    projectType?: string
    checklistItems?: { some: { isRequired: boolean; isCompleted: boolean } }
  } = { organizationId: membership.organizationId }

  if (params.stage) whereClause.stage = params.stage
  if (params.type) whereClause.projectType = params.type
  if (params.missing === "true") {
    whereClause.checklistItems = { some: { isRequired: true, isCompleted: false } }
  }

  const projects = await prisma.project.findMany({
    where: whereClause,
    include: {
      customer: true,
      checklistItems: true,
    },
    orderBy: { updatedAt: "desc" },
  })

  const stages = [
    "NEW_INTAKE",
    "WAITING_ON_CUSTOMER",
    "READY_FOR_PROPOSAL",
    "PERMIT_PREP",
    "AHJ_SUBMITTED",
    "UTILITY_INTERCONNECTION",
    "COMPLETE",
  ]

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
        <Link href="/projects/new">
          <Button className="bg-amber-500 hover:bg-amber-600 text-white">
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <Link href="/projects">
          <Badge
            variant={!params.stage && !params.missing ? "default" : "outline"}
            className="cursor-pointer"
          >
            All
          </Badge>
        </Link>
        {stages.map((s) => (
          <Link key={s} href={`/projects?stage=${s}`}>
            <Badge
              variant={params.stage === s ? "default" : "outline"}
              className="cursor-pointer"
            >
              {s.replace(/_/g, " ")}
            </Badge>
          </Link>
        ))}
        <Link href="/projects?missing=true">
          <Badge
            variant={params.missing === "true" ? "default" : "outline"}
            className="cursor-pointer text-yellow-700 border-yellow-300"
          >
            Missing Docs
          </Badge>
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border overflow-hidden">
        {projects.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <p className="text-lg font-medium">No projects yet</p>
            <p className="text-sm mt-1">Create your first project to get started</p>
            <Link href="/projects/new">
              <Button className="mt-4 bg-amber-500 hover:bg-amber-600 text-white">
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </Button>
            </Link>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase hidden md:table-cell">Address</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase hidden sm:table-cell">Type</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Stage</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase hidden lg:table-cell">Progress</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase hidden lg:table-cell">Created</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {projects.map((project) => {
                const total = project.checklistItems.length
                const completed = project.checklistItems.filter((i) => i.isCompleted).length
                const pct = total === 0 ? 0 : Math.round((completed / total) * 100)
                return (
                  <tr key={project.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-gray-900">{project.customer.name}</p>
                      <p className="text-xs text-gray-500">{project.customer.email}</p>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <p className="text-sm text-gray-500 truncate max-w-32">{project.customer.address || "—"}</p>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <Badge variant="outline" className="text-xs">
                        {project.projectType}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <ProjectStageBadge stage={project.stage} />
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-100 rounded-full h-1.5 min-w-16">
                          <div
                            className="bg-amber-500 h-1.5 rounded-full"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500 flex-shrink-0">{pct}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-400 hidden lg:table-cell">
                      {formatDistanceToNow(new Date(project.createdAt), { addSuffix: true })}
                    </td>
                    <td className="px-4 py-3">
                      <Link href={`/projects/${project.id}`}>
                        <Button variant="ghost" size="sm">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
