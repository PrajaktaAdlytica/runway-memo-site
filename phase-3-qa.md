# Phase 3 QA

Scope: scenes 6, 7, 9, 10 and 11, pilot links, footer and analytics stub. The full demo workbench remains Phase 4.

## Implemented

- Vertical-scroll-driven horizontal workflow with an explicit “Read all steps at once” control. Mobile stacks all four steps. No additional scene pins.
- Five distinct paper-clipped module cards with hover/tap/keyboard flip and separate module-to-form links.
- Typed rule lines, neutral ink checks, a moving quote slip/envelope, hypothetical prices from the shared demo data, and a pilot evidence/stop scorecard.
- Validated consent form preview, native FAQ accordions, privacy/deletion disclosure and file-closed footer.
- Runtime analytics allowlisting, campaign sanitization and duplicate preview-event suppression without retaining a personal identifier.

## Verified

- Production static build and TypeScript compilation pass. Six tests cover financial arithmetic, receipt ranges, source direction, required consent/role validation and analytics data filtering.
- Browser checks at 1440 × 900 and 390 × 844. Additional overflow measurements at 900 and 768 pixels wide.
- No document horizontal overflow; no clipped text within offer-card faces at the tested widths.
- Keyboard Enter flips offer cards and expands the FAQ. Module 3 selection is carried into the form.
- Empty submission displays required-field errors and focuses the summary. Synthetic valid details produce the explicitly unsent completion state.
- Submitting, editing and resubmitting creates one consent event in the page session. Clearing removes test details.
- Manual motion pause removes all scene pins and leaves rules, quote and workflow fully readable. Normal motion restores only the existing three pins.
- Chapter deep links restore their position after motion initialization.
- No console errors or warnings during the tested interactions.
- Persistent DEMO tab remains visible; pricing and form both clearly describe their hypothetical/preview state.

## Captures

- `qa/phase3-pilot-1440.jpg`
- `qa/phase3-form-1440.jpg`
- `qa/phase3-offers-390.jpg`
- `qa/phase3-form-390.jpg`

These are actual browser captures of the local concept preview.

## Remaining checks and boundaries

OS-level reduced-motion emulation is not exposed in this browser interface. The media branch is implemented and reviewed; manual motion-off behavior was exercised. The complete accessibility/Lighthouse audit remains Phase 5. No public deployment, real lead submission, external financial action or full workbench is claimed.
