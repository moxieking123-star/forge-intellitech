import test from 'node:test';
import assert from 'node:assert/strict';
import {parseReviewFilters,feedbackCsv} from '../lib/feedback-review.ts';
test('feedback filters are bounded and reject unexpected fields',()=>{
 assert.deepEqual(parseReviewFilters({}),{offset:0,page:'',section:'',reaction:'',visitor:'',search:''});
 for(const bad of [{offset:-1},{offset:0.5},{page:'x'.repeat(181)},{reaction:'angry'},{visitor:'invented'},{search:'x'.repeat(121)},{admin:true}]) assert.equal(parseReviewFilters(bad),null);
 assert.equal(parseReviewFilters({reaction:'__empty',visitor:'Student'}).reaction,'__empty');
});
test('CSV escapes quotes, lines and spreadsheet formulas without exposing session ids',()=>{
 const csv=feedbackCsv([{created_at:'2026-10-23',page:'/',section:'A "title"',reaction:'Inspired',visitor_type:'',comment:'  =HYPERLINK("bad")\nnext',build:'abc',session_id:'secret'}]);
 assert.ok(csv.includes('"A ""title"""'));assert.ok(csv.includes("'  =HYPERLINK"));assert.ok(!csv.includes('secret'));
 for(const value of ['+1','-1','@SUM(1)','\tcmd'])assert.ok(feedbackCsv([{comment:value}]).includes("'"));
});
