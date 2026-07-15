import { Metadata } from "next"
import { PhoneIncoming, PhoneCall, UserCheck, CalendarCheck, Moon } from "lucide-react"
import SimpleLanding from "@/components/simple-landing"
import { CALENDLY_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "AI Receptionist, Built and Run for You | Finova",
  description:
    "Finova answers inbound calls and messages in the caller's language, qualifies them, and books them. Built and run for you, quality checked on every call.",
  alternates: { canonical: "/solutions/ai-receptionist" },
}

export default function AiReceptionistPage() {
  return (
    <SimpleLanding
      eyebrow="AI receptionist"
      eyebrowIcon={PhoneIncoming}
      title={
        <>
          Never lose another job to a{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-finova-cyan via-finova-lightBlue to-finova-purple">
            missed call
          </span>
        </>
      }
      subtitle="We answer inbound calls and messages in the caller's language, qualify them, and book them, day and night."
      primaryCta={{ label: "Book a call", href: CALENDLY_URL, external: true }}
      secondaryCta={{ label: "Back to solutions", href: "/solutions" }}
      sections={[
        {
          heading: "What it does",
          items: [
            { icon: PhoneCall, title: "Answer every call", body: "Inbound calls and messages are answered around the clock." },
            { icon: UserCheck, title: "Qualify the lead", body: "Callers are qualified against the questions that matter to you." },
            { icon: CalendarCheck, title: "Book the appointment", body: "Booked straight into your calendar or system." },
            { icon: Moon, title: "Work after hours", body: "No caller goes to voicemail and books the next provider." },
          ],
        },
      ]}
      accountability={{
        heading: "Every interaction scored, every change signed off",
        body: "QualiCall scores every conversation, and a person approves the calls where judgment belongs. The agent answers only from your verified information.",
        cta: { label: "See QA", href: "/solutions/qa" },
      }}
      finalHeading="Tell us the work you want off your plate"
      finalSub="Book a call and we will map where you are losing calls, no pitch."
    />
  )
}
