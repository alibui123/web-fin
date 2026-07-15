import { Metadata } from "next"
import Script from "next/script"
import IndustriesPage from "@/components/industries/industries-page"
import { SITE_URL } from "@/lib/site"
import { industriesGrid, industriesHero, industriesMeta } from "@/lib/industries"

export const metadata: Metadata = {
  title: industriesMeta.title,
  description: industriesMeta.description,
  alternates: { canonical: "/industries" },
  keywords: [
    "AI automation by industry",
    "AI agents for healthcare",
    "AI for financial services",
    "AI for government",
    "industry-specific AI automation",
  ],
  openGraph: {
    type: "website",
    url: industriesMeta.ogUrl,
    siteName: "Finova Solutions",
    title: industriesMeta.ogTitle,
    description: industriesMeta.description,
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
    title: industriesMeta.ogTitle,
    description: industriesMeta.description,
    images: ["/images/logo.png"],
  },
}

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${SITE_URL}/industries#page`,
      url: `${SITE_URL}/industries`,
      name: industriesHero.h1,
      description: industriesMeta.description,
      isPartOf: { "@id": `${SITE_URL}/#site` },
      breadcrumb: { "@id": `${SITE_URL}/industries#breadcrumb` },
      hasPart: industriesGrid.items.map((item) => ({
        "@type": "WebPage",
        name: item.name,
        url: `${SITE_URL}${item.href}`,
        description: item.body,
      })),
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE_URL}/industries#breadcrumb`,
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
          name: "Industries",
          item: `${SITE_URL}/industries`,
        },
      ],
    },
  ],
}

export default function IndustriesRoute() {
  return (
    <>
      <Script
        id="industries-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <IndustriesPage />
    </>
  )
}
