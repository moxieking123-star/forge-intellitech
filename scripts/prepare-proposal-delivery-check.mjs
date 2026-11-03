import {readFileSync,writeFileSync} from 'node:fs';
import {randomBytes,randomUUID,createHash} from 'node:crypto';
if(process.env.FORGE_ALLOW_PROPOSAL_EMAIL_TEST!=='true')throw Error('A new real-email test requires explicit operator authorization.');
const nonce=randomBytes(32).toString('hex'),runId=randomUUID(),expires=Date.now()+15*60*1000;
const tokenHash=createHash('sha256').update(nonce).digest('hex');
const proposalHash=createHash('sha256').update(readFileSync('private-assets/forge-school-proposal-2026-10-22-v1.pdf')).digest('hex');
writeFileSync('private-assets/proposal-delivery-check-auth.json',JSON.stringify({nonce,runId,expires}));
const source=`// Temporary, expiring, fixed-recipient delivery check. Retire immediately after use.
import {proposalEmail} from './school-proposal.ts';
import {boundedBody} from './agreement.ts';
const verifier=${JSON.stringify(tokenHash)},expires=${expires},runId=${JSON.stringify(runId)},expectedHash=${JSON.stringify(proposalHash)};
const sha=async(bytes)=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes)),n=>n.toString(16).padStart(2,'0')).join('');
Deno.serve(async(request)=>{
 const reply=(data,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'private, no-store'}});
 if(request.method!=='POST'||Date.now()>expires)return reply({error:'Test unavailable.'},410);
 const proof=request.headers.get('x-forge-test-proof')||'';
 if(!/^[a-f0-9]{64}$/.test(proof)||await sha(new TextEncoder().encode(proof))!==verifier)return reply({error:'Unauthorized.'},401);
 const env=Deno.env.toObject(),key=env.RESEND_API_KEY?.trim(),from=env.FROM_EMAIL?.trim(),bucket=env.SCHOOL_PROPOSAL_BUCKET?.trim();
 const configuration={apiKey:!!key,sender:!!from&&/^[^\\s<>@]+@auth\\.forgeintellitech\\.com$/.test(from),bucket:bucket==='forge-school-proposals',regularDeliveryDisabled:env.EMAIL_DELIVERY_ENABLED==='false',workerSecretReady:(env.NOTIFICATION_WORKER_SECRET||'').length>=32};
 if(!configuration.apiKey||!configuration.sender||!configuration.bucket||!configuration.regularDeliveryDisabled)return reply({error:'Check saved configuration.',configuration},409);
 try{
 const headers={apikey:env.SUPABASE_SERVICE_ROLE_KEY,Authorization:'Bearer '+env.SUPABASE_SERVICE_ROLE_KEY};
 const file=await fetch(env.SUPABASE_URL+'/storage/v1/object/authenticated/forge-school-proposals/forge-school-proposal-2026-10-22-v1.pdf',{headers,signal:AbortSignal.timeout(20000)});
 if(!file.ok)return reply({error:'Proposal unavailable.',storageStatus:file.status},503);
 const bytes=await boundedBody(file,8000000),hash=await sha(bytes);
 if(hash!==expectedHash)return reply({error:'Uploaded proposal does not match the reviewed local document.'},409);
 let binary='';for(let i=0;i<bytes.length;i+=8192)binary+=String.fromCharCode(...bytes.subarray(i,i+8192));
 const content=proposalEmail({name:'Forge team',school:'Forge internal delivery check',email:'programs@forgeintellitech.com'});
 const sent=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:'Bearer '+key,'Content-Type':'application/json','Idempotency-Key':'forge-proposal-setup-'+runId},body:JSON.stringify({from:'Forge <'+from+'>',to:['programs@forgeintellitech.com'],reply_to:'programs@forgeintellitech.com',...content,subject:'[TEST] '+content.subject,attachments:[{filename:'Forge-school-programme-proposal.pdf',content:btoa(binary)}]}),signal:AbortSignal.timeout(25000)});
 const data=await sent.json();
 if(!sent.ok)return reply({error:'Resend rejected the test.',providerStatus:sent.status,errorName:typeof data.name==='string'?data.name:'unknown',configuration},502);
 if(typeof data.id!=='string')return reply({error:'Provider result was not confirmed.'},503);
 return reply({accepted:true,providerId:data.id,recipient:'programs@forgeintellitech.com',attachmentBytes:bytes.length,attachmentHash:hash,configuration});
 }catch{return reply({error:'Test result not confirmed; retry only the identical test receipt.'},503);}
});`;
writeFileSync('private-assets/proposal-delivery-check-bundle.json',JSON.stringify([{name:'index.ts',content:source},{name:'school-proposal.ts',content:readFileSync('lib/school-proposal.ts','utf8')},{name:'agreement.ts',content:readFileSync('lib/referrals/agreement.ts','utf8')}]));
console.log('Expiring test prepared; fixed recipient, private attachment checksum, stable provider idempotency. No secrets printed.');
