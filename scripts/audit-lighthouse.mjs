import {execFileSync} from "node:child_process";
import {readFileSync,mkdirSync,writeFileSync} from "node:fs";

const origin=process.env.AUDIT_URL||"http://127.0.0.1:3019";
mkdirSync("qa",{recursive:true});
const runs=[
 {name:"home-mobile",path:"/",flags:[]},
 {name:"demo-mobile",path:"/demo",flags:[]},
 {name:"home-desktop",path:"/",flags:["--preset=desktop"]},
 {name:"demo-desktop",path:"/demo",flags:["--preset=desktop"]},
 {name:"reduced-desktop",path:"/",flags:["--config-path=scripts/lighthouse-reduced.config.mjs","--preset=desktop","--screenEmulation.width=1440","--screenEmulation.height=900"],reduced:true},
 {name:"reduced-mobile",path:"/",flags:["--config-path=scripts/lighthouse-reduced.config.mjs","--screenEmulation.width=390","--screenEmulation.height=844"],reduced:true},
];
const summary=[];
for(const run of runs){
 const output=`qa/lighthouse-${run.name}`;
 execFileSync(process.execPath,["node_modules/lighthouse/cli/index.js",origin+run.path,"--quiet",`--chrome-flags=--headless${run.reduced?" --force-prefers-reduced-motion":""}`,"--output=json","--output=html",`--output-path=${output}`,...run.flags],{stdio:"inherit",env:process.env});
 const report=JSON.parse(readFileSync(`${output}.report.json`,"utf8"));
 const result={name:run.name,url:report.finalDisplayedUrl,date:report.fetchTime,lighthouse:report.lighthouseVersion,scores:Object.fromEntries(Object.entries(report.categories).map(([name,category])=>[name,Math.round(category.score*100)])),metrics:Object.fromEntries(["first-contentful-paint","largest-contentful-paint","total-blocking-time","cumulative-layout-shift"].filter(id=>report.audits[id]).map(id=>[id,report.audits[id].displayValue])),motion:report.audits["memo-reduced-motion"]?.displayValue,warnings:report.runWarnings};
 summary.push(result);console.log(JSON.stringify(result));
 writeFileSync("qa/lighthouse-summary.json",JSON.stringify(summary,null,2)+"\n");
}
