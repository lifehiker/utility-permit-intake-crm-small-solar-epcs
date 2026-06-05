import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { saveFile } from "@/lib/storage"

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params

  try {
    const magicLink = await prisma.magicLinkToken.findUnique({
      where: { token },
      include: { project: true },
    })

    if (!magicLink) {
      return NextResponse.json({ error: "Invalid token" }, { status: 404 })
    }

    if (magicLink.expiresAt < new Date()) {
      return NextResponse.json({ error: "Token expired" }, { status: 410 })
    }

    const formData = await req.formData()
    const file = formData.get("file") as File | null
    const checklistItemId = formData.get("checklistItemId") as string | null
    const email = formData.get("email") as string | null

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const storageKey = await saveFile(buffer, file.name)

    const document = await prisma.document.create({
      data: {
        projectId: magicLink.projectId,
        checklistItemId: checklistItemId || undefined,
        fileName: file.name,
        mimeType: file.type,
        size: file.size,
        storageKey,
        uploadedByEmail: email || magicLink.project.notes,
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
        projectId: magicLink.projectId,
        type: "CUSTOMER_UPLOAD",
        message: `Customer uploaded document: ${file.name}`,
      },
    })

    return NextResponse.json(document, { status: 201 })
  } catch (error) {
    console.error("Portal upload error:", error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
