import test from 'node:test';
import assert from 'node:assert/strict';
import { parseFeedback } from '../lib/preview-feedback.ts';
const valid={requestId:'01010101-0101-4101-8101-010101010101',sessionId:'02020202-0202-4202-8202-020202020202',page:'/programmes/elytech',section:'Learning to create',reaction:'Curious',visitorType:'',comment:''};
test('accepts voluntary reaction without visitor type or comment and comment-only feedback',()=>{
  assert.deepEqual(parseFeedback(valid),valid);
  assert.equal(parseFeedback({...valid,reaction:'',comment:'  I cannot find the next step.  '}).comment,'I cannot find the next step.');
});
test('rejects query secrets, private routes, oversized content, unknown enums and extra tracking',()=>{
  for(const patch of [{page:'/?_vercel_share=secret'},{page:'/admin'},{page:'//evil.test'},{page:'/referrer/account'},{comment:'x'.repeat(1201)},{reaction:'Excellent'},{visitorType:'Child under 12'},{requestId:'not-a-uuid'},{section:'x'.repeat(161)},{email:'person@example.com'},{reaction:'',comment:'  '}]) assert.equal(parseFeedback({...valid,...patch}),null,JSON.stringify(patch));
});
