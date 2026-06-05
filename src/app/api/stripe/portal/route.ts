import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { getStripe } from "@/lib/stripe"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const stripe = getStripe()
  if (!stripe) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 503 })
  }

  try {
    const { orgId } = await req.json()
    const subscription = await prisma.subscription.findUnique({
      where: { organizationId: orgId },
    })

    if (!subscription?.stripeCustomerId) {
      return NextResponse.json({ error: "No billing account found" }, { status: 404 })
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: subscription.stripeCustomerId,
      return_url: `${baseUrl}/settings`,
    })

    return NextResponse.json({ url: portalSession.url })
  } catch (error) {
    console.error("Stripe portal error:", error)
    return NextResponse.json({ error: "Portal failed" }, { status: 500 })
  }
}
