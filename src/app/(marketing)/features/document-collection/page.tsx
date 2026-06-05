import { SeoPageLayout } from "@/components/marketing/seo-page-layout"

export const metadata = {
  title: "Solar Document Collection Feature — Branded Intake Portal | SolarIntake",
  description:
    "Collect all solar project documents in one place. Branded customer portal, checklist tracking, file storage, and team access. Works for residential and commercial.",
}

export default function DocumentCollectionPage() {
  return (
    <SeoPageLayout
      title="Document Collection for Solar Projects"
      subtitle="Organized. Branded. Automatic."
      heroDescription="From utility bills to site photos to permit applications — SolarIntake collects and organizes every document across every stage of your solar project workflow."
      problem="Documents are scattered across email, text messages, Google Drive, and Dropbox. When a customer asks where their permit stands, nobody can find the right file fast."
      checklistItems={[
        "Utility bills and usage history",
        "Site and roof assessment photos",
        "Electrical panel and meter photos",
        "Signed customer authorization forms",
        "AHJ permit applications",
        "Structural and electrical drawings",
        "Equipment specification sheets",
        "Utility interconnection applications",
        "HOA approval letters",
        "Permission to Operate documents",
      ]}
      howItWorks={[
        {
          step: "Categorized checklists",
          description: "Documents are organized by category: Utility Data, Site, Permits, Interconnection. No more hunting.",
        },
        {
          step: "Multiple upload paths",
          description: "Your team can upload from the CRM. Customers upload via the portal. Both go to the same project.",
        },
        {
          step: "File versioning",
          description: "Multiple files can be uploaded per checklist item. Download any version, see who uploaded what.",
        },
        {
          step: "Export and share",
          description: "Download all project documents as a ZIP or export to CSV. Share with subcontractors or engineers.",
        },
      ]}
    />
  )
}
