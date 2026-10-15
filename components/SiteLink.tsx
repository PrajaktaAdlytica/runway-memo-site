"use client";
import NextLink from "next/link";
import {usePathname} from "next/navigation";
import {useEffect,useState,type ComponentProps} from "react";
import {safeAnalyticsProps} from "@/lib/analytics";
/** Preserve only approved campaign tags, never arbitrary source query fields. */
export function SiteLink({href,...props}:Omit<ComponentProps<typeof NextLink>,"href">&{href:string}){
 const path=usePathname();const [destination,setDestination]=useState(href);
 useEffect(()=>{if(!href.startsWith("/")||href.startsWith("//")){setDestination(href);return}const target=new URL(href,location.origin);const tags=safeAnalyticsProps({},location.search);if(tags.utm_source)target.searchParams.set("utm_source",tags.utm_source);if(tags.utm_campaign)target.searchParams.set("utm_campaign",tags.utm_campaign);setDestination(target.pathname+target.search+target.hash)},[href,path]);
 return <NextLink href={destination} {...props}/>;
}
