import {createServer} from "node:http";
import {readFile,stat} from "node:fs/promises";
import {resolve,extname,sep} from "node:path";
import {gzipSync} from "node:zlib";

// Local preview of the actual export, including /demo -> /demo.html.
const root=resolve("out");
const port=Number(process.env.PORT||3019);
const types={".html":"text/html; charset=utf-8",".js":"text/javascript; charset=utf-8",".css":"text/css; charset=utf-8",".json":"application/json",".txt":"text/plain; charset=utf-8",".svg":"image/svg+xml",".png":"image/png",".ico":"image/x-icon",".woff2":"font/woff2",".ttf":"font/ttf"};
await stat(root);
createServer(async(req,res)=>{
 try{
  if(!["GET","HEAD"].includes(req.method)){res.writeHead(405);res.end();return}
  const pathname=decodeURIComponent(new URL(req.url,"http://localhost").pathname);
  const requested=resolve(root,`.${pathname}`);
  if(requested!==root&&!requested.startsWith(root+sep)){res.writeHead(403);res.end();return}
  let file;
  for(const candidate of [requested,requested+".html",resolve(requested,"index.html")]){
   try{if((await stat(candidate)).isFile()){file=candidate;break}}catch{}
  }
  const status=file?200:404;
  file||=resolve(root,"404.html");
  let body=await readFile(file);
  const headers={"Content-Type":types[extname(file)]||"application/octet-stream","Cache-Control":file.includes(`${sep}_next${sep}static${sep}`)?"public, max-age=31536000, immutable":"no-cache","X-Content-Type-Options":"nosniff","Vary":"Accept-Encoding"};
  if(/\bgzip\b/.test(req.headers["accept-encoding"]||"")&&/\.(html|js|css|json|txt|svg)$/.test(file)){body=gzipSync(body);headers["Content-Encoding"]="gzip"}
  headers["Content-Length"]=body.byteLength;
  res.writeHead(status,headers);res.end(req.method==="HEAD"?undefined:body);
 }catch{res.writeHead(400);res.end("Invalid request")}
}).listen(port,"127.0.0.1",()=>console.log(`Static RunwayMemo preview: http://127.0.0.1:${port}`));
