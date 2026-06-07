import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { projectId } = await params

  const membership = await prisma.membership.findFirst({
    where: { userId: session.user.id },
  })
  if (!membership) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  try {
    const project = await prisma.project.findUnique({
      where: { id: projectId, organizationId: membership.organizationId },
      include: {
        customer: true,
        checklistItems: {
          orderBy: { sortOrder: "asc" },
        },
        documents: true,
      },
    })

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    const rows = [
      ["Field", "Value"],
      ["Project Title", project.title],
      ["Customer Name", project.customer.name],
      ["Customer Email", project.customer.email],
      ["Customer Phone", project.customer.phone || ""],
      ["Address", project.customer.address || ""],
      ["Project Type", project.projectType],
      ["Stage", project.stage],
      ["Created At", project.createdAt.toISOString()],
      [""],
      ["Checklist Item", "Category", "Required", "Completed", "Completed At"],
      ...project.checklistItems.map((item) => [
        item.label,
        item.category,
        item.isRequired ? "Yes" : "No",
        item.isCompleted ? "Yes" : "No",
        item.completedAt?.toISOString() || "",
      ]),
      [""],
      ["Document", "Uploaded By", "Upload Date"],
      ...project.documents.map((doc) => [
        doc.fileName,
        doc.uploadedByEmail || "",
        doc.createdAt.toISOString(),
      ]),
    ]

    const csv = rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n")

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="project-${projectId}.csv"`,
      },
    })
  } catch (error) {
    console.error("Export error:", error)
    return NextResponse.json({ error: "Export failed" }, { status: 500 })
  }
}
