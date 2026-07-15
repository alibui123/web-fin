import { Metadata } from "next"
import Script from "next/script"
import AgentDevPage from "@/components/solutions/ai-agent-development/agent-dev-page"
import { SITE_URL } from "@/lib/site"
import {
  agentDevFaqs,
  agentDevHero,
  agentDevMeta,
  agentDevProblem,
} from "@/lib/ai-agent-development"

export const metadata: Metadata = {
  title: agentDevMeta.title,
  description: agentDevMeta.description,
  alternates: { canonical: "/solutions/ai-agent-development" },
  keywords: [
    "AI agent development company",
    "AI agent development services",
    "custom AI agents",
    "build AI agents for business",
    "AI agent developers",
  ],
  openGraph: {
    type: "website",
    url: agentDevMeta.ogUrl,
    siteName: "Finova Solutions",
    title: agentDevMeta.ogTitle,
    description: agentDevMeta.description,
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Finova Solutions, managed AI agents for operations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: agentDevMeta.ogTitle,
    description: agentDevMeta.description,
    images: ["/images/logo.png"],
  },
}

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${SITE_URL}/solutions/ai-agent-development#service`,
      name: "AI agent development",
      serviceType: "AI agent development company",
      description: agentDevMeta.description,
      provider: { "@id": `${SITE_URL}/#org` },
      url: `${SITE_URL}/solutions/ai-agent-development`,
      areaServed: ["United States", "Australia", "GCC", "MENA"],
      brand: "Finova Solutions",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Solutions",
          item: `${SITE_URL}/solutions`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "AI agent development",
          item: `${SITE_URL}/solutions/ai-agent-development`,
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: agentDevFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/solutions/ai-agent-development#page`,
      url: `${SITE_URL}/solutions/ai-agent-development`,
      name: agentDevHero.h1,
      description: agentDevProblem.paragraphs[0],
      isPartOf: { "@id": `${SITE_URL}/#site` },
    },
  ],
}

export default function AiAgentDevelopmentRoute() {
  return (
    <>
      <Script
        id="ai-agent-development-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <AgentDevPage />
    </>
  )
}
