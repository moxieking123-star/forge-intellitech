// Owner approved these three templates on 4 November 2026. Default is a dry run.
import fs from 'node:fs';
import {laptopReply} from '../lib/laptop-replies.ts';
const config={};
for(const file of ['.env.local','private-assets/laptop-audit/production.env']){
 if(!fs.existsSync(file))continue;
 for(const line of fs.readFileSync(file,'utf8').split(/\r?\n/)){
  const match=line.match(/^([A-Z][A-Z0-9_]*)=(.*)$/);if(match)config[match[1]]=match[2].trim().replace(/^(['"])(.*)\1$/,'$2').replace(/\\n$/,'');
 }
}
const audit=JSON.parse(fs.readFileSync('private-assets/laptop-audit/reconciled.json','utf8'));
const send=process.argv.includes('--send-approved');
if(!send){console.log(JSON.stringify({dryRun:true,recipients:audit.records.length,requests:audit.publicCounts.requests,donors:audit.publicCounts.donorOffers}));process.exit(0);}
if(!config.SUPABASE_SERVICE_ROLE_KEY||!config.RESEND_API_KEY)throw Error('Secure database and sending credentials are required.');
const base='https://deblssilgleuiccsgdcy.supabase.co';
const headers={apikey:config.SUPABASE_SERVICE_ROLE_KEY,Authorization:`Bearer ${config.SUPABASE_SERVICE_ROLE_KEY}`,'Content-Type':'application/json'};
async function rpc(name,args){let r;try{r=await fetch(`${base}/rest/v1/rpc/${name}`,{method:'POST',headers,body:JSON.stringify(args),signal:AbortSignal.timeout(45000)});}catch{throw Error(`Queue operation ${name} timed out. Existing receipt keys must be reused.`);}if(!r.ok)throw Error(`Queue operation ${name} returned HTTP ${r.status}.`);return r.json();}
// Atomic queue keys ensure repeated runs do not resend accepted acknowledgments.
for(const row of audit.records)await rpc('forge_laptop_reply_enqueue',{p_submission_id:row.id});
console.log(JSON.stringify({queuePrepared:true,recipients:audit.records.length}));
let accepted=0;
const permitted=new Set(audit.records.map(row=>row.email));
for(let count=0;count<audit.records.length;count++){
 const job=await rpc('forge_laptop_reply_claim',{});if(!job)break;
 if(!permitted.has(job.recipient)||!['student','adult','donor'].includes(job.kind))throw Error('Unexpected queued recipient; paused for review.');
 const blocked=await rpc('forge_notification_recipient_blocked',{p_recipient:job.recipient});
 let provider=null,error=null;
 if(blocked!==false)error='Recipient delivery eligibility could not be confirmed.';
 else {
  const content=laptopReply(job.kind,job.name,job.submission_id);
  try {
   const result=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${config.RESEND_API_KEY}`,'Content-Type':'application/json','Idempotency-Key':`forge-laptop-reply-${job.id}`},body:JSON.stringify({from:'Forge <signin@auth.forgeintellitech.com>',to:[job.recipient],reply_to:'admin@forgeintellitech.com',...content}),signal:AbortSignal.timeout(25000)});
   if(result.ok){const body=await result.json();if(typeof body.id==='string')provider=body.id;else error='Provider acceptance could not be confirmed.';}
   else error=`Provider HTTP ${result.status}; reconciliation required.`;
  }catch{error='Provider response unavailable; reconciliation required.';}
 }
 const finished=await rpc('forge_laptop_reply_finish',{p_id:job.id,p_lease:job.lease_token,p_provider_id:provider,p_error:error});
 if(finished!==true)throw Error('Send receipt could not be confirmed. Do not create a replacement job.');
 if(!provider)throw Error('Email batch paused. Review the private queue before retrying.');
 accepted++;
 console.log(JSON.stringify({providerAcceptedThisRun:accepted}));
 await new Promise(resolve=>setTimeout(resolve,700));
}
console.log(JSON.stringify({accepted,deliveryConfirmed:false,note:'Provider acceptance is not a guarantee of inbox delivery; receipts are retained in the private queue.'}));
