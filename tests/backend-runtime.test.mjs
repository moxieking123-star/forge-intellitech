import test from 'node:test';import assert from 'node:assert/strict';
import {backendEnvironmentEnabled,backendPublishableKey} from '../lib/backend-runtime.ts';
test('production backend requires its own explicit release switch',()=>{
 assert.equal(backendEnvironmentEnabled({VERCEL_ENV:'preview'}),true);
 for(const VERCEL_ENV of [undefined,'development','production'])assert.equal(backendEnvironmentEnabled({VERCEL_ENV}),false);
 assert.equal(backendEnvironmentEnabled({VERCEL_ENV:'production',FORGE_PRODUCTION_BACKEND_ENABLED:'true'}),true);
 assert.equal(backendEnvironmentEnabled({VERCEL_ENV:'production',FORGE_PRODUCTION_BACKEND_ENABLED:'false'}),false);
});
test('publishable configuration supports the release name and existing preview setup',()=>{
 const key='header.'+Buffer.from(JSON.stringify({role:'anon'})).toString('base64url')+'.signature';
 assert.equal(backendPublishableKey({FORGE_BACKEND_PUBLISHABLE_KEY:' '+key+' ',PREVIEW_FEEDBACK_ANON_KEY:'old'}),key);
 assert.equal(backendPublishableKey({PREVIEW_FEEDBACK_ANON_KEY:' '+key+' '}),key);
 assert.equal(backendPublishableKey({}),undefined);
});
test('a misconfigured secret or service-role key is never exposed as publishable configuration',()=>{
 const jwt=role=>'header.'+Buffer.from(JSON.stringify({role})).toString('base64url')+'.signature';
 assert.equal(backendPublishableKey({FORGE_BACKEND_PUBLISHABLE_KEY:jwt('service_role')}),undefined);
 assert.equal(backendPublishableKey({FORGE_BACKEND_PUBLISHABLE_KEY:'sb_secret_fixture'}),undefined);
 assert.equal(backendPublishableKey({FORGE_BACKEND_PUBLISHABLE_KEY:'sb_publishable_fixture'}),undefined);
 assert.equal(backendPublishableKey({PREVIEW_FEEDBACK_ANON_KEY:jwt('anon')}),jwt('anon'));
});
