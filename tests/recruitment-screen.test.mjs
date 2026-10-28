import test from 'node:test';
import assert from 'node:assert/strict';
import {deadlineClock,assessmentOutcome} from '../lib/recruitment/screen.ts';
test('countdown uses elapsed monotonic time, not the visitor wall clock',()=>{const left=deadlineClock('2026-10-28T12:05:00Z','2026-10-28T12:00:00Z',100);assert.equal(left(100),300);assert.equal(left(1100),299);assert.equal(left(300100),0);assert.equal(left(900100),0);});
test('invalid clock data fails closed',()=>{for(const args of [['bad','bad',0],['2026-10-28T12:10:00Z','2026-10-28T12:00:00Z',0]])assert.throws(()=>deadlineClock(...args));});
test('passed screen says training preparation; it never promises a job or live account',()=>{const message=assessmentOutcome('passed',23);assert.match(message,/training access is being prepared/i);assert.doesNotMatch(message,/hired|employee|account is ready/i);assert.match(assessmentOutcome('not_passed',22),/22 of 30/);});
