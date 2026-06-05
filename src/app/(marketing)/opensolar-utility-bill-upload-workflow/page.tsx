import { SeoPageLayout } from "@/components/marketing/seo-page-layout"

export const metadata = {
  title: "OpenSolar Utility Bill Upload Workflow — SolarIntake",
  description:
    "Streamline utility bill and usage data collection before designing in OpenSolar. Branded intake portal, automated reminders, one-click export ready for OpenSolar import.",
}

export default function OpenSolarWorkflowPage() {
  return (
    <SeoPageLayout
      title="OpenSolar Utility Bill Upload Workflow"
      subtitle="Get the Data OpenSolar Needs, Faster"
      heroDescription="OpenSolar needs accurate utility data to design the right solar system. SolarIntake is the intake layer that collects and organizes everything before you open OpenSolar."
      problem="OpenSolar is great at design, but it doesn't help you collect utility bills, usage history, and rate schedules from customers. That pre-design phase is manual, slow, and error-prone."
      checklistItems={[
        "12-month utility bills (for OpenSolar load profile)",
        "kWh usage by month",
        "Peak demand (kW) for commercial",
        "Utility rate schedule",
        "Time-of-use rate period info",
        "Net metering eligibility docs",
        "Utility account number",
        "Signed data authorization",
      ]}
      howItWorks={[
        {
          step: "Create intake project before OpenSolar design",
          description: "Use SolarIntake to collect all utility data before starting your OpenSolar design.",
        },
        {
          step: "Customer uploads to branded portal",
          description: "Send your customer a branded link. They upload utility bills and usage history directly.",
        },
        {
          step: "All documents in one place",
          description: "No more email attachments. View and download all customer documents from SolarIntake.",
        },
        {
          step: "Import data into OpenSolar",
          description: "Download collected usage data and import into OpenSolar for accurate system sizing.",
        },
      ]}
    />
  )
}
