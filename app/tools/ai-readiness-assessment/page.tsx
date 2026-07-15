import { Metadata } from "next"
import { Gauge, PhoneMissed, Repeat, FileText, Clock } from "lucide-react"
import SimpleLanding from "@/components/simple-landing"
import { CALENDLY_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "AI Readiness Check | Finova",
  description:
    "See what an AI agent would return for your operation. Book a call and we will map where you are losing time, no pitch.",
  alternates: { canonical: "/tools/ai-readiness-assessment" },
}

export default function ReadinessAssessmentPage() {
  return (
    <SimpleLanding
      eyebrow="Readiness check"
      eyebrowIcon={Gauge}
      title={
        <>
          See what an agent would{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-finova-cyan via-finova-lightBlue to-finova-purple">
            return for you
          </span>
        </>
      }
      subtitle="The two-minute readiness check is on its way. In the meantime, book a call and we will map where you are losing time, no pitch."
      primaryCta={{ label: "Book a call", href: CALENDLY_URL, external: true }}
      secondaryCta={{
        label: "Book a consulting call",
        href: "/solutions/ai-consulting",
      }}
      sections={[
        {
          heading: "What the check looks at",
          items: [
            { icon: PhoneMissed, title: "Missed inquiries", body: "Where calls and messages go unanswered and leads book elsewhere." },
            { icon: Repeat, title: "Repetitive workflows", body: "The manual work your team still does by hand every day." },
            { icon: Clock, title: "Follow-up gaps", body: "The follow-ups and reactivations that depend on whoever has time." },
            { icon: FileText, title: "Hand-entered data", body: "The data entry an agent could handle end to end inside your systems." },
          ],
        },
      ]}
      finalHeading="Tell us the work you want off your plate"
      finalSub="Book a call and we will map where you are losing time, no pitch."
    />
  )
}
