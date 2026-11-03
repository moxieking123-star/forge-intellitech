/** Private signed bridge handler. No public dispatcher; not installed live. */
function forgeTrainingGetMyEntry_(token,store) {
  var session=store.getSession(token);
  if (!session || session.access !== 'trainee' || typeof session.traineeId !== 'string' || !/^TRN-[\w-]{1,90}$/.test(session.traineeId) || !Number.isFinite(session.expiresAt) || session.expiresAt <= Date.now()) throw new Error('Training sign-in required');
  // No operational refreshUser_ or instructor fallback is used here.
  return {traineeId:session.traineeId,access:'trainee',stage:'programme-selection',expiresAt:session.expiresAt};
}
function forgeTrainingHandleSession_(e,config,store,now) {
  now=now === undefined ? Math.floor(Date.now()/1000) : now;
  if (!config || config.enabled !== true || !forgeTrainingVerifySession_(e,config.secret,now)) throw new Error('Invalid training session request');
  return store.withLock(function(){
    if (store.hasNonce(e.nonce)) throw new Error('Training nonce replay');
    var p=e.payload, owner=store.findTrainee(p.applicantId);
    if (!owner || owner.traineeId !== p.traineeId || owner.verifiedEmail !== p.verifiedEmail || owner.assessmentReceiptId !== p.assessmentReceiptId || owner.access !== 'trainee' || owner.status !== 'training') throw new Error('Training identity mismatch');
    store.rememberNonce(e.nonce,now+360);
    store.createSession(p.traineeId,p.token,p.expiresAt);
    return {traineeId:p.traineeId,access:'trainee',expiresAt:p.expiresAt};
  });
}
function forgeTrainingVerifySession_(e,secret,now) {
  try {
    if (!forgeTrainingExact_(e,['version','action','timestamp','nonce','payload','signature']) || e.version !== 1 || e.action !== 'trainee.session' || typeof secret !== 'string' || !/^[a-f0-9]{64}$/i.test(secret) || !Number.isSafeInteger(now) || !Number.isSafeInteger(e.timestamp) || e.timestamp<now-300 || e.timestamp>now+60 || !/^[a-f0-9]{48}$/.test(e.nonce) || typeof e.nonce !== 'string' || typeof e.signature !== 'string' || !/^[a-f0-9]{64}$/.test(e.signature)) return false;
    var p=e.payload;
    if (!forgeTrainingExact_(p,['applicantId','verifiedEmail','assessmentReceiptId','traineeId','token','expiresAt']) || !forgeTrainingUuid_(p.applicantId) || !forgeTrainingUuid_(p.assessmentReceiptId) || typeof p.traineeId !== 'string' || !/^TRN-[\w-]{1,90}$/.test(p.traineeId) || typeof p.token !== 'string' || !/^[A-Za-z0-9_-]{43}$/.test(p.token) || !forgeTrainingText_(p.verifiedEmail,254) || p.verifiedEmail !== p.verifiedEmail.trim().toLowerCase() || !/^[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+$/.test(p.verifiedEmail) || !Number.isSafeInteger(p.expiresAt) || p.expiresAt<now*1000+60000 || p.expiresAt>now*1000+7200000) return false;
    var canonical=JSON.stringify([e.version,e.action,e.timestamp,e.nonce,p.applicantId,p.verifiedEmail,p.assessmentReceiptId,p.traineeId,p.token,p.expiresAt]);
    var key=secret.match(/../g).map(function(hex){var b=parseInt(hex,16);return b>127?b-256:b;});
    var signature=forgeTrainingHex_(Utilities.computeHmacSha256Signature(Utilities.newBlob(canonical).getBytes(),key));
    var difference=0; for(var i=0;i<signature.length;i++) difference |= signature.charCodeAt(i)^e.signature.charCodeAt(i);
    return difference === 0;
  } catch (_) {return false;}
}
