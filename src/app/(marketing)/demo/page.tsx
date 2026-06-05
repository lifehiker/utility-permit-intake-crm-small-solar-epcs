"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Calendar, Video, MessageSquare } from "lucide-react"

export default function DemoPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div>
      <section className="py-20 px-4 bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Book a 30-minute demo</h1>
          <p className="text-xl text-gray-600">
            See how SolarIntake can help your team collect documents faster and close more solar deals.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What we&apos;ll cover</h2>
            <ul className="space-y-4">
              {[
                "Live walkthrough of the customer portal",
                "Setting up your first intake template",
                "Tracking projects through permit stages",
                "Sending automated reminders",
                "Exporting data for OpenSolar or HelioScope",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 text-gray-600">
                <Calendar className="h-5 w-5 text-amber-500" />
                <span className="text-sm">30-minute session</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Video className="h-5 w-5 text-amber-500" />
                <span className="text-sm">Video call (Zoom or Google Meet)</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <MessageSquare className="h-5 w-5 text-amber-500" />
                <span className="text-sm">Q&A included</span>
              </div>
            </div>
          </div>

          <div>
            {submitted ? (
              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-8 text-center">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-green-800 mb-2">Request received!</h3>
                  <p className="text-green-700">
                    We&apos;ll reach out within 1 business day to schedule your demo.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Request a demo</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Your name</Label>
                      <Input
                        id="name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Jane Smith"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Work email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="jane@solarco.com"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="company">Company name</Label>
                      <Input
                        id="company"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        placeholder="Solar Pro LLC"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="message">What&apos;s your biggest intake challenge?</Label>
                      <Textarea
                        id="message"
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="We spend too much time emailing customers for utility bills..."
                        rows={3}
                      />
                    </div>
                    <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-white">
                      Request Demo
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
