import BaseGatherer from "lighthouse/core/gather/base-gatherer.js";

// Read-only DOM audit, run by Lighthouse with Chrome's reduced-motion preference.
export default class MemoMotion extends BaseGatherer {
 meta={supportedModes:["navigation"]};
 getArtifact({driver}){
  return driver.executionContext.evaluate(()=>{
   const elements=[...document.querySelectorAll(".typed-char,.headline-line,.review-stamp,.amended-date,.rule-word,.offer-item,.demo-folder,.quote-slip")];
   const unreadable=elements.filter(el=>{const css=getComputedStyle(el);return Number(css.opacity)<1||css.visibility==="hidden"||css.display==="none"});
   const workflow=document.querySelector(".workflow-rail");
   const frame=document.querySelector(".workflow-window");
   const tab=document.querySelector(".demo-tab");
   const tabRect=tab?.getBoundingClientRect();
   return {
    reduced:matchMedia("(prefers-reduced-motion: reduce)").matches,
    pins:document.querySelectorAll(".pin-spacer").length,
    unreadable:unreadable.map(el=>el.className),
    checkedElements:elements.length,
    workflowFits:Boolean(workflow&&frame&&workflow.scrollWidth<=frame.clientWidth),
    noOverflow:document.documentElement.scrollWidth<=innerWidth,
    demoTabVisible:Boolean(tabRect&&tabRect.bottom<=innerHeight&&tabRect.top>=0),
    staticTotals:[...document.querySelectorAll(".cash-figure>.sr-only")].map(el=>el.textContent),
    pausedAnimations:document.getAnimations().every(animation=>animation.playState!=="running"),
   };
  },{args:[],useIsolation:true});
 }
}
