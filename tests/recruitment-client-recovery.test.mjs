import test from 'node:test';
import assert from 'node:assert/strict';
import {completeRecruitmentSignIn} from '../lib/recruitment/client-recovery.ts';
test('expired link still leaves a usable sign-in client and a safe explanation',async()=>{
 let called=false;
 const result=await completeRecruitmentSignIn({message:'This sign-in link has expired.'},null,async()=>{called=true;});
 assert.equal(called,false);assert.equal(result,'This sign-in link has expired.');
});
test('a rejected callback is recoverable without exposing the provider error',async()=>{
 const result=await completeRecruitmentSignIn(null,{session:{access_token:'fixture',refresh_token:'fixture'}},async()=>({error:new Error('private provider detail')}));
 assert.match(result,/request another/i);assert(!result.includes('private provider detail'));
});
test('a valid callback is applied once and has no failure message',async()=>{
 let calls=0;const callback={session:{access_token:'fixture',refresh_token:'fixture'}};
 assert.equal(await completeRecruitmentSignIn(null,callback,async session=>{calls++;assert.deepEqual(session,callback.session);return {error:null};}),null);assert.equal(calls,1);
});
