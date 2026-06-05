import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, ArrowRight } from "lucide-react"

export const metadata = {
  title: "Solar Utility Interconnection Checklist — Documents for PTO | SolarIntake",
  description:
    "Complete utility interconnection document checklist for solar installations. From application to Permission to Operate — know exactly what your utility needs.",
}

const INTERCONNECTION_CHECKLIST = [
  {
    category: "Application Package",
    items: [
      "Utility interconnection application form",
      "Application fee payment",
      "Single-line electrical diagram",
      "Equipment list with manufacturer specs",
      "Inverter UL 1741 certification",
      "Module certifications",
    ],
  },
  {
    category: "Technical Documents",
    items: [
      "Site plan showing system location",
      "System AC capacity (kW)",
      "Anti-islanding protection details",
      "Disconnect switch location diagram",
      "Battery storage configuration (if any)",
      "Point of common coupling details",
    ],
  },
  {
    category: "Post-Approval",
    items: [
      "Signed interconnection agreement",
      "Utility upgrade authorization (if required)",
      "Commissioning test results",
      "Utility inspection sign-off",
      "Permission to Operate letter",
      "Net metering enrollment confirmation",
    ],
  },
]

export default function InterconnectionChecklistPage() {
  return (
    <div>
      <section className="py-20 px-4 bg-gradient-to-br from-amber-50 to-white text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Solar Utility Interconnection Checklist
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Everything you need to submit a complete utility interconnection application and obtain Permission to Operate.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto space-y-6">
          {INTERCONNECTION_CHECKLIST.map((section) => (
            <Card key={section.category}>
              <CardContent className="p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">{section.category}</h2>
                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 bg-amber-500 text-center">
        <h2 className="text-2xl font-bold text-white mb-3">Track interconnection in SolarIntake</h2>
        <p className="text-amber-100 mb-6">Built-in interconnection workflow. Track every document from application to PTO.</p>
        <Link href="/signup">
          <Button size="lg" className="bg-white text-amber-600 hover:bg-amber-50">
            Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </section>
    </div>
  )
}
