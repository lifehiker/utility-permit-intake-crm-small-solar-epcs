import { SeoPageLayout } from "@/components/marketing/seo-page-layout"

export const metadata = {
  title: "Solar Utility Bill Intake Software — Automate Document Collection | SolarIntake",
  description:
    "Stop emailing customers for utility bills. SolarIntake automates utility bill collection for solar proposals with a branded customer portal. Try free for 14 days.",
}

export default function SolarUtilityBillIntakePage() {
  return (
    <SeoPageLayout
      title="Solar Utility Bill Intake Software"
      subtitle="Automate Document Collection"
      heroDescription="Stop chasing customers for utility bills via email and text. Send a branded portal link and let customers upload directly — utility bills, 12-month usage, rate schedules."
      problem="Most small solar EPCs spend 2-3 hours per residential project just collecting utility bills, usage history, and account numbers. Back-and-forth emails delay proposals by days or weeks, costing you deals."
      checklistItems={[
        "Most recent utility bill (PDF)",
        "12-month usage history (PDF or CSV)",
        "Utility account number",
        "Current rate schedule / tariff",
        "Signed utility authorization form",
        "Interval data file (15-min or hourly)",
        "Net metering agreement (if applicable)",
        "Utility meter photos",
      ]}
      howItWorks={[
        {
          step: "Create intake project",
          description: "Enter customer name, email, and address. Select the residential or commercial intake template.",
        },
        {
          step: "Send branded portal link",
          description: "One click generates a secure link. Customer receives an email with your company branding.",
        },
        {
          step: "Customer uploads directly",
          description: "Customers upload utility bills, usage history, and documents without creating an account.",
        },
        {
          step: "Get notified and advance stage",
          description: "See completion in real-time. Move to proposal prep when all documents are uploaded.",
        },
      ]}
    />
  )
}
