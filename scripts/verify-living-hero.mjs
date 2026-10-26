import {execFileSync} from 'node:child_process';
import assert from 'node:assert/strict';
import {mkdirSync,writeFileSync} from 'node:fs';
const bin=process.argv[2],base='http://127.0.0.1:3001';
function b(args,input){let out;try{out=execFileSync(bin,['--session','forge-landscape','--json',...args],{encoding:'utf8',input,timeout:60000});}catch(e){if(e.stdout?.includes('"success":true'))out=e.stdout;else throw e;}const r=JSON.parse(out);assert(r.success,r.error);return r.data;}
function ev(s){const r=b(['eval','--stdin'],s);return typeof r.result==='string'?JSON.parse(r.result):r.result;}
mkdirSync('docs/redesign/living-hero',{recursive:true});
b(['open',base]);b(['set','media','light']);b(['wait','3300']);
if(ev(`JSON.stringify([...document.querySelectorAll('button')].some(button=>button.textContent.trim()==='Reject All'))`)){b(['find','role','button','click','--name','Reject All','--exact']);b(['wait','400']);}
const checks=[];
assert(ev(`JSON.stringify(document.querySelectorAll('h1').length===1 && document.querySelectorAll('main').length===1)`));
for(const width of [320,390,768,1440]){
 b(['set','viewport',String(width),'1000']);
 assert(ev('JSON.stringify(document.documentElement.scrollWidth<=innerWidth)'),`Overflow at ${width}`);
 assert(ev(`JSON.stringify([...document.querySelectorAll('#company img')].every(i=>i.complete&&i.naturalWidth>0))`));
}
checks.push('One main/heading, two loaded landscapes, no overflow at four widths');
assert(ev(`JSON.stringify(getComputedStyle(document.querySelector('#company img:nth-child(2)')).animationName.includes('reveal'))`));
b(['find','role','button','click','--name','Pause the landscape animation','--exact']);
assert(ev(`JSON.stringify(document.querySelector('#company').dataset.paused==='true' && getComputedStyle(document.querySelector('#company img')).animationPlayState==='paused')`));
b(['find','role','button','click','--name','See the possibility','--exact']);
assert(ev(`JSON.stringify(document.querySelector('#company').dataset.scene==='possibility' && !getComputedStyle(document.querySelector('#company img:nth-child(2)')).clipPath.includes('100%'))`));
b(['set','viewport','1440','1000']);ev('scrollTo({top:0,behavior:"instant"}); true');b(['screenshot','docs/redesign/living-hero/possibility-1440.png']);
b(['find','role','button','click','--name','See today','--exact']);
assert(ev(`JSON.stringify(getComputedStyle(document.querySelector('#company img:nth-child(2)')).clipPath.includes('100%'))`));
b(['screenshot','docs/redesign/living-hero/today-1440.png']);
checks.push('Automatic transformation, pause and manual today/possibility controls');
b(['find','role','button','click','--name','Play the landscape animation','--exact']);
assert(ev(`JSON.stringify(document.querySelector('#company').dataset.scene==='auto' && document.querySelector('#company').dataset.paused==='false')`));
b(['find','role','button','click','--name','See the possibility','--exact']);
b(['find','role','button','click','--name','Let it unfold','--exact']);assert(ev(`JSON.stringify(document.querySelector('#company').dataset.scene==='auto' && document.querySelector('#company').dataset.paused==='false')`));
const firstClip=ev(`JSON.stringify(getComputedStyle(document.querySelector('#company img:nth-child(2)')).clipPath)`);
b(['wait','6000']);
const nextClip=ev(`JSON.stringify(getComputedStyle(document.querySelector('#company img:nth-child(2)')).clipPath)`);
assert.notEqual(firstClip,nextClip,'Landscape reveal advances by itself over time');
assert(ev(`JSON.stringify(document.querySelector('#company').innerText.includes('AI-created scenes') && document.querySelector('#company a[href="#ndeca"]')!==null)`));
ev(`document.querySelector('#community-title').scrollIntoView({behavior:'instant'}); true`);b(['wait','800']);
assert(ev(`JSON.stringify(document.querySelector('#community-title').closest('section').getAttribute('data-reveal')!=='waiting')`));
checks.push('Clear illustrative-vision disclosure, NDECA anchor and section entrances reveal content');
b(['set','media','light','reduced-motion']);ev('scrollTo({top:0,behavior:"instant"}); true');b(['wait','100']);
assert(ev(`JSON.stringify([...document.querySelectorAll('#company img')].every(i=>getComputedStyle(i).animationName==='none') && getComputedStyle(document.querySelector('#home-title')).opacity==='1')`));
b(['set','viewport','390','1000']);
b(['find','role','button','click','--name','See the possibility','--exact']);
b(['find','role','button','click','--name','See today','--exact']);
b(['find','role','button','click','--name','See the possibility','--exact']);
ev('scrollTo({top:0,behavior:"instant"}); true');
b(['screenshot','docs/redesign/living-hero/possibility-390.png']);
checks.push('Reduced motion stops landscape animation and keeps all headline text visible');
checks.push('Today/possibility controls remain usable on mobile alongside the story');
writeFileSync('docs/redesign/living-hero/results.json',JSON.stringify({result:'passed',checks,realSubmissions:0},null,2));console.log(JSON.stringify({result:'passed',checks},null,2));
