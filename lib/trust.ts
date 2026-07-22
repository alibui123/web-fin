export const trustMeta = {
  title: "Trust, Security, and Data Posture | Finova Solutions",
  description:
    "How Finova handles your data, zero retention by default, in-region processing, and a human in sign-off on every change, architected to meet the rules of your region.",
  canonical: "https://finovasolutions.tech/trust",
  ogTitle: "Trust, Security, and Data Posture | Finova Solutions",
  ogUrl: "https://finovasolutions.tech/trust",
}

export const trustHero = {
  h1: "Built for the rules your region runs on.",
  paragraphs: [
    "In healthcare, finance, and government, a clever agent is not enough. It has to be safe, accountable, and built to the standard of every market it operates in, and that standard has to be set on day one, not bolted on after something goes wrong. This page is how we do that.",
    "The short version is this. Nothing about your data or your agents is left to chance or to trust alone. Data is handled with zero retention by default, agents run inside hard boundaries, every action is scored, and a person signs off on every change. If you are the person who has to answer for what an AI system does inside your organization, this page is written for you.",
  ],
  primaryCta: "Book a call",
  secondaryCta: "Ask us anything on the call",
}

export type TrustDataPillar = {
  text: string
}

export const trustData = {
  heading: "Your data stays yours",
  pillars: [
    {
      text: "Zero retention by default. Nothing is stored unless you explicitly opt in. The agent processes what it needs to do the work and does not quietly accumulate your data as a byproduct.",
    },
    {
      text: "Your systems remain the system of record. We operate as a processor working inside your environment, and your existing systems stay the authoritative home for your records. Your data lives in your tools, not ours, and if we ever part ways, it stays exactly where it already is.",
    },
    {
      text: "In-region processing where your jurisdiction requires it. Where the rules of your market require data to be processed inside a specific region, deployments are built to run on in-region infrastructure, so residency is a design decision made up front, not a problem discovered later.",
    },
    {
      text: "Encrypted and access-controlled. Data is protected in transit and at rest, and access is scoped and logged, so every action taken inside your systems is accountable and reviewable.",
    },
  ] as TrustDataPillar[],
}

export const trustCompliance = {
  heading: "Architected to meet the rules, honestly stated",
  paragraphs: [
    "We are careful with the language here, because in this area careless language is a liability. We do not claim certifications we do not hold. What we do is design every deployment to meet the requirements of the frameworks that govern your region, and we say exactly that.",
    "Deployments are architected to meet the data-residency and privacy requirements that apply to you, including UAE PDPL and the relevant health-sector guidance in the Emirates, and HIPAA and GDPR principles for the operations we serve internationally. Jurisdiction-specific documentation is prepared per deployment, so what applies to your specific engagement is written down for your specific engagement. If a certification matters to you and we do not yet hold it, we will tell you plainly rather than imply otherwise.",
  ],
  // Layout slices — exact text from paragraphs, not new copy
  careful:
    "We are careful with the language here, because in this area careless language is a liability.",
  noClaim: "We do not claim certifications we do not hold.",
  whatWeDo:
    "What we do is design every deployment to meet the requirements of the frameworks that govern your region, and we say exactly that.",
  architected:
    "Deployments are architected to meet the data-residency and privacy requirements that apply to you, including UAE PDPL and the relevant health-sector guidance in the Emirates, and HIPAA and GDPR principles for the operations we serve internationally.",
  frameworks: ["UAE PDPL", "HIPAA", "GDPR"],
  documentation:
    "Jurisdiction-specific documentation is prepared per deployment, so what applies to your specific engagement is written down for your specific engagement.",
  honesty:
    "If a certification matters to you and we do not yet hold it, we will tell you plainly rather than imply otherwise.",
}

export const trustGovernance = {
  heading: "Every action logged, scored, and signed off",
  paragraphs: [
    "Security is not only about where data sits, it is about what the agent is allowed to do and whether anyone is watching. Our agents run inside hard scope boundaries, answer only from your verified information, and escalate anything they do not know rather than guessing.",
    "QualiCore, our QA engine, scores every interaction against the standards that matter and shows the reason behind every score in plain language a manager can read. A person on our team signs off on every improvement before it ships, so the agent gets better over time without ever changing behavior unsupervised. And a full, reviewable record of what the agent did and why is kept, ready for your own review or an auditor's. Autonomy here never means unaccountable. See how governance works.",
  ],
  governanceAnchor: "See how governance works",
  governanceHref: "/solutions/ai-quality-assurance",
}

export const trustScope = {
  heading: "Boundaries are architectural, not a policy document",
  body: "The strongest proof that an agent respects its limits is that it cannot exceed them by design. Take our clinic front desk agent. It collects a first name, a phone number, and a treatment interest, and nothing else. It does not take clinical information, it does not give medical advice, and it does not hold a clinical conversation, because a clinical conversation is architecturally out of its scope and routes to the clinic's own team instead. The boundary is not a promise in a contract, it is built into what the agent is able to do, which is the only kind of boundary worth trusting.",
}

export const trustEscalation = {
  heading: "A human can always step in",
  body: "Sensitive cases, edge cases, and anything outside an agent's scope escalate to your team with the full context attached, so a person picks up exactly where the agent left off, with everything they need. The handoff to a human is designed in as a feature, not treated as a failure, because in a regulated operation the ability to put a person in the loop at the right moment is not a weakness, it is the requirement.",
  // Layout slices — exact text from body, not new copy
  triggers: [
    "Sensitive cases",
    "edge cases",
    "anything outside an agent's scope",
  ],
  agentLeftOff: "exactly where the agent left off",
  humanPicksUp: "a person picks up",
  yourTeam: "your team",
  contextAttached: "full context attached",
  everythingNeeded: "with everything they need",
  handoff:
    "Sensitive cases, edge cases, and anything outside an agent's scope escalate to your team with the full context attached, so a person picks up exactly where the agent left off, with everything they need.",
  featurePhrase: "designed in as a feature",
  failurePhrase: "treated as a failure",
  featureLine:
    "The handoff to a human is designed in as a feature, not treated as a failure,",
  weaknessPhrase: "not a weakness",
  requirementPhrase: "it is the requirement",
  requirement:
    "because in a regulated operation the ability to put a person in the loop at the right moment is not a weakness, it is the requirement.",
}

export const trustConsent = {
  heading: "Consent handled correctly, by regime",
  body: "Consent is not one thing. The permission a customer gives to be helped on an inbound call is not the same as permission to be contacted later with marketing, and treating them as the same is exactly how businesses get into trouble. We keep them separate. Inbound service consent and outbound or marketing contact run on their own consent regimes, per the rules of each region we operate in, and we never bundle one into the other.",
}

export const trustAudience = {
  heading: "Who this page is for",
  body: "The person who has to answer for what an AI system does inside a regulated or high-trust operation, the compliance lead, the medical director, the CIO, the operations owner in finance or government. If your hesitation about AI is not can it do the job but what happens when something goes wrong and will we be able to account for it, this page is the answer, and the call is where we go through the specifics of your regime.",
  // Layout slices — exact text from body, not new copy
  lead: "The person who has to answer for what an AI system does inside a regulated or high-trust operation",
  roles: [
    "compliance lead",
    "medical director",
    "CIO",
    "operations owner in finance or government",
  ],
  notQuestion: "can it do the job",
  realQuestion:
    "what happens when something goes wrong and will we be able to account for it",
  close:
    "this page is the answer, and the call is where we go through the specifics of your regime.",
}

export const trustFaqs = [
  {
    question: "Do you store our data?",
    answer:
      "No, not by default. Deployments run with zero retention unless you explicitly opt in, and your existing systems remain the system of record, so your data lives in your tools rather than ours. The agent processes what it needs to complete the work and does not accumulate your data as a byproduct.",
  },
  {
    question: "Are you compliant with HIPAA, GDPR, or UAE PDPL?",
    answer:
      "We architect every deployment to meet the requirements of the frameworks that apply to your region, and we prepare jurisdiction-specific documentation per engagement. We are deliberately precise here, we say architected to meet rather than certified, and if a specific certification matters to you and we do not hold it, we will tell you plainly rather than imply otherwise.",
  },
  {
    question: "What stops the agent from doing something it should not?",
    answer:
      "Hard scope boundaries built into what the agent can do, not just policies written down. Agents answer only from your verified information, escalate anything outside their scope to a person, and every action is scored by QualiCore with a human signing off on changes. The boundary is architectural, which is the only kind worth relying on.",
  },
  {
    question: "Can we keep a human in control of sensitive cases?",
    answer:
      "Yes, always. Sensitive and edge cases escalate to your team with the full context attached, and the handoff to a human is designed in as a feature. In a regulated operation, putting a person in the loop at the right moment is a requirement, and the system is built to make that seamless rather than exceptional.",
  },
  {
    question: "Where is our data processed?",
    answer:
      "Where your jurisdiction requires data to stay in a specific region, deployments are built to run on in-region infrastructure, so residency is decided up front as part of the design. We scope the exact arrangement for your regime during the engagement, so it is documented for your specific deployment rather than assumed.",
  },
]

export const trustFaqHeading = "Questions operators ask"

export const trustInvite = {
  heading: "Bring us the standard you have to meet",
  body: "Book a call and we will walk through exactly how a deployment would handle your data, your region's rules, and your governance requirements. If there is a bar you have to clear, tell us what it is, and we will tell you honestly how we meet it.",
  primaryCta: "Book a call",
  secondaryCta: "See how governance works",
  secondaryHref: "/solutions/ai-quality-assurance",
}

export const trustSiblings = [
  { name: "How it works", href: "/how-it-works" },
  { name: "Solutions", href: "/solutions" },
  { name: "AI quality and governance", href: "/solutions/ai-quality-assurance" },
  { name: "Healthcare", href: "/industries/healthcare" },
  { name: "Financial services", href: "/industries/financial-services" },
  { name: "Contact", href: "/contact" },
]
