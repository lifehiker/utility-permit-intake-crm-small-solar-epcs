"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Download, ArrowRight } from "lucide-react"

const RESIDENTIAL_CHECKLIST = [
  { category: "Utility Bill", items: ["Most recent utility bill (last 30 days)", "Utility account number", "Service address confirmation"] },
  { category: "Usage Data", items: ["12-month usage history PDF", "Interval data file (optional, 15-min)"] },
  { category: "Rate Schedule", items: ["Current rate schedule / tariff name", "Net metering eligibility"] },
  { category: "Authorization", items: ["Signed utility authorization form", "Property owner confirmation"] },
  { category: "Site Documents", items: ["Site/roof photos (aerial if available)", "Electrical panel photos (front and inside)", "Shading obstructions photos", "Roof age documentation"] },
]

const COMMERCIAL_CHECKLIST = [
  { category: "Utility Data", items: ["12-month utility bills", "15-minute interval data (CSV)", "Peak demand by month", "Current rate schedule / tariff"] },
  { category: "Site Documents", items: ["Roof plan / CAD drawings", "Single-line electrical diagram", "Panel schedule", "Structural drawings or report"] },
  { category: "Business Documents", items: ["Property owner authorization", "Tenant/landlord agreement", "Building permit history", "HOA/commercial association approval"] },
]

export default function SolarIntakeChecklistPage() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div>
      <section className="py-20 px-4 bg-gradient-to-br from-amber-50 to-white text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Solar Project Intake Checklist</h1>
          <p className="text-xl text-gray-600 mb-6">
            The complete list of documents you need to collect from customers before designing a residential or commercial solar system.
          </p>
          <p className="text-sm text-gray-500">Free template — used by 500+ solar EPCs</p>
        </div>
      </section>

      {/* Email capture */}
      <section className="py-8 px-4 bg-amber-500">
        <div className="max-w-lg mx-auto">
          {submitted ? (
            <div className="text-center text-white">
              <CheckCircle className="h-8 w-8 mx-auto mb-2" />
              <p className="font-medium">Checklist sent! Check your email.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-3">
              <div className="flex-1">
                <Label htmlFor="email" className="text-white text-sm mb-1 block">
                  Get the PDF checklist free:
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="bg-white"
                />
              </div>
              <Button type="submit" className="bg-white text-amber-600 hover:bg-amber-50 self-end">
                <Download className="h-4 w-4 mr-2" />
                Get PDF
              </Button>
            </form>
          )}
        </div>
      </section>

      {/* Residential checklist */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Residential Solar Intake Checklist</h2>
          <div className="space-y-6">
            {RESIDENTIAL_CHECKLIST.map((section) => (
              <Card key={section.category}>
                <CardContent className="p-5">
                  <h3 className="font-semibold text-gray-900 mb-3">{section.category}</h3>
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
        </div>
      </section>

      {/* Commercial checklist */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Commercial Solar Intake Checklist</h2>
          <div className="space-y-6">
            {COMMERCIAL_CHECKLIST.map((section) => (
              <Card key={section.category}>
                <CardContent className="p-5">
                  <h3 className="font-semibold text-gray-900 mb-3">{section.category}</h3>
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
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-amber-500 text-center">
        <h2 className="text-2xl font-bold text-white mb-3">Use this checklist automatically in SolarIntake</h2>
        <p className="text-amber-100 mb-6">Send customers a branded portal link. They upload. You get notified.</p>
        <Link href="/signup">
          <Button size="lg" className="bg-white text-amber-600 hover:bg-amber-50">
            Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </section>
    </div>
  )
}
