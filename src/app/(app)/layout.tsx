import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { AppSidebar } from "@/components/app/app-sidebar"
import { AppHeader } from "@/components/app/app-header"
import { Toaster } from "@/components/ui/sonner"

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session?.user?.id) {
    redirect("/login")
  }

  const membership = await prisma.membership.findFirst({
    where: { userId: session.user.id },
    include: { organization: true },
  })

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AppSidebar orgName={membership?.organization.name} />
      <div className="flex-1 flex flex-col min-w-0">
        <AppHeader
          title="SolarIntake"
          userName={session.user.name}
          userEmail={session.user.email}
        />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
      <Toaster />
    </div>
  )
}
