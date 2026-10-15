"use client";

import {useEffect, useId, useRef, useState} from "react";
import {demo, dateLabel, evidence, fridayCash, money, receiptRange, shortDate, type Scenario} from "@/data/demo";
import {track} from "@/lib/analytics";
import {usePhaseTwoMotion} from "@/lib/usePhaseTwoMotion";
import {Paper, Arrow} from "./Paper";

function CashFigure({scenario}:{scenario:Scenario}) {
  const value=money(fridayCash(scenario));
  return <strong className="cash-figure">
    <span className="sr-only">{value}</span>
    <span className="cash-digits" aria-hidden="true">{Array.from(value).map((digit,index)=>/\d/.test(digit)
      ? <span className="cash-digit" key={index}><span className="cash-reel">{[0,(Number(digit)+9)%10,Number(digit)].map((n,i)=><span key={i}>{n}</span>)}</span></span>
      : <span key={index}>{digit}</span>)}</span>
  </strong>;
}

function HandwrittenCorrection() {
  const maskId=`note-${useId().replace(/:/g,"")}`;
  return <div className="correction-handwriting">
    <p className="sr-only">{demo.review.correctionLines.join(" ")} — {demo.review.role}</p>
    <svg viewBox="0 0 560 200" aria-hidden="true">
      <defs><mask id={maskId}><path className="pen-reveal-path" d="M8 44H550M8 104H500M120 164H550" fill="none" stroke="white" strokeWidth="66" pathLength="1" strokeDasharray="1" strokeDashoffset="0"/></mask></defs>
      <g mask={`url(#${maskId})`} fill="currentColor" fontFamily="var(--font-pen)" fontSize="43">
        <text x="12" y="59">{demo.review.correctionLines[0]}</text>
        <text x="12" y="119">{demo.review.correctionLines[1]}</text>
        <text x="205" y="179" fontSize="35">— {demo.review.role}</text>
      </g>
    </svg>
  </div>;
}

export function PhaseTwoScenes({motion}:{motion:boolean}) {
  const root=useRef<HTMLDivElement>(null);
  const [activeSource,setActiveSource]=useState(0);
  const [delayed,setDelayed]=useState(false);
  const viewed=useRef(false);
  usePhaseTwoMotion(root,motion,setActiveSource);

  useEffect(()=>{
    const section=root.current?.querySelector("#evidence");
    if(!section)return;
    const observer=new IntersectionObserver(entries=>{
      if(entries.some(entry=>entry.isIntersecting)&&!viewed.current){viewed.current=true;track("evidence_view");observer.disconnect()}
    },{threshold:.3});
    observer.observe(section);
    return()=>observer.disconnect();
  },[]);

  return <div ref={root} className="phase-two" data-motion={motion?"enabled":"paused"}>
    <div className="chapter-wrap" id="evidence">
      <Paper className="phase-sheet evidence-sheet">
        <div className="chapter-top mono"><span>03 / FOLLOW THE FIGURE</span><span>DEMO · SYNTHETIC DATA</span></div>
        <div className="chapter-heading"><h2>Every number<br/><em>has a source.</em></h2><p>A figure is the beginning. <br/>The evidence makes it reviewable.</p></div>
        <div className="evidence-layout">
          <div className="evidence-ledger">
            <div className="ledger-heading mono"><span>THIS WEEK’S MEMO</span><span>{demo.currency}</span></div>
            <div className="evidence-lines" role="group" aria-label="Choose a source to inspect">{evidence.map((record,index)=><button key={record.id} className={`evidence-line ${activeSource===index?"is-active":""}`} aria-pressed={activeSource===index} aria-controls={`evidence-${record.id}`} onClick={()=>setActiveSource(index)}>
              <span className="highlighter-stripe" aria-hidden="true"/>
              <span className="evidence-line-copy"><span>{record.label}</span><small>{record.id}</small></span><strong>{money(record.amount)}</strong><Arrow/>
            </button>)}</div>
            <p className="evidence-instruction mono">Scroll through the sources, or select any line.</p>
            <p className="ledger-footnote">The expected receipt is an assumption.<br/>It is not Friday cash.</p>
          </div>
          <div className="evidence-stack">{evidence.map((record,index)=><article key={record.id} id={`evidence-${record.id}`} className={`evidence-document ${activeSource===index?"is-active":""}`} aria-hidden={activeSource!==index}>
            <div className="paper-grain" aria-hidden="true"/>
            <div className="document-top mono"><span>{record.kind}</span><span>{record.id}</span></div>
            <h3>{demo.business}</h3>
            <p className="document-detail">{record.detail}</p><strong className="document-amount">{money(record.amount)}</strong>
            <dl className="document-provenance mono"><div><dt>{record.dateLabel}</dt><dd>{dateLabel(record.date)}</dd></div><div><dt>Source</dt><dd>{record.source} · row {record.row}</dd></div></dl>
            {record.id===demo.receivable.id?<p className="document-pen-note">Expected {dateLabel(demo.receivable.expected,true)}.<br/><span>Not guaranteed.</span></p>:<p className="document-note">{record.note}</p>}
            <div className="document-bottom mono">ILLUSTRATIVE SOURCE / NO LIVE CONNECTION</div>
          </article>)}</div>
        </div>
        <div className="sheet-end mono"><span>{dateLabel(demo.today)} · {demo.business}</span><a href="#scenarios">Compare the timing <Arrow/></a></div>
      </Paper>
    </div>

    <div className="chapter-wrap" id="scenarios">
      <Paper className="phase-sheet scenario-sheet">
        <div className="chapter-top mono"><span>04 / A QUESTION OF TIMING</span><span>DEMO · SYNTHETIC DATA</span></div>
        <div className="chapter-heading"><h2>Two ways to<br/><em>run the week.</em></h2><p>Same facts. Different timing. <br/>A clearer conversation.</p></div>
        <div className="scenario-comparison">{(["A","B"] as const).map(scenario=><article key={scenario} className={`scenario-column scenario-${scenario}`}>
          <div className="scenario-label mono">SCENARIO {scenario}</div><h3>{scenario==="A"?"Pay supplier before payroll":"Hold supplier payment"}</h3>
          <dl className="scenario-math"><div><dt>Opening cash</dt><dd>{money(demo.openingCash)}</dd></div><div><dt>Payroll <span>{demo.payroll.id}</span></dt><dd>− {money(demo.payroll.amount)}</dd></div><div><dt>Supplier <span>{demo.supplier.id}</span></dt><dd>{scenario==="A"?`− ${money(demo.supplier.amount)}`:"Held · unpaid"}</dd></div></dl>
          <div className="friday-total"><span className="mono">FRIDAY CASH · {shortDate(demo.payroll.due)}</span><CashFigure scenario={scenario}/></div>
        </article>)}</div>
        <div className="week-strip"><div className="week-dates mono"><span>{dateLabel(demo.payroll.due,true)}<small>Payroll due</small></span><span>{dateLabel(demo.receivable.expected,true)}<small>Receipt expected</small></span></div><div className="date-track"><span className="date-marker" aria-hidden="true"/></div><p className="receipt-arrival mono">{demo.receivable.id} · {money(demo.receivable.amount)} expected after Friday. Not guaranteed.</p></div>
        <div className="receipt-assumptions"><label className="delay-control"><input type="checkbox" checked={delayed} onChange={event=>setDelayed(event.target.checked)}/><span className="switch-track" aria-hidden="true"><span/></span><span className="mono">{demo.receivable.id} delayed</span></label><div className="receipt-analysis" aria-live="polite">{delayed?<>
          <div className="scenario-ranges">{(["A","B"] as const).map(scenario=>{const range=receiptRange(scenario);return <div className="range-row mono" key={scenario}><span>{scenario}</span><span>{money(range.min)}</span><span className="uncertainty-band" aria-hidden="true"/><span>{money(range.max)}</span></div>})}</div>
          <p>Illustrative scenario range, not a probability.</p><p>Tuesday: receipt absent → received. B’s supplier remains unpaid.</p>
        </>:<><p>Neither Friday balance includes the later receivable.</p><p>A timing illustration, with no other movements assumed. Review the source records before deciding.</p></>}</div></div>
        <div className="sheet-end mono"><span>No transfers or accounting entries.</span><a href="#review">Ask for an independent check <Arrow/></a></div>
      </Paper>
    </div>

    <div className="chapter-wrap" id="review">
      <Paper className="phase-sheet review-sheet">
        <div className="chapter-top mono"><span>05 / ANOTHER PAIR OF EYES</span><span>DEMO · SYNTHETIC DATA</span></div>
        <div className="review-layout"><div className="review-copy"><h2>An independent <br/>check, <em>before <br/>you decide.</em></h2><p>Your accountant reads the sources, questions the assumptions and leaves a correction you can trace.</p><div className="review-state"><span className="neutral-status">{demo.review.status}</span><p className="mono">A correction is not an approval.</p></div></div>
          <div className="review-document-stack"><div className="review-underlay" aria-hidden="true"><span className="mono">WORKING MEMO / {dateLabel(demo.today)}</span></div><article className="review-overlay">
            <div className="paper-grain" aria-hidden="true"/><div className="review-document-header mono"><span>ACCOUNTANT’S AMENDMENT</span><span>{demo.receivable.id}</span></div><div className="review-stamp">FOR REVIEW</div>
            <div className="amendment-original"><span className="mono">DRAFT ASSUMPTION</span><p><span>{demo.receivable.id} expected {shortDate(demo.review.incorrectExpected)}<svg viewBox="0 0 400 25" preserveAspectRatio="none" aria-hidden="true"><path className="correction-strike" d="M2 17L398 5" pathLength="1" strokeDasharray="1" strokeDashoffset="0"/></svg></span></p></div>
            <p className="amended-date mono">Expected {dateLabel(demo.receivable.expected,true)} · still unconfirmed</p><HandwrittenCorrection/>
            <div className="amendment-trail"><span className="mono">CORRECTION HISTORY · {dateLabel(demo.today)}</span><ol><li><time>{demo.review.draftedAt}</time><span>Receipt assumption drafted.</span></li><li><time>{demo.review.correctedAt}</time><span>{demo.review.role}: expected date corrected; uncertainty retained.</span></li></ol></div>
            <div className="review-document-footer mono">ILLUSTRATIVE CORRECTION / OWNER DECISION PENDING</div>
          </article></div>
        </div>
        <div className="sheet-end mono"><span>Reviewable figures. Human authority.</span><a href="#workflow">Continue <Arrow/></a></div>
      </Paper>
    </div>
  </div>;
}
