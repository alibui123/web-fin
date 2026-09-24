import type { Metadata } from "next"
import Link from "next/link"
import ProofExhibit from "@/components/proof-exhibit"
import FinalCta from "@/components/final-cta"

export const metadata: Metadata = {
  title: "Customers | Finova Solutions",
  description:
    "Named clients and production results from Finova's work across US healthcare, government ERP, MENA enterprise, and African community platforms.",
  alternates: { canonical: "/customers" },
}

const hubs = [
  {
    href: "/customers/telecom-foundation",
    name: "Telecom Foundation",
    blurb: "Six projects: websites, Odoo ERP, agents and education for a Ministry of IT subsidiary.",
    span: "sm:col-span-7",
  },
  {
    href: "/customers/sirius-solutions",
    name: "Sirius Solutions Global",
    blurb: "Revenue cycle and insurance verification for ~400 US clinics.",
    span: "sm:col-span-5",
  },
  {
    href: "/customers/advanzatech",
    name: "Advanza Tech",
    blurb: "Inbound lead qualification agents. Seventy meetings in month two.",
    span: "sm:col-span-5",
  },
  {
    href: "/customers/kobipal",
    name: "KobiPal",
    blurb: "Social forum for weak networks across Africa, plus launch landing page.",
    span: "sm:col-span-7",
  },
]

export default function CustomersPage() {
  return (
    <main className="pt-20">
      <section className="relative overflow-hidden bg-[#030712] pb-12 pt-12 text-white">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[360px] w-[720px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(94,200,216,0.1),transparent_65%)]" />
        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <h1 className="mb-3 text-3xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05]">
                Account stories
              </h1>
              <p className="text-base font-light text-white/50">
                Multi-project relationships. Open a hub for the arc, or jump to the full portfolio
                for every case study.
              </p>
            </div>
            <Link
              href="/portfolio"
              className="shrink-0 text-[12px] font-medium uppercase tracking-[0.16em] text-white/40 transition-colors hover:text-[#5ec8d8]"
            >
              All 21 case studies →
            </Link>
          </div>

          <div className="grid grid-cols-12 gap-3">
            {hubs.map((hub) => (
              <Link
                key={hub.href}
                href={hub.href}
                className={`group col-span-12 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#080c16] p-6 transition-colors hover:border-white/20 md:p-7 ${hub.span}`}
              >
                <p className="mb-2 text-lg md:text-xl font-semibold text-white transition-colors group-hover:text-[#5ec8d8]">
                  {hub.name}
                </p>
                <p className="text-sm font-light leading-relaxed text-white/50">{hub.blurb}</p>
              </Link>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-5 text-[12px]">
            <Link
              href="/how-it-works"
              className="font-medium uppercase tracking-[0.16em] text-white/35 transition-colors hover:text-[#5ec8d8]"
            >
              How we work
            </Link>
            <Link
              href="/partners"
              className="font-medium uppercase tracking-[0.16em] text-white/35 transition-colors hover:text-[#5ec8d8]"
            >
              Partners
            </Link>
            <Link
              href="/trust"
              className="font-medium uppercase tracking-[0.16em] text-white/35 transition-colors hover:text-[#5ec8d8]"
            >
              Trust
            </Link>
            <Link
              href="/consultation"
              className="font-medium uppercase tracking-[0.16em] text-white/35 transition-colors hover:text-[#5ec8d8]"
            >
              Free audit
            </Link>
          </div>
        </div>
      </section>
      <ProofExhibit />
      <FinalCta />
    </main>
  )
}
