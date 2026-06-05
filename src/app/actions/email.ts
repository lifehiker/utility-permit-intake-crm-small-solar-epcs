"use server"

import { prisma } from "@/lib/prisma"
import { getResend } from "@/lib/resend"
import { generateMagicLinkToken, getPortalUrl } from "@/lib/tokens"

export async function sendPortalInvite(projectId: string) {
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: { customer: true, organization: true },
  })

  if (!project) throw new Error("Project not found")

  const token = await generateMagicLinkToken(projectId)
  const portalUrl = getPortalUrl(token)

  const resend = getResend()
  if (!resend) {
    // Log that we would have sent an email
    await prisma.activityLog.create({
      data: {
        projectId,
        type: "INVITE_SENT",
        message: `Portal invite generated for ${project.customer.email}. URL: ${portalUrl}`,
      },
    })
    return { portalUrl, emailSent: false, message: "Email service not configured" }
  }

  await resend.emails.send({
    from: `${project.organization.name} <noreply@solarintake.app>`,
    to: project.customer.email,
    subject: `Action Required: Upload documents for your solar project`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Hi ${project.customer.name},</h2>
        <p>${project.organization.name} needs some documents from you to move forward with your solar project.</p>
        <p>Please click the button below to access your secure portal and upload the required documents:</p>
        <a href="${portalUrl}" style="background: #f59e0b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 16px 0;">
          Upload Documents
        </a>
        <p>This link expires in 7 days.</p>
        <p>Thank you!</p>
      </div>
    `,
  })

  await prisma.activityLog.create({
    data: {
      projectId,
      type: "INVITE_SENT",
      message: `Portal invite sent to ${project.customer.email}`,
    },
  })

  return { portalUrl, emailSent: true }
}

export async function sendMissingItemsReminder(projectId: string) {
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: {
      customer: true,
      organization: true,
      checklistItems: {
        where: { isRequired: true, isCompleted: false },
      },
    },
  })

  if (!project) throw new Error("Project not found")

  const missingItems = project.checklistItems
  if (missingItems.length === 0) {
    return { sent: false, message: "No missing items to remind about" }
  }

  const token = await generateMagicLinkToken(projectId)
  const portalUrl = getPortalUrl(token)

  const resend = getResend()
  if (!resend) {
    await prisma.activityLog.create({
      data: {
        projectId,
        type: "REMINDER_SENT",
        message: `Reminder generated for ${project.customer.email}. Missing: ${missingItems.map((i) => i.label).join(", ")}`,
      },
    })
    await prisma.project.update({
      where: { id: projectId },
      data: { lastReminderAt: new Date() },
    })
    return { sent: false, portalUrl, message: "Email service not configured" }
  }

  const itemList = missingItems.map((item) => `<li>${item.label}</li>`).join("")

  await resend.emails.send({
    from: `${project.organization.name} <noreply@solarintake.app>`,
    to: project.customer.email,
    subject: `Reminder: Documents still needed for your solar project`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Hi ${project.customer.name},</h2>
        <p>This is a friendly reminder that ${project.organization.name} is still waiting on some documents to proceed with your solar project.</p>
        <p><strong>Still needed:</strong></p>
        <ul>${itemList}</ul>
        <a href="${portalUrl}" style="background: #f59e0b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 16px 0;">
          Upload Now
        </a>
        <p>Thank you!</p>
      </div>
    `,
  })

  await prisma.activityLog.create({
    data: {
      projectId,
      type: "REMINDER_SENT",
      message: `Reminder sent to ${project.customer.email}. Missing: ${missingItems.map((i) => i.label).join(", ")}`,
    },
  })

  await prisma.project.update({
    where: { id: projectId },
    data: { lastReminderAt: new Date() },
  })

  return { sent: true, portalUrl }
}
