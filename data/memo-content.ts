export const workflow = [
  {id:"01",title:"Import and reconcile",detail:"Bring permissioned accounting, bank, receivables and payroll CSVs together. Resolve gaps before drafting a recommendation.",artifact:"Source packet"},
  {id:"02",title:"Draft two scenarios",detail:"Compare payment timing against the same records. Keep receipt assumptions and unpaid bills visible.",artifact:"Timing comparison"},
  {id:"03",title:"Accountant reviews and corrects",detail:"Your external accountant or fractional CFO checks the evidence and records amendments in the memo.",artifact:"Amendment trail"},
  {id:"04",title:"Owner reviews and decides",detail:"The owner considers the reviewed memo and retains authority. No payment or accounting entry is executed here.",artifact:"Owner decision"},
] as const;
export const offers = [
  {id:1,label:"The weekly position",title:"Weekly cash-in/cash-out and runway reconciliation",detail:"Reconcile the opening position, expected receipts and planned outgoings. Make the assumptions behind a runway estimate explicit.",output:"A reconciled weekly cash memo",question:"Do the books and the bank tell the same story?"},
  {id:2,label:"The collection queue",title:"Customer receivables action queue",detail:"Bring receivables that need attention into a reviewable queue, with source invoices, an assigned reviewer and a proposed next action. No messages are sent automatically.",output:"A reviewed receivables action list",question:"Which expected receipt needs a conversation?"},
  {id:3,label:"The timing decision",title:"Payroll and vendor-bill timing scenarios",detail:"Compare when to pay a vendor against payroll commitments and uncertain receipts. Keep a held bill visibly unpaid in each scenario.",output:"Two source-linked timing scenarios",question:"Pay the supplier now, or after the receipt?"},
  {id:4,label:"The margin exception",title:"Margin and price-mix exception briefing",detail:"Surface changes in job margins or the mix of prices for accountant review. Trace an exception to its records before deciding whether to investigate or adjust pricing.",output:"A focused margin exception brief",question:"What changed in the work, the price or the mix?"},
  {id:5,label:"The monthly narrative",title:"Lender/board monthly narrative with traceable figures",detail:"Prepare a monthly explanation linked to reviewed figures and stated assumptions. The owner and accountant review it before any separate sharing. It makes no credit decision.",output:"A traceable monthly narrative",question:"Can every figure in the story be followed back?"},
] as const;
export type OfferId = typeof offers[number]["id"];
export const memoRules = [
  {title:"Human review before anything leaves the memo.",detail:"The accountant reviews the assumptions. The owner retains the decision."},
  {title:"Every figure stays linked to its source.",detail:"If records do not reconcile, the exception stays visible for review."},
  {title:"No transfers. No accounting entries.",detail:"This is an advisory workflow. It has no authority to move funds or post to your books."},
  {title:"An assumption is labelled as an assumption.",detail:"An expected receipt is never treated as guaranteed cash."},
] as const;
export const faqs = [
  {q:"How is this different from forecasting tools?",a:"RunwayMemo explores a narrow weekly decision memo with source evidence, timing scenarios and an accountant amendment trail. Forecasting software and spreadsheets may already serve parts of that job. Whether reviewed memos add value is a pilot question, not a proven claim."},
  {q:"What data would a pilot use?",a:"Permissioned accounting, bank, receivables and payroll CSVs for a small, agreed scope. The initial research plan is two clients with their accountants. This preview uses fictional records only; there are no live integrations or file uploads."},
  {q:"Why are there no automatic transfers?",a:"A memo helps a person review a decision. RunwayMemo does not execute transfers or post accounting entries. Any real-world action takes place separately, under the owner's existing controls."},
  {q:"What if the books do not reconcile?",a:"The discrepancy needs accountant review before a recommendation can be relied on. If the accountant has to rebuild every input each week, that is a reason to stop or change the pilot."},
  {q:"Who needs to join the pilot?",a:"The business owner and the supervising external accountant or fractional CFO. They agree the scope and co-sign a paid pilot. Accountant and bookkeeper co-delivery is a proposed channel; no partnership is claimed."},
  {q:"Is RunwayMemo available to buy?",a:"This is a concept preview, not an operating product. Modules and pricing are hypotheses. The request form demonstrates a consented request; it does not enrol you, send your details or collect payment."},
] as const;
