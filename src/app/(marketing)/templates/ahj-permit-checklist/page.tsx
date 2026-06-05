import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, ArrowRight } from "lucide-react"

export const metadata = {
  title: "AHJ Solar Permit Checklist — Documents Required for Solar Permits | SolarIntake",
  description:
    "Complete AHJ permit checklist for residential and commercial solar installations. Know exactly what documents to prepare before submitting to your Authority Having Jurisdiction.",
}

const AHJ_CHECKLIST = [
  {
    category: "Site Plan",
    items: [
      "Site plan with north arrow and property lines",
      "Roof layout with module placement",
      "Setback dimensions from roof edges",
      "Module quantity, layout, and orientation",
      "String layout diagram",
    ],
  },
  {
    category: "Structural",
    items: [
      "Structural calculations (signed by PE if required)",
      "Roof framing plan",
      "Mount attachment details",
      "Loading analysis (dead, live, wind, snow)",
      "Existing structural reports (if required)",
    ],
  },
  {
    category: "Electrical",
    items: [
      "Single-line electrical diagram",
      "Electrical schedule (panel schedule)",
      "Wiring diagram",
      "Inverter manufacturer spec sheet",
      "Module manufacturer spec sheet",
      "Battery storage specs (if applicable)",
      "AC disconnect details",
      "Utility interconnection point detail",
    ],
  },
  {
    category: "Application Forms",
    items: [
      "AHJ permit application form",
      "Property owner authorization",
      "Contractor license copy",
      "Insurance certificate",
      "HOA approval letter (if required)",
      "Historical review approval (if applicable)",
    ],
  },
]

export default function AHJPermitChecklistPage() {
  return (
    <div>
      <section className="py-20 px-4 bg-gradient-to-br from-amber-50 to-white text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AHJ Solar Permit Checklist</h1>
          <p className="text-xl text-gray-600 mb-4">
            The complete list of documents required to submit a residential or commercial solar permit to your Authority Having Jurisdiction.
          </p>
          <p className="text-sm text-gray-500">
            Requirements vary by AHJ — verify with your local building department.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto space-y-6">
          {AHJ_CHECKLIST.map((section) => (
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

      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Permit Tracking Workflow</h2>
          <div className="space-y-4">
            {[
              { step: "Pre-submission", desc: "Collect all site, structural, and electrical documents from design team." },
              { step: "Submit to AHJ", desc: "Upload completed package to AHJ portal or submit in person. Note submission date." },
              { step: "Track review status", desc: "Log any correction requests. Upload revised documents when required." },
              { step: "Permit issued", desc: "Upload issued permit. Schedule installation inspection date." },
              { step: "Final inspection", desc: "Pass final inspection. Move to utility interconnection stage." },
            ].map((step, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  {i + 1}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{step.step}</p>
                  <p className="text-sm text-gray-600">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-amber-500 text-center">
        <h2 className="text-2xl font-bold text-white mb-3">Track permits automatically in SolarIntake</h2>
        <p className="text-amber-100 mb-6">This checklist is built into SolarIntake. Track every project through AHJ submission to approval.</p>
        <Link href="/signup">
          <Button size="lg" className="bg-white text-amber-600 hover:bg-amber-50">
            Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </section>
    </div>
  )
}
