import {notFound} from "next/navigation";
import {sitePages} from "@/data/site-pages";
import {pageMetadata} from "@/lib/site-metadata";
import {MemoPage} from "@/components/MemoPage";
export const dynamicParams=false;
export function generateStaticParams(){return sitePages.map(page=>({page:page.slug}))}
export async function generateMetadata({params}:{params:Promise<{page:string}>}){const {page:slug}=await params;const page=sitePages.find(p=>p.slug===slug);if(!page)return {};return pageMetadata(`${page.title} — RunwayMemo`,page.intro,`/${slug}`)}
export default async function Page({params}:{params:Promise<{page:string}>}){const {page:slug}=await params;const page=sitePages.find(p=>p.slug===slug);if(!page)notFound();return <MemoPage key={page.slug} page={page}/>}
