import { execFileSync } from 'node:child_process';
import assert from 'node:assert/strict';
import { writeFileSync } from 'node:fs';
const bin=process.argv[2],base='http://127.0.0.1:3001';
function b(args,input){let out;try{out=execFileSync(bin,['--session','forge-story','--json',...args],{encoding:'utf8',input,timeout:60000});}catch(error){if(error.stdout?.includes('"success":true'))out=error.stdout;else throw error;}const r=JSON.parse(out);assert(r.success,r.error);return r.data;}
function ev(s){const r=b(['eval','--stdin'],s);return typeof r.result==='string'?JSON.parse(r.result):r.result;}
const checks=[];
b(['open',base+'/programmes/resources']);b(['wait','1200']);
if(ev(`JSON.stringify([...document.querySelectorAll('button')].some(b=>b.textContent.trim()==='Reject All'))`))b(['find','role','button','click','--name','Reject All','--exact']);
for(const width of [320,390,768,1440]){b(['set','viewport',String(width),'1000']);assert(ev('JSON.stringify(document.documentElement.scrollWidth<=innerWidth)'),`resources overflow at ${width}`);}
assert(ev(`JSON.stringify(!document.querySelector('#proposal').innerText.includes('10,000')&&document.querySelectorAll('#proposal input[required]').length===4)`));
b(['fill','#proposal input[name=name]','Preview School Lead']);b(['fill','#proposal input[name=school]','Synthetic School']);b(['fill','#proposal input[name=email]','preview@example.test']);b(['check','#proposal input[name=consent]']);b(['click','#proposal button']);b(['wait','500']);
assert(ev(`JSON.stringify(document.querySelector('#proposal [role=status]').innerText.includes('being connected'))`));
checks.push('Proposal gate: four widths, required consent, private pricing absent, truthful disabled-delivery response');
b(['set','viewport','390','1000']);ev(`document.querySelector('#proposal').scrollIntoView(); true`);b(['screenshot','docs/redesign/document-review/proposal-form-390.png']);
b(['open',base]);b(['wait','500']);assert(ev(`JSON.stringify(!!document.querySelector('#ndeca') && document.querySelector('main').innerText.includes('If Disney could imagine Wakanda') && document.querySelector('footer [aria-label="Forge social media"]').children.length===5)`));
assert(ev(`JSON.stringify([...document.querySelectorAll('footer [aria-label="Forge social media"] li')].every(li=>li.textContent.includes('Coming soon')&&!li.querySelector('a')))`));
checks.push('Homepage journal and NDECA present; five real social icons visibly Coming soon without fake links');
b(['set','viewport','1440','1000']);ev(`document.querySelector('[aria-labelledby="journal-title"]').scrollIntoView(); true`);b(['wait','300']);b(['screenshot','docs/redesign/document-review/home-journal-1440.png']);
b(['open',base+'/blog/why-cant-we-build-what-we-imagine']);b(['wait','600']);
assert(ev(`JSON.stringify(document.querySelectorAll('h1').length===1&&document.querySelector('main').innerText.includes('Wakanda')&&document.querySelector('main').innerText.includes('fictional')&&!document.querySelector('main').innerText.includes('AI-generated'))`));
checks.push('New founder reflection has fictional context and no child-image disclaimer on adult-free cover');
const post=(body,origin=base)=>fetch(base+'/api/programmes/proposal',{method:'POST',headers:{origin,'Content-Type':'application/json'},body:JSON.stringify(body)});
assert.equal((await post({})).status,400);
assert.equal((await post({},'https://untrusted.example')).status,403);
assert.equal((await post({name:'x'.repeat(5000)})).status,413);
assert.equal((await post({name:'Preview',school:'Synthetic School',email:'preview@example.test',website:'',consent:'yes'})).status,503);
for(const route of ['agreement','payout-profile','statement-request'])assert.equal((await fetch(base+'/api/referrals/'+route)).status,503);
assert.equal((await fetch(base+'/private-assets/forge-school-proposal-2026-10-22-v1.pdf')).status,404);
const draft=await fetch(base+'/downloads/forge-referral-agreement-draft.pdf');assert.equal(draft.status,200);assert(draft.headers.get('content-type').includes('pdf'));
checks.push('API malformed/cross-origin/oversize guards, feature-disabled services, private proposal 404 and generic draft available');
writeFileSync('docs/redesign/document-review/journey-results.json',JSON.stringify({result:'passed',checks},null,2));
console.log(checks.join('\n'));
