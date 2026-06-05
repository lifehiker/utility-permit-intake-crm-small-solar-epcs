import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { PortalClient } from "./portal-client"

export default async function PortalPage({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  const { token } = await params

  const magicLink = await prisma.magicLinkToken.findUnique({
    where: { token },
    include: {
      project: {
        include: {
          customer: true,
          organization: true,
          checklistItems: {
            orderBy: { sortOrder: "asc" },
            include: {
              documents: { select: { id: true, fileName: true, createdAt: true } },
            },
          },
        },
      },
    },
  })

  if (!magicLink) {
    notFound()
  }

  const expired = magicLink.expiresAt < new Date()

  return (
    <PortalClient
      token={token}
      expired={expired}
      project={expired ? null : {
        id: magicLink.project.id,
        customer: magicLink.project.customer,
        organization: {
          name: magicLink.project.organization.name,
          logoUrl: magicLink.project.organization.logoUrl,
          brandColor: magicLink.project.organization.brandColor,
        },
        checklistItems: magicLink.project.checklistItems,
      }}
    />
  )
}
