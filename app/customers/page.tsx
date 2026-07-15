import type { Metadata } from "next"
import ProofExhibit from "@/components/proof-exhibit"
import FinalCta from "@/components/final-cta"

export const metadata: Metadata = {
  title: "Customers | Finova Solutions",
  description:
    "Named clients and production results from Finova's managed AI agents across US healthcare, government ERP, and MENA enterprise operations.",
  alternates: { canonical: "/customers" },
}

export default function CustomersPage() {
  return (
    <main className="pt-20">
      <ProofExhibit />
      <FinalCta />
    </main>
  )
}
