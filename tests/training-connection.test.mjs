import test from 'node:test';
import assert from 'node:assert/strict';
import {trainingConnectionEnvelope,trainingConnectionReady,CONNECTION_CHECK_ID} from '../lib/recruitment/connection.ts';
import {verifyProvisionEvent} from '../lib/recruitment/bridge.ts';
test('connection probe is authenticated and contains no real applicant',()=>{
 const key='ab'.repeat(32),envelope=trainingConnectionEnvelope(key);
 assert(verifyProvisionEvent(key,envelope));
 assert.equal(envelope.eventId,CONNECTION_CHECK_ID);
 assert.equal(envelope.payload.verifiedEmail,'connection-check@forge.invalid');
 assert.equal(verifyProvisionEvent('cd'.repeat(32),envelope),null);
 assert.throws(()=>trainingConnectionEnvelope(''));
});
test('connection accepts only ready production metadata and rejects extra fields',()=>{
 const ready={connected:true,environment:'production',writeEnabled:true,bridgeEnabled:true,signingKeyReady:true};
 assert.equal(trainingConnectionReady(ready),true);
 for(const value of [null,[],{...ready,environment:'test'},{...ready,writeEnabled:false},{...ready,bridgeEnabled:false},{...ready,secret:'unexpected'}])assert.equal(trainingConnectionReady(value),false);
});
