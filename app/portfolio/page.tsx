import PortfolioShowcase from "@/components/portfolio-showcase"

export const metadata = {
  title: "Portfolio | Finova Solutions",
  description: "Selected portfolio of advanced AI, telecommunications, and custom software solutions delivered by Finova Solutions.",
}

export default function PortfolioPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-finova-midnight">
      <PortfolioShowcase />
    </main>
  )
}
