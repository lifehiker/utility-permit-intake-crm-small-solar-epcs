import { SeoPageLayout } from "@/components/marketing/seo-page-layout"

export const metadata = {
  title: "Solar Proposal Utility Data Portal — Branded Document Collection | SolarIntake",
  description:
    "White-label utility data portal for solar proposals. Customers upload utility bills and usage data through your branded portal. No accounts needed.",
}

export default function SolarProposalPortalPage() {
  return (
    <SeoPageLayout
      title="Solar Proposal Utility Data Portal"
      subtitle="Branded Customer Upload Experience"
      heroDescription="Give customers a professional, branded portal to submit their utility data. No logins, no confusion — just a simple link that collects everything you need for a solar proposal."
      problem="Generic document request emails look unprofessional and confuse customers. A branded portal increases completion rates and makes your company look polished from day one."
      checklistItems={[
        "Recent utility bill (last 30-60 days)",
        "12-month usage history",
        "Utility rate schedule",
        "Signed data authorization form",
        "Utility account number",
        "Roof photos (front and back)",
        "Electrical panel photo",
        "HOA contact info (if applicable)",
      ]}
      howItWorks={[
        {
          step: "Customize your portal",
          description: "Add your company logo, brand color, and contact info. Takes 2 minutes to set up.",
        },
        {
          step: "Generate unique links",
          description: "Each customer gets a unique, secure link tied to their project.",
        },
        {
          step: "Customers upload easily",
          description: "Mobile-friendly portal. Customers can upload from their phone photos or computer.",
        },
        {
          step: "All docs in one place",
          description: "View all uploaded documents per project. Download any file or export to CSV.",
        },
      ]}
    />
  )
}
