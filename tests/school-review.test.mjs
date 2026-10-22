import test from 'node:test';
import assert from 'node:assert/strict';
import {parseSchoolReview} from '../lib/school-review.ts';
const valid={id:'01010101-0101-4101-8101-010101010101',version:1,status:'reviewing',note:'School phone number confirmed.'};
test('accepts versioned, explained school review changes',()=>assert.deepEqual(parseSchoolReview(valid),valid));
test('no contract/teaching shortcuts, missing audit reason or stale-version formats',()=>{
 for(const patch of [{status:'paid'},{status:'agreed'},{status:'teaching_started'},{note:''},{note:'x'.repeat(1001)},{version:0},{version:1.5},{id:'not-an-id'}])assert.equal(parseSchoolReview({...valid,...patch}),null);
});
