import {demo,workbench,dateLabel,money,fridayCash,receiptRange,reviewStatus,minuteLabel,type WorkbenchState} from "@/data/demo";
/** Local text artifact only. Includes provenance, assumptions and explicit review state. */
export function buildMemoText(state:WorkbenchState){
 return [
 "DEMO · SYNTHETIC DATA / CONCEPT PREVIEW",`${workbench.memoId} — ${demo.business}`,`As of ${dateLabel(demo.today)}`,
 `Owner: ${workbench.owner} (fictional)`,`Accountant: ${workbench.accountant} (fictional)`,`Review: ${reviewStatus(state)}`,"",
 "DECISION — ILLUSTRATIVE",`Scenario ${state.scenario} selected. No external action is approved or executed.`,
 `A: ${money(state.opening)} − ${money(demo.supplier.amount)} − ${money(demo.payroll.amount)} = ${money(fridayCash("A",state.opening))} Friday cash.`,
 `B: ${money(state.opening)} − ${money(demo.payroll.amount)} = ${money(fridayCash("B",state.opening))} Friday cash. Supplier bill remains unpaid.`,"",
 "SOURCE REFERENCES — SYNTHETIC",`${demo.bank.id}: ${demo.bank.source}, row ${demo.bank.row}, ${dateLabel(demo.today)}, original opening ${money(demo.openingCash)}.`,
 `${demo.payroll.id}: ${demo.payroll.source}, row ${demo.payroll.row}, ${money(demo.payroll.amount)}, due ${dateLabel(demo.payroll.due)}.`,
 `${demo.supplier.id}: ${demo.supplier.source}, row ${demo.supplier.row}, ${money(demo.supplier.amount)}.`,
 `${demo.receivable.id}: ${demo.receivable.source}, row ${demo.receivable.row}, ${money(demo.receivable.amount)}, expected ${dateLabel(demo.receivable.expected)}; NOT GUARANTEED.`,
 `Invoice from ${demo.business} to ${demo.customer}.`,"",
 "ASSUMPTIONS — ILLUSTRATIVE",`Opening scenario assumption: ${money(state.opening)}. Original source is unchanged.`,
 "No other cash movements are assumed. Friday cash never includes the later receivable.",
 `Receipt sensitivity: ${state.delayed?"delayed / absent branch active":"expected, still unconfirmed"}.`,
 ...(["A","B"] as const).map(s=>`Tuesday ${s} range: ${money(receiptRange(s,state.opening).min)}–${money(receiptRange(s,state.opening).max)}. Receipt absent → received. B supplier remains unpaid.`),
 "Illustrative scenario range, not a probability.","",
 "AMENDMENT TRAIL — SYNTHETIC",...state.history.map(e=>`${minuteLabel(e.minute)} | ${e.actor} | ${e.title}\n${e.detail}`),"",
 "DEMO · SYNTHETIC DATA / CONCEPT PREVIEW", "No transfers, accounting entries, live integrations or external sending. Not an operating product."
 ].join("\n");
}
