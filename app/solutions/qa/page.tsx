import { Metadata } from "next"
import { ShieldCheck, Eye, MessageSquareText, UserCheck, AlertTriangle } from "lucide-react"
import SimpleLanding from "@/components/simple-landing"
import { CALENDLY_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "AI Quality Assurance With QualiCall | Finova",
  description:
    "QualiCall scores every interaction against the standards that matter, with explainable reasoning and human approval where judgment belongs, so quality holds.",
  alternates: { canonical: "/solutions/qa" },
}

export default function QaPage() {
  return (
    <SimpleLanding
      eyebrow="Quality assurance"
      eyebrowIcon={ShieldCheck}
      title={
        <>
          Every interaction scored, every change{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-finova-cyan via-finova-lightBlue to-finova-purple">
            signed off
          </span>
        </>
      }
      subtitle="QualiCall is our quality engine. It scores every interaction against the standards that matter, so quality holds and we catch drift early."
      primaryCta={{ label: "Book a call", href: CALENDLY_URL, external: true }}
      secondaryCta={{ label: "Back to solutions", href: "/solutions" }}
      sections={[
        {
          heading: "How QualiCall works",
          items: [
            { icon: Eye, title: "Score every conversation", body: "Every interaction is scored against the standards that matter." },
            { icon: MessageSquareText, title: "Explainable reasoning", body: "Every score comes with reasoning you can read and trust." },
            { icon: UserCheck, title: "Human approval", body: "A person approves the calls where judgment belongs." },
            { icon: AlertTriangle, title: "Catch drift early", body: "Quality is watched continuously so problems are caught early." },
          ],
        },
      ]}
      finalHeading="Tell us the work you want off your plate"
      finalSub="Book a call and we will show you how QualiCall keeps quality in place."
    />
  )
}
