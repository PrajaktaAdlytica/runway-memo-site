import type {Metadata} from "next";
import localFont from "next/font/local";
import {pageMetadata} from "@/lib/site-metadata";
import "./globals.css";
import "./chapters.css";
import "./closing.css";
import "./inner-pages.css";
import "./states.css";
const serif=localFont({src:"../fonts/SourceSerif4-latin.woff2",variable:"--font-serif",display:"swap",weight:"400 700"});
const mono=localFont({src:[{path:"../fonts/IBMPlexMono-Regular-latin.woff2",weight:"400"},{path:"../fonts/IBMPlexMono-Medium-latin.woff2",weight:"500"}],variable:"--font-mono",display:"swap"});
const pen=localFont({src:"../fonts/Caveat-latin.woff2",variable:"--font-pen",display:"swap",weight:"400"});
export const metadata:Metadata={...pageMetadata("RunwayMemo — This week’s decision, reviewed.","Explore a weekly cash decision memo reviewed by your accountant. A concept preview with synthetic data. No transfers or accounting entries.","/"),applicationName:"RunwayMemo",formatDetection:{telephone:false},icons:{icon:[{url:"/favicons/favicon.svg",type:"image/svg+xml"},{url:"/favicons/favicon.ico"}],apple:"/favicons/apple-touch-icon.png"}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" data-scroll-behavior="smooth"><head><link rel="preload" href="/paper-grain.svg" as="image" fetchPriority="high"/></head><body className={`${serif.variable} ${mono.variable} ${pen.variable}`}>{children}</body></html>}
