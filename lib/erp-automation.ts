import type { LucideIcon } from "lucide-react"
import {
  FilePenLine,
  GitBranch,
  LineChart,
  Layers,
  Ban,
  ShieldCheck,
  Clock,
} from "lucide-react"

export const erpMeta = {
  title: "AI ERP and Odoo Automation, Run for You | Finova",
  description:
    "Finova turns your Odoo or ERP into agents that create records, route work, and report on their own, under human sign-off. Live in government. Book a call.",
  canonical: "https://finovasolutions.tech/solutions/erp-automation",
  ogTitle: "AI ERP and Odoo Automation, Run for You | Finova",
  ogUrl: "https://finovasolutions.tech/solutions/erp-automation",
}

export const erpHero = {
  h1: "Turn your ERP into an operator, not a filing cabinet.",
  paragraphs: [
    "Your ERP was supposed to run your business. Instead, your business runs it. Someone still has to open it, key in the record, chase the approval, update the status, and rebuild the same report every week. The system holds everything and does almost nothing on its own, so the work it was meant to remove is still sitting on your team's desk.",
    "We put AI agents inside your Odoo or ERP so the back office actually runs itself. Records get created, work gets routed, reports build on their own, and a person stays in control of every change. It works inside the system you already have, so there is no migration, no rip and replace, and no year-long project. You keep the outcome. We answer for it.",
  ],
  primaryCta: "Book a call",
  primaryMicro: "We map the module costing you the most first. No pitch.",
  secondaryCta: "Start the readiness check",
}

export const erpProblem = {
  heading: "The most expensive software you own is running on manual labor",
  paragraphs: [
    "You paid for the ERP, the implementation, the seats, and the training. And your team is still doing by hand the exact work the system was sold to remove. Someone re-keys data between modules that do not talk. Someone chases a manager for an approval that has sat untouched for three days. Someone rebuilds the performance report every Monday because the ERP will show the numbers but will not assemble them.",
    "None of that is a software gap. Your ERP can technically do all of it. The gap is that it waits, it needs a human to press every button, make every decision, and move every case to the next step. So the more your business grows, the more people you hire just to operate the system you already bought, and the cost of that manual layer compounds quietly, one keystroke and one chased approval at a time.",
    "An agent removes the waiting. It reads the request, decides the next step inside boundaries you set, and takes the action directly in the ERP, then escalates only what genuinely needs a person. The system stops being a place where work is recorded and becomes something that actually does the work.",
  ],
  // Layout slices — exact phrases from paragraphs, not new copy
  lead: "You paid for the ERP, the implementation, the seats, and the training. And your team is still doing by hand the exact work the system was sold to remove.",
  labors: [
    {
      verb: "re-keys",
      body: "Someone re-keys data between modules that do not talk.",
    },
    {
      verb: "chases",
      body: "Someone chases a manager for an approval that has sat untouched for three days.",
    },
    {
      verb: "rebuilds",
      body: "Someone rebuilds the performance report every Monday because the ERP will show the numbers but will not assemble them.",
    },
  ],
  gap: "None of that is a software gap. Your ERP can technically do all of it. The gap is that it waits, it needs a human to press every button, make every decision, and move every case to the next step. So the more your business grows, the more people you hire just to operate the system you already bought, and the cost of that manual layer compounds quietly, one keystroke and one chased approval at a time.",
  agent:
    "An agent removes the waiting. It reads the request, decides the next step inside boundaries you set, and takes the action directly in the ERP, then escalates only what genuinely needs a person. The system stops being a place where work is recorded and becomes something that actually does the work.",
}

export type ErpRunItem = {
  title: string
  body: string
  icon: LucideIcon
  accent: string
}

export const erpRunsHeading = "What we run inside your ERP"

export const erpRuns: ErpRunItem[] = [
  {
    title: "Records created and updated automatically.",
    body: "The agent writes into your ERP where your team already works, creating and updating records without anyone re-keying data between modules. What used to be manual entry becomes a byproduct of the work getting done.",
    icon: FilePenLine,
    accent: "from-finova-cyan to-finova-lightBlue",
  },
  {
    title: "Work routed and escalated on its own.",
    body: "Routine cases move through their steps without a person pushing them, and only the exceptions that need judgment reach a named human, with the full context attached. Your managers stop being the bottleneck on every approval.",
    icon: GitBranch,
    accent: "from-finova-magenta to-finova-purple",
  },
  {
    title: "Reporting that assembles itself.",
    body: "KPI and performance views are built and refreshed on their own, so the numbers are ready when you need them instead of rebuilt by hand every week. Leadership gets a live read on performance, not a Monday-morning reconstruction.",
    icon: LineChart,
    accent: "from-finova-purple to-finova-cyan",
  },
  {
    title: "Modules that finally work as one.",
    body: "HR, tasks, accounts, and performance run as a single governed flow rather than separate screens a person has to bridge. The seams where work used to fall through, and where someone copied data from one module to another, close.",
    icon: Layers,
    accent: "from-finova-lightBlue to-finova-magenta",
  },
]

export const erpHow = {
  heading: "How it goes live, without the year-long project",
  body: "We start with the single module or workflow that is costing you the most, not a full transformation. We map it, build the agent inside your existing ERP, and test it against real cases before it touches live data. We point it at a number you chose, hours returned or turnaround time, and report against it. Then we run it, watch it, and expand to the next module once the first one has earned it. You see value from the first workflow, not eighteen months in. See the full model on how it works.",
  howItWorksAnchor: "how it works",
  howItWorksHref: "/how-it-works",
  // Layout slices — exact sentences from body, not new copy
  stages: [
    {
      verb: "Start",
      body: "We start with the single module or workflow that is costing you the most, not a full transformation.",
    },
    {
      verb: "Map",
      body: "We map it, build the agent inside your existing ERP, and test it against real cases before it touches live data.",
    },
    {
      verb: "Point",
      body: "We point it at a number you chose, hours returned or turnaround time, and report against it.",
    },
    {
      verb: "Run",
      body: "Then we run it, watch it, and expand to the next module once the first one has earned it.",
    },
  ],
  value:
    "You see value from the first workflow, not eighteen months in.",
  coda: "See the full model on how it works.",
}

export const erpProof = {
  heading: "Proven inside a government ERP",
  body: "Telecom Foundation is a subsidiary of the Ministry of IT and Telecom. Public institutions do not hand their core systems to a young company on faith, they test, they scrutinize, and they hold vendors to a standard most private buyers never apply. We automated nine modules across their Odoo ERP, HR, task assignment, KPI and performance tracking, and accounts, turning administration that was done by hand into agents that run the back office on their own, always with a person in control.",
  bodyClose:
    "The point is not just that it works. It is that it works inside the real complexity of a government operation, at a standard a public institution was willing to sign off on, which is the hardest proof there is that it will work inside yours.",
  quote:
    "Finova reshaped how our teams use Odoo every day. Their agents took the most tedious parts of task assignment off our seniors and gave managers honest, real-time insight into performance, always with a person in control. What stood out was their technical depth, and how plainly they explained it.",
  attribution:
    "Atifa Ehsan, EVP HR and Admin, Telecom Foundation, Ministry of IT. Live in production, nine modules.",
  customersHref: "/customers/telecom-foundation",
  governmentHref: "/industries/government",
}

export type ErpNotItem = {
  title: string
  body: string
  icon: LucideIcon
}

export const erpNotHeading = "What this is not"

export const erpNotIntro =
  "If you have lived through an ERP project, you have earned the right to be skeptical, so here is what we are not."

export const erpNotItems: ErpNotItem[] = [
  {
    title: "This is not a migration.",
    body: "We do not move you onto a new platform or ask your team to abandon the ERP they know. The agents work inside your existing Odoo or ERP. Your system of record does not change.",
    icon: Ban,
  },
  {
    title: "This is not a year-long transformation.",
    body: "We start with one module, prove it against a number, and expand from there. If the first workflow does not earn its place, there is no second one to worry about.",
    icon: Clock,
  },
  {
    title: "This is not an unattended black box.",
    body: "Nothing the agent does ships without a human able to see it and sign off on it. QualiCore scores every action it takes, and a person approves changes before they go live, so autonomy never means unaccountable.",
    icon: ShieldCheck,
  },
]

export const erpGovernance = {
  heading: "Every action, scored and signed off",
  body: "QualiCore, our QA engine, scores every action the agent takes inside your ERP against the standards that matter, shows the reason behind every score in plain language a manager can read, and a person on our team signs off on every change before it ships. You get autonomy without losing control, and drift is caught early instead of after it corrupts a report. Every deployment is architected to meet the data rules of the region it runs in, with zero retention by default and your ERP remaining the system of record. See how we handle data and security.",
  trustAnchor: "data and security",
  trustHref: "/trust",
  // Layout slices — exact text from body, not new copy
  phases: [
    {
      label: "scores",
      text: "QualiCore, our QA engine, scores every action the agent takes inside your ERP against the standards that matter,",
    },
    {
      label: "reason",
      text: "shows the reason behind every score in plain language a manager can read,",
    },
    {
      label: "signs off",
      text: "and a person on our team signs off on every change before it ships.",
    },
  ],
  autonomy:
    "You get autonomy without losing control, and drift is caught early instead of after it corrupts a report.",
  data: "Every deployment is architected to meet the data rules of the region it runs in, with zero retention by default and your ERP remaining the system of record.",
  coda: "See how we handle data and security.",
}

export const erpAudience = {
  heading: "Who this is for",
  paragraphs: [
    "Operations and finance leaders running expensive, hand-keyed administration inside Odoo or another ERP, where the system stores the work but people still do it, and where headcount keeps rising just to keep the back office moving.",
    "It is a weaker fit if your ERP is barely used, if your processes are not yet defined enough to hand to an agent, or if you want a full platform migration rather than automation inside what you have. We will tell you that honestly on the call rather than sell you a build that will not land.",
  ],
  // Layout slices — exact text from paragraphs, not new copy
  fit: "Operations and finance leaders running expensive, hand-keyed administration inside Odoo or another ERP, where the system stores the work but people still do it, and where headcount keeps rising just to keep the back office moving.",
  weaker:
    "It is a weaker fit if your ERP is barely used, if your processes are not yet defined enough to hand to an agent, or if you want a full platform migration rather than automation inside what you have. We will tell you that honestly on the call rather than sell you a build that will not land.",
}

export const erpFaqs = [
  {
    question: "Will this break or interfere with our existing ERP?",
    answer:
      "No. Agents work inside your existing Odoo or ERP through its own interfaces, creating and updating records the same way a trained staff member would, under scope boundaries you approve. Your ERP stays your system of record, and our government deployment runs directly inside the client's own Odoo environment.",
  },
  {
    question: "Which ERP modules can actually be automated?",
    answer:
      "The strongest candidates are repetitive, rule-bound modules with clear outcomes, HR administration, task assignment, KPI and performance tracking, and accounts. We audit yours first and tell you which parts an agent should run and which should stay human, rather than promising to automate the whole system.",
  },
  {
    question: "How is this different from the workflow rules already in our ERP?",
    answer:
      "Built-in rules only follow the exact path they were given, so they break the moment a case does not match. Agents handle the judgment inside boundaries, execute the steps, and escalate what falls outside scope, so the work completes across real variation instead of failing on the first exception.",
  },
  {
    question: "Who controls what the agent is allowed to change?",
    answer:
      "You do. QualiCore scores every action and a person approves every change before it ships, so the agent clears the routine load while real control stays with your team. You set the boundaries, and nothing crosses them without a human.",
  },
  {
    question: "How long until we see something working?",
    answer:
      "We go live one module at a time, so you see a working workflow in weeks, not at the end of a long program. Our government engagement went live in stages and expanded to nine modules as each one proved out. We scope your first module and its timeline honestly in the audit before you commit.",
  },
]

export const erpFinal = {
  heading: "Find the part of your back office that is bleeding hours",
  body: "Book a call and we map the module costing you the most, show you where the manual hours are going, and tell you what automating it would return. No pitch, just an honest read on where your ERP should start running itself.",
  primaryCta: "Book a call",
  secondaryCta: "Start the readiness check",
}

export const erpSiblings = [
  { name: "Workflow automation", href: "/solutions/workflow-automation" },
  { name: "AI quality and governance", href: "/solutions/ai-quality-assurance" },
  { name: "All solutions", href: "/solutions" },
]

export const READINESS_URL = "/tools/ai-readiness-assessment"
