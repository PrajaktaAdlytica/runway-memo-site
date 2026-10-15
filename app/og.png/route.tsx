import {ImageResponse} from "next/og";
import {readFile} from "node:fs/promises";
import {join} from "node:path";

export const dynamic="force-static";

export async function GET(){
 const [serif,mono,mark]=await Promise.all([
  readFile(join(process.cwd(),"fonts/SourceSerif4-OG.ttf")),
  readFile(join(process.cwd(),"fonts/IBMPlexMono-Regular.ttf")),
  readFile(join(process.cwd(),"public/brand/monogram.svg")),
 ]);
 return new ImageResponse(
  <div style={{display:"flex",width:"100%",height:"100%",background:"#D9D5CC",color:"#2A3B5C",padding:40,fontFamily:"MemoSerif"}}>
   <div style={{display:"flex",position:"absolute",inset:47,background:"#E7E0D0",transform:"rotate(1deg)",boxShadow:"0 12px 30px #302b2120"}}/>
   <div style={{display:"flex",flexDirection:"column",width:"100%",background:"#F3EEE3",padding:"32px 46px",transform:"rotate(-0.5deg)",boxShadow:"0 5px 20px #302b2118"}}>
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"1px solid #B8B5AC",paddingBottom:20}}>
     <div style={{display:"flex",alignItems:"center",gap:15}}><img src={`data:image/svg+xml;base64,${mark.toString("base64")}`} width={66} height={44} alt=""/><span style={{fontSize:33,letterSpacing:-1}}>RunwayMemo</span></div>
     <span style={{fontFamily:"MemoMono",fontSize:12,letterSpacing:2}}>A WORKING DOCUMENT</span>
    </div>
    <div style={{display:"flex",marginTop:30,fontFamily:"MemoMono",fontSize:13,letterSpacing:1}}>SUBJECT / THIS WEEK’S DECISION</div>
    <div style={{display:"flex",fontSize:74,lineHeight:1.06,letterSpacing:-2.5,maxWidth:870,marginTop:22}}>A weekly cash decision memo reviewed by your accountant.</div>
    <div style={{display:"flex",fontSize:24,marginTop:24}}>See the sources. Compare the timing. Review the decision.</div>
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",borderTop:"1px solid #B8B5AC",marginTop:"auto",paddingTop:20,fontFamily:"MemoMono",fontSize:11}}>
     <span>CONCEPT PREVIEW · SYNTHETIC DATA</span><span>No transfers or accounting entries.</span>
    </div>
   </div>
  </div>,
  {width:1200,height:630,fonts:[{name:"MemoSerif",data:serif,weight:400,style:"normal"},{name:"MemoMono",data:mono,weight:400,style:"normal"}]},
 );
}
