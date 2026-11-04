import test from 'node:test';
import assert from 'node:assert/strict';
import {summariseLaptopRecords,locationState} from '../lib/laptop-records.ts';
import {laptopReply} from '../lib/laptop-replies.ts';
const make=(id,changes={})=>({id,payload:{name:'Fictional Person',email:'fictional@example.invalid',subject:'Give a Child a Laptop — student support request',message:'Student name: Fictional Child\n\nSchool name: Sample School\n\nSchool town or city and state: Ilorin South',...changes}});
test('repeat applications do not inflate public counts; unrelated and confirmed test offers are excluded',()=>{
 const summary=summariseLaptopRecords([make('one'),make('two'),make('three',{subject:'Unrelated laptop repair question'}),make('5e19a83e-b10c-4fed-bfdd-4f206fec18b8',{subject:'Give a Child a Laptop — donor interest'}),make('donor',{subject:'Give a Child a Laptop — donor interest',message:'Preferred recipient location: Ikorodu'})]);
 assert.equal(summary.publicCounts.requests,1);assert.equal(summary.publicCounts.donorOffers,1);assert.equal(summary.duplicates,1);
 assert.deepEqual(summary.publicCounts.requestLocations,[{state:'Kwara',count:1}]);
 assert(!JSON.stringify(summary.publicCounts).includes('fictional@example.invalid'));
});
test('a shared parent email can represent two distinct children',()=>{
 const summary=summariseLaptopRecords([make('one'),make('two',{message:'Student name: Another Child\n\nSchool name: Sample School\n\nSchool town or city and state: Lagos'})]);
 assert.equal(summary.publicCounts.requests,2);
});
test('structured and old form requests reconcile without exposing details',()=>{
 const summary=summariseLaptopRecords([make('one'),make('two',{message:JSON.stringify({initiative:'give-a-child-a-laptop',version:1,kind:'student',values:{studentName:'Fictional Child',school:'Sample School',location:'Ilorin South'}})})]);
 assert.equal(summary.publicCounts.requests,1);
 assert.equal(locationState('Unknown place'),'Location to confirm');
 assert.equal(locationState('Aba South'),'Abia');
});
test('replies explain review and route responses to Forge without promising allocation',()=>{
 for(const kind of ['student','adult','donor']){
  const content=laptopReply(kind,'Example\nName','reference-123');
  assert(content.text.includes('admin@forgeintellitech.com'));
  assert(content.text.includes('reference-123'));
  assert(!content.text.includes('Hello Example\nName'));
  if(kind!=='donor')assert(content.text.includes('does not mean a laptop has been allocated'));
 }
});
