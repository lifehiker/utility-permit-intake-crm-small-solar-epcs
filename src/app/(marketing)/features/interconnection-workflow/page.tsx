import { SeoPageLayout } from "@/components/marketing/seo-page-layout"

export const metadata = {
  title: "Solar Interconnection Workflow Feature — Track PTO | SolarIntake",
  description:
    "Manage utility interconnection applications from submission to Permission to Operate. Document checklist, stage tracking, and automated reminders for solar EPCs.",
}

export default function InterconnectionWorkflowFeaturePage() {
  return (
    <SeoPageLayout
      title="Utility Interconnection Workflow"
      subtitle="From Application to Permission to Operate"
      heroDescription="The interconnection stage is where solar projects stall most. SolarIntake keeps every application moving with document checklists, status tracking, and deadline reminders."
      problem="Utility interconnection applications get lost in email threads. Utilities reject incomplete applications. Missing one document delays PTO by 30-60 days and holds up your final payment."
      checklistItems={[
        "Interconnection application form",
        "Single-line electrical diagram",
        "Equipment list and specifications",
        "UL 1741 certifications",
        "Site plan",
        "Commissioning test results",
        "Signed interconnection agreement",
        "Permission to Operate letter",
        "Net metering enrollment confirmation",
      ]}
      howItWorks={[
        {
          step: "Interconnection application stage",
          description: "Move project to Utility Interconnection. Pre-populated checklist shows all required documents by utility.",
        },
        {
          step: "Submit application",
          description: "Upload complete application package. Log submission date and utility reference number.",
        },
        {
          step: "Track utility requests",
          description: "When utility requests additional info, log it in activity feed. Upload supplemental documents.",
        },
        {
          step: "PTO received — project complete",
          description: "Upload PTO letter. Mark project complete. Activity log creates a full paper trail for your records.",
        },
      ]}
    />
  )
}
