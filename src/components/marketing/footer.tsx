import Link from "next/link"
import { Sun } from "lucide-react"

export function MarketingFooter() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg text-white mb-3">
              <Sun className="h-5 w-5 text-amber-500" />
              <span>SolarIntake</span>
            </Link>
            <p className="text-sm">
              Streamline your solar project intake and permit tracking.
            </p>
          </div>

          <div>
            <h4 className="text-white font-medium mb-3">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/features/utility-bill-intake" className="hover:text-white">Utility Bill Intake</Link></li>
              <li><Link href="/features/document-collection" className="hover:text-white">Document Collection</Link></li>
              <li><Link href="/features/permit-tracking" className="hover:text-white">Permit Tracking</Link></li>
              <li><Link href="/features/interconnection-workflow" className="hover:text-white">Interconnection Workflow</Link></li>
              <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-3">Templates</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/templates/solar-project-intake-checklist" className="hover:text-white">Solar Intake Checklist</Link></li>
              <li><Link href="/templates/ahj-permit-checklist" className="hover:text-white">AHJ Permit Checklist</Link></li>
              <li><Link href="/templates/utility-interconnection-checklist" className="hover:text-white">Interconnection Checklist</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-3">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/demo" className="hover:text-white">Book a Demo</Link></li>
              <li><Link href="/login" className="hover:text-white">Log In</Link></li>
              <li><Link href="/signup" className="hover:text-white">Sign Up</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} SolarIntake. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
