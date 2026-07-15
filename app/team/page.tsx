import { Metadata } from "next"
import TeamDirectory from "@/components/team-directory"

export const metadata: Metadata = {
  title: "Our Team | Finova Solutions",
  description: "Meet the experts behind Finova Solutions.",
}

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-finova-midnight pt-24 text-white">
      <TeamDirectory />
    </main>
  )
}
