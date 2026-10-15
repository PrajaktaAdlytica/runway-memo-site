import type {gsap as GSAP} from "gsap";

/** Reversible, individually triggered reveals. Call inside a GSAP matchMedia context. */
export function scrollReveals(gsap:typeof GSAP,root:Element,selector:string,mobile=false){
 const elements=Array.from(root.querySelectorAll<HTMLElement>(selector));
 elements.forEach((element,index)=>{
  const distance=mobile?12:32;
  gsap.fromTo(element,{x:index%2?distance:-distance,opacity:.75},{
   x:0,opacity:1,ease:"none",immediateRender:false,
   scrollTrigger:{trigger:element,start:"top 96%",end:`top ${mobile?78:70}%`,scrub:true,invalidateOnRefresh:true},
  });
 });
}
