import type { Metadata } from "next"
import { Suspense } from "react"
import PortfolioShowcase from "@/components/portfolio-showcase"
import { PORTFOLIO_STATS } from "@/lib/portfolio-data"

export const metadata: Metadata = {
  title: "Portfolio & Case Studies | Finova Solutions",
  description: PORTFOLIO_STATS.framing,
  alternates: { canonical: "/portfolio" },
}

export default function PortfolioPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-finova-midnight">
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center text-white/40 text-sm">
            Loading portfolio…
          </div>
        }
      >
        <PortfolioShowcase />
      </Suspense>
    </main>
  )
}
