"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { requireRole, checkOrgMembership } from "@/lib/permissions"
import { checkMemberLimit } from "@/lib/plan-limits"
import { revalidatePath } from "next/cache"

export async function updateOrganization(
  orgId: string,
  data: {
    name?: string
    logoUrl?: string
    brandColor?: string
    contactEmail?: string
    contactPhone?: string
  }
) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  await requireRole(session.user.id, orgId, "ADMIN")

  const org = await prisma.organization.update({
    where: { id: orgId },
    data,
  })

  revalidatePath("/settings")
  return org
}

export async function inviteTeamMember(
  orgId: string,
  email: string,
  role: string
) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  await requireRole(session.user.id, orgId, "ADMIN")
  await checkMemberLimit(orgId)

  // Check if user already exists
  let user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    // Create a placeholder user
    user = await prisma.user.create({
      data: { email, name: email.split("@")[0] },
    })
  }

  // Check if already a member
  const existingMembership = await prisma.membership.findUnique({
    where: { userId_organizationId: { userId: user.id, organizationId: orgId } },
  })

  if (existingMembership) {
    throw new Error("User is already a member of this organization")
  }

  const membership = await prisma.membership.create({
    data: { userId: user.id, organizationId: orgId, role },
  })

  revalidatePath("/settings")
  return membership
}

export async function removeMember(orgId: string, userId: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  await requireRole(session.user.id, orgId, "ADMIN")

  // Can't remove yourself if you're the only owner
  const membership = await checkOrgMembership(userId, orgId)
  if (membership.role === "OWNER") {
    const ownerCount = await prisma.membership.count({
      where: { organizationId: orgId, role: "OWNER" },
    })
    if (ownerCount <= 1) {
      throw new Error("Cannot remove the last owner of an organization")
    }
  }

  await prisma.membership.delete({
    where: { userId_organizationId: { userId, organizationId: orgId } },
  })

  revalidatePath("/settings")
}
