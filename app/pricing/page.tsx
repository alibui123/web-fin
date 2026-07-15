import { Metadata } from "next"
import Script from "next/script"
import PricingPage from "@/components/pricing/pricing-page"
import { SITE_URL } from "@/lib/site"
import {
  pricingFaqs,
  pricingHero,
  pricingMeta,
} from "@/lib/pricing"

export const metadata: Metadata = {
  title: pricingMeta.title,
  description: pricingMeta.description,
  alternates: { canonical: "/pricing" },
  keywords: [
    "AI automation pricing",
    "AI agency pricing",
    "AI agent cost",
    "managed AI pricing",
    "how much does AI automation cost",
  ],
  openGraph: {
    type: "website",
    url: pricingMeta.ogUrl,
    siteName: "Finova Solutions",
    title: pricingMeta.ogTitle,
    description: pricingMeta.description,
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Finova Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pricingMeta.ogTitle,
    description: pricingMeta.description,
    images: ["/images/logo.png"],
  },
}

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/pricing#page`,
      url: `${SITE_URL}/pricing`,
      name: pricingHero.h1,
      description: pricingMeta.description,
      isPartOf: { "@id": `${SITE_URL}/#site` },
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
          name: "Pricing",
          item: `${SITE_URL}/pricing`,
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: pricingFaqs.map((faq) => ({
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

export default function PricingRoute() {
  return (
    <>
      <Script
        id="pricing-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <PricingPage />
    </>
  )
}
