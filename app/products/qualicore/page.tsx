import type { Metadata } from "next"
import Link from "next/link"
import { CALENDLY_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "QualiCore | Finova Products",
  description:
    "QualiCore scores every AI agent interaction, shows the reason, and puts a human in sign-off.",
  alternates: { canonical: "/products/qualicore" },
}

export default function QualiCoreProductPage() {
  return (
    <main className="bg-finova-midnight text-white pt-28 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-bold tracking-[0.2em] uppercase text-finova-cyan mb-4">
          Product
        </p>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">QualiCore</h1>
        <p className="text-white/65 text-base md:text-lg font-light leading-relaxed mb-10">
          QualiCore scores every AI agent interaction, shows the reason, and puts a human in
          sign-off, so your agents are safe to leave running.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/solutions/ai-quality-assurance"
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-white text-black text-sm font-bold tracking-[0.12em] uppercase hover:bg-finova-cyan hover:text-white transition-colors"
          >
            AI quality and governance
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
