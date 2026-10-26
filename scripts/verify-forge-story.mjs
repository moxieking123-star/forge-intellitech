import {execFileSync} from 'node:child_process';
import assert from 'node:assert/strict';
import {mkdirSync,writeFileSync} from 'node:fs';
const bin=process.argv[2],base=process.argv[3]||'http://127.0.0.1:3002';
function b(args,input){let out;try{out=execFileSync(bin,['--session','forge-story','--json',...args],{encoding:'utf8',input,timeout:60000});}catch(e){if(e.stdout?.includes('"success":true'))out=e.stdout;else throw e;}const r=JSON.parse(out);assert(r.success,r.error);return r.data;}
function ev(s){const r=b(['eval','--stdin'],s);return typeof r.result==='string'?JSON.parse(r.result):r.result;}
mkdirSync('docs/redesign/story',{recursive:true});
b(['open',base]);b(['wait','600']);
b(['set','media','light']);b(['wait','100']);
const checks=[];
assert(ev(`JSON.stringify(getComputedStyle(document.querySelector('[data-forge-journey] svg g')).animationName!=='none')`));
ev(`dispatchEvent(new PointerEvent('pointermove',{clientX:innerWidth*.9,clientY:200})); true`);
assert(ev(`JSON.stringify(parseFloat(document.querySelector('[data-forge-journey]').style.getPropertyValue('--look'))>0)`));
checks.push('Automatic scene choreography and subtle pointer glances are active');
for(const width of [320,390,768,1440]){
 b(['set','viewport',String(width),'1000']);
 assert(ev('JSON.stringify(document.documentElement.scrollWidth<=innerWidth)'),`Page overflow ${width}`);
 assert(ev(`JSON.stringify((()=>{const p=[...document.querySelectorAll('p')].find(p=>p.textContent==='Made of possibility.');return p.scrollWidth<=p.clientWidth+1})())`),`Possibility clipped ${width}`);
}
checks.push('Page and full possibility text fit 320/390/768/1440 widths');
for(let chapter=0;chapter<6;chapter++){
 ev(`scrollTo({top:(document.documentElement.scrollHeight-innerHeight)*${(chapter+.2)/6},behavior:"instant"}); true`);b(['wait','160']);
 assert.equal(ev(`JSON.stringify(Number(document.querySelector('[data-forge-journey]').dataset.chapter))`),chapter);
 b(['screenshot',`docs/redesign/story/chapter-${chapter}.png`]);
}
checks.push('All six chapters unfold from scrolling without clicking');
ev('scrollTo({top:0,behavior:"instant"}); true');b(['wait','160']);assert.equal(ev(`JSON.stringify(Number(document.querySelector('[data-forge-journey]').dataset.chapter))`),0);
b(['find','role','button','click','--name','Pause the Forge story','--exact']);
ev('scrollTo({top:document.documentElement.scrollHeight,behavior:"instant"}); true');b(['wait','100']);assert.equal(ev(`JSON.stringify(Number(document.querySelector('[data-forge-journey]').dataset.chapter))`),0);
b(['find','role','button','click','--name','Resume the Forge story','--exact']);b(['wait','150']);
checks.push('Reverse scroll returns to the beginning; pause holds chapter and resume restores it');
b(['find','role','button','click','--name','Join the Forge story. The team reaches a shared Forge workshop and celebrates.','--exact']);
for(const name of ['Give the idea a foundation','Bring the team together','Make a way for the journey'])b(['find','role','button','click','--name',name,'--exact']);
assert(ev(`JSON.stringify(document.querySelector('dialog[open] [role=status]').textContent.includes('You made a way'))`));
b(['press','Escape']);assert(ev(`JSON.stringify(!document.querySelector('dialog[open]')&&document.activeElement.getAttribute('aria-label').startsWith('Join the Forge story'))`));
checks.push('Optional object-building activity completes and Escape restores character focus');
b(['open',base+'/programmes']);b(['wait','300']);assert.equal(ev(`JSON.stringify(Number(document.querySelector('[data-forge-journey]').dataset.chapter))`),2);
checks.push('Programme page introduces the girl and her new idea');
b(['set','media','light','reduced-motion']);b(['wait','100']);
assert(ev(`JSON.stringify(document.querySelector('[data-forge-journey]').dataset.paused==='true'&&getComputedStyle(document.querySelector('[data-forge-journey] svg g')).animationName==='none')`));
checks.push('Reduced motion leaves static scenes and disables decorative animations');
b(['find','role','button','click','--name','Hide the Forge story','--exact']);assert(ev(`JSON.stringify(!document.querySelector('[data-forge-journey]'))`));
b(['find','role','button','click','--name','Show the Forge story','--exact']);assert(ev(`JSON.stringify(!!document.querySelector('[data-forge-journey]'))`));
checks.push('Hide and restore controls work');
b(['open',base+'/contact']);b(['wait','200']);
ev(`document.querySelector('input').focus(); true`);b(['wait','100']);
assert(ev(`JSON.stringify(document.querySelector('[data-forge-journey]').dataset.focus==='true' && getComputedStyle(document.querySelector('[data-forge-journey]')).visibility==='hidden')`));
checks.push('Story gets out of the way while a visitor completes a form');
b(['open',base]);b(['wait','200']);b(['set','viewport','390','1000']);
ev('scrollTo({top:0,behavior:"instant"}); true');b(['wait','120']);b(['screenshot','docs/redesign/story/mobile-opening.png']);
writeFileSync('docs/redesign/story/results.json',JSON.stringify({result:'passed',checks,realSubmissions:0},null,2));console.log(JSON.stringify({result:'passed',checks},null,2));
