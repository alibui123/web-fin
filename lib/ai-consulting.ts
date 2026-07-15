import type { LucideIcon } from "lucide-react"
import {
  Search,
  Map,
  Scale,
  ShieldCheck,
  Rocket,
} from "lucide-react"

export const consultingMeta = {
  title: "AI Consulting for Business, Strategy to Live Systems | Finova",
  description:
    "Finova's AI consulting shows you where AI actually pays off, gives you the roadmap, and can build and run it after. Expert direction from a team live in production. Book a call.",
  canonical: "https://finovasolutions.tech/solutions/ai-consulting",
  ogTitle: "AI Consulting for Business, Strategy to Live Systems | Finova",
  ogUrl: "https://finovasolutions.tech/solutions/ai-consulting",
}

export const consultingHero = {
  h1: "Expert direction on where AI pays off, from a team that actually runs it.",
  // Layout slices — exact copy from h1, not new marketing text
  h1Lead: "Expert direction on where AI pays off,",
  h1Accent: "from a team that actually runs it.",
  paragraphs: [
    "Most AI advice comes from people who have never shipped an agent into production. They will hand you a strategy deck, a list of use cases, and an invoice, and leave you to figure out whether any of it survives contact with reality. That is the expensive kind of consulting, confident, generic, and untested.",
    "Our consulting comes from the opposite place. We run AI agents in production today, across healthcare operations, a government ERP, and enterprise sales, so when we tell you where AI will pay off in your business and where it will not, we are speaking from what we have watched work and fail in the wild, not from a slide. You get a clear read, a real roadmap, and a partner who can build and run what we recommend, or hand it off cleanly if you would rather not. Direction you can act on, from people who have done the thing.",
  ],
  primaryCta: "Book a consulting call",
  secondaryCta: "Start two-minute readiness check",
  secondaryHref: "/tools/ai-readiness-assessment",
}

export const consultingProblem = {
  heading: "Strategy that has never survived production is just a guess in a nicer font",
  paragraphs: [
    "The AI consulting market is full of confident advice from people who have never operated what they recommend. They have read the case studies. They have not been on the call at 2 a.m. when an agent hit an edge case nobody planned for. And that gap shows up exactly where it costs you, in a roadmap that looks great in the boardroom and falls apart in the build.",
    "The result is a familiar pattern. A business pays for a strategy, gets a polished deck full of use cases, and then discovers that the advice was generic, that the recommended workflow was not actually the bottleneck, or that the whole thing assumed a level of data and integration readiness that does not exist. The deck goes in a drawer, the money is gone, and the operator is no closer to knowing where AI actually belongs in their business.",
    "Advice is only worth what the experience behind it is worth. Ours is measured in live deployments, which means our recommendations are grounded in what agents actually do when they meet a real operation, not in what a vendor hopes they will do.",
  ],
  // Layout slices — exact phrases, not new copy
  arc: [
    "looks great in the boardroom",
    "falls apart in the build",
    "The deck goes in a drawer",
  ] as const,
}

export type ConsultingDeliverable = {
  title: string
  body: string
  icon: LucideIcon
  accent: string
}

export const consultingDeliverablesHeading = "What you get from an engagement"

export const consultingDeliverables: ConsultingDeliverable[] = [
  {
    title: "An AI opportunity assessment across your operation.",
    body: "We look at how your business actually runs, where inquiries arrive, what your team does by hand, where cases stall, and where work falls between systems, and we identify where AI would return real money and where it would not. Not a wishlist, a prioritized read on your specific operation.",
    icon: Search,
    accent: "from-finova-cyan to-finova-lightBlue",
  },
  {
    title: "A roadmap you can act on.",
    body: "The workflows to tackle, in what order, and why, sequenced by what returns the most for the least risk. You leave knowing not just that AI could help, but exactly where to start and what to do second.",
    icon: Map,
    accent: "from-finova-magenta to-finova-purple",
  },
  {
    title: "Honest build-versus-buy direction.",
    body: "For each opportunity, we tell you whether you should build custom, adopt an existing tool, or leave it human, and we will tell you to buy off the shelf when that is the right answer, because getting this call right is the entire point of hiring an expert.",
    icon: Scale,
    accent: "from-finova-purple to-finova-cyan",
  },
  {
    title: "Governance and readiness guidance.",
    body: "What you need in place, data, integration, oversight, for an agent to be safe to run in your environment, especially if you operate under real compliance rules. This is where most AI projects quietly fail, and where our production experience is worth the most.",
    icon: ShieldCheck,
    accent: "from-finova-lightBlue to-finova-magenta",
  },
  {
    title: "A clear path to live, if you want one.",
    body: "Because we build and run agents ourselves, the roadmap does not end at advice. When you are ready, the same team that told you where AI pays off can build it and operate it, so nothing gets lost in a handoff to a separate vendor.",
    icon: Rocket,
    accent: "from-finova-cyan to-finova-purple",
  },
]

export const consultingAudit = {
  heading: "Start with the audit",
  paragraphs: [
    "The fastest way into a consulting engagement is the audit, our focused entry point. We map one workflow that is costing you the most, show you where the hours and revenue are going, and give you an honest read on what an agent would return. It is real work with a written deliverable, and it stands on its own, useful whether you go further with us, take it to your own team, or act on it yourself.",
    "For most operators the audit answers the immediate question, where should we start. From there, a fuller consulting engagement widens the lens to the whole operation, and a build engagement puts the first recommendation into production. You can stop at any rung, and each one is worth something on its own.",
  ],
}

export const consultingWhy = {
  heading: "Why our read is worth more than a deck",
  paragraphs: [
    "We are not consultants who have read about AI in operations. We run it. We automated nine modules inside a government Odoo ERP for Telecom Foundation, a Ministry of IT and Telecom subsidiary. We run insurance verification for Sirius Solutions Global at roughly fifty calls a day. We built an outbound agent that booked seventy qualified meetings in month two for Advanzatech.",
    "That production track record changes what our advice is worth. When we look at your operation, we are not guessing at what an agent can and cannot do, we know, because we have built and run agents against real workflows and watched precisely where they succeed and where they struggle. And because we can build and run what we recommend, our advice is accountable, we are not pointing you toward work we would never have to answer for.",
  ],
  // Layout slices — exact phrases from paragraphs, not new copy
  lead: "We are not consultants who have read about AI in operations. We run it.",
  cases: [
    {
      name: "Telecom Foundation",
      href: "/customers/telecom-foundation",
      body: "We automated nine modules inside a government Odoo ERP for Telecom Foundation, a Ministry of IT and Telecom subsidiary.",
    },
    {
      name: "Sirius Solutions Global",
      href: "/customers/sirius-solutions",
      body: "We run insurance verification for Sirius Solutions Global at roughly fifty calls a day.",
    },
    {
      name: "Advanzatech",
      href: "/customers/advanzatech",
      body: "We built an outbound agent that booked seventy qualified meetings in month two for Advanzatech.",
    },
  ],
  close:
    "That production track record changes what our advice is worth. When we look at your operation, we are not guessing at what an agent can and cannot do, we know, because we have built and run agents against real workflows and watched precisely where they succeed and where they struggle. And because we can build and run what we recommend, our advice is accountable, we are not pointing you toward work we would never have to answer for.",
  telecomHref: "/customers/telecom-foundation",
  siriusHref: "/customers/sirius-solutions",
  advanzatechHref: "/customers/advanzatech",
}

export const consultingHonesty = {
  heading: "We will tell you when the answer is not us, or not AI",
  paragraphs: [
    "The most valuable thing a consultant can say is no. If a workflow should stay human, we will say so. If a proven off-the-shelf tool already solves your problem better and cheaper than a custom build, we will point you to it. If your operation is not yet ready for an agent, on data, on process, on integration, we will tell you what to fix first rather than sell you a build that will fail.",
    "That honesty is not a soft touch, it is the whole value. Advice you can only act on by buying more from the person giving it is not advice, it is a sales pitch. Ours is worth acting on precisely because we are willing to send you elsewhere, which is also why, when we do recommend building, you can trust the recommendation.",
  ],
  // Layout slices — exact phrases from paragraphs, not new copy
  lead: "The most valuable thing a consultant can say is no.",
  nos: [
    {
      mark: "stay human",
      body: "If a workflow should stay human, we will say so.",
    },
    {
      mark: "off-the-shelf",
      body: "If a proven off-the-shelf tool already solves your problem better and cheaper than a custom build, we will point you to it.",
    },
    {
      mark: "not yet ready",
      body: "If your operation is not yet ready for an agent, on data, on process, on integration, we will tell you what to fix first rather than sell you a build that will fail.",
    },
  ],
  close:
    "That honesty is not a soft touch, it is the whole value. Advice you can only act on by buying more from the person giving it is not advice, it is a sales pitch. Ours is worth acting on precisely because we are willing to send you elsewhere, which is also why, when we do recommend building, you can trust the recommendation.",
}

export const consultingAudience = {
  heading: "Who this is for",
  paragraphs: [
    "High-ticket operators who know AI should be part of their business and want expert direction on where, before or instead of committing to a full build. Leaders who would rather pay for a grounded read from people who run AI in production than a generic strategy from people who have only studied it. And teams in regulated or high-trust settings who need to know an opportunity is real and safe before they move on it.",
    "It is a weaker fit if you want a large strategy deck for its own sake with no intention of acting on it, or if you have already fully decided exactly what to build and only want the cheapest hands to execute. We consult to get you to a working outcome, not to produce paper.",
  ],
}

export const consultingFaqs = [
  {
    question: "How is your consulting different from a big firm's AI strategy engagement?",
    answer:
      "We run AI agents in production, so our advice is grounded in what agents actually do in real operations, not in research or generic frameworks. And because we can build and run what we recommend, our roadmap ends in a working system if you want it, rather than a deck you then have to find someone else to execute.",
  },
  {
    question: "Do we have to build with you after the consulting?",
    answer:
      "No. The consulting and the audit stand on their own, and you can act on the roadmap with your own team, a different vendor, or existing tools. We built it that way on purpose, because advice you can only use by buying more from us would not be worth trusting. When we do recommend building, it is because it is genuinely the right call.",
  },
  {
    question: "What does a consulting engagement cost?",
    answer:
      "It depends on scope, and we will give you a clear model before you commit. The lowest-commitment entry is the audit, a focused piece of paid work with a written deliverable, and a fuller engagement widens the lens across your whole operation. Ask us on the call and we will scope the right level for where you are.",
  },
  {
    question: "Will you just tell us to build AI everywhere?",
    answer:
      "No, and that is the point of hiring us specifically. We will tell you where AI pays off, where an off-the-shelf tool is the better answer, and where a workflow should stay human. Telling you not to build is part of the value, and it is how you know the recommendations you do get are honest.",
  },
  {
    question: "Can you help us get ready if we are not there yet?",
    answer:
      "Yes. Part of the engagement is an honest read on readiness, your data, your processes, your integration, and your governance, and what needs to be in place for an agent to run safely in your environment. If you are not ready, we tell you what to fix first rather than sell you a build that would fail, which is where our production experience is worth the most.",
  },
]

export const consultingFinal = {
  heading: "Get expert direction on where AI actually fits",
  body: "Book a consulting call and we will map where AI pays off in your business, give you a roadmap you can act on, and tell you honestly where it does not fit. Start with the audit, widen to the whole operation, and take it to live only if and when it makes sense.",
  primaryCta: "Book a consulting call",
  secondaryCta: "Start the readiness check",
  secondaryHref: "/tools/ai-readiness-assessment",
}

export const consultingSiblings = [
  { name: "Custom AI development", href: "/solutions/custom-ai-development" },
  { name: "Workflow automation", href: "/solutions/workflow-automation" },
  { name: "All solutions", href: "/solutions" },
  { name: "How it works", href: "/how-it-works" },
  { name: "Pricing", href: "/pricing" },
  { name: "Customers", href: "/customers" },
]
