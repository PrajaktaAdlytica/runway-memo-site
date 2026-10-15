import {test} from "node:test";
import assert from "node:assert/strict";
import {demo,workbench,initialWorkbench,workbenchReducer,fridayCash,receiptRange,parseOpening,reviewStatus,type WorkbenchState} from "../data/demo";
import {buildMemoText} from "../lib/demo-report";
function draft(){let s=initialWorkbench();s=workbenchReducer(s,{type:"advance"});return workbenchReducer(s,{type:"advance"})}
function reviewed(){let s=workbenchReducer(draft(),{type:"advance"});s=workbenchReducer(s,{type:"role",role:"owner"});return workbenchReducer(s,{type:"advance"})}

test("review progresses in order and cannot be completed by the wrong role",()=>{
 let s=initialWorkbench();assert.equal(s.stage,0);
 s=workbenchReducer(s,{type:"role",role:"owner"});assert.equal(workbenchReducer(s,{type:"advance"}).stage,0);
 s=workbenchReducer(s,{type:"role",role:"accountant"});
 for(const step of [1,2,3]){s=workbenchReducer(s,{type:"advance"});assert.equal(s.stage,step)}
 assert.equal(s.correctedDate,true);assert.equal(workbenchReducer(s,{type:"advance"}).stage,3);
 s=workbenchReducer(s,{type:"role",role:"owner"});s=workbenchReducer(s,{type:"advance"});assert.equal(s.stage,4);
 assert.equal(reviewStatus(s),"Owner reviewed · no action executed");
 assert.ok(s.history.every((entry,i)=>i===0||entry.minute>s.history[i-1].minute));
});

test("amendments preserve sources, recompute both scenarios and revoke prior review",()=>{
 let s=reviewed();s=workbenchReducer(s,{type:"role",role:"accountant"});
 s=workbenchReducer(s,{type:"amend",opening:3_400_000,reason:"Synthetic assumption test"});
 assert.equal(s.stage,2);assert.equal(demo.openingCash,3_200_000);
 assert.equal(fridayCash("A",s.opening),400_000);assert.equal(fridayCash("B",s.opening),1_600_000);
 assert.match(s.history.at(-1)!.detail,/Source remains \$32,000/);
 assert.equal(workbenchReducer(s,{type:"advance"}).stage,3);
});

test("owner cannot amend and invalid money or empty reasons are rejected",()=>{
 const owner=reviewed();assert.equal(workbenchReducer(owner,{type:"amend",opening:4_000_000,reason:"No"}),owner);
 const s=draft();for(const opening of [-1,NaN,Infinity,3_400_001,workbench.maximumOpening+100])assert.equal(workbenchReducer(s,{type:"amend",opening,reason:"Test"}),s);
 assert.equal(workbenchReducer(s,{type:"amend",opening:3_400_000,reason:" "}),s);
 assert.equal(parseOpening("34e3"),null);assert.equal(parseOpening("32000.5"),null);assert.equal(parseOpening("34000"),3_400_000);
});

test("delayed receipt and scenario changes reopen completed reviews",()=>{
 const s=reviewed();const delayed=workbenchReducer(s,{type:"delay",delayed:true});
 assert.equal(delayed.stage,2);assert.equal(fridayCash("B",delayed.opening),1_400_000);
 assert.deepEqual(receiptRange("B",delayed.opening),{min:1_400_000,max:2_900_000});
 assert.equal(workbenchReducer(s,{type:"scenario",scenario:"A"}).stage,2);
 assert.equal(workbenchReducer(s,{type:"scenario",scenario:"B"}),s);
});

test("reset is deterministic and exports retain synthetic labels and source provenance",()=>{
 const s=reviewed();assert.deepEqual(workbenchReducer(s,{type:"reset"}),initialWorkbench());
 const report=buildMemoText(s);
 assert.ok(report.startsWith("DEMO · SYNTHETIC DATA / CONCEPT PREVIEW"));
 for(const id of [demo.bank.id,demo.payroll.id,demo.supplier.id,demo.receivable.id])assert.ok(report.includes(id));
 assert.match(report,/\$2,000 Friday cash/);assert.match(report,/\$14,000 Friday cash/);assert.match(report,/NOT GUARANTEED/);
 assert.match(report,/No external action is approved or executed/);
 assert.equal(new Set(workbench.queue.map(r=>r.id)).size,workbench.queue.length);
});
