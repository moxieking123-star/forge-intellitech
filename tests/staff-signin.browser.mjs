import {chromium} from 'file:///C:/Users/Forge/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
const base=process.env.TEST_BASE_URL||'http://localhost:3009';
assert(['localhost','127.0.0.1'].includes(new URL(base).hostname));
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const page=await browser.newPage({viewport:{width:1280,height:1000}});
 let enabled=true,fail=false,calls=0,release;
 await page.route('**/api/staff/config',r=>r.fulfill({json:{url:'https://deblssilgleuiccsgdcy.supabase.co',key:'fixture-anon',emailLoginEnabled:enabled}}));
 await page.route('**/auth/v1/otp*',async r=>{
  calls++;const body=r.request().postDataJSON();assert.equal(body.email,'fictional@invalid.example');assert.equal(body.create_user,false);
  assert.equal(new URL(r.request().url()).searchParams.get('redirect_to'),base+'/admin/feedback');
  await new Promise(resolve=>release=resolve);
  await r.fulfill(fail?{status:400,json:{error_code:'over_email_send_rate_limit',msg:'Fixture delivery error'}}:{status:200,json:{}});
 });
 await page.goto(base+'/admin/feedback',{waitUntil:'domcontentloaded'});
 await page.getByText(/Ready to sign in/).waitFor();
 await page.getByLabel('Staff email',{exact:true}).fill('fictional@invalid.example');
 await page.getByRole('button',{name:'Email sign-in link',exact:true}).click();
 const sending=page.getByRole('button',{name:'Sending your sign-in link…',exact:true});await sending.waitFor();assert(await sending.isDisabled());
 await page.getByRole('status').filter({hasText:'Sending a secure link'}).waitFor();
 while(!release)await new Promise(r=>setTimeout(r,20));release();
 await page.getByRole('status').filter({hasText:'check your email'}).waitFor();
 assert.equal(calls,1);assert(await page.getByRole('button',{name:'Email sign-in link',exact:true}).isEnabled());
 fail=true;release=undefined;await page.getByRole('button',{name:'Email sign-in link',exact:true}).click();
 await sending.waitFor();while(!release)await new Promise(r=>setTimeout(r,20));release();
 await page.getByRole('alert').filter({hasText:'Unable to sign in'}).waitFor();
 enabled=false;await page.reload({waitUntil:'domcontentloaded'});await page.getByText(/Email sign-in is unavailable right now/).waitFor();
 assert(await page.getByRole('button',{name:'Email sign-in link',exact:true}).isDisabled());assert.equal(calls,2);
 console.log('Staff sign-in: ready, sending, duplicate prevention, success, provider failure and disabled-service explanation passed with zero real emails.');
}finally{await browser.close();}
