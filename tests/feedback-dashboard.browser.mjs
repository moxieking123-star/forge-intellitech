import {chromium} from 'file:///C:/Users/Forge/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
const base=process.env.TEST_BASE_URL||'http://localhost:3008';
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
 const page=await context.newPage();page.setDefaultTimeout(30000);
 await page.route('**/api/staff/config',route=>route.fulfill({json:{url:'https://deblssilgleuiccsgdcy.supabase.co',key:'fixture-anon',emailLoginEnabled:false}}));
 await page.route('**/auth/v1/logout*',route=>route.fulfill({status:204}));
 await page.goto(base+'/admin/feedback',{waitUntil:'domcontentloaded',timeout:90000});
 await page.getByRole('heading',{name:'Tester feedback.'}).waitFor();
 assert.equal(await page.getByRole('button',{name:'Email sign-in link'}).isDisabled(),true);
 assert.equal(await page.getByText('A fixture review for the dashboard.').count(),0);
 await context.addInitScript(()=>{sessionStorage.setItem('forge-staff-preview',JSON.stringify({access_token:'fixture-access-token',refresh_token:'fixture-refresh-token',expires_at:Math.floor(Date.now()/1000)+3600,expires_in:3600,token_type:'bearer',user:{id:'b3030303-0303-4303-8303-030303030303',email:'fixture@invalid.example',aud:'authenticated',role:'authenticated',app_metadata:{},user_metadata:{},created_at:new Date().toISOString()}}));});
 let filters;
 await page.route('**/api/staff/feedback',async route=>{
  const body=route.request().postDataJSON();filters=body.filters;
  if(body.filters.search==='server error')return route.fulfill({status:503,json:{error:'Fixture service unavailable.'}});
  if(body.action==='export')return route.fulfill({contentType:'text/csv',headers:{'Content-Disposition':'attachment; filename="forge-feedback.csv"'},body:'created_at,comment\n2026-10-23,fixture'});
  const empty=body.filters.search==='no match';
  return route.fulfill({json:{total:empty?0:51,pages:['/','/programmes'],sections:['Whole page','Hero'],items:empty?[]:[{id:'fixture',created_at:'2026-10-23T12:00:00Z',page:'/',section:'Hero',reaction:'Inspired',visitor_type:'Student',comment:'A fixture review for the dashboard.',build:'fixture'}]}});
 });
 await page.reload();await page.getByText('A fixture review for the dashboard.').waitFor();
 await page.getByRole('combobox',{name:/^Reaction/}).selectOption('Inspired');await page.getByRole('combobox',{name:/^Visitor type/}).selectOption('Student');
 await page.getByRole('button',{name:'Apply filters'}).click();await page.getByText('51 matching responses').waitFor();assert.equal(filters.reaction,'Inspired');assert.equal(filters.visitor,'Student');
 await page.getByRole('button',{name:'Next',exact:true}).click();await page.getByText('51–51 of 51').waitFor();assert.equal(filters.offset,50);
 const download=page.waitForEvent('download');await page.getByRole('button',{name:'Export filtered CSV'}).click();await download;assert.equal(filters.offset,0);
 for(const width of [1440,768,390]){await page.setViewportSize({width,height:1000});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1));}
 await page.getByLabel('Find words in a comment').fill('no match');await page.getByRole('button',{name:'Apply filters'}).click();await page.getByText('No reviews match these filters. Try clearing them.').waitFor();assert.equal(filters.offset,0);
 await page.getByRole('button',{name:'Clear',exact:true}).click();await page.getByText('A fixture review for the dashboard.').waitFor();
 await page.getByLabel('Find words in a comment').fill('server error');await page.getByRole('button',{name:'Apply filters'}).click();await page.getByRole('alert').filter({hasText:'Fixture service unavailable.'}).waitFor();
 await page.getByRole('button',{name:'Clear',exact:true}).click();await page.getByText('A fixture review for the dashboard.').waitFor();
 await page.getByRole('button',{name:'Sign out',exact:true}).click();await page.getByRole('heading',{name:'Staff sign-in'}).waitFor();assert.equal(await page.getByText('A fixture review for the dashboard.').count(),0);
 console.log('PASS mocked UI: private gate, filters, pagination, filtered export, empty/clear, 1440/768/390px, sign-out clearing.');
 // Real local endpoint checks, not mocked browser requests.
 for(const [origin,token,status] of [[base,null,401],['https://untrusted.example','bad',403],[base,'bad',401]]){
  const res=await fetch(base+'/api/staff/feedback',{method:'POST',headers:{'Content-Type':'application/json',Origin:origin,...(token?{Authorization:'Bearer '+token}:{})},body:JSON.stringify({action:'list',filters:{}})});assert.equal(res.status,status);
 }
 console.log('PASS real HTTP: missing identity, invalid identity and cross-origin denied.');
}catch(error){console.error(error);process.exitCode=1;}finally{await Promise.race([browser.close(),new Promise(resolve=>setTimeout(resolve,5000))]);}
