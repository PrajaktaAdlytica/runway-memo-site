"use client";
import {scrollReveals} from "@/lib/scroll-reveals";
import {useEffect,useRef,useState} from "react";
import {demo,dateLabel,records} from "@/data/demo";
import {track} from "@/lib/analytics";
import {Paper,Arrow} from "./Paper";
import {DemoLink} from "./DemoLink";
import {SiteNavigation,SiteDirectoryFooter,CompanyAddress} from "./SiteNavigation";
import {fundingAnnouncement} from "@/data/company";
import {Invoice} from "./Invoice";
import {PhaseTwoScenes} from "./PhaseTwoScenes";
import {PhaseThreeScenes} from "./PhaseThreeScenes";

function Typed({children}:{children:string}){return <><span className="sr-only">{children}</span><span aria-hidden="true">{Array.from(children).map((letter,i)=><span className="typed-char" key={i}>{letter}</span>)}</span></>}

export function MemoExperience(){
 const root=useRef<HTMLDivElement>(null);const dialog=useRef<HTMLDialogElement>(null);const returnFocus=useRef<HTMLElement|null>(null);
 const [role,setRole]=useState<"owner"|"accountant">("owner");const [activeSource,setActiveSource]=useState(0);const [motion,setMotion]=useState(true);
 const landed=useRef(false);
 useEffect(()=>{document.documentElement.dataset.memoMotion=motion?"on":"paused";return()=>{delete document.documentElement.dataset.memoMotion}},[motion]);
 useEffect(()=>{if(!landed.current){track("landing_view");landed.current=true}},[]);
 useEffect(()=>{
  let cancelled=false;let cleanup=()=>{};
  async function start(){
   const [{gsap},{ScrollTrigger},{default:Lenis}]=await Promise.all([import("gsap"),import("gsap/ScrollTrigger"),import("lenis")]);
   await document.fonts.ready;if(cancelled||!root.current)return;
   gsap.registerPlugin(ScrollTrigger);const mm=gsap.matchMedia();
   mm.add({desktop:"(min-width: 900px)",mobile:"(max-width: 899px)",reduce:"(prefers-reduced-motion: reduce)"},context=>{
    if(context.conditions?.reduce||!motion)return;
    const q=gsap.utils.selector(root);
    const intro=gsap.timeline({defaults:{ease:"power2.out"}});
    intro.from(q(".typed-char"),{opacity:0,duration:.01,stagger:.008},0)
      .from(q(".headline-line"),{y:16,opacity:0,duration:.65,stagger:.1},.45)
      .from(q(".hero-description,.hero-actions,.hero-footnote"),{y:10,opacity:0,duration:.5,stagger:.1},.95)
      .from(q(".invoice-arrival"),{x:context.conditions?.desktop?80:24,y:25,rotation:6,opacity:0,duration:1},.55)
      .from(q(".paperclip"),{y:-65,rotation:-14,opacity:0,duration:.55,ease:"back.out(1.4)"},1.3);
    const slips=q(".source-slip") as HTMLElement[];
    scrollReveals(gsap,root.current!,".packet-summary",!context.conditions?.desktop);
    const sequence=gsap.timeline({scrollTrigger:{trigger:"#sources",start:"top 75%",end:"65% center",scrub:1}});
    if(context.conditions?.desktop){
     // Gather the four systems into one packet, then lay the sources out for reading.
     // Measurements are taken once; the scroll sequence animates transforms only.
     const spacing=slips[1].offsetLeft-slips[0].offsetLeft;
     sequence.fromTo(slips,{y:i=>[26,-12,40,3][i],rotation:i=>[-5,3,-3,5][i],x:i=>[-25,-10,10,25][i]},{x:i=>(1.5-i)*spacing,y:i=>-i*5,rotation:0,duration:.65,stagger:.035},0)
      .to(slips,{x:0,y:0,rotation:0,duration:.75,stagger:.04},.9);
    }else{sequence.from(slips,{y:24,rotation:0,duration:1,stagger:.15},0)}
    sequence.from(q(".source-connector"),{scaleX:0,transformOrigin:"left center",duration:.8},.1);
    let lenis:InstanceType<typeof Lenis>|undefined;let ticker:((time:number)=>void)|undefined;
    if(context.conditions?.desktop){lenis=new Lenis({smoothWheel:true,lerp:.12,anchors:true,prevent:node=>node.closest("dialog")!==null});lenis.on("scroll",ScrollTrigger.update);ticker=time=>lenis?.raf(time*1000);gsap.ticker.add(ticker)}
    return()=>{if(ticker)gsap.ticker.remove(ticker);lenis?.destroy()};
   },root);
   cleanup=()=>mm.revert();
  }start().catch(()=>{/* Static, server-rendered content remains usable if motion cannot load. */});
  return()=>{cancelled=true;cleanup()};
 },[motion]);
 function open(kind:"pilot"|"source",source=0,surface:"hero"|"navigation"="hero"){if(kind==="pilot"){track("pilot_request",{surface});document.getElementById("pilot")?.scrollIntoView({behavior:motion&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches?"smooth":"instant"});return}returnFocus.current=document.activeElement as HTMLElement;setActiveSource(source);dialog.current?.showModal();document.body.classList.add("modal-open")}
 function close(){dialog.current?.close()}
 function onClosed(){document.body.classList.remove("modal-open");returnFocus.current?.focus()}
 function choose(value:"owner"|"accountant"){setRole(value);track("buyer_qualified",{role:value})}
 return <div ref={root} className="experience">
  <a className="skip-link" href="#memo-heading">Skip to the memo</a>
  <div className="demo-tab" role="note"><span className="tab-dot" aria-hidden="true"/>DEMO · SYNTHETIC DATA</div>
  <div className="desk-caption mono" aria-hidden="true">RUNWAYMEMO / A WORKING DOCUMENT</div>
  <main className="memo-stack">
   <Paper className="hero-sheet" id="memo">
    <SiteNavigation/>
    <div className="hero-grid">
     <div className="hero-copy"><p className="eyebrow">CONCEPT PREVIEW <span className="eyebrow-rule"/></p>
      <dl className="memo-routing mono"><div><dt>To</dt><dd><Typed>{`Owner, ${demo.business}`}</Typed></dd></div><div><dt>From</dt><dd><Typed>{"Your external accountant"}</Typed></dd></div><div><dt>Date</dt><dd><Typed>{dateLabel(demo.today)}</Typed></dd></div><div><dt>Subject</dt><dd><Typed>{"This week’s decision"}</Typed></dd></div></dl>
      <h1 id="memo-heading" tabIndex={-1} aria-label="A weekly cash decision memo reviewed by your accountant."><span className="headline-line" aria-hidden="true">A weekly cash</span><span className="headline-line" aria-hidden="true">decision memo</span><span className="headline-line" aria-hidden="true">reviewed by</span><span className="headline-line" aria-hidden="true">your accountant.</span></h1>
      <p className="hero-description">See the sources. Compare the timing.<br/>Review the decision.</p><div className="hero-actions"><DemoLink className="button">Explore demo <Arrow/></DemoLink><button className="button button-secondary pilot-hover" onClick={()=>open("pilot")}>Discuss a pilot</button></div><p className="hero-footnote mono">No transfers or accounting entries.</p>
     </div>
     <div className="invoice-column"><div className="invoice-arrival"><Invoice/></div><p className="source-caption mono"><span aria-hidden="true">↳</span> One source. A question worth reviewing.</p><div className="review-note"><span className="review-rule"/><span className="mono">{demo.review.status}</span></div></div>
    </div><div className="sheet-end mono"><span>01 / THE MEMO ARRIVES</span><a href="#sources">Follow the paper trail <span aria-hidden="true">↓</span></a></div>
   </Paper>
   <aside className="funding-announcement" aria-label="Funding announcement"><span className="mono">RUNWAYMEMO / COMPANY UPDATE</span><p>{fundingAnnouncement}</p></aside>
   <Paper className="problem-sheet" id="sources">
    <div className="section-index mono">02 / THE SOURCE PACKET</div><div className="problem-intro"><div><h2>Four systems.<br/><em>One Friday.</em></h2><p>The records tell you what happened.<br/>The next decision needs them together.</p></div><div className="role-panel"><span className="mono role-label">READ THIS MEMO AS</span><div className="role-switch" role="group" aria-label="Choose your role"><button aria-pressed={role==="owner"} onClick={()=>choose("owner")}>I’m an owner</button><button aria-pressed={role==="accountant"} onClick={()=>choose("accountant")}>I’m an accountant<br/>or fractional CFO</button></div><p className="role-copy" aria-live="polite">{role==="owner"?`Payroll is due ${dateLabel(demo.payroll.due,true)}. A customer receipt is expected ${dateLabel(demo.receivable.expected,true)}. Which assumptions should you review before paying a supplier?`:"Bring the books, bank, receivables and payroll into the same review. Trace the figures, question receipt timing and keep corrections visible."}</p></div></div>
    <div className="source-packet"><div className="source-connector" aria-hidden="true"/><div className="source-slips">{records.map((record,i)=><button className={`source-slip slip-${i}`} key={record.id} onClick={()=>open("source",i)}><span className="paper-grain" aria-hidden="true"/><span className="slip-heading mono"><span>{record.kind}</span><span>0{i+1}</span></span><span className="slip-label">{record.label}</span><strong className={`slip-value ${i===0?"slip-value-small":""}`}>{record.value}</strong><span className="slip-note">{record.note}</span><span className="slip-bottom mono">{record.id}<Arrow/></span></button>)}</div></div>
    <div className="packet-summary"><img src="/brand/monogram.svg" width="47" height="32" alt=""/><p>Separate records.<br/><strong>One reviewable conversation.</strong></p><span className="mono">SOURCE → ASSUMPTION → REVIEW</span></div><div className="sheet-end mono"><span>All records are fictional.</span><a className="text-button" href="#evidence">Follow each figure <Arrow/></a></div>
   </Paper>
   <PhaseTwoScenes motion={motion}/>
   <PhaseThreeScenes motion={motion}/>
   <footer className="footer-complete" id="phase-checkpoint"><div className="footer-top"><a href="#memo" aria-label="Back to RunwayMemo"><img src="/brand/logo.svg" width="195" height="29" alt="RunwayMemo"/></a><span className="file-closed">FILE CLOSED</span></div><SiteDirectoryFooter/><CompanyAddress/><nav className="footer-links" aria-label="Footer navigation"><a href="#sources">The sources</a><a href="#workflow">The review loop</a><a href="#offers">Proposed modules</a><DemoLink>Demo workbench</DemoLink><a href="#controls">Controls</a><a href="#pilot-form" onClick={()=>track("pilot_request",{surface:"form"})}>Pilot request</a><a href="#privacy">Privacy & deletion</a></nav><div className="footer-bottom"><p>RunwayMemo · Concept preview, not an operating product.<br/>Synthetic records only. No transfers or accounting entries.</p><button onClick={()=>setMotion(!motion)} className="motion-toggle" aria-pressed={!motion}>{motion?"Pause motion":"Enable motion"}</button></div></footer>
  </main>
  <dialog ref={dialog} className="memo-dialog" onClose={onClosed} onClick={e=>{if(e.target===e.currentTarget)close()}} aria-labelledby="dialog-title" data-lenis-prevent>
   <div className="dialog-inner"><div className="dialog-top mono"><span>DEMO · SYNTHETIC DATA / CONCEPT PREVIEW</span><button onClick={close} aria-label="Close dialog">Close ×</button></div>
   {<><p className="eyebrow">PERMISSIONED CSV / SYNTHETIC EXAMPLE</p><h2 id="dialog-title">{records[activeSource].kind} source</h2><dl className="source-details"><div><dt>Business</dt><dd>{demo.business}</dd></div><div><dt>Record</dt><dd>{records[activeSource].id}</dd></div><div><dt>Source file</dt><dd>{records[activeSource].source}</dd></div><div><dt>As of</dt><dd>{dateLabel(demo.today)}</dd></div></dl><p className="source-modal-value">{records[activeSource].value}</p><p>{records[activeSource].note}</p>{activeSource===2&&<p>Billed from {demo.business} to {demo.customer}.</p>}<p className="fine mono">Synthetic record. No real data is uploaded or connected.</p></>}
   </div>
  </dialog>
 </div>
}
