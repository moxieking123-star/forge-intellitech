import test from 'node:test';
import assert from 'node:assert/strict';
import {trainingBridgeDestination} from '../lib/recruitment/bridge-config.ts';
const path='/macros/s/'+'A'.repeat(30)+'/exec';
test('only accepts a configured HTTPS Apps Script execution destination',()=>{assert.equal(trainingBridgeDestination('https://script.google.com'+path),'https://script.google.com'+path);for(const value of [null,'http://script.google.com'+path,'https://evil.invalid'+path,'https://script.google.com.evil.invalid'+path,'https://user:pass@script.google.com'+path,'https://script.google.com'+path+'?redirect=elsewhere','https://script.google.com'+path+'#secret','https://script.google.com:444'+path,'https://script.google.com/macros/s/short/exec'])assert.equal(trainingBridgeDestination(value),null);});
