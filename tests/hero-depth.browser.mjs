import {chromium} from 'file:///C:/Users/Forge/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
const base=process.env.TEST_BASE_URL||'http://localhost:3009';
assert(['localhost','127.0.0.1'].includes(new URL(base).hostname));
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const page=await browser.newPage({viewport:{width:1440,height:1000}});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base,{waitUntil:'networkidle'});
 const hero=page.locator('section#company');
 await hero.getByRole('button',{name:'See the possibility',exact:true}).click();
 assert.equal(await hero.getAttribute('data-scene'),'possibility');
 assert.equal(await hero.getAttribute('data-paused'),'true');
 await hero.getByRole('button',{name:'See today',exact:true}).click();
 assert.equal(await hero.getAttribute('data-scene'),'today');
 await hero.getByRole('button',{name:'Let it unfold',exact:true}).click();
 await page.mouse.move(1100,350);
 assert.notEqual(await hero.evaluate(el=>el.style.getPropertyValue('--depth-x')),'');
 await hero.getByRole('button',{name:'Pause the landscape animation'}).click();
 assert.equal(await hero.evaluate(el=>el.style.getPropertyValue('--depth-x')),'0px');
 await page.emulateMedia({reducedMotion:'reduce'});
 assert.equal(await hero.locator('img').first().evaluate(el=>getComputedStyle(el).animationName),'none');
 for(const width of [320,390,768,1440]){
  await page.setViewportSize({width,height:1000});
  await page.evaluate(()=>document.fonts.ready.then(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))));
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
 }
 await hero.getByRole('button',{name:'See the possibility',exact:true}).click();
 await page.screenshot({path:'docs/redesign/visual-polish/hero-desktop.png'});
 await page.setViewportSize({width:390,height:844});
 await page.screenshot({path:'docs/redesign/visual-polish/hero-mobile.png'});
 assert.deepEqual(errors,[]);
 console.log('Hero: manual scenes, pause, pointer depth, reduced motion and four responsive widths passed.');
}finally{await browser.close();}
