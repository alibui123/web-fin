import { Metadata } from "next"
import Script from "next/script"
import HowItWorksPage from "@/components/how-it-works/how-it-works-page"
import { SITE_URL } from "@/lib/site"
import {
  howItWorksFaqs,
  howItWorksHero,
  howItWorksMeta,
  howItWorksStages,
} from "@/lib/how-it-works"

export const metadata: Metadata = {
  title: howItWorksMeta.title,
  description: howItWorksMeta.description,
  alternates: { canonical: "/how-it-works" },
  keywords: [
    "how AI agent implementation works",
    "AI agent deployment process",
    "how to implement AI agents",
    "AI automation process",
    "managed AI implementation",
  ],
  openGraph: {
    type: "website",
    url: howItWorksMeta.ogUrl,
    siteName: "Finova Solutions",
    title: howItWorksMeta.ogTitle,
    description: howItWorksMeta.description,
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Finova Solutions, how it works",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: howItWorksMeta.ogTitle,
    description: howItWorksMeta.description,
    images: ["/images/logo.png"],
  },
}

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "HowTo",
      "@id": `${SITE_URL}/how-it-works#howto`,
      name: "how AI agent implementation works",
      description: howItWorksMeta.description,
      totalTime: "P6W",
      step: howItWorksStages.map((stage, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: `${stage.label} ${stage.title} ${stage.timing}`.trim(),
        text: stage.body,
      })),
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
          name: "How it works",
          item: `${SITE_URL}/how-it-works`,
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: howItWorksFaqs.map((faq) => ({
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
      "@id": `${SITE_URL}/how-it-works#page`,
      url: `${SITE_URL}/how-it-works`,
      name: howItWorksHero.h1,
      description: howItWorksMeta.description,
      isPartOf: { "@id": `${SITE_URL}/#site` },
    },
  ],
}

export default function HowItWorksRoute() {
  return (
    <>
      <Script
        id="how-it-works-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <HowItWorksPage />
    </>
  )
}
