import { SeoPageLayout } from "@/components/marketing/seo-page-layout"

export const metadata = {
  title: "Solar Permit Tracking Feature — AHJ and Interconnection | SolarIntake",
  description:
    "Track solar permit applications from submission to approval. AHJ permit checklist, stage management, and activity logging for solar installation companies.",
}

export default function PermitTrackingPage() {
  return (
    <SeoPageLayout
      title="Solar Permit Tracking"
      subtitle="AHJ Submission to Approval"
      heroDescription="Know exactly where every solar permit stands. SolarIntake tracks document completeness, submission status, and correction requests across all your active projects."
      problem="Spreadsheet permit tracking fails when you have more than 10 active projects. Missing a correction request deadline or submitting an incomplete package means weeks of delay."
      checklistItems={[
        "Pre-submission document checklist",
        "AHJ application forms by jurisdiction",
        "Structural and electrical drawings",
        "Submission date tracking",
        "Correction request logging",
        "Revised document uploads",
        "Permit issuance tracking",
        "Inspection scheduling status",
      ]}
      howItWorks={[
        {
          step: "Permit Prep stage",
          description: "When project moves to Permit Prep, the AHJ checklist activates. See exactly what drawings and forms are needed.",
        },
        {
          step: "AHJ Submitted stage",
          description: "Mark submission date. Log permit number. Set expected review timeline.",
        },
        {
          step: "Track corrections",
          description: "When AHJ requests corrections, log the request, upload revised documents, track resubmission.",
        },
        {
          step: "Permit issued",
          description: "Upload issued permit. Move to Utility Interconnection stage. Activity log timestamps everything.",
        },
      ]}
    />
  )
}
