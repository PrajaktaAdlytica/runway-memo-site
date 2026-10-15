import test from "node:test";import assert from "node:assert/strict";import {demo,fridayCash,receiptRange,money} from "../data/demo";
test("Friday never includes the later receivable",()=>{assert.equal(fridayCash("A"),200_000);assert.equal(fridayCash("B"),1_400_000);assert.equal(fridayCash("B")-fridayCash("A"),demo.supplier.amount)});
test("receipt range keeps receipt/no-receipt outcomes distinct",()=>{assert.deepEqual(receiptRange("B"),{min:1_400_000,max:2_900_000});assert.equal(receiptRange("A").max,1_700_000)});
test("opening-cash assumptions recompute both paths",()=>{assert.equal(fridayCash("A",4_000_000),1_000_000);assert.equal(fridayCash("B",4_000_000),2_200_000)});
test("source direction and amount formatting",()=>{assert.equal(demo.business,"Elmfield Repairs");assert.equal(demo.customer,"Brightwater Housing Ltd");assert.equal(money(demo.openingCash),"$32,000")});
