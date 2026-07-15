export const industriesMeta = {
  title: "AI Automation by Industry | Finova Solutions",
  description:
    "Finova runs AI agents inside healthcare, financial services, government, and home services operations. See how the same core is tuned to how your industry works.",
  canonical: "https://finovasolutions.tech/industries",
  ogTitle: "AI Automation by Industry | Finova Solutions",
  ogUrl: "https://finovasolutions.tech/industries",
}

export const industriesHero = {
  h1: "Built around how your industry actually runs.",
  // Layout slices — exact copy from h1, not new marketing text
  h1Lead: "Built around how your industry",
  h1Accent: "actually runs.",
  paragraphs: [
    "The work that drains a clinic is not the work that drains a bank, and neither looks like the back office of a government department. What they share is a shape, expensive, repetitive, high-volume work that runs on calls, follow-ups, and hand-entered data, and that is exactly what our agents are built to take.",
    "The same agentic core sits underneath every industry we serve. What changes is the tuning, the language, the workflow, the rules, and the compliance standard, so the agent fits how your industry actually operates rather than forcing your operation into a generic tool. Find your industry below, or if it is not listed yet, the core still likely fits, and we will tell you honestly on a call.",
  ],
  primaryCta: "Book a call",
  secondaryCta: "Start the readiness check",
  secondaryHref: "/tools/ai-readiness-assessment",
}

export const industriesCore = {
  heading: "One core, tuned to your world",
  paragraphs: [
    "The reason we can run insurance verification for a US healthcare operation and automate a government ERP with the same underlying capability is that the hard part, understanding a request, acting inside your systems, and governing the quality of the work, is common across industries. What is specific to your world is the surface, the terminology your customers use, the workflow your team follows, the rules you operate under.",
    "That matters to you in two ways. You get a partner who tunes the agent to your industry rather than handing you an average-of-everyone tool, and you get the confidence of a core already proven in operations as demanding as healthcare and government, which are among the hardest environments to satisfy.",
  ],
}

export type IndustryCard = {
  name: string
  body: string
  cta: string
  href: string
}

export const industriesGrid = {
  heading: "Industries we run today",
  items: [
    {
      name: "Healthcare operations",
      body: "Front desk, intake, reminders, reactivation, and back-office work like insurance verification, in the patient's language, with clinical questions always routed to your team. Live in production today running insurance verification for a US healthcare operator.",
      cta: "Explore healthcare",
      href: "/industries/healthcare",
    },
    {
      name: "Financial services",
      body: "Customer service, verification, and back-office workflows for banks, fintechs, and financial operators, built for the compliance and control this sector demands. Finova is a prequalified vendor with JazzCash and Easypaisa.",
      cta: "Explore financial services",
      href: "/industries/financial-services",
    },
    {
      name: "Government and public sector",
      body: "ERP and back-office automation for public institutions, run to the standard a government body signs off on, always with a person in control. Live in production across nine Odoo modules for a Ministry of IT and Telecom subsidiary.",
      cta: "Explore government",
      href: "/industries/government",
    },
    {
      name: "Home services",
      body: "Every call answered, every job captured, every quote followed up, for trades and field businesses where the phone is the revenue channel and a missed call is lost money. Built to capture and book the demand your team cannot always get to.",
      cta: "Explore home services",
      href: "/industries/home-services",
    },
  ] as IndustryCard[],
}

export const industriesEmerging = {
  heading: "Where we are going next",
  paragraphs: [
    "The same core applies well beyond the industries above, and two are moving fast in particular. In legal operations, agents are taking on the high-volume document and intake work that eats billable hours. In supply chain and logistics, they are handling the verification, reconciliation, and routing work that runs on repetitive coordination.",
    "We are honest about proof, so rather than publish a page claiming deployments we do not yet have in these sectors, we are building our expertise into the open. Read our thinking on AI in legal operations and AI in supply chain and logistics in our resources, and if you operate in either and want to talk about being an early deployment, the audit is the place to start.",
  ],
  legalPhrase: "AI in legal operations",
  logisticsPhrase: "AI in supply chain and logistics",
  resourcesPhrase: "resources",
  resourcesHref: "/blog",
  auditPhrase: "the audit",
  auditHref: "/ai-consulting",
}

export const industriesProof = {
  heading: "Proven where it is hardest to satisfy",
  body: "Healthcare and government are two of the most demanding environments to deploy AI into, and we run in both. Nine automated Odoo modules for a Ministry subsidiary. Insurance verification at roughly fifty calls a day for a US healthcare operator. If the core holds to those standards, it will hold to yours. Read the full stories on our customers page.",
  customersAnchor: "customers page",
  customersHref: "/customers",
}

export const industriesNotListed = {
  heading: "Do not see your industry?",
  body: "If your business runs on calls, follow-ups, and hand-entered data, the core almost certainly fits, whether or not your industry has its own page yet. The honest way to find out is the audit, where we map your specific workflow and tell you plainly where an agent would pay off. Book a call and we will tell you, no pitch.",
  auditPhrase: "the audit",
  auditHref: "/ai-consulting",
  bookPhrase: "Book a call",
}

export const industriesInvite = {
  heading: "Find where AI pays off in your industry",
  body: "Book a call and we map the workflow costing you the most, tuned to how your industry actually runs, and give you an honest read on what an agent would return.",
  primaryCta: "Book a call",
  secondaryCta: "Start the readiness check",
  secondaryHref: "/tools/ai-readiness-assessment",
}

export const industriesSiblings = [
  { name: "Customers", href: "/customers" },
  { name: "AI consulting", href: "/ai-consulting" },
  { name: "Readiness check", href: "/tools/ai-readiness-assessment" },
  { name: "How it works", href: "/how-it-works" },
  { name: "Contact", href: "/contact" },
]
