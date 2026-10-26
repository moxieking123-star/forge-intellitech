import {chromium} from 'file:///C:/Users/Forge/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
import {mkdirSync,writeFileSync} from 'node:fs';
const base=process.env.TEST_BASE_URL||'http://localhost:3009';
assert(['localhost','127.0.0.1'].includes(new URL(base).hostname));
const dir='docs/redesign/visual-polish';mkdirSync(dir,{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});
const checks=[],errors=[];
try{
 const context=await browser.newContext({viewport:{width:1440,height:1000}});
 await context.addInitScript(()=>localStorage.setItem('forge-cookie-consent',JSON.stringify({necessary:true,analytics:false,marketing:false})));
 const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
 // This visual check must never submit a real application, email or other mutation.
 await page.route('**/api/**',async route=>route.request().method()==='GET'?route.continue():route.fulfill({status:503,json:{error:'Visual verification: no real submissions.'}}));
 for(const route of ['/','/about','/contact','/programmes','/programmes/techup','/programmes/elytech','/programmes/resources','/programmes/onboard','/join/apply?purpose=volunteer','/earn-with-forge','/endless-possibilities','/endless-possibilities/give-a-child-a-laptop','/products','/blog','/admin']){
  await page.goto(base+route,{waitUntil:'domcontentloaded',timeout:120000});
  await page.locator('main h1').first().waitFor();
  for(const width of [320,390,768,1440]){
   await page.setViewportSize({width,height:1000});
   await page.evaluate(()=>document.fonts.ready.then(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)))));
   const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
   assert.equal(overflow,false,route+' overflow at '+width);
  }
  assert.equal(await page.locator('a[href="/work"]').count(),0,route+' obsolete navigation');
  if(route==='/about'){
   const gratitude=page.locator('section[aria-labelledby="gratitude-title"]');
   const word=gratitude.locator('h2 span');
   assert.equal(await word.innerText(),'Jehovah.');
   const metrics=await word.evaluate(el=>({size:parseFloat(getComputedStyle(el).fontSize),parentSize:parseFloat(getComputedStyle(el.parentElement).fontSize),color:getComputedStyle(el).color}));
   assert(metrics.size>metrics.parentSize*1.5);
   assert.equal(metrics.color,'rgb(255, 213, 130)');
   await gratitude.screenshot({path:dir+'/gratitude-desktop.png'});
   await page.setViewportSize({width:390,height:844});
   await gratitude.screenshot({path:dir+'/gratitude-mobile.png'});
  }
  if(route==='/blog'){
   const cards=page.locator('main article');
   for(const card of await cards.all()){
    const padding=await card.evaluate(el=>parseFloat(getComputedStyle(el).paddingLeft));
    assert(padding>=22,'Story card has a comfortable reading inset');
   }
  }
  if(route==='/contact'){
   const input=page.locator('main input[type=email]').first();await input.focus();
   const style=await input.evaluate(el=>({height:el.getBoundingClientRect().height,radius:parseFloat(getComputedStyle(el).borderRadius),outline:getComputedStyle(el).outlineStyle}));
   assert(style.height>=54&&style.radius>=12&&style.outline!=='none');
   await page.screenshot({path:dir+'/contact-desktop.png',fullPage:true});
  }
  if(route==='/admin'){
   await page.getByRole('heading',{name:/A little care/}).waitFor();
   assert.equal(await page.getByLabel('Staff email',{exact:true}).count(),1);
   await page.screenshot({path:dir+'/admin-desktop.png',fullPage:true});
   await page.setViewportSize({width:390,height:844});await page.screenshot({path:dir+'/admin-mobile.png',fullPage:true});
   await page.emulateMedia({reducedMotion:'reduce'});
   const animation=await page.locator('aside[aria-label="A workspace built around people"] svg').evaluate(el=>getComputedStyle(el).animationName);
   assert.equal(animation,'none');await page.emulateMedia({reducedMotion:'no-preference'});
  }
  checks.push(route+' fits 320/390/768/1440 and has no obsolete Work link');console.log('Checked '+route);
 }
 const response=await context.request.get(base+'/work',{maxRedirects:0});assert.equal(response.status(),308);assert(response.headers().location.endsWith('/products'));
 const sitemap=await(await context.request.get(base+'/sitemap.xml')).text();assert(!sitemap.includes('<loc>https://forgeintellitech.com/work</loc>'));assert(sitemap.includes('/products'));
 assert.deepEqual(errors,[]);
 checks.push('Work route HTTP308 to Products; sitemap excludes Work; substantial keyboard-focusable contact fields; staff reduced motion; no runtime errors or real submissions');
 writeFileSync(dir+'/results.json',JSON.stringify({checks,realSubmissions:0},null,2));console.log(checks.join('\n'));
}finally{await browser.close();}
