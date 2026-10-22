import { execFileSync } from 'node:child_process';
import assert from 'node:assert/strict';
const [bin,base='http://127.0.0.1:3002']=process.argv.slice(2);
function browser(args,input){let out;try{out=execFileSync(bin,['--session','forge-preview-public','--json',...args],{encoding:'utf8',input,timeout:60000});}catch(e){if(e.stdout?.includes('"success":true'))out=e.stdout;else throw e;}const r=JSON.parse(out);assert(r.success,r.error);return r.data;}
function ev(js){const r=browser(['eval','--stdin'],js);return typeof r.result==='string'?JSON.parse(r.result):r.result;}
browser(['open',base+'/products']);browser(['wait','1000']);
ev(`localStorage.setItem('forge-cookie-consent',JSON.stringify({necessary:true,analytics:false,marketing:false})); JSON.stringify(true)`);
browser(['open',base+'/products']);browser(['wait','800']);
assert(ev(`JSON.stringify(!document.querySelector('dialog[open]')&&!![...document.querySelectorAll('button')].find(x=>x.textContent.includes('Help us forge this')))`));
browser(['find','role','button','click','--name','Help us forge this']);
assert(ev(`JSON.stringify(!!document.querySelector('dialog[open]')&&document.querySelector('#feedback-section option').textContent==='Whole page'&&document.querySelector('#feedback-section').options.length>2)`));
for(const width of [320,390,768,1440]){
 browser(['set','viewport',String(width),'900']);
 assert(ev(`JSON.stringify(document.documentElement.scrollWidth<=innerWidth&&document.querySelector('dialog[open]').getBoundingClientRect().width<=innerWidth)`),`overflow ${width}`);
}
browser(['select','#feedback-section','Whole page']);
browser(['find','role','button','click','--name','Curious','--exact']);
browser(['select','#feedback-visitor','Student']);
browser(['fill','#feedback-comment','Synthetic browser smoke: page/section/reaction/visitor and durable acknowledgement.']);
browser(['find','role','button','click','--name','Send honest feedback']);
browser(['wait','6000']);
assert(ev(`JSON.stringify(document.querySelector('dialog[open]').innerText.includes('We’ve saved your feedback.'))`),'durable acknowledgement missing');
browser(['find','role','button','click','--name','Keep exploring']);
assert(ev(`JSON.stringify(!document.querySelector('dialog[open]')&&document.activeElement.textContent.includes('Help us forge this'))`),'close/focus restore');
browser(['open',base+'/programmes']);browser(['wait','800']);
browser(['find','role','button','click','--name','Help us forge this']);
assert(ev(`JSON.stringify(document.querySelector('dialog[open]').innerText.includes('/programmes')&&document.querySelector('#feedback-visitor').value===''&&document.querySelector('#feedback-comment').value==='')`),'navigation context/reset');
browser(['press','Escape']);
assert(ev(`JSON.stringify(!document.querySelector('dialog[open]'))`));
const cross=await fetch(base+'/api/preview-feedback',{method:'POST',headers:{Origin:'https://evil.example','Content-Type':'application/json'},body:'{}'});assert.equal(cross.status,403);
const invalid=await fetch(base+'/api/preview-feedback',{method:'POST',headers:{Origin:base,'Content-Type':'application/json'},body:'{}'});assert.equal(invalid.status,400);
console.log('PASS: voluntary dialog; page/section context; optional visitor type; 4 widths; durable save; focus/escape; navigation reset; origin and malformed-body rejection.');
