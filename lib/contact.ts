export const contactMeta = {
  title: "Contact Finova Solutions | Book a Call or Talk to an Agent",
  description:
    "Tell Finova the work you want off your plate. Book a call directly, talk to our live agent, or send a message and a person replies fast. Start the conversation.",
  canonical: "https://finovasolutions.tech/contact",
  ogTitle: "Contact Finova Solutions | Book a Call or Talk to an Agent",
  ogUrl: "https://finovasolutions.tech/contact",
}

export const contactHero = {
  h1: "Tell us the work you want off your plate.",
  body: "Start wherever suits you. Book a call straight into the calendar, talk to our live agent right now and let it book you in, or send a message and a real person gets back to you fast. Whichever you pick, the first real step is the same, we map where your business is losing time and revenue, and tell you honestly where an agent would pay off.",
}

export type ContactWay = {
  text: string
  cta: string
  href: string
  external?: boolean
  anchor?: boolean
}

export const contactWays = {
  heading: "Three ways to start",
  items: [
    {
      text: "Book a call. The fastest path to a real answer. Pick a time and we will map the workflow costing you the most, no pitch, just an honest read on what an agent should run first.",
      cta: "Book a call",
      href: "calendly",
      external: true,
    },
    {
      text: "Talk to our live agent. Not ready to book, but want to see this work? The agent on this page is one of ours. Ask it what we do, and if it makes sense, it will book your call for you, right there in the conversation.",
      cta: "Start a web call",
      href: "/#demo",
    },
    {
      text: "Send a message. Prefer to write first? Tell us what is eating your team's time and a person will reply, fast, not in three business days.",
      cta: "Send a message",
      href: "#send-message",
      anchor: true,
    },
  ] as ContactWay[],
}

export const contactForm = {
  heading: "Send us a message",
  fields: {
    name: {
      label: "Your name",
      placeholder: "First and last name",
    },
    email: {
      label: "Work email",
      placeholder: "you@company.com",
      error: "That email does not look right, mind checking it",
    },
    company: {
      label: "Company",
      placeholder: "Where you work",
      error: "Add a company name so we know who is asking",
    },
    message: {
      label: "What is eating your team's time",
      placeholder:
        "The queue that never clears, the follow-up that always slips, the report someone rebuilds by hand. Tell us in a sentence or two.",
    },
    phone: {
      label: "Phone or WhatsApp, optional",
      consent:
        "You can contact me about relevant updates by phone or WhatsApp",
    },
  },
  submit: "Send it",
  underButton:
    "A real person replies fast, usually the same day and often much sooner. If it is urgent, book a call directly.",
  urgentAnchor: "book a call directly",
}

export const contactDirect = {
  heading: "Or reach the right team directly",
  body: "New projects and partnerships, sales at finovasolutions.tech. Help with a live deployment, support at finovasolutions.tech. Anything else, info at finovasolutions.tech. You can also call or message us directly at +92 327 6508716.",
  links: [
    { phrase: "sales at finovasolutions.tech", href: "mailto:sales@finovasolutions.tech" },
    { phrase: "support at finovasolutions.tech", href: "mailto:support@finovasolutions.tech" },
    { phrase: "info at finovasolutions.tech", href: "mailto:info@finovasolutions.tech" },
    { phrase: "+92 327 6508716", href: "tel:+923276508716" },
  ],
}

export const contactAfter = {
  heading: "What happens after you reach out",
  body: "No pressure, and no pushy follow-up sequence. A person reads what you sent, and if there is a fit, we set up a short call to map the workflow costing you the most. If there is not a fit, we will tell you that too, and point you somewhere more useful. Either way, you get an honest read, which is the only thing worth starting a relationship on.",
}

export const contactInvite = {
  heading: "Ready when you are",
  primaryCta: "Book a call",
  secondaryCta: "Start a web call",
  secondaryHref: "/#demo",
}

export const contactSiblings = [
  { name: "How it works", href: "/how-it-works" },
  { name: "AI consulting", href: "/solutions/ai-consulting" },
  { name: "Live demo", href: "/#demo" },
  { name: "Trust", href: "/trust" },
]
