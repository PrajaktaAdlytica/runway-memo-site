import {fileURLToPath} from "node:url";
export default {
 extends:"lighthouse:default",
 artifacts:[{id:"MemoMotion",gatherer:fileURLToPath(new URL("./lighthouse-motion-gatherer.mjs",import.meta.url))}],
 audits:[fileURLToPath(new URL("./lighthouse-motion-audit.mjs",import.meta.url))],
 categories:{"memo-motion":{title:"RunwayMemo reduced motion",auditRefs:[{id:"memo-reduced-motion",weight:1}]}},
 settings:{onlyCategories:["accessibility","memo-motion"]},
};
