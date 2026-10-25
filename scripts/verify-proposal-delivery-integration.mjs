import assert from 'node:assert/strict';
import {mkdirSync,writeFileSync} from 'node:fs';
if(process.env.FORGE_CONTROLLED_PROPOSAL_TEST!=='true')throw Error('Explicit controlled internal-email test authorization required.');
const base=process.env.TEST_BASE_URL||'http://localhost:3009';
assert(['localhost','127.0.0.1'].includes(new URL(base).hostname),'Use the local site only.');
const response=await fetch(base+'/api/programmes/proposal',{
 method:'POST',headers:{Origin:new URL(base).origin,'Content-Type':'application/json'},
 body:JSON.stringify({name:'Forge programmes team',school:'Forge internal delivery verification',email:'programs@forgeintellitech.com',website:'',consent:'yes'}),
 signal:AbortSignal.timeout(20000),
});
const result=await response.json();
assert.equal(response.status,202,'Local proposal request must be saved before delivery.');
assert.equal(result.queued,true);assert.match(result.id,/^[a-f0-9-]{36}$/i);
mkdirSync('private-assets',{recursive:true});
writeFileSync('private-assets/proposal-worker-integration.json',JSON.stringify({id:result.id,recipient:'programs@forgeintellitech.com',purpose:'Owner-authorised internal proposal delivery verification',requestedAt:new Date().toISOString()},null,2));
console.log(JSON.stringify({queued:true,id:result.id,recipient:'programs@forgeintellitech.com',note:'No mail is claimed sent; inspect worker and signed delivery receipt.'}));
