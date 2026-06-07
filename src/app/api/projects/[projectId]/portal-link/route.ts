import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { generateMagicLinkToken, getPortalUrl } from "@/lib/tokens"

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
    const token = await generateMagicLinkToken(projectId)
    const url = getPortalUrl(token)
    return NextResponse.json({ url, token })
  } catch (error) {
    console.error("Portal link error:", error)
    return NextResponse.json({ error: "Failed to generate portal link" }, { status: 500 })
  }
}
