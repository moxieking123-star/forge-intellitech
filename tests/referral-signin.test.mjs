import test from 'node:test';
import assert from 'node:assert/strict';
import { referralSignInFailure } from '../lib/referrals/signin.ts';

test('expired email links give a safe recovery message and clean URL', () => {
  const result = referralSignInFailure('http://localhost:3009/earn-with-forge?campaign=friend#error=access_denied&error_code=otp_expired&error_description=private%20provider%20detail');
  assert.match(result.message, /expired|already been used/);
  assert.equal(result.cleanUrl, '/earn-with-forge?campaign=friend#account');
  assert.ok(!result.message.includes('private'));
});
test('query callback failures are removed without removing unrelated parameters', () => {
  const result = referralSignInFailure('http://localhost:3009/earn-with-forge?error=access_denied&error_description=secret&source=school#account');
  assert.equal(result.cleanUrl, '/earn-with-forge?source=school#account');
  assert.match(result.message, /new sign-in link/);
});
test('successful token callbacks are left for the auth library to consume', () => {
  assert.equal(referralSignInFailure('http://localhost:3009/earn-with-forge#access_token=secret&refresh_token=secret'), null);
  assert.equal(referralSignInFailure('http://localhost:3009/earn-with-forge#account'), null);
});
