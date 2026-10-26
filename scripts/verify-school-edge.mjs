import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const key=readFileSync('private-assets/feedback-anon.txt','utf8').trim();
const root='https://deblssilgleuiccsgdcy.supabase.co';
const headers={'Content-Type':'application/json',apikey:key,Authorization:`Bearer ${key}`};
const payload={schoolName:'Synthetic Backend Foundation School',level:'Primary',location:'Fictional test location',name:'Synthetic adult contact',email:'school-backend-smoke@invalid.example',phone:'08000000000',role:'School owner',learnerCount:20,startPeriod:'Next term',context:'Synthetic backend verification only',note:'Delete after smoke test',consent:true,assisted:false,schoolAuthorised:false,referralCode:null};
async function call(action,payload,extra={}){const res=await fetch(root+'/functions/v1/forge-school-backend',{method:'POST',headers:{...headers,...extra},body:JSON.stringify({action,payload})});return {status:res.status,body:await res.json()};}
assert.equal((await call('list',{})).status,401);
assert.equal((await call('list',{}, {'x-forge-user-token':'forged-user-token'})).status,401);
assert.equal((await call('submit',{})).status,400);
const results=await Promise.all([call('submit',payload),call('submit',payload)]);
assert.deepEqual(results.map(r=>r.status).sort(),[201,409]);
const saved=results.find(r=>r.status===201).body;
assert(saved.success&&saved.id&&saved.notification==='pending');
const rpc=await fetch(root+'/rest/v1/rpc/forge_school_staff_action',{method:'POST',headers,body:JSON.stringify({p_user_id:'81010101-0101-4101-8101-010101010101',p_verified_email:'admin@forgeintellitech.com',p_action:'list',p_payload:{}})});
assert.equal(rpc.status,401,'anon cannot bypass edge identity check');
console.log(JSON.stringify({passed:true,requestId:saved.id,checks:['unverified staff denied','forged JWT denied','invalid school rejected','concurrent duplicate prevented','notification durably queued','anonymous direct staff RPC denied']}));
