import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, ChevronRight } from "lucide-react"
import { CALENDLY_URL } from "@/lib/site"
import { industriesGrid } from "@/lib/industries"

const financial = industriesGrid.items.find(
  (i) => i.href === "/industries/financial-services",
)!

export const metadata: Metadata = {
  title: "AI Agents for Financial Services | Finova Solutions",
  description: financial.body,
  alternates: { canonical: "/industries/financial-services" },
}

export default function FinancialServicesIndustryPage() {
  return (
    <main className="bg-finova-midnight text-white pt-28 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs font-medium tracking-wide text-white/40">
            <li>
              <Link href="/" className="transition-colors hover:text-finova-cyan">
                Home
              </Link>
            </li>
            <li aria-hidden>
              <ChevronRight className="h-3.5 w-3.5 text-white/20" />
            </li>
            <li>
              <Link href="/industries" className="transition-colors hover:text-finova-cyan">
                Industries
              </Link>
            </li>
            <li aria-hidden>
              <ChevronRight className="h-3.5 w-3.5 text-white/20" />
            </li>
            <li className="text-white/75" aria-current="page">
              Financial services
            </li>
          </ol>
        </nav>

        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
          {financial.name}
        </h1>
        <p className="text-white/65 text-base md:text-lg font-light leading-relaxed mb-10">
          {financial.body}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-black text-sm font-bold tracking-[0.12em] uppercase hover:bg-finova-cyan hover:text-white transition-colors"
          >
            Book a call
            <ArrowRight className="w-4 h-4" />
          </a>
          <Link
            href="/industries"
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-full border border-white/20 text-white text-sm font-bold tracking-[0.12em] uppercase hover:border-finova-cyan/50 transition-colors"
          >
            Industries
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
