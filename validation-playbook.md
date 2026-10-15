# RunwayMemo — validation and acquisition handoff

Research-stage proposal. No outreach has been sent, advertising purchased or pilot signed. The public prototype uses synthetic data only.

## Pilot protocol

Recruit two accountants and begin with two permissioned service-business clients. Select one of the five offers for each bounded pilot; do not assume all five belong in a bundle. Document existing weekly decisions, source quality, review minutes and current tools before the first brief. Obtain owner and supervising-accountant agreement on scope, data permissions, reviewer responsibility and proposed price before requesting real records through a separately approved channel.

Over four weekly cycles, the accountant prepares/reviews a memo, reconciles its sources, records corrections and review time, and asks the owner which recommendation changed an action. Corroborate the answer with the accountant and a permissioned decision record. Distinguish recommendation, review, owner decision and independently performed action. Compare forecast with actual reconciled cash at the agreed date; log signed error, absolute error, missing inputs and uncertain receipts. Never score an expected receivable as available cash.

At cycle four, seek an owner-and-accountant co-signed paid monthly pilot/renewal decision. $300–$800 monthly per business plus $500 setup is a test hypothesis, not an accepted offer or market benchmark. Quote a bounded scope; record the price shown and the actual purchase decision. Do not project revenue by multiplying hypothetical prices by SME counts.

Proceed only if memos change recurring decisions, inputs reconcile, review effort is sustainable and both participants pay/renew. Stop or narrow scope when accountants rebuild every input, owners only want free reports, material omissions persist or review responsibility cannot be agreed. Numerical go/no-go thresholds must be agreed before testing; none have been validated. Track owner cohort retention separately from clicks and demo engagement.

Barriers: unreliable books, advisory liability, low willingness to pay and accountant channel conflict. Acknowledge review workload and ownership of the client relationship. Vertical templates and integrations are an expansion hypothesis contingent on distribution and retention economics. The supplied research rates the existing forecasting category medium evidence and agentic action differentiation low evidence; these are research judgements, not measured product performance.

## Distribution tests

Start with accounting firms as reseller/co-delivery candidates and bookkeepers/fractional CFOs. Additional hypotheses are industry-specific franchisors, owner networks and small-business lenders; lender introductions must not imply underwriting, eligibility or credit decisions. Compare qualified conversations and dual paid commitments by source, including channel effort and review cost.

### LinkedIn owner post — draft

“Fictional example: Elmfield Repairs starts with $32,000. Payroll is $18,000 Friday; a supplier bill is $12,000. A $15,000 receipt is expected the following Tuesday, not guaranteed. Paying the supplier first leaves $2,000 Friday; holding it leaves $14,000 and an unpaid bill. Which assumption would you want your accountant to check? RunwayMemo is a concept preview of an accountant-reviewed weekly cash decision memo. Explore the synthetic demo; no transfers or accounting entries.”

### Accountant outreach — draft, not sent

“We’re testing whether a short, source-linked weekly memo helps service-business owners make a recurring cash-timing decision. Could we discuss your current workflow and review burden? The proposal starts with one module, permissioned records and four weekly cycles. We would log corrections and review minutes, and ask the owner which decision changed. The preview is synthetic and no production integration is claimed. A paid pilot would require both owner and supervising accountant agreement.”

### Capped paid test — proposed only

Use a small professional-audience test with an owner-approved total budget cap and end date before launch. Do not run until the intake endpoint and privacy notice are ready. Two copy variants may test the decision question versus accountant review, keeping the same landing page and price disclosure. Use non-personal UTM identifiers such as accountant_pilot and memo_timing_a. No sensitive-record audiences or retargeting. Compare buyer-qualified calls, accepted scoped quotes and co-signed pilots, not CTR alone. Stop at the cap or when traffic is outside the intended buyer segment; do not infer willingness to pay from a form preview.

Ad A: “Pay the supplier now, or after the expected receipt? Inspect a fictional weekly cash memo with source links and accountant corrections. DEMO · SYNTHETIC DATA. Concept preview. Hypothetical pilot pricing: $300–$800/month plus $500 setup; not a market benchmark.”

Ad B: “Before the owner decides, an accountant reviews the assumptions. Explore the RunwayMemo synthetic decision memo. No transfers or postings. Concept preview; hypothetical pricing, not an active checkout.”

## Research tracker schema (future Notion/CRM)

Use permissioned, minimized research metadata only. Do not store raw invoices, payroll, bank rows, financial attachments or sensitive identifiers in Notion.

| Field | Type / intended use |
| --- | --- |
| participant_key | Internal pseudonymous research key; actual consented contact mapping in approved intake system |
| segment | Services vertical and established-business qualifier |
| buyer_role | Owner / accountant / fractional CFO |
| outreach_source | Channel and non-personal campaign code |
| interview_date | Date |
| present_tool | Current workflow/tool, including spreadsheets or advisor |
| baseline_volume | Count of weekly decisions/records, scope defined |
| baseline_time_minutes | Current preparation/review effort |
| permissioned_sample_count | Count, no raw records |
| offer_selected | Integer 1–5 |
| demo_click_path | Event names only, no input values |
| price_shown | Quoted test price and currency, distinct from accepted price |
| pilot_budget | Buyer-stated bounded budget, permissioned |
| pilot_owner | Responsible role or pseudonymous key |
| data_access_status | Not requested / consent pending / scope approved / revoked |
| reviewer_status | Assigned / pending / completed |
| counsel_status | Not assessed / review requested / reviewed for stated scope |
| loop_baseline | Existing weekly decision process |
| reviewed_outcome | Owner-reported decision with accountant corroboration status |
| forecast_error | Reconciled error metric in approved research store; aggregate only in Notion |
| review_minutes | Per cycle, separating preparation from correction |
| false_positive_count | Recommendations flagged in error |
| omission_count | Material missed items, no sensitive detail |
| objections | Minimized qualitative notes |
| next_step | Action, assigned role and date |
| signed_paid_pilot_status | Not proposed / quoted / dual consent pending / signed / paid / declined |
| renewal_status | Owner + accountant decision after four cycles |
| consent_status | Purpose, version/date, withdrawal flag |

Deduplicate real qualified leads in the future approved intake service using a normalized contact key and company/role relationship, with access limits and a retention/deletion policy. A console event in the prototype is never that evidence. Keep outreach copy and research drafts separate from public claims.
