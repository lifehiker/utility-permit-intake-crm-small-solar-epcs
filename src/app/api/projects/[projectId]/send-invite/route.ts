import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { sendPortalInvite } from "@/app/actions/email"

export async function POST(
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

  const project = await prisma.project.findUnique({
    where: { id: projectId, organizationId: membership.organizationId },
    select: { id: true },
  })
  if (!project) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  try {
    const result = await sendPortalInvite(projectId)
    return NextResponse.json(result)
  } catch (error) {
    console.error("Send invite error:", error)
    return NextResponse.json({ error: "Failed to send invite" }, { status: 500 })
  }
}
