import {chromium} from 'file:///C:/Users/Forge/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'chrome',headless:true});
try {
 const context=await browser.newContext();
 const id='ae010101-0101-4101-8101-010101010101';
 await context.addInitScript(id=>sessionStorage.setItem('forge-referrer-preview',JSON.stringify({access_token:'fixture-access',refresh_token:'fixture-refresh',expires_at:Math.floor(Date.now()/1000)+3600,expires_in:3600,token_type:'bearer',user:{id,email:'owner@invalid.example',aud:'authenticated',role:'authenticated',app_metadata:{},user_metadata:{},created_at:new Date().toISOString()}})),id);
 const page=await context.newPage();
 await page.route('**/api/referrals/config',r=>r.fulfill({json:{url:'https://deblssilgleuiccsgdcy.supabase.co',key:'fixture',emailLoginEnabled:true}}));
 await page.route('**/auth/v1/user',r=>r.fulfill({json:{id,email:'owner@invalid.example',email_confirmed_at:'2026-10-01T00:00:00Z',aud:'authenticated',role:'authenticated'}}));
 await page.route('**/api/referrals/account',r=>r.fulfill({json:{account:{referralNumber:'FIXTURE-1',status:'active'},links:[]}}));
 await page.route('**/api/referrals/statements**',r=>r.fulfill({json:{items:[]}}));
 let finishSave, observeSave;
 const saveStarted=new Promise(resolve=>{observeSave=resolve;});
 await page.route('**/api/referrals/payout-profile',async r=>{
  if(r.request().method()==='GET')return r.fulfill({json:{profile:null}});
  await new Promise(resolve=>{finishSave=resolve;observeSave();});
  await r.fulfill({status:201,json:{saved:true}});
 });
 await page.route('**/api/referrals/links',r=>r.fulfill({status:409,json:{error:'Register your payment details before creating a school referral.'}}));
 await page.goto((process.env.LOCAL_TEST_URL||'http://localhost:3011')+'/earn-with-forge',{waitUntil:'domcontentloaded',timeout:120000});
 await page.getByRole('textbox',{name:'Bank name',exact:true}).fill('Fictional Bank');
 await page.getByRole('textbox',{name:'Account name',exact:true}).fill('Fictional Owner');
 await page.getByRole('textbox',{name:'Nigerian account number',exact:true}).fill('0123456789');
 await page.getByRole('button',{name:'Register payment details',exact:true}).click();
 const savingButton=page.getByRole('button',{name:'Saving bank details…',exact:true});
 await savingButton.waitFor();
 assert(await savingButton.isDisabled());
 await saveStarted;
 finishSave();
 await page.getByText('Payment details registered.',{exact:true}).waitFor();
 assert(!(await page.locator('main').innerText()).includes('0123456789'));
 await page.getByRole('textbox',{name:'School name',exact:true}).fill('Fictional School');
 await page.getByRole('textbox',{name:'School location',exact:true}).fill('Fictional Lagos');
 await page.getByRole('button',{name:'Create school referral link',exact:true}).click();
 await page.getByText('Register your payment details before creating a school referral.',{exact:true}).waitFor();
 console.log('PASS mocked referral account: payment save disables repeat submission, private number stays masked, school-link remediation is visible. No production writes.');
} finally {await browser.close();}
