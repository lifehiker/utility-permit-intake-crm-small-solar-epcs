import { SeoPageLayout } from "@/components/marketing/seo-page-layout"

export const metadata = {
  title: "Utility Bill Intake Feature — Solar Document Collection | SolarIntake",
  description:
    "Automate utility bill collection from solar customers. Branded portal, automated reminders, and organized document storage. No more email attachments.",
}

export default function UtilityBillIntakePage() {
  return (
    <SeoPageLayout
      title="Utility Bill Intake for Solar Projects"
      subtitle="Feature Overview"
      heroDescription="Replace the utility bill email chain with a professional intake portal. Customers upload directly. You get organized files, not scattered email attachments."
      problem="Collecting utility bills by email creates chaos: wrong formats, missing months, files buried in inbox threads. One project might generate 20+ emails just to get a complete utility package."
      checklistItems={[
        "Latest monthly bill (PDF or photo)",
        "12-month usage summary",
        "Rate schedule / tariff class",
        "Utility account number",
        "Net metering agreement",
        "Tiered rate usage breakdown",
        "EV charging history (if applicable)",
        "Solar production data (existing system)",
      ]}
      howItWorks={[
        {
          step: "Customer receives portal link",
          description: "Branded email with a secure portal link. No password needed. Opens in any browser or mobile.",
        },
        {
          step: "Upload from utility website or app",
          description: "Portal shows instructions for downloading from major utilities (PG&E, SCE, ConEd, etc.).",
        },
        {
          step: "Files auto-organized by project",
          description: "Every uploaded file is attached to the right checklist item and project automatically.",
        },
        {
          step: "Checklist marks complete",
          description: "When customer uploads a file, the checklist item shows green. You see progress in real-time.",
        },
      ]}
    />
  )
}
