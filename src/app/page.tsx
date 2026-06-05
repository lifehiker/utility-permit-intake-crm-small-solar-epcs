import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MarketingNav } from "@/components/marketing/nav"
import { MarketingFooter } from "@/components/marketing/footer"
import {
  CheckCircle,
  ArrowRight,
  FileText,
  Building2,
  Bell,
  Zap,
  Shield,
  Clock,
} from "lucide-react"

export const metadata = {
  title: "SolarIntake — Utility Permit Intake CRM for Small Solar EPCs",
  description:
    "Stop chasing utility bills by email. Branded solar intake portal for document collection, permit tracking, and interconnection workflows.",
}

const features = [
  {
    icon: FileText,
    title: "Automated Document Checklist",
    description:
      "Send customers a branded portal link. They upload exactly what you need — utility bills, usage data, authorization forms.",
  },
  {
    icon: Building2,
    title: "Branded Customer Portal",
    description:
      "White-label intake portals with your logo and brand color. Customers see your brand, not generic software.",
  },
  {
    icon: Zap,
    title: "Project Stage Tracking",
    description:
      "Track every project from New Intake through AHJ Submission and Utility Interconnection to Complete.",
  },
  {
    icon: Bell,
    title: "Automatic Reminders",
    description:
      "Automatically remind customers about missing documents so you never have to chase them manually again.",
  },
  {
    icon: Shield,
    title: "AHJ & Permit Ready",
    description:
      "Built-in AHJ permit and utility interconnection checklists. Know exactly what you need before submission.",
  },
  {
    icon: Clock,
    title: "Close Deals 2x Faster",
    description:
      "Reduce intake time from weeks to days. Get all documents before site visits to avoid costly return trips.",
  },
]

const steps = [
  {
    step: "1",
    title: "Create a project",
    description: "Enter customer info, select a template (residential, commercial, AHJ, interconnection).",
  },
  {
    step: "2",
    title: "Send portal link",
    description: "One click generates a branded link. Customer gets an email with exactly what to upload.",
  },
  {
    step: "3",
    title: "Track & close",
    description: "Monitor completeness in real-time. Advance stage when ready. Export for your proposal software.",
  },
]

const integrations = ["OpenSolar", "HelioScope", "Aurora Solar", "SolarEdge", "Enphase"]

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <MarketingNav />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-amber-50 via-white to-amber-50 py-24 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              <Zap className="h-3.5 w-3.5" />
              Purpose-built for small solar EPCs
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Stop chasing utility bills by email.
              <br />
              <span className="text-amber-500">Your branded solar intake portal.</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              SolarIntake automates document collection from homeowners and commercial customers. Send a
              branded portal link. They upload. You close deals faster.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/signup">
                <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white text-base px-8">
                  Start 14-Day Free Trial <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button size="lg" variant="outline" className="text-base px-8">
                  Book a Demo
                </Button>
              </Link>
            </div>
            <p className="text-sm text-gray-500">No credit card required. 14-day trial included.</p>
          </div>
        </section>

        {/* Social proof */}
        <section className="py-8 px-4 border-y bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm text-gray-500 mb-4">Works alongside your existing proposal software</p>
            <div className="flex flex-wrap justify-center gap-6 text-gray-400 font-medium text-sm">
              {integrations.map((i) => (
                <span key={i}>{i}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Everything you need to intake solar projects
              </h2>
              <p className="text-gray-600 max-w-xl mx-auto">
                From first contact to permit-ready in half the time.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature) => {
                const Icon = feature.icon
                return (
                  <Card key={feature.title} className="border-0 shadow-sm">
                    <CardContent className="p-6">
                      <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                        <Icon className="h-5 w-5 text-amber-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">How SolarIntake works</h2>
              <p className="text-gray-600">Three steps from contact to permit-ready</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step) => (
                <div key={step.step} className="text-center">
                  <div className="w-12 h-12 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Document checklist preview */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Residential solar proposal checklist
              </h2>
              <p className="text-gray-600">Built-in templates for every project type</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "Recent utility bill (last 30 days)",
                "12-month usage history PDF",
                "Current rate schedule",
                "Utility account number",
                "Signed authorization form",
                "Site/roof photos",
                "Electrical panel photos",
                "Interval data file (optional)",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 p-3 rounded-lg border bg-gray-50">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing preview */}
        <section className="py-20 px-4 bg-amber-50">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple, transparent pricing</h2>
            <p className="text-gray-600 mb-8">Starting at $149/month. Cancel anytime.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[
                { name: "Starter", price: "$149", projects: "25 projects", members: "3 team members" },
                { name: "Pro", price: "$299", projects: "100 projects", members: "10 team members", popular: true },
                { name: "Team", price: "$499", projects: "500 projects", members: "50 team members" },
              ].map((plan) => (
                <Card key={plan.name} className={`${plan.popular ? "border-amber-400 shadow-md" : ""}`}>
                  <CardContent className="p-5 text-center">
                    {plan.popular && (
                      <div className="bg-amber-500 text-white text-xs font-medium px-2 py-0.5 rounded-full mb-2 inline-block">
                        Most Popular
                      </div>
                    )}
                    <h3 className="font-bold text-gray-900 mb-1">{plan.name}</h3>
                    <p className="text-2xl font-bold text-amber-600 mb-2">{plan.price}<span className="text-sm text-gray-500">/mo</span></p>
                    <p className="text-xs text-gray-500">{plan.projects}</p>
                    <p className="text-xs text-gray-500">{plan.members}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Link href="/pricing">
              <Button variant="outline">View full pricing <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-4 bg-gray-900">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to close solar deals faster?
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Join small solar EPCs using SolarIntake to stop chasing documents and start closing projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white text-base px-8">
                  Start 14-Day Free Trial <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button size="lg" variant="outline" className="text-base px-8 border-gray-600 text-gray-300 hover:bg-gray-800">
                  Book a Demo
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <MarketingFooter />
    </div>
  )
}
