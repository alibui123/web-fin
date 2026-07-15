import { Metadata } from "next"
import Script from "next/script"
import CustomAiPage from "@/components/solutions/custom-ai-development/custom-ai-page"
import { SITE_URL } from "@/lib/site"
import {
  customAiFaqs,
  customAiHero,
  customAiMeta,
  customAiProblem,
} from "@/lib/custom-ai-development"

export const metadata: Metadata = {
  title: customAiMeta.title,
  description: customAiMeta.description,
  alternates: { canonical: "/solutions/custom-ai-development" },
  keywords: [
    "custom AI development company",
    "custom AI development services",
    "bespoke AI solutions",
    "custom AI agents",
    "document intelligence",
    "computer vision development",
  ],
  openGraph: {
    type: "website",
    url: customAiMeta.ogUrl,
    siteName: "Finova Solutions",
    title: customAiMeta.ogTitle,
    description: customAiMeta.description,
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Finova Solutions, custom AI development",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: customAiMeta.ogTitle,
    description: customAiMeta.description,
    images: ["/images/logo.png"],
  },
}

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${SITE_URL}/solutions/custom-ai-development#service`,
      name: "Custom AI development",
      serviceType: "Custom AI development company",
      description: customAiMeta.description,
      provider: { "@id": `${SITE_URL}/#org` },
      url: `${SITE_URL}/solutions/custom-ai-development`,
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
          name: "Custom AI development",
          item: `${SITE_URL}/solutions/custom-ai-development`,
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: customAiFaqs.map((faq) => ({
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
      "@id": `${SITE_URL}/solutions/custom-ai-development#page`,
      url: `${SITE_URL}/solutions/custom-ai-development`,
      name: customAiHero.h1,
      description: customAiProblem.paragraphs[0],
      isPartOf: { "@id": `${SITE_URL}/#site` },
    },
  ],
}

export default function CustomAiDevelopmentRoute() {
  return (
    <>
      <Script
        id="custom-ai-development-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <CustomAiPage />
    </>
  )
}
