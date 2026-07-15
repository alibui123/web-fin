import type { Metadata } from "next"
import Link from "next/link"
import { agentDevProof } from "@/lib/ai-agent-development"
import { CALENDLY_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "Advanzatech | Finova Customers",
  description:
    "Advanzatech booked seventy qualified meetings in month two with Finova voice agents across MENA cybersecurity distribution.",
  alternates: { canonical: "/customers/advanzatech" },
}

export default function AdvanzatechPage() {
  return (
    <main className="bg-finova-midnight text-white pt-28 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-bold tracking-[0.2em] uppercase text-finova-cyan mb-4">
          Customer
        </p>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">
          Advanzatech
        </h1>
        <p className="text-white/65 text-base md:text-lg font-light leading-relaxed mb-5">
          {agentDevProof.body}
        </p>
        <p className="text-white/65 text-base md:text-lg font-light leading-relaxed mb-8">
          {agentDevProof.bodyStats}
        </p>
        <blockquote className="border-l-2 border-finova-cyan/50 pl-5 md:pl-6 mb-10">
          <p className="text-white/85 text-base md:text-lg font-medium leading-relaxed italic">
            &ldquo;{agentDevProof.quote}&rdquo;
          </p>
          <footer className="mt-4 text-sm text-white/45 font-light not-italic">
            — {agentDevProof.attribution}
          </footer>
        </blockquote>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-white text-black text-sm font-bold tracking-[0.12em] uppercase hover:bg-finova-cyan hover:text-white transition-colors"
          >
            Book a call
          </a>
          <Link
            href="/solutions/ai-agent-development"
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-full border border-white/20 text-white text-sm font-bold tracking-[0.12em] uppercase hover:border-finova-cyan/50 transition-colors"
          >
            AI agent development
          </Link>
        </div>
      </div>
    </main>
  )
}
