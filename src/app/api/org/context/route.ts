import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const membership = await prisma.membership.findFirst({
    where: { userId: session.user.id },
    include: { organization: true },
  })

  if (!membership) {
    return NextResponse.json({ orgId: null, templates: [], members: [] })
  }

  const [templates, members] = await Promise.all([
    prisma.checklistTemplate.findMany({
      where: {
        OR: [
          { organizationId: membership.organizationId },
          { isDefault: true },
        ],
      },
      orderBy: [{ isDefault: "desc" }, { name: "asc" }],
    }),
    prisma.membership.findMany({
      where: { organizationId: membership.organizationId },
      include: { user: { select: { name: true, email: true } } },
    }),
  ])

  return NextResponse.json({
    orgId: membership.organizationId,
    org: membership.organization,
    templates,
    members,
  })
}
