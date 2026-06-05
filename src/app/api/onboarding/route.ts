import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { name, contactEmail, contactPhone, brandColor } = await req.json()

    if (!name) {
      return NextResponse.json({ error: "Company name is required" }, { status: 400 })
    }

    // Check if user already has an org
    const existing = await prisma.membership.findFirst({
      where: { userId: session.user.id },
    })
    if (existing) {
      return NextResponse.json({ error: "Organization already created" }, { status: 400 })
    }

    let slug = slugify(name)
    const existing2 = await prisma.organization.findUnique({ where: { slug } })
    if (existing2) {
      slug = `${slug}-${Date.now()}`
    }

    const trialEndsAt = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)

    const org = await prisma.organization.create({
      data: {
        name,
        slug,
        contactEmail,
        contactPhone,
        brandColor: brandColor || "#f59e0b",
        memberships: {
          create: {
            userId: session.user.id,
            role: "OWNER",
          },
        },
        subscription: {
          create: {
            plan: "STARTER",
            status: "TRIALING",
            trialEndsAt,
          },
        },
      },
    })

    return NextResponse.json(org, { status: 201 })
  } catch (error) {
    console.error("Onboarding error:", error)
    return NextResponse.json({ error: "Setup failed" }, { status: 500 })
  }
}
