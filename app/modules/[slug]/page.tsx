import {notFound} from "next/navigation";
import {modulePages} from "@/data/site-pages";
import {pageMetadata} from "@/lib/site-metadata";
import {MemoPage} from "@/components/MemoPage";
export const dynamicParams=false;
export function generateStaticParams(){return modulePages.map(page=>({slug:page.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const page=modulePages.find(p=>p.slug===slug);if(!page)return {};return pageMetadata(`${page.title} — RunwayMemo`,page.intro,`/modules/${slug}`)}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const page=modulePages.find(p=>p.slug===slug);if(!page)notFound();return <MemoPage key={page.slug} page={page}/>}
