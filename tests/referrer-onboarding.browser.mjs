import {chromium} from 'file:///C:/Users/Forge/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';

// UI contract checks use explicit fictional responses; database assertions live
// in referral-database-tests.sql and roll back their records separately.
const base=process.env.LOCAL_TEST_URL||'http://localhost:3009';
const id='ae010101-0101-4101-8101-010101010101';
const browser=await chromium.launch({channel:'chrome',headless:true});
try {
 const context=await browser.newContext({viewport:{width:390,height:1000},reducedMotion:'reduce'});
 await context.addInitScript(()=>localStorage.setItem('forge-cookie-consent',JSON.stringify({necessary:true,analytics:false,marketing:false})));
 const page=await context.newPage();page.setDefaultNavigationTimeout(180000);page.setDefaultTimeout(30000);
 await page.route('**/api/referrals/config',r=>r.fulfill({json:{url:'https://deblssilgleuiccsgdcy.supabase.co',key:'fixture',emailLoginEnabled:true}}));
 await page.goto(base+'/earn-with-forge/onboard',{waitUntil:'domcontentloaded'});
 await page.getByRole('link',{name:'Go to Earn with Forge account ↗',exact:true}).waitFor();
 assert.equal(await page.locator('#onboard-schoolName').count(),0,'signed-out visitor cannot enter an assisted request');
 await context.addInitScript(id=>sessionStorage.setItem('forge-referrer-preview',JSON.stringify({access_token:'fixture-access',refresh_token:'fixture-refresh',expires_at:Math.floor(Date.now()/1000)+3600,expires_in:3600,token_type:'bearer',user:{id,email:'owner@invalid.example',aud:'authenticated',role:'authenticated',app_metadata:{},user_metadata:{},created_at:new Date().toISOString()}})),id);
 await page.route('**/auth/v1/user',r=>r.fulfill({json:{id,email:'owner@invalid.example',email_confirmed_at:'2026-10-01T00:00:00Z',aud:'authenticated',role:'authenticated'}}));
 let submissions=0,payload;
 await page.route('**/api/schools/onboard',async r=>{submissions++;payload=r.request().postDataJSON();assert.equal(r.request().headers().authorization,'Bearer fixture-access');await r.fulfill({status:201,json:{success:true,id:'ae020202-0202-4202-8202-020202020202',notification:'pending'}});});
 await page.reload({waitUntil:'domcontentloaded'});
 await page.locator('#onboard-schoolName').fill('Fictional Browser School');
 await page.selectOption('#onboard-level','Primary');await page.fill('#onboard-location','Fictional Ogun');await page.fill('#onboard-learnerCount','30');await page.fill('#onboard-startPeriod','Next term');await page.fill('#onboard-context','Fictional devices for UI testing');
 await page.getByRole('button',{name:'Next',exact:true}).click();
 await page.fill('#onboard-name','Fictional School Contact');await page.fill('#onboard-email','contact@invalid.example');await page.fill('#onboard-phone','08000000000');await page.fill('#onboard-role','School owner');
 await page.getByRole('button',{name:'Review answers',exact:true}).click();
 assert.equal(await page.locator('#onboard-consent').isChecked(),false);
 assert.equal(await page.locator('#onboard-schoolAuthorised').isChecked(),false);
 await page.locator('#onboard-consent').check();await page.locator('#onboard-schoolAuthorised').check();
 await page.getByRole('button',{name:'Send onboarding request',exact:true}).click();
 await page.getByRole('heading',{name:'Your onboarding request is saved.',exact:true}).waitFor();
 assert.equal(submissions,1);assert.equal(payload.assisted,true);assert.equal(payload.schoolAuthorised,true);assert.equal(payload.consent,true);assert.equal(payload.learnerCount,30);assert.equal(payload.email,'contact@invalid.example');assert.equal(payload.referralCode,null);assert.equal(payload.referrerId,undefined);
 assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'mobile overflow');
 console.log('PASS mocked onboarding UI: sign-in gate, three-step form, explicit authority, authenticated submission, server-derived attribution, saved receipt, mobile fit. No school record or email created.');
 const response=await context.request.post(base+'/api/schools/onboard',{headers:{Origin:base},data:{schoolName:'Fictional API Denial',location:'Fictional Ogun',level:'Primary',name:'Fictional Adult',email:'denied@invalid.example',phone:'08000000000',role:'Owner',learnerCount:30,startPeriod:'Next term',context:'Denial test',note:'',assisted:true,schoolAuthorised:true,consent:true,referralCode:null}});
 assert.equal(response.status(),401,'actual API rejects assisted requests without a session');
 console.log('PASS actual local API: unauthenticated assisted onboarding rejected.');
} finally {await browser.close();}
