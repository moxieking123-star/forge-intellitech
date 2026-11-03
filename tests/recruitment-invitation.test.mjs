import test from 'node:test';
import assert from 'node:assert/strict';
import {trainingInvitation} from '../lib/recruitment/invitation.ts';
const person={verifiedEmail:'person@example.invalid',displayName:'Ayo',traineeId:'TRN-fixture'};
test('welcome is training-only and points to the fixed Forge dashboard',()=>{const mail=trainingInvitation(person);assert.equal(mail.to,person.verifiedEmail);assert.match(mail.text,/https:\/\/app\.forgeintellitech\.com/);assert.match(mail.text,/passed/);assert.match(mail.text,/not an offer of employment/);assert.ok(!mail.text.includes('password'));});
test('rejects header injection, unverified fields and arbitrary destinations',()=>{for(const patch of [{...person,verifiedEmail:'a@b.com\r\nBcc:x@y.com'},{...person,traineeId:'admin'},{...person,displayName:'A\nB'},{...person,url:'https://evil.invalid'}])assert.throws(()=>trainingInvitation(patch));});
test('preserves a human name as text without building unsafe HTML',()=>{const mail=trainingInvitation({...person,displayName:'Ayo <script>'});assert.ok(!('html' in mail));assert.match(mail.text,/Ayo <script>/);});
