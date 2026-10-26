import {chromium} from 'file:///C:/Users/Forge/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
const base=process.env.TEST_BASE_URL||'http://localhost:3009';
assert(['localhost','127.0.0.1'].includes(new URL(base).hostname));
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const page=await browser.newPage({viewport:{width:1440,height:1000}});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));

 await page.goto(base,{waitUntil:'domcontentloaded',timeout:120000});
 const hero=page.locator('section#company');
 await hero.getByRole('heading',{name:/Why should this/}).waitFor();
 await page.waitForLoadState('load',{timeout:120000});
 await page.clock.install();
 const chapters=hero.getByRole('group',{name:'Explore the four landscape stories'}).getByRole('button');
 assert.equal(await chapters.count(),4);
 for(let index=0;index<4;index++){
  await chapters.nth(index).click({noWaitAfter:true});
  assert.equal(await chapters.nth(index).getAttribute('aria-pressed'),'true');
  assert.equal(await hero.locator('img').count(),2);
 }
 await chapters.first().click({noWaitAfter:true});
 await page.clock.fastForward(20050);
 assert.equal(await chapters.nth(1).getAttribute('aria-pressed'),'true');
 await hero.getByRole('button',{name:'See the possibility',exact:true}).click({noWaitAfter:true});
 assert.equal(await hero.getAttribute('data-scene'),'possibility');
 assert.equal(await hero.getAttribute('data-paused'),'true');
 await hero.getByRole('button',{name:'See today',exact:true}).click({noWaitAfter:true});
 assert.equal(await hero.getAttribute('data-scene'),'today');
 await hero.getByRole('button',{name:'Let it unfold',exact:true}).click({noWaitAfter:true});
 await page.mouse.move(1100,350);
 assert.notEqual(await hero.evaluate(el=>el.style.getPropertyValue('--depth-x')),'');
 await hero.getByRole('button',{name:'Pause the landscape animation'}).click({noWaitAfter:true});
 assert.equal(await hero.evaluate(el=>el.style.getPropertyValue('--depth-x')),'0px');
 const pausedStory=await hero.locator('[role="group"] button[aria-pressed="true"]').innerText();
 await page.clock.fastForward(40050);
 assert.equal(await hero.locator('[role="group"] button[aria-pressed="true"]').innerText(),pausedStory);
 await page.emulateMedia({reducedMotion:'reduce'});
 assert.equal(await hero.locator('img').first().evaluate(el=>getComputedStyle(el).animationName),'none');
 for(const width of [320,390,768,1440]){
  await page.setViewportSize({width,height:1000});
  await page.evaluate(()=>document.fonts.ready.then(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))));
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
 }
 const movement=page.locator('#movement');
 const desktopLayout=await movement.evaluate(el=>({display:getComputedStyle(el).display,columns:getComputedStyle(el).gridTemplateColumns.split(' ').length}));
 assert.equal(desktopLayout.display,'grid');assert.equal(desktopLayout.columns,2);
 await hero.getByRole('button',{name:'See the possibility',exact:true}).click({noWaitAfter:true});
 await page.screenshot({path:'docs/redesign/visual-polish/hero-desktop.png'});
 await page.setViewportSize({width:390,height:844});
 await page.screenshot({path:'docs/redesign/visual-polish/hero-mobile.png'});
 const mobileGap=await movement.evaluate(el=>el.querySelector('figure').getBoundingClientRect().top-el.firstElementChild.getBoundingClientRect().bottom);
 assert(mobileGap>=-1&&mobileGap<=25,'Student image follows the copy without the old background-image spacer');
 assert.deepEqual(errors,[]);
 console.log('Hero: four image pairs, automatic story progression, manual scenes, pause, pointer depth, reduced motion and four responsive widths passed.');
}finally{await browser.close();}
