import { Metadata } from "next"
import Script from "next/script"
import ErpAutomationPage from "@/components/solutions/erp-automation/erp-page"
import { SITE_URL } from "@/lib/site"
import {
  erpFaqs,
  erpHero,
  erpMeta,
  erpProblem,
} from "@/lib/erp-automation"

export const metadata: Metadata = {
  title: erpMeta.title,
  description: erpMeta.description,
  alternates: { canonical: "/solutions/erp-automation" },
  keywords: [
    "AI ERP automation",
    "Odoo AI automation",
    "Odoo automation agent",
    "automate ERP workflows",
    "agentic ERP",
  ],
  openGraph: {
    type: "website",
    url: erpMeta.ogUrl,
    siteName: "Finova Solutions",
    title: erpMeta.ogTitle,
    description: erpMeta.description,
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
    title: erpMeta.ogTitle,
    description: erpMeta.description,
    images: ["/images/logo.png"],
  },
}

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${SITE_URL}/solutions/erp-automation#service`,
      name: "AI ERP and Odoo automation",
      serviceType: "AI ERP automation",
      description: erpMeta.description,
      provider: { "@id": `${SITE_URL}/#org` },
      url: `${SITE_URL}/solutions/erp-automation`,
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
          name: "ERP automation",
          item: `${SITE_URL}/solutions/erp-automation`,
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: erpFaqs.map((faq) => ({
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
      "@id": `${SITE_URL}/solutions/erp-automation#page`,
      url: `${SITE_URL}/solutions/erp-automation`,
      name: erpHero.h1,
      description: erpProblem.paragraphs[0],
      isPartOf: { "@id": `${SITE_URL}/#site` },
    },
  ],
}

export default function ErpAutomationRoute() {
  return (
    <>
      <Script
        id="erp-automation-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <ErpAutomationPage />
    </>
  )
}
