import type { LucideIcon } from "lucide-react"
import {
  MessageSquare,
  FileSearch,
  Eye,
  Bot,
} from "lucide-react"

export const customAiMeta = {
  title: "Custom AI Development Company, One Capability | Finova",
  description:
    "Finova builds custom AI, voice, vision, language, and software, as one agentic capability inside your stack, then runs what it builds. Book a call.",
  canonical: "https://finovasolutions.tech/solutions/custom-ai-development",
  ogTitle: "Custom AI Development Company, One Capability | Finova",
  ogUrl: "https://finovasolutions.tech/solutions/custom-ai-development",
}

export const customAiHero = {
  h1: "Custom AI for the problems no tool off the shelf will solve.",
  paragraphs: [
    "Some of the most expensive work in your business does not fit any product you can buy. It is specific to how you operate, buried in your documents, your images, your data, or a workflow no vendor has ever seen. So you either keep doing it by hand, or you buy a tool that almost fits and bend your process around its limitations.",
    "We build for exactly that work. Voice, vision, language, and software are not four separate services here, they are applications of one agentic capability, shaped around your problem instead of forcing your problem into someone else's product. And because we run what we build, the custom system does not become a one-off you are left to maintain alone. You keep the outcome. We answer for it.",
  ],
  primaryCta: "Book a call",
  primaryMicro: "We tell you honestly whether custom is the right answer. No pitch.",
  secondaryCta: "Start readiness check",
  secondaryHref: "/tools/ai-readiness-assessment",
}

export const customAiProblem = {
  heading: "When the tool almost fits, you pay for the gap forever",
  paragraphs: [
    "Off-the-shelf software is built for the average customer, which means it fits the average of your work and misses the parts that make your business yours. So you adapt. You add a manual step to cover what the tool cannot do. You export, fix it by hand, and re-import. You hire a person whose whole job is to bridge the gap between what the software does and what you actually need.",
    "That gap does not close on its own. It becomes a permanent tax, paid in hours every week, on the exact work that is most specific to how you operate, and therefore most valuable. The more your business grows, the more that manual bridge costs, and the harder it is to hire around, because the person doing it is the only one who understands it.",
    "Custom AI is worth building when that gap is real and permanent, when the work is core to your business, when compliance or control means the system has to live inside infrastructure you own, or when the thing you need simply does not exist as a product. In those cases, a system shaped around your process pays for itself, because it removes a cost that was never going to go away.",
  ],
  // Layout slices — exact phrases from paragraphs, not new copy
  lead: "Off-the-shelf software is built for the average customer, which means it fits the average of your work and misses the parts that make your business yours. So you adapt.",
  adapts: [
    {
      verb: "add",
      body: "You add a manual step to cover what the tool cannot do.",
    },
    {
      verb: "export",
      body: "You export, fix it by hand, and re-import.",
    },
    {
      verb: "hire",
      body: "You hire a person whose whole job is to bridge the gap between what the software does and what you actually need.",
    },
  ],
  tax: "That gap does not close on its own. It becomes a permanent tax, paid in hours every week, on the exact work that is most specific to how you operate, and therefore most valuable. The more your business grows, the more that manual bridge costs, and the harder it is to hire around, because the person doing it is the only one who understands it.",
  close:
    "Custom AI is worth building when that gap is real and permanent, when the work is core to your business, when compliance or control means the system has to live inside infrastructure you own, or when the thing you need simply does not exist as a product. In those cases, a system shaped around your process pays for itself, because it removes a cost that was never going to go away.",
}

export type CustomAiBuildItem = {
  title: string
  body: string
  icon: LucideIcon
  accent: string
}

export const customAiBuildsHeading = "What one capability lets us build"

export const customAiBuilds: CustomAiBuildItem[] = [
  {
    title: "Conversational and voice systems.",
    body: "Custom agents that speak your customers' languages and run your specific processes, built on production-grade voice infrastructure rather than a generic bot bolted onto your site.",
    icon: MessageSquare,
    accent: "from-finova-cyan to-finova-lightBlue",
  },
  {
    title: "Language and document intelligence.",
    body: "Turning the conversations, forms, and documents your business runs on into structured data your systems can act on, so information that used to be trapped in paperwork and calls becomes something your team can use.",
    icon: FileSearch,
    accent: "from-finova-magenta to-finova-purple",
  },
  {
    title: "Vision and pattern systems.",
    body: "Reading images and live data for the patterns a person would have to catch by eye, applied to the inspection, verification, and monitoring work that does not fit a standard tool.",
    icon: Eye,
    accent: "from-finova-purple to-finova-cyan",
  },
  {
    title: "Agentic software.",
    body: "Bespoke systems where the AI does the work end to end inside your environment, with hard scope boundaries and human escalation designed in from the first line, not added later.",
    icon: Bot,
    accent: "from-finova-lightBlue to-finova-magenta",
  },
]

export const customAiBuildsClose =
  "The reason we can build across all of these with one team is that underneath, it is one agentic capability, understand the request, decide the next step, act inside your systems, and check the result. That is why a custom build with us compounds instead of becoming an isolated project no one else can touch."

export const customAiHow = {
  heading: "How a custom build works, without becoming a science project",
  body: "We start by pressure-testing the idea, and part of that is telling you honestly whether custom is even the right call. If it is, we scope the problem tightly, build inside your environment, and point the system at a defined outcome so success is measurable, not a matter of opinion. Then we run it, because a custom system nobody operates is where most bespoke AI quietly dies. You get a system that keeps working, not a proof of concept that impressed once and then aged out. See the full model on how it works.",
  howItWorksAnchor: "how it works",
  howItWorksHref: "/how-it-works",
  // Layout slices — exact sentences from body, not new copy
  stages: [
    {
      verb: "Start",
      body: "We start by pressure-testing the idea, and part of that is telling you honestly whether custom is even the right call.",
    },
    {
      verb: "Scope",
      body: "If it is, we scope the problem tightly, build inside your environment, and point the system at a defined outcome so success is measurable, not a matter of opinion.",
    },
    {
      verb: "Run",
      body: "Then we run it, because a custom system nobody operates is where most bespoke AI quietly dies.",
    },
  ],
  value:
    "You get a system that keeps working, not a proof of concept that impressed once and then aged out.",
  coda: "See the full model on how it works.",
}

export const customAiProof = {
  heading: "The proof is that our systems survive production",
  paragraphs: [
    "We will not show you a custom computer-vision case study we do not have. What we will point to is the harder thing to fake, a track record of building systems that survive real operations, because the skill that makes a custom build succeed is the same skill that takes any agent from a demo to production and keeps it running.",
    "For Sirius Solutions Global, that meant an agent that does not just make a call but writes the structured result straight back into their system, a custom integration into how their operation actually works. For Telecom Foundation, a Ministry of IT and Telecom subsidiary, it meant nine modules automated inside a government Odoo ERP, at a standard a public institution signed off on. For Advanzatech, it meant an outbound agent booking seventy qualified meetings in month two. Three different problems, three different builds, all live in production. That is the evidence that matters for custom work, not a polished case study for a specific tool, but proof that what we build keeps working when it meets the real world.",
  ],
  lead: "We will not show you a custom computer-vision case study we do not have. What we will point to is the harder thing to fake, a track record of building systems that survive real operations, because the skill that makes a custom build succeed is the same skill that takes any agent from a demo to production and keeps it running.",
  cases: [
    {
      name: "Sirius Solutions Global",
      href: "/customers/sirius-solutions",
      body: "For Sirius Solutions Global, that meant an agent that does not just make a call but writes the structured result straight back into their system, a custom integration into how their operation actually works.",
    },
    {
      name: "Telecom Foundation",
      href: "/customers/telecom-foundation",
      body: "For Telecom Foundation, a Ministry of IT and Telecom subsidiary, it meant nine modules automated inside a government Odoo ERP, at a standard a public institution signed off on.",
    },
    {
      name: "Advanzatech",
      href: "/customers/advanzatech",
      body: "For Advanzatech, it meant an outbound agent booking seventy qualified meetings in month two.",
    },
  ],
  close:
    "Three different problems, three different builds, all live in production. That is the evidence that matters for custom work, not a polished case study for a specific tool, but proof that what we build keeps working when it meets the real world.",
  siriusHref: "/customers/sirius-solutions",
  telecomHref: "/customers/telecom-foundation",
  advanzatechHref: "/customers/advanzatech",
}

export const customAiDiff = {
  heading: "Sometimes you should buy, not build, and we will tell you",
  paragraphs: [
    "Most vendors selling custom AI will tell you that you need custom AI. We will not, unless it is true.",
    "If a proven product already fits your workflow, custom is the wrong answer, it costs more, takes longer, and gives you something you now have to maintain, all to do a job an existing tool already does well. We will say that plainly, because getting this call right is exactly the expertise you are hiring us for, and because telling you not to spend money is how you learn to trust us with the money you do spend.",
    "Custom is the right answer when the problem is genuinely yours, when the workflow is your competitive edge, when compliance means the system must live inside infrastructure you control, or when what you need simply does not exist yet. In those cases, and only those, a system built around your process is worth every hour it takes.",
  ],
}

export const customAiGovernance = {
  heading: "Built to be run, not just delivered",
  body: "Everything we build is governed by QualiCore, our QA engine, which scores every interaction and surfaces what needs attention, with a person approving changes before they ship. Custom systems operate inside hard scope boundaries and escalate anything outside them, so bespoke never means unpredictable. Every deployment is architected to meet the data rules of the region it runs in, with zero retention by default, and your systems remain the system of record. See how we handle data and security.",
  trustAnchor: "data and security",
  trustHref: "/trust",
}

export const customAiAudience = {
  heading: "Who this is for",
  paragraphs: [
    "Teams whose most valuable or most painful work does not fit an off-the-shelf tool, regulated operations that need scope boundaries and control designed in, and businesses that want one accountable partner to build a bespoke system and run it, rather than a vendor who delivers code and disappears.",
    "It is a weaker fit if a proven product already solves your problem, in which case we will point you to it, or if you want a research project rather than a system pointed at a real outcome. We build custom AI to remove a cost, not to explore for its own sake.",
  ],
}

export const customAiFaqs = [
  {
    question: "What counts as custom AI development here?",
    answer:
      "Anything where your workflow, your data, or your constraints rule out an off-the-shelf tool. We design the system around your process, whether that is voice, document and language intelligence, vision, or agentic software, build it inside your environment, and run it after launch. The scope is set by your problem, not by a fixed menu.",
  },
  {
    question: "Should we build custom or just buy a product?",
    answer:
      "Honestly, sometimes you should buy, and we will tell you when. Custom wins when the workflow is your competitive edge, when compliance means the system must live inside infrastructure you control, or when what you need does not exist yet. If a proven tool fits, we will point you to it rather than sell you a build you do not need.",
  },
  {
    question: "How do you handle our data during and after the build?",
    answer:
      "Deployments are architected for zero retention by default, your systems remain the system of record, and processing is architected to meet the data-residency and privacy rules of the regions we serve. Nothing is stored unless you explicitly opt in, and the full detail is on our trust page.",
  },
  {
    question: "Who maintains the custom system after it ships?",
    answer:
      "We do, and that is the point of the model. We operate, monitor, and tune what we build, QualiCore scores the interactions, and changes ship only with human sign-off. You are never handed a bespoke codebase and left to keep it alive on your own.",
  },
  {
    question: "How do we know a custom build will actually work?",
    answer:
      "Because we scope it to a defined outcome before we start, build inside your real environment, and test against real scenarios rather than clean examples. The same discipline that took our production agents from demo to live is what makes a custom build succeed, and we point every build at a measurable result so working is a fact, not an opinion.",
  },
]

export const customAiFinal = {
  heading: "Bring us the problem no tool has solved",
  body: "Book a call and tell us the work that does not fit anything you can buy. We will tell you honestly whether custom is the right answer, and if it is, what building it would return.",
  primaryCta: "Book a call",
  secondaryCta: "Start readiness check",
  secondaryHref: "/tools/ai-readiness-assessment",
}

export const customAiSiblings = [
  { name: "AI consulting", href: "/solutions/ai-consulting" },
  { name: "AI quality and governance", href: "/solutions/ai-quality-assurance" },
  { name: "All solutions", href: "/solutions" },
]
