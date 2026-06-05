import { SeoPageLayout } from "@/components/marketing/seo-page-layout"

export const metadata = {
  title: "12-Month Utility Usage Collection for Solar Proposals | SolarIntake",
  description:
    "Automatically collect 12-month utility usage history from solar customers. Branded upload portal, automated reminders, and one-click proposal data export.",
}

export default function TwelveMonthUsagePage() {
  return (
    <SeoPageLayout
      title="12-Month Utility Usage Collection for Solar"
      subtitle="Stop Chasing Usage History"
      heroDescription="Getting 12 months of utility usage data is the #1 bottleneck in solar proposal prep. SolarIntake makes it a one-click request — customers upload, you design."
      problem="Solar proposal software like OpenSolar and HelioScope need accurate consumption data. Getting customers to download and send 12 months of PDFs takes days. Customers forget, send wrong files, or send just one month."
      checklistItems={[
        "12-month usage history PDF from utility",
        "Monthly kWh breakdown (all 12 months)",
        "Peak demand data (commercial projects)",
        "Interval/smart meter data (15-min CSV)",
        "Annual kWh total",
        "Time-of-use breakdown if applicable",
        "Utility account number for verification",
        "Current rate schedule",
      ]}
      howItWorks={[
        {
          step: "Request usage history",
          description: "Create project, select usage data template. System automatically knows to request 12-month history.",
        },
        {
          step: "Portal sends clear instructions",
          description: "Customer portal explains exactly where to find usage history on their utility website.",
        },
        {
          step: "Auto-validate completeness",
          description: "SolarIntake checks that all 12 months are accounted for before marking the item complete.",
        },
        {
          step: "Export for proposal software",
          description: "Download all usage files in one click, ready to import into OpenSolar or HelioScope.",
        },
      ]}
    />
  )
}
