import type { LucideIcon } from "lucide-react"
import {
  Search,
  FlaskConical,
  Rocket,
  FileCheck2,
  Shield,
  Scale,
} from "lucide-react"

export const pricingMeta = {
  title: "Pricing and Engagement Model | Finova",
  description:
    "Finova is priced by the workflow we run, not per seat. Audit first, a paid pilot to prove it, then a clear model before you commit to more. See how it works.",
  canonical: "https://finovasolutions.tech/pricing",
  ogTitle: "Pricing and Engagement Model | Finova",
  ogUrl: "https://finovasolutions.tech/pricing",
}

export const pricingHero = {
  h1: "Priced by the workflow , not by the seat.",
  // Layout slices — exact copy from h1 / paragraphs, not new marketing text
  h1Lead: "Priced by the workflow,",
  h1Accent: "not by the seat.",
  paragraphs: [
    "You will not find a price list on this page, and that is deliberate, not evasive. A fixed number on a screen would either overcharge a simple workflow or badly underprice a complex one, and you would have no way to tell which. So we price against the thing that actually matters, the workflow we run and what it returns, and we tell you the full model in writing before you commit to anything.",
    "Here is what is always true. The first step is an audit, so you see the value before you see an invoice. Engagements begin with a paid pilot, so both sides prove the outcome on real work before scaling. And you get a clear engagement model in writing before any commitment. We do not discount, we de-risk.",
  ],
  introLead:
    "You will not find a price list on this page, and that is deliberate, not evasive.",
  introBody:
    "A fixed number on a screen would either overcharge a simple workflow or badly underprice a complex one, and you would have no way to tell which. So we price against the thing that actually matters, the workflow we run and what it returns, and we tell you the full model in writing before you commit to anything.",
  alwaysTrueLead: "Here is what is always true.",
  alwaysTrueBeats: [
    {
      mark: "audit",
      body: "The first step is an audit, so you see the value before you see an invoice.",
    },
    {
      mark: "paid pilot",
      body: "Engagements begin with a paid pilot, so both sides prove the outcome on real work before scaling.",
    },
    {
      mark: "in writing",
      body: "And you get a clear engagement model in writing before any commitment.",
    },
  ],
  alwaysTrueClose: "We do not discount, we de-risk.",
  // Ledger labels — exact phrases from hero copy, layout only
  ledgerVoid: ["A fixed number on a screen", "not by the seat."],
  ledgerScope: "the workflow we run and what it returns",
  ledgerCommit: "the full model in writing before you commit to anything",
  primaryCta: "Book your audit call",
  secondaryCta: "Start the readiness check",
  secondaryHref: "/tools/ai-readiness-assessment",
}

export const pricingReframe = {
  heading: "Why there is no number on this page",
  paragraphs: [
    "The honest reason is that the right price depends entirely on the work. Automating a single follow-up sequence and automating nine modules of a government ERP are not the same job, and pretending they cost the same, or posting a number that only fits one of them, would be the opposite of helpful.",
    "There is a second reason, and it matters more. The question that should drive the decision is not what does this cost, it is what is the manual version already costing you. The hours your team spends on repetitive work, the leads that book elsewhere after hours, the revenue that leaks out of a broken handoff, all of that is a bill you are already paying, every month, whether or not you ever hire us. Our pricing is scoped against that, against what the workflow returns when an agent runs it, so the decision is a comparison between two real numbers, not a leap toward an abstract one. You will have both before you commit.",
  ],
}

export type PricingStage = {
  label: string
  title: string
  lead: string
  body: string
  recommended: boolean
  recommendedLabel?: string
  icon: LucideIcon
  accent: string
}

export const pricingStagesHeading = "How an engagement is structured"

export const pricingStages: PricingStage[] = [
  {
    label: "Stage one.",
    title: "The audit.",
    lead: "For anyone deciding whether an agent makes sense at all.",
    body: "We map one workflow end to end and come back with a written picture of where your hours and revenue are going, the one workflow to start with, and an honest read on what running it would return, including when the answer is that you should not build. It is real work with a real deliverable, and it stands on its own whatever you decide next.",
    recommended: false,
    icon: Search,
    accent: "from-finova-cyan to-finova-lightBlue",
  },
  {
    label: "Stage two.",
    title: "The paid pilot.",
    recommendedLabel: "The recommended way in.",
    lead: "For teams ready to prove it on their own operation, not a demo.",
    body: "We put one agent live on one workflow inside your stack, pointed at a number you agreed on, run and governed by us, and reported on regularly. It is deliberately contained, small enough to decide on quickly, real enough to prove the outcome on your actual work. This is where most engagements begin, because it turns the whole question from will this work into here is what it did.",
    recommended: true,
    icon: FlaskConical,
    accent: "from-finova-magenta to-finova-purple",
  },
  {
    label: "Stage three.",
    title: "The full engagement.",
    lead: "For operations ready to scale what the pilot proved.",
    body: "We expand the agent across the workflows that matter, run and monitor them, govern quality with QualiCore, and report against the numbers each one was pointed at. You get a clear engagement model in writing before this stage begins, so scaling is a decision made on evidence, not on faith.",
    recommended: false,
    icon: Rocket,
    accent: "from-finova-purple to-finova-cyan",
  },
]

export const pricingAlwaysTrue = {
  heading: "What holds at every stage",
  body: "You get a clear model in writing before any commitment, so there are no surprises on an invoice. Your systems stay the system of record at every stage, your records live in your tools, not ours. And we do not discount our way into a deal, because a discount is just a signal the first price was not honest. What we do instead is de-risk, the audit stands alone, and the pilot proves the outcome on real work before you scale. That is a better deal for a serious buyer than any discount, because it removes the actual risk, which is spending on a build that does not land.",
  principles: [
    {
      text: "You get a clear model in writing before any commitment, so there are no surprises on an invoice.",
      icon: FileCheck2,
    },
    {
      text: "Your systems stay the system of record at every stage, your records live in your tools, not ours.",
      icon: Shield,
    },
    {
      text: "And we do not discount our way into a deal, because a discount is just a signal the first price was not honest. What we do instead is de-risk, the audit stands alone, and the pilot proves the outcome on real work before you scale. That is a better deal for a serious buyer than any discount, because it removes the actual risk, which is spending on a build that does not land.",
      icon: Scale,
    },
  ],
}

export const pricingInaction = {
  heading: "The most expensive option is usually to keep doing it by hand",
  body: "It is worth naming the option nobody puts on a pricing page. Doing nothing has a price too, and for most of the operators we work with it is the highest one on the list. It is a salary of hours spent on work a machine should handle, a steady drip of leads and revenue leaking out of the gaps, and a cost that grows every time the business does, because the manual layer scales with volume. The audit exists to put a real number on that, so you can weigh what an agent costs against what the status quo is already costing you, and make the call on evidence.",
  // Layout slices — exact text from body, not new copy
  lead: "It is worth naming the option nobody puts on a pricing page. Doing nothing has a price too, and for most of the operators we work with it is the highest one on the list.",
  costs: [
    "a salary of hours spent on work a machine should handle",
    "a steady drip of leads and revenue leaking out of the gaps",
    "a cost that grows every time the business does, because the manual layer scales with volume",
  ],
  audit:
    "The audit exists to put a real number on that, so you can weigh what an agent costs against what the status quo is already costing you, and make the call on evidence.",
  auditAnchor: "The audit",
  auditHref: "/solutions/ai-consulting",
}

export const pricingProof = {
  heading: "Priced against outcomes we have actually delivered",
  body: "This is not theoretical pricing for theoretical results. Telecom Foundation runs nine automated Odoo modules with us. Sirius Solutions Global runs insurance verification through our agent at roughly fifty calls a day. Advanzatech booked seventy qualified meetings in month two. When we scope a price against what a workflow will return, it is grounded in what we have already returned for operators like you. Read the full stories on our customers page.",
  telecomHref: "/customers/telecom-foundation",
  siriusHref: "/customers/sirius-solutions",
  advanzatechHref: "/customers/advanzatech",
  customersHref: "/customers",
  customersAnchor: "customers page",
}

export const pricingAudience = {
  heading: "Who this model fits",
  paragraphs: [
    "Operators who care more about what a workflow returns than about the lowest sticker price, and who would rather prove an outcome on a contained pilot than gamble on a big build. If you want a partner accountable for a result, this model is built for you.",
    "It is a weaker fit if you are shopping purely on the cheapest hourly rate to execute a spec you have already fully decided, with no interest in whether it is the right thing to build. There are cheaper vendors for that, and we will say so plainly rather than pretend to compete on price alone.",
  ],
}

export const pricingFaqs = [
  {
    question: "Why will you not just tell me a price?",
    answer:
      "Because a fixed price would either overcharge a simple workflow or underprice a complex one, and you would have no way to know which you were getting. Scoping the price to the workflow keeps it honest, and you get the full model in writing after the audit, before you commit to anything, so you are never guessing.",
  },
  {
    question: "What does the audit cost?",
    answer:
      "Ask us on the call, because it depends on scope, and we run focused audits as the natural first step of an engagement. What matters is that it is real work with a written deliverable that stands on its own, so you get value from it regardless of whether you build with us afterward.",
  },
  {
    question: "Is there a minimum commitment?",
    answer:
      "Engagements start with a paid pilot on a single workflow, which is deliberately contained, small enough to decide on quickly and real enough to prove the outcome on your own operation rather than a demo. You prove it before you scale it, so you are never committing to a large program on faith.",
  },
  {
    question: "Do you offer discounts or a money-back guarantee?",
    answer:
      "No, and that is a deliberate choice. We do not discount, because a discount usually means the first price was not honest. Instead we de-risk, the audit stands alone and the pilot proves the outcome on real work, which protects you from the actual risk far better than a discount would.",
  },
  {
    question: "How does pricing scale as we add more workflows?",
    answer:
      "It is scoped to each workflow and what it returns, not stacked per seat, so adding a second or third workflow is priced on its own merits and its own outcome. And because the core is already inside your systems after the first build, each additional workflow is faster and cheaper to add than the last. You get the full model in writing before scaling.",
  },
]

export const pricingFaqsHeading = "Questions operators ask"

export const pricingFinal = {
  heading: "See the value before you see an invoice",
  body: "Book the audit call and we map where you are losing time and revenue, tell you what an agent would return, and give you a clear engagement model in writing. No number on a screen you cannot trust, just an honest comparison between two real costs.",
  primaryCta: "Book your audit call",
  secondaryCta: "Start the readiness check",
  secondaryHref: "/tools/ai-readiness-assessment",
}

export const pricingSiblings = [
  { name: "AI consulting", href: "/solutions/ai-consulting" },
  { name: "How it works", href: "/how-it-works" },
  { name: "All solutions", href: "/solutions" },
  { name: "Trust", href: "/trust" },
  { name: "Customers", href: "/customers" },
]
