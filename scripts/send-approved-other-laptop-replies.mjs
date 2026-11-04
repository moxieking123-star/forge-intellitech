import fs from 'node:fs';
const approvedIds=['8bd33849-eba2-49b3-b32a-9a290d2491f9','596c7a0c-e763-423f-90d4-5a1a3e15bee8'];
const source=JSON.parse(fs.readFileSync('private-assets/laptop-audit/intakes.json','utf8'));
const env={};for(const file of ['.env.local','private-assets/laptop-audit/production.env'])for(const line of fs.readFileSync(file,'utf8').split(/\r?\n/)){const m=line.match(/^([A-Z][A-Z0-9_]*)=(.*)$/);if(m)env[m[1]]=m[2].trim().replace(/^(['"])(.*)\1$/,'$2');}
const path='private-assets/laptop-audit/other-reply-receipts.json';
const receipts=fs.existsSync(path)?JSON.parse(fs.readFileSync(path,'utf8')):{};
let accepted=0;
for(const id of approvedIds){
 if(receipts[id]?.providerId)continue;
 if(receipts[id]?.startedAt)throw Error('An earlier response is unresolved; reconcile before resending.');
 const row=source.rows.find(row=>row.id===id);if(!row)throw Error('Reviewed enquiry not found.');
 const p=row.payload;
 const text=`Hello ${p.name.replace(/[\r\n]/g,' ')},\n\nThank you for telling us what you want to learn and build. We have received your laptop enquiry.\n\nOur current Give a Child a Laptop programme supports SS1–SS3 students in Nigerian public and low-income private secondary schools, with parent or guardian involvement and a year of learning with Forge. Based on what you shared, your request appears to sit outside those current criteria. We do not want to promise support we cannot confirm.\n\nIf we have misunderstood your situation, please reply to admin@forgeintellitech.com and clarify it. Thank you for reaching out, and for your determination to keep learning.\n\nWe can forge it, together.\nThe Forge team`;
 receipts[id]={startedAt:new Date().toISOString()};fs.writeFileSync(path,JSON.stringify(receipts,null,2),{mode:0o600});
 const response=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${env.RESEND_API_KEY}`,'Content-Type':'application/json','Idempotency-Key':`forge-laptop-eligibility-${id}-v1`},body:JSON.stringify({from:'Forge <signin@auth.forgeintellitech.com>',to:[p.email],reply_to:'admin@forgeintellitech.com',subject:'About your laptop enquiry — Forge',text}),signal:AbortSignal.timeout(25000)});
 if(!response.ok)throw Error(`Provider returned HTTP ${response.status}; reconcile before resending.`);
 const result=await response.json();if(typeof result.id!=='string')throw Error('Provider receipt missing.');
 receipts[id].providerId=result.id;fs.writeFileSync(path,JSON.stringify(receipts,null,2),{mode:0o600});accepted++;
 const key=env.SUPABASE_SERVICE_ROLE_KEY;
 const audit=await fetch('https://deblssilgleuiccsgdcy.supabase.co/rest/v1/rpc/forge_participation_staff_action',{method:'POST',headers:{apikey:key,Authorization:`Bearer ${key}`,'Content-Type':'application/json'},body:JSON.stringify({p_user_id:'4947d5b6-6426-4389-87fd-9d900813b83b',p_verified_email:'admin@forgeintellitech.com',p_action:'update',p_payload:{id,version:row.version,status:'contacted',note:'Founder-approved laptop eligibility clarification sent; provider accepted. This does not confirm inbox delivery.'}}),signal:AbortSignal.timeout(20000)});
 receipts[id].staffAuditRecorded=audit.ok;fs.writeFileSync(path,JSON.stringify(receipts,null,2),{mode:0o600});
 await new Promise(resolve=>setTimeout(resolve,700));
}
console.log(JSON.stringify({accepted,deliveryConfirmed:false}));
