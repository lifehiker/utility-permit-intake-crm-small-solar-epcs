import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { inviteTeamMember } from "@/app/actions/organizations"

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { orgId, email, role } = await req.json()
    const result = await inviteTeamMember(orgId, email, role || "MEMBER")
    return NextResponse.json(result)
  } catch (error) {
    console.error("Invite error:", error)
    return NextResponse.json({ error: "Invite failed" }, { status: 500 })
  }
}
