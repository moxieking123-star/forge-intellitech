import test from 'node:test';import assert from 'node:assert/strict';
import {parseAgreementAction,parseContractEvidence} from '../lib/staff-agreements.ts';
const id='c1010101-0101-4101-8101-010101010101';
const review={referralId:id,version:1,hash:'a'.repeat(64),decision:'approved',note:'Signed parties and document checked.',reviewed:true};
test('only explicit versioned document review is accepted',()=>{
 assert.deepEqual(parseAgreementAction('review',review),review);
 for(const patch of [{version:0},{version:1.1},{hash:'wrong'},{decision:'paid'},{note:''},{reviewed:false},{actorId:id}])assert.equal(parseAgreementAction('review',{...review,...patch}),null);
 assert.equal(parseAgreementAction('list',{offset:-1}),null);assert.equal(parseAgreementAction('discharge',{}),null);
 assert.deepEqual(parseAgreementAction('document',{referralId:id}),{referralId:id});
});
test('contract evidence requires real nonfuture date, bounded note and reviewed signed declaration',()=>{
 const valid={schoolId:id,receiptId:id,schoolVersion:2,signedOn:'2026-10-22',note:'Original signed school contract reviewed.',reviewed:true};
 assert.deepEqual(parseContractEvidence(valid,'2026-10-23'),valid);
 for(const patch of [{signedOn:'2026-02-30'},{signedOn:'2026-10-24'},{signedOn:'2026-1-1'},{schoolVersion:0},{reviewed:false},{note:'x'.repeat(1001)},{schoolId:'bad'},{schoolStatus:'agreed'}])assert.equal(parseContractEvidence({...valid,...patch},'2026-10-23'),null);
});
