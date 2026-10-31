import {chromium} from 'file:///C:/Users/Forge/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'chrome',headless:true}),base=process.env.TEST_BASE_URL||'http://localhost:3009';
try{
 const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
 await context.addInitScript(()=>{localStorage.setItem('forge-cookie-consent',JSON.stringify({necessary:true,analytics:false,marketing:false}));sessionStorage.setItem('forge-staff-preview',JSON.stringify({access_token:'fixture-staff',refresh_token:'fixture-refresh',expires_at:Math.floor(Date.now()/1000)+3600,expires_in:3600,token_type:'bearer',user:{id:'00000000-0000-4000-8000-000000000001',email:'fictional-admin@example.invalid',aud:'authenticated',role:'authenticated',app_metadata:{},user_metadata:{},created_at:new Date().toISOString()}}));});
 const page=await context.newPage();page.setDefaultTimeout(20000);
 await page.route('**/api/recruitment/config',r=>r.fulfill({json:{url:'https://deblssilgleuiccsgdcy.supabase.co',key:'fixture-anon',emailLoginEnabled:false}}));
 await page.route('**/auth/v1/logout*',r=>r.fulfill({status:204}));
 const row={id:'00000000-0000-4000-8000-000000000002',traineeId:'TRN-fixture',name:'Fictional instructor',programme:'techup',lessonId:'day-1',submittedAt:new Date().toISOString(),status:'awaiting_review'};
 let review=null,firstId,fail=true,conflict=false;
 await page.route('**/api/staff/training',r=>{const p=r.request().postDataJSON();assert.equal(r.request().headers().authorization,'Bearer fixture-staff');assert.ok(!('actorId' in p));const assignment={...row,text:'Fictional lesson plan: explain a noticeboard, show a demonstration and guide practice.',review,history:review?[review]:[],current:true};delete assignment.status;
  if(p.operation==='list'){const status=review?.status||'awaiting_review',items=p.filter==='all'||p.filter===status?[{...row,status}]:[];return r.fulfill({json:{total:items.length,offset:p.offset,items}});}
  if(p.operation==='detail')return r.fulfill({json:{assignment}});
  if(conflict)return r.fulfill({status:409,json:{error:'This assignment or review changed. Reload the assignment before saving feedback.'}});
  if(fail){fail=false;firstId=p.requestId;return r.fulfill({status:503,json:{error:'Fictional interrupted save. Keep your feedback and retry.'}});}
  assert.equal(p.requestId,firstId);review={id:p.requestId,status:p.status,feedback:p.feedback,reviewedAt:new Date().toISOString()};return r.fulfill({json:{assignment:{...assignment,review,history:[review]}}});
 });
 await page.goto(base+'/admin/training',{waitUntil:'domcontentloaded',timeout:120000});
 await page.getByRole('button',{name:/Fictional instructor/}).click();
 const feedback='Show one concrete learner activity, then explain how you will check understanding.';
 await page.getByLabel('Feedback for the trainee',{exact:true}).fill(feedback);
 await page.getByRole('button',{name:'Save feedback',exact:true}).click();
 await page.getByText('Fictional interrupted save. Keep your feedback and retry.',{exact:true}).waitFor();
 assert.equal(await page.getByLabel('Feedback for the trainee',{exact:true}).inputValue(),feedback);
 await page.getByRole('button',{name:'Save feedback',exact:true}).click();
 await page.getByText('Feedback saved. The trainee can see it when they refresh their preparation.',{exact:true}).waitFor();
 assert.equal(review.status,'needs_changes');
 await page.screenshot({path:'private-assets/training-reviews-desktop.png',fullPage:true});
 await page.getByLabel('Review status',{exact:true}).selectOption('reviewed');
 await page.getByText('No assignments match this status.',{exact:true}).waitFor();
 await page.getByLabel('Review status',{exact:true}).selectOption('needs_changes');
 await page.getByRole('button',{name:/Fictional instructor/}).click();
 await page.getByLabel('Feedback for the trainee',{exact:true}).waitFor();
 for(const width of [1440,768,390]){await page.setViewportSize({width,height:1000});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));}
 conflict=true;await page.getByLabel('Feedback for the trainee',{exact:true}).fill('A revised feedback draft that must survive a stale-record conflict.');await page.getByRole('button',{name:'Save feedback',exact:true}).click();
 await page.getByText('This assignment or review changed. Reload the assignment before saving feedback.',{exact:true}).waitFor();
 assert.ok((await page.getByLabel('Feedback for the trainee',{exact:true}).inputValue()).startsWith('A revised'));
 await page.getByRole('button',{name:'Sign out',exact:true}).click();await page.getByRole('heading',{name:'Staff sign-in',exact:true}).waitFor();
 console.log('Staff assignment review browser passed: filtering UI, details, feedback retry, stale conflict, mobile fit, sign-out. Fictional identity only.');
}finally{await browser.close();}
