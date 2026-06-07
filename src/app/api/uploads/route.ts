import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { saveFile } from "@/lib/storage"

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const formData = await req.formData()
    const file = formData.get("file") as File | null
    const projectId = formData.get("projectId") as string | null
    const checklistItemId = formData.get("checklistItemId") as string | null

    if (!file || !projectId) {
      return NextResponse.json({ error: "Missing file or projectId" }, { status: 400 })
    }

    const membership = await prisma.membership.findFirst({
      where: { userId: session.user.id },
    })
    if (!membership) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const project = await prisma.project.findUnique({
      where: { id: projectId, organizationId: membership.organizationId },
      select: { id: true },
    })
    if (!project) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const storageKey = await saveFile(buffer, file.name)

    const document = await prisma.document.create({
      data: {
        projectId,
        checklistItemId: checklistItemId || undefined,
        fileName: file.name,
        mimeType: file.type,
        size: file.size,
        storageKey,
        uploadedByEmail: session.user.email || undefined,
      },
    })

    if (checklistItemId) {
      await prisma.projectChecklistItem.update({
        where: { id: checklistItemId },
        data: { isCompleted: true, completedAt: new Date() },
      })
    }

    await prisma.activityLog.create({
      data: {
        projectId,
        userId: session.user.id,
        type: "DOCUMENT_UPLOADED",
        message: `Document uploaded: ${file.name}`,
      },
    })

    return NextResponse.json(document, { status: 201 })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
