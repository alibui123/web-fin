import type { Metadata } from "next"
import Link from "next/link"
import { CALENDLY_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "Awaaz Labs | Finova Products",
  description:
    "Awaaz Labs is Finova's voice AI platform and flagship product line, home of conversational agents including Layla.",
  alternates: { canonical: "/products/awaaz-labs" },
}

export default function AwaazLabsProductPage() {
  return (
    <main className="bg-finova-midnight text-white pt-28 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-bold tracking-[0.2em] uppercase text-finova-cyan mb-4">
          Product
        </p>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">Awaaz Labs</h1>
        <p className="text-white/65 text-base md:text-lg font-light leading-relaxed mb-10">
          Awaaz Labs is our voice AI platform and flagship product line, the home of our
          conversational agents, including Layla, our pre-built AI front desk agent.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/layla"
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-white text-black text-sm font-bold tracking-[0.12em] uppercase hover:bg-finova-cyan hover:text-white transition-colors"
          >
            Meet Layla
          </Link>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-full border border-white/20 text-white text-sm font-bold tracking-[0.12em] uppercase hover:border-finova-cyan/50 transition-colors"
          >
            Book a call
          </a>
        </div>
      </div>
    </main>
  )
}
