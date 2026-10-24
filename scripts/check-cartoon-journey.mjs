import {chromium} from 'file:///C:/Users/Forge/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'chrome',headless:true});
try {
 const page=await browser.newPage({viewport:{width:1440,height:1000}});
 page.on('pageerror',e=>console.log('PAGEERROR',e.message));
 page.on('console',m=>{if(m.type()==='error')console.log('CONSOLE',m.text().slice(0,250));});
 await page.goto('http://localhost:3011',{waitUntil:'domcontentloaded',timeout:120000});
 await page.locator('[data-forge-journey]').waitFor({timeout:60000});
 await page.getByRole('button',{name:'Pause the Forge story',exact:true}).click();
 await page.getByRole('button',{name:'Resume the Forge story',exact:true}).waitFor({timeout:60000});
 await page.getByRole('button',{name:'Resume the Forge story',exact:true}).click();
 for(let i=0;i<8;i++){
  await page.evaluate(i=>scrollTo({top:(document.documentElement.scrollHeight-innerHeight)*(i+.25)/8,behavior:"instant"}),i);
  await page.waitForTimeout(500);
  assert.equal(await page.locator('[data-forge-journey]').getAttribute('data-chapter'),String(i));
 }
 await page.getByRole('button',{name:/Join the Forge story/}).click();
 for(const name of ['Invite Doggy to help','Share the load','Build the fence together','Celebrate what we forged'])await page.getByRole('button',{name,exact:false}).click();
 assert.match(await page.locator('dialog [role=status]').textContent(),/We forged it/);
 await page.screenshot({path:'docs/redesign/story/cartoon-finale.png'});
 await page.keyboard.press('Escape');
 for(const width of [320,390,768,1440]){
  await page.setViewportSize({width,height:1000});
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`overflow ${width}`);
 }
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.waitForTimeout(100);
 assert.equal(await page.locator('[data-forge-journey]').getAttribute('data-paused'),'true');
 await page.getByRole('button',{name:'Hide the Forge story',exact:true}).click();
 assert.equal(await page.locator('[data-forge-journey]').count(),0);
 await page.getByRole('button',{name:'Show the Forge story',exact:true}).click();
 assert.equal(await page.locator('[data-forge-journey]').count(),1);
 console.log('PASS: eight scroll scenes, four-step fence activity, Escape, 320/390/768/1440 fit, reduced motion, hide/restore.');
} finally {await browser.close();}
