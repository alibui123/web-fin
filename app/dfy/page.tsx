import { Metadata } from "next"
import { Store, PhoneCall, CalendarCheck, RefreshCw, ShieldCheck, Search, Wrench, Repeat } from "lucide-react"
import SimpleLanding from "@/components/simple-landing"
import { CALENDLY_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "Done-for-You AI Agents for Local Business | Finova",
  description:
    "We answer, qualify, and book every caller for your local business, day and night. Built and run for you, quality checked on every call.",
  alternates: { canonical: "/dfy" },
}

export default function DfyPage() {
  return (
    <SimpleLanding
      eyebrow="Done-for-you"
      eyebrowIcon={Store}
      title={
        <>
          Never lose another job to a{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-finova-cyan via-finova-lightBlue to-finova-purple">
            missed call
          </span>
        </>
      }
      subtitle="We answer, qualify, and book every caller for your local business, day and night. Built and run for you, quality checked on every call."
      primaryCta={{ label: "Book a call", href: CALENDLY_URL, external: true }}
      secondaryCta={{ label: "See pricing", href: "/pricing" }}
      sections={[
        {
          heading: "What you get",
          items: [
            { icon: PhoneCall, title: "Answer every call", body: "Every caller is answered and qualified, around the clock." },
            { icon: CalendarCheck, title: "Qualify and book", body: "Booked straight into your calendar so no lead slips away." },
            { icon: RefreshCw, title: "Follow up and reactivate", body: "Follow-up and reactivation run on their own until they close." },
            { icon: ShieldCheck, title: "QA on every call", body: "QualiCall scores every interaction so quality holds." },
          ],
        },
        {
          heading: "How it works",
          items: [
            { icon: Search, title: "Audit", body: "We map where your business is losing calls, jobs, or time." },
            { icon: Wrench, title: "Build", body: "We build the agent inside the tools you already use." },
            { icon: Repeat, title: "Run", body: "We operate, monitor, and tune it for you on a monthly basis." },
          ],
        },
      ]}
      accountability={{
        heading: "Every interaction scored, every change signed off",
        body: "QualiCall scores every conversation, a person approves the calls where judgment belongs, and the agent answers only from your verified information.",
        cta: { label: "Trust and compliance", href: "/trust" },
      }}
      finalHeading="Tell us the work you want off your plate"
      finalSub="Book a call and we will map where you are losing jobs, no pitch. Pricing comes after the audit."
    />
  )
}
