import type { Metadata } from "next"
import CustomerHub from "@/components/customer-hub"

export const metadata: Metadata = {
  title: "Sirius Solutions Global | Finova Customers",
  description:
    "Revenue cycle management and an insurance verification voice agent for Sirius Solutions Global, serving around 400 US clinics.",
  alternates: { canonical: "/customers/sirius-solutions" },
}

export default function SiriusSolutionsPage() {
  return (
    <CustomerHub
      name="Sirius Solutions Global"
      sector="US healthcare medical billing"
      region="USA"
      arc="A US healthcare operations arc: one claim pipeline from eligibility to payment, plus a voice agent that takes insurance verification off staff phones and writes results back into the EHR."
      body={[
        "Sirius bills for around 400 US clinics. Every delayed or denied claim is money its clients wait longer to collect. We built the revenue cycle system that keeps each claim moving, then an insurance verification agent that finishes roughly fifty checks a day — up from twenty by hand — and writes every result straight into the record.",
        "The call is only the trigger. The writeback into the EHR is the work.",
      ]}
      quote="We bundle Finova's platform into what we deliver to clinics, and AwaazLabs runs our insurance verification end to end. It freed our team from the repetitive calls to focus on the work that matters."
      attribution="Taimoor Malik, Sirius Solutions Global, United States"
      clientSlug="sirius-solutions"
      secondaryCta={{ href: "/solutions/workflow-automation", label: "Workflow automation" }}
    />
  )
}
