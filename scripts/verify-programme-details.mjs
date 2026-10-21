import {execFileSync} from 'node:child_process';
import assert from 'node:assert/strict';
import {mkdirSync,writeFileSync} from 'node:fs';
const bin=process.argv[2],base='http://127.0.0.1:3001';
function b(args,input){let out;try{out=execFileSync(bin,['--session',process.env.FORGE_BROWSER_SESSION||'forge-programmes','--json',...args],{encoding:'utf8',input,timeout:60000});}catch(e){if(e.stdout?.includes('"success":true'))out=e.stdout;else throw e;}const r=JSON.parse(out);assert(r.success,r.error);return r.data;}
function ev(s){const r=b(['eval','--stdin'],s);return typeof r.result==='string'?JSON.parse(r.result):r.result;}
mkdirSync('docs/redesign/programme-details',{recursive:true});
const checks=[];
for(const programme of ['techup','elytech']){
 b(['open',`${base}/programmes/${programme}`]);b(['wait','2300']);b(['set','media','light']);
 if(ev(`JSON.stringify([...document.querySelectorAll('button')].some(button=>button.textContent.trim()==='Reject All'))`)){b(['find','role','button','click','--name','Reject All','--exact']);b(['wait','400']);}
 assert(ev(`JSON.stringify(document.querySelectorAll('h1').length===1 && document.querySelectorAll('main').length===1 && document.querySelector('link[rel=canonical]').href.endsWith('/programmes/${programme}'))`));
 assert(ev(`JSON.stringify(document.body.innerText.includes('AI-generated Nigerian learners') && !document.body.innerText.includes('10,000') && !document.querySelector('iframe'))`));
 for(const width of [320,390,768,1440]){
  b(['set','viewport',String(width),'1000']);assert(ev('JSON.stringify(document.documentElement.scrollWidth<=innerWidth)'),`${programme} overflow at ${width}`);
 }
 b(['click',`button[aria-controls="${programme}-activity-panel"]:nth-child(2)`]);
 assert(ev(`JSON.stringify(document.querySelector('#${programme}-activity-panel').innerText.includes('${programme==='techup'?'Make a first version.':'Try a different step.'}'))`));
 b(['click',`button[aria-controls="${programme}-activity-panel"]:nth-child(3)`]);
 assert(ev(`JSON.stringify(document.querySelector('#${programme}-activity-panel svg').getAttribute('aria-label').includes('${programme==='techup'?'improved':'destination'}'))`));
 for(let index=1;index<=4;index++){
  b(['click',`button[aria-controls="${programme}-support-panel"]:nth-child(${index})`]);
  assert(ev(`JSON.stringify(document.querySelectorAll('button[aria-controls="${programme}-support-panel"][aria-pressed=true]').length===1)`));
 }
 assert(ev(`JSON.stringify(document.querySelector('#${programme}-support-panel').innerText.includes('dashboard is in testing'))`));
 ev(`document.querySelector('details summary').focus(); true`);b(['press','Enter']);assert(ev(`JSON.stringify(!!document.querySelector('details[open]'))`));
 b(['set','media','light','reduced-motion']);
 assert(ev(`JSON.stringify([...document.querySelectorAll('#${programme}-support-panel svg path')].every(path=>getComputedStyle(path).animationName==='none'))`));
 b(['set','viewport','1440','1000']);ev('scrollTo({top:0,behavior:"instant"}); true');b(['wait','150']);
 assert(ev(`JSON.stringify([...document.querySelectorAll('main img')].every(image=>image.complete&&image.naturalWidth>0))`));
 b(['screenshot',`docs/redesign/programme-details/${programme}-1440.png`]);
 b(['set','viewport','390','1000']);b(['screenshot',`docs/redesign/programme-details/${programme}-390.png`]);
 checks.push(`${programme}: four widths, image/disclosure/metadata, activity/support states, keyboard FAQ and reduced motion`);
 const redirect=await fetch(`${base}/${programme}`,{redirect:'manual'});assert.equal(redirect.status,308);assert(redirect.headers.get('location').endsWith(`/programmes/${programme}`));
}
const sitemap=await(await fetch(base+'/sitemap.xml')).text();assert(sitemap.includes('/programmes/techup')&&sitemap.includes('/programmes/elytech'));
const hub=await(await fetch(base+'/programmes')).text();assert(hub.includes('/programmes/techup')&&hub.includes('/programmes/elytech')&&hub.includes('id="chisanbop"'));
assert.equal((await fetch(base+'/api/referrals/account')).status,503);
assert.equal((await fetch(base+'/programmes/not-a-programme')).status,404);
checks.push('Legacy redirects, hub links, sitemap, unknown-route 404 and inactive backend guard');
writeFileSync('docs/redesign/programme-details/results.json',JSON.stringify({result:'passed',checks,realSubmissions:0},null,2));console.log(JSON.stringify({result:'passed',checks},null,2));
