import { SeoPageLayout } from "@/components/marketing/seo-page-layout"

export const metadata = {
  title: "Solar Installation CRM for Small Installers — SolarIntake",
  description:
    "Purpose-built CRM for small solar installation companies. Manage customers, documents, permits, and interconnection in one simple tool. Starts at $149/month.",
}

export default function SolarCrmSmallInstallersPage() {
  return (
    <SeoPageLayout
      title="Solar Installation CRM for Small Installers"
      subtitle="Built for Solo Installers & Small Teams"
      heroDescription="Not another generic CRM with a solar plugin. SolarIntake is purpose-built for small solar EPCs who need to manage document intake, permits, and interconnection — not sales pipelines."
      problem="Generic CRMs like Salesforce or HubSpot are overkill for small solar shops. You don't need a $500/month sales CRM — you need a simple tool that tracks what documents you have and what permits are pending."
      checklistItems={[
        "Customer utility bills and usage data",
        "Signed customer authorization",
        "Site assessment photos",
        "Permit applications by AHJ",
        "Structural and electrical drawings",
        "Equipment specifications",
        "Interconnection applications",
        "Permission to Operate documents",
      ]}
      howItWorks={[
        {
          step: "Set up in 5 minutes",
          description: "No complex setup. Add your company name and brand color. You're ready to create projects.",
        },
        {
          step: "Use built-in templates",
          description: "Four ready-to-use templates: Residential, Commercial, AHJ Permit, and Interconnection.",
        },
        {
          step: "Manage all projects",
          description: "Dashboard shows exactly what's blocked, what's pending, and what's ready to close.",
        },
        {
          step: "Add team members as you grow",
          description: "Invite employees or subcontractors. Assign projects. Everyone stays on the same page.",
        },
      ]}
    />
  )
}
