# Phase 4 — deterministic synthetic workbench

Run `/demo`. Every person, organization, source record, timestamp and outcome is fictional. The demo performs no transfers, postings, account connections or external sending. State remains in page memory and resets on reload.

## Fixture dictionary

`data/demo.ts` is the source of truth for the fixture and review reducer. Amounts are integer cents; editable opening-cash assumptions accept whole dollars only.

| Key / record | Meaning | Baseline |
| --- | --- | --- |
| today | Fixed illustrative as-of date | 14 Oct 2026 |
| business / customer | Invoice direction | Elmfield Repairs → Brightwater Housing Ltd |
| CASH-01 | Opening bank reference | $32,000; bank.csv row 1 |
| AC-01 | Accounting reference and format check | $32,000; accounting.csv row 2 |
| PY-17 | Payroll commitment | $18,000; Fri 23 Oct 2026; payroll.csv row 17 |
| VB-31 | Supplier bill | $12,000; payables.csv row 31 |
| AR-205 | Expected receipt, never guaranteed | $15,000; Tue 27 Oct 2026; receivables.csv row 205 |
| MEMO-18 | Open supplier-timing decision | Suggested until owner review |
| EX-02 | Delayed / overdue receipt sensitivity | Blocked example; never treats absent cash as received |
| RC-01 | Treating a receipt as guaranteed | Rejected example |
| RV-01 / OW-01 | Accountant and owner review records | Pending until their corresponding review steps |
| accountant / owner | Simulated review participants | Mara Ellis / Alex Rowan |

The queue contains ten sources, checks and decisions, not ten separate financial transactions. Its count is derived from the fixture array.

## Baseline arithmetic

- A: $32,000 − $12,000 − $18,000 = $2,000 Friday cash.
- B: $32,000 − $18,000 = $14,000 Friday cash; supplier remains unpaid.
- Friday excludes the later receipt in both scenarios.
- Tuesday receipt-absent → receipt-received ranges: A $2,000–$17,000; B $14,000–$29,000. These are illustrative ranges, not probabilities. B's supplier remains unpaid at both endpoints.

## Clickable walkthrough

1. Open the workbench from the hero, footer or scene 8 folder. Both DEMO and CONCEPT PREVIEW remain visible.
2. Inspect a currency amount. It opens its original document or the calculation pane with links to the inputs. The invoice runs from Elmfield Repairs to Brightwater Housing Ltd.
3. With the accountant role selected, choose **Reconcile sources**, then **Draft two scenarios**. The stepper advances and timestamped history entries are appended.
4. Switch Scenario A/B. The selected state changes, with no payment action.
5. Toggle **AR-205 delayed** to display receipt-absent and receipt-received ranges. Alternatively, filter the queue to Exceptions, open EX-02, and choose its delayed-receipt branch. RC-01 explains the rejected guaranteed-receipt proposal.
6. Choose **Apply accountant correction**. The unsupported 24 Oct draft assumption is corrected to expected 27 Oct, with uncertainty retained. Owner review remains pending.
7. Choose **Continue as owner**, then **Record owner review**. State becomes “Owner reviewed · no action executed”. The simulated accountant cannot complete the owner step.
8. Switch to accountant view and choose **Edit opening-cash assumption**. Enter 34000 with a reason. Both Friday totals become $4,000 / $16,000; original source CASH-01 remains $32,000. Review reopens at Scenario drafted.
9. Review updated assumptions again before the owner step can be repeated. Timestamps remain chronological even after multiple edits.
10. Open Report view. Review the source-linked figures, assumptions, review status and trail. Download the local text memo; it includes synthetic labels, original source values and amendment details.
11. Reset demo to reproduce the same baseline.

## Transition contract

| Current state | Actor / action | Next state |
| --- | --- | --- |
| Imported | Accountant / reconcile | Reconciled |
| Reconciled | Accountant / draft | Scenario drafted |
| Scenario drafted | Accountant / correct or re-review | Accountant corrected |
| Accountant corrected | Owner / record review | Owner reviewed |
| Corrected or reviewed | Scenario selection, receipt sensitivity or valid accountant amendment changes | Scenario drafted; both reviews must repeat |
| Corrected or reviewed | Reopen | Scenario drafted; accountant role selected |
| Any | Reset | Imported, baseline values and history |

Amendment validation rejects invalid, fractional, negative, out-of-range or unchanged input and requires a reason. Only the accountant can amend, after scenarios are drafted. The reducer enforces these rules independently of disabled UI controls.

No transition creates an external action. “Send transfer” and “Post entry” are native disabled buttons with no handlers. Focusable explanatory wrappers expose the unavailable-action message to keyboard users; the same note is permanently visible for touch users.

## Export and analytics

`lib/demo-report.ts` generates a local UTF-8 text file, not an external email or accounting export. Each report identifies itself as DEMO / SYNTHETIC DATA / CONCEPT PREVIEW, and retains pending status where appropriate.

`demo_open` fires once per workbench mount. `override_view` records opening correction history or the amendment editor. Payloads contain only the allowlisted surface identifier and safe campaign tags. Navigation from the landing page carries only allowed UTM source/campaign values. No financial values or amendment text enter analytics.
