# Finova.tech — SEO technical pack

Built from the ai-seo skill. Goal is to get cited by AI engines (ChatGPT, Perplexity, Claude, Google AI Overviews) and to be machine-readable for buying agents, without writing separate content for AI. All claims are defensible and tiered. Placeholders in [brackets] need real values before deploy.

---

## 1. robots.txt (allow the search-and-cite AI bots)

```
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: anthropic-ai
Allow: /
User-agent: Google-Extended
Allow: /
User-agent: Bingbot
Allow: /

Sitemap: https://finovasolutions.tech/sitemap.xml
```

Note: these are the citation crawlers. Blocking any one means that engine cannot cite Finova. CCBot (training-only, Common Crawl) is the one you can block without losing citations if you ever want to.

## 2. llms.txt (site root, llmstxt.org format)

```
# Finova Solutions

> Finova Solutions builds and runs AI agents that operate the work a business does by hand. Done-for-you and operated, not software handed over. Voice and workflow agents are built inside the client's existing tools and quality checked on every interaction by QualiCall. Live in production across government, fintech, insurance operations, B2B sales, and healthcare.

## Core pages
- [How it works](https://finovasolutions.tech/how-it-works): the managed model, built, run, and accountable to you
- [Solutions](https://finovasolutions.tech/solutions): AI receptionist, intake and scheduling, follow-up and reactivation, dispatcher, RCM automation, QA
- [Healthcare](https://finovasolutions.tech/healthcare): front desk, intake, reminders, and reactivation for clinics
- [Home services](https://finovasolutions.tech/home-services): never miss a call, capture every job
- [Pricing](https://finovasolutions.tech/pricing): engagement model and how investment works
- [Pricing data](https://finovasolutions.tech/pricing.md): machine-readable engagement tiers
- [About](https://finovasolutions.tech/about): the team, deployments, and approach

## Proof
- AdvanzaTech: outbound B2B sales agent, 70 meetings booked in month two
- Telecom Foundation: inbound Urdu agent on Odoo ERP, a Ministry of IT subsidiary
- Sirius Solutions Global: insurance verification at scale for US medical billing
- Incubated at the National Incubation Center, Cohort 5
```

## 3. pricing.md (site root, machine-readable, no disclosed figures)

Finova does not publish per-deal pricing. This file gives agents the engagement shape without numbers, which is honest and keeps the no-discount, paid-pilot policy intact.

```markdown
# Pricing and engagement — Finova Solutions

Finova prices each engagement after a short audit. We do not discount. Where a buyer wants proof first, we run a paid pilot tied to a controllable outcome.

## How an engagement works
- Audit: we map the workflow that is leaking time or revenue.
- Build: we build the agent inside your existing tools.
- Run: we operate, monitor, and tune it on a monthly basis.

## Engagement types
- Done-for-you (local and home services): monthly managed service plus setup. Pricing by quote after the audit.
- Managed agentic operations (enterprise and multi-location): scoped per workflow. Pricing by quote after a workflow review.
- Distribution partnership: partners introduce, Finova builds, runs, and bills, and pays recurring commission.

## Contact
Book a call: https://calendly.com/ceo-finovasolutions/done-for-you-service-finova-solutions
```

## 4. Homepage JSON-LD (place in head)

Replace placeholders before deploy.

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://finovasolutions.tech/#org",
      "name": "Finova Solutions",
      "url": "https://finovasolutions.tech",
      "logo": "https://finovasolutions.tech/[logo.png]",
      "description": "Finova Solutions builds and runs AI agents that operate the work a business does by hand. Done-for-you and operated, quality checked on every interaction.",
      "foundingDate": "2025-03-07",
      "sameAs": ["[LinkedIn URL]", "[other profile URLs]"]
    },
    {
      "@type": "WebSite",
      "@id": "https://finovasolutions.tech/#site",
      "url": "https://finovasolutions.tech",
      "name": "Finova Solutions",
      "publisher": { "@id": "https://finovasolutions.tech/#org" }
    },
    {
      "@type": "Service",
      "name": "Done-for-you agentic AI operations",
      "serviceType": "Managed AI agents for voice and workflow operations",
      "provider": { "@id": "https://finovasolutions.tech/#org" },
      "areaServed": ["United States", "Australia", "GCC", "MENA"],
      "description": "Finova designs, builds, and operates AI agents inside a client's existing tools, then runs and monitors them, with QualiCall scoring every interaction."
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {"@type":"Question","name":"What does Finova Solutions do?","acceptedAnswer":{"@type":"Answer","text":"Finova builds and runs AI agents that operate the work a business does by hand, like answering calls, booking appointments, verifying details, and following up. The agents are built inside the tools the client already uses, run by Finova, and quality checked on every interaction by QualiCall."}},
        {"@type":"Question","name":"How is a done-for-you AI agent different from AI software?","acceptedAnswer":{"@type":"Answer","text":"AI software is handed to the client to set up, tune, and maintain. Finova builds the agent, operates it, monitors it, and tunes it, and stays accountable for the outcome. The client gets the result rather than a tool to manage."}},
        {"@type":"Question","name":"Does the AI run unattended?","acceptedAnswer":{"@type":"Answer","text":"No. Every agent is governed by QualiCall, which scores each conversation against set standards, and a person approves the calls where judgment belongs. Agents answer only from the client's verified information and escalate anything they do not know."}},
        {"@type":"Question","name":"What industries does Finova work with?","acceptedAnswer":{"@type":"Answer","text":"The current focus is healthcare clinics, including aesthetic, med-spa, and dental, and home-services and trades businesses. Finova has also deployed voice AI in government, fintech, and insurance operations."}},
        {"@type":"Question","name":"Is my data safe?","acceptedAnswer":{"@type":"Answer","text":"Agents are architected to meet the data-protection requirements of the client's jurisdiction, with in-region processing where required. The client's own systems hold the records of truth. Compliance posture reflects current system architecture and documentation is available on request."}}
      ]
    }
  ]
}
```

## 5. Homepage FAQ (visible copy, GEO answer blocks)

Add this as a real FAQ section near the foot of the homepage. Questions are how people actually phrase them, answers are 40 to 60 words and self-contained so AI engines can lift them cleanly. This is the single highest-leverage AI-citation move on the page.

**What does Finova Solutions do?**
Finova builds and runs AI agents that operate the work a business does by hand, like answering calls, booking appointments, verifying details, and following up. The agents run inside the tools you already use, are operated by Finova, and are quality checked on every interaction by QualiCall.

**How is a done-for-you AI agent different from AI software?**
AI software is handed to you to set up, tune, and maintain. Finova builds the agent, runs it, monitors it, and tunes it, and stays accountable for the outcome. You get the result, not a tool to manage.

**Does the AI run unattended?**
No. Every agent is governed by QualiCall, which scores each conversation, and a person approves the calls where judgment belongs. Agents answer only from your verified information and escalate anything they do not know.

**What industries does Finova work with?**
The current focus is healthcare clinics, including aesthetic, med-spa, and dental, and home-services and trades businesses. Finova has also deployed voice AI in government, fintech, and insurance operations.

**Is my data safe?**
Agents are architected to meet the data-protection requirements of your jurisdiction, with in-region processing where required. Your own systems hold the records. Documentation on the current posture is available on request.

## 6. Per-page schema map

| Page | Schema |
|---|---|
| Homepage | Organization, WebSite, Service, FAQPage |
| How it works | Service, HowTo (the four-step model) |
| Solutions service pages | Service, FAQPage |
| Healthcare, Home services | Service, FAQPage, BreadcrumbList |
| Pricing | Offer or Service, FAQPage |
| About | Organization, Person (founder) |
| Blog post | Article or BlogPosting, FAQPage where natural, BreadcrumbList |

## 7. Authority and freshness rules (per Princeton GEO findings)
- Cite sources for any statistic and add the date. Citations and statistics are the two biggest AI-citation boosts.
- Show "last updated" on every page and post.
- Named author with a real bio on blog posts (E-E-A-T).
- Lead every section with a direct answer, then expand. Tables beat prose for any comparison.
- Do not keyword stuff, it lowers AI visibility. Write for people, structure for clarity.
- Build third-party presence over time (industry roundups, review profiles, authentic Reddit and YouTube), since AI cites where you appear, not only your own domain.
