import {chromium} from 'file:///C:/Users/Forge/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
const base=process.env.TEST_BASE_URL||'http://localhost:3013';
assert(['localhost','127.0.0.1'].includes(new URL(base).hostname));
const browser=await chromium.launch({channel:'chrome',headless:true});let states=0;
try{
 const page=await browser.newPage({reducedMotion:'reduce'});
 await page.addInitScript(()=>localStorage.setItem('forge-cookie-consent',JSON.stringify({necessary:true,analytics:false,marketing:false})));
 for(const path of ['/programmes','/programmes/techup','/programmes/elytech']){
  await page.goto(base+path,{waitUntil:'networkidle'});
  for(const width of [320,768,1440]){
   await page.setViewportSize({width,height:1000});
   const buttons=page.locator('main button[aria-controls$="panel"],main button[aria-controls="learning-stage-detail"]');
   for(let i=0;i<await buttons.count();i++){
    const button=buttons.nth(i);await button.click();const id=await button.getAttribute('aria-controls');
    const fit=await page.locator('#'+id).evaluate(box=>{
     // LearningStages has an unpainted inner grid inside its raised surface.
     // Measure glyphs against the actual visible card, not that inner line box.
     const surface=getComputedStyle(box).boxShadow==='none'?box.parentElement:box;
     const outer=surface.getBoundingClientRect();return [...box.querySelectorAll('p,h3')].every(el=>{const range=document.createRange();range.selectNodeContents(el);return [...range.getClientRects()].every(r=>r.left>=outer.left-1&&r.right<=outer.right+1&&r.top>=outer.top-1&&r.bottom<=outer.bottom+1);});
    });assert(fit,`${path} ${width} ${await button.innerText()} panel overflow`);states++;
   }
  }
 }
 await page.goto(base+'/endless-possibilities',{waitUntil:'networkidle'});
 await page.getByRole('button',{name:/Offer space or power/}).click();assert.match(await page.locator('#contribution-detail').innerText(),/generator|fuel/);
 assert.equal(await page.getByRole('link',{name:/Offer a weekend learning space or power/}).getAttribute('href'),'/endless-possibilities/offer-a-space');
 await page.goto(base+'/partner/contribute',{waitUntil:'networkidle'});await page.locator('#donation-amount').fill('5000');await page.locator('#donation-purpose').selectOption({label:'Laptop and learning support'});
 await page.getByRole('button',{name:/View bank-transfer instructions/}).click();await page.getByRole('heading',{name:'Make your transfer through your bank.'}).waitFor();assert.match(await page.locator('main').innerText(),/Viewing these instructions does not confirm a payment/);
 await page.goto(base+'/programmes',{waitUntil:'networkidle'});await page.setViewportSize({width:1280,height:1000});await page.locator('#learning-stage-detail').scrollIntoViewIfNeeded();await page.screenshot({path:'docs/redesign/final-review/programme-learning-desktop.png'});
 await page.setViewportSize({width:390,height:1000});await page.locator('#learning-stage-detail').scrollIntoViewIfNeeded();await page.screenshot({path:'docs/redesign/final-review/programme-learning-mobile.png'});
 console.log(`PASS ${states} interactive programme states, space contribution navigation and donation instructions. No payment, enquiry or email sent.`);
}finally{await browser.close();}
