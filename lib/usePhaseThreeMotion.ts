"use client";
import {useEffect,type RefObject} from "react";
import {scrollReveals} from "./scroll-reveals";
export function usePhaseThreeMotion(root:RefObject<HTMLDivElement|null>,motion:boolean,allSteps:boolean) {
 useEffect(()=>{
  let disposed=false;let cleanup=()=>{};
  async function start(){
   const [{gsap},{ScrollTrigger}]=await Promise.all([import("gsap"),import("gsap/ScrollTrigger")]);
   await document.fonts.ready;if(disposed||!root.current)return;
   gsap.registerPlugin(ScrollTrigger);const mm=gsap.matchMedia();cleanup=()=>mm.revert();
   mm.add({desktop:"(min-width:900px)",mobile:"(max-width:899px)",reduce:"(prefers-reduced-motion:reduce)"},ctx=>{
    if(ctx.conditions?.reduce||!motion)return;
    const q=gsap.utils.selector(root);
    if(ctx.conditions?.desktop&&!allSteps){
     const rail=root.current!.querySelector<HTMLElement>(".workflow-rail")!;
     const frame=root.current!.querySelector<HTMLElement>(".workflow-window")!;
     const framePadding=()=>{const style=getComputedStyle(frame);return parseFloat(style.paddingLeft)+parseFloat(style.paddingRight)};
     const sheet=root.current!.querySelector<HTMLElement>("#workflow")!;
     const travel=()=>Math.max(0,rail.scrollWidth-frame.clientWidth+framePadding());
     // Keep the sequence in view until the last card is fully revealed.
     // On short screens pin only the card window so the heading can scroll away.
     const pinTarget=sheet.offsetHeight+130<=window.innerHeight?sheet:frame;
     const sequence=gsap.timeline({scrollTrigger:{
      trigger:pinTarget,start:"top 106px",
      end:()=>`+=${Math.max(travel(),window.innerHeight*.8)+160}`,
      pin:true,pinSpacing:true,scrub:true,invalidateOnRefresh:true,anticipatePin:1,
     }});
     sequence.fromTo(rail,{x:0},{x:()=>-travel(),duration:1,ease:"none"})
      .to({}, {duration:.18}); // Reading space before vertical scrolling resumes.
    }
    scrollReveals(gsap,root.current!,".decision-handover, .offer-item, .memo-rule, .pilot-scorecard > div > p",Boolean(ctx.conditions?.mobile));
    if(!ctx.conditions?.desktop||allSteps)scrollReveals(gsap,root.current!,".workflow-card",Boolean(ctx.conditions?.mobile));
    gsap.from(q(".demo-folder"),{x:ctx.conditions?.mobile?24:64,y:20,rotation:2,duration:.8,ease:"power2.out",scrollTrigger:{trigger:"#demo-entry",start:"top 85%",toggleActions:"play none none reverse"}});
    gsap.from(q(".quote-slip"),{x:ctx.conditions?.mobile?24:55,y:55,rotation:-2,duration:.9,ease:"power2.out",scrollTrigger:{trigger:"#pilot",start:"top 80%",toggleActions:"play none none reverse"}});
    ScrollTrigger.refresh();
   },root);
  }
  start().catch(()=>cleanup());
  return()=>{disposed=true;cleanup()};
 },[root,motion,allSteps]);
}
