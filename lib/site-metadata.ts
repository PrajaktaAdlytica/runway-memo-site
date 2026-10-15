import type {Metadata} from "next";

// No unverified custom domain: Vercel injects its deployment URL; other hosts set SITE_URL.
export const siteUrl = new URL(process.env.SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3018"));
const shareImage = {url:"/og.png",width:1200,height:630,alt:"RunwayMemo printed memo: this week’s decision, reviewed before you act. Concept preview with synthetic data."};

export function pageMetadata(title:string,description:string,path:string):Metadata {
 return {
  title,description,metadataBase:siteUrl,
  alternates:{canonical:path},
  openGraph:{title,description,url:path,siteName:"RunwayMemo",type:"website",locale:"en_US",images:[shareImage]},
  twitter:{card:"summary_large_image",title,description,images:[shareImage]},
 };
}
