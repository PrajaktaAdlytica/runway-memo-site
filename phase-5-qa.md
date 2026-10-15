# Phase 5 — final handoff

Completed 15 October 2026. This closes the five-phase implementation brief. No publication, repository push, production intake or custom-domain connection is claimed.

## Changes

- Added distinct route metadata, canonical URLs, Open Graph and Twitter cards, with verified-origin configuration through `SITE_URL` and Vercel preview fallback.
- Created original 1200×630 printed-memo share artwork using the approved monogram, palette and local fonts. Static `/og.png` is generated at build time. Inspected the actual rendered PNG.
- Optimized local fonts to 268,092 bytes total while retaining licensed originals and a regeneration script. No external font/image hosts.
- Removed partial-opacity entry states from text-bearing paper cards. Paper movement remains; text stays readable before its scroll entrance.
- Darkened secondary ink slightly for contrast on the desk and removed faded step numbers. The established brand colors remain unchanged.
- Let source and offer buttons derive accessible names from visible content. Added complete accessible names for animated rule headings.
- Corrected the skip link to focus the headline after navigation.
- Extended manual motion pause to stop CSS transitions and smooth anchor scrolling, including ScrollTrigger's inline scroll setting. Verified the final specificity fix in-browser.
- Added a dependency-free local static preview server and reproducible serial Lighthouse audits.

## Verification

| Check | Result |
| --- | --- |
| Production static export | Pass: home, demo, OG image, 404 |
| TypeScript | Pass in build and standalone check |
| Automated tests | 11 pass: financial arithmetic, intake/analytics, reviewer gates, amendments, invalidation, export/reset |
| Dependency audit | 0 vulnerabilities at handoff |
| Console | No warnings/errors observed during final production browser checks |
| Responsive width | No horizontal page overflow at 320, 390, 768, 900 and 1440px on home/demo |
| Navigation | All internal home anchors resolve; demo and back links work |
| Keyboard | Skip link focuses `memo-heading`; offer details toggle with Enter and visible focus |
| Manual pause | No pin spacers; computed anchor scroll behavior becomes `auto` |
| Demo review | Imported → reconciled → drafted → corrected; owner handover visible |
| Review invalidation | Switching the scenario after correction restores accountant review pending |
| Disabled actions | Send transfer and Post entry remain native disabled buttons |
| Metadata | Unique titles, descriptions, canonical paths, OG/Twitter image tags and custom favicon verified in DOM |

Earlier phase QA records contain the full form validation, dialog focus/return, receipt-delay, amendment and export walkthroughs. Those behaviors are also covered where appropriate by the retained tests. The final browser pass confirmed the production review loop and responsive layouts after the font/style changes.

## Lighthouse evidence

Lighthouse 13.5.0, Chrome for Testing 151, local gzipped static export on `http://127.0.0.1:3019`, serial runs on 15 October 2026. Default desktop and mobile device/throttling presets. HTML/JSON reports and exact measurements are in `qa/`.

| Route | Preset | Performance | Accessibility | Best practices | SEO |
| --- | --- | ---: | ---: | ---: | ---: |
| `/` | Desktop | 100 | 100 | 100 | 100 |
| `/demo` | Desktop | 100 | 100 | 100 | 100 |
| `/` | Mobile | 90 | 100 | 100 | 100 |
| `/demo` | Mobile | 90 | 100 | 100 | 100 |

Desktop LCP: 0.7s home, 0.8s demo. Simulated mobile LCP: 3.6s for both pages, which remains a performance improvement opportunity. Mobile blocking time: 30ms home, 10ms demo. Layout shift: zero. No run warnings. These measurements are lab snapshots, not field data or an accessibility certification.

Separate reduced-motion runs at **1440×900 and 390×844** use Chrome's `--force-prefers-reduced-motion` flag. The project-specific read-only Lighthouse audit confirms:

- The browser media query actually matches reduced motion.
- Zero pinned scene spacers and no running CSS/Web Animations.
- All 117 checked reveal elements readable at full opacity.
- All workflow cards fit, no page overflow, fixed DEMO tab visible.
- Static scenario totals are $2,000 and $14,000.

Both reduced-motion runs scored 100 in accessibility and the project-specific motion check. The final CSS specificity fix for manual pause was separately verified in-browser after these reports; it does not alter the default-motion composition.

## Final captures

- `qa/phase5-workbench-1440.jpg`: real 1440×900 capture with two scenarios, source provenance, accountant amendment, owner handover and disabled actions.
- `qa/phase5-scenarios-390.jpg`: real 390×844 capture with both scenario totals, unpaid supplier and uncertainty disclosure.
- `qa/phase5-offer-keyboard-390.jpg`: keyboard-focused flipped offer card.
- `qa/phase5-home-1440.jpg`: final desktop landing page.
- `qa/phase5-home-390.jpg`: mobile landing page.
- `out/og.png`: generated sharing artwork.

## Remaining product boundaries

The form prepares an unsent request; it does not create a real lead. The privacy email is a marked `.example` placeholder. Demo identities, records, approvals and history are synthetic. No real authentication, financial connections, outbound messages, funds movement, posting, legal assurance or security certification is represented. Real pilot demand and retention remain unproven. Deployment and live intake require their respective configuration described in README.

## Follow-up: source scrolling and stamp entrance

Fixed the shared height cutoff that made all three scenes static in a 775×804 browser window. Each sheet now decides independently whether it fits for pinning; oversized sheets retain natural-scroll source progression and a timed review entrance. Resizing reevaluates the fit. Reduced motion and manual pause still bypass choreography.

Verified at 775×804: opening cash → supplier → receivable while scrolling down, opening cash again while scrolling up. The review stamp starts hidden at enlarged scale, lands at full opacity, resets on reverse scroll, and plays again on re-entry. Production rebuild and all 11 tests pass.
