"use client";
import {SiteLink as Link} from "./SiteLink";
import {useEffect,useRef,useState} from "react";
import {type MemoPageData,modulePages} from "@/data/site-pages";
import {demo,dateLabel,money,fridayCash} from "@/data/demo";
import {SiteNavigation,SiteDirectoryFooter} from "./SiteNavigation";
import {RoleWorkingPaper} from "./RoleWorkingPaper";
import {PilotIntake} from "./PilotIntake";
import {DemoLink} from "./DemoLink";
import {Arrow,Paper,PaperClip} from "./Paper";
import {track} from "@/lib/analytics";
import {scrollReveals} from "@/lib/scroll-reveals";

export function MemoPage({page}:{page:MemoPageData}){
 const root=useRef<HTMLDivElement>(null);const [motion,setMotion]=useState(true);const seen=useRef(false);
 const contact=`/contact${page.offerId?`?offer=${page.offerId}`:page.slug==="for-owners"?"?role=owner":page.slug==="for-accountants"?"?role=accountant":""}`;
 useEffect(()=>{if(seen.current)return;seen.current=true;if(page.kind==="pilot")track("price_view");if(page.offerId)track("offer_18_selected",{offer_id:page.offerId,surface:"offers"})},[page]);
 useEffect(()=>{
  let disposed=false;let cleanup=()=>{};
  async function start(){const [{gsap},{ScrollTrigger}]=await Promise.all([import("gsap"),import("gsap/ScrollTrigger")]);if(disposed||!root.current)return;gsap.registerPlugin(ScrollTrigger);const mm=gsap.matchMedia();cleanup=()=>mm.revert();mm.add({desktop:"(min-width:900px)",mobile:"(max-width:899px)",reduce:"(prefers-reduced-motion:reduce)"},ctx=>{if(ctx.conditions?.reduce||!motion)return;const q=gsap.utils.selector(root);
   gsap.from(q(".inner-routing dd"),{opacity:0,y:3,stagger:.12,duration:.28});
   gsap.from(q(".inner-hero h1"),{y:14,duration:.65,ease:"power2.out"});
   gsap.from(q(".inner-attached"),{y:25,x:15,rotation:4,duration:.8,ease:"power2.out"});
   scrollReveals(gsap,root.current!,".role-paper, .inner-item-list > li, .module-index > li, .inner-artifact > figure, .inner-cash-comparison > div",Boolean(ctx.conditions?.mobile));
  },root)}start().catch(()=>cleanup());return()=>{disposed=true;cleanup()};
 },[motion,page.slug]);
 return <div ref={root} className={`inner-experience ${motion?"":"inner-paused"}`}><a className="skip-link" href="#page-title">Skip to the memo</a><div className="demo-tab" role="note">DEMO · SYNTHETIC DATA</div><main className="inner-stack">
  <Paper className="inner-cover"><SiteNavigation/><div className="inner-toolbar mono"><nav aria-label="Breadcrumb"><Link href="/">The memo</Link><span aria-hidden="true">/</span>{page.offerId&&<><Link href="/product">Modules</Link><span aria-hidden="true">/</span></>}<span aria-current="page">{page.subject}</span></nav><button onClick={()=>setMotion(!motion)} aria-pressed={!motion}>{motion?"Pause motion":"Enable motion"}</button></div>
  <div className="inner-hero"><div><p className="eyebrow">{page.eyebrow}</p><h1 id="page-title" tabIndex={-1}>{page.title}</h1><p className="inner-lead">{page.intro}</p><div className="hero-actions"><DemoLink className="button">Explore demo <Arrow/></DemoLink>{page.kind!=="contact"&&<Link className="button button-secondary pilot-hover" href={contact} onClick={()=>track("pilot_request",{surface:"hero",offer_id:page.offerId})}>Discuss a pilot</Link>}</div></div><aside className="inner-attached"><PaperClip/><span className="mono inner-note-id">RUNWAYMEMO / FILE {page.folio}</span><dl className="inner-routing mono"><div><dt>To</dt><dd>Owner + accountant</dd></div><div><dt>Re</dt><dd>{page.subject}</dd></div><div><dt>Status</dt><dd>Concept preview</dd></div></dl><p>{page.note}</p><span className="mono">A WORKING DOCUMENT<br/>NOT AN OPERATING PRODUCT</span></aside></div>
  <div className="sheet-end mono"><span>FILE {page.folio} / {page.offerId?"PROPOSED MODULE":"THE PRINTED MEMO"}</span><a href="#page-body">Read the file <span aria-hidden="true">↓</span></a></div></Paper>
  <Paper className="inner-body" id="page-body">{["for-owners","for-accountants"].includes(page.slug)&&<RoleWorkingPaper role={page.slug==="for-owners"?"owner":"accountant"}/>}<div className="inner-sections">{page.sections.map((section,i)=><section className="inner-section" key={section.label} id={`section-${i+1}`}><div className="inner-section-label mono"><span>{String(i+1).padStart(2,"0")} / {section.label}</span><span className="inner-rule"/></div><div className="inner-section-copy"><h2>{section.title}</h2><p className="inner-section-intro">{section.body}</p>{section.items&&<ol className="inner-item-list">{section.items.map(item=><li key={item.title}><h3>{item.title}</h3><p>{item.body}</p></li>)}</ol>}{section.note&&<p className="inner-caution">{section.note}</p>}{page.kind==="product"&&i===1&&<ModuleIndex/>}</div></section>)}</div>
  {page.artifact&&!["for-owners","for-accountants"].includes(page.slug)&&<section className="inner-artifact" aria-labelledby="artifact-title"><div className="inner-section-label mono">DEMO / SYNTHETIC EVIDENCE</div><h2 id="artifact-title">Open the working paper.</h2>{page.artifact==="scenarios"?<div className="inner-cash-comparison">{(["A","B"] as const).map(s=><div key={s}><span className="mono">SCENARIO {s} / {dateLabel(demo.payroll.due)}</span><h3>{s==="A"?"Pay before payroll":"Hold supplier payment"}</h3><strong>{money(fridayCash(s))}</strong><p>{s==="A"?"Supplier and payroll deducted.":"Payroll deducted. Supplier remains unpaid."}</p></div>)}</div>:<figure><picture><source media="(max-width:600px)" srcSet="/previews/scenarios-mobile.jpg"/><img src="/previews/workbench.jpg" alt="Synthetic RunwayMemo workbench showing two cash-timing scenarios, source-linked invoices and an accountant amendment trail." width="1440" height="900" loading="lazy"/></picture><figcaption>Real browser capture of this synthetic prototype. No live customer data or measured outcomes.</figcaption></figure>}<p>Figures derive from the fictional source packet. The later receivable is never included in Friday cash. No transfer or accounting entry can be executed.</p><DemoLink className="text-button">Inspect sources and amend assumptions <Arrow/></DemoLink></section>}
  {page.kind==="contact"&&<PilotIntake/>}
  {page.faq&&<section className="inner-faq"><span className="eyebrow">BEFORE YOU DECIDE</span><h2>Keep the questions open.</h2><div className="faq-list">{page.faq.map(f=><details key={f.q}><summary>{f.q}<span aria-hidden="true">+</span></summary><p>{f.a}</p></details>)}</div></section>}
  {page.kind!=="contact"&&<section className="inner-next"><span className="mono">THE NEXT HANDOVER</span><h2>{page.offerId?"Test this recurring question.":"Bring the owner and accountant."}</h2><p>A bounded pilot would need both people, permissioned records and a purchase decision. This preview takes no payment or sensitive records.</p><Link href={contact} className="button" onClick={()=>track("pilot_request",{surface:"pilot",offer_id:page.offerId})}>Prepare a pilot request <Arrow/></Link><Link className="text-button" href={page.slug==="pilot"?"/controls":"/pilot"}>{page.slug==="pilot"?"Read the controls":"Read the pilot criteria"} <Arrow/></Link></section>}
  <div className="sheet-end mono"><span>CONCEPT PREVIEW / SYNTHETIC DATA</span><a href="#page-title">Back to the heading ↑</a></div></Paper>
  <footer className="footer-complete"><div className="footer-top"><Link href="/" aria-label="RunwayMemo home"><img src="/brand/logo.svg" alt="RunwayMemo" width="195" height="29"/></Link><span className="file-closed">FILE CLOSED</span></div><SiteDirectoryFooter/><div className="footer-bottom"><p>Concept preview, not an operating product.<br/>No transfers or accounting entries.</p><Link href="/privacy">Privacy & deletion</Link></div></footer>
 </main></div>;
}
function ModuleIndex(){return <ol className="module-index">{modulePages.map(page=><li key={page.slug}><Link href={`/modules/${page.slug}`}><span className="mono">0{page.offerId}</span><div><h3>{page.title}</h3><p>{page.subject}</p></div><Arrow/></Link></li>)}</ol>}
