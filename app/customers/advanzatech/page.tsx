import type { Metadata } from "next"
import CustomerHub from "@/components/customer-hub"

export const metadata: Metadata = {
  title: "Advanza Tech | Finova Customers",
  description:
    "Inbound lead qualification voice agents for Advanza Tech, a MENA B2B technology distributor — seventy meetings booked in month two.",
  alternates: { canonical: "/customers/advanzatech" },
}

export default function AdvanzatechPage() {
  return (
    <CustomerHub
      name="Advanza Tech"
      sector="B2B technology · MENA cybersecurity distribution"
      region="Gulf · UAE"
      arc="Every inbound enquiry answered and qualified fast, so sales time goes only to real opportunities — day or night."
      body={[
        "Advanza needed inbound leads handled without waiting for a callback. We built a voice agent that answers, asks the qualifying questions and routes real prospects to the sales team. In month two, our outbound agent booked seventy meetings for them.",
      ]}
      quote="Finova's voice agents now drive our outreach and a large share of our manual operations. The expertise and the quality of the agents have been first class, and we have won back hours we used to lose to repetitive work."
      attribution="Hashir, Advanza Tech, UAE"
      clientSlug="advanzatech"
      secondaryCta={{ href: "/solutions/ai-agent-development", label: "AI agent development" }}
    />
  )
}
