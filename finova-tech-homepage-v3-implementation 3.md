# Finova.tech Homepage v5, Implementation Handoff, FINAL FOR BUILD

For the CTO office. This is the complete homepage content and build guide, v5 supersedes all prior versions. What changed in v5. The three client testimonials from the published Company Profile are now live copy, no longer pending approval. Taimoor Malik's full name confirmed. Card 2 upgraded to the delivered nine-module ERP scope per the Company Profile, which supersedes the earlier in-build framing. Credibility line now names JazzCash and Easypaisa prequalification and Chamber of Commerce membership. FAQ timeline reconciled to the published six-week method. A Client voices block added to the proof spotlight.

Source of truth for layout and interaction is finova-tech-homepage.html, design tokens in finova-tech-design-tokens.md, SEO and schema pack in finova-tech-seo-pack.md, acceptance criteria in finova-tech-homepage-architecture.md, site-wide pages in finova-tech-sitewide-implementation.md. No em dashes anywhere. On-page conversational copy carries no colons or semicolons. [Square brackets] are the remaining placeholders, full list in Section 18.

Spelling decisions pending Astafa, flagged. Atifa Ehsan per the published profile versus Ahsan per chat, confirm before go-live. AwaazLabs one word per the profile versus Awaaz Labs two words elsewhere, pick one spelling sitewide, quotes stay verbatim as published.

---

## 1. Meta and head

- Title. AI Agents That Run Your Operations, Built for You | Finova
- Meta description. Finova builds and runs AI agents inside the tools you already use, quality checked on every interaction. You keep the outcome, we stay accountable. Book a call.
- Canonical. https://finovasolutions.tech/ self-referencing. One H1 only. lang="en". OG and Twitter cards with a 1200x630 image carrying the H1.
- Every Book a call points to https://calendly.com/ceo-finovasolutions/done-for-you-service-finova-solutions

## 2. Nav

- Logo. Finova
- Links. Solutions · Industries · How it works · Pricing · Resources
- Primary CTA. Book a call

## 3. Hero (single path, serves enterprise and SMB through one problem-led frame)

- Eyebrow. Managed agentic AI, built and run for you
- H1 (gradient on "AI agents"). Your operations, run by AI agents we build and manage.
- Subhead. Finova builds and runs AI agents inside the tools you already use, governed by humans and quality checked on every interaction, so you keep the outcome and we stay accountable for it.
- Primary CTA. Book a call. Micro-line beneath it. We will map where you are losing time, no pitch.
- Secondary CTA. Talk to a live agent. Anchors to the flagship demo section.
- Build note. No doors, no segment labels, no home-services language anywhere in the hero. An SMB owner and a COO read the same promise.

## 4. Proof exhibit (two tiers)

### Layout spec
Tier one is a thin rail directly under the hero, scannable in two seconds. Tier two is three metric-first cards beneath it. Card anatomy, top to bottom. Impact eyebrow in Geist Mono caps. Large display element in Fraunces. One-line context under the numeral. Two-line story. Client quote, one line, attributed. Entity name with sector tag. Tier chip. The 70 card carries the cyan accent. Beneath the cards, a footer row. Cards stack vertically on mobile in the same order.

### Tier one, the rail
- Line. Live in production, not a concept.
- Names, logo strip once logo files arrive, plain text until then. Sirius Solutions Global · Telecom Foundation · AdvanzaTech
- NIC deliberately excluded from the rail, it is a credibility marker, not a deployment, it lives in the footer-row credibility line.

### Tier two, the three cards

Card 1. Eyebrow. Manual cost, removed
- Display element. ~50
- Context line. verification calls a day, off staff phones
- Story. Live in US healthcare operations with Sirius Solutions Global, a medical billing operator. The agent sits through the hold queues, confirms coverage, and writes structured results back into the record. Staff hours that went to hold music now go to the cases that need judgment.
- Quote. The agent took insurance verification off our team's plate entirely. Taimoor Malik, Sirius Solutions Global.
- Entity. Sirius Solutions Global · US healthcare
- Chip. Measured

Card 2. Eyebrow. Workflow automation, end to end
- Display element. 9
- Context line. Odoo ERP modules automated for a Ministry of IT subsidiary
- Story. Deployed for Telecom Foundation. The agent answers inbound customer service in Urdu and runs the back office inside their Odoo ERP, with modules automated across HR, task assignment, KPI and performance tracking, and accounts, always with a person in control.
- Quote. Honest, real-time insight into performance, always with a person in control. Atifa Ehsan, EVP, HR and Admin, Telecom Foundation.
- Entity. Telecom Foundation · Government
- Chip. Live production
- Supersession note. The earlier in-build framing is replaced, the published Company Profile states the module automation as delivered, most recently finalized document wins.

Card 3. Eyebrow. Revenue pipeline, created (cyan accent)
- Display element. 70
- Context line. sales meetings booked in month two
- Story. Books qualified meetings for AdvanzaTech, a MENA cybersecurity distributor. The outbound agent qualifies leads, handles objections, and books meetings straight into the sales team's calendar with full context handed to the closer. Every meeting is pipeline the sales team did not have to source.
- Quote. We have won back hours we used to lose to repetitive work. Hashir Farhan, AdvanzaTech.
- Entity. AdvanzaTech · MENA
- Micro-stat row, small type. 2:40 average call · sub-1s node-to-node latency. Measured, per the published engagements reference.
- Chip. Measured

Metric roadmap. Hours saved per week at Sirius and monthly handled volume at Telecom Foundation remain the two collection asks, either converts a card into a measured cost headline. Containment or resolution rate is used nowhere until QualiCall produces it with documented methodology.

### Footer row
- Capability line. One agentic capability behind all three, voice, workflow automation, and QA, live in five languages, Khaleeji and Levantine Arabic, English, Hindi, and Urdu.
- Credibility line. Incubated at the National Incubation Center, Cohort 5. Prequalified vendor with JazzCash and Easypaisa. Member, Chamber of Commerce.
- Pedigree line. Built by a team from [pedigree to confirm].
- Freshness stamp, small type. Production status as of July 2026.

### Do-not list for this section
No tech-stack logo wall. No testimonial carousel. No unattributed percentages, the 70, 60, 100 percent and 5x figures from the Company Profile stay in offline collateral and never appear on this site. No client logos before logo files arrive. Nothing from the JazzCash pilot on this strip. No Saudi entities anywhere on the site.

## 5. Thesis line (full-width, large type, no CTA)

Software you have to manage is another job on your plate. An operation that runs itself is an asset. We build the second kind, and we run it.

Approved variant from the published profile, available for testing later. Most software answers questions. Ours finishes the work.

## 6. The governed loop (the moat strip)

- Eyebrow. Governed and self-improving
- Heading. Self-improving, under human sign-off.
- Beat 1. Deploy. Your agent goes live inside your stack with hard scope boundaries.
- Beat 2. Score. QualiCall scores every single interaction against the standards that matter.
- Beat 3. Approve. A human reviews and signs off on every improvement before it ships.
- Beat 4. Improve. The agent gets better with every cycle, and nothing changes without sign-off.
- Compliance line. Every deployment is architected to meet the data rules of the region it runs in, zero retention by default.
- Closing line. Most vendors say their AI improves. We can show you the loop that does it.
- Links to /how-it-works and /trust.

## 7. Live demo, the flagship section

- Eyebrow. The flagship, live
- Heading. Don't take our word for it. Talk to our agent.
- Body. The agent on this page is our own front desk, built and run on the Awaaz Labs platform. Call it or start a web call, ask it anything about what we do, and it will qualify you and book your call straight into the calendar. Every one of its conversations is scored by QualiCall, the same governance every client deployment gets.
- CTA primary. Start a web call. CTA secondary. Dial [demo number placeholder].
- No recorded fallback, the demo is live only. Visitors who will not call route to the chat concierge and the readiness check. The 60 to 90 second demo video remains a directory-submission asset only.
- Build note. This section is the product performing in public, live with no safety net. It ships only after the demo agent passes the internal QualiCall threshold, the gate is absolute.

## 8. Before and after

- Heading. The difference is what stops slipping through.
- Before Finova. Inquiries go unanswered after hours and the lead books elsewhere. Follow-up depends on whoever has time. Your team spends its day on repetitive calls and data entry.
- Run by Finova. Every caller is answered, qualified, and booked, around the clock. Follow-up and reactivation happen on their own. Your team works on what needs a human, the agent clears the rest.
- Proof callout. For AdvanzaTech, the outbound agent booked 70 meetings in its second month.

## 9. What we run

Heading. Four jobs, run for you.
- Capture every lead. We answer inbound calls and messages in the caller's language, qualify them, and book them. Anchor, AI receptionists that capture every lead, to /solutions/ai-receptionist.
- Run the workflow. We handle verification, scheduling, follow-up, and routing end to end inside your systems. Anchor, workflow automation run for you, to /solutions/workflow-automation.
- Surface the insight. We log and transcribe every conversation and turn it into the patterns and follow-ups your team can act on. Anchor, custom AI that surfaces the insight, to /solutions/custom-ai-development.
- Stay accountable. QualiCall scores every interaction, so quality holds and we catch drift early. Anchor, the QA layer behind every agent, to /solutions/qa.

## 10. The Run by Finova model

- Lead line. We don't sell you AI. We run your operations with it.
- Eyebrow. The Run by Finova model
- Heading. You get the outcome. We run the system.
- Map. We audit the workflow that is costing you time or revenue.
- Build in your stack. We build agents inside the tools you already use.
- Prove the number. We point every agent at a number you care about and report against it.
- Run and improve. We operate, monitor, and tune it, [ACCOUNTABILITY LINE, Option A, and one person on our team answers for your number. Option B, and we answer for your number. Astafa picks before build.]
- What we are not. A dev shop that hands over code and leaves. A platform you have to learn. A pilot that never ships.
- Section link. See how it works, to /how-it-works.

## 11. Industries

Heading. Built around how your business actually runs.
- Healthcare. Clinics, med-spa, aesthetics, and dental. Front desk, intake, reminders, and reactivation in the patient's language, and clinical questions go to your team. Links to /industries/healthcare.
- Home services. Trades and field businesses. Every call answered, every job captured, every quote followed up. Links to /industries/home-services.
- Closing line. If your operation runs on calls, follow-ups, and hand-entered data, it fits.
- Placement note. Portfolio routing only, deep on the page, no home-services positioning above the fold. Additional named deployments from the Company Profile, Al Shukr Dairy, Fatima Hospital, and KOBI PY, are reserved for the industry hubs and About, not this page, restraint is the premium move.

## 12. Accountability and QA

- Heading. Every interaction scored. Every change signed off.
- Heading note. The previous heading Nothing runs unattended appears verbatim on getalgebra.ai and must not ship.
- Body. Every agent is governed by QualiCall, our quality engine. It scores every conversation against the standards that matter, with explainable reasoning, and a person approves the calls where judgment belongs. Agents answer only from your verified information and escalate anything they do not know.
- Links to /trust and /solutions/qa.

## 13. Proof spotlight and client voices

- Eyebrow. Live deployment
- Heading. Insurance verification, now run by an agent.
- Body. Sirius Solutions Global runs medical-billing operations for US providers. Confirming a patient's coverage meant staff sitting through hold queues by hand, all day. Our voice agent now makes those calls, confirms the coverage, and writes the result straight back into the record. The team spends its time on the cases that need a person.
- Guardrail. Representative outcomes available on request, they vary by volume and payer mix. No specific figures here without the representative label.
- Client voices block, three full quotes from the published Company Profile, verbatim.
  - Finova reshaped how our teams use Odoo every day. Their agents took the most tedious parts of task assignment off our seniors and gave managers honest, real-time insight into performance, always with a person in control. What stood out was their technical depth, and how plainly they explained it. Atifa Ehsan, EVP, HR and Admin, Telecom Foundation, Ministry of IT.
  - AwaazLabs runs our insurance verification end to end. It freed our team from the repetitive calls to focus on the work that matters. The quality and the experience have been excellent. Taimoor Malik, Sirius Solutions, United States.
  - Finova's voice agents now drive our outreach and a large share of our manual operations. The quality has been first class, and we have won back hours we used to lose to repetitive work. Hashir Farhan, AdvanzaTech, MENA.
- Optional fourth voice, Astafa's call, from the profile. Finova built our social platform and remain our technical partners. Sharp, reliable and a genuine pleasure to build with. Ayo Owolo, KobiPal. Adds Europe breadth, slightly off the agent positioning.
- Links to /customers/sirius-solutions when the case study page is live.

## 14. FAQ (five answers, 40 to 60 words each, matched exactly by FAQPage schema)

Heading. Questions buyers ask before they book.

Q1. What does Finova actually deliver?
A working operation, not software. We map the workflow that costs you time, build AI agents inside the tools you already use, and then run them for you. You get answered calls, completed workflows, and reporting against a number you care about. We stay accountable for the outcome. Links /how-it-works.

Q2. Do we have to manage the AI ourselves?
No. That is the point of the model. We operate, monitor, and tune every agent after it goes live, and QualiCall, our quality engine, scores every interaction so drift gets caught early. Your team keeps working in the tools it already knows while the agent clears the repetitive load.

Q3. What happens to our data?
Deployments are architected for zero retention by default, and nothing is stored unless you explicitly opt in. Your existing systems remain the system of record. Deployments are architected to meet the data-residency and privacy requirements of the regions we serve. Details are on our trust page. Links /trust.

Q4. How fast can an agent go live?
Most engagements follow a six-week path from first call to live, discover, design and build, train and test, then a controlled go-live. Focused single-workflow deployments can move faster, and we scope the timeline honestly in the audit before anything is committed.
Reconciliation note. The six-week figure follows the published Company Profile method and supersedes the earlier two-to-three-week line, which came from the clinic-specific audit document. Update the same answer in the sitewide file's money pages.

Q5. What does it cost?
Pricing is scoped to the workflow we run, not per seat, and we will give you a clear engagement model before any commitment. The honest first step is the audit, which shows where you are losing time or revenue and what running it would return. Links /pricing.

## 15. Soft-conversion band and final CTA

- Soft-conversion band, sits directly above the final CTA. Line. Not ready for a call. Run the two-minute readiness check and see what an agent would return for your operation. CTA. Start the readiness check. Links to /tools/ai-readiness-assessment, email captured on results.
- Heading. Tell us the work you want off your plate.
- Subhead. Book a call and we will map where you are losing time, no pitch.
- CTA primary. Book a call. CTA secondary. Talk to a live agent.

## 16. Footer

- Columns. Company (About, How it works, Trust and security, Pricing, Contact) · Solutions (AI agent development, Workflow automation, Custom AI development, AI receptionist, QA) · Industries (Healthcare, Home services) · Resources (Blog, Case studies, Live demo, Free audit) · Legal (Privacy, Terms)
- Definitional line for GEO, small type above the tagline. Finova Solutions is a managed agentic AI company that builds, runs, and quality-checks AI agents inside the tools businesses already use, live in production across US healthcare, government, and MENA enterprise sales.
- Tagline. Finova Solutions. Agentic AI, built and run for you.

## 17. On-page chat agent spec (concierge role)

- Role. Concierge, not demo. The voice demo in Section 7 is the proof, the chat agent nurtures and routes inbound.
- Disclosure. First line of every conversation. You are talking to one of our agents right now.
- Governance made visible. Persistent small line in the widget. This conversation is scored by QualiCall and hands off to a human when judgment is needed. The handoff is a feature in the UI, not a failure state.
- Jobs. Answer from verified site content only. Qualify the visitor. Route to the relevant page when the visitor's industry calls for it, including /dfy on request. Book qualified visitors into the Calendly. Log every conversation to HubSpot.
- Consent guardrail. Any phone capture for follow-up or marketing contact carries its own explicit opt-in, separate from inbound service consent, per TDRA rules. Never bundled.
- Ship gate. Live only after passing the internal QualiCall threshold, same as the voice demo.

## 18. Remaining placeholders and build orders

1. [pedigree to confirm], team pedigree names for the proof exhibit footer row. The last unresolved content blocker.
2. Logo files from all three clients, SVG or PNG, names and quotes render as text immediately, the logo strip renders when files arrive.
3. Build order, live demo agent, web-call widget plus phone number, gated on the QualiCall threshold. [demo number placeholder] resolves when it ships.
4. Build order, on-page chat agent per Section 17, same gate.
5. Accountability line decision in Section 10, Option A or Option B.
6. Spelling confirmations from Astafa. Atifa Ehsan versus Ahsan. AwaazLabs versus Awaaz Labs, one spelling sitewide.

## 19. Technical requirements (summary, full detail in finova-tech-homepage-architecture.md)

- One H1, sequential heading hierarchy. CWV, LCP under 2.5s, INP under 200ms, CLS under 0.1. Images WebP or AVIF with dimensions reserved. Fonts with font-display swap. HTTPS, HSTS, CSP.
- JSON-LD from finova-tech-seo-pack.md. Organization with founder, foundingDate 2025-03-07, and sameAs array. WebSite. Service. FAQPage matching Section 14 word for word.
- robots.txt and llms.txt from the seo-pack, AI crawlers allowed. Page in sitemap.xml.
- Minimum eight descriptive contextual internal links in the body per the sections above.
- Chat and demo widgets load deferred, never blocking LCP or shifting layout.

## 20. Compliance pass, confirmed

No em dashes. No colons or semicolons in on-page conversational copy. Every number tiered, ~50 calls and 70 meetings measured, 9 modules stated as delivered per the published profile. No unattributed percentages imported from the profile. No banned claims. Architected to meet language throughout. No KSA or Qatar references, the profile's Saudi entity stays off the site entirely. Layla scope untouched. JazzCash pilot excluded from the proof strip, JazzCash and Easypaisa named only as prequalification credibility. No home-services positioning above the fold. Chat capture carries its own TDRA opt-in. All quotes verbatim from the published Company Profile, which serves as the permission record.
