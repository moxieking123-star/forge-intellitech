import test from 'node:test';
import assert from 'node:assert/strict';
import {recruitmentAuthConfig} from '../lib/recruitment/auth-config.ts';
const key='header.'+Buffer.from(JSON.stringify({role:'anon'})).toString('base64url')+'.signature';
test('training can use verified email without opening public recruitment',()=>{const config=recruitmentAuthConfig({TRAINING_SIGN_IN_ENABLED:'true',FORGE_BACKEND_PUBLISHABLE_KEY:key,RECRUITMENT_EMAIL_LOGIN_ENABLED:'true'});assert.equal(config.emailLoginEnabled,true);assert.equal(config.key,key);});
test('closed switches or a service-role key never yield client configuration',()=>{assert.equal(recruitmentAuthConfig({FORGE_BACKEND_PUBLISHABLE_KEY:key}),null);const service='header.'+Buffer.from(JSON.stringify({role:'service_role'})).toString('base64url')+'.signature';assert.equal(recruitmentAuthConfig({TRAINING_SIGN_IN_ENABLED:'true',FORGE_BACKEND_PUBLISHABLE_KEY:service}),null);});
