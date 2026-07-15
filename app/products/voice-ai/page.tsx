import React from "react"
import { Metadata } from "next"
import VoiceAIPage from "@/components/product-pages/voice-ai"

export const metadata: Metadata = {
  title: "Voice AI | Finova Solutions",
  description: "Fully replace traditional customer service roles. Our Voice agent handles customer queries just like a human would, but at a fraction of the cost.",
}

export default function Page() {
  return <VoiceAIPage />
} 