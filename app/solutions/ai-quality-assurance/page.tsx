import { Metadata } from "next"
import Script from "next/script"
import AiQualityPage from "@/components/solutions/ai-quality-assurance/qa-page"
import { SITE_URL } from "@/lib/site"
import {
  qaFaqs,
  qaHero,
  qaMeta,
  qaProblem,
} from "@/lib/ai-quality-assurance"

export const metadata: Metadata = {
  title: qaMeta.title,
  description: qaMeta.description,
  alternates: { canonical: "/solutions/ai-quality-assurance" },
  keywords: [
    "AI agent quality assurance",
    "AI agent governance",
    "AI QA",
    "AI call quality monitoring",
    "monitor AI agents",
    "AI agent evaluation",
  ],
  openGraph: {
    type: "website",
    url: qaMeta.ogUrl,
    siteName: "Finova Solutions",
    title: qaMeta.ogTitle,
    description: qaMeta.description,
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Finova Solutions, AI quality and governance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: qaMeta.ogTitle,
    description: qaMeta.description,
    images: ["/images/logo.png"],
  },
}

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${SITE_URL}/solutions/ai-quality-assurance#service`,
      name: "AI quality and governance",
      serviceType: "AI agent quality assurance",
      description: qaMeta.description,
      provider: { "@id": `${SITE_URL}/#org` },
      url: `${SITE_URL}/solutions/ai-quality-assurance`,
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
          name: "AI quality and governance",
          item: `${SITE_URL}/solutions/ai-quality-assurance`,
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: qaFaqs.map((faq) => ({
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
      "@id": `${SITE_URL}/solutions/ai-quality-assurance#page`,
      url: `${SITE_URL}/solutions/ai-quality-assurance`,
      name: qaHero.h1,
      description: qaProblem.paragraphs[0],
      isPartOf: { "@id": `${SITE_URL}/#site` },
    },
  ],
}

export default function AiQualityAssuranceRoute() {
  return (
    <>
      <Script
        id="ai-quality-assurance-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <AiQualityPage />
    </>
  )
}
