import {chromium} from 'file:///C:/Users/Forge/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
const base='http://localhost:3013/instructor-training';
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 for(const mode of ['expired','rejected']){
  const page=await browser.newPage();let configCalls=0,emails=0;
  await page.route('**/api/recruitment/config',r=>{configCalls++;return r.fulfill({json:{url:'https://deblssilgleuiccsgdcy.supabase.co',key:'fixture-anon',emailLoginEnabled:true}});});
  await page.route('**/auth/v1/user*',r=>r.fulfill({status:401,json:{message:'Fixture rejected callback'}}));
  await page.route('**/auth/v1/token*',r=>r.fulfill({status:400,json:{error:'invalid_grant'}}));
  await page.route('**/auth/v1/otp*',r=>{emails++;return r.fulfill({json:{}});});
  const fragment=mode==='expired'?'error=access_denied&error_code=otp_expired&error_description=private-fixture':'access_token=fixture&refresh_token=fixture&token_type=bearer';
  await page.goto(base+'/join/training#'+fragment,{waitUntil:'domcontentloaded',timeout:120000});
  await page.getByRole('alert').filter({hasText:mode==='expired'?'expired':'could not be verified'}).waitFor();
  assert.equal(configCalls,1);assert(!await page.getByRole('alert').filter({hasText:/sign-in link/}).innerText().then(x=>x.includes('private-fixture')));
  assert.equal(new URL(page.url()).hash,'#account');
  await page.getByLabel('Email address',{exact:true}).fill('fictional@example.invalid');
  const button=page.getByRole('button',{name:'Email my sign-in link'});assert(await button.isEnabled());await button.click();
  await page.getByRole('status').filter({hasText:'on its way'}).waitFor();assert.equal(emails,1);await page.close();
 }
 console.log('Expired/rejected callback recovery passed in browser; no real emails or identities used.');
}finally{await browser.close();}
