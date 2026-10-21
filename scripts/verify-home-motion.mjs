import { execFileSync } from 'node:child_process';
import assert from 'node:assert/strict';
import { mkdirSync, writeFileSync } from 'node:fs';
const bin=process.argv[2];
function b(args,input) {
  let output;
  try { output=execFileSync(bin,['--session','forge-home','--json',...args],{encoding:'utf8',input,timeout:45000}); }
  catch(error) { if(error.stdout?.includes('"success":true')) output=error.stdout; else throw error; }
  const result=JSON.parse(output); assert(result.success,result.error); return result.data;
}
function ev(source) { const result=b(['eval','--stdin'],source); return typeof result.result==='string'?JSON.parse(result.result):result.result; }
mkdirSync('docs/redesign/home-motion',{recursive:true});
b(['open','http://127.0.0.1:3001']);
b(['wait','500']);
for(const width of [320,390,768,1440]) {
  b(['set','viewport',String(width),'1000']);
  assert(ev('JSON.stringify(document.documentElement.scrollWidth<=innerWidth)'),`Overflow at ${width}`);
}
assert(ev(`JSON.stringify(document.body.innerText.includes('no partnership has been approved') && !!document.querySelector('#community-title'))`));
b(['find','role','button','click','--name','A little possibility. Click to play','--exact']);
assert(ev(`JSON.stringify(document.querySelector('[role=status]').textContent.includes('1 of 8'))`));
b(['find','role','button','click','--name','Collect letter 8: S','--exact']);
assert(ev(`JSON.stringify(document.querySelector('[role=status]').textContent.includes('2 of 8'))`));
for(const letter of ['O','R','G','E','I','T']) {
  b(['find','role','button','click','--name',`Pick up ${letter}`,'--exact']);
}
assert(ev(`JSON.stringify(document.querySelector('[role=status]').textContent.includes('Every beginning'))`));
b(['find','role','button','click','--name','Forge ITs. Build it again','--exact']);
assert(ev(`JSON.stringify(document.querySelector('[role=status]').textContent==='')`));
ev(`document.querySelector('button[class*="control"]').focus(); true`);
b(['press','Enter']);
assert(ev(`JSON.stringify(document.querySelector('[role=status]').textContent.includes('1 of 8'))`));
b(['set','media','light','reduced-motion']);
assert(ev(`JSON.stringify(matchMedia('(prefers-reduced-motion: reduce)').matches && getComputedStyle(document.querySelector('[class*="builder"]')).transitionDuration==='0s' && getComputedStyle(document.querySelector('#home-title').parentElement).animationName==='none')`));
b(['set','viewport','1440','1000']);
b(['screenshot','docs/redesign/home-motion/home-1440.png']);
b(['set','viewport','390','1000']);
b(['screenshot','docs/redesign/home-motion/home-390.png']);
writeFileSync('docs/redesign/home-motion/results.json',JSON.stringify({result:'passed',checks:['320/390/768/1440 no overflow','NDECA proposal status and community section','Out-of-order collection, completion and restart','Keyboard Enter activation','Reduced-motion emulation disables character transitions and hero entrance'],externalMessages:0},null,2));
console.log('PASS homepage sections, letter collection, restart, keyboard activation and four responsive widths');
