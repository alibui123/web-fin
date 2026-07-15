import type { LucideIcon } from "lucide-react"
import {
  Workflow,
  Bot,
  Database,
  Sparkles,
  ShieldCheck,
  ClipboardList,
} from "lucide-react"

export const solutionsHubMeta = {
  title: "AI Automation Solutions, Built and Run for You | Finova",
  description:
    "Finova's managed AI solutions automate your workflows, ERP, custom AI, and inbound, built inside your systems and run by us. See what we can take off your plate.",
  canonical: "https://finovasolutions.tech/solutions",
  ogTitle: "AI Automation Solutions, Built and Run for You | Finova",
  ogUrl: "https://finovasolutions.tech/solutions",
}

export const solutionsHubHero = {
  h1: "AI solutions we build and run for you",
  paragraphs: [
    "Every business runs on work that repeats. Calls that need answering, records that need updating, cases that need routing, leads that need chasing. Our solutions are the same agentic core pointed at that work, one job at a time, built inside the tools you already use and operated by us so the result keeps running without you managing software.",
    "Start with the job that is costing you the most. If you are not sure which one that is, the audit will tell you, and it stands on its own whether or not you hire us.",
  ],
  primaryCta: "Book a call",
  secondaryCta: "Start the readiness check",
}

export const solutionsHubConnective = {
  heading: "One core, many jobs",
  paragraphs: [
    "The reason we can run your back office, answer your phones, and read your documents with the same team is that these are not separate products. They are one agentic core applied to different work.",
    "That matters for you in two ways. You get one accountable partner instead of a stack of point tools that do not talk to each other, and once the core is inside your systems for one workflow, adding the next one is faster and cheaper because the hard part, the integration and the governance, is already done.",
  ],
}

export type SolutionCard = {
  id: string
  title: string
  body: string
  outcome: string
  cta: string
  href: string
  icon: LucideIcon
  accent: string
}

export const solutionCards: SolutionCard[] = [
  {
    id: "workflow",
    title: "Workflow automation",
    body: "The work that drains your team is rarely one task, it is the chain. Look up the record, confirm the detail, update the system, route the case, follow up. We put agents on the whole chain and run it end to end inside your systems, so you get completed cases instead of half-finished handoffs. Live in production today running insurance verification for a US healthcare operator.",
    outcome:
      "the repetitive process runs itself and your team handles only what needs judgment.",
    cta: "Explore workflow automation",
    href: "/solutions/workflow-automation",
    icon: Workflow,
    accent: "from-finova-cyan to-finova-lightBlue",
  },
  {
    id: "agent-dev",
    title: "AI agent development",
    body: "Most agent projects die between the demo and production, the vendor hands over code and leaves, and the edge cases become your problem. We design, build, integrate, and then operate the agent inside your stack, pointed at a number you care about. Development is where the engagement starts, not where it ends. Live in production booking sales meetings for a MENA distributor.",
    outcome: "a working agent in production, not a codebase and a goodbye.",
    cta: "Explore AI agent development",
    href: "/solutions/ai-agent-development",
    icon: Bot,
    accent: "from-finova-magenta to-finova-purple",
  },
  {
    id: "erp",
    title: "ERP and Odoo automation",
    body: "Your ERP holds everything and does nothing on its own, someone still has to key the record, chase the approval, and rebuild the report. We put agents inside your Odoo or ERP so the back office runs itself, under human sign-off. Live in production across nine modules for a government client.",
    outcome: "your ERP becomes an operator instead of a filing cabinet.",
    cta: "Explore ERP automation",
    href: "/solutions/erp-automation",
    icon: Database,
    accent: "from-finova-purple to-finova-cyan",
  },
  {
    id: "custom",
    title: "Custom AI development",
    body: "When the work does not fit an off-the-shelf tool, we build for it, document intelligence that turns paperwork into structured data, computer vision, and bespoke agents designed around your process. One accountable team designs it, builds it, and runs it, so the capability compounds instead of scattering across vendors.",
    outcome: "the hard problem no tool solved gets solved and stays solved.",
    cta: "Explore custom AI development",
    href: "/solutions/custom-ai-development",
    icon: Sparkles,
    accent: "from-finova-lightBlue to-finova-magenta",
  },
  {
    id: "qa",
    title: "AI quality and governance",
    body: "This is the part most vendors cannot show you. QualiCore, our QA engine, scores every single interaction your agents have, shows the reason behind every score in plain language a manager can read, and surfaces the changes worth making, with a person signing off before anything ships. It is why our agents are safe to leave running.",
    outcome:
      "quality that holds in production, and drift caught before a client ever notices.",
    cta: "Explore AI quality and governance",
    href: "/solutions/ai-quality-assurance",
    icon: ShieldCheck,
    accent: "from-finova-cyan to-finova-purple",
  },
  {
    id: "consulting",
    title: "AI consulting and audit",
    body: "Before any build, we map the workflow that is costing you time or revenue and tell you honestly where an agent pays off and where it does not. You leave with a written picture of where your hours and leads are going, and it is useful whether or not you go further with us.",
    outcome:
      "a clear read on where AI actually returns money in your business, before you spend on a build.",
    cta: "Explore AI consulting",
    href: "/solutions/ai-consulting",
    icon: ClipboardList,
    accent: "from-finova-magenta to-finova-lightBlue",
  },
]

export const solutionsHubPlate = {
  heading: "What we can take off your plate",
}

export const solutionsHubProof = {
  heading: "Proven in production, not in a pitch",
  body: "These are not concepts. Telecom Foundation, a Ministry of IT and Telecom subsidiary, runs nine automated Odoo modules with us. Sirius Solutions Global runs insurance verification through our agent at roughly fifty calls a day. Advanzatech booked seventy qualified meetings in month two. One core, five languages, live today. Read the full stories on our customers page.",
  customersHref: "/customers",
  howItWorksHref: "/how-it-works",
}

export const solutionsHubChoose = {
  heading: "Not sure which one you need",
  body: "Most operators come to us knowing something is leaking, not knowing exactly where. That is what the audit is for. We map one workflow end to end, show you where the hours and the revenue are going, and tell you which solution should run first and which should stay human. It is real work with a written deliverable, and it stands on its own whatever you decide next.",
}

export const solutionsHubFaqs = [
  {
    question: "Can we start with one solution and add more later?",
    answer:
      "Yes, and most clients do. We start with the single workflow that is costing you the most, prove it against a real number, then expand. Because the core is already inside your systems after the first build, each additional solution is faster to add than the last.",
  },
  {
    question: "Do these replace the software we already use?",
    answer:
      "No. Every solution is built to work inside your existing CRM, ERP, and calendars, not to replace them. Your systems stay the system of record, and the agents join your stack rather than asking your team to learn a new one.",
  },
  {
    question: "How do we know which solution fits our business?",
    answer:
      "The audit answers that. We look at where inquiries arrive, what your team does by hand, and where cases stall, then recommend the one workflow an agent should run first. We will also tell you plainly when an agent is not the right answer.",
  },
]

export const solutionsHubFinal = {
  heading: "Tell us the work you want off your plate",
  body: "Book a call and we map where you are losing time and money, then tell you which solution should run first. No pitch, just an honest read.",
  primaryCta: "Book a call",
  secondaryCta: "Start the readiness check",
}

export const READINESS_URL = "/tools/ai-readiness-assessment"
