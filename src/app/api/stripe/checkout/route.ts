import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { getStripe } from "@/lib/stripe"
import { prisma } from "@/lib/prisma"

const PLAN_PRICES: Record<string, string> = {
  PRO: process.env.STRIPE_PRO_PRICE_ID || "",
  TEAM: process.env.STRIPE_TEAM_PRICE_ID || "",
}

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
    const { plan, orgId } = await req.json()
    const priceId = PLAN_PRICES[plan]
    if (!priceId) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 })
    }

    const org = await prisma.organization.findUnique({ where: { id: orgId } })
    if (!org) {
      return NextResponse.json({ error: "Organization not found" }, { status: 404 })
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${baseUrl}/settings?upgrade=success`,
      cancel_url: `${baseUrl}/settings?upgrade=canceled`,
      metadata: { orgId },
    })

    return NextResponse.json({ url: checkoutSession.url })
  } catch (error) {
    console.error("Stripe checkout error:", error)
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 })
  }
}
