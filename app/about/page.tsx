import { Metadata } from "next"
import Script from "next/script"
import AboutPage from "@/components/about/about-page"
import { SITE_URL } from "@/lib/site"
import { aboutHero, aboutMeta } from "@/lib/about"

export const metadata: Metadata = {
  title: aboutMeta.title,
  description: aboutMeta.description,
  alternates: { canonical: "/about" },
  keywords: [
    "Finova Solutions",
    "managed agentic AI company",
    "AI automation company",
    "agentic AI company MENA",
  ],
  openGraph: {
    type: "website",
    url: aboutMeta.ogUrl,
    siteName: "Finova Solutions",
    title: aboutMeta.ogTitle,
    description: aboutMeta.description,
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
    title: aboutMeta.ogTitle,
    description: aboutMeta.description,
    images: ["/images/logo.png"],
  },
}

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": `${SITE_URL}/about#page`,
      url: `${SITE_URL}/about`,
      name: aboutHero.h1,
      description: aboutMeta.description,
      isPartOf: { "@id": `${SITE_URL}/#site` },
      about: { "@id": `${SITE_URL}/#organization` },
      breadcrumb: { "@id": `${SITE_URL}/about#breadcrumb` },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Finova Solutions",
      url: SITE_URL,
      description: aboutMeta.description,
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE_URL}/about#breadcrumb`,
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
          name: "About",
          item: `${SITE_URL}/about`,
        },
      ],
    },
  ],
}

export default function AboutRoute() {
  return (
    <>
      <Script
        id="about-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <AboutPage />
    </>
  )
}
