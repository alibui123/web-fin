import type { LucideIcon } from "lucide-react"
import {
  Search,
  Wrench,
  FlaskConical,
  Rocket,
  RefreshCw,
  Handshake,
  Layers,
  ShieldCheck,
} from "lucide-react"

export const howItWorksMeta = {
  title: "How It Works, The Run by Finova Model | Finova",
  description:
    "How Finova takes a workflow from audit to a running, governed AI agent in about six weeks. Map, build, prove the number, run and improve. See the model.",
  canonical: "https://finovasolutions.tech/how-it-works",
  ogTitle: "How It Works, The Run by Finova Model | Finova",
  ogUrl: "https://finovasolutions.tech/how-it-works",
}

export const howItWorksHero = {
  h1: "From the work you do by hand to an operation that runs itself.",
  paragraphs: [
    "The reason most people hesitate to hand a workflow to AI is not the technology. It is not knowing what they are actually signing up for. Will it drag on for a year. Will it turn into a black box nobody understands. Will the vendor disappear the moment it goes live.",
    "This page is the answer to all three. It is the model behind every engagement we take, four principles and five stages, on a path that typically runs about six weeks from first call to live. You will always know what is happening, what comes next, and how we will measure whether it worked. No mystery, no open-ended project, and no disappearing act.",
  ],
  primaryCta: "Book your audit call",
  secondaryCta: "See an agent work",
  secondaryHref: "/#demo",
}

export const howItWorksModel = {
  heading: "We do not sell you AI. We run your operations with it.",
  lead: "Everything below comes down to four principles.",
  principles: [
    "We map the work that is costing you, so we solve the right problem.",
    "We build inside the tools you already use, so nothing gets ripped out.",
    "We point every agent at a number you care about, so success is a fact and not an opinion.",
    "And we run it after launch, so the work never lands back on your team.",
  ],
  close:
    "Hold those four in mind, and the five stages are just how they play out over time.",
}

export type HowItWorksStage = {
  label: string
  title: string
  timing: string
  body: string
  icon: LucideIcon
  accent: string
}

export const howItWorksStagesHeading =
  "The five stages, start to live in about six weeks"

export const howItWorksStages: HowItWorksStage[] = [
  {
    label: "Stage 1.",
    title: "Map.",
    timing: "Week one.",
    body: "We audit the workflow that is costing you time or revenue. We look at where inquiries arrive, what your team handles by hand, and where cases stall, and we come back with a written picture of where the hours and the leads are going, plus an honest recommendation of what an agent should run first and what should stay human. This is the audit, and it stands on its own even if you never move to stage two.",
    icon: Search,
    accent: "from-finova-cyan to-finova-lightBlue",
  },
  {
    label: "Stage 2.",
    title: "Design and build.",
    timing: "Weeks two to four.",
    body: "We design the agent for your exact workflow and build it inside the tools you already use, your calendar, CRM, or ERP. Your team keeps its systems and its system of record. We are building around how you actually operate, not asking you to bend your operation around a product.",
    icon: Wrench,
    accent: "from-finova-magenta to-finova-purple",
  },
  {
    label: "Stage 3.",
    title: "Train and test.",
    timing: "Weeks four to six.",
    body: "Our team trains the agent on your rules, your language, and your edge cases, then tests it against real scenarios, not clean examples, before it ever touches a live customer. QualiCore, our QA engine, scores it as it learns, so it goes live already meeting a standard rather than learning on your customers.",
    icon: FlaskConical,
    accent: "from-finova-purple to-finova-cyan",
  },
  {
    label: "Stage 4.",
    title: "Go live.",
    timing: "Around week six.",
    body: "We launch in a controlled rollout and stay close as real volume ramps up. The agent goes live pointed at the number you agreed on, and we report against that number from day one, so you can see it working rather than take our word for it.",
    icon: Rocket,
    accent: "from-finova-lightBlue to-finova-magenta",
  },
  {
    label: "Stage 5.",
    title: "Run and improve.",
    timing: "Ongoing.",
    body: "We operate, monitor, and tune the agent for as long as it runs. QualiCore scores every interaction, a person signs off on every improvement, and we answer for your number. This is the stage most vendors skip and the one that actually matters, because an agent nobody runs is where the value quietly leaks away.",
    icon: RefreshCw,
    accent: "from-finova-cyan to-finova-purple",
  },
]

export const howItWorksTimeline = {
  heading: "About six weeks, and we will tell you when it is not",
  body: "Six weeks is the typical path for a focused workflow. A simple single-step deployment can move faster, and a large multi-system or multi-module program is phased across a longer horizon, one piece proving out before the next begins. We scope your real timeline in the audit, before you commit, so the date is something you know up front rather than something that slips. We would rather tell you eight weeks and mean it than promise three and miss.",
  // Layout slices — exact phrases from body, not new copy
  typical: "Six weeks is the typical path for a focused workflow.",
  range:
    "A simple single-step deployment can move faster, and a large multi-system or multi-module program is phased across a longer horizon, one piece proving out before the next begins.",
  scope:
    "We scope your real timeline in the audit, before you commit, so the date is something you know up front rather than something that slips.",
  honesty:
    "We would rather tell you eight weeks and mean it than promise three and miss.",
  spectrum: [
    { label: "move faster", tone: "mute" as const },
    { label: "six weeks", tone: "hot" as const },
    { label: "longer horizon", tone: "mid" as const },
  ],
}

export type HowItWorksWhyItem = {
  lead: string
  body: string
  icon: LucideIcon
}

export const howItWorksWhyHeading =
  "Why serious operators choose this over the alternatives"

export const howItWorksWhy: HowItWorksWhyItem[] = [
  {
    lead: "A partner, not a vendor.",
    body: "We consult first, study the problem that is costing you the most, and own the outcome we promise. You are not buying hours, you are buying a result someone answers for.",
    icon: Handshake,
  },
  {
    lead: "Done for you, end to end.",
    body: "We build, run, and keep improving the system, so the work never lands back on your team's desk. The point of the model is that you stop operating software, not that you start operating ours.",
    icon: Layers,
  },
  {
    lead: "Governed from day one.",
    body: "Security, quality scoring on every interaction, and compliance are built in from the first line, not bolted on after something goes wrong. See how governance works.",
    icon: ShieldCheck,
  },
]

export const howItWorksProof = {
  heading: "The model, proven in production",
  body: "This is not a process we are describing in theory. It is how we took Telecom Foundation, a Ministry of IT and Telecom subsidiary, live across nine Odoo modules, how we run insurance verification for Sirius Solutions Global at roughly fifty calls a day, and how we built an outbound agent that booked seventy qualified meetings in month two for Advanzatech. Same five stages, same four principles, three different operations, all live. Read the full stories on our customers page.",
  // Layout slices — exact phrases from body, not new copy
  lead: "This is not a process we are describing in theory.",
  cases: [
    {
      name: "Telecom Foundation",
      href: "/customers/telecom-foundation",
      body: "It is how we took Telecom Foundation, a Ministry of IT and Telecom subsidiary, live across nine Odoo modules,",
    },
    {
      name: "Sirius Solutions Global",
      href: "/customers/sirius-solutions",
      body: "how we run insurance verification for Sirius Solutions Global at roughly fifty calls a day,",
    },
    {
      name: "Advanzatech",
      href: "/customers/advanzatech",
      body: "and how we built an outbound agent that booked seventy qualified meetings in month two for Advanzatech.",
    },
  ],
  close:
    "Same five stages, same four principles, three different operations, all live.",
  coda: "Read the full stories on our customers page.",
  customersAnchor: "customers page",
  telecomHref: "/customers/telecom-foundation",
  siriusHref: "/customers/sirius-solutions",
  advanzatechHref: "/customers/advanzatech",
  customersHref: "/customers",
}

export const howItWorksTeam = {
  heading: "What is expected of your team",
  body: "Less than you would think, and that is deliberate. In the audit, we need an honest conversation about how your business runs and access to understand the workflow. During the build, we need a point of contact who can answer questions and confirm the rules and edge cases only your team knows. After go-live, we need nothing routine, because running the agent is our job, not yours. The whole design of the model is to take work off your team, so asking them to run a heavy project alongside it would defeat the point.",
  // Layout slices — exact sentences from body, not new copy
  lead: "Less than you would think, and that is deliberate.",
  phases: [
    {
      mark: "audit",
      body: "In the audit, we need an honest conversation about how your business runs and access to understand the workflow.",
    },
    {
      mark: "build",
      body: "During the build, we need a point of contact who can answer questions and confirm the rules and edge cases only your team knows.",
    },
    {
      mark: "go-live",
      body: "After go-live, we need nothing routine, because running the agent is our job, not yours.",
    },
  ],
  close:
    "The whole design of the model is to take work off your team, so asking them to run a heavy project alongside it would defeat the point.",
}

export const howItWorksAudience = {
  heading: "Who this model fits",
  paragraphs: [
    "Operators who want a workflow genuinely taken off their plate and run for them, with a clear path, a number to measure it by, and someone accountable after launch. If you value knowing exactly what happens and when, this model was built for you.",
    "It is a weaker fit if you want to buy a tool and run it entirely yourself, or if you need a same-week deployment with no scoping. We move deliberately because we are going to operate what we build, and rushing the map is how projects end up solving the wrong problem.",
  ],
}

export const howItWorksFaqs = [
  {
    question: "How long does it really take?",
    answer:
      "Most focused workflows go live in about six weeks, from the first audit call to a controlled launch. Simpler deployments move faster and large multi-system programs are phased across a longer timeline. We scope your real date in the audit before you commit, so you are never guessing and the timeline does not quietly slip.",
  },
  {
    question: "What happens if the agent underperforms after launch?",
    answer:
      "The number tells us early, because every agent is pointed at a metric and every interaction is scored, so a problem shows up as a trend, not a surprise. And because we operate the agent, fixing it is our job, not a change request you file and wait on. Tuning under human sign-off is part of the ongoing service, not an extra.",
  },
  {
    question: "Do we have to change our systems or software?",
    answer:
      "No. We build inside the tools you already use, and your systems stay the system of record. There is no migration and no rip and replace, the agent joins your stack rather than asking your team to learn a new one.",
  },
  {
    question: "What does the audit in stage one cost, and do we have to continue?",
    answer:
      "Ask us on the call, as it depends on scope, but it is real work with a written deliverable that stands on its own, and you are under no obligation to move to stage two. The audit is how you decide whether to trust us with the build, not the other way around.",
  },
  {
    question: "Who is accountable once it is live?",
    answer:
      "We are. We operate, monitor, and improve the agent, QualiCore governs its quality, and we answer for the number it was pointed at. You get the outcome and reporting against it, without carrying the operating burden.",
  },
]

export const howItWorksFinal = {
  heading: "Start with stage one",
  body: "Book the audit call and we map the workflow costing you the most, show you where the time and revenue are going, and give you an honest read on what an agent would return. It is stage one of the model, and it stands on its own whatever you decide next.",
  primaryCta: "Book your audit call",
  secondaryCta: "Start the readiness check",
  secondaryHref: "/tools/ai-readiness-assessment",
}

export const howItWorksSiblings = [
  { name: "AI consulting", href: "/solutions/ai-consulting" },
  { name: "All solutions", href: "/solutions" },
  { name: "Pricing", href: "/pricing" },
  { name: "Trust", href: "/trust" },
]
