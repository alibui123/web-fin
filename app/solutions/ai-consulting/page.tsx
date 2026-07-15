import { Metadata } from "next"
import Script from "next/script"
import ConsultingPage from "@/components/solutions/ai-consulting/consulting-page"
import { SITE_URL } from "@/lib/site"
import {
  consultingFaqs,
  consultingHero,
  consultingMeta,
  consultingProblem,
} from "@/lib/ai-consulting"

export const metadata: Metadata = {
  title: consultingMeta.title,
  description: consultingMeta.description,
  alternates: { canonical: "/solutions/ai-consulting" },
  keywords: [
    "AI consulting for business",
    "AI consulting services",
    "AI strategy consulting",
    "AI opportunity assessment",
    "AI roadmap",
    "where to use AI in business",
  ],
  openGraph: {
    type: "website",
    url: consultingMeta.ogUrl,
    siteName: "Finova Solutions",
    title: consultingMeta.ogTitle,
    description: consultingMeta.description,
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Finova Solutions, AI consulting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: consultingMeta.ogTitle,
    description: consultingMeta.description,
    images: ["/images/logo.png"],
  },
}

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${SITE_URL}/solutions/ai-consulting#service`,
      name: "AI consulting",
      serviceType: "AI consulting for business",
      description: consultingMeta.description,
      provider: { "@id": `${SITE_URL}/#org` },
      url: `${SITE_URL}/solutions/ai-consulting`,
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
          name: "AI consulting",
          item: `${SITE_URL}/solutions/ai-consulting`,
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: consultingFaqs.map((faq) => ({
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
      "@id": `${SITE_URL}/solutions/ai-consulting#page`,
      url: `${SITE_URL}/solutions/ai-consulting`,
      name: consultingHero.h1,
      description: consultingProblem.paragraphs[0],
      isPartOf: { "@id": `${SITE_URL}/#site` },
    },
  ],
}

export default function AiConsultingRoute() {
  return (
    <>
      <Script
        id="ai-consulting-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <ConsultingPage />
    </>
  )
}
