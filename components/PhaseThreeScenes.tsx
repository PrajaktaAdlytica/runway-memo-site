"use client";
import {useEffect,useRef,useState,type FormEvent} from "react";
import {demo,money} from "@/data/demo";
import {faqs,memoRules,offers,workflow,type OfferId} from "@/data/memo-content";
import {track} from "@/lib/analytics";
import {emptyPilot,selectedOffer,validatePilot,type PilotErrors,type PilotFields} from "@/lib/pilot-form";
import {usePhaseThreeMotion} from "@/lib/usePhaseThreeMotion";
import {DemoLink} from "./DemoLink";
import {DemoEntry} from "./DemoEntry";
import {moduleSlugs} from "@/data/site-pages";
import {SiteLink} from "./SiteLink";
import {Arrow,Paper,PaperClip} from "./Paper";

function ChapterLabel({children}:{children:string}){return <div className="closing-index mono"><span>{children}</span><span>CONCEPT PREVIEW</span></div>}
function OfferCard({offer,onChoose}:{offer:typeof offers[number];onChoose:(id:OfferId)=>void}){
 const [pinned,setPinned]=useState(false);const [hovered,setHovered]=useState(false);const open=pinned||hovered;
 return <li className={`offer-item offer-item-${offer.id}`}>
  <div className="offer-clip"><PaperClip/></div>
  <button className={`offer-flip ${open?"is-open":""}`} aria-expanded={open} onPointerEnter={e=>{if(e.pointerType==="mouse")setHovered(true)}} onPointerLeave={()=>setHovered(false)} onClick={()=>{setPinned(!pinned);setHovered(false);if(!pinned)track("offer_18_selected",{offer_id:offer.id,surface:"offers"})}}>
   <span className="offer-face offer-front" aria-hidden={open}><span className="offer-number mono">0{offer.id} / {offer.label}</span><span className="offer-title">{offer.title}</span><span className="offer-question">{offer.question}</span><span className="offer-read mono">Turn the card <span aria-hidden="true">↗</span></span></span>
   <span className="offer-face offer-back" aria-hidden={!open}><span className="offer-number mono">0{offer.id} / THE PROPOSED OUTPUT</span><strong>{offer.output}</strong><span className="offer-detail">{offer.detail}</span><span className="offer-read mono">Turn back <span aria-hidden="true">↶</span></span></span>
  </button>
  <p className="offer-disclosure mono">Proposed module. Test pricing is a hypothesis, not an active checkout.</p>
  <SiteLink className="offer-choose mono" href={`/modules/${moduleSlugs[offer.id-1]}`}>Open module brief <Arrow/></SiteLink>
  <a href="#pilot-form" className="offer-choose mono" onClick={()=>onChoose(offer.id)}>Discuss this module <Arrow/></a>
 </li>
}

export function PhaseThreeScenes({motion}:{motion:boolean}){
 const [ready,setReady]=useState(false);
 const root=useRef<HTMLDivElement>(null);const priceSeen=useRef(false);const [allSteps,setAllSteps]=useState(false);
 const [fields,setFields]=useState<PilotFields>({...emptyPilot});const [errors,setErrors]=useState<PilotErrors>({});const [prepared,setPrepared]=useState(false);
 const errorSummary=useRef<HTMLDivElement>(null);const success=useRef<HTMLDivElement>(null);const submitted=useRef(false);
 usePhaseThreeMotion(root,motion,allSteps);
 useEffect(()=>setReady(true),[]);
 useEffect(()=>{
  const target=root.current?.querySelector("#pilot");if(!target)return;
  const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)&&!priceSeen.current){priceSeen.current=true;track("price_view");observer.disconnect()}},{threshold:.25});
  observer.observe(target);return()=>observer.disconnect();
 },[]);
 function change<K extends keyof PilotFields>(key:K,value:PilotFields[K]){setFields(f=>({...f,[key]:value}));setErrors(e=>({...e,[key]:undefined}))}
 function chooseOffer(id:OfferId){change("offer",String(id));setPrepared(false);track("offer_18_selected",{offer_id:id,surface:"offers"});track("pilot_request",{offer_id:id,surface:"offers"})}
 function submit(e:FormEvent<HTMLFormElement>){
  e.preventDefault();const next=validatePilot(fields);setErrors(next);
  if(Object.keys(next).length){requestAnimationFrame(()=>errorSummary.current?.focus());return}
  // One preview commitment event per mount; retain no personal deduplication key.
  if(!submitted.current){track("consent_submit",{role:fields.role as "owner"|"accountant",offer_id:selectedOffer(fields.offer),surface:"form"});submitted.current=true}
  setPrepared(true);requestAnimationFrame(()=>success.current?.focus());
 }
 const described=(name:keyof PilotFields)=>errors[name]?`${name}-error`:undefined;
 const fieldError=(name:keyof PilotFields)=>errors[name]?<span className="field-error" id={`${name}-error`}>{errors[name]}</span>:null;
 return <div ref={root} className={`phase-three ${motion?"motion-allowed":"motion-paused"}`}>
  <aside className="decision-handover" aria-label="Continue the same decision"><div><span className="mono">{demo.business.toUpperCase()} / THE SAME WEEKLY MEMO</span><p>You’ve seen the sources and the correction.<br/><strong>Now put the decision in your hands.</strong></p></div><div><DemoLink className="button">Try this decision <Arrow/></DemoLink><a href="#workflow" className="mono">First, follow the handover ↓</a></div></aside>
  <Paper id="workflow" className="closing-sheet workflow-sheet">
   <ChapterLabel>06 / THE HANDOVER</ChapterLabel>
   <div className="closing-heading"><h2>Three steps.<br/><em>Then it’s your decision.</em></h2><div><p>The memo changes hands.<br/>The authority stays human.</p><button className="text-button mono workflow-mode" aria-pressed={allSteps} onClick={()=>setAllSteps(!allSteps)}>{allSteps?"Follow the scroll sequence":"Read all steps at once"} <Arrow/></button></div></div>
   <div className={`workflow-window ${allSteps?"show-all":""}`}>
    <ol className="workflow-rail">{workflow.map((step,i)=><li className={`workflow-card ${i===workflow.length-1?"owner-step":""}`} key={step.id}><span className="workflow-number mono">{step.id}<span>{i===workflow.length-1?"AUTHORITY":"REVIEW LOOP"}</span></span><h3>{step.title}</h3><p>{step.detail}</p><span className="workflow-artifact mono">{step.artifact}<Arrow/></span></li>)}</ol>
   </div>
   <div className="sheet-end mono"><span>Source → scenario → review → decision</span><a href="#offers">Keep this decision in view <Arrow/></a></div>
  </Paper>
  <Paper id="offers" className="closing-sheet offers-sheet">
   <ChapterLabel>07 / FIVE QUESTIONS WORTH REVIEWING</ChapterLabel>
   <div className="closing-heading"><h2>Start with one<br/><em>recurring decision.</em></h2><p>This week’s supplier question is one job.<br/>These five proposed modules test<br/>other recurring decisions.</p></div>
   <ol className="offers-grid">{offers.map(offer=><OfferCard key={offer.id} offer={offer} onChoose={chooseOffer}/>)}</ol>
   <div className="sheet-end mono"><span>Each module is an independent test.</span><a href="#demo-entry">Open the working file <Arrow/></a></div>
  </Paper>
  <DemoEntry/>
  <Paper id="controls" className="closing-sheet controls-sheet">
   <ChapterLabel>09 / THE BOUNDARIES</ChapterLabel>
   <div className="closing-heading"><h2>Rules of<br/><em>this memo.</em></h2><p>A clear recommendation needs<br/>equally clear limits.</p></div>
   <ol className="memo-rules">{memoRules.map((rule,i)=><li className="memo-rule" key={rule.title}><span className="rule-index mono">0{i+1}</span><div><h3 aria-label={rule.title}>{rule.title.split(" ").map((word,j)=><span key={j} className="rule-word">{word} </span>)}</h3><p>{rule.detail}</p></div><svg className="rule-tick" width="28" height="28" viewBox="0 0 28 28" aria-hidden="true"><path d="M3 3h22v22H3zM8 14l4 4 8-9" fill="none" stroke="currentColor" strokeWidth="1.3"/></svg></li>)}</ol>
   <p className="control-footnote">Incomplete books and mistaken assumptions can change a recommendation. This concept does not replace professional judgement or resolve advisory liability.</p>
   <div className="sheet-end mono"><span>Advisory workflow / no external execution</span><a href="#pilot">Define a bounded pilot <Arrow/></a></div>
  </Paper>
  <Paper id="pilot" className="closing-sheet pilot-sheet">
   <ChapterLabel>10 / BEFORE A COMMITMENT</ChapterLabel>
   <div className="pilot-layout"><div className="pilot-copy"><h2>Discuss<br/><em>a pilot.</em></h2><p className="pilot-lead">One recurring question.<br/>Both sides of the review.</p><p>A bounded pilot, co-signed by the owner and supervising accountant, over {demo.pilot.cycles} weekly cycles.</p><a className="button" href="#pilot-form" onClick={()=>track("pilot_request",{surface:"pilot"})}>Prepare a pilot request <Arrow/></a><p className="mono pilot-small">No payment. No records to upload.</p></div>
    <div className="pilot-envelope"><div className="envelope-back" aria-hidden="true"/><article className="quote-slip"><span className="paper-grain" aria-hidden="true"/><p className="mono quote-index">PROPOSED PILOT / QUOTE FOR DISCUSSION</p><h3>A small scope.<br/>A real question.</h3><p className="quote-duration mono">{demo.pilot.cycles} WEEKLY REVIEW CYCLES</p><p className="quote-price">Hypothetical test pricing:<br/><strong>{money(demo.pilot.monthlyMin)}–{money(demo.pilot.monthlyMax)}<span>/month per business</span></strong>plus {money(demo.pilot.setup)} setup.</p><p className="quote-disclaimer">Not a market benchmark.<br/>No active offer or checkout.</p><p className="mono quote-demo">CONCEPT PREVIEW · NO COMMITMENT</p></article><div className="envelope-front" aria-hidden="true"><span className="mono">TO: OWNER + ACCOUNTANT<br/>RE: {demo.pilot.cycles} WEEKLY CYCLES</span><img src="/brand/monogram.svg" width="40" height="28" alt=""/></div></div>
   </div>
   <div className="pilot-scorecard"><h3>What earns another month?</h3><div><p><strong>A decision changed.</strong> The owner identifies an action influenced by the memo; the accountant corroborates it.</p><p><strong>The records hold up.</strong> Track reconciliation errors, omissions and accountant review minutes.</p><p><strong>Both parties renew.</strong> Seek a paid renewal after {demo.pilot.cycles} cycles. Clicks and a polished demo do not count as demand.</p></div><p className="pilot-stop">Stop or change scope if accountants must rebuild every input, or owners only want free reports.</p></div>
   <div className="sheet-end mono"><span>Test the recurring job before the bundle.</span><a href="#pilot-form">Prepare the conversation <Arrow/></a></div>
  </Paper>
  <Paper id="pilot-form" className="closing-sheet intake-sheet">
   <ChapterLabel>11 / THE REPLY SLIP</ChapterLabel>
   <div className="closing-heading"><h2>Start with<br/><em>a conversation.</em></h2><p>A request from the owner<br/>or the accountant.<br/>A pilot agreed by both.</p></div>
   <div className="intake-layout"><div className="form-column"><div className="form-preview-note"><span className="mono">FORM PREVIEW</span><p>Try the request flow with example details. Nothing is sent or saved, and this does not join a live waitlist.</p></div>
    {prepared?<div className="prepared-request" tabIndex={-1} ref={success} role="status"><span className="mono">REQUEST PREPARED / NOT SENT</span><h3>Ready for a conversation.</h3><p>Your form passes validation. In an operating pilot, the next step would be a scope discussion with the owner and accountant before any permissioned data access.</p><dl><div><dt>Role</dt><dd>{fields.role==="owner"?"Business owner":"Accountant / fractional CFO"}</dd></div><div><dt>First question</dt><dd>{offers.find(o=>String(o.id)===fields.offer)?.title??"Choose the module together"}</dd></div><div><dt>Commitment</dt><dd>None. No request has been transmitted.</dd></div></dl><div className="form-actions"><button className="button button-secondary" onClick={()=>setPrepared(false)}>Edit request</button><button className="text-button mono" onClick={()=>{setFields({...emptyPilot});setPrepared(false)}}>Clear my details</button></div></div>:<form noValidate onSubmit={submit} className="pilot-form"><noscript><p>Enable JavaScript to try the local form preview. No details are sent.</p></noscript><fieldset disabled={!ready} aria-label="Pilot request preview">
     {Object.values(errors).some(Boolean)&&<div className="form-errors" role="alert" tabIndex={-1} ref={errorSummary}><p>Please complete the marked fields.</p><ul>{Object.entries(errors).filter(([,error])=>error).map(([key,error])=><li key={key}><a href={`#pilot-${key}`}>{error}</a></li>)}</ul></div>}
     <div className="form-fields"><label htmlFor="pilot-name">Name <span>Required</span><input id="pilot-name" name="name" autoComplete="name" maxLength={100} value={fields.name} onChange={e=>change("name",e.target.value)} required aria-invalid={Boolean(errors.name)} aria-describedby={described("name")}/>{fieldError("name")}</label>
     <label htmlFor="pilot-email">Email <span>Required</span><input id="pilot-email" name="email" type="email" autoComplete="email" maxLength={254} value={fields.email} onChange={e=>change("email",e.target.value)} required aria-invalid={Boolean(errors.email)} aria-describedby={described("email")}/>{fieldError("email")}</label>
     <label htmlFor="pilot-role">Your role <span>Required</span><select id="pilot-role" name="role" value={fields.role} onChange={e=>change("role",e.target.value)} required aria-invalid={Boolean(errors.role)} aria-describedby={described("role")}><option value="">Choose your role</option><option value="owner">Business owner</option><option value="accountant">Accountant / fractional CFO</option></select>{fieldError("role")}</label>
     <label htmlFor="pilot-company">Company or firm <span>Required</span><input id="pilot-company" name="company" autoComplete="organization" maxLength={150} value={fields.company} onChange={e=>change("company",e.target.value)} required aria-invalid={Boolean(errors.company)} aria-describedby={described("company")}/>{fieldError("company")}</label>
     <label htmlFor="pilot-offer" className="form-wide">First module to discuss <span>Optional</span><select id="pilot-offer" name="offer" value={fields.offer} onChange={e=>{change("offer",e.target.value);const id=selectedOffer(e.target.value);if(id)track("offer_18_selected",{offer_id:id,surface:"form"})}} aria-invalid={Boolean(errors.offer)} aria-describedby={described("offer")}><option value="">Let’s identify the recurring job</option>{offers.map(o=><option key={o.id} value={o.id}>{o.id}. {o.title}</option>)}</select>{fieldError("offer")}</label></div>
     <div className="consent-field"><input id="pilot-consent" name="consent" type="checkbox" checked={fields.consent} onChange={e=>change("consent",e.target.checked)} required aria-invalid={Boolean(errors.consent)} aria-describedby={described("consent")}/><label htmlFor="pilot-consent">I would like email about a RunwayMemo pilot. I understand this preview does not submit my details.</label></div>{fieldError("consent")}
     <p className="form-privacy">Purpose: a pilot conversation only. No financial records, marketing list or account creation. <a href="#privacy">Privacy and deletion</a>.</p>
     <button type="submit" className="button">Preview my request <Arrow/></button><p className="mono form-footnote">Local validation only · no transmission</p>
    </fieldset></form>}
   </div><aside className="faq-column" aria-labelledby="faq-heading"><span className="mono">A FEW THINGS TO KNOW</span><h3 id="faq-heading">Before you reply.</h3><div className="faq-list">{faqs.map(faq=><details key={faq.q}><summary>{faq.q}<span aria-hidden="true">+</span></summary><p>{faq.a}</p></details>)}</div></aside></div>
   <details className="privacy-note" id="privacy"><summary>Privacy & deletion for this concept preview <span aria-hidden="true">+</span></summary><div><p>Form details remain in this page’s memory. No form endpoint, persistent browser storage or third-party analytics is connected. Reload the page or use “Clear my details” after preparing a request to remove the entered values.</p><p>Interaction events are logged locally with allowed role, module and campaign tags only. They contain no name, email, company or financial records.</p><p>Deletion contact placeholder: <a href="mailto:privacy@runwaymemo.example">privacy@runwaymemo.example</a>. This reserved example address is not monitored. A verified contact and final privacy notice are required before opening live intake.</p></div></details>
   <div className="sheet-end mono"><span>No real data is collected by this preview.</span><a href="#memo">Return to the memo <span aria-hidden="true">↑</span></a></div>
  </Paper>
 </div>
}
