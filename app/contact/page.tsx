import { Metadata } from "next"
import Script from "next/script"
import ContactPage from "@/components/contact/contact-page"
import { SITE_URL } from "@/lib/site"
import { contactHero, contactMeta } from "@/lib/contact"

export const metadata: Metadata = {
  title: contactMeta.title,
  description: contactMeta.description,
  alternates: { canonical: "/contact" },
  keywords: [
    "contact Finova Solutions",
    "book AI consultation",
    "talk to AI automation company",
  ],
  openGraph: {
    type: "website",
    url: contactMeta.ogUrl,
    siteName: "Finova Solutions",
    title: contactMeta.ogTitle,
    description: contactMeta.description,
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
    title: contactMeta.ogTitle,
    description: contactMeta.description,
    images: ["/images/logo.png"],
  },
}

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": `${SITE_URL}/contact#page`,
      url: `${SITE_URL}/contact`,
      name: contactHero.h1,
      description: contactMeta.description,
      isPartOf: { "@id": `${SITE_URL}/#site` },
      about: { "@id": `${SITE_URL}/#organization` },
      breadcrumb: { "@id": `${SITE_URL}/contact#breadcrumb` },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Finova Solutions",
      url: SITE_URL,
      email: "info@finovasolutions.tech",
      telephone: "+92-327-6508716",
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "sales",
          email: "sales@finovasolutions.tech",
        },
        {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: "support@finovasolutions.tech",
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE_URL}/contact#breadcrumb`,
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
          name: "Contact",
          item: `${SITE_URL}/contact`,
        },
      ],
    },
  ],
}

export default function ContactRoute() {
  return (
    <>
      <Script
        id="contact-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <ContactPage />
    </>
  )
}
