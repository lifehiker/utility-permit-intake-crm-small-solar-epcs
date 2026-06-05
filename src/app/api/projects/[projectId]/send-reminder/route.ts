import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { sendMissingItemsReminder } from "@/app/actions/email"

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { projectId } = await params

  try {
    const result = await sendMissingItemsReminder(projectId)
    return NextResponse.json(result)
  } catch (error) {
    console.error("Send reminder error:", error)
    return NextResponse.json({ error: "Failed to send reminder" }, { status: 500 })
  }
}
