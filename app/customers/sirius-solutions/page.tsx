import type { Metadata } from "next"
import Link from "next/link"
import { workflowProof } from "@/lib/workflow-automation"
import { CALENDLY_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "Sirius Solutions Global | Finova Customers",
  description:
    "Sirius Solutions Global runs medical-billing insurance verification with Finova agents at roughly fifty verifications a day inside US healthcare operations.",
  alternates: { canonical: "/customers/sirius-solutions" },
}

export default function SiriusSolutionsPage() {
  return (
    <main className="bg-finova-midnight text-white pt-28 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-bold tracking-[0.2em] uppercase text-finova-cyan mb-4">
          Customer
        </p>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">
          Sirius Solutions Global
        </h1>
        <p className="text-white/65 text-base md:text-lg font-light leading-relaxed mb-8">
          {workflowProof.body}
        </p>
        <blockquote className="border-l-2 border-finova-cyan/50 pl-5 md:pl-6 mb-10">
          <p className="text-white/85 text-base md:text-lg font-medium leading-relaxed italic">
            &ldquo;{workflowProof.quote}&rdquo;
          </p>
          <footer className="mt-4 text-sm text-white/45 font-light not-italic">
            — {workflowProof.attribution}
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
            href="/solutions/workflow-automation"
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-full border border-white/20 text-white text-sm font-bold tracking-[0.12em] uppercase hover:border-finova-cyan/50 transition-colors"
          >
            Workflow automation
          </Link>
        </div>
      </div>
    </main>
  )
}
