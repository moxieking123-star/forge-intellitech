import test from 'node:test';
import assert from 'node:assert/strict';
import { referralSignInFailure, referralSessionCallback, referralReturnUrl } from '../lib/referrals/signin.ts';

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
test('callback credentials can be captured before asynchronous configuration and removed from the URL', () => {
  const result=referralSessionCallback('http://localhost:3009/earn-with-forge?source=school#access_token=fictional-access&refresh_token=fictional-refresh&token_type=bearer&expires_in=3600');
  assert.deepEqual(result,{session:{access_token:'fictional-access',refresh_token:'fictional-refresh'},cleanUrl:'/earn-with-forge?source=school#account'});
  assert.equal(referralSessionCallback('http://localhost:3009/earn-with-forge#account'),null);
  assert.equal(referralSessionCallback('http://localhost:3009/earn-with-forge#access_token=partial'),null);
  assert.equal(referralSessionCallback('http://localhost:3009/earn-with-forge#error=denied&access_token=bad&refresh_token=bad&token_type=bearer'),null);
});
test('email callback requests exactly the allowed URL without an anchor',()=>{
  assert.equal(referralReturnUrl('http://localhost:3009'),'http://localhost:3009/earn-with-forge');
});
