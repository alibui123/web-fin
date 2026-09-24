import type { Metadata } from "next"
import CustomerHub from "@/components/customer-hub"

export const metadata: Metadata = {
  title: "Telecom Foundation | Finova Customers",
  description:
    "Six projects across websites, Odoo ERP, mobile, agents and education for Telecom Foundation — a Ministry of IT and Telecom subsidiary.",
  alternates: { canonical: "/customers/telecom-foundation" },
}

export default function TelecomFoundationPage() {
  return (
    <CustomerHub
      name="Telecom Foundation"
      sector="Ministry of IT and Telecom subsidiary"
      region="Pakistan"
      arc="A public-sector transformation arc: from corporate and welfare websites to an 18-module Odoo ERP, mobile access, five department agents, and a nationwide school learning stack."
      body={[
        "Public institutions do not hand over their core systems on faith. They test, scrutinize and hold vendors to a standard most private buyers never apply. Across six projects we gave the Foundation a trusted public face, put the ERP in every manager's pocket, automated routine work across five departments, and unified teaching and assessment for sixteen schools.",
        "The engagement is one relationship story told through six case studies — each with its own need, build and measured gains.",
      ]}
      quote="Finova reshaped how our teams use Odoo every day. Their agents took the most tedious parts of task assignment off our seniors and gave managers honest, real-time insight into performance, always with a person in control."
      attribution="Atifa Ahsan, EVP HR, Admin and Social Welfare, Telecom Foundation"
      clientSlug="telecom-foundation"
      secondaryCta={{ href: "/solutions/erp-automation", label: "ERP automation" }}
    />
  )
}
