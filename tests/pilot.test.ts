import {test} from "node:test";
import assert from "node:assert/strict";
import {emptyPilot,validatePilot} from "../lib/pilot-form";
import {safeAnalyticsProps,type AnalyticsProps} from "../lib/analytics";

test("a pilot request requires identity, buyer role and explicit opt-in",()=>{
 const errors=validatePilot({...emptyPilot});
 assert.deepEqual(Object.keys(errors).sort(),["company","consent","email","name","role"]);
 const valid={name:"Demo Owner",email:"owner@example.com",company:"Example Services",role:"owner",offer:"3",consent:true};
 assert.deepEqual(validatePilot(valid),{});
 assert.ok(validatePilot({...valid,consent:false}).consent);
 assert.ok(validatePilot({...valid,email:"broken"}).email);
 assert.ok(validatePilot({...valid,role:"unknown"}).role);
 assert.ok(validatePilot({...valid,offer:"8"}).offer);
});

test("analytics discards personal fields, invalid values and unsafe campaign tags",()=>{
 const props={role:"owner",offer_id:3,surface:"form",email:"private@example.com",amount:32000} as AnalyticsProps;
 const result=safeAnalyticsProps(props,"?utm_source=accountant_network&utm_campaign=weekly_pilot&email=secret");
 assert.deepEqual(result,{role:"owner",offer_id:3,surface:"form",utm_source:"accountant_network",utm_campaign:"weekly_pilot"});
 const unsafe=safeAnalyticsProps({role:"private@example.com",offer_id:99,surface:"private"} as unknown as AnalyticsProps,"?utm_source=private%40example.com&utm_campaign=%3Cscript%3E");
 assert.deepEqual(unsafe,{utm_source:undefined,utm_campaign:undefined});
});
