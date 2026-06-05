import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, ArrowRight } from "lucide-react"

export const metadata = {
  title: "Pricing — SolarIntake CRM for Solar EPCs",
  description:
    "Simple, transparent pricing for solar EPC project intake. Starter $149/month, Pro $299/month, Team $499/month. 14-day free trial.",
}

const plans = [
  {
    name: "Starter",
    price: 149,
    description: "For solo installers and small shops",
    projects: 25,
    members: 3,
    features: [
      "25 active projects",
      "3 team members",
      "Residential & commercial templates",
      "Branded customer portal",
      "Document upload & storage",
      "Email reminders",
      "CSV export",
      "Email support",
    ],
  },
  {
    name: "Pro",
    price: 299,
    description: "For growing solar installation teams",
    projects: 100,
    members: 10,
    popular: true,
    features: [
      "100 active projects",
      "10 team members",
      "All Starter features",
      "AHJ permit checklists",
      "Interconnection workflow",
      "Custom checklist templates",
      "Priority support",
      "API access",
    ],
  },
  {
    name: "Team",
    price: 499,
    description: "For established EPCs with multiple crews",
    projects: 500,
    members: 50,
    features: [
      "500 active projects",
      "50 team members",
      "All Pro features",
      "Custom branding",
      "Bulk project import",
      "Dedicated onboarding",
      "SLA support",
      "SSO (coming soon)",
    ],
  },
]

const addons = [
  {
    name: "Onboarding & Setup",
    price: 750,
    description: "White-glove setup: custom templates, team training, CRM migration from spreadsheets.",
  },
]

export default function PricingPage() {
  return (
    <div>
      <section className="py-20 px-4 bg-gradient-to-b from-amber-50 to-white text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Simple, transparent pricing</h1>
        <p className="text-xl text-gray-600 mb-2">Start free for 14 days. No credit card required.</p>
        <p className="text-sm text-gray-500">Cancel anytime.</p>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`relative ${plan.popular ? "border-amber-400 shadow-lg scale-105" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                    MOST POPULAR
                  </div>
                )}
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <p className="text-gray-500 text-sm">{plan.description}</p>
                  <div className="mt-2">
                    <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                    <span className="text-gray-500">/month</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    {plan.projects} projects · {plan.members} members
                  </p>
                </CardHeader>
                <CardContent>
                  <Link href="/signup">
                    <Button
                      className={`w-full mb-6 ${
                        plan.popular
                          ? "bg-amber-500 hover:bg-amber-600 text-white"
                          : ""
                      }`}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <ul className="space-y-2">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{f}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Professional Add-ons</h2>
          {addons.map((addon) => (
            <Card key={addon.name}>
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{addon.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{addon.description}</p>
                </div>
                <div className="text-right flex-shrink-0 ml-6">
                  <p className="text-2xl font-bold text-gray-900">${addon.price}</p>
                  <p className="text-xs text-gray-500">one-time</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                q: "Can I switch plans anytime?",
                a: "Yes. You can upgrade or downgrade at any time. Changes take effect at the next billing cycle.",
              },
              {
                q: "What happens to my data if I cancel?",
                a: "You can export all your data as CSV at any time. After cancellation, you have 30 days to export before data is removed.",
              },
              {
                q: "Is customer portal access included?",
                a: "Yes. All plans include unlimited customer portal access. Customers never need to create an account.",
              },
              {
                q: "Do you integrate with OpenSolar or HelioScope?",
                a: "You can export project data as CSV and import into any proposal software. Direct integrations are on our roadmap.",
              },
            ].map((item) => (
              <div key={item.q} className="border-b pb-4">
                <h3 className="font-medium text-gray-900 mb-2">{item.q}</h3>
                <p className="text-sm text-gray-600">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-amber-500 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Start your free 14-day trial</h2>
        <p className="text-amber-100 mb-6">No credit card required. Full access to all Pro features.</p>
        <Link href="/signup">
          <Button size="lg" className="bg-white text-amber-600 hover:bg-amber-50">
            Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </section>
    </div>
  )
}
