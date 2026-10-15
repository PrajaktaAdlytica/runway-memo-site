"use client";

import {useEffect, useRef, useState, type RefObject, type Dispatch, type SetStateAction} from "react";

/** Each chapter owns its triggers. matchMedia.revert() removes pins and inline styles. */
export function usePhaseTwoMotion(root:RefObject<HTMLDivElement|null>,motion:boolean,setSource:Dispatch<SetStateAction<number>>) {
  const restoredAnchor=useRef(false);
  const [viewport,setViewport]=useState("");
  useEffect(()=>{
    let timer:ReturnType<typeof setTimeout>;
    const resize=()=>{clearTimeout(timer);timer=setTimeout(()=>setViewport(`${window.innerWidth}x${window.innerHeight}`),150)};
    window.addEventListener("resize",resize);
    return()=>{clearTimeout(timer);window.removeEventListener("resize",resize)};
  },[]);
  useEffect(()=>{
    let disposed=false;
    let revert=()=>{};
    async function start() {
      const [{gsap},{ScrollTrigger}]=await Promise.all([import("gsap"),import("gsap/ScrollTrigger")]);
      await document.fonts.ready;
      if(disposed||!root.current)return;
      gsap.registerPlugin(ScrollTrigger);
      const media=gsap.matchMedia();
      revert=()=>media.revert();
      media.add({desktop:"(min-width: 900px)",mobile:"(max-width: 899px)",reduce:"(prefers-reduced-motion: reduce)"},context=>{
        if(context.conditions?.reduce||!motion)return;
        const desktop=Boolean(context.conditions?.desktop);
        const q=gsap.utils.selector(root);
        const pinTop=desktop?106:94;
        const scene=(id:string)=>root.current!.querySelector<HTMLElement>(`#${id} .phase-sheet`)!;
        // Decide per sheet: short windows retain the choreography without
        // pinning an oversized page or disabling the other chapters.
        const fits=(id:string)=>scene(id).offsetHeight+pinTop+24<=window.innerHeight;
        const settings=(id:string,distance:number)=>{
          const sheet=scene(id);
          return fits(id)
            ? {trigger:sheet,start:`top ${pinTop}px`,end:`+=${distance}`,pin:true,pinSpacing:true,anticipatePin:1,invalidateOnRefresh:true}
            : {trigger:sheet,start:"top 65%",end:"bottom 45%",pin:false,invalidateOnRefresh:true};
        };

        let previous=-1;
        ScrollTrigger.create({...settings("evidence",desktop?1250:440),onUpdate:self=>{
          const index=Math.min(3,Math.floor(self.progress*4));
          if(index!==previous){previous=index;setSource(index)}
        }});

        // Finish the brief digit roll even when a reader stops scrolling.
        // All resting states, including pre-entry and reduced motion, show the true totals.
        const numbers=gsap.timeline({paused:true}).fromTo(q(".cash-reel"),{y:0,yPercent:0},{yPercent:-200/3,duration:.55,ease:"steps(2)",stagger:.02,immediateRender:false});
        const scenario=gsap.timeline({scrollTrigger:{...settings("scenarios",desktop?1100:360),scrub:.45,onEnter:()=>{numbers.play()}}});
        scenario.fromTo(q(".date-marker"),{x:()=>-(root.current!.querySelector<HTMLElement>(".date-track")!.clientWidth-12)},{x:0,duration:1.2,ease:"none"},.65)
          .from(q(".receipt-arrival"),{opacity:0,y:5,duration:.25},1.65)
          .to({}, {duration:.25});

        const stamp=gsap.timeline({paused:true}).from(q(".review-stamp"),{scale:1.55,rotation:-13,opacity:0,duration:.2,ease:"power3.in"})
          .to(q(".review-overlay"),{x:2,duration:.035}).to(q(".review-overlay"),{x:-2,duration:.035}).to(q(".review-overlay"),{x:0,duration:.06});
        let stamped=false;
        const reviewPinned=fits("review");
        const review=gsap.timeline({scrollTrigger:{...(reviewPinned?settings("review",desktop?950:320):{trigger:scene("review"),start:"top 70%",end:"bottom top",toggleActions:"play none none reverse"}),scrub:reviewPinned?.4:false,onUpdate:self=>{if(!reviewPinned)return;if(self.progress>.23&&!stamped){stamped=true;stamp.restart()}else if(self.progress<.08&&stamped){stamped=false;stamp.pause(0)}}}});
        review.from(q(".review-overlay"),{y:desktop?65:25,rotation:3,opacity:0,duration:.35,ease:"power2.out"},0)
          .from(q(".correction-strike"),{strokeDashoffset:1,duration:.2,ease:"none"},.4)
          .from(q(".amended-date"),{opacity:0,y:4,duration:.15},.55)
          .from(q(".pen-reveal-path"),{strokeDashoffset:1,duration:.55,ease:"none"},.65)
          .from(q(".amendment-trail"),{y:6,duration:.2},1.1)
          .to({}, {duration:.15});
        if(!reviewPinned)review.add(stamp.play(),.35);
        ScrollTrigger.refresh();
      },root);
      // Pin spacers change document positions after hydration. Restore a direct
      // chapter link once, without moving the reader again on motion changes.
      if(!restoredAnchor.current){
        restoredAnchor.current=true;
        const hash=window.location.hash;
        if(["#evidence","#scenarios","#review","#workflow","#offers","#demo-entry","#controls","#pilot","#pilot-form","#privacy"].includes(hash))requestAnimationFrame(()=>{
          if(!disposed)document.getElementById(hash.slice(1))?.scrollIntoView({behavior:"instant",block:"start"});
        });
      }
    }
    start().catch(()=>{revert()});
    return()=>{disposed=true;revert()};
  },[root,motion,setSource,viewport]);
}
