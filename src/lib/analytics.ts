"use client"

export function trackEvent(eventName: string, properties?: Record<string, unknown>): void {
  // Noop if no analytics configured
  if (typeof window === "undefined") return
  if (!process.env.NEXT_PUBLIC_ANALYTICS_KEY) return

  // Analytics integration would go here
  console.debug("[analytics]", eventName, properties)
}
