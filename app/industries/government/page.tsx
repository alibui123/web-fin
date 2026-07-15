import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { CALENDLY_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "AI Agents for Government Operations | Finova",
  description:
    "Finova runs AI agents inside government ERP and operations systems under human sign-off. Live with Telecom Foundation across nine Odoo modules.",
  alternates: { canonical: "/industries/government" },
}

export default function GovernmentIndustryPage() {
  return (
    <main className="bg-finova-midnight text-white pt-28 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-bold tracking-[0.2em] uppercase text-finova-cyan mb-4">
          <Link href="/industries" className="hover:text-white transition-colors">
            Industries
          </Link>
        </p>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
          Government operations
        </h1>
        <p className="text-white/65 text-base md:text-lg font-light leading-relaxed mb-6">
          Public institutions do not hand their core systems to a vendor on faith. They
          test, they scrutinize, and they hold agents to a standard most private buyers
          never apply. Finova runs agents inside government ERP environments under human
          sign-off, live with Telecom Foundation across nine Odoo modules.
        </p>
        <p className="text-white/65 text-base md:text-lg font-light leading-relaxed mb-10">
          Start with the single module costing you the most. See how ERP automation works
          inside the systems you already have.
        </p>
          <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
          <Link
            href="/solutions/erp-automation"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-black text-sm font-bold tracking-[0.12em] uppercase hover:bg-finova-cyan hover:text-white transition-colors"
          >
            ERP automation
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-full border border-white/20 text-white text-sm font-bold tracking-[0.12em] uppercase hover:border-finova-cyan/50 transition-colors"
          >
            Book a call
          </a>
          <Link
            href="/customers/telecom-foundation"
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-full border border-white/20 text-white text-sm font-bold tracking-[0.12em] uppercase hover:border-finova-cyan/50 transition-colors"
          >
            Telecom Foundation
          </Link>
          <Link
            href="/trust"
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-full border border-white/20 text-white text-sm font-bold tracking-[0.12em] uppercase hover:border-finova-cyan/50 transition-colors"
          >
            Trust and security
          </Link>
          </div>
      </div>
    </main>
  )
}
