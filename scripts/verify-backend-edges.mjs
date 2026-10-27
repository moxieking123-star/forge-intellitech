import {readFileSync,writeFileSync} from 'node:fs';
import assert from 'node:assert/strict';
if(process.env.FORGE_TEST_DELIVERY_DISABLED!=='true')throw Error('Confirm isolated email delivery is disabled before creating test outbox records.');
const key=readFileSync('private-assets/feedback-anon.txt','utf8').trim();
const root='https://deblssilgleuiccsgdcy.supabase.co/functions/v1/';
const headers={apikey:key,Authorization:`Bearer ${key}`,'Content-Type':'application/json'};
const receipts={};
async function post(name,body,extra={}){const r=await fetch(root+name,{method:'POST',headers:{...headers,...extra},body:JSON.stringify(body),signal:AbortSignal.timeout(20000)});let data;try{data=await r.json();}catch{}return {status:r.status,data};}
for(const name of ['forge-staff-agreements','forge-referral-finance','forge-notification-admin']){const r=await post(name,{action:'list',payload:{queue:'school'}},{'x-forge-user-token':'invalid-fixture-token'});assert.equal(r.status,401,name);console.log('PASS invalid staff identity:',name);}
const p={name:'Synthetic backend verification',email:'backend-verification@invalid.example',subject:'Rollback backend enquiry',message:'Fictional adult verification only; no real child or customer data.',submissionSource:'general'};
const a=await post('forge-participation',{action:'submit',kind:'contact',payload:p});assert.equal(a.status,201);assert(a.data.id);receipts.participationId=a.data.id;writeFileSync('private-assets/backend-edge-fixtures.json',JSON.stringify(receipts));
const b=await post('forge-participation',{action:'submit',kind:'contact',payload:p});assert.equal(b.data.id,a.data.id);assert.equal(b.data.duplicate,true);console.log('PASS real enquiry save and deduplicated retry');
const proposal={name:'Synthetic proposal verification',school:'Synthetic test school',email:'proposal-verification@invalid.example',consent:'yes'};
const c=await post('forge-proposal-intake',proposal);assert.equal(c.status,202);receipts.proposalId=c.data.id;writeFileSync('private-assets/backend-edge-fixtures.json',JSON.stringify(receipts));const d=await post('forge-proposal-intake',proposal);assert.equal(d.data.id,c.data.id);console.log('PASS real proposal queue and deduplicated retry');
const worker=await fetch(root+'forge-notification-worker',{method:'POST',signal:AbortSignal.timeout(10000)});assert.equal(worker.status,401);console.log('PASS delivery worker rejects unauthorised trigger; no emails sent');
writeFileSync('docs/redesign/backend/edge-integration-results.json',JSON.stringify({result:'passed',checks:['staff identity denial','real enquiry atomic save and dedupe','real proposal queue and dedupe','worker trigger denied'],emailsSent:0,fixturesAwaitCleanup:true},null,2));
