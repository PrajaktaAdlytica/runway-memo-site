"use client";
import {SiteLink as Link} from "./SiteLink";
import {createPortal} from "react-dom";
import {usePathname} from "next/navigation";
import {useEffect,useRef,useState} from "react";
import {navigationGroups} from "@/data/site-pages";
import {Arrow} from "./Paper";
import {DemoLink} from "./DemoLink";
import {track} from "@/lib/analytics";

export function SiteNavigation(){
 const slot=useRef<HTMLDivElement>(null);const [sticky,setSticky]=useState(false);
 useEffect(()=>{let frame=0;const update=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>setSticky((slot.current?.getBoundingClientRect().top??1)<=0))};update();window.addEventListener("scroll",update,{passive:true});window.addEventListener("resize",update);return()=>{cancelAnimationFrame(frame);window.removeEventListener("scroll",update);window.removeEventListener("resize",update)}},[]);
 const menu=useRef<HTMLDetailsElement>(null);const path=usePathname();
 useEffect(()=>{if(menu.current)menu.current.open=false},[path]);
 useEffect(()=>{
  const escape=(e:KeyboardEvent)=>{if(e.key==="Escape"&&menu.current?.open){menu.current.open=false;menu.current.querySelector("summary")?.focus()}};
  const outside=(e:PointerEvent)=>{if(menu.current?.open&&!menu.current.contains(e.target as Node))menu.current.open=false};
  document.addEventListener("keydown",escape);document.addEventListener("pointerdown",outside);
  return()=>{document.removeEventListener("keydown",escape);document.removeEventListener("pointerdown",outside)};
 },[]);
 const header=<header className={`site-header site-nav ${sticky?"site-nav-fixed":""}`}><Link href="/" aria-label="RunwayMemo home"><img src="/brand/logo.svg" alt="RunwayMemo" width="230" height="34"/></Link><nav aria-label="Main navigation">
  <Link className="nav-shortcut" href="/product" aria-current={path==="/product"?"page":undefined}>Product</Link><Link className="nav-shortcut" href="/how-it-works" aria-current={path==="/how-it-works"?"page":undefined}>How it works</Link><Link className="nav-shortcut" href="/pilot" aria-current={path==="/pilot"?"page":undefined}>Pilot & pricing</Link>
  <details className="nav-directory" ref={menu}><summary>File index <span aria-hidden="true">+</span></summary><div className="nav-directory-panel" onClick={e=>{if((e.target as HTMLElement).closest("a")&&menu.current)menu.current.open=false}}><div className="directory-heading mono"><span>RUNWAYMEMO / CONTENTS</span><span>CONCEPT PREVIEW</span></div><div className="directory-columns">{navigationGroups.map(group=><div key={group.title}><h2>{group.title}</h2>{group.links.map(link=><Link key={link.href} href={link.href} aria-current={path===link.href?"page":undefined}>{link.label}<span aria-hidden="true">↗</span></Link>)}</div>)}</div><p className="mono directory-note">A working concept. No transfers or accounting entries.</p></div></details>
  <Link className="nav-signin" href="/sign-in" aria-current={path==="/sign-in"?"page":undefined}>Sign in</Link><DemoLink className="nav-demo">Explore demo</DemoLink><Link className="nav-pilot" href="/contact" onClick={()=>track("pilot_request",{surface:"navigation"})}>Discuss a pilot <Arrow/></Link>
 </nav></header>;
 return <div className="site-nav-slot" ref={slot}>{sticky?createPortal(header,document.body):header}</div>;
}
export function SiteDirectoryFooter(){const path=usePathname();return <div className="directory-footer">{navigationGroups.map(group=><div key={group.title}><h3>{group.title}</h3><ul>{group.links.map(link=><li key={link.href}><Link href={link.href} aria-current={path===link.href?"page":undefined}>{link.label}</Link></li>)}</ul></div>)}</div>}
