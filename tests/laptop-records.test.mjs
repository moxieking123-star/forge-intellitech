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
test('reviewed requests from other forms remain separate from student applications',()=>{
 const summary=summariseLaptopRecords([make('one'),{id:'596c7a0c-e763-423f-90d4-5a1a3e15bee8',payload:{email:'other@example.invalid',subject:'In-school LaunchPad',message:'Laptop enquiry'}}]);
 assert.equal(summary.publicCounts.requests,1);assert.equal(summary.publicCounts.otherLaptopEnquiries,1);assert.equal(summary.publicCounts.totalRequests,2);
 assert.deepEqual(summary.publicCounts.otherRequestLocations,[{state:'Oyo',count:1}]);
});
test('new laptop requests through general forms are included without treating curriculum descriptions as requests',()=>{
 const other={id:'general',payload:{email:'general@example.invalid',subject:'Forge enquiry — Giving a laptop',message:'I really need a laptop to complete my cybersecurity course.'}};
 const summary=summariseLaptopRecords([other,{...other,id:'repeat'},{id:'school',payload:{email:'school@example.invalid',subject:'School programme',message:'Our curriculum teaches technology and laptop skills.'}}]);
 assert.equal(summary.publicCounts.requests,0);assert.equal(summary.publicCounts.otherLaptopEnquiries,1);assert.equal(summary.publicCounts.totalRequests,1);
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
 const enquiry=laptopReply('enquiry','Example','reference');
 assert(enquiry.text.includes('SS1–SS3'));assert(enquiry.text.includes('/request-support'));assert(enquiry.text.includes('please do not submit it again'));
});
