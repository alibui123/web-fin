import { Metadata } from "next"
import Script from "next/script"
import SolutionsHubPage from "@/components/solutions/solutions-hub-page"
import {
  solutionCards,
  solutionsHubFaqs,
  solutionsHubMeta,
} from "@/lib/solutions-hub"
import { SITE_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: solutionsHubMeta.title,
  description: solutionsHubMeta.description,
  alternates: { canonical: "/solutions" },
  openGraph: {
    type: "website",
    url: solutionsHubMeta.ogUrl,
    siteName: "Finova Solutions",
    title: solutionsHubMeta.ogTitle,
    description: solutionsHubMeta.description,
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
    title: solutionsHubMeta.ogTitle,
    description: solutionsHubMeta.description,
    images: ["/images/logo.png"],
  },
}

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${SITE_URL}/solutions#page`,
      url: `${SITE_URL}/solutions`,
      name: solutionsHubMeta.title,
      description: solutionsHubMeta.description,
      isPartOf: { "@id": `${SITE_URL}/#site` },
      about: solutionCards.map((card) => ({
        "@type": "Service",
        name: card.title,
        description: card.body,
        url: `${SITE_URL}${card.href}`,
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
          name: "Solutions",
          item: `${SITE_URL}/solutions`,
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: solutionsHubFaqs.map((faq) => ({
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

export default function SolutionsRoute() {
  return (
    <>
      <Script
        id="solutions-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <SolutionsHubPage />
    </>
  )
}
