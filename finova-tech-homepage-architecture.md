# Finova.tech — Homepage architecture and build spec

The definitive blueprint for the homepage. Copy spine comes from finova-tech-homepage-copy.md, this layers the full on-page SEO, technical SEO, GEO and AI-SEO, E-E-A-T, and CRO structure on top, grounded in Google's current guidance and the on-page and technical SEO checklists. No em dashes. On-site conversational copy carries no colons or semicolons.

## Skills applied, and two set aside
Applied: copywriting, cro, ai-seo and GEO, on-page SEO, technical SEO, plus Google Search Central guidance on people-first content, E-E-A-T, and AI Overviews.
Set aside for the homepage, with reason: programmatic SEO is for generating pages at scale from data, which is the use-case, integration, and local layers in Phase 2, not a bespoke homepage. ASO optimizes App Store and Google Play listings and needs a store URL, Finova has no app listing, so it has nothing to act on here.

---

## 1. Page intent and targeting
- Role, the hub of the site and the brand's front door, serving both buyer doors.
- Search intent, navigational and commercial. Brand seekers, plus buyers scanning "is this a real done-for-you AI firm."
- Primary entity to own, Finova Solutions, plus the umbrella category, done-for-you agentic AI operations.
- The homepage does not target the money-page head terms. "AI agent development," "workflow automation," "custom AI development" are owned by their service pages so the homepage does not compete with them. The homepage routes intent down to those pages.
- Conversion goal, a booked call, with two paths, Door A to the offer for local businesses, Door B to a workflow review for operations teams.

---

## 2. Head and meta

Title, on-page SEO wants the keyword near the start, 50 to 60 characters, unique and compelling. The homepage leads with the benefit and the entity, not a money-page head term.
- Recommended, `AI Agents That Run Your Operations, Built for You | Finova` (about 57 chars)
- Alt 1, `Done-for-You AI Agents and Automation | Finova Solutions` (about 56)
- Alt 2, `AI Automation Agency, Agents Built and Run for You | Finova` (about 58)

Meta description, 150 to 160 chars, value plus CTA, keyword near front.
- `Finova builds and runs AI agents inside the tools you already use, quality checked on every interaction. You keep the outcome, we stay accountable. Book a call.` (about 158)

Other head elements:
- Slug, `/`. Canonical, self-referencing `https://finovasolutions.tech/`.
- `<html lang="en">`. Robots, `index,follow`.
- Open Graph and Twitter card, title, description, a 1200x630 OG image with the H1 and a real product visual, `og:type=website`.
- One H1 only. Sequential headings, no skipped levels.

---

## 3. Heading hierarchy (one H1, H2 per section)

```
H1  Your operations, run by AI agents we build and manage      (hero)
H2  Already live in production, not a concept                   (proof bar)
H2  The difference is what stops slipping through               (before / after)
H2  Four jobs, run for you                                      (what we run)
  H3 Capture every lead
  H3 Run the workflow
  H3 Surface the insight
  H3 Stay accountable
H2  You get the outcome. We run the system                      (the model)
H2  Built around how your business actually runs                (industries)
H2  Nothing runs unattended                                     (accountability / QA)
H2  Insurance verification, now run by an agent                 (proof spotlight)
H2  Questions buyers ask before they book                       (FAQ, GEO)
H2  Tell us the work you want off your plate                    (final CTA)
```

---

## 4. Section-by-section architecture

For each section, the job, the conversion role, the copy source, the terms and entities it should carry, the internal links out, and the GEO or media treatment.

| # | Section | Job | CRO role | Internal links out | Terms / entities to carry | GEO and media |
|---|---|---|---|---|---|---|
| 1 | Hero, split path | State the value, route the visitor | Two primary paths plus one micro-conversion | Door A to /dfy, Door B to Calendly, secondary to live demo | agentic AI operations, AI agents, built and run for you | Subhead is the answer-first sentence an AI engine can lift. Hero visual gets descriptive alt text |
| 2 | Proof bar | Prove it is real, early | Social proof above the fold fold-line | /customers when live | Telecom Foundation, Sirius Solutions, AdvanzaTech, JazzCash, NIC Cohort 5 | Client names as entities. Pedigree line is an E-E-A-T signal |
| 3 | Before / after | Frame the problem and the gain | Loss aversion, the core emotional lever | /industries/home-services contextually | missed calls, after-hours, follow-up, reactivation | One measured claim, AdvanzaTech 70 meetings, labeled measured |
| 4 | What we run | Show the four jobs | Self-qualification into a need | each job links to its money page, capture to /solutions/ai-receptionist, workflow to /solutions/workflow-automation, insight to /solutions/custom-ai-development, accountable to /solutions/qa | lead capture, workflow automation, transcription and insight, QA | Each job opens with a one-line answer. This is the homepage's main internal-link hub into money pages |
| 5 | The model, run by Finova | Explain the managed model | De-risk, this is the differentiator | /how-it-works | done-for-you, managed AI operations, audit, build in your stack | Lead line is the anti-vendor one-liner. Four steps as discrete claims |
| 6 | Industries | Show vertical fit | Relevance and routing | /industries/healthcare, /industries/home-services | healthcare clinics, med-spa, dental, home services, trades | Each industry line is an extractable claim |
| 7 | Accountability and QA | Kill the unattended-AI fear | Risk reversal, the top objection | /trust, /solutions/qa | QualiCall, governance, explainable, human approval, escalation | Answer-first. This section is what enterprise buyers scan for |
| 8 | Proof spotlight, Sirius | Make it believable with one story | The believability anchor | /customers/sirius-solutions when live | insurance verification, medical billing, coverage, US providers | Real story, representative-figures guardrail, no unlabeled numbers |
| 9 | FAQ | Answer pre-booking questions, win AI citation | Removes friction, feeds GEO | money pages and /pricing and /trust in answers | how it works, pricing model, data and security, timeline, languages | 40 to 60 word answers, FAQPage schema, the strongest GEO block on the page |
| 10 | Final CTA | Convert | The close, both doors | Calendly, /dfy, live demo | book a call, see the offer | Restate both paths, no new friction |
| 11 | Footer | Navigate and signal trust | Secondary nav, trust links | Company, Solutions, Industries, Resources, Trust, Legal | full internal-link surface | Legal and Trust links are E-E-A-T signals |

New section to add versus the current copy, the FAQ at slot 9. It is the highest-value GEO and on-page addition, it captures pre-booking questions, earns featured snippets, and is the block AI engines most reliably cite. Pull the five Q and A from finova-tech-seo-pack.md and keep each answer to 40 to 60 words.

---

## 5. Keyword and entity map
- Primary, Finova Solutions, done-for-you AI agents, agentic AI operations.
- Secondary, AI automation agency, AI agents for business, managed AI, voice AI agents.
- Semantic and supporting, workflow automation, AI receptionist, call quality, AI QA, multilingual voice agent, lead capture, follow-up and reactivation.
- Entities for GEO, Finova Solutions, Awaaz Labs, QualiCall, Layla, Telecom Foundation, Sirius Solutions Global, AdvanzaTech, JazzCash, National Incubation Center. Naming real entities consistently across the site is what AI engines cross-reference.
- Rule, write for people first. Use these naturally, never stuff. Google's helpful-content system is now part of core ranking and a high amount of unhelpful or stuffed content drags the whole site down.

---

## 6. Internal linking plan (homepage as hub)
The homepage is the top of the hub-and-spoke. It must link down into every money page so authority and visitors flow to the pages built to convert.
- What we run, four links, one per capability money page.
- The model, link to /how-it-works.
- Industries, two links to the live hubs.
- Accountability, link to /trust and /solutions/qa.
- Proof spotlight, link to the Sirius case study when live.
- FAQ answers, link to /pricing, /trust, and the relevant money pages.
- Footer, the full internal-link surface.
- Anchors are descriptive, never click here. Minimum eight contextual internal links in the body, plus the footer.

---

## 7. Structured data plan
Ship the JSON-LD already drafted in finova-tech-seo-pack.md, wired with E-E-A-T fields.
- Organization, name, url, logo, description, foundingDate 2025-03-07, founder Astafa Ali, areaServed USA, AUS, MENA, and a sameAs array to the LinkedIn company page, Crunchbase, and any directory profiles. The sameAs array is a direct AI-engine and E-E-A-T signal.
- WebSite, name and url. Add SearchAction only if on-site search exists, otherwise omit it.
- Service or ProfessionalService, the done-for-you offering, provider points to the Organization.
- FAQPage, for the slot-9 FAQ, mainEntity is the five Q and A.
- Validate in Google's Rich Results Test, no errors, types match the visible content. Per Google, schema is a supporting signal that helps machines understand the page, it is not a citation trigger, so the visible content must stand on its own.

---

## 8. GEO and AI-SEO treatment
Grounded in Google's AI Overviews guidance, AI answers draw from the same index as search, strong organic rankings and E-E-A-T are the foundation, and there is no schema trick that guarantees a citation. What we control:
- Lead sections with a clear answer sentence, the hero subhead, the four-jobs lines, the model steps, the QA paragraph, and every FAQ answer. Synthesis systems lift discrete, self-contained claims.
- Descriptive H2s that read as the question or the claim, not clever labels.
- The FAQ block in 40 to 60 word answers, the single highest-yield GEO element on the page.
- Consistent entity naming across the site so engines can cross-reference Finova, Awaaz Labs, QualiCall, and the named clients.
- The same changes that help AI citation, clearer structure and stronger E-E-A-T, also lift normal rankings, so there is no separate AI strategy to chase.

---

## 9. E-E-A-T plan
Google's quality framework, with Trust as the foundation and Experience now a core differentiator. The homepage must show, not claim.
- Experience, name the five live deployments, keep the one measured number, AdvanzaTech 70 meetings, and ship the real recorded call clip. Original media that proves first-hand delivery is one of the strongest Experience signals, a real call clip is worth more than any adjective.
- Expertise, the team-pedigree line in the proof bar, and the link to /how-it-works that shows the actual delivery method.
- Authoritativeness, named government and fintech and healthcare clients, NIC Cohort 5, and over time the Clutch and directory presence linked from the footer.
- Trust, the /trust page, visible Privacy and Terms, the architected-to-meet compliance language, QualiCall governance front and center, real contact details, and the representative-figures guardrail. Honesty about what is measured versus representative is itself a trust signal.
- Hard guardrails, no banned claims, no unlabeled percentages, no fabricated case studies, the Sirius numbers stay representative and labeled.

---

## 10. CRO conversion map
- Above the fold must carry, the H1, the answer-first subhead, both door CTAs, the live-agent micro-CTA, and a glimpse of proof. The visitor self-selects their door, this dual-path is the core conversion mechanic.
- CTA hierarchy, primary Book a call to the canonical Calendly and See the offer to /dfy, repeated at hero, after the model, and in the final CTA. Secondary, Hear a live agent. Never introduce a competing third primary action.
- Proof early, the proof bar sits immediately under the hero so social proof lands before the pitch.
- Objection handling in order, loss aversion in before and after, capability in what we run, the de-risking model, then the QA section that answers the single biggest fear, AI running unattended, then the Sirius story as believability, then the FAQ that clears the last practical questions, then the close.
- Psychology levers, loss aversion, missed calls are lost jobs. Authority, named gov and fintech clients and pedigree. Specificity, the one measured number. Risk reversal, nothing runs unattended. Self-selection, two doors so each buyer qualifies into the right path.
- Friction reducers, no pitch, we map where you are losing time, the live clip lets them experience the product before booking.
- Canonical Calendly on every Book a call, https://calendly.com/ceo-finovasolutions/done-for-you-service-finova-solutions

---

## 11. Technical SEO requirements
Source build, finova-tech-homepage.html, production as a static, crawler-safe page. Targets from the technical SEO checklist.
- Core Web Vitals, LCP under 2.5s, INP under 200ms, CLS under 0.1. Reserve image and media dimensions to protect CLS, the hero must not shift on load.
- Performance, images in WebP or AVIF, sized and lazy-loaded below the fold, hero eager. Minify and compress CSS and JS, brotli or gzip. No render-blocking resources above the fold. Fonts with font-display swap, the Fraunces and Outfit and Geist Mono load is already wired, preconnect to the font host. Defer or async third-party scripts. TTFB under 200ms, CDN for static assets, HTTP/2 or HTTP/3, caching headers set.
- Mobile, responsive viewport meta, no horizontal scroll, touch targets at least 44 by 44, body text 16px or more, no intrusive interstitials. The split-path hero must stack cleanly on mobile with both doors still reachable above the fold or one short scroll.
- Security, HTTPS everywhere, HTTP to HTTPS redirect, HSTS, a content security policy, no mixed content.
- Crawl and index, self-referencing canonical, indexable, listed in sitemap.xml, robots.txt and llms.txt shipped from the seo-pack, the AI crawlers allowed.
- Media, the call clip served efficiently, a poster image to avoid layout shift, captions for accessibility and for crawlable text.

---

## 12. Build checklist and acceptance criteria
- One H1, sequential headings, no skipped levels.
- Title and meta set per section 2, both under their limits and unique.
- Self-referencing canonical, lang set, OG and Twitter tags with a real OG image.
- Organization, WebSite, Service, and FAQPage JSON-LD present and validating with no errors, sameAs and founder and foundingDate populated.
- FAQ section live with five 40 to 60 word answers matching the schema.
- At least eight descriptive contextual internal links into money pages, plus the footer surface.
- Core Web Vitals green on mobile and desktop.
- Mobile, 44px targets, 16px text, no horizontal scroll, both doors reachable fast.
- HTTPS, HSTS, CSP, no mixed content.
- Every image WebP or AVIF, sized, with descriptive alt text and a real filename, no IMG_001.
- Canonical Calendly wired on every Book a call, See the offer to /dfy, live-agent clip wired.
- Compliance pass, no banned claims, no unlabeled numbers, Sirius figures representative and labeled, architected-to-meet language, no em dashes, no colons or semicolons in on-site copy.

Open items to unblock go-live, carried forward:
- Team pedigree names for the proof bar and the Expertise signal.
- Written logo permission from Sirius, Telecom Foundation, and AdvanzaTech.
- The real recorded call clip for the hero and the demo.
- Confirm the live demo link or number.
