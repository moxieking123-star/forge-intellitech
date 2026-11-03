import {writeFileSync} from 'node:fs';
const base=process.env.TEST_BASE_URL||'http://localhost:3013';
const sitemap=await (await fetch(base+'/sitemap.xml')).text();
const paths=[...new Set([...sitemap.matchAll(/<loc>https:\/\/(?:www\.)?forgeintellitech.com([^<]*)<\/loc>/g)].map(m=>m[1]||'/'))];
const assets=new Set(['/favicon.ico','/icon.png','/icon-512.png','/apple-icon.png','/manifest.json']),external=new Set();
for(let i=0;i<paths.length;i+=4)await Promise.all(paths.slice(i,i+4).map(async path=>{
 const html=await (await fetch(base+path)).text();
 for(const match of html.matchAll(/<img\b[^>]*?\bsrc="([^"]+)"/g)){
  const raw=match[1].replaceAll('&amp;','&');const url=new URL(raw,base);
  const original=url.pathname==='/_next/image'?url.searchParams.get('url'):url.pathname;
  if(original?.startsWith('/'))assets.add(original);
 }
 for(const match of html.matchAll(/<a\b[^>]*?\bhref="(https?:[^"<>]+)"/g))if(!new URL(match[1]).hostname.endsWith('forgeintellitech.com'))external.add(match[1].replaceAll('&amp;','&'));
}));
const broken=[];
for(let i=0;i<[...assets].length;i+=4)await Promise.all([...assets].slice(i,i+4).map(async path=>{const r=await fetch(base+path,{signal:AbortSignal.timeout(20000)});if(!r.ok)broken.push({path,status:r.status});await r.body?.cancel();}));
const externalResults=[];
for(let i=0;i<[...external].length;i+=4)await Promise.all([...external].slice(i,i+4).map(async url=>{try{const r=await fetch(url,{method:'HEAD',signal:AbortSignal.timeout(15000)});externalResults.push({url,status:r.status,manualCheckRequired:[401,403,405,429,999].includes(r.status)});await r.body?.cancel();}catch{externalResults.push({url,manualCheckRequired:true,reason:'Remote service did not permit this automated check'});}}));
const result={pages:paths.length,assets:assets.size,broken,externalResults};writeFileSync('docs/redesign/final-review/asset-link-results.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));if(broken.length)process.exitCode=1;
