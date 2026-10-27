import {chromium} from 'file:///C:/Users/Forge/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
import {writeFileSync,mkdirSync,readFileSync} from 'node:fs';
const base=process.env.TEST_BASE_URL||'http://localhost:3013';
assert(['localhost','127.0.0.1'].includes(new URL(base).hostname),'Use local site; no real enquiries');
const browser=await chromium.launch({channel:'chrome',headless:true});
const results=[],links=new Set(),assets=new Set(),issues=[];
mkdirSync('docs/redesign/final-review',{recursive:true});
try{
 const context=await browser.newContext({reducedMotion:'reduce'});
 await context.addInitScript(()=>localStorage.setItem('forge-cookie-consent',JSON.stringify({necessary:true,analytics:false,marketing:false})));
 const page=await context.newPage();
 const sitemap=await (await fetch(base+'/sitemap.xml')).text();
 const routes=process.env.FORM_ONLY?[]:[...new Set([...sitemap.matchAll(/<loc>https:\/\/(?:www\.)?forgeintellitech.com([^<]*)<\/loc>/g)].map(x=>x[1]||'/').concat(['/partner/contribute','/join/apply','/programmes/enquire','/endless-possibilities/give-a-child-a-laptop/donate','/endless-possibilities/give-a-child-a-laptop/request-support','/earn-with-forge/onboard']))];
 if(!process.env.FORM_ONLY)assert(routes.length>20,'sitemap routes discovered');
 for(const route of routes){
  const response=await page.goto(base+route,{waitUntil:'domcontentloaded',timeout:90000});
  assert(response.status()<400,`${route}: HTTP${response.status()}`);
  await page.evaluate(()=>document.fonts.ready);
  for(const width of [320,390,768,1440]){
   await page.setViewportSize({width,height:1000});
   const data=await page.evaluate(()=>{
    const boxes=[];
    for(const el of document.querySelectorAll('main p,main h2,main h3,main li')){
     if(el.closest('svg,[aria-hidden="true"]')||!el.getClientRects().length)continue;
     let box=el.parentElement;
     while(box&&box.tagName!=='MAIN'&&getComputedStyle(box).boxShadow==='none')box=box.parentElement;
     if(!box||box.tagName==='MAIN'||getComputedStyle(box).boxShadow==='none')continue;
     const b=box.getBoundingClientRect(),range=document.createRange();range.selectNodeContents(el);
     if([...range.getClientRects()].some(r=>r.width>0&&r.height>0&&(r.left<b.left-2||r.right>b.right+2||r.top<b.top-2||r.bottom>b.bottom+2)))boxes.push({text:el.textContent.slice(0,75),box:box.className});
    }
    return {overflow:document.documentElement.scrollWidth>innerWidth,h1:document.querySelectorAll('main h1').length,boxes,brokenFragments:[...document.querySelectorAll('a[href^="#"]')].map(a=>a.getAttribute('href')).filter(h=>h.length>1&&!document.getElementById(decodeURIComponent(h.slice(1)))),links:[...document.querySelectorAll('a[href]')].map(a=>a.getAttribute('href')),images:[...document.images].map(i=>i.getAttribute('src'))};
   });
   if(data.overflow||data.boxes.length||data.brokenFragments.length||data.h1!==1)issues.push({route,width,...data,links:undefined,images:undefined});
   for(const href of data.links)if(href.startsWith('/')&&!href.startsWith('//')&&!href.startsWith('/_next/'))links.add(href.split('#')[0]);
   for(const src of data.images)if(src?.startsWith('/')&&!src.startsWith('/_next/'))assets.add(src);
   results.push({route,width,overflow:data.overflow,boxOverflow:data.boxes.length});
  }
  console.log('CHECK',route);
 }
 for(const href of new Set([...links,...assets])){const r=await fetch(base+href,{signal:AbortSignal.timeout(30000)});if(r.status>=400)issues.push({href,status:r.status});await r.body?.cancel();}
 if(!process.env.FORM_ONLY)writeFileSync('docs/redesign/final-review/browser-results.json',JSON.stringify({routes:routes.length,widthChecks:results.length,internalTargets:links.size,assets:assets.size,issues,results},null,2));
 const newPage=await context.newPage();let sent=0,payload;
 await newPage.route('**/api/contact',async r=>{sent++;payload=r.request().postDataJSON();await r.fulfill({status:201,json:{id:'internal-ui-only',success:true}});});
 await newPage.goto(base+'/endless-possibilities/offer-a-space',{waitUntil:'networkidle',timeout:90000});
 for(const [id,value] of Object.entries({name:'Fictional adult',email:'space@invalid.example',phone:'08000000000',location:'Fictional Lagos',authority:'Authorised manager'}))await newPage.locator('#'+id).fill(value);
 await newPage.locator('#spaceType').selectOption({label:'A space with power'});
 await newPage.getByRole('button',{name:'Next',exact:true}).click();
 for(const [id,value] of Object.entries({capacity:'25 students',availability:'Saturdays, 10am to 2pm',facilities:'Tables, chairs, accessible toilets and sockets',powerDetails:'Fictional generator and fuel support for testing only'}))await newPage.locator('#'+id).fill(value);
 await newPage.locator('#power').selectOption({label:'Provide a generator and fuel'});await newPage.locator('#permission').check();
 await newPage.getByRole('button',{name:'Review answers',exact:true}).click();await newPage.locator('#contactConsent').check();
 await newPage.getByRole('button',{name:/Send/}).click();await newPage.getByRole('heading',{name:'Enquiry received.',exact:true}).waitFor();
 assert.equal(sent,1);assert.equal(payload.submissionSource,'endless-possibilities');assert.match(payload.message,/25 students/);assert.match(payload.message,/generator and fuel/);
 const report=process.env.FORM_ONLY?JSON.parse(readFileSync('docs/redesign/final-review/browser-results.json','utf8')):{routes:routes.length,widthChecks:results.length,internalTargets:links.size,assets:assets.size,issues,results};
 report.spaceSubmission='intercepted; no real enquiry or email';writeFileSync('docs/redesign/final-review/browser-results.json',JSON.stringify(report,null,2));
 console.log(JSON.stringify({routes:routes.length,widthChecks:results.length,internalTargets:links.size,assets:assets.size,issues},null,2));
 assert.equal(issues.length,0,'Review recorded layout/link issues');
}finally{await browser.close();}
