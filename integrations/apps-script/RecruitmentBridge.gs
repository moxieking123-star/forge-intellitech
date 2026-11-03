/**
 * Offline-tested training-only core. NOT installed or dispatched by the live
 * operations project. A separate private training-store adapter is required.
 * Do not map these profiles to the operational Instructors table or fallback role.
 */
function forgeTrainingHandleProvision_(envelope, config, store, now) {
  if (!config || config.enabled !== true) throw new Error('Training bridge disabled');
  now = now === undefined ? Math.floor(Date.now() / 1000) : now;
  if (!forgeTrainingVerify_(envelope, config.secret, now)) throw new Error('Invalid training envelope');
  var payload = envelope.payload;
  var binding = forgeTrainingHex_(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256,
    Utilities.newBlob(JSON.stringify([payload.applicantId, payload.verifiedEmail, payload.displayName, payload.assessmentReceiptId, payload.eligibility])).getBytes()));
  return store.withLock(function () {
    if (store.hasNonce(envelope.nonce)) throw new Error('Training nonce replay');
    var receipt = store.getEvent(envelope.eventId);
    if (receipt && receipt.payloadHash !== binding) throw new Error('Training event conflict');
    store.rememberNonce(envelope.nonce, now + 360);
    if (receipt && receipt.status === 'complete') {
      if (!/^TRN-[a-zA-Z0-9_-]{1,90}$/.test(receipt.traineeId)) throw new Error('Invalid trainee receipt');
      return {eventId: envelope.eventId, traineeId: receipt.traineeId, status: 'existing'};
    }
    if (!receipt) store.reserveEvent(envelope.eventId, binding);
    var profile = store.findTrainee(payload.applicantId), existed = !!profile;
    if (!profile) profile = store.createTrainee({applicantId: payload.applicantId, verifiedEmail: payload.verifiedEmail,
      displayName: payload.displayName, assessmentReceiptId: payload.assessmentReceiptId, access: 'trainee'});
    if (!profile || profile.applicantId !== payload.applicantId || profile.verifiedEmail !== payload.verifiedEmail ||
      profile.assessmentReceiptId !== payload.assessmentReceiptId || profile.access !== 'trainee' ||
      typeof profile.traineeId !== 'string' || !/^TRN-[a-zA-Z0-9_-]{1,90}$/.test(profile.traineeId)) throw new Error('Invalid trainee profile');
    store.completeEvent(envelope.eventId, binding, profile.traineeId);
    return {eventId: envelope.eventId, traineeId: profile.traineeId, status: existed ? 'existing' : 'created'};
  });
}

function forgeTrainingVerify_(e, secret, now) {
  try {
    if (!forgeTrainingExact_(e, ['version','eventId','timestamp','nonce','action','payload','signature']) ||
      typeof secret !== 'string' || !/^[0-9a-f]{64}$/i.test(secret) || e.version !== 1 || e.action !== 'trainee.provision' ||
      !forgeTrainingUuid_(e.eventId) || !Number.isSafeInteger(e.timestamp) || e.timestamp < 0 || !Number.isSafeInteger(now) ||
      e.timestamp < now - 300 || e.timestamp > now + 60 || typeof e.nonce !== 'string' || !/^[0-9a-f]{48}$/.test(e.nonce) ||
      typeof e.signature !== 'string' || !/^[0-9a-f]{64}$/.test(e.signature)) return false;
    var p = e.payload;
    if (!forgeTrainingExact_(p, ['applicantId','verifiedEmail','displayName','assessmentReceiptId','eligibility']) ||
      !forgeTrainingUuid_(p.applicantId) || !forgeTrainingUuid_(p.assessmentReceiptId) || p.eligibility !== 'training' ||
      !forgeTrainingText_(p.displayName, 120) || !forgeTrainingText_(p.verifiedEmail, 254) ||
      p.verifiedEmail !== p.verifiedEmail.trim().toLowerCase() || !/^[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+$/.test(p.verifiedEmail)) return false;
    var canonical = JSON.stringify([e.version,e.eventId,e.timestamp,e.nonce,e.action,p.applicantId,p.verifiedEmail,p.displayName,p.assessmentReceiptId,p.eligibility]);
    var key = secret.match(/../g).map(function (hex) { var byte = parseInt(hex,16); return byte > 127 ? byte - 256 : byte; });
    var expected = forgeTrainingHex_(Utilities.computeHmacSha256Signature(Utilities.newBlob(canonical).getBytes(), key));
    var difference = 0;
    for (var i = 0; i < expected.length; i++) difference |= expected.charCodeAt(i) ^ e.signature.charCodeAt(i);
    return difference === 0;
  } catch (_) { return false; }
}
function forgeTrainingExact_(value, keys) {
  return !!value && typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length === keys.length &&
    Object.keys(value).every(function (key) { return keys.indexOf(key) !== -1; });
}
function forgeTrainingUuid_(value) { return typeof value === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value); }
function forgeTrainingText_(value, max) { return typeof value === 'string' && !!value.trim() && value.length <= max && !/[\x00-\x1f]/.test(value); }
function forgeTrainingHex_(bytes) { return bytes.map(function (byte) { return ('0' + ((byte + 256) % 256).toString(16)).slice(-2); }).join(''); }
