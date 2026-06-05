import { NextRequest, NextResponse } from "next/server"
import { getStripe } from "@/lib/stripe"
import { prisma } from "@/lib/prisma"
import type Stripe from "stripe"

export async function POST(req: NextRequest) {
  const stripe = getStripe()
  if (!stripe) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 503 })
  }

  const body = await req.text()
  const signature = req.headers.get("stripe-signature")

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.error("Webhook signature verification failed:", err)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object
        const orgId = session.metadata?.orgId
        if (orgId && session.customer && session.subscription) {
          await prisma.subscription.upsert({
            where: { organizationId: orgId },
            create: {
              organizationId: orgId,
              stripeCustomerId: session.customer as string,
              stripeSubscriptionId: session.subscription as string,
              status: "ACTIVE",
              plan: "PRO",
            },
            update: {
              stripeCustomerId: session.customer as string,
              stripeSubscriptionId: session.subscription as string,
              status: "ACTIVE",
            },
          })
        }
        break
      }

      case "customer.subscription.updated": {
        const sub = event.data.object
        const currentPeriodEnd =
          "current_period_end" in sub && typeof sub.current_period_end === "number"
            ? new Date(sub.current_period_end * 1000)
            : undefined
        const existing = await prisma.subscription.findUnique({
          where: { stripeSubscriptionId: sub.id },
        })
        if (existing) {
          await prisma.subscription.update({
            where: { stripeSubscriptionId: sub.id },
            data: {
              status: sub.status.toUpperCase(),
              ...(currentPeriodEnd ? { currentPeriodEnd } : {}),
            },
          })
        }
        break
      }

      case "customer.subscription.deleted": {
        const sub = event.data.object
        const existing = await prisma.subscription.findUnique({
          where: { stripeSubscriptionId: sub.id },
        })
        if (existing) {
          await prisma.subscription.update({
            where: { stripeSubscriptionId: sub.id },
            data: { status: "CANCELED" },
          })
        }
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook handler error:", error)
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 })
  }
}
