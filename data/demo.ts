/** All fictional records, dates, amounts and derived scenario values live here. */
export const demo = {
  business: "Elmfield Repairs", customer: "Brightwater Housing Ltd", today: "2026-10-14",
  currency: "USD", locale: "en-US", openingCash: 3_200_000,
  payroll: { id: "PY-17", amount: 1_800_000, due: "2026-10-23", source: "payroll.csv", row: 17 },
  supplier: { id: "VB-31", amount: 1_200_000, source: "payables.csv", row: 31, status: "Timing under review" },
  receivable: { id: "AR-205", amount: 1_500_000, expected: "2026-10-27", source: "receivables.csv", row: 205, guaranteed: false },
  accounting: { id: "AC-01", source: "accounting.csv", row: 2 },
  bank: { id: "CASH-01", source: "bank.csv", row: 1 },
  review: {
    status: "Accountant review pending", role: "Your Accountant", incorrectExpected: "2026-10-24",
    draftedAt: "09:10 UTC", correctedAt: "09:18 UTC",
    correctionLines: ["Receipt date is an assumption,", "not confirmed cash."],
  },
  pilot: { monthlyMin:30_000, monthlyMax:80_000, setup:50_000, cycles:4 },
} as const;
export type Scenario = "A" | "B";
export function money(cents: number) { return new Intl.NumberFormat(demo.locale,{ style:"currency",currency:demo.currency,maximumFractionDigits:0 }).format(cents/100); }
export function dateLabel(value: string, weekday=false) { return new Intl.DateTimeFormat("en-GB", {day:"numeric",month:"short",year:weekday?undefined:"numeric",weekday:weekday?"short":undefined,timeZone:"UTC"}).format(new Date(value+"T12:00:00Z")); }
export function shortDate(value: string) { return new Intl.DateTimeFormat("en-GB",{day:"numeric",month:"short",timeZone:"UTC"}).format(new Date(value+"T12:00:00Z")); }
export function fridayCash(scenario: Scenario, opening: number=demo.openingCash) { return opening-demo.payroll.amount-(scenario==="A"?demo.supplier.amount:0); }
/** Tuesday range is BEFORE B's contingent supplier payment. No probability implied. */
export function receiptRange(scenario:Scenario, opening:number=demo.openingCash) { const base=fridayCash(scenario,opening);return {min:base,max:base+demo.receivable.amount}; }
export const records = [
  {kind:"Accounting",id:demo.accounting.id,label:"The books",value:"Permissioned CSV",note:"Reconcile before relying on a figure.",source:demo.accounting.source},
  {kind:"Bank",id:demo.bank.id,label:"Opening cash",value:money(demo.openingCash),note:"The starting point, tied to its source.",source:demo.bank.source},
  {kind:"Receivables",id:demo.receivable.id,label:"Expected receipt",value:money(demo.receivable.amount),note:`Expected ${dateLabel(demo.receivable.expected,true)}. Not guaranteed.`,source:demo.receivable.source},
  {kind:"Payroll",id:demo.payroll.id,label:"Payroll due",value:money(demo.payroll.amount),note:`Due ${dateLabel(demo.payroll.due,true)}.`,source:demo.payroll.source},
] as const;

/** The exact four lines used by the evidence chapter, in narrative order. */
export const evidence = [
  {id:demo.bank.id,label:"Opening cash",amount:demo.openingCash,source:demo.bank.source,row:demo.bank.row,
    kind:"Bank CSV",detail:"Opening balance",note:"Reconcile against the books before relying on this figure.",date:demo.today,dateLabel:"As of"},
  {id:demo.payroll.id,label:"Payroll",amount:demo.payroll.amount,source:demo.payroll.source,row:demo.payroll.row,
    kind:"Payroll schedule",detail:"Payroll due",note:`Due ${dateLabel(demo.payroll.due,true)}. Included in both Friday scenarios.`,date:demo.payroll.due,dateLabel:"Due"},
  {id:demo.supplier.id,label:"Supplier bill",amount:demo.supplier.amount,source:demo.supplier.source,row:demo.supplier.row,
    kind:"Payables register",detail:"Supplier bill",note:"Payment timing is under review. Holding it leaves the bill unpaid.",date:demo.today,dateLabel:"Imported"},
  {id:demo.receivable.id,label:"Receivable",amount:demo.receivable.amount,source:demo.receivable.source,row:demo.receivable.row,
    kind:"Receivables register",detail:"Expected receipt",note:`Expected ${dateLabel(demo.receivable.expected,true)}. Not guaranteed.`,date:demo.receivable.expected,dateLabel:"Expected"},
] as const;

/** Workbench fixture. All names, records, timestamps and amounts are synthetic. */
export const workbench = {
  memoId:"MEMO-18", accountant:"Mara Ellis", owner:"Alex Rowan", supplier:"Northline Parts Co",
  importedAt:"08:30 UTC", checkedAt:"08:25 UTC", date:demo.today,
  stages:["Imported","Reconciled","Scenario drafted","Accountant corrected","Owner reviewed"],
  stageMinutes:[510,525,550,558,565],
  maximumOpening:100_000_000,
  defaultAmendment:"Alternative opening-cash assumption for review.",
  queue:[
    {id:"MEMO-18",label:"Supplier timing decision",type:"memo",state:"Suggested",source:"calculation",owner:"accountant",next:"Review both timing scenarios"},
    {id:demo.bank.id,label:"Opening cash",type:"source",state:"Imported",source:demo.bank.id,owner:"accountant",next:"Reconcile with the accounting file"},
    {id:demo.accounting.id,label:"Accounting file check",type:"check",state:"Completed",source:demo.accounting.id,owner:"accountant",next:"Format check complete; cash review is separate"},
    {id:demo.payroll.id,label:"Payroll commitment",type:"source",state:"Pending",source:demo.payroll.id,owner:"owner",next:`Review before ${dateLabel(demo.payroll.due,true)}`},
    {id:demo.supplier.id,label:"Supplier bill",type:"source",state:"Held",source:demo.supplier.id,owner:"owner",next:"Compare timing; no payment instruction"},
    {id:demo.receivable.id,label:"Expected customer receipt",type:"source",state:"Unconfirmed",source:demo.receivable.id,owner:"accountant",next:`Check expected ${dateLabel(demo.receivable.expected,true)} receipt`},
    {id:"EX-02",label:"Overdue receipt branch",type:"exception",state:"Blocked",source:demo.receivable.id,owner:"accountant",next:"Do not treat an absent receipt as cash"},
    {id:"RC-01",label:"Guaranteed receipt proposal",type:"exception",state:"Rejected",source:demo.receivable.id,owner:"accountant",next:"Rejected: expected receipts are not confirmed cash"},
    {id:"RV-01",label:"Accountant review",type:"review",state:"Pending",source:"calculation",owner:"accountant",next:"Record a source-linked correction"},
    {id:"OW-01",label:"Owner decision",type:"review",state:"Pending",source:"calculation",owner:"owner",next:"Review after the accountant"},
  ],
} as const;
export type WorkbenchSource = typeof evidence[number]["id"] | typeof demo.accounting.id | "calculation";
export type ReviewRole = "accountant"|"owner";
export type ReviewStage = 0|1|2|3|4;
export type ReviewEntry = {id:number;minute:number;actor:string;title:string;detail:string};
export type WorkbenchState = {
 stage:ReviewStage;role:ReviewRole;scenario:Scenario;opening:number;delayed:boolean;correctedDate:boolean;history:ReviewEntry[];
};
export type WorkbenchAction =
 | {type:"role";role:ReviewRole}|{type:"scenario";scenario:Scenario}|{type:"delay";delayed:boolean}
 | {type:"advance"}|{type:"amend";opening:number;reason:string}|{type:"reopen"}|{type:"reset"};
export function initialWorkbench():WorkbenchState {
 return {stage:0,role:"accountant",scenario:"B",opening:demo.openingCash,delayed:false,correctedDate:false,
 history:[{id:1,minute:workbench.stageMinutes[0],actor:"Demo import",title:"Synthetic packet imported",detail:"Accounting, bank, receivables and payroll source references loaded. No live connection."}]};
}
export function minuteLabel(minute:number){return `${String(Math.floor(minute/60)).padStart(2,"0")}:${String(minute%60).padStart(2,"0")} UTC`}
function appendReview(state:WorkbenchState,title:string,detail:string,preferred=0,actor?:string):WorkbenchState {
 const minute=Math.max((state.history.at(-1)?.minute??workbench.stageMinutes[0])+1,preferred);
 return {...state,history:[...state.history,{id:state.history.length+1,minute,actor:actor??(state.role==="accountant"?workbench.accountant:workbench.owner),title,detail}]};
}
export function validOpening(cents:number){return Number.isSafeInteger(cents)&&cents>=0&&cents<=workbench.maximumOpening&&cents%100===0}
export function parseOpening(value:string):number|null {
 if(!/^\d+$/.test(value.trim()))return null;
 const cents=Number(value.trim())*100;return validOpening(cents)?cents:null;
}
/** Review transitions never produce an external action, payment or accounting entry. */
export function workbenchReducer(state:WorkbenchState,action:WorkbenchAction):WorkbenchState {
 if(action.type==="reset")return initialWorkbench();
 if(action.type==="role")return {...state,role:action.role};
 if(action.type==="scenario"){
  if(action.scenario===state.scenario)return state;
  return appendReview({...state,scenario:action.scenario,stage:Math.min(state.stage,2) as ReviewStage},"Scenario selection changed",`Scenario ${action.scenario} selected. ${state.stage>=3?"Prior review reopened. ":""}No action executed.`);
 }
 if(action.type==="delay"){
  if(action.delayed===state.delayed)return state;
  return appendReview({...state,delayed:action.delayed,stage:Math.min(state.stage,2) as ReviewStage},"Receipt sensitivity changed",`${demo.receivable.id}: ${action.delayed?"delayed / not received":"expected date retained, still unconfirmed"}. ${state.stage>=3?"Prior review reopened. ":""}Friday balances exclude this receipt.`);
 }
 if(action.type==="amend"){
  if(state.role!=="accountant"||state.stage<2||!validOpening(action.opening)||!action.reason.trim()||action.reason.length>180||action.opening===state.opening)return state;
  return appendReview({...state,opening:action.opening,stage:2},"Opening-cash assumption amended",`${money(state.opening)} → ${money(action.opening)}. Source remains ${money(demo.openingCash)}. ${action.reason.trim()} Review required again.`);
 }
 if(action.type==="reopen"){
  if(state.stage<3)return state;
  return appendReview({...state,stage:2,role:"accountant"},"Memo reopened","Accountant and owner reviews must be repeated before this revised memo is considered reviewed.");
 }
 if(action.type==="advance"){
  if(state.stage===0&&state.role==="accountant")return appendReview({...state,stage:1},"Sources reconciled in the demo","Opening cash tied to bank and accounting references. Future receipts remain assumptions.",workbench.stageMinutes[1]);
  if(state.stage===1&&state.role==="accountant")return appendReview({...state,stage:2},"Timing scenarios drafted",`Compared supplier-before-payroll with supplier-held. ${demo.receivable.id} excluded from both Friday balances.`,workbench.stageMinutes[2]);
  if(state.stage===2&&state.role==="accountant")return appendReview({...state,stage:3,correctedDate:true},state.correctedDate?"Updated assumptions reviewed":"Receipt assumption corrected",state.correctedDate?"Revised scenario assumptions checked. Owner review remains pending.":`Unsupported ${shortDate(demo.review.incorrectExpected)} draft date replaced with expected ${shortDate(demo.receivable.expected)}. Receipt date is an assumption, not confirmed cash.`,workbench.stageMinutes[3]);
  if(state.stage===3&&state.role==="owner")return appendReview({...state,stage:4},"Owner review recorded",`Scenario ${state.scenario} reviewed in this synthetic walkthrough. No transfer, posting or external instruction approved or executed.`,workbench.stageMinutes[4]);
 }
 return state;
}
export function reviewStatus(state:WorkbenchState){return state.stage===4?"Owner reviewed · no action executed":state.stage===3?"Accountant corrected · owner review pending":demo.review.status}
