import test from 'node:test';
import assert from 'node:assert/strict';
import {trainingDayStatus,trainingProgress} from '../lib/recruitment/training-progress.ts';
const receipt={id:'00000000-0000-4000-8000-000000000001',text:'Fictional build',submittedAt:new Date().toISOString(),review:null};
test('day status follows the latest exact-day review ahead of practice completion',()=>{
 const state={programme:'techup',completed:['day-2','day-3'],submission:null,submissions:[{...receipt,lessonId:'day-2'},{...receipt,lessonId:'day-14',review:{status:'needs_changes'}},{...receipt,lessonId:'day-7',review:{status:'reviewed'}}]};
 assert.equal(trainingDayStatus(state,'day-1'),'Not started');assert.equal(trainingDayStatus(state,'day-3'),'Practised');assert.equal(trainingDayStatus(state,'day-2'),'Awaiting review');assert.equal(trainingDayStatus(state,'day-14'),'Changes requested');assert.equal(trainingDayStatus(state,'day-7'),'Reviewed');
 assert.deepEqual(trainingProgress(state),{practised:2,submitted:3,reviewed:1,needsChanges:1});
});
test('legacy Day 1 feedback is visible without inventing other day progress',()=>{
 const state={programme:'elytech',completed:[],submission:{...receipt,review:{status:'reviewed'}}};
 assert.equal(trainingDayStatus(state,'day-1'),'Reviewed');assert.equal(trainingDayStatus(state,'day-2'),'Not started');assert.equal(trainingProgress(state).submitted,1);
});
