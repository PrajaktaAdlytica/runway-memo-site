import type {Metadata} from "next";
import {DemoWorkbench} from "@/components/DemoWorkbench";
import {pageMetadata} from "@/lib/site-metadata";
import "./workbench.css";
export const metadata:Metadata=pageMetadata("RunwayMemo demo — A fictional weekly decision","An isolated synthetic cash-timing memo. Inspect sources, amend assumptions and follow accountant and owner review. No transfers or accounting entries.","/demo");
export default function DemoPage(){return <DemoWorkbench/>}
