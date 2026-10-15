"use client";
import {useEffect,useState,type ReactNode} from "react";
import Link from "next/link";
import {safeAnalyticsProps} from "@/lib/analytics";
export function DemoLink({children,className}:{children:ReactNode;className?:string}){
 const [href,setHref]=useState("/demo");
 useEffect(()=>{const tags=safeAnalyticsProps({},window.location.search);const qs=new URLSearchParams();if(tags.utm_source)qs.set("utm_source",tags.utm_source);if(tags.utm_campaign)qs.set("utm_campaign",tags.utm_campaign);setHref(`/demo${qs.size?`?${qs}`:""}`)},[]);
 return <Link href={href} className={className}>{children}</Link>;
}
