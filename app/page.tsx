import Hero from "@/components/hero"
import CoreChannels from "@/components/core-channels"
import CostingPain from "@/components/costing-pain"
import ProofExhibit from "@/components/proof-exhibit"
import ThesisLine from "@/components/thesis-line"
import WhatWeRun from "@/components/what-we-run"
import GovernedLoop from "@/components/governed-loop"
import TheModel from "@/components/the-model"
import Industries from "@/components/industries"
import HeroCTA from "@/components/hero-cta"
import FAQ from "@/components/faq"
import FinalCta from "@/components/final-cta"
import { homepageFaqs } from "@/lib/homepage-faq"
import Script from "next/script"

const SITE_URL = "https://finovasolutions.tech"

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#org`,
      name: "Finova Solutions",
      url: SITE_URL,
      logo: `${SITE_URL}/images/logo.png`,
      description:
        "Finova Solutions is a managed agentic AI company that builds, runs, and quality-checks AI agents inside the tools businesses already use, automating workflows and ERP, conversations, and custom AI.",
      foundingDate: "2025-03-07",
      founder: {
        "@type": "Person",
        name: "Astafa Ali",
      },
      areaServed: ["United States", "Australia", "GCC", "MENA"],
      sameAs: [
        "https://www.linkedin.com/company/finovasolutions/",
        "https://www.instagram.com/finovasolutions.tech/",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#site`,
      name: "Finova Solutions",
      url: SITE_URL,
      publisher: { "@id": `${SITE_URL}/#org` },
    },
    {
      "@type": "Service",
      name: "Managed AI agents for business operations",
      serviceType: "Managed agentic AI operations",
      provider: { "@id": `${SITE_URL}/#org` },
      areaServed: ["United States", "Australia", "GCC", "MENA"],
      description:
        "Finova builds AI agents that take repetitive work off your team and runs them inside the tools you already use, with QualiCore scoring every interaction.",
    },
    {
      "@type": "FAQPage",
      mainEntity: homepageFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ],
}

export default function Home() {
  return (
    <main>
      <Script
        id="homepage-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <Hero />
      <CoreChannels />
      <CostingPain />
      <ProofExhibit />
      <ThesisLine />
      <WhatWeRun />
      <GovernedLoop />
      <TheModel />
      <Industries />
      <HeroCTA />
      <FAQ />
      <FinalCta />
    </main>
  )
}
