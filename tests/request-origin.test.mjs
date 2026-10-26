import test from 'node:test';
import assert from 'node:assert/strict';
import { sameOrigin } from '../lib/request-origin.ts';
test('browser host matches even when Next uses an internal localhost URL',()=>{
  const request=new Request('http://localhost:3001/api/programmes/proposal',{headers:{host:'127.0.0.1:3001',origin:'http://127.0.0.1:3001'}});
  assert(sameOrigin(request));
});
test('reject cross-origin, mismatched scheme, missing origin and spoofed forwarding',()=>{
  for(const origin of ['http://evil.example','https://127.0.0.1:3001','http://localhost:3001','null',''])assert.equal(sameOrigin(new Request('http://localhost:3001/api',{headers:{host:'127.0.0.1:3001',origin,'x-forwarded-host':'evil.example'}})),false);
});
