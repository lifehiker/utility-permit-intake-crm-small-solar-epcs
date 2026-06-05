import { nanoid } from "nanoid"
import { prisma } from "@/lib/prisma"

export async function generateMagicLinkToken(projectId: string): Promise<string> {
  const token = nanoid(32)
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days

  await prisma.magicLinkToken.create({
    data: {
      token,
      projectId,
      expiresAt,
    },
  })

  return token
}

export function getPortalUrl(token: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  return `${baseUrl}/portal/${token}`
}
