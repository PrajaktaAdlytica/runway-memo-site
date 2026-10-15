# Phase 2 QA — evidence, scenarios and accountant review

Checked 15 October 2026. Scope: scenes 3–5 only, continuing the approved Phase 1 design. The product remains a concept preview with synthetic records.

## Result

Phase 2 is ready for user review. Production static build and TypeScript compilation passed; all four financial-data tests passed. Browser interactions produced no console errors or warnings.

## Visual and interaction checks

- At 1440 × 900 and 390 × 844, the three new scenes fit their viewports, with no horizontal document overflow and the persistent DEMO tab visible.
- Only scenes 3, 4 and 5 pin. Mobile uses shorter pin distances.
- The four evidence rows select the matching source paper, including keyboard activation. Each paper identifies its fictional record, source file, row and date.
- Cash values derive from integer-cent data. Scenario A settles on $2,000 and B on $14,000; neither includes the later $15,000 receivable.
- Digit animation completes without further scrolling, so intermediate digits do not become a resting state.
- The delayed-receipt control displays illustrative Tuesday ranges of $2,000–$17,000 and $14,000–$29,000, explicitly not probabilities. B's supplier remains unpaid.
- The accountant amendment shows the draft date, corrected expected date, uncertainty note, timestamps, and neutral pending status. A correction does not imply approval.
- Manual motion pause removes pins and reveals all content. Re-enabling motion restores the three scene pins.
- Resizing from 1440 × 900 to 1440 × 720 removes all pins and leaves the correction history fully opaque and both SVG strokes complete. A fresh short-window load also shows complete static content.
- Direct chapter links are restored after animation setup changes page geometry.
- The reduced-motion media branch skips animation setup; static CSS keeps numbers and corrections readable. OS preference emulation is unavailable in this browser interface, so direct OS-level verification remains in Phase 5.
- The evidence event uses the existing local analytics stub and contains no financial records or amounts.

## Captures

- `qa/phase2-evidence-1440.jpg`
- `qa/phase2-scenarios-1440.jpg`
- `qa/phase2-review-1440.jpg`
- `qa/phase2-evidence-390.jpg`
- `qa/phase2-scenarios-390.jpg`
- `qa/phase2-review-390-static.jpg`

These are real local browser captures. Motion may be paused in a capture for readability; they are not product operation or customer evidence.

## Remaining scope

Phase 3 onward requires the user's next approval: remaining marketing scenes, consent form, full demo workbench, final accessibility/Lighthouse pass and deployment documentation. No public deployment, live financial integration or data collection is represented as complete.
