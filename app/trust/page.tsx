import { Metadata } from "next"
import Script from "next/script"
import TrustPage from "@/components/trust/trust-page"
import { SITE_URL } from "@/lib/site"
import { trustFaqs, trustHero, trustMeta } from "@/lib/trust"

export const metadata: Metadata = {
  title: trustMeta.title,
  description: trustMeta.description,
  alternates: { canonical: "/trust" },
  keywords: [
    "AI agent security and compliance",
    "AI data privacy",
    "AI compliance",
    "secure AI automation",
    "AI governance",
    "is AI safe for business",
  ],
  openGraph: {
    type: "website",
    url: trustMeta.ogUrl,
    siteName: "Finova Solutions",
    title: trustMeta.ogTitle,
    description: trustMeta.description,
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
    title: trustMeta.ogTitle,
    description: trustMeta.description,
    images: ["/images/logo.png"],
  },
}

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/trust#page`,
      url: `${SITE_URL}/trust`,
      name: trustHero.h1,
      description: trustMeta.description,
      isPartOf: { "@id": `${SITE_URL}/#site` },
      about: { "@id": `${SITE_URL}/#organization` },
      breadcrumb: { "@id": `${SITE_URL}/trust#breadcrumb` },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/trust#faq`,
      mainEntity: trustFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE_URL}/trust#breadcrumb`,
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
          name: "Trust and security",
          item: `${SITE_URL}/trust`,
        },
      ],
    },
  ],
}

export default function TrustRoute() {
  return (
    <>
      <Script
        id="trust-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <TrustPage />
    </>
  )
}
