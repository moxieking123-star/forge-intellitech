import test from 'node:test';
import assert from 'node:assert/strict';
import {deliveryEnabled,deliveryContent,idempotencyKey} from '../lib/notification-delivery.ts';
const job={id:'123',queue:'school',kind:'school_onboarding_received',recipient:'programs@forgeintellitech.com',lease_token:'lease',payload:{message:'<script>x</script>'}};
test('transport requires explicit enablement, key and restricted sender',()=>{
 assert.equal(deliveryEnabled({}),false);
 assert.equal(deliveryEnabled({EMAIL_DELIVERY_ENABLED:'true',RESEND_API_KEY:'test',FROM_EMAIL:'programs@forgeintellitech.com'}),false);
 assert.equal(deliveryEnabled({EMAIL_DELIVERY_ENABLED:'true',RESEND_API_KEY:'test',FROM_EMAIL:'programs@auth.forgeintellitech.com'}),true);
});
test('notification templates reject arbitrary destinations and template injection',()=>{
 assert.throws(()=>deliveryContent({...job,recipient:'outsider@example.test'}));
 assert.throws(()=>deliveryContent({...job,kind:'custom'}));
 assert.equal(deliveryContent(job).html,undefined);
 assert.ok(deliveryContent(job).text.includes('<script>'));
});
test('provider key survives retries and separates queues',()=>{
 assert.equal(idempotencyKey(job),'forge-school-123');
 assert.notEqual(idempotencyKey(job),idempotencyKey({...job,queue:'proposal'}));
});
test('proposal address is bound to durable request and founder copy escapes values',()=>{
 const p={...job,queue:'proposal',kind:'school_proposal_requested',recipient:'lead@example.test',payload:{name:'<b>Lead</b>',school:'A & B',email:'lead@example.test'}};
 assert.ok(deliveryContent(p).html.includes('&lt;b&gt;'));
 assert.throws(()=>deliveryContent({...p,recipient:'other@example.test'}));
});
