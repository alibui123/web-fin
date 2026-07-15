import { Metadata } from "next"
import Script from "next/script"
import WorkflowAutomationPage from "@/components/solutions/workflow-automation/workflow-page"
import { SITE_URL } from "@/lib/site"
import {
  workflowFaqs,
  workflowHero,
  workflowMeta,
  workflowProblem,
} from "@/lib/workflow-automation"

export const metadata: Metadata = {
  title: workflowMeta.title,
  description: workflowMeta.description,
  alternates: { canonical: "/solutions/workflow-automation" },
  keywords: [
    "AI workflow automation services",
    "business process automation with AI",
    "automate manual workflows",
    "end to end workflow automation",
  ],
  openGraph: {
    type: "website",
    url: workflowMeta.ogUrl,
    siteName: "Finova Solutions",
    title: workflowMeta.ogTitle,
    description: workflowMeta.description,
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
    title: workflowMeta.ogTitle,
    description: workflowMeta.description,
    images: ["/images/logo.png"],
  },
}

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${SITE_URL}/solutions/workflow-automation#service`,
      name: "AI workflow automation services",
      serviceType: "AI workflow automation",
      description: workflowMeta.description,
      provider: { "@id": `${SITE_URL}/#org` },
      url: `${SITE_URL}/solutions/workflow-automation`,
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
          name: "Workflow automation",
          item: `${SITE_URL}/solutions/workflow-automation`,
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: workflowFaqs.map((faq) => ({
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
      "@id": `${SITE_URL}/solutions/workflow-automation#page`,
      url: `${SITE_URL}/solutions/workflow-automation`,
      name: workflowHero.h1,
      description: workflowProblem.paragraphs[0],
      isPartOf: { "@id": `${SITE_URL}/#site` },
    },
  ],
}

export default function WorkflowAutomationRoute() {
  return (
    <>
      <Script
        id="workflow-automation-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <WorkflowAutomationPage />
    </>
  )
}
