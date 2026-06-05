import { PrismaClient } from "@prisma/client"
import { PrismaLibSql } from "@prisma/adapter-libsql"

const dbUrl = process.env.DATABASE_URL || "file:./dev.db"
const adapter = new PrismaLibSql({ url: dbUrl })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log("Seeding database...")

  // Residential Solar Proposal Intake
  const residential = await prisma.checklistTemplate.upsert({
    where: { id: "template-residential" },
    update: {},
    create: {
      id: "template-residential",
      name: "Residential Solar Proposal Intake",
      description: "Standard document checklist for residential solar proposals",
      projectType: "RESIDENTIAL",
      isDefault: true,
      items: {
        create: [
          { label: "Recent utility bill (last 30 days)", category: "UTILITY_BILL", isRequired: true, sortOrder: 1 },
          { label: "12-month usage history PDF", category: "USAGE_DATA", isRequired: true, sortOrder: 2 },
          { label: "Interval data file (15-min)", category: "USAGE_DATA", isRequired: false, sortOrder: 3 },
          { label: "Current rate schedule", category: "RATE_SCHEDULE", isRequired: true, sortOrder: 4 },
          { label: "Utility account number", category: "UTILITY_BILL", isRequired: true, sortOrder: 5 },
          { label: "Signed authorization form", category: "AUTHORIZATION", isRequired: true, sortOrder: 6 },
          { label: "Site/roof photos", category: "SITE_DOCUMENTS", isRequired: true, sortOrder: 7 },
          { label: "Electrical panel photos", category: "SITE_DOCUMENTS", isRequired: true, sortOrder: 8 },
          { label: "Shading report or photos", category: "SITE_DOCUMENTS", isRequired: false, sortOrder: 9 },
        ],
      },
    },
  })

  // Commercial Solar Proposal Intake
  const commercial = await prisma.checklistTemplate.upsert({
    where: { id: "template-commercial" },
    update: {},
    create: {
      id: "template-commercial",
      name: "Commercial Solar Proposal Intake",
      description: "Extended document checklist for commercial solar proposals",
      projectType: "COMMERCIAL",
      isDefault: true,
      items: {
        create: [
          { label: "Recent utility bill (last 30 days)", category: "UTILITY_BILL", isRequired: true, sortOrder: 1 },
          { label: "12-month usage history PDF", category: "USAGE_DATA", isRequired: true, sortOrder: 2 },
          { label: "Demand/interval data (12 months, 15-min)", category: "USAGE_DATA", isRequired: true, sortOrder: 3 },
          { label: "Current rate schedule / tariff", category: "RATE_SCHEDULE", isRequired: true, sortOrder: 4 },
          { label: "Utility tariff schedule", category: "RATE_SCHEDULE", isRequired: true, sortOrder: 5 },
          { label: "Utility account number", category: "UTILITY_BILL", isRequired: true, sortOrder: 6 },
          { label: "Signed authorization form", category: "AUTHORIZATION", isRequired: true, sortOrder: 7 },
          { label: "Site/roof photos", category: "SITE_DOCUMENTS", isRequired: true, sortOrder: 8 },
          { label: "Electrical panel photos", category: "SITE_DOCUMENTS", isRequired: true, sortOrder: 9 },
          { label: "Single-line electrical diagram", category: "SITE_DOCUMENTS", isRequired: false, sortOrder: 10 },
          { label: "Roof structural report", category: "SITE_DOCUMENTS", isRequired: false, sortOrder: 11 },
        ],
      },
    },
  })

  // AHJ Permit Checklist
  const ahj = await prisma.checklistTemplate.upsert({
    where: { id: "template-ahj" },
    update: {},
    create: {
      id: "template-ahj",
      name: "AHJ Permit Checklist",
      description: "Documents required for AHJ permit application submission",
      isDefault: true,
      items: {
        create: [
          { label: "Site plan with module layout", category: "AHJ_PERMIT", isRequired: true, sortOrder: 1 },
          { label: "Structural calculations", category: "AHJ_PERMIT", isRequired: true, sortOrder: 2 },
          { label: "Electrical diagrams (single-line)", category: "AHJ_PERMIT", isRequired: true, sortOrder: 3 },
          { label: "Equipment specification sheets", category: "AHJ_PERMIT", isRequired: true, sortOrder: 4 },
          { label: "AHJ permit application form", category: "AHJ_PERMIT", isRequired: true, sortOrder: 5 },
          { label: "HOA approval letter", category: "AHJ_PERMIT", isRequired: false, sortOrder: 6 },
          { label: "Utility interconnection application", category: "INTERCONNECTION", isRequired: true, sortOrder: 7 },
          { label: "Contractor license copy", category: "AHJ_PERMIT", isRequired: false, sortOrder: 8 },
        ],
      },
    },
  })

  // Utility Interconnection Checklist
  const interconnection = await prisma.checklistTemplate.upsert({
    where: { id: "template-interconnection" },
    update: {},
    create: {
      id: "template-interconnection",
      name: "Utility Interconnection Checklist",
      description: "Documents required for utility interconnection application and PTO",
      isDefault: true,
      items: {
        create: [
          { label: "Interconnection application form", category: "INTERCONNECTION", isRequired: true, sortOrder: 1 },
          { label: "Single-line diagram", category: "INTERCONNECTION", isRequired: true, sortOrder: 2 },
          { label: "Equipment list with specs", category: "INTERCONNECTION", isRequired: true, sortOrder: 3 },
          { label: "Site survey results", category: "INTERCONNECTION", isRequired: false, sortOrder: 4 },
          { label: "Utility approval letter", category: "INTERCONNECTION", isRequired: false, sortOrder: 5 },
          { label: "Permission to Operate (PTO)", category: "INTERCONNECTION", isRequired: true, sortOrder: 6 },
          { label: "Signed interconnection agreement", category: "INTERCONNECTION", isRequired: true, sortOrder: 7 },
          { label: "Net metering enrollment confirmation", category: "INTERCONNECTION", isRequired: false, sortOrder: 8 },
        ],
      },
    },
  })

  console.log("Seeded templates:", residential.id, commercial.id, ahj.id, interconnection.id)
  console.log("Database seeded successfully!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
