import { SeoPageLayout } from "@/components/marketing/seo-page-layout"

export const metadata = {
  title: "HelioScope Utility Data Intake Workflow — SolarIntake",
  description:
    "Collect utility consumption data before designing in HelioScope. Branded customer portal for utility bill uploads, automated reminders, and CSV export for HelioScope.",
}

export default function HelioScopeWorkflowPage() {
  return (
    <SeoPageLayout
      title="HelioScope Utility Data Intake Workflow"
      subtitle="Pre-Design Data Collection for HelioScope"
      heroDescription="HelioScope is powerful solar design software, but it needs accurate consumption data to work with. SolarIntake automates the data collection step so you can design faster."
      problem="Before you can start a HelioScope energy model, you need monthly consumption data. Getting this from customers — especially commercial clients with interval data needs — takes days of back-and-forth."
      checklistItems={[
        "Monthly kWh usage (12 months)",
        "15-minute interval data (commercial)",
        "Peak demand data by month",
        "Utility rate schedule for tariff modeling",
        "Demand charges and TOU rate periods",
        "Utility account number",
        "Signed authorization form",
        "Any existing solar system data",
      ]}
      howItWorks={[
        {
          step: "Create project with data collection template",
          description: "Use HelioScope-focused intake template that requests interval data and demand data for commercial projects.",
        },
        {
          step: "Request data from facility manager",
          description: "For commercial projects, send portal link to the facility or operations manager, not just the contact.",
        },
        {
          step: "Collect and verify completeness",
          description: "SolarIntake tracks completeness. See at a glance if you have all 12 months before starting the energy model.",
        },
        {
          step: "Export and import to HelioScope",
          description: "Download interval data CSV and upload directly into HelioScope for precise energy modeling.",
        },
      ]}
    />
  )
}
