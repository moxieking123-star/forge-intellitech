import {chromium} from 'file:///C:/Users/Forge/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
const base=process.env.LOCAL_TEST_URL||'http://localhost:3009';
const browser=await chromium.launch({channel:'chrome',headless:true});
try {
 for (const scenario of ['normal','anchor','retry']) {
  const context=await browser.newContext({reducedMotion:'reduce'}),page=await context.newPage();
  page.setDefaultNavigationTimeout(180000);page.setDefaultTimeout(20000);
  const id='ae030303-0303-4303-8303-030303030303',user={id,email:'callback@invalid.example',email_confirmed_at:'2026-10-01T00:00:00Z',aud:'authenticated',role:'authenticated'};
  const jwt=[{alg:'HS256',typ:'JWT'},{sub:id,exp:Math.floor(Date.now()/1000)+3600,aud:'authenticated'},'fictional'].map(v=>Buffer.from(typeof v==='string'?v:JSON.stringify(v)).toString('base64url')).join('.');
  if(scenario==='retry')await context.addInitScript(()=>sessionStorage.setItem('forge-referrer-preview',JSON.stringify({access_token:'older-user-token',refresh_token:'older-user-refresh',expires_at:Math.floor(Date.now()/1000)+3600,expires_in:3600,token_type:'bearer',user:{id:'ae040404-0404-4404-8404-040404040404',email:'older@invalid.example',aud:'authenticated',role:'authenticated'}})));
  let release;const gate=new Promise(resolve=>release=resolve);let configStarted;
  const started=new Promise(resolve=>configStarted=resolve);
  let configCalls=0;
  await page.route('**/api/referrals/config',async r=>{configStarted();await gate;if(scenario==='retry'&&configCalls++===0)return r.fulfill({status:503,json:{error:'Fictional temporary connection failure'}});await r.fulfill({json:{url:'https://deblssilgleuiccsgdcy.supabase.co',key:'fixture',emailLoginEnabled:true}});});
  await page.route('**/auth/v1/user',r=>{assert.equal(r.request().headers().authorization,`Bearer ${jwt}`,'must verify callback user, never older cached user');return r.fulfill({json:user});});
  await page.route('**/api/referrals/account',r=>r.fulfill({json:{account:{referralNumber:'FORGE-CALLBACK-FIXTURE',status:'active'},links:[]}}));
  await page.route('**/api/referrals/payout-profile',r=>r.fulfill({json:{profile:null}}));
  await page.route('**/api/referrals/statements',r=>r.fulfill({json:{items:[]}}));
  await page.goto(base+'/earn-with-forge#'+new URLSearchParams({access_token:jwt,refresh_token:'fictional-refresh',expires_in:'3600',token_type:'bearer',type:'magiclink'}),{waitUntil:'domcontentloaded'});
  await started;
  if(scenario==='anchor')await page.getByRole('link',{name:'Start with your account ↗',exact:true}).click();
  release();
  if(scenario==='retry')await page.getByRole('button',{name:'Retry account connection',exact:true}).click();
  await page.getByText('Signed in as callback@invalid.example',{exact:true}).waitFor();
  await page.getByText('FORGE-CALLBACK-FIXTURE',{exact:true}).waitFor();
  assert.equal(await page.evaluate(()=>location.hash.includes('access_token')),false);
  console.log(`PASS mocked callback: ${scenario}, session recovered and account loaded.`);
  await context.close();
 }
} finally {await browser.close();}
