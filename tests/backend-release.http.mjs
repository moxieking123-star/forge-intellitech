import assert from 'node:assert/strict';
const base=process.env.TEST_BASE_URL||'http://localhost:3012',enabled=process.argv[2]==='enabled';
for(const path of ['/api/staff/config','/api/referrals/config']){
 const res=await fetch(base+path,{signal:AbortSignal.timeout(15000)});
 assert.equal(res.status,enabled?200:503,path);
 assert.match(res.headers.get('cache-control'),/no-store/);
 const data=await res.json();
 if(enabled){assert.equal(JSON.parse(Buffer.from(data.key.split('.')[1],'base64url')).role,'anon');assert.equal(data.url,'https://deblssilgleuiccsgdcy.supabase.co');}
 else assert.equal(data.key,undefined);
}
if(enabled){
 for(const path of ['/api/launchpad','/api/launchpad/apply','/api/newsletter']){
  const res=await fetch(base+path,{method:'POST',headers:{Origin:base,'Content-Type':'application/json'},body:'{}'});assert.equal(res.status,410,path+' legacy endpoint must not reach public tables');
 }
 for(const path of ['/api/contact','/api/sponsor','/api/programmes/proposal']){
  const res=await fetch(base+path,{method:'POST',headers:{Origin:base,'Content-Type':'application/json'},body:'{}'});assert.equal(res.status,400,path+' validates before saving');
 }
 assert.equal((await fetch(base+'/api/referrals/account')).status,401);
 assert.equal((await fetch(base+'/api/staff/notifications',{method:'POST',headers:{Origin:base,'Content-Type':'application/json'},body:'{"action":"list","payload":{"queue":"school"}}'})).status,401);
}
if(process.env.EXPECT_PRODUCTION==='true')assert.equal((await fetch(base+'/api/preview-feedback',{method:'POST',headers:{Origin:base,'Content-Type':'application/json'},body:'{}'})).status,404);
if(process.env.EXPECT_FEATURES_DISABLED==='true'){
 for(const path of ['/api/contact','/api/sponsor'])assert.equal((await fetch(base+path,{method:'POST',headers:{Origin:base,'Content-Type':'application/json'},body:'{}'})).status,503,path+' must not fall back to legacy tables');
 assert.equal((await fetch(base+'/api/referrals/account')).status,503,'old referral fallback must remain disconnected');
}
console.log(`PASS local ${enabled?'enabled':'disabled or rejected-key'} release configuration, publishable key boundary and ${enabled?'retired legacy APIs/private access/invalid intake':'closed configuration'}. No records or emails created.`);
