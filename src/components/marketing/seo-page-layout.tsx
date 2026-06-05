import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowRight } from "lucide-react"

interface SeoPageLayoutProps {
  title: string
  subtitle: string
  heroDescription: string
  problem: string
  checklistItems: string[]
  howItWorks: { step: string; description: string }[]
  children?: React.ReactNode
}

export function SeoPageLayout({
  title,
  subtitle,
  heroDescription,
  problem,
  checklistItems,
  howItWorks,
  children,
}: SeoPageLayoutProps) {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-50 to-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-amber-100 text-amber-800 text-sm font-medium px-3 py-1 rounded-full mb-4">
            {subtitle}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{title}</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">{heroDescription}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white">
                Start 14-Day Free Trial <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/demo">
              <Button size="lg" variant="outline">Book a Demo</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-red-800 mb-2">The Problem</h2>
            <p className="text-red-700">{problem}</p>
          </div>
        </div>
      </section>

      {/* Document Checklist */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Documents Collected Automatically</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {checklistItems.map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-lg border">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How It Works</h2>
          <div className="space-y-6">
            {howItWorks.map((step, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{step.step}</h3>
                  <p className="text-gray-600 mt-1">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {children}

      {/* CTA */}
      <section className="py-20 px-4 bg-amber-500">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to streamline your solar workflow?
          </h2>
          <p className="text-amber-100 text-lg mb-8">
            Join solar EPCs who use SolarIntake to close deals faster and reduce admin work.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-amber-600 hover:bg-amber-50">
                Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/demo">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-amber-600">
                Book a Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
