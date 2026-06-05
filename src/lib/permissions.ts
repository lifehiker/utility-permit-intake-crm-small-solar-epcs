import { prisma } from "@/lib/prisma"

const ROLE_LEVELS: Record<string, number> = {
  MEMBER: 1,
  ADMIN: 2,
  OWNER: 3,
}

export async function checkOrgMembership(
  userId: string,
  orgId: string
): Promise<{ userId: string; organizationId: string; role: string }> {
  const membership = await prisma.membership.findUnique({
    where: {
      userId_organizationId: { userId, organizationId: orgId },
    },
  })
  if (!membership) {
    throw new Error("Not a member of this organization")
  }
  return membership
}

export async function requireRole(
  userId: string,
  orgId: string,
  minRole: string
): Promise<void> {
  const membership = await checkOrgMembership(userId, orgId)
  const userLevel = ROLE_LEVELS[membership.role] ?? 0
  const requiredLevel = ROLE_LEVELS[minRole] ?? 0
  if (userLevel < requiredLevel) {
    throw new Error(`Requires ${minRole} role or higher`)
  }
}
