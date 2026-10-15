# Original brief coverage — RunwayMemo

The user’s concept brief governs this build; the master guide is a reference. RunwayMemo replaces Owner Harbor throughout public copy. No domain ownership, trademark clearance, demand, deployment or active product is claimed.

The supplied brief mentions “32 schema keys” without supplying a formal machine schema. The following 32-item coverage index maps its named requirements; it is not a claim of compatibility with an unseen schema.

| # | Requirement | Location |
| --- | --- | --- |
| 1 | Brand, logo, favicon, typography | public/brand, public/favicons, layout, global tokens |
| 2 | Tagline and memo-first positioning | Home, /product |
| 3 | Buyer and problem qualification | Home role toggle, /for-owners, /for-accountants |
| 4 | Vision: evidence and human authority | /about, /controls |
| 5 | Narrow mission and permissioned MVP | /how-it-works, /pilot |
| 6 | Accounting, bank, AR, payroll inputs | /how-it-works, evidence scene, demo |
| 7 | Adjacent substitutes, no superiority claim | /about, /faq |
| 8 | Five independent offers | Home cards, /product, five /modules pages |
| 9 | Weekly cash reconciliation | /modules/weekly-cash |
| 10 | Receivables action queue | /modules/receivables |
| 11 | Payroll/vendor timing | /modules/payment-timing |
| 12 | Margin/price-mix exceptions | /modules/margin-and-mix |
| 13 | Lender/board narrative | /modules/monthly-narrative |
| 14 | Hypothetical pricing and bounded pilot | /pilot, home; data/demo.ts |
| 15 | Coherent fictional Elmfield arithmetic | data/demo.ts, tests/demo.test.ts |
| 16 | Source provenance and invoice direction | /demo evidence pane; demo-script.md |
| 17 | Two scenarios and receipt uncertainty | Home timing scene, /demo, /for-owners |
| 18 | Accountant amendment/history | Home review scene, /demo |
| 19 | Approval and override state transitions | demo reducer; demo-script.md; workbench tests |
| 20 | Queue, opened record, report and edge case | /demo: ten synthetic records, rejected guaranteed receipt, blocked overdue branch |
| 21 | No transfers, postings or external sends | /controls, disabled demo actions |
| 22 | Persistent synthetic/concept labels | Fixed tab, sheet labels, demo frames and exports |
| 23 | Desktop/mobile product captures | qa captures; public/previews; /product |
| 24 | Consent, privacy and deletion route | /contact, /privacy; local form only |
| 25 | Analytics and sanitized campaign attribution | lib/analytics.ts, SiteLink, analytics-and-intake.md |
| 26 | Demand-test metrics and dual commitment | /pilot; validation-playbook.md |
| 27 | Acquisition and LinkedIn/paid-test copy | validation-playbook.md |
| 28 | Expansion, evidence strength and barriers | /about, /for-accountants, validation-playbook.md |
| 29 | Go/stop criteria and ground truth | /pilot, validation-playbook.md |
| 30 | Research/Notion tracking schema | validation-playbook.md; no raw sensitive records |
| 31 | Motion, reduced motion, accessible responsive navigation | Home GSAP scenes, MemoPage, SiteNavigation; QA reports |
| 32 | Copyright, claims, implementation limits and deploy handoff | /preview-terms, /controls, README, phase QA |

## Page architecture

The homepage remains the continuous eleven-scene memo. Sixteen added pages deepen that story: product, how it works, owners, accountants, five modules, pilot, about, contact, controls, privacy, FAQ and preview use. A shared file index, active primary links, breadcrumbs, contextual CTAs and complete footer connect them. The demo keeps its focused workbench and return-to-memo navigation.

No fabricated company history, team, testimonials, customer logos, live integrations, certifications or ROI. A separately requested sign-in preview is now present; it explicitly sends no email and creates no session. The synthetic demo remains accessible without an account. Owner and accountant roles there are simulated. The generic guide's authentication and deployment defaults do not turn the concept into a production financial service.

## Remaining launch prerequisites, outside this preview

Real lead delivery requires an approved endpoint, monitored privacy/deletion contact and final notice. The placeholder email is explicitly unmonitored. Pricing acceptance, signed pilots, retention and distribution economics require real validation; they cannot be implemented as claims. No payment collection, real financial uploads, production integrations, domain connection or publication has occurred.

## Recheck — 15 October 2026

Core concept and page coverage match the brief: memo-first positioning, the eleven scenes, five separate offers and module scopes, owner/accountant responsibilities, deterministic financial scenarios, review and correction provenance, proposed pricing, controls, consent preview and analytics allowlist. All 11 calculation/validation/review tests pass. Current static export has 19 pages and 992 valid internal links/anchors, with one h1 each. The loading fallback was changed to h2 to avoid a second h1 in streamed exports.

The site is not a literal copy of every original motion prescription: later user instructions add a pinned horizontal handover, sticky navigation, reversible side entrances, separate pages and sign-in/system states. The timing digits use a short entry roll rather than continuous scroll-ticked amounts. Unfit pinned sheets use natural-scroll fallbacks so their contents remain reachable. These are implementation adaptations, not financial/product scope changes.

Remaining operational requirements: contact submission service, monitored privacy/deletion inbox, actual authentication if desired, approved live-intake privacy/permission terms, deployment/domain, and real owner/accountant commitments and retention evidence. None is claimed complete. The five modules are proposed offers; only the synthetic cash-timing workflow is implemented as an interactive product demo. No production CSV import or live integration is claimed.

This recheck used implementation, exported HTML and automated checks. Existing responsive/Lighthouse evidence is documented in phase QA; it was not rerun comprehensively after every recent motion/navigation change. Browser tooling timed out during the latest blue-hover verification, so no new hover screenshot or fresh full visual accessibility audit is claimed.
