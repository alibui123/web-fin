// Single source of truth for the homepage FAQ.
// Imported by both components/faq.tsx (visible copy) and app/page.tsx (FAQPage JSON-LD)
// so the schema always matches the visible content, as Google requires.

export interface HomepageFaq {
  question: string
  answer: string
}

export const homepageFaqs: HomepageFaq[] = [
  {
    question: "What does Finova actually deliver?",
    answer:
      "A running operation, not software. We map the workflow that is costing you time, build AI agents inside the tools you already use, and then run them for you. You get completed work, calls answered, cases cleared, records updated, and reporting against a number you care about. We stay accountable for the outcome, not just the build.",
  },
  {
    question: "Do we have to manage the AI ourselves?",
    answer:
      "No, and that is the whole point of the model. We operate, monitor, and tune every agent after it goes live, and QualiCore scores every interaction so drift gets caught early. Your team keeps working in the tools it already knows while the agent clears the repetitive load. Managing the system is our job, not yours.",
  },
  {
    question: "How is this different from building in-house or buying a platform?",
    answer:
      "In-house means pulling your best engineers off the roadmap to maintain something forever. A platform hands you the keys and the 2 a.m. pages when it breaks. We build the agent, run it, watch it, and improve it, and we answer for the number it was pointed at. You carry none of the operating burden.",
  },
  {
    question: "What happens to our data?",
    answer:
      "Nothing is stored unless you explicitly opt in. Deployments run with zero retention by default, your existing systems stay the system of record, and processing is architected to meet the data rules of the regions we serve. The full detail lives on our trust page.",
  },
  {
    question: "How fast can an agent go live?",
    answer:
      "Most engagements follow a six-week path from first call to live, discover, design and build, train and test, then a controlled go-live. Focused single-workflow deployments can move faster. We scope the timeline honestly in the audit, so you know the date before you commit.",
  },
  {
    question: "What does it cost?",
    answer:
      "Pricing is scoped to the workflow we run, not per seat, and you get a clear engagement model before any commitment. The honest first step is the audit, which shows where you are losing time or revenue and what running it would return. We do not discount, we start with a paid pilot so both sides prove the outcome on real work.",
  },
]
