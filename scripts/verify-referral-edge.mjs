import assert from 'node:assert/strict';
import {readFileSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const key=readFileSync('private-assets/feedback-anon.txt','utf8').trim();
const fixture=JSON.parse(readFileSync('private-assets/referral-http-fixture.json','utf8').replace(/^\uFEFF/,''));
const root='https://deblssilgleuiccsgdcy.supabase.co',endpoint=root+'/functions/v1/forge-referral-backend';
const headers={apikey:key,Authorization:`Bearer ${key}`,'Content-Type':'application/json'};
async function login(email){const res=await fetch(root+'/auth/v1/token?grant_type=password',{method:'POST',headers,body:JSON.stringify({email,password:fixture.password}),signal:AbortSignal.timeout(20000)});const data=await res.json();assert.equal(res.status,200,JSON.stringify(data));return data;}
const a=await login(fixture.firstEmail),b=await login(fixture.secondEmail);
writeFileSync('private-assets/referral-http-sessions.json',JSON.stringify({a,b}));
async function call(session,action,payload={}){const res=await fetch(endpoint,{method:'POST',headers:{...headers,'x-forge-user-token':session.access_token},body:JSON.stringify({action,payload}),signal:AbortSignal.timeout(25000)});return {status:res.status,body:await res.json()};}
const accountA=await call(a,'account'),accountB=await call(b,'account');assert.equal(accountA.status,200);assert.equal(accountB.status,200);assert.notEqual(accountA.body.account.referralNumber,accountB.body.account.referralNumber);
const school={schoolName:'Synthetic Referral HTTP School',location:'Fictional Lagos location'};
assert.equal((await call(a,'link_create',school)).status,409);
for(const session of [a,b])assert.equal((await call(session,'profile_save',{bankName:'Synthetic Test Bank',accountName:'Synthetic Adult Referrer',accountNumber:'0123456789'})).status,201);
assert.equal((await call(a,'profile_save',{bankName:'Changed',accountName:'Changed',accountNumber:'9876543210'})).status,409);
const profile=await call(a,'profile');assert.equal(profile.body.profile.maskedAccountNumber,'••••••6789');assert(!JSON.stringify(profile.body).includes('0123456789'));
const linkA=(await call(a,'link_create',school)).body.link,linkB=(await call(b,'link_create',school)).body.link;assert(linkA&&linkB);assert.notEqual(linkA.code,linkB.code);
writeFileSync('private-assets/referral-http-records.json',JSON.stringify({linkA,linkB}));
assert.equal((await call(b,'agreement',{referralId:linkA.id})).status,409);
assert.equal((await call(a,'_complete',{referralId:linkA.id})).status,400);
const pdf=readFileSync('public/downloads/forge-referral-agreement-draft.pdf'),hash=createHash('sha256').update(pdf).digest('hex');
async function upload(session,bytes=pdf,extra={}){const res=await fetch(`${endpoint}?action=upload&referralId=${linkA.id}&version=draft-2026-10-22-v1`,{method:'POST',headers:{...headers,'Content-Type':'application/pdf','x-forge-user-token':session.access_token,'x-forge-signed-declaration':'true',...extra},body:bytes,signal:AbortSignal.timeout(30000)});return {status:res.status,body:await res.json()};}
assert.equal((await upload(a)).status,409,'download first');
assert.equal((await call(a,'download',{referralId:linkA.id,version:'draft-2026-10-22-v1',hash:'a'.repeat(64)})).status,409);
assert.equal((await call(a,'download',{referralId:linkA.id,version:'draft-2026-10-22-v1',hash})).status,200);
assert.equal((await upload(a,Buffer.from('%PDF-1.7\n/JavaScript\n%%EOF'))).status,400);
assert.equal((await upload(a,pdf,{'x-forge-signed-declaration':'false'})).status,400);
assert.equal((await upload(b)).status,409,'foreign owner upload');
const uploads=await Promise.all([upload(a),upload(a)]);assert.deepEqual(uploads.map(x=>x.status).sort(),[201,409]);
const evidence=await call(a,'agreement',{referralId:linkA.id});assert.equal(evidence.body.agreement.status,'uploaded_awaiting_review');assert(evidence.body.agreement.downloaded_at&&evidence.body.agreement.uploaded_at);assert.equal(evidence.body.agreement.school_contract_signed_at,null);
const stored=await fetch(root+'/rest/v1/rpc/forge_referral_action',{method:'POST',headers,body:JSON.stringify({p_owner:fixture.firstId,p_action:'account',p_payload:{}})});assert.equal(stored.status,401);
const schoolPayload={...school,level:'Primary',name:'Synthetic School Contact',email:'referral-http-school@invalid.example',phone:'08000000000',role:'Owner',learnerCount:20,startPeriod:'Next term',context:'Synthetic test only',note:'Delete fixture',consent:true,assisted:false,referralCode:linkB.code};
const intake=await fetch(root+'/functions/v1/forge-school-backend',{method:'POST',headers,body:JSON.stringify({action:'submit',payload:schoolPayload})});const intakeBody=await intake.json();assert.equal(intake.status,201,JSON.stringify(intakeBody));
writeFileSync('private-assets/referral-http-records.json',JSON.stringify({linkA,linkB,schoolRequestId:intakeBody.id}));
const accountAfter=await call(b,'account');assert.equal(accountAfter.body.links.find(l=>l.id===linkB.id).stage,'school_requested');
const steal=await fetch(root+'/functions/v1/forge-school-backend',{method:'POST',headers:{...headers,'x-forge-user-token':a.access_token},body:JSON.stringify({action:'submit',payload:{...schoolPayload,assisted:true,schoolAuthorised:true,referralCode:linkA.code}})});assert.equal(steal.status,409);
const foreignBank=await call(b,'profile',{referrerId:fixture.firstId});assert.equal(foreignBank.status,200); // always derives owner from JWT, ignores supplied ID
const anonymous=await fetch(endpoint,{method:'POST',headers,body:JSON.stringify({action:'account'})});assert.equal(anonymous.status,401);
console.log(JSON.stringify({passed:true,referralId:linkA.id,schoolRequestId:intakeBody.id,checks:['real synthetic Auth sessions','separate accounts and per-school links','payment profile write-once and masked','foreign owner denied','exact template hash required','download-before-upload','signing declaration required','active PDF content rejected','concurrent upload accepts exactly once','receipt awaits review, no school signature invented','direct anonymous RPC denied','chosen school link determines referrer','duplicate school cannot switch attribution']}));
