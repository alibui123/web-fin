import { Metadata } from "next"
import { Wrench, PhoneCall, ClipboardCheck, RefreshCw, MapPin } from "lucide-react"
import SimpleLanding from "@/components/simple-landing"
import { CALENDLY_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "AI Agents for Home Services, Built and Run for You | Finova",
  description:
    "Finova builds and runs voice agents for trades and field businesses. Every call answered, every job captured, every quote followed up.",
  alternates: { canonical: "/industries/home-services" },
}

export default function HomeServicesPage() {
  return (
    <SimpleLanding
      eyebrow="Home services"
      eyebrowIcon={Wrench}
      title={
        <>
          Never lose another job to a{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-finova-cyan via-finova-lightBlue to-finova-purple">
            missed call
          </span>
        </>
      }
      subtitle="Trades and field businesses. Every call answered, every job captured, every quote followed up, day and night."
      primaryCta={{ label: "Book a call", href: CALENDLY_URL, external: true }}
      secondaryCta={{ label: "Industries", href: "/industries" }}
      sections={[
        {
          heading: "What we run for your business",
          items: [
            { icon: PhoneCall, title: "Answer every call", body: "Every caller is answered and qualified, around the clock." },
            { icon: ClipboardCheck, title: "Capture every job", body: "Job details captured straight into your system, nothing lost." },
            { icon: RefreshCw, title: "Follow up every quote", body: "Quotes are followed up on their own until they close or stop." },
            { icon: MapPin, title: "Book and dispatch", body: "Jobs booked and routed to the right person in the field." },
          ],
        },
      ]}
      accountability={{
        heading: "Every interaction scored, every change signed off",
        body: "QualiCall scores every conversation and a person approves the calls where judgment belongs. The agent answers only from your verified information.",
        cta: { label: "Trust and security", href: "/trust" },
      }}
      finalHeading="Tell us the work you want off your plate"
      finalSub="Book a call and we will map where you are losing jobs, no pitch."
    />
  )
}
