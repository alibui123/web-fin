import type { LucideIcon } from "lucide-react"
import {
  Phone,
  Workflow,
  Plug,
  Users,
  Code2,
  KeyRound,
  Handshake,
} from "lucide-react"

export const agentDevMeta = {
  title: "AI Agent Development, Built and Run for You | Finova",
  description:
    "Finova designs, builds, and operates AI agents inside your tools, voice, chat, and workflow, governed on every interaction. Live with named clients. Book a call.",
  canonical: "https://finovasolutions.tech/solutions/ai-agent-development",
  ogTitle: "AI Agent Development, Built and Run for You | Finova",
  ogUrl: "https://finovasolutions.tech/solutions/ai-agent-development",
}

export const agentDevHero = {
  h1: "AI agents, built for production and run by us.",
  paragraphs: [
    "Most AI agents look brilliant in the demo and never make it to production. The proof of concept works on a clean example, then the integration drags, the edge cases pile up, and the vendor hands over a codebase and moves on. Six months later you have a repo nobody owns and an agent nobody trusts with a real customer.",
    "We build agents differently, for the day-to-day mess of real operations, not the demo. We design them, build them inside the tools you already use, point them at a number you care about, and then we run them. Building the agent is where our engagement starts. Keeping it working in production is the actual service. You keep the outcome. We answer for it.",
  ],
  primaryCta: "Book a call",
  primaryMicro: "We scope your first agent and the number it should move. No pitch.",
  secondaryCta: "See an agent work",
  secondaryHref: "/#demo",
}

export const agentDevProblem = {
  heading: "The demo is the easy part",
  paragraphs: [
    "Anyone can build an agent that works once, on a tidy example, in a controlled demo. That is not where projects fail. They fail in the gap between that demo and a system you can leave running with real customers, real edge cases, and real consequences when it gets something wrong.",
    "That gap is full of unglamorous work. Connecting to systems that were never designed to talk to each other. Handling the caller who does not follow the script, the record that is missing a field, the request that sits outside the happy path. Deciding what the agent should do when it is not sure, and making sure it escalates instead of guessing. Watching it in production so quality does not quietly drift. None of that shows up in a demo, and most vendors are gone before any of it matters, because they sold you the build, not the result.",
    "An agent that survives production is a different thing from an agent that survives a demo. We build for the second one, and then we stay to run it, because an agent nobody operates is just expensive code.",
  ],
  // Layout slices — exact phrases from paragraphs, not new copy
  lead: "Anyone can build an agent that works once, on a tidy example, in a controlled demo. That is not where projects fail. They fail in the gap between that demo and a system you can leave running with real customers, real edge cases, and real consequences when it gets something wrong.",
  gapLead: "That gap is full of unglamorous work.",
  gaps: [
    {
      verb: "Connecting",
      body: "Connecting to systems that were never designed to talk to each other.",
    },
    {
      verb: "Handling",
      body: "Handling the caller who does not follow the script, the record that is missing a field, the request that sits outside the happy path.",
    },
    {
      verb: "Deciding",
      body: "Deciding what the agent should do when it is not sure, and making sure it escalates instead of guessing.",
    },
    {
      verb: "Watching",
      body: "Watching it in production so quality does not quietly drift.",
    },
  ],
  punch:
    "None of that shows up in a demo, and most vendors are gone before any of it matters, because they sold you the build, not the result.",
  close:
    "An agent that survives production is a different thing from an agent that survives a demo. We build for the second one, and then we stay to run it, because an agent nobody operates is just expensive code.",
}

export type AgentDevRunItem = {
  title: string
  body: string
  icon: LucideIcon
  accent: string
}

export const agentDevRunsHeading = "What we build and run"

export const agentDevRuns: AgentDevRunItem[] = [
  {
    title: "Voice and conversational agents.",
    body: "Agents that answer, qualify, verify, book, and follow up in the language your customers actually use, handling the calls and messages your team does not have time for. You get completed outcomes, calls handled and meetings booked, not transcripts to review later.",
    icon: Phone,
    accent: "from-finova-cyan to-finova-lightBlue",
  },
  {
    title: "Workflow agents.",
    body: "Agents that execute multi-step processes inside your systems, looking up records, updating them, routing cases, and escalating what needs a person. The work gets done end to end, not suggested and left for someone to finish.",
    icon: Workflow,
    accent: "from-finova-magenta to-finova-purple",
  },
  {
    title: "Agents built into your stack.",
    body: "Everything connects to the calendars, CRM, ERP, and internal tools you already run, so the agent joins your operation instead of adding a system your team has to learn and maintain.",
    icon: Plug,
    accent: "from-finova-purple to-finova-cyan",
  },
  {
    title: "One accountable team, start to finish.",
    body: "The same team designs, builds, integrates, and then operates the agent, so knowledge does not get lost in a handoff and the capability compounds instead of fragmenting across a vendor who built it and a team stuck maintaining it.",
    icon: Users,
    accent: "from-finova-lightBlue to-finova-magenta",
  },
]

export const agentDevHow = {
  heading: "How an agent goes from idea to running",
  body: "We map the workflow the agent will own and tell you honestly whether an agent is the right tool for it. We build it inside your stack and test it against real scenarios, not just clean examples, before it touches a live customer. We point it at the number it needs to move and report against that number from day one. Then we run it, monitor it, and tune it, so it keeps working as your business changes. See the full model on how it works.",
  howItWorksAnchor: "how it works",
  howItWorksHref: "/how-it-works",
}

export const agentDevProof = {
  heading: "Proven in production",
  body: "Advanzatech is a cybersecurity distributor operating across the MENA region. Their sales team needed pipeline, and sourcing it by hand, cold outreach, qualifying, chasing, booking, was eating hours their closers should have spent closing. We built an outbound agent that does that work end to end. It qualifies leads, handles objections in real conversation, and books qualified meetings straight into the calendar with the full context waiting for the closer.",
  bodyStats:
    "In its second month live, it booked seventy qualified meetings, running at a 2 minute 40 second average call with sub-one-second node-to-node latency, meaning it responds fast enough that the conversation feels natural. Every one of those meetings is pipeline the sales team did not have to source by hand.",
  quote:
    "Finova's voice agents now drive our outreach and a large share of our manual operations. The quality has been first class, and we have won back hours we used to lose to repetitive work.",
  attribution: "Hashir Farhan, Advanzatech, MENA. Measured in production.",
  customersHref: "/customers/advanzatech",
}

export const agentDevOptionsHeading =
  "Build it in-house, buy a platform, or have us run it"

export const agentDevOptionsIntro =
  "If you are considering an AI agent, you have three real options, and it is worth being honest about all three."

export const agentDevOptions = [
  {
    lead: "Building it in-house",
    body: "Building it in-house means pulling your best engineers off the roadmap to build, and then permanently maintain, something outside their core expertise. The build is the small part. The forever-maintenance, the monitoring, the edge cases, and the on-call when it breaks are the real cost, and they never end. We have already crossed the production gap many times, and we carry the operating burden so your team does not.",
    icon: Code2,
  },
  {
    lead: "Buying a self-serve platform",
    body: "Buying a self-serve platform gives you the tools and hands you the keys, which means the building, the tuning, the governance, and the 2 a.m. page when something breaks are all yours. That works if you have a team whose job is to run it. If you do not, the platform becomes another system that needs an owner you do not have.",
    icon: KeyRound,
  },
  {
    lead: "Having us build and run it",
    body: "Having us build and run it means you get a working agent in production, pointed at a number, with a team that stays accountable for it after launch. You carry none of the operating load. That is the whole model, and it is the reason serious operators choose a managed partner over a codebase and a goodbye.",
    icon: Handshake,
  },
]

export const agentDevGovernance = {
  heading: "Safe to leave running",
  body: "Every agent we build is governed by QualiCore, our QA engine. It scores every interaction the agent has, shows the reason behind every score in plain language a manager can read, and surfaces what needs attention, with a person on our team approving changes before they ship. Agents answer only from your verified information and escalate anything they do not know, so they are safe to leave running with real customers. Every deployment is architected to meet the data rules of the region it runs in, with zero retention by default. See how we handle data and security.",
  trustAnchor: "data and security",
  trustHref: "/trust",
  // Layout slices — exact sentences from body, not new copy
  quality:
    "Every agent we build is governed by QualiCore, our QA engine. It scores every interaction the agent has, shows the reason behind every score in plain language a manager can read, and surfaces what needs attention, with a person on our team approving changes before they ship.",
  loop: [{ word: "scores" }, { word: "reason" }, { word: "approving" }],
  bounds:
    "Agents answer only from your verified information and escalate anything they do not know, so they are safe to leave running with real customers.",
  data: "Every deployment is architected to meet the data rules of the region it runs in, with zero retention by default.",
  coda: "See how we handle data and security.",
}

export const agentDevAudience = {
  heading: "Who this is for",
  paragraphs: [
    "Operations and revenue teams carrying repetitive calls, messages, and multi-step processes who want one accountable partner to build the agent and run it, rather than a proof of concept that impresses in a meeting and dies before production.",
    "It is a weaker fit if you want a codebase to own and operate entirely yourself, or if you are looking for the cheapest possible build with no ongoing operation. We are a managed partner, not a dev shop that hands over files and disappears, and we will say so plainly on the call if that is what you actually need.",
  ],
  // Layout slices — exact text from paragraphs, not new copy
  fit: "Operations and revenue teams carrying repetitive calls, messages, and multi-step processes who want one accountable partner to build the agent and run it, rather than a proof of concept that impresses in a meeting and dies before production.",
  weaker:
    "It is a weaker fit if you want a codebase to own and operate entirely yourself, or if you are looking for the cheapest possible build with no ongoing operation. We are a managed partner, not a dev shop that hands over files and disappears, and we will say so plainly on the call if that is what you actually need.",
}

export const agentDevFaqs = [
  {
    question: "What does agent development with Finova actually include?",
    answer:
      "Everything from the workflow audit to the running agent. We map the process, design and build the agent inside your tools, integrate it with your calendar, CRM, or ERP, test it against real scenarios, and then operate it after launch. Development is the start of the engagement, not the end of it.",
  },
  {
    question: "Do we own the agent, or are we locked in?",
    answer:
      "You own the outcome and the data, and your systems stay your system of record. We run the agent because operating, monitoring, and improving it is the service you are paying for. If we ever part ways, your workflows and your records remain in your own tools.",
  },
  {
    question: "How do you stop the agent from saying or doing the wrong thing?",
    answer:
      "Agents answer only from your verified information and escalate anything they do not know rather than guessing. QualiCore scores every interaction, and a person approves changes where judgment belongs, so the agent operates inside hard boundaries and nothing ships without human sign-off.",
  },
  {
    question: "What languages can the agents work in?",
    answer:
      "Five are live in production today, Khaleeji and Levantine Arabic, English, Hindi, and Urdu. Language coverage is built per deployment, so the agent speaks the way your customers actually contact you rather than defaulting to English.",
  },
  {
    question: "How long does it take to build one?",
    answer:
      "A focused single-workflow agent typically goes live in weeks, depending on how many systems it connects to. Larger multi-system builds take longer, and we scope that honestly in the audit up front, so you know the timeline before you commit to anything.",
  },
]

export const agentDevFinal = {
  heading: "Scope your first agent",
  body: "Book a call and we map the workflow an agent should own first, the number it should move, and what running it would return. No pitch, just an honest read on whether an agent is the right tool for the job.",
  primaryCta: "Book a call",
  secondaryCta: "See an agent work",
  secondaryHref: "/#demo",
}

export const agentDevSiblings = [
  { name: "Workflow automation", href: "/solutions/workflow-automation" },
  { name: "AI quality and governance", href: "/solutions/ai-quality-assurance" },
  { name: "All solutions", href: "/solutions" },
]
