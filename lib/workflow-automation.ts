import type { LucideIcon } from "lucide-react"
import {
  Link2,
  Server,
  AlertTriangle,
  BarChart3,
} from "lucide-react"

export const workflowMeta = {
  title: "AI Workflow Automation Services, Run for You | Finova",
  description:
    "Finova automates multi-step workflows end to end with AI agents inside your systems, then runs and governs them. Live in US healthcare operations. Book a call.",
  canonical: "https://finovasolutions.tech/solutions/workflow-automation",
  ogTitle: "AI Workflow Automation Services, Run for You | Finova",
  ogUrl: "https://finovasolutions.tech/solutions/workflow-automation",
}

export const workflowHero = {
  h1: "The workflow runs itself. You keep the outcome.",
  paragraphs: [
    "Most of the work that drains your team is not one task, it is a chain of them. Look up the record, confirm the detail, update the system, route the case, send the follow-up. Automation tools handle one link in that chain and hand the rest back to a person, which is why your team still feels buried even after buying the tool.",
    "We put agents on the whole chain and run it end to end inside the systems you already use, so the process completes on its own and your people touch only the cases that actually need judgment. You keep the outcome. We stay accountable for it.",
  ],
  primaryCta: "Book a call",
  primaryMicro: "We map the workflow costing you the most first. No pitch.",
  secondaryCta: "Start the readiness check",
}

export const workflowProblem = {
  heading: "Why the work still lands on a person",
  paragraphs: [
    "You have probably already bought automation. A scheduler, a ticketing tool, a workflow builder with if-this-then-that rules. And your team is still doing the work by hand, because those tools automate the easy middle and break on everything else.",
    "They break on variation, the request that does not match the template. They break on judgment, the case that needs someone to decide, not just execute. And they break at the seams, where one system has to hand work to another and a human ends up copying data between them. So the tool clears the simplest twenty percent, and the expensive eighty percent, the part that actually needs a brain, still sits on your team's desk.",
    "An agent is different because it handles the conversation and the judgment inside clear boundaries, then executes every step, then escalates only what genuinely falls outside its scope. The result is a workflow that finishes across real-world variation, not a macro that fails the first time reality does not match the script.",
  ],
  // Layout slices — exact phrases from paragraphs[1], not new copy
  breaks: [
    {
      label: "variation",
      lead: "They break on variation,",
      detail: "the request that does not match the template.",
    },
    {
      label: "judgment",
      lead: "They break on judgment,",
      detail: "the case that needs someone to decide, not just execute.",
    },
    {
      label: "seams",
      lead: "And they break at the seams,",
      detail:
        "where one system has to hand work to another and a human ends up copying data between them.",
    },
  ],
  split:
    "So the tool clears the simplest twenty percent, and the expensive eighty percent, the part that actually needs a brain, still sits on your team's desk.",
}

export type WorkflowRunItem = {
  title: string
  body: string
  icon: LucideIcon
  accent: string
}

export const workflowRuns: WorkflowRunItem[] = [
  {
    title: "End-to-end process runs.",
    body: "Verification, intake, scheduling, ticketing, routing, and follow-up executed as one governed flow from start to finish. You get completed cases delivered, not a tool that does step three and leaves steps four through seven for a person.",
    icon: Link2,
    accent: "from-finova-cyan to-finova-lightBlue",
  },
  {
    title: "Work that happens inside your systems.",
    body: "The agent operates in your CRM, your ERP, and your calendars, reading and writing where your team already works. There is no new dashboard for anyone to learn and no data to copy between tools, because the agent is doing the copying, correctly, every time.",
    icon: Server,
    accent: "from-finova-magenta to-finova-purple",
  },
  {
    title: "Exception handling built in from day one.",
    body: "The agent clears the routine volume on its own and escalates the cases that need a human to a named person with the full context attached. Your team stops being the first responder to everything and becomes the decision-maker on the few things that deserve them.",
    icon: AlertTriangle,
    accent: "from-finova-purple to-finova-cyan",
  },
  {
    title: "Reporting against a number you chose.",
    body: "Every automation is tied to a metric you already care about, hours returned, cases cleared, turnaround time, and reported against it. You see what the workflow returned, not just that it ran.",
    icon: BarChart3,
    accent: "from-finova-lightBlue to-finova-magenta",
  },
]

export const workflowRunsHeading = "What we run for you"

export const workflowHow = {
  heading: "How a workflow goes live",
  body: "We map the workflow that is costing you time, and you get a written picture of where the hours go and which parts an agent should run. We build the agent inside your stack and test it against real scenarios before it touches a live case. We point it at the number it needs to move and report against that number from day one. Then we run it, monitor it, and improve it, so the workflow keeps completing without you managing it. See the full model on how it works.",
  howItWorksAnchor: "how it works",
  howItWorksHref: "/how-it-works",
  // Layout slices — exact sentences from body, not new copy
  stages: [
    {
      verb: "Map",
      body: "We map the workflow that is costing you time, and you get a written picture of where the hours go and which parts an agent should run.",
    },
    {
      verb: "Build",
      body: "We build the agent inside your stack and test it against real scenarios before it touches a live case.",
    },
    {
      verb: "Point",
      body: "We point it at the number it needs to move and report against that number from day one.",
    },
    {
      verb: "Run",
      body: "Then we run it, monitor it, and improve it, so the workflow keeps completing without you managing it.",
    },
  ],
  coda: "See the full model on how it works.",
}

export const workflowProof = {
  heading: "Proven in production",
  body: "Sirius Solutions Global runs medical-billing operations for US healthcare providers. Confirming a patient's insurance coverage used to mean staff sitting through hold queues by hand, all day, a slow and thankless task that capped how fast the business could grow. Our agent now makes those calls at roughly fifty verifications a day, confirms the coverage, and writes the structured result straight back into their system. The phone call is only the trigger. The real work is the writeback into the record, done cleanly every time, so the team stopped working hold music and started working the cases that need a person.",
  quote:
    "AwaazLabs runs our insurance verification end to end. It freed our team from the repetitive calls to focus on the work that matters. The quality and the experience have been excellent.",
  attribution: "Taimoor Malik, Sirius Solutions, United States. Measured in production.",
  customersHref: "/customers/sirius-solutions",
}

export const workflowGovernance = {
  heading: "Nothing runs without a human behind it",
  body: "Every workflow we run is scored by QualiCore, our QA engine. It grades every interaction against the standards that matter, shows the reason behind every score in plain language a manager can read, and surfaces the changes worth making, with a person on our team signing off before any change ships. Drift gets caught early, before it reaches a customer, instead of after a complaint. And every deployment is architected to meet the data rules of the region it runs in, with zero retention by default and your systems remaining the system of record. See how we handle data and security.",
  trustAnchor: "data and security",
  trustHref: "/trust",
  // Layout slices — exact sentences from body, not new copy
  quality:
    "Every workflow we run is scored by QualiCore, our QA engine. It grades every interaction against the standards that matter, shows the reason behind every score in plain language a manager can read, and surfaces the changes worth making, with a person on our team signing off before any change ships.",
  loop: [
    { word: "scored" },
    { word: "reason" },
    { word: "signing off" },
  ],
  drift:
    "Drift gets caught early, before it reaches a customer, instead of after a complaint.",
  data:
    "And every deployment is architected to meet the data rules of the region it runs in, with zero retention by default and your systems remaining the system of record.",
  coda: "See how we handle data and security.",
}

export const workflowAudience = {
  heading: "Who this is for",
  body: "Operations leaders carrying hand-run processes across support, back office, verification, scheduling, and field coordination. If the work lives in calls, tickets, records, and follow-ups, and your team spends its day moving cases through a chain of steps, this is built for you. If your problem is a single simple task rather than a chain, we will tell you honestly that a lighter tool may fit better.",
  // Layout slices — exact text from body, not new copy
  lead: "Operations leaders carrying hand-run processes across",
  domains: [
    "Support",
    "Back office",
    "Verification",
    "Scheduling",
    "Field coordination",
  ],
  surfaces: ["Calls", "Tickets", "Records", "Follow-ups"],
  fit: "If the work lives in calls, tickets, records, and follow-ups, and your team spends its day moving cases through a chain of steps, this is built for you.",
  weaker:
    "If your problem is a single simple task rather than a chain, we will tell you honestly that a lighter tool may fit better.",
}

export const workflowFaqs = [
  {
    question: "Which workflows can actually be automated?",
    answer:
      "The strongest candidates are repetitive, rule-bound chains with a clear outcome, insurance and eligibility verification, intake and scheduling, ticket creation and routing, follow-up and reactivation, and record updates across systems. We audit your specific workflow first and tell you which parts an agent should run and which should stay human, rather than promising to automate everything.",
  },
  {
    question: "How is this different from RPA or the workflow rules we already have?",
    answer:
      "Scripts and rules break the moment reality varies, because they only follow the exact path they were given. Agents handle the judgment inside defined boundaries, execute every step, and escalate what falls outside scope. The result is a workflow that completes across real variation instead of a rule that fails on the first exception and quietly dumps the case back on your team.",
  },
  {
    question: "Does it work with the systems we already use?",
    answer:
      "Yes, that is the core design principle. Agents work inside your existing CRM, ERP, and calendars rather than replacing them, so your team keeps its tools and its system of record. Our healthcare deployment writes results directly back into the client's own system where their staff already work.",
  },
  {
    question: "Who is watching the automation once it runs?",
    answer:
      "We are. QualiCore scores every interaction, drift is caught early, and a person signs off on every change before it ships, so you are never trusting an unattended black box. You also get reporting against the number the workflow was pointed at, so performance is visible, not assumed.",
  },
  {
    question: "How fast can a workflow go live?",
    answer:
      "A focused single workflow typically goes live in weeks from agreement, depending on how many systems it touches. Larger multi-step programs are phased, and we scope the timeline honestly in the audit before anything is committed, so you know the date before you sign.",
  },
]

export const workflowFinal = {
  heading: "Find the workflow that is costing you the most",
  body: "Book a call and we map one workflow end to end, show you where the hours and revenue are leaking, and tell you what running it would return. No pitch, just an honest read on where an agent pays off first.",
  primaryCta: "Book a call",
  secondaryCta: "Start the readiness check",
}

export const workflowSiblings = [
  { name: "AI agent development", href: "/solutions/ai-agent-development" },
  { name: "AI quality and governance", href: "/solutions/ai-quality-assurance" },
  { name: "All solutions", href: "/solutions" },
]

export const READINESS_URL = "/tools/ai-readiness-assessment"
