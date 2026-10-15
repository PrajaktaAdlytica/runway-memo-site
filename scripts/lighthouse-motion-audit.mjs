import {Audit} from "lighthouse/core/audits/audit.js";

export default class MemoReducedMotion extends Audit {
 static get meta(){return {id:"memo-reduced-motion",title:"The full memo respects reduced motion",failureTitle:"The reduced-motion memo needs attention",description:"Checks the browser preference, removed pins, readable reveal content, workflow layout, totals, fixed disclosure and page overflow. This is a project-specific audit, not an accessibility certification.",requiredArtifacts:["MemoMotion"]}}
 static audit({MemoMotion:m}){
  const pass=m.reduced&&m.pins===0&&m.unreadable.length===0&&m.checkedElements>20&&m.workflowFits&&m.noOverflow&&m.demoTabVisible&&m.pausedAnimations&&m.staticTotals.length===2;
  return {score:pass?1:0,displayValue:JSON.stringify(m)};
 }
}
