import {chromium} from 'file:///C:/Users/Forge/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
const base=process.env.TEST_BASE_URL||'http://localhost:3012';
const browser=await chromium.launch({channel:'chrome',headless:true});
const user={id:'00000000-0000-4000-8000-000000000001',email:'fictional@example.invalid',aud:'authenticated',role:'authenticated',app_metadata:{},user_metadata:{},created_at:new Date().toISOString(),email_confirmed_at:new Date().toISOString()};
const application={id:'fixture-app',status:'draft',fields:{name:'Fictional applicant',phone:'08000000000',location:'Lagos',experience:'I help people learn.',skills:'HTML and design',availability:'Three hours daily',motivation:'Help children build useful things.',consent:true}};
const questions=Array.from({length:30},(_,i)=>({id:'q'+(i+1),prompt:`Fictional browser question ${i+1}: which tool would help a learner organise ideas before beginning a practical technology project?`,options:['A clear plan','A random guess','No preparation','Avoiding the project'].map((text,j)=>({id:String.fromCharCode(97+j),text}))}));
async function setup({signedIn=true,remaining=3,history=[],correct=23,seconds=300,failSave=false}={}){
 const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
 if(signedIn)await context.addInitScript(({user})=>sessionStorage.setItem('forge-recruitment',JSON.stringify({access_token:'fixture-access-token',refresh_token:'fixture-refresh-token',expires_at:Math.floor(Date.now()/1000)+3600,expires_in:3600,token_type:'bearer',user})),{user});
 const page=await context.newPage();page.setDefaultTimeout(30000);
 const calls=[];let active=null,failed=false,passed=false;
 await page.route('**/api/recruitment/config',route=>route.fulfill({json:{url:'https://deblssilgleuiccsgdcy.supabase.co',key:'fixture-anon',emailLoginEnabled:false}}));
 await page.route('**/auth/v1/user*',route=>route.fulfill({json:user}));
 await page.route('**/auth/v1/logout*',route=>route.fulfill({status:204}));
 await page.route('**/api/recruitment',async route=>{
  if(route.request().method()==='GET')return route.fulfill({json:{application:{...application,status:passed?'passed':'draft'},attempts:history,remaining,serverNow:new Date().toISOString()}});
  const body=route.request().postDataJSON();calls.push(body);
  if(body.action==='save')return route.fulfill({json:{id:application.id,status:'draft'}});
  if(body.action==='start'){
   const startedAt=new Date().toISOString(),deadlineAt=new Date(Date.now()+300000).toISOString();active={id:'00000000-0000-4000-8000-000000000002',status:'in_progress',startedAt,deadlineAt,serverNow:new Date(Date.parse(deadlineAt)-seconds*1000).toISOString(),questions};
   history.push({...active,questions:undefined,correct:null});remaining--;return route.fulfill({json:active});
  }
  if(body.action==='answer'){
   if(failSave&&!failed){failed=true;return route.fulfill({status:503,json:{error:'Fictional save outage'}});}return route.fulfill({json:{saved:true}});
  }
  if(body.action==='submit'){passed=correct>=23;history.at(-1).status=passed?'passed':'not_passed';history.at(-1).correct=correct;return route.fulfill({json:{id:active.id,status:history.at(-1).status,correct,total:30}});}
  if(body.action==='abandon'){const item=history.find(item=>item.id===body.attemptId);if(item)item.status='abandoned';return route.fulfill({json:{id:body.attemptId,status:'abandoned'}});}
 });
 await page.goto(base+'/join/apply',{waitUntil:'domcontentloaded',timeout:120000});
 return {page,context,calls};
}
async function assertReadableHeading(heading){
 const ratio=await heading.evaluate(node=>{
  const luminance=color=>color.match(/[\d.]+/g).slice(0,3).map(Number).map(n=>n/255).map(n=>n<=.04045?n/12.92:((n+.055)/1.055)**2.4).reduce((sum,n,i)=>sum+n*[.2126,.7152,.0722][i],0);
  const foreground=luminance(getComputedStyle(node).color);
  let background=1;
  for(let parent=node;parent;parent=parent.parentElement){
   const color=getComputedStyle(parent).backgroundColor;
   if(color.startsWith('rgb(')){background=luminance(color);break;}
  }
  return (Math.max(foreground,background)+.05)/(Math.min(foreground,background)+.05);
 });
 assert.ok(ratio>=4.5,`Heading contrast was ${ratio.toFixed(2)}:1`);
}
try{
 const login=await setup({signedIn:false});await login.page.getByRole('heading',{name:'A person, not just a CV.'}).waitFor();assert.equal(await login.page.getByRole('button',{name:'Email my sign-in link'}).isDisabled(),true);await login.context.close();
 const main=await setup({failSave:true});const {page,calls}=main;
 await page.getByRole('heading',{name:'Tell us what you bring.'}).waitFor();
 await assertReadableHeading(page.getByRole('heading',{level:1}));
 for(const width of [1440,768,390]){await page.setViewportSize({width,height:1000});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`form overflow at ${width}`);}
 await page.screenshot({path:'private-assets/recruitment-application-mobile.png',fullPage:true});
 await page.getByRole('checkbox').check();await page.getByRole('button',{name:/Save and start my five-minute assessment/}).click();
 await page.getByRole('heading',{name:'Show us the basics.'}).waitFor();assert.equal(calls.filter(c=>c.action==='start').length,1);
 await assertReadableHeading(page.getByRole('heading',{name:'Show us the basics.'}));
 await page.getByLabel('A clear plan',{exact:true}).check();await page.getByRole('alert').filter({hasText:'Some answers'}).waitFor();await page.getByRole('button',{name:'Retry saving'}).click();await page.getByRole('status').filter({hasText:'All selected answers saved'}).waitFor();
 for(const width of [1440,768,390]){await page.setViewportSize({width,height:1000});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`assessment overflow at ${width}`);}
 await page.setViewportSize({width:1440,height:1000});await page.screenshot({path:'private-assets/recruitment-assessment-desktop.png',fullPage:true});
 await page.getByRole('button',{name:'Question 30',exact:true}).click();await page.getByRole('button',{name:'Submit assessment',exact:true}).click();await page.getByRole('heading',{name:'A beginning worth building on.'}).waitFor();assert.match(await page.locator('main').innerText(),/training access is being prepared/);
 await page.getByRole('button',{name:'Back to my application'}).click();await page.getByRole('heading',{name:'You have something to build on.'}).waitFor();assert.equal(calls.filter(c=>c.action==='abandon').length,0);await main.context.close();
 const nonpass=await setup({correct:22});await nonpass.page.getByRole('heading',{name:'Tell us what you bring.'}).waitFor();await nonpass.page.getByRole('checkbox').check();await nonpass.page.getByRole('button',{name:/Save and start my five-minute assessment/}).click();await nonpass.page.getByRole('button',{name:'Question 30',exact:true}).click();await nonpass.page.getByRole('button',{name:'Submit assessment',exact:true}).click();await nonpass.page.getByText(/22 of 30 correctly/).waitFor();await nonpass.page.getByRole('button',{name:'Back to my application'}).click();await nonpass.page.getByText('2 attempts remaining.',{exact:true}).waitFor();await nonpass.context.close();
 const locked=await setup({remaining:0,history:[1,2,3].map(n=>({id:'lock'+n,status:'not_passed',correct:20}))});await locked.page.getByRole('heading',{name:'Three attempts used.'}).waitFor();assert.match(await locked.page.getByRole('link',{name:'Contact the Forge team →'}).getAttribute('href'),/^mailto:work@/);await locked.context.close();
 const interrupted=await setup({remaining:2,history:[{id:'old',status:'in_progress',correct:null}]});await interrupted.page.getByRole('heading',{name:'An earlier assessment is still open.'}).waitFor();assert.equal(interrupted.calls.length,0);await interrupted.page.getByRole('button',{name:'Close the earlier attempt'}).click();await interrupted.page.getByRole('heading',{name:'Tell us what you bring.'}).waitFor();assert.equal(interrupted.calls[0].action,'abandon');await interrupted.context.close();
 const expiry=await setup({correct:0,seconds:1});await expiry.page.getByRole('heading',{name:'Tell us what you bring.'}).waitFor();await expiry.page.getByRole('checkbox').check();await expiry.page.getByRole('button',{name:/Save and start my five-minute assessment/}).click();await expiry.page.getByRole('heading',{name:'There is room to learn.'}).waitFor();assert.equal(expiry.calls.filter(c=>c.action==='submit').length,1);await expiry.context.close();
 const leave=await setup();await leave.page.getByRole('heading',{name:'Tell us what you bring.'}).waitFor();await leave.page.getByRole('checkbox').check();await leave.page.getByRole('button',{name:/Save and start my five-minute assessment/}).click();await leave.page.getByRole('heading',{name:'Show us the basics.'}).waitFor();await leave.page.reload({waitUntil:'domcontentloaded'});await leave.page.getByRole('heading',{name:'Tell us what you bring.'}).waitFor();assert.ok(leave.calls.filter(c=>c.action==='abandon').length>=1);await leave.context.close();
 console.log('PASS mocked recruitment UI: sign-in gate, form/start, save outage/retry, navigation, pass/nonpass, lock, interrupted return, expiry, refresh, desktop/tablet/mobile fit. No real emails or applicants created.');
 const cross=await fetch(base+'/api/recruitment',{method:'POST',headers:{Origin:'https://evil.invalid','Content-Type':'application/json',Authorization:'Bearer invalid'},body:'{"action":"submit","attemptId":"bad"}'});assert.equal(cross.status,403);
 const anonymous=await fetch(base+'/api/recruitment');assert.equal(anonymous.status,401);console.log('PASS real local HTTP: cross-origin and anonymous requests denied.');
}catch(error){console.error(error);process.exitCode=1;}finally{await browser.close();}
