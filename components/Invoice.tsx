import {demo,money,dateLabel} from "@/data/demo";
import {PaperClip} from "./Paper";
export function Invoice({compact=false}:{compact?:boolean}) {return <article className={`invoice ${compact?"compact":""}`} aria-label={`Fictional invoice ${demo.receivable.id}`}>
  <div className="paper-grain" aria-hidden="true"/>{!compact&&<PaperClip/>}<div className="invoice-heading"><span className="mono">SOURCE DOCUMENT</span><span className="mono">01 / AR</span></div>
  <h2>{demo.business}</h2><div className="invoice-rule"/><p className="invoice-id mono">Invoice {demo.receivable.id}</p><dl className="invoice-parties mono"><div><dt>From</dt><dd>{demo.business}</dd></div><div><dt>Billed to</dt><dd>{demo.customer}</dd></div><div><dt>Expected</dt><dd>{dateLabel(demo.receivable.expected)}</dd></div></dl>
  <div className="invoice-line mono"><span>Services receivable</span><strong>{money(demo.receivable.amount)}</strong></div><div className="invoice-total mono"><span>Amount due</span><strong>{money(demo.receivable.amount)}</strong></div>
  <p className="handwriting">Expected {dateLabel(demo.receivable.expected,true)}.<br/><span>Not guaranteed.</span></p><p className="invoice-disclosure mono">DEMO · SYNTHETIC DATA</p>
 </article>}
