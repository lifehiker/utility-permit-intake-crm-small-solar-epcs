"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { checkProjectLimit } from "@/lib/plan-limits"
import { revalidatePath } from "next/cache"

export async function createProject(data: {
  customerName: string
  customerEmail: string
  customerPhone?: string
  customerAddress?: string
  projectType: string
  templateId?: string
  assignedToId?: string
  orgId: string
}) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  await checkProjectLimit(data.orgId)

  const customer = await prisma.customer.create({
    data: {
      name: data.customerName,
      email: data.customerEmail,
      phone: data.customerPhone,
      address: data.customerAddress,
    },
  })

  const project = await prisma.project.create({
    data: {
      organizationId: data.orgId,
      customerId: customer.id,
      title: `${data.customerName} - ${data.projectType}`,
      projectType: data.projectType,
      assignedToId: data.assignedToId,
    },
  })

  if (data.templateId) {
    const templateItems = await prisma.checklistTemplateItem.findMany({
      where: { templateId: data.templateId },
      orderBy: { sortOrder: "asc" },
    })

    if (templateItems.length > 0) {
      await prisma.projectChecklistItem.createMany({
        data: templateItems.map((item) => ({
          projectId: project.id,
          label: item.label,
          description: item.description,
          category: item.category,
          isRequired: item.isRequired,
          sortOrder: item.sortOrder,
        })),
      })
    }
  }

  await prisma.activityLog.create({
    data: {
      projectId: project.id,
      userId: session.user.id,
      type: "PROJECT_CREATED",
      message: `Project created for ${data.customerName}`,
    },
  })

  revalidatePath("/projects")
  return project
}

export async function updateProjectStage(projectId: string, stage: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const project = await prisma.project.update({
    where: { id: projectId },
    data: { stage },
  })

  await prisma.activityLog.create({
    data: {
      projectId,
      userId: session.user.id,
      type: "STAGE_CHANGED",
      message: `Stage updated to ${stage}`,
    },
  })

  revalidatePath(`/projects/${projectId}`)
  return project
}

export async function toggleChecklistItem(itemId: string, isRequired: boolean) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const item = await prisma.projectChecklistItem.update({
    where: { id: itemId },
    data: { isRequired },
  })

  revalidatePath(`/projects/${item.projectId}`)
  return item
}

export async function completeChecklistItem(itemId: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const item = await prisma.projectChecklistItem.update({
    where: { id: itemId },
    data: { isCompleted: true, completedAt: new Date() },
  })

  await prisma.activityLog.create({
    data: {
      projectId: item.projectId,
      userId: session.user.id,
      type: "ITEM_COMPLETED",
      message: `Checklist item completed: ${item.label}`,
    },
  })

  revalidatePath(`/projects/${item.projectId}`)
  return item
}

export async function addCustomChecklistItem(
  projectId: string,
  label: string,
  category: string
) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const lastItem = await prisma.projectChecklistItem.findFirst({
    where: { projectId },
    orderBy: { sortOrder: "desc" },
  })

  const item = await prisma.projectChecklistItem.create({
    data: {
      projectId,
      label,
      category,
      isRequired: false,
      sortOrder: (lastItem?.sortOrder ?? 0) + 1,
    },
  })

  revalidatePath(`/projects/${projectId}`)
  return item
}

export async function addProjectNote(projectId: string, note: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  await prisma.activityLog.create({
    data: {
      projectId,
      userId: session.user.id,
      type: "NOTE",
      message: note,
    },
  })

  await prisma.project.update({
    where: { id: projectId },
    data: { notes: note },
  })

  revalidatePath(`/projects/${projectId}`)
}

export async function deleteProject(projectId: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  await prisma.project.delete({ where: { id: projectId } })
  revalidatePath("/projects")
}
