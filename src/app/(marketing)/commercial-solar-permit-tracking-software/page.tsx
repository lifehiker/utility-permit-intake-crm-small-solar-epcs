import { SeoPageLayout } from "@/components/marketing/seo-page-layout"

export const metadata = {
  title: "Commercial Solar Permit Tracking Software for Small EPCs | SolarIntake",
  description:
    "Track commercial solar permit applications from AHJ submission to approval. Document checklist, stage management, and team collaboration for solar EPCs.",
}

export default function CommercialPermitTrackingPage() {
  return (
    <SeoPageLayout
      title="Commercial Solar Permit Tracking Software"
      subtitle="AHJ to Interconnection"
      heroDescription="Manage commercial solar permit applications from intake to Permission to Operate. Track every document, every stage, and every deadline in one place."
      problem="Commercial solar permitting involves dozens of documents, multiple agencies, and weeks of back-and-forth. Spreadsheets don't cut it — permits fall through the cracks and delays cost thousands."
      checklistItems={[
        "Commercial utility bills (12 months)",
        "Demand/interval data (15-min)",
        "Single-line electrical diagram",
        "Site plan and roof layout",
        "Structural calculations",
        "Equipment specification sheets",
        "AHJ permit application form",
        "Utility interconnection application",
        "Roof structural report",
        "Fire safety compliance docs",
        "Electrical inspection sign-off",
        "HOA or commercial property approval",
      ]}
      howItWorks={[
        {
          step: "Create commercial project",
          description: "Select commercial template. Get a comprehensive checklist covering utility data, site docs, and permit requirements.",
        },
        {
          step: "Collect documents in stages",
          description: "Phase 1: utility data for proposal. Phase 2: site documents for permitting. Phase 3: AHJ and interconnection.",
        },
        {
          step: "Track permit stages",
          description: "Move projects through stages: Permit Prep → AHJ Submitted → Utility Interconnection → Complete.",
        },
        {
          step: "Keep team in sync",
          description: "Assign projects to team members. Everyone sees real-time status and missing documents.",
        },
      ]}
    />
  )
}
