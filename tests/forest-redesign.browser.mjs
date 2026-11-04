import {chromium} from 'file:///C:/Users/Forge/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
import {mkdirSync,writeFileSync} from 'node:fs';
const base=process.env.TEST_BASE_URL||'http://127.0.0.1:3016';
assert(['127.0.0.1','localhost'].includes(new URL(base).hostname),'Local verification only');
const out='docs/redesign/forest-review';mkdirSync(out,{recursive:true});
console.log('Launching local Chrome for public journey verification.');
const browser=await chromium.launch({channel:'chrome',headless:true});
console.log('Chrome ready.');
const results=[],errors=[],payloads=[];
try{
 const context=await browser.newContext({reducedMotion:'reduce'});
 await context.addInitScript(()=>localStorage.setItem('forge-cookie-consent',JSON.stringify({necessary:true,analytics:false,marketing:false})));
 let failNext=false;
 await context.route('**/api/**',async route=>{
   if(route.request().method()==='POST'){
     assert(['/api/contact','/api/laptop-intake'].includes(new URL(route.request().url()).pathname),'Unexpected submission blocked');
     payloads.push(route.request().postDataJSON());
     const status=failNext?503:201;failNext=false;
     return route.fulfill({status,contentType:'application/json',body:JSON.stringify({success:status===201})});
   }
   return route.continue();
 });
 const page=await context.newPage();page.on('pageerror',error=>errors.push(error.message));
 const sitemap=await(await context.request.get(base+'/sitemap.xml',{timeout:30000})).text();
 const routes=[...new Set([...sitemap.matchAll(/<loc>https:\/\/(?:www\.)?forgeintellitech.com([^<]*)<\/loc>/g)].map(match=>match[1]||'/').concat(['/partner/contribute','/join/apply','/programmes/enquire','/endless-possibilities/give-a-child-a-laptop/donate','/endless-possibilities/give-a-child-a-laptop/request-support','/earn-with-forge/onboard']))].filter(route=>!route.startsWith('/admin'));
 assert(routes.length>20,'Discover public routes');
 for(const width of (process.env.TEST_FORMS_ONLY==='true'?[]:[1440,390])){
   await page.setViewportSize({width,height:950});
   for(const route of routes){
     console.log(`Checking ${route} at ${width}`);
     const response=await page.goto(base+route,{waitUntil:'networkidle',timeout:120000});
     assert(response.status()<400,`${route}: HTTP ${response.status()}`);
     await page.locator('h1').first().waitFor();
     const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2);
     if(overflow){await page.screenshot({path:`${out}/overflow-${width}.png`,fullPage:true});console.log(await page.evaluate(()=>[...document.querySelectorAll('body *')].map(element=>({tag:element.tagName,class:element.className,left:element.getBoundingClientRect().left,right:element.getBoundingClientRect().right})).filter(rect=>rect.right>innerWidth+2||rect.left< -2).slice(0,30)));}
     assert(!overflow,`${route} overflows at ${width}`);
     assert.equal(await page.locator('main#main-content').count(),1,`${route}: main landmark`);
     if(['/','/blog','/contact','/earn-with-forge','/endless-possibilities/give-a-child-a-laptop/request-support'].includes(route)){
       await page.evaluate(async()=>{for(let position=0;position<document.body.scrollHeight;position+=700){scrollTo(0,position);await new Promise(resolve=>setTimeout(resolve,120));}await Promise.race([Promise.all([...document.images].map(image=>image.decode().catch(()=>{}))),new Promise(resolve=>setTimeout(resolve,2000))]);scrollTo(0,0);});
       await page.screenshot({path:`${out}/${route==='/'?'home':route.split('/').filter(Boolean).join('-')}-${width}.png`,fullPage:true,caret:'initial'});
     }
     results.push({route,width,status:response.status(),overflow});
   }
 }
 await page.setViewportSize({width:390,height:950});await page.goto(base);const menu=page.getByRole('button',{name:'Open navigation'});await menu.click();assert(await page.getByRole('dialog',{name:'Website navigation'}).isVisible());await page.keyboard.press('Escape');assert.equal(await menu.getAttribute('aria-expanded'),'false');
 await page.getByRole('switch',{name:'Data-light mode'}).click();assert.equal(await page.locator('.fg-hero img').count(),0);await page.reload();await page.waitForFunction(()=>document.querySelector('[role=switch].fg-data-toggle')?.getAttribute('aria-checked')==='true');assert.equal(await page.getByRole('switch',{name:'Data-light mode'}).getAttribute('aria-checked'),'true');await page.getByRole('switch',{name:'Data-light mode'}).click();
 await page.goto(base+'/contact');const form=page.locator('form[data-forge-form]');
 await form.locator('[name=name]').fill('Fictional Review');await form.locator('[name=email]').fill('review@example.invalid');await form.locator('[name=message]').fill('Fictional enquiry, intercepted locally.');await form.locator('[name=consent]').check();
 failNext=true;await form.getByRole('button',{name:'Start a conversation'}).click();await page.getByRole('alert').waitFor();assert.equal(await form.locator('[name=message]').inputValue(),'Fictional enquiry, intercepted locally.');await form.getByRole('button',{name:'Start a conversation'}).click();await page.getByText('Your enquiry is received.',{exact:true}).waitFor();
 for(const role of ['Teacher','Parent or guardian','Student']){
   await page.goto(base+'/endless-possibilities/give-a-child-a-laptop/request-support');
   const wizard=page.locator('form[data-forge-form]');await wizard.locator('[name=role]').selectOption(role);await wizard.locator('[name=applicantName]').fill('Fictional Applicant');await wizard.locator('[name=email]').fill('review@example.invalid');
   if(role==='Teacher')await wizard.locator('[name=teacherSchool]').fill('Fictional School');else assert.equal(await wizard.locator('[name=teacherSchool]').count(),0);
   await wizard.getByRole('button',{name:'Continue'}).click();await wizard.locator('[name=studentName]').fill('Fictional');await wizard.locator('[name=school]').fill('Fictional School');await wizard.locator('[name=class]').selectOption('SS2');await wizard.locator('[name=location]').fill('Lagos');await wizard.locator('[name=schoolCategory]').selectOption('Public secondary school');await wizard.locator('[name=guardianName]').fill('Fictional Guardian');await wizard.locator('[name=guardianContact]').fill('08000000000');await wizard.getByRole('button',{name:'Continue'}).click();await wizard.locator('[name=purpose]').selectOption('Learn to build from the beginning');await wizard.locator('[name=conditionPreference]').selectOption('New or used is fine');await wizard.locator('[name=skills]').fill('Starting with typing');await wizard.locator('[name=parentAwareness]').selectOption('Yes, they know');await wizard.locator('[name=donorConversation]').selectOption('No, I would rather not');await wizard.locator('[name=access]').selectOption('No regular computer access');await wizard.locator('[name=project]').fill('Build a school website.');await wizard.locator('[name=source]').selectOption('School visit or workshop');await wizard.locator('[name=sourceDetail]').fill('Fictional classroom session');await wizard.getByRole('button',{name:'Continue'}).click();await wizard.getByRole('button',{name:'Back',exact:true}).click();assert.equal(await wizard.locator('[name=project]').inputValue(),'Build a school website.');await wizard.getByRole('button',{name:'Continue'}).click();for(const checkbox of await wizard.locator('input[type=checkbox]').all())await checkbox.check();await wizard.getByRole('button',{name:'Send support request'}).click();await page.getByText('Your enquiry is received.',{exact:true}).waitFor();assert.equal(payloads.at(-1).values.sourceDetail,'Fictional classroom session');
 }
 await page.goto(base+'/blog');await page.getByRole('searchbox').fill('zzzz-no-match');await page.getByText('No stories found for that search.').waitFor();await page.getByRole('button',{name:'Show all stories'}).click();assert(await page.locator('.fg-journal-card').count()>0);await page.locator('.fg-journal-card a').first().click();await page.locator('.fg-article-prose').waitFor();assert(await page.locator('.fg-article-prose h2').count()>0);
 assert.deepEqual(errors,[],'No unhandled browser errors');
 writeFileSync(`${out}/results.json`,JSON.stringify({results,errors,interceptedSubmissions:payloads.length,checks:['mobile menu','persistent data-light mode','enquiry failure/retry','three laptop applicant roles','discovery source','back preserves answers','journal search and article']},null,2));
 console.log(`PASS: ${results.length} route/viewport checks; ${payloads.length} intercepted submissions; no real requests sent.`);
}finally{await browser.close();}
