import {chromium} from 'file:///C:/Users/Forge/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
import {parseLaptopIntake} from '../lib/laptop-initiative.ts';
const base='http://127.0.0.1:3016';
const browser=await chromium.launch({channel:'chrome',headless:true});
try {
 const context=await browser.newContext({reducedMotion:'reduce'});
 let submissions=0;
 await context.route('**/api/laptop-intake',async route=>{
  assert.equal(route.request().method(),'POST');
  const body=route.request().postDataJSON();assert.equal(body.kind,'donor');assert(parseLaptopIntake(body));submissions++;
  return route.fulfill({status:201,contentType:'application/json',body:'{"success":true}'});
 });
 const page=await context.newPage();
 for(const width of [1440,390]){
  await page.setViewportSize({width,height:950});
  await page.goto(base+'/endless-possibilities/give-a-child-a-laptop/donate',{waitUntil:'networkidle'});
  const form=page.locator('form[data-forge-form]');
  await form.locator('[name=name]').fill('Fictional Supporter');await form.locator('[name=email]').fill('fictional@example.invalid');
  await form.locator('[name=donorLocation]').fill('Lagos');await form.locator('[name=recipientLocation]').fill('Ikorodu, Lagos');
  await form.locator('[name=device]').fill('Fictional used device details for a local browser test only.');await form.locator('[name=consent]').check();
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2),false);
  await form.getByRole('button',{name:'Register donor interest'}).click();await page.getByText('Your enquiry is received.',{exact:true}).waitFor();
  await page.goto(base+'/endless-possibilities/give-a-child-a-laptop',{waitUntil:'networkidle'});
  await page.getByRole('heading',{name:'Laptop requests received'}).waitFor();
  await page.locator('.fg-laptop-impact').screenshot({path:`docs/redesign/forest-review/laptop-impact-${width}.png`});
 }
 assert.equal(submissions,2);console.log('PASS: donor forms at desktop/mobile validate against server rules; live counter renders; test submissions intercepted.');
} finally {await browser.close();}
