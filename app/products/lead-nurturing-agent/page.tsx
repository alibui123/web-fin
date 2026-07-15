import React from "react"
import { Metadata } from "next"
import LeadNurturingPage from "@/components/product-pages/lead-nurturing"

export const metadata: Metadata = {
  title: "Lead Nurturing CRM | Finova Solutions",
  description: "Never miss a sales opportunity. Our AI-powered Lead Nurturing Agent autonomously engages, qualifies, and follows up with leads across platforms—boosting conversions without lifting a finger.",
}

export default function Page() {
  return <LeadNurturingPage />
} 