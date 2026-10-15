# Standalone pages QA — 15 October 2026

16 added pages; 18 total including home and synthetic demo. All statically exported with route-specific metadata. Shared navigation includes file index, role pages, all five modules, contact, controls and privacy. Homepage module cards now link to full briefs.

## Checks completed

- `npm run build`: pass, including TypeScript and static generation.
- `npm test`: all 11 financial, consent, analytics and review-state tests pass.
- `python3 scripts/check-export.py`: 18 pages and 890 internal links/anchors pass; exactly one h1 on each page.
- Browser at 1440×900: product cover and expanded three-column file index visually inspected; saved `qa/pages-product-desktop.jpg`.
- Browser at 390×844: product menu opens into a scrollable single-column directory; document width equals viewport width. Escape closes menu and returns focus to its summary.
- Long monthly-narrative module heading fits at 390px; no page overflow. Saved `qa/pages-module-mobile.jpg`.
- Contact form with offer=3 and role=owner: invalid submit focuses error summary; fictional example inputs plus consent produce REQUEST PREPARED / NOT SENT with correct role and module. Clear removes entered data. No transmission.
- Manual Pause motion produces static inner-page presentation. Reduced-motion branch bypasses all GSAP reveals and pinning; inner pages never pin.
- Browser warning/error log was empty during these checks.

## Representative Lighthouse checks

Local production export, Lighthouse 13.5.0. Scores are lab snapshots, not accessibility certification or field metrics.

| Page | Preset | Performance | Accessibility | Best practices | SEO |
| --- | --- | ---: | ---: | ---: | ---: |
| /product | Mobile | 88 | 100 | 100 | 100 |
| /contact | Desktop, reduced-motion browser flag | 100 | 100 | 100 | 100 |

HTML/JSON reports: `qa/lighthouse-product-mobile.report.*`, `qa/lighthouse-contact-desktop.report.*`. These representative checks do not claim every route was individually Lighthouse audited. Prior home/demo scores remain documented separately.

The final change after Lighthouse aligned form maximum lengths with the existing validation contract; the production build was rerun successfully. No real lead endpoint, active privacy mailbox, live financial connection or deployed domain has been created. See brief-coverage.md for the scope map and validation-playbook.md for the unsent business-validation handoff.
