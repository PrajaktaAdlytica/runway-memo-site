# Phase 3 — analytics and intake contract

This is a console-only concept preview. There is no collection endpoint, persistent browser storage, mailing list, account creation or payment flow. A form completion is not a qualified lead, purchase or commitment.

## Event map

| Event | Trigger | Allowed properties | Status |
| --- | --- | --- | --- |
| landing_view | Landing component mounts | None | Implemented |
| buyer_qualified | Owner/accountant role toggle | role | Implemented; role selection alone is not qualification evidence |
| evidence_view | Evidence scene enters view | None | Implemented, once per mount |
| offer_18_selected | Open a module card, choose its pilot link, or select a form module | offer_id, surface | Implemented |
| demo_open | Workbench mount | surface | Implemented, once per mount |
| override_view | Open workbench correction history or amendment editor | surface | Implemented |
| price_view | Pilot section becomes visible | None | Implemented, once per mount |
| pilot_request | Activate a pilot CTA | surface, optional offer_id | Implemented |
| consent_submit | Valid form with explicit opt-in | role, optional offer_id, surface | Implemented; preview only, once per component mount |

Every event can include `utm_source` and `utm_campaign` from the current URL. Values must be 1–64 alphanumeric, underscore or hyphen characters. Property keys and values are checked at runtime. Email, name, company, free text and financial records are never accepted by the analytics helper. Use non-personal campaign identifiers.

Duplicate form previews within the page session produce only one consent event. The guard is a boolean and does not retain a personal deduplication key. Actual lead deduplication and qualified-demand measurement require a future consented intake service; this preview does not claim either.

## Form schema

| Field | Input | Rule | Use |
| --- | --- | --- | --- |
| name | text, max 100 | Required, non-blank | Pilot contact |
| email | email, max 254 | Required, valid email shape | Purpose-limited pilot contact |
| role | select | Owner or accountant/fractional CFO | Identify one of the two pilot participants |
| company | text, max 150 | Required, non-blank | Business or advisory firm |
| offer | select | Optional integer ID 1–5 | First module to discuss |
| consent | checkbox, initially unchecked | Explicit opt-in required | Permission for a hypothetical pilot conversation |

Personal fields remain in React memory only. The form fieldset is disabled until client hydration so a no-JavaScript page cannot accidentally submit native form values into a URL. Validation errors have inline messages and a focused summary. A valid form displays “Request prepared / not sent”, with edit and clear actions. Clearing removes entered values; reloading also discards them.

Privacy/deletion information is available in the page. `privacy@runwaymemo.example` is explicitly an unmonitored, reserved placeholder. A verified inbox and final notice must replace it before any live intake is enabled.

## Pilot evidence

Seek owner-reported decisions corroborated by the accountant, reconciliation errors and omissions, review minutes, and paid renewal after the four weekly cycles defined in `data/demo.ts`. Stop or change scope if accountants must reconstruct every input or owners only want free reports. No event in this preview establishes willingness to pay or retention.

## Standalone pages

Module-page mounts also emit `offer_18_selected`; `/pilot` emits `price_view`; `/contact` emits `pilot_request` and supports validated offer/role preselection. These are navigation intentions, not qualified commitments. SiteLink preserves only sanitized UTM source/campaign values across the new internal navigation. The contact form follows the same no-transmission, explicit-consent contract as the homepage form.
