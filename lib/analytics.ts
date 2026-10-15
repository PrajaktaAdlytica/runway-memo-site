export type AnalyticsEvent = "landing_view"|"buyer_qualified"|"evidence_view"|"offer_18_selected"|"demo_open"|"override_view"|"price_view"|"pilot_request"|"consent_submit";
export type AnalyticsProps={role?:"owner"|"accountant";offer_id?:1|2|3|4|5;surface?:"hero"|"navigation"|"memo-preview"|"offers"|"pilot"|"form"|"workbench"};
function campaign(value:string|null) { return value && /^[a-zA-Z0-9_-]{1,64}$/.test(value)?value:undefined; }
/** Runtime allowlist: never forward email, names, free text or financial records. */
export function safeAnalyticsProps(props:AnalyticsProps,search:string) {
 const safe:AnalyticsProps={};
 if(props.role==="owner"||props.role==="accountant")safe.role=props.role;
 if([1,2,3,4,5].includes(props.offer_id??0))safe.offer_id=props.offer_id;
 if(["hero","navigation","memo-preview","offers","pilot","form","workbench"].includes(props.surface??""))safe.surface=props.surface;
 const qs=new URLSearchParams(search);
 return {...safe,utm_source:campaign(qs.get("utm_source")),utm_campaign:campaign(qs.get("utm_campaign"))};
}
/** Console-only stub. Form fields are never passed to this function. */
export function track(event:AnalyticsEvent,props:AnalyticsProps={}) {
 if(typeof window==="undefined")return;
 console.info("[RunwayMemo analytics]",event,safeAnalyticsProps(props,window.location.search));
}
