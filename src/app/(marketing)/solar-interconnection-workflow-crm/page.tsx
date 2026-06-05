import { SeoPageLayout } from "@/components/marketing/seo-page-layout"

export const metadata = {
  title: "Solar Interconnection Workflow CRM — Track Utility Applications | SolarIntake",
  description:
    "Manage solar interconnection applications from submission to Permission to Operate. Track required documents, utility correspondence, and approval status.",
}

export default function InterconnectionWorkflowPage() {
  return (
    <SeoPageLayout
      title="Solar Interconnection Workflow CRM"
      subtitle="From Application to Permission to Operate"
      heroDescription="Stop tracking interconnection applications in spreadsheets. SolarIntake manages every document, every step, and every deadline in your utility interconnection workflow."
      problem="Utility interconnection is the last mile of solar project completion — and the most likely to stall. Missing documents, wrong forms, or delayed follow-ups can delay Permission to Operate by months."
      checklistItems={[
        "Interconnection application form",
        "Single-line electrical diagram",
        "Equipment list with specs",
        "Site survey results",
        "Inverter spec sheets",
        "Meter socket upgrade (if required)",
        "Utility approval letter",
        "System commissioning report",
        "Permission to Operate (PTO) letter",
        "Net metering enrollment form",
        "Interconnection agreement signed copy",
      ]}
      howItWorks={[
        {
          step: "Start interconnection stage",
          description: "Move project to Utility Interconnection stage. Checklist auto-populates with required documents.",
        },
        {
          step: "Submit application",
          description: "Upload completed interconnection application and single-line diagram. Note submission date in activity log.",
        },
        {
          step: "Track utility correspondence",
          description: "Log all utility responses. Upload additional documents when requested by the utility.",
        },
        {
          step: "Record PTO and close",
          description: "Upload Permission to Operate letter. Mark project complete. Customer receives confirmation.",
        },
      ]}
    />
  )
}
