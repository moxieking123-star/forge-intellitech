import test from 'node:test';
import assert from 'node:assert/strict';
import {parseLaptopIntake,compatibleLaptopOffer,deliveredLaptops} from '../lib/laptop-initiative.ts';

const student={role:'Student',applicantName:'Sample learner',email:'TEST@example.com',studentName:'Sample',school:'Fictional school',class:'SS2',location:'Ikeja, Lagos',schoolCategory:'Public secondary school',guardianName:'Sample adult',guardianContact:'00000000000',purpose:'Learn to build from the beginning',conditionPreference:'New or used is fine',skills:'Starting',parentAwareness:'Yes, they know',donorConversation:'No, I would rather not',access:'No regular computer access',project:'Learn to build websites',source:'Forge website'};
test('student intake requires senior secondary eligibility and guardian contact',()=>{
  assert.equal(parseLaptopIntake({kind:'student',values:student}).values.email,'test@example.com');
  for(const changes of [{class:'JSS3'},{guardianContact:''},{schoolCategory:'University'},{project:''},{unexpected:'value'}]) assert.equal(parseLaptopIntake({kind:'student',values:{...student,...changes}}),null);
});
test('malformed and oversized intake is rejected before persistence',()=>{
  for(const value of [null,[],{kind:'student',values:[]},{kind:'unknown',values:student},{kind:'student',values:{...student,skills:'a'.repeat(1001)}},{kind:'student',values:{...student,email:'invalid'}}]) assert.equal(parseLaptopIntake(value),null);
});
test('matching honours location, purpose and acceptance of used devices',()=>{
  const request={location:'Ikeja, Lagos',condition:'any',purpose:'project'};
  assert.equal(compatibleLaptopOffer(request,{location:' ikeja, LAGOS ',condition:'used',purpose:'project'}),true);
  assert.equal(compatibleLaptopOffer(request,{location:'Abuja',condition:'used',purpose:'project'}),false);
  assert.equal(compatibleLaptopOffer({...request,condition:'new'},{location:'Ikeja, Lagos',condition:'used',purpose:'any'}),false);
  assert.equal(compatibleLaptopOffer(request,{location:'Anywhere in Nigeria',condition:'new',purpose:'learning'}),false);
});
test('confirmed historical deliveries reconcile by state',()=>{
  assert.equal(deliveredLaptops.total,3);
  assert.equal(deliveredLaptops.states.reduce((total,item)=>total+item.count,0),3);
});
