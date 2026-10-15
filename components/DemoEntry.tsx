import {demo,fridayCash,money} from "@/data/demo";
import {Paper,Arrow} from "./Paper";
import {DemoLink} from "./DemoLink";
export function DemoEntry(){return <Paper id="demo-entry" className="closing-sheet demo-entry-sheet">
 <div className="closing-index mono"><span>08 / OPEN THE WORKING FILE</span><span>CONCEPT PREVIEW</span></div>
 <div className="demo-entry-layout"><div><h2>The same memo.<br/><em>Your turn to inspect it.</em></h2><p>Start with the supplier bill you just followed. Open its source, compare the alternatives and try an accountant correction.</p><DemoLink className="button">Continue with fictional data <Arrow/></DemoLink><p className="mono entry-footnote">No login. No uploads. No external actions.</p></div>
 <div className="demo-folder"><div className="folder-label mono">{demo.business.toUpperCase()} / WEEKLY MEMO</div><div className="folder-paper"><span className="mono">{demo.business} · {demo.today}</span><h3>Pay now,<br/>or after the receipt?</h3><div className="folder-balances">{(["A","B"] as const).map(s=><div key={s}><span className="mono">SCENARIO {s} / FRIDAY</span><strong>{money(fridayCash(s))}</strong></div>)}</div><p>Sources, timing assumptions<br/>and an accountant amendment trail.</p></div><div className="folder-cover"><span className="mono">DEMO · SYNTHETIC DATA</span><img src="/brand/monogram.svg" width="44" height="31" alt=""/></div></div></div>
 <div className="sheet-end mono"><span>Illustrative records. Reviewable decisions.</span><a href="#controls">Read the boundaries <Arrow/></a></div>
 </Paper>}
