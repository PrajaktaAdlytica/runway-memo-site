# RunwayMemo

A complete, scroll-driven **Printed Memo** marketing site and isolated `/demo` workbench. All five implementation phases are complete. This is a **concept preview, not an operating product**. Every financial record is fictional.

## Run

Use Node.js **22.19+** (Node 24 recommended); the included Lighthouse tooling requires 22.19+. No secrets or accounts are needed.

```sh
npm ci
npm run dev -- --port 3018
```

Open [the development preview](http://127.0.0.1:3018/).

```sh
npm test
npm run typecheck
npm run build
npm run preview
```

`next build` exports 18 website pages, `/og.png` and the 404 page into `out/`. `npm run preview` serves that exact export at [127.0.0.1:3019](http://127.0.0.1:3019/), including clean `/demo` URLs. Use `PORT=3020 npm run preview` to choose another port. The preview server binds only to this computer. `next start` is not used with static export.

## What is built

One continuous eleven-scene memo: arrival → four sources → source evidence → two timing scenarios → accountant correction → review workflow → five independent proposed modules → fictional demo entry → controls → hypothetical pilot → consented form preview and FAQ.

Scenes 3–5 pin only when the sheet fits the viewport. Following the horizontal-scroll refinement, scene 6 also pins on desktop until its final card is revealed; short screens pin only the card window. Other scenes scroll naturally. On mobile, the workflow stacks. Operating-system reduced motion removes pins and reveal animations; the footer also provides a manual Pause motion control. GSAP and ScrollTrigger load client-side, with scoped cleanup. Lenis smooths desktop wheel scrolling only when motion is enabled.

The demo has ten synthetic records, a queue, opened record, source pane, correction history and report view. It supports scenarios A/B, delayed receipt ranges, opening-cash amendments, simulated reviewer roles and a deterministic five-stage review loop. Changes invalidate earlier reviews. Local text export is labelled DEMO throughout. Transfer/posting controls are native disabled buttons with no execution handlers.

### Arithmetic and authority

`data/demo.ts` is the source of truth for all fictional names, dates, amounts, record IDs and calculations. Amounts use integer cents. Friday cash is $2,000 for scenario A and $14,000 for scenario B. AR-205 is expected the following Tuesday and never appears in Friday cash. Scenario B leaves the supplier bill unpaid. Tuesday ranges include both receipt and no-receipt cases and are explicitly **illustrative, not probabilities**.

Accountant and owner roles are simulated UI roles, not authentication. An owner cannot use the reducer to amend an assumption or skip accountant review. The preview never sends money, posts entries, sends communications or connects to external financial systems.

### Forms and analytics

The form validates name, email, role, company and explicit consent. It produces **REQUEST PREPARED / NOT SENT**, with edit and clear actions. It does not enroll a lead or submit anything. Form values and demo amendments exist only in page memory. The `.example` privacy email is an explicitly unmonitored placeholder.

`lib/analytics.ts` logs locally to the console; there is no third-party tracking script. Runtime allowlists strip personal and financial fields. Only approved role, offer, surface and sanitized UTM source/campaign values are allowed. Clicks and consent previews are not evidence of purchases. See `analytics-and-intake.md`.

## Deployment on Vercel

The site is ready to deploy; this assignment has **not published it, pushed a repository or connected a domain**.

1. Put this site directory in the intended Git repository, excluding `node_modules`, `.next` and `out`.
2. Import that repository in Vercel. Select **Next.js** and set the project root to this directory (repository root if uploaded by itself).
3. Use `npm ci` to install, `npm run build` to build, and Node 24. Keep the framework's output settings; `output: "export"` in `next.config.ts` generates `out/`.
4. For a verified production origin, set `SITE_URL` to its full HTTPS URL before building. If unset, Vercel previews use `VERCEL_URL`. Local builds fall back to `http://localhost:3018`. No custom domain is assumed to be owned.
5. Deploy a preview and verify `/`, direct `/demo`, `/og.png`, favicons, mobile navigation and form disclosures. Check the generated canonical and `og:url` tags against the deployment origin.
6. When a custom domain is approved, add it through Vercel and use the DNS records Vercel supplies. Update `SITE_URL`, rebuild, and verify HTTPS and sharing metadata on the final origin.

For another static host, serve `out/` with `/demo` resolving to `/demo.html`; unknown paths should return `404.html` with status 404. The local preview script demonstrates this routing. The share image is generated at build time, so no image service or runtime server is required.

Before opening **real** pilot intake, replace the placeholder privacy contact, finalize the privacy notice and permission scope, and connect a consent-aware endpoint. Real records, real payments and production advisory workflows remain outside this prototype.

Official deployment reference: [Next.js on Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs). Static export behavior was verified against the installed Next.js documentation in `node_modules/next/dist/docs/01-app/02-guides/static-exports.md`.

## QA and Lighthouse

Eleven automated tests cover financial arithmetic, consent validation, analytics filtering, review ordering, role gates, amendments, invalidation, reset and exports. The production build and TypeScript checks pass. `npm audit` reported zero vulnerabilities at handoff.

| Page | Device preset | Performance | Accessibility | Best Practices | SEO |
| --- | --- | ---: | ---: | ---: | ---: |
| Home | Desktop | 100 | 100 | 100 | 100 |
| Demo | Desktop | 100 | 100 | 100 | 100 |
| Home | Mobile | 90 | 100 | 100 | 100 |
| Demo | Mobile | 90 | 100 | 100 | 100 |

Lighthouse 13.5.0, Chrome for Testing 151, local production export, 15 October 2026. These are lab snapshots, not field performance or accessibility certification. Mobile LCP was 3.6s under simulated throttling; desktop LCP was 0.7–0.8s. Layout shift was zero. Hosting/network conditions may change the scores.

To reproduce, start `npm run preview`, then in a second terminal:

```sh
# With Chrome installed in its standard location:
npm run audit:lighthouse

# Or point Lighthouse at an existing Chrome for Testing executable:
CHROME_PATH='/absolute/path/to/Chrome executable' npm run audit:lighthouse
```

The script runs audits serially to avoid competing measurements, saves HTML/JSON reports in `qa/`, and includes read-only project-specific reduced-motion checks at 1440×900 and 390×844. It does not change your OS preferences. Override the audited origin with `AUDIT_URL` if needed. Audit implementation follows [Lighthouse's official CLI workflow](https://developer.chrome.com/docs/lighthouse/overview/).

See `phase-5-qa.md` and `qa/lighthouse-summary.json` for final evidence. Earlier `phase-2-qa.md`, `phase-3-qa.md` and `phase-4-qa.md` are historical phase checkpoints.

## Source map

- `data/demo.ts`: synthetic data, calculations and demo reducer.
- `data/memo-content.ts`: five offers, workflow, rules and FAQ.
- `components/MemoExperience.tsx`: scenes 1–2, navigation, source dialog and motion switch.
- `components/PhaseTwoScenes.tsx`, `lib/usePhaseTwoMotion.ts`, `app/chapters.css`: scenes 3–5.
- `components/PhaseThreeScenes.tsx`, `lib/usePhaseThreeMotion.ts`, `app/closing.css`: workflow, offers, controls, pilot, form and FAQ.
- `components/DemoEntry.tsx`, `components/DemoLink.tsx`: scene 8 and safe campaign links.
- `components/DemoWorkbench.tsx`, `app/demo/workbench.css`: interactive synthetic workbench.
- `lib/demo-report.ts`, `demo-script.md`: local export and deterministic demo walkthrough.
- `lib/pilot-form.ts`, `lib/analytics.ts`, `analytics-and-intake.md`: validation and instrumentation boundaries.
- `app/globals.css`: approved paper/carbon palette and global responsive styles.
- `lib/site-metadata.ts`, `app/og.png/route.tsx`: route metadata and original 1200×630 share artwork.
- `public/brand`, `public/favicons`: approved RM monogram, wordmark and favicon set.
- `fonts`: licensed originals and optimized local WOFF2 files loaded by `next/font`.
- `scripts/subset-fonts.py`: optional font asset regeneration with `fonttools[woff]`; Python is not required to run or build the site.
- `qa`: actual browser captures, downloaded synthetic report and Lighthouse evidence.

The four web font assets total 268,092 bytes. The serif retains its optical-size axis and weights 400–700; handwriting uses weight 400. Latin, punctuation, currency and arrows are preserved. Red remains reserved for the review stamp and accountant corrections.

## Standalone page extension

Added 16 pages with a shared file-index navigation, breadcrumbs, contextual pilot links and a full footer:

- `/product`, `/how-it-works`, `/for-owners`, `/for-accountants`
- `/modules/weekly-cash`, `/modules/receivables`, `/modules/payment-timing`, `/modules/margin-and-mix`, `/modules/monthly-narrative`
- `/pilot`, `/about`, `/contact`, `/controls`, `/privacy`, `/faq`, `/preview-terms`

`data/site-pages.ts` holds the page copy; `components/MemoPage.tsx` and `app/inner-pages.css` provide the printed dossier and responsive motion. `SiteNavigation`, `SiteLink` and `PilotIntake` handle cross-page navigation, sanitized campaign continuity and local form validation. All routes are statically generated, with individual metadata.

See `brief-coverage.md` for the original requirements map, `validation-playbook.md` for unsent outreach/test drafts and the research-tracker schema, and `separate-pages-qa.md` for this extension’s checks. Earlier Lighthouse scores above describe the original home/demo snapshot.

### Sign-in preview

`/sign-in` adds the printed access-slip page, linked from the shared navigation and directory. It previews a passwordless email-link flow. Validation is local; no email is sent, account created or session authenticated. Example email input is cleared after preview completion and is not tracked or persisted. The page supports reduced motion and a stacked mobile layout. Production build, invalid/valid form states, clear/retry and 390px overflow checks pass. Total website page count is now 19.

### Reversible scroll reveals

Static marketing content now enters alternately from left and right using individually scrubbed GSAP triggers (`lib/scroll-reveals.ts`). Coverage includes source introduction, offer cards, controls, pilot criteria, form fields, FAQ, standalone page sections and directory footers. Existing evidence/review and horizontal handover sequences retain their own choreography. Distances reduce from 64px to 24px on small screens. Reduced-motion and manual pause revert the reveals; the interactive demo workbench remains stable. Production build passes; mobile checks show no overflow and manual pause restores opacity/transform defaults. No new animation dependencies were added.

### Persistent navigation and system states

The marketing header moves into a fixed, body-level portal after its original position scrolls offscreen. A same-height slot prevents layout jumps; the portal avoids rotated-paper containing blocks. Mobile menus remain scrollable. Anchor spacing and pinned-scene offsets account for the header.

`app/loading.tsx` provides the printed loading fallback, `app/error.tsx` uses this installed Next version's `retry` callback, and `app/not-found.tsx` exports the branded 404. All share `PageState` and reduced-motion-aware CSS. Static prefetched pages may load without showing a fallback; there is no artificial delay. Desktop and 390px sticky behavior, mobile 404, loading/error visual states and recovery callback were checked. Temporary state-preview tooling was removed before the final build.

### Story and role-journey refinement

The homepage now bridges the accountant correction to a direct “Try this decision” demo link before the explanatory handover and five offers. The full eleven-scene order remains available. The later demo entry explicitly resumes the same Elmfield memo; offer copy connects the supplier example to the wider proposed jobs.

Owner and accountant pages now open their detailed content with distinct working copies (`RoleWorkingPaper`): an owner timing comparison using the shared cash functions, and an accountant source-versus-draft correction sheet. They cross-link the two responsibilities and lead to the full demo. Repeated generic screenshot blocks were removed from these two pages; product screenshots remain on the product overview.

Motion is now concentrated on evidence, cards and handovers. Form fields, headings and footer navigation remain still; reversible side travel is reduced to 32px desktop / 12px mobile with a gentler opacity change. Existing pinned sequences, stamp and handwriting remain intact.

Verification: production build and 11 tests pass; 19 exported pages / 997 internal links and anchors pass. Browser checked owner selection ($14,000 with supplier unpaid), reviewer provenance sheet, cross-role navigation and 390px stacking without overflow. Captures: qa/owner-decision-refinement.jpg and qa/accountant-review-refinement.jpg. Intake and sign-in remain explicitly local previews; this refinement does not add backend services.
