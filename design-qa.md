# Phase 1 design QA

final result: passed

Scope: scenes 1–2 and foundational assets only. This is not sign-off on the full eleven-scene site.

## Reference and evidence

- Selected direction: `../runwaymemo-visual-directions/02-the-printed-memo.png`.
- The latest user specification governs content, chronology and approved colors.
- Compared source and implementation together in `qa/reference-comparison.jpg`.
- Desktop capture: `qa/desktop-1440.jpg` at 1440 × 900.
- Mobile capture: `qa/mobile-390.jpg` at 390 × 844.
- Full mobile page: `qa/mobile-full-page.jpg`.

## Visual findings

Paper/carbon palette, editorial serif hierarchy, asymmetric invoice, thin rules, pen-blue annotations, paperclip and layered sheets carry the selected direction. The approved monogram replaces the reference's provisional wordmark. The routing header precedes the headline as required by the latest brief. The invoice has no invented address or real bank branding, and correctly bills from Elmfield Repairs to Brightwater Housing Ltd.

The four desktop sources briefly gather into a single stack, then separate into readable clickable papers. Mobile uses a vertical arrangement. No scene is pinned in Phase 1.

## Verified

- Production static build and TypeScript compilation passed.
- Four financial-data tests passed, including Friday balances, uncertain receipt range, opening-cash overrides and invoice direction.
- One h1, semantic navigation/main, labeled buttons, visible focus styles.
- Role toggle updates the supporting copy and logs `buyer_qualified`.
- Source, demo-preview and pilot-information buttons open the expected dialogs.
- Escape closes the source dialog and restores focus to its triggering control.
- Mobile source dialog has no horizontal overflow.
- No document horizontal overflow at either tested viewport; all images loaded.
- No browser console errors or warnings during the tested interactions.
- Manual motion pause removes animation transforms and leaves every animated element visible.
- The reduced-motion media branch bypasses GSAP animation/Lenis, with CSS disabling transitions and preserving static content. OS-level media emulation was not available in this browser interface; a direct OS preference check remains in Phase 5.
- Carbon ink on paper: 9.66:1; muted text: 5.09:1; pen blue: 6.58:1. All exceed 4.5:1.
- Persistent DEMO label in the page and explicit DEMO/CONCEPT labels inside dialogs.
- Friday values are derived: $32,000 − $12,000 − $18,000 = $2,000; $32,000 − $18,000 = $14,000. The Tuesday receipt is excluded.

## Deliberately pending

Scenes 3–11, complete demo workbench, form submission/validation, all remaining events, OG artwork, Lighthouse and a full accessibility audit belong to later user-approved phases. No production integration, payment, transfer, posting, live intake, public deployment or custom domain is represented as complete.
