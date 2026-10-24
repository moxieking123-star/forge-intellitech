import test from 'node:test';import assert from 'node:assert/strict';import {GET} from '../app/api/test-email/route.ts';
test('public email diagnostic is disabled and discloses no configuration',async()=>{const res=await GET();assert.equal(res.status,404);assert.deepEqual(await res.json(),{error:'Not found.'});assert.match(res.headers.get('cache-control'),/no-store/);});
