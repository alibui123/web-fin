export const aboutMeta = {
  title: "About Finova Solutions | Managed Agentic AI Company",
  description:
    "Finova Solutions is a managed agentic AI company, NIC Cohort 5, live in production across US healthcare, government, and MENA enterprise operations. Meet the team.",
  canonical: "https://finovasolutions.tech/about",
  ogTitle: "About Finova Solutions | Managed Agentic AI Company",
  ogUrl: "https://finovasolutions.tech/about",
}

export const aboutHero = {
  h1: "We build the agents. Then we stay and run them.",
  paragraphs: [
    "Most AI companies want to hand you software and move on to the next sale. We built Finova to do the opposite, to take a workflow off your plate and answer for it, in production, for as long as it runs. That is a harder company to build, and it is the only kind worth building, because it is the only kind that actually removes the work instead of adding to it.",
    "We are a managed agentic AI company. We design AI agents that understand what your business needs done, build them inside the systems you already use, and then operate and quality-check them so the work gets finished with no one in the seat. This page is who is behind that.",
  ],
}

export const aboutExists = {
  heading: "Why Finova exists",
  paragraphs: [
    "The company started from a single frustrating question. Why do talented people still lose their days to repetitive work a machine could do, instead of the creative, high-value work that only people can?",
    "The technology to finally close that gap exists now, and we built the company to put it to work, not to demo it. Every product we ship runs in real operations, handles real volume, and answers to real regulators. That discipline, shipping systems that survive production rather than impressing in a pitch, is the difference between a clever idea and something a hospital, a bank, or a government office can actually rely on. It is the standard the whole company is built around.",
  ],
  // Layout slices — exact sentences from paragraphs, not new copy
  originLead: "The company started from a single frustrating question.",
  originQuestion:
    "Why do talented people still lose their days to repetitive work a machine could do, instead of the creative, high-value work that only people can?",
  responseLead:
    "The technology to finally close that gap exists now, and we built the company to put it to work, not to demo it.",
  responseBody:
    "Every product we ship runs in real operations, handles real volume, and answers to real regulators. That discipline, shipping systems that survive production rather than impressing in a pitch, is the difference between a clever idea and something a hospital, a bank, or a government office can actually rely on.",
  responseClose: "It is the standard the whole company is built around.",
}

export type AboutPrinciple = {
  text: string
}

export const aboutStandFor = {
  heading: "What we stand for",
  principles: [
    {
      text: "Substance over hype. We ship systems that run in production, not slideware. If we cannot show it working, we do not claim it.",
    },
    {
      text: "Own the outcome. We measure success by your results, not our effort. We point every agent at a number and answer for it.",
    },
    {
      text: "Do the homework. We learn a market and a workflow deeply before we commit to it, because an agent built on a shallow understanding of your operation will fail in production, where it counts.",
    },
    {
      text: "Trust by design. Security, quality scoring, and compliance are built in from the first line, not added after something goes wrong.",
    },
    {
      text: "Plain language. If we cannot explain it simply, we have not understood it well enough. Our clients tell us this is what stood out, technical depth explained plainly.",
    },
    {
      text: "Keep getting sharper. Every interaction our agents have is scored and fed back, so the work gets better over time, under human sign-off.",
    },
  ] as AboutPrinciple[],
}

export type AboutProduct = {
  name: string
  body: string
  href?: string
}

export const aboutProducts = {
  heading: "One company, one capability, several products",
  lead: "Finova Solutions is the parent company. Underneath it, the same agentic capability shows up as focused products for the work each one does best.",
  items: [
    {
      name: "Awaaz Labs",
      body: "Awaaz Labs is our voice AI platform and flagship product line, the home of our conversational agents, including Layla, our pre-built AI front desk agent.",
      href: "/products/awaaz-labs",
    },
    {
      name: "QualiCore",
      body: "QualiCore is our QA engine, the governance core that scores every interaction our agents have, with QualiCall as the conversational QA agent built on it.",
      href: "/products/qualicore",
    },
    {
      name: "MehmaanNawaz",
      body: "MehmaanNawaz is our AI-powered hospitality management system for the businesses that run on guest operations.",
    },
  ] as AboutProduct[],
  close:
    "They look like different products because they do different jobs, but underneath they are one capability, understand the request, act inside your systems, and check the result, which is why adopting one makes the next easier to add.",
}

export const aboutFounder = {
  heading: "From the founder",
  body: "Astafa Ali founded Finova to build the company he wished existed, one that would study a business's hardest problem until it understood it better than anyone in the room, then build something that earned its place.",
  name: "Astafa Ali, Founder and Chief Executive.",
}

export const aboutTeam = {
  heading: "The team behind the agents",
  lead: "Finova is built by a team with real depth in AI, engineering, and operations.",
  members: [],
}

export const aboutCredibility = {
  heading: "Trusted, backed, and prequalified",
  body: "Finova is incubated at the National Incubation Center, Cohort 5, one of the region's most selective startup programs. We are a prequalified vendor with JazzCash and Easypaisa, a member of the Chamber of Commerce, and backed into the MENA market through a partnership with one of the region's largest technology distributors. Our work is live in production across US healthcare operations, government, and MENA enterprise operations. These are not logos we borrowed, they are relationships and deployments we earned.",
}

export const aboutProof = {
  heading: "The work speaks first",
  body: "We would rather be judged on what runs than on what we say about ourselves. Nine automated Odoo modules inside a government ERP for Telecom Foundation. Insurance verification running at roughly fifty calls a day for Sirius Solutions Global. Seventy qualified meetings booked in month two for Advanzatech. Read the full stories on our customers page.",
  telecomHref: "/customers/telecom-foundation",
  siriusHref: "/customers/sirius-solutions",
  advanzatechHref: "/customers/advanzatech",
  customersHref: "/customers",
  customersAnchor: "customers page",
}

export const aboutInvite = {
  heading: "Work with us",
  body: "If you have a workflow that is costing your team time or your business revenue, the honest first step is a conversation and an audit. We will map it, tell you where an agent would pay off, and tell you just as plainly where it would not.",
  primaryCta: "Book a call",
  secondaryCta: "See an agent work",
  secondaryHref: "/#demo",
}

export const aboutSiblings = [
  { name: "Customers", href: "/customers" },
  { name: "How it works", href: "/how-it-works" },
  { name: "Solutions", href: "/solutions" },
  { name: "Trust", href: "/trust" },
  { name: "Contact", href: "/contact" },
]
