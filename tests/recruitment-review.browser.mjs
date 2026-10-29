import {chromium} from 'file:///C:/Users/Forge/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
const base=process.env.TEST_BASE_URL||'http://127.0.0.1:3012';
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
 await context.addInitScript(()=>{localStorage.setItem('forge-cookie-consent',JSON.stringify({necessary:true,analytics:false,marketing:false}));sessionStorage.setItem('forge-staff-preview',JSON.stringify({access_token:'fixture-access-token',refresh_token:'fixture-refresh-token',expires_at:Math.floor(Date.now()/1000)+3600,expires_in:3600,token_type:'bearer',user:{id:'00000000-0000-4000-8000-000000000001',email:'fictional-admin@example.invalid',aud:'authenticated',role:'authenticated',app_metadata:{},user_metadata:{},created_at:new Date().toISOString()}}));});
 const page=await context.newPage();page.setDefaultTimeout(30000);
 const resets=[];let filters,schoolRequests=0,reset=false;
 await page.route('**/api/staff/config',route=>route.fulfill({json:{url:'https://deblssilgleuiccsgdcy.supabase.co',key:'fixture-anon',emailLoginEnabled:false}}));
 await page.route('**/auth/v1/logout*',route=>route.fulfill({status:204}));
 await page.route('**/api/staff/schools',route=>{schoolRequests++;return route.fulfill({json:{items:[],total:0}});});
 await page.route('**/api/staff/recruitment',route=>{
  const body=route.request().postDataJSON();
  if(body.action==='reset'){resets.push(body);if(resets.length===1)return route.fulfill({status:503,json:{error:'Fictional interrupted reset. Retry without changing the reason.'}});reset=true;return route.fulfill({json:{saved:true,version:2,allowance:6}});}
  filters=body.filters;if(filters.search==='forbidden')return route.fulfill({status:403,json:{error:'Only authorised recruitment administrators can read or reset applications.'}});
  const row={id:'00000000-0000-4000-8000-000000000002',email:'fictional-applicant@example.invalid',payload:{name:'Fictional applicant',phone:'08000000000',location:'Lagos',skills:'HTML and design',experience:'Fictional teaching',availability:'Daily',motivation:'Help people learn'},status:reset?'abandoned':'review_required',version:reset?2:1,used:3,attempt_allowance:reset?6:3,created_at:'2026-10-28T09:00:00Z',attempts:[1,2,3].map(i=>({id:'a'+i,status:'abandoned',correct:null,startedAt:'2026-10-28T09:00:00Z'})),resets:reset?[{reason:resets[1].reason,createdAt:'2026-10-28T09:00:00Z',previousAllowance:3,nextAllowance:6}]:[]};
  return route.fulfill({json:{items:filters.search==='no match'?[]:[row],total:filters.search==='no match'?0:51,offset:filters.offset}});
 });
 await page.goto(base+'/admin/recruitment',{waitUntil:'domcontentloaded',timeout:120000});
 await page.getByRole('heading',{name:'Instructor applications.'}).waitFor();await page.getByRole('button',{name:/Fictional applicant/}).click();
 assert.equal(schoolRequests,0);assert.equal(await page.getByRole('button',{name:'Grant three additional attempts'}).isDisabled(),true);
 await page.getByLabel('Reason for another three attempts').fill('Applicant reported a documented connectivity interruption.');
 await page.getByRole('button',{name:'Grant three additional attempts'}).click();await page.getByRole('alert').filter({hasText:'Fictional interrupted reset'}).waitFor();
 await page.getByRole('button',{name:'Grant three additional attempts'}).click();await page.getByRole('status').filter({hasText:'Three additional attempts granted'}).waitFor();assert.equal(resets[0].requestId,resets[1].requestId);
 await page.getByRole('button',{name:/Fictional applicant/}).click();await page.getByText('3 → 6 allowed attempts',{exact:false}).waitFor();assert.equal(await page.getByRole('button',{name:'Grant three additional attempts'}).count(),0);
 for(const width of [1440,768,390]){await page.setViewportSize({width,height:1000});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`review overflow at ${width}`);}
 await page.setViewportSize({width:1440,height:1000});await page.screenshot({path:'private-assets/recruitment-staff-review.png',fullPage:true});
 await page.getByLabel('Assessment status').selectOption('abandoned');await page.getByLabel('Find by name, email or location').fill('Fictional');await page.getByRole('button',{name:'Apply filters'}).click();await page.getByRole('status').filter({hasText:'51 matching applications'}).waitFor();assert.equal(filters.status,'abandoned');assert.equal(filters.search,'Fictional');assert.equal(filters.offset,0);
 await page.getByRole('button',{name:'Next applications'}).click();await page.getByRole('status').filter({hasText:'51 matching applications'}).waitFor();assert.equal(filters.offset,25);
 await page.getByLabel('Find by name, email or location').fill('no match');await page.getByRole('button',{name:'Apply filters'}).click();await page.getByText('No applications match these filters.').waitFor();assert.equal(filters.offset,0);
 await page.getByLabel('Find by name, email or location').fill('forbidden');await page.getByRole('button',{name:'Apply filters'}).click();await page.getByRole('alert').filter({hasText:'Only authorised recruitment administrators'}).waitFor();assert.equal(await page.getByRole('button',{name:/Fictional applicant/}).count(),0);
 await page.getByRole('button',{name:'Sign out',exact:true}).click();await page.getByRole('heading',{name:'Staff sign-in'}).waitFor();assert.equal(await page.getByRole('button',{name:'Email sign-in link'}).isDisabled(),true);
 console.log('PASS mocked staff recruitment UI: filters, pagination, details/history, explained reset, idempotent retry, empty/forbidden states, 1440/768/390 fit, sign-out. No real applicants or emails.');
 for(const [headers,status] of [[{Origin:base},401],[{Origin:'https://evil.invalid',Authorization:'Bearer bad'},403]]){const response=await fetch(base+'/api/staff/recruitment',{method:'POST',headers:{'Content-Type':'application/json',...headers},body:JSON.stringify({action:'list',filters:{}})});assert.equal(response.status,status);}
 console.log('PASS real HTTP: anonymous and cross-origin staff requests denied.');
}catch(error){console.error(error);process.exitCode=1;}finally{await browser.close();}
