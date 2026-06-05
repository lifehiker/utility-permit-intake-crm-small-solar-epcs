import { prisma } from "@/lib/prisma"

interface PlanLimits {
  maxMembers: number
  maxProjects: number
}

export function getPlanLimits(plan: string): PlanLimits {
  switch (plan) {
    case "PRO":
      return { maxMembers: 10, maxProjects: 100 }
    case "TEAM":
      return { maxMembers: 50, maxProjects: 500 }
    case "STARTER":
    default:
      return { maxMembers: 3, maxProjects: 25 }
  }
}

export async function checkProjectLimit(orgId: string): Promise<void> {
  const subscription = await prisma.subscription.findUnique({
    where: { organizationId: orgId },
  })
  const plan = subscription?.plan || "STARTER"
  const limits = getPlanLimits(plan)

  const count = await prisma.project.count({
    where: { organizationId: orgId },
  })

  if (count >= limits.maxProjects) {
    throw new Error(
      `Project limit reached for your ${plan} plan (${limits.maxProjects} projects). Please upgrade to add more projects.`
    )
  }
}

export async function checkMemberLimit(orgId: string): Promise<void> {
  const subscription = await prisma.subscription.findUnique({
    where: { organizationId: orgId },
  })
  const plan = subscription?.plan || "STARTER"
  const limits = getPlanLimits(plan)

  const count = await prisma.membership.count({
    where: { organizationId: orgId },
  })

  if (count >= limits.maxMembers) {
    throw new Error(
      `Member limit reached for your ${plan} plan (${limits.maxMembers} members). Please upgrade to add more members.`
    )
  }
}
