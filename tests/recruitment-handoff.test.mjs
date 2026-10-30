import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {createTrainingHandoff} from '../lib/recruitment/handoff.ts';
const user={id:'00000000-0000-4000-8000-000000000001',email:'person@example.invalid',emailConfirmedAt:'2026-10-01T00:00:00Z'};
const record={ownerId:user.id,verifiedEmail:user.email,applicantId:'00000000-0000-4000-8000-000000000002',assessmentReceiptId:'00000000-0000-4000-8000-000000000003',traineeId:'TRN-fixture',status:'provisioned'};
function setup(patch={}){const calls=[];return {calls,service:createTrainingHandoff({enabled:true,secret:'a'.repeat(64),verify:async()=>user,lookup:async id=>{calls.push(id);return record;},exchange:async e=>{calls.push(e);return {traineeId:e.payload.traineeId,expiresAt:e.payload.expiresAt,access:'trainee'};},...patch})};}
test('verified owner receives a random restricted session after matching bridge receipt',async()=>{const {service,calls}=setup();const a=await service('auth-token'),b=await service('auth-token');assert.equal(a.access,'trainee');assert.equal(a.token.length,43);assert.notEqual(a.token,b.token);assert.equal(calls[0],user.id);assert.equal(calls[1].action,'trainee.session');assert.equal(calls[1].payload.verifiedEmail,user.email);});
test('disabled or unverified identity never reaches provisioning lookup',async()=>{for(const patch of [{enabled:false},{verify:async()=>null},{verify:async()=>({...user,emailConfirmedAt:null})}]){const {service,calls}=setup(patch);await assert.rejects(()=>service('auth'));assert.equal(calls.length,0);}});
test('mismatched, unprovisioned and missing records never reach the bridge',async()=>{for(const r of [null,{...record,ownerId:'other'},{...record,verifiedEmail:'other@example.invalid'},{...record,status:'pending'},{...record,traineeId:'admin'}]){let exchanges=0;const {service}=setup({lookup:async()=>r,exchange:async()=>{exchanges++;}});await assert.rejects(()=>service('auth'));assert.equal(exchanges,0);}});
test('does not return a session on malformed or mismatched acknowledgement',async()=>{for(const reply of [{traineeId:'TRN-other',access:'trainee',expiresAt:1},{traineeId:record.traineeId,access:'admin',expiresAt:1},null]){const {service}=setup({exchange:async()=>reply});await assert.rejects(()=>service('auth'));}});
test('Apps Script accepts a matching signed session once and rejects tampering and identity changes',async()=>{
 const nonces=new Set(),sessions=[],config={enabled:true,secret:'a'.repeat(64)};
 const store={withLock:fn=>fn(),hasNonce:n=>nonces.has(n),rememberNonce:n=>nonces.add(n),findTrainee:()=>({...record,access:'trainee',status:'training'}),createSession:(...args)=>sessions.push(args)};
 const context=vm.createContext({Date,JSON,Number,Object,Array,Error,RegExp,Utilities:{newBlob:s=>({getBytes:()=>[...Buffer.from(s)]}),computeHmacSha256Signature:(data,key)=>[...crypto.createHmac('sha256',Buffer.from(key.map(b=>(b+256)%256))).update(Buffer.from(data)).digest()]}});
 vm.runInContext(fs.readFileSync(new URL('../integrations/apps-script/RecruitmentBridge.gs',import.meta.url),'utf8'),context);
 vm.runInContext(fs.readFileSync(new URL('../integrations/apps-script/TrainingSession.gs',import.meta.url),'utf8'),context);
 let envelope;const {service}=setup({exchange:async e=>{envelope=e;return context.forgeTrainingHandleSession_(e,config,store);}});
 const session=await service('auth');assert.equal(session.token,sessions[0][1]);assert.equal(sessions.length,1);
 assert.throws(()=>context.forgeTrainingHandleSession_(envelope,config,store));
 assert.throws(()=>context.forgeTrainingHandleSession_({...envelope,payload:{...envelope.payload,traineeId:'TRN-other'}},config,store));
 const {service:wrong}=setup({exchange:async e=>context.forgeTrainingHandleSession_(e,config,{...store,findTrainee:()=>({...record,verifiedEmail:'other@example.invalid',access:'trainee',status:'training'})})});await assert.rejects(()=>wrong('auth'));assert.equal(sessions.length,1);
});
test('restricted trainee entry derives identity from session and never accepts a requested role or student id',()=>{
 const context=vm.createContext({Date,JSON,Number,Object,Array,Error,RegExp});
 vm.runInContext(fs.readFileSync(new URL('../integrations/apps-script/TrainingSession.gs',import.meta.url),'utf8'),context);
 const store={getSession:token=>token==='valid'?{traineeId:'TRN-own',access:'trainee',expiresAt:Date.now()+60000}:null};
 const view=context.forgeTrainingGetMyEntry_('valid',store);assert.equal(view.traineeId,'TRN-own');assert.equal(view.access,'trainee');assert.equal(view.stage,'programme-selection');assert.ok(!('schools' in view));assert.ok(!('email' in view));assert.throws(()=>context.forgeTrainingGetMyEntry_('invalid',store));assert.throws(()=>context.forgeTrainingGetMyEntry_('valid',{getSession:()=>({traineeId:'TRN-own',access:'admin'})}));
});
