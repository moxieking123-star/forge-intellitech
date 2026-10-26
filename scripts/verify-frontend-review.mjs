import {execFileSync} from 'node:child_process';
import assert from 'node:assert/strict';
import {mkdirSync,writeFileSync} from 'node:fs';
const bin=process.argv[2],base='http://127.0.0.1:3001';
const dir='docs/redesign/frontend-review';mkdirSync(dir,{recursive:true});
function b(args,input){let out;try{out=execFileSync(bin,['--session','forge-story','--json',...args],{encoding:'utf8',input,timeout:60000});}catch(e){if(e.stdout?.includes('"success":true'))out=e.stdout;else throw e;}const r=JSON.parse(out);assert(r.success,r.error);return r.data;}
function ev(s){const r=b(['eval','--stdin'],s);return typeof r.result==='string'?JSON.parse(r.result):r.result;}
const checks=[];
b(['open',base]);b(['wait','800']);b(['set','media','light']);
if(ev(`JSON.stringify([...document.querySelectorAll('button')].some(x=>x.textContent.trim()==='Reject All'))`))b(['find','role','button','click','--name','Reject All','--exact']);
assert(ev(`JSON.stringify([...document.querySelectorAll('#company a')].some(a=>a.textContent.includes('See what we are building')&&a.pathname==='/products'))`));
assert(ev(`JSON.stringify(document.querySelector('#work a[href="/products#learning"]')&&!!document.querySelector('#work a[href="/programmes"]')&&!!document.querySelector('#work a[href="/endless-possibilities/launchpad"]'))`));
assert(ev(`JSON.stringify(document.querySelectorAll('[aria-labelledby="journal-title"] article').length===4&&!document.querySelector('a[href="/gallery"]')&&!document.body.innerText.includes('About our student imagery'))`));
for(const width of [320,390,768,1440]){b(['set','viewport',String(width),'1000']);assert(ev('JSON.stringify(document.documentElement.scrollWidth<=innerWidth)'),`homepage overflow ${width}`);}
b(['set','viewport','390','1000']);b(['find','role','button','click','--name','Open navigation','--exact']);assert(ev(`JSON.stringify(document.querySelector('#home-menu[open]')&&[...document.querySelectorAll('#home-menu nav a')].some(a=>a.pathname==='/partner')&&parseFloat(getComputedStyle(document.querySelector('#home-menu nav a')).fontSize)<=20)`));b(['press','Escape']);assert(ev('JSON.stringify(!document.querySelector("#home-menu[open]"))'));
checks.push('Homepage product CTA, two learning actions, Launchpad, compact journal, no gallery/full privacy callout and smaller complete mobile navigation');
b(['open',base+'/products']);b(['wait','500']);
assert(ev(`JSON.stringify(getComputedStyle(document.querySelector('main h2')).color==='rgb(16, 43, 36)')`));
assert(ev(`JSON.stringify(document.querySelectorAll('[data-product]').length===4&&!!document.querySelector('#dashboard').innerText.includes('In use')&&!!document.querySelector('#all-in').innerText.includes('Forge All In'))`));
ev(`document.querySelector('#bitebank').scrollIntoView({behavior:'instant'}); true`);b(['wait','350']);assert(ev(`JSON.stringify(document.querySelector('[data-product=bitebank]').dataset.active==='true')`));
assert(ev(`JSON.stringify([...document.querySelectorAll('[data-product=bitebank] g')].some(g=>getComputedStyle(g).animationName!=='none'&&getComputedStyle(g).animationPlayState==='running'))`));
b(['find','role','button','click','--name','Pause product & click motion','--exact']);assert(ev(`JSON.stringify([...document.querySelectorAll('[data-product] g')].every(g=>getComputedStyle(g).animationPlayState==='paused'))`));b(['find','role','button','click','--name','Resume product & click motion','--exact']);
for(const width of [320,390,768,1440]){b(['set','viewport',String(width),'1000']);assert(ev('JSON.stringify(document.documentElement.scrollWidth<=innerWidth)'),`products overflow ${width}`);}
b(['set','media','light','reduced-motion']);assert(ev(`JSON.stringify([...document.querySelectorAll('[data-product] g')].every(g=>getComputedStyle(g).animationName==='none'))`));b(['set','media','light']);
b(['set','viewport','1440','1000']);ev(`document.querySelector('#products-title').scrollIntoView({behavior:'instant'});true`);b(['wait','300']);b(['screenshot',dir+'/products-1440.png']);
ev(`scrollTo({top:0,behavior:'instant'});true`);b(['wait','250']);assert(ev(`JSON.stringify(document.querySelector('[data-product=bitebank]').dataset.active==='false')`));
checks.push('Four product-specific animations run in view, pause globally and outside view, respect reduced motion; live dashboard and separate All In status; four widths');
b(['open',base+'/join/apply?purpose=donation']);b(['wait','450']);b(['fill','#donation-amount','2500']);b(['select','#donation-purpose','Launchpad 2.0']);b(['find','role','button','click','--name','View bank-transfer instructions →','--exact']);
assert(ev(`JSON.stringify(document.querySelector('[aria-labelledby="transfer-title"]').innerText.includes('3001433209')&&!!document.querySelector('[aria-labelledby="transfer-title"]').innerText.includes('Forge Intellitech Services Ltd.')&&!!document.querySelector('[aria-labelledby="transfer-title"]').innerText.includes('does not confirm a payment'))`));
b(['select','#participation-purpose','volunteer']);assert(ev(`JSON.stringify(!!document.querySelector('#participant-location')&&!!document.querySelector('#participant-availability')&&!document.querySelector('#donation-amount'))`));
b(['select','#participation-purpose','instructor']);assert(ev(`JSON.stringify(!!document.querySelector('#participant-qualification')&&document.body.innerText.includes('Minimum OND'))`));
for(const width of [320,390,768,1440]){b(['set','viewport',String(width),'1000']);assert(ev('JSON.stringify(document.documentElement.scrollWidth<=innerWidth)'),`participation overflow ${width}`);}
checks.push('Donation amount/purpose → exact bank instructions with no receipt claim; volunteer and instructor conditional fields; four widths');
for(const route of ['/about','/partner','/programmes','/endless-possibilities/launchpad']){
 b(['open',base+route]);b(['wait','400']);for(const width of [320,390,768,1440]){b(['set','viewport',String(width),'1000']);assert(ev('JSON.stringify(document.documentElement.scrollWidth<=innerWidth)'),`${route} overflow ${width}`);}
 if(route==='/about')assert(ev(`JSON.stringify(document.querySelector('main').innerText.includes('Jehovah')&&!!document.querySelector('main').innerText.includes('Moxie Adeniyi')&&!!document.querySelector('main').innerText.includes('Adeola Oyewole'))`));
 if(route==='/programmes')assert(ev(`JSON.stringify(document.querySelector('main').innerText.includes('not an in-school club')&&!!document.querySelector('main').innerText.includes('70% practical')&&!document.querySelector('main').innerText.includes('in testing'))`));
 if(route.includes('launchpad'))assert(ev(`JSON.stringify(document.querySelector('main').innerText.includes('Launchpad 2.0')&&!!document.querySelector('main').innerText.includes('Coming soon')&&!document.querySelector('main').innerText.includes('2027'))`));
}
const gallery=await fetch(base+'/gallery',{redirect:'manual'});assert.equal(gallery.status,308);assert(gallery.headers.get('location').endsWith('/endless-possibilities/launchpad'));
const sitemap=await(await fetch(base+'/sitemap.xml')).text();assert(sitemap.includes('/products')&&sitemap.includes('/partner')&&!sitemap.includes('/gallery'));
const robots=await(await fetch(base+'/robots.txt')).text();assert(!robots.includes('Disallow: /_next/'));
checks.push('Leadership, donation/partner destinations, school positioning, Launchpad coming soon, four widths; gallery redirect, sitemap and crawlable JS assets');
writeFileSync(dir+'/results.json',JSON.stringify({result:'passed',checks,realSubmissions:0,realPayments:0},null,2));console.log(checks.join('\n'));
