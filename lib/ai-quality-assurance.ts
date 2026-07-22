import type { LucideIcon } from "lucide-react"
import {
  Activity,
  MessageSquareText,
  TrendingDown,
  UserCheck,
} from "lucide-react"

export const qaMeta = {
  title: "AI Agent Quality Assurance and Governance | Finova",
  description:
    "QualiCore scores every AI agent interaction, shows the reason, and puts a human in sign-off, so your agents are safe to leave running. See how governance works.",
  canonical: "https://finovasolutions.tech/solutions/ai-quality-assurance",
  ogTitle: "AI Agent Quality Assurance and Governance | Finova",
  ogUrl: "https://finovasolutions.tech/solutions/ai-quality-assurance",
}

export const qaHero = {
  h1: "The reason our agents are safe to leave running.",
  paragraphs: [
    "Most AI agents are trusted the way a new hire is trusted, on faith, with an occasional spot check. That works right up until the day the agent quietly starts getting something wrong, and nobody notices until a customer complains. The industry has a name for what usually goes wrong, and it is not the model. It is the lack of anyone watching.",
    "QualiCore is our answer to that. It is the QA engine that scores every single interaction your agents have, shows the reason behind every score in plain language, and puts a person in sign-off on every change. It is why we can leave our agents running with real customers, and it is the part of what we do that most vendors cannot show you, because they do not have it.",
  ],
  primaryCta: "Book a call",
  primaryMicro: "We will show you the loop that keeps agents honest. No pitch.",
  secondaryCta: "See an agent work",
  secondaryHref: "/#demo",
}

export const qaProblem = {
  heading: "Agents rarely fail loudly. They drift quietly.",
  paragraphs: [
    "When AI projects fail, the story is almost never a dramatic crash. It is drift. An agent that handled a situation well last month starts handling it slightly worse, then worse again, because nothing is scoring it and nobody is watching closely enough to catch the slide. By the time a person notices, the damage is a stack of mishandled interactions and a customer who lost trust.",
    "This is why so many agents that dazzle in a pilot never earn a place in production. Not because the model is not smart enough, but because the operation around it has no way to know, in an ongoing and reliable way, whether the agent is still doing its job well. A random sample of a few calls a week does not catch drift, it just occasionally stumbles onto it. Unattended autonomy is not a feature, it is the risk that keeps serious operators from deploying agents at all.",
    "The fix is not a smarter model. It is a system that checks the agent's work continuously, explains its judgments, and keeps a human in the loop on what changes. That system is what turns an agent from a gamble into something you can actually run your business on.",
  ],
  // Layout slices — exact phrases from paragraphs, not new copy
  lead: "When AI projects fail, the story is almost never a dramatic crash. It is drift. An agent that handled a situation well last month starts handling it slightly worse, then worse again, because nothing is scoring it and nobody is watching closely enough to catch the slide.",
  driftSteps: [
    {
      label: "handled a situation well",
      level: 100,
    },
    {
      label: "slightly worse",
      level: 62,
    },
    {
      label: "worse again",
      level: 28,
    },
  ],
  damage:
    "By the time a person notices, the damage is a stack of mishandled interactions and a customer who lost trust.",
  why: "This is why so many agents that dazzle in a pilot never earn a place in production. Not because the model is not smart enough, but because the operation around it has no way to know, in an ongoing and reliable way, whether the agent is still doing its job well. A random sample of a few calls a week does not catch drift, it just occasionally stumbles onto it.",
  risk: "Unattended autonomy is not a feature, it is the risk that keeps serious operators from deploying agents at all.",
  fix: "The fix is not a smarter model. It is a system that checks the agent's work continuously, explains its judgments, and keeps a human in the loop on what changes. That system is what turns an agent from a gamble into something you can actually run your business on.",
}

export type QaCapability = {
  title: string
  body: string
  icon: LucideIcon
  accent: string
}

export const qaCapabilitiesHeading = "What QualiCore does"

export const qaCapabilities: QaCapability[] = [
  {
    title: "Scores every interaction, not a sample.",
    body: "Every conversation and every action an agent takes is graded against the standards that matter for your business, so quality is measured continuously instead of guessed at from a handful of spot checks.",
    icon: Activity,
    accent: "from-finova-cyan to-finova-lightBlue",
  },
  {
    title: "Shows the reason, in plain language.",
    body: "For every score, QualiCore explains why, in words a manager can read and act on, not a number with no story behind it. You can see what good and bad look like, and why, without needing a data scientist to interpret it.",
    icon: MessageSquareText,
    accent: "from-finova-magenta to-finova-purple",
  },
  {
    title: "Catches drift early.",
    body: "Because every interaction is scored, a slow slide in quality shows up as a trend long before it becomes a pattern of complaints, so problems get caught while they are small.",
    icon: TrendingDown,
    accent: "from-finova-purple to-finova-cyan",
  },
  {
    title: "Keeps a human in sign-off.",
    body: "QualiCore surfaces the changes worth making, and a person on our team approves them before anything ships. The agent improves continuously, and nothing about how it behaves changes without a human deciding it should.",
    icon: UserCheck,
    accent: "from-finova-lightBlue to-finova-magenta",
  },
]

export const qaLoop = {
  heading: "The loop that keeps agents honest",
  paragraphs: [
    "This is the difference between an agent you hope is working and an agent you know is working.",
    "Your agent goes live inside your stack with hard scope boundaries. QualiCore scores every interaction it has. A person reviews and signs off on every improvement before it goes live. The agent gets sharper with each cycle, and nothing changes without that sign-off. It is a closed loop, deploy, score, approve, improve, and it never switches off.",
    "Most vendors will tell you their AI improves over time. Very few can show you the mechanism that makes improvement safe instead of a source of new risk. We can show you the loop, and the human standing in it.",
  ],
  /** Words taken verbatim from the closed-loop sentence */
  beats: ["deploy", "score", "approve", "improve"] as const,
}

export const qaQualiCall = {
  heading: "QualiCore for voice, meet QualiCall",
  body: "Voice is where quality is hardest to police, because a bad call is gone the moment it ends, and a random listen-back catches almost nothing. QualiCall is our conversational QA agent, built on the QualiCore engine and pointed specifically at voice and chat. It scores every call and every conversation, flags the ones that need a human ear, and turns a channel that used to be a black box into one you can actually see into. If your agents talk to customers, this is how you know what they are really saying.",
}

export const qaBuyer = {
  heading: "Why this is the part that lets you say yes",
  paragraphs: [
    "If you have hesitated to put an AI agent in front of real customers, this is almost certainly why. The hesitation is rarely about whether the agent can do the task. It is about what happens when it gets something wrong, and whether you will even know.",
    "Governance is the answer to that hesitation. It is what makes the difference between an agent you are willing to deploy and one you keep in a pilot forever. It is also what a serious buyer now asks about first, because the market has learned the hard way that the agents that fail are the ungoverned ones. When we say we answer for your number, this is the machinery that lets us mean it.",
  ],
  // Layout slices — exact text from paragraphs, not new copy
  hesitation:
    "If you have hesitated to put an AI agent in front of real customers, this is almost certainly why. The hesitation is rarely about whether the agent can do the task. It is about what happens when it gets something wrong, and whether you will even know.",
  answer: "Governance is the answer to that hesitation.",
  difference:
    "It is what makes the difference between an agent you are willing to deploy and one you keep in a pilot forever. It is also what a serious buyer now asks about first, because the market has learned the hard way that the agents that fail are the ungoverned ones.",
  meanIt:
    "When we say we answer for your number, this is the machinery that lets us mean it.",
}

export const qaData = {
  heading: "Built for the rules your region runs on",
  body: "QualiCore governs quality, and the same discipline extends to how data is handled. Every deployment is architected to meet the data-residency and privacy rules of the region it runs in, with zero retention by default, and your systems remain the system of record. Governance and compliance are designed in from the first line, not bolted on after an incident. See how we handle data and security.",
  trustAnchor: "data and security",
  trustHref: "/trust",
  // Layout slices — exact text from body, not new copy
  lead: "QualiCore governs quality, and the same discipline extends to how data is handled.",
  rules:
    "Every deployment is architected to meet the data-residency and privacy rules of the region it runs in, with zero retention by default, and your systems remain the system of record.",
  pillars: [
    "data-residency and privacy rules",
    "zero retention by default",
    "system of record",
  ],
  designedIn:
    "Governance and compliance are designed in from the first line, not bolted on after an incident.",
  designedPhrase: "designed in from the first line",
  boltedPhrase: "bolted on after an incident",
  coda: "See how we handle data and security.",
}

export const qaAudience = {
  heading: "Who this is for",
  paragraphs: [
    "Operators who want to deploy AI agents but need to know, continuously and reliably, that they are behaving, and leaders in regulated or high-trust settings, healthcare, finance, government, where an unmonitored agent is simply not an option. If the reason you have not deployed is that you cannot see what the agent would be doing, this is built for exactly that.",
    "It is a weaker fit if you are comfortable running agents unmonitored and see QA as overhead. We think that is a mistake the market keeps proving expensive, but we will not pretend the page is for someone who does not want the loop.",
  ],
}

export const qaFaqs = [
  {
    question: "What does QualiCore actually check?",
    answer:
      "Every interaction an agent has, scored against the standards that matter for your business, correctness, tone, whether it stayed in scope, whether it escalated when it should have. It scores continuously rather than sampling, and it explains each score in plain language, so you can see not just whether the agent is doing well but why.",
  },
  {
    question: "How is this different from listening to a few calls a week?",
    answer:
      "A random sample catches a problem only if you happen to sample the call where it appears, which means most drift goes unseen until it becomes a pattern. QualiCore scores everything, so a slow slide in quality shows up as a trend early, while it is still small and fixable, instead of surfacing as a stack of complaints.",
  },
  {
    question: "Does the agent change on its own?",
    answer:
      "No. QualiCore surfaces improvements worth making, and a person on our team signs off before any change ships. The agent gets better over time, but nothing about how it behaves changes without a human approving it, which is what keeps improvement safe rather than risky.",
  },
  {
    question: "Can we use QualiCore on agents we did not build with you?",
    answer:
      "QualiCore governs the agents we build and run for you as part of the engagement. If you have existing agents and want them monitored, tell us on the call and we will tell you honestly what is possible, rather than promising a fit we have not scoped.",
  },
  {
    question: "Is this only for voice?",
    answer:
      "No. QualiCore governs voice, chat, and workflow actions. QualiCall is the version pointed specifically at voice and conversational quality, where a bad interaction is otherwise gone the moment it ends, but the engine covers every kind of agent we run.",
  },
]

export const qaFinal = {
  heading: "See the loop that keeps agents honest",
  body: "Book a call and we will show you how QualiCore scores, explains, and signs off on every interaction, and why it is the reason our agents are safe to leave running in front of real customers.",
  primaryCta: "Book a call",
  secondaryCta: "See an agent work",
  secondaryHref: "/#demo",
}

export const qaSiblings = [
  { name: "AI agent development", href: "/solutions/ai-agent-development" },
  { name: "AI consulting", href: "/solutions/ai-consulting" },
  { name: "All solutions", href: "/solutions" },
]
