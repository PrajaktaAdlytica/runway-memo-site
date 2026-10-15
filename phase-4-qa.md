# Phase 4 QA

Scope: scene 8 demo entry, `/demo`, the synthetic review state machine, report export and landing-page demo links. No production product or live integration was built.

## Verified behavior

- All five stages can be traversed in order. Accountant and owner actions are gated by simulated role.
- Changing the opening assumption to $34,000 yields $4,000 / $16,000 Friday cash, while CASH-01 remains $32,000. Prior review is invalidated.
- Invalid amendment input displays an error. Escape closes the dialog, unlocks page scrolling and restores focus to the editor button; the opening field receives focus when the dialog opens.
- Scenario and delayed-receipt changes reopen completed reviews. Friday totals never include AR-205.
- The delayed branch displays two endpoints, explicitly not a probability, with the held supplier bill still unpaid.
- Record filters expose pending and exception records. The blocked and rejected cases are inspectable.
- Amount buttons open original source documents or linked calculation evidence. On mobile, focus moves to the evidence pane and a return link leads back to the working memo.
- Report view and its downloaded text export preserve source provenance, synthetic labels and actual pending/reviewed state. A real test download is saved as `qa/phase4-amended-memo-DEMO.txt`.
- “Send transfer” and “Post entry” remain native disabled controls with explanatory text and no action handlers.
- Eleven tests cover financial arithmetic, source direction, input validation, analytics filtering, review-order/role enforcement, invalidation, reset and export provenance.

## Visual checks

Desktop at 1440 × 900 and mobile at 390 × 844. Source and memo layout use the approved paper/carbon brand. Critical figures use mono type; accountant notes use pen blue, and corrections use reserved red. DEMO / CONCEPT PREVIEW remains in the fixed corner tab, including when the page scrolls.

Reduced-motion CSS leaves the workbench fully readable; only restrained hover transitions are used here. Scene 8 uses the existing matchMedia motion lifecycle and does not add a pin. Direct OS-preference emulation and the full-site accessibility/Lighthouse review remain Phase 5.

## Remaining boundary

Phase 5 is the final full-site responsive/accessibility, metadata/OG, Lighthouse and run/deploy documentation pass. No publication or custom-domain connection is claimed.

## Final captures and checks

- `qa/phase4-workbench-1440.jpg`: two computed scenarios, source invoice, accountant amendment trail, review handover and disabled actions.
- `qa/phase4-report-1440.jpg`: source-linked owner brief with pending owner review.
- `qa/phase4-scenarios-390.jpg`: stacked mobile scenarios, held bill and persistent disclosure.
- No horizontal page overflow at 390, 768, 900 or 1440 pixels wide.
- No console errors or warnings after the final clean load. The Next.js smooth-scroll route-transition warning was resolved with the root HTML scroll-behavior attribute.
- Landing-page animation pins are removed when navigating to `/demo`; returning to scene 8 restores the story route.
