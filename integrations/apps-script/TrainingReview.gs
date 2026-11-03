/** Staff authority is established by the server before signing this envelope. */
function forgeTrainingVerifyReview_(e,secret,now){
 try{
  if(!forgeTrainingExact_(e,['version','action','timestamp','nonce','payload','signature'])||e.version!==1||e.action!=='staff.training'||!Number.isSafeInteger(e.timestamp)||e.timestamp<now-300||e.timestamp>now+60||typeof e.nonce!=='string'||!/^[a-f0-9]{48}$/.test(e.nonce)||typeof secret!=='string'||!/^[a-f0-9]{64}$/i.test(secret)||typeof e.signature!=='string'||!/^[a-f0-9]{64}$/.test(e.signature))return false;
  var p=e.payload;
  if(!forgeTrainingExact_(p,['actorId','operation','requestId','submissionId','expectedReviewId','status','feedback','offset','filter'])||!forgeTrainingUuid_(p.actorId)||!forgeTrainingUuid_(p.requestId)||!Number.isInteger(p.offset)||p.offset<0||p.offset>10000||typeof p.feedback!=='string'||p.feedback.length>1200||/[\x00-\x08\x0b\x0c\x0e-\x1f]/.test(p.feedback))return false;
  if(p.operation==='list'){if(p.submissionId!==''||p.expectedReviewId!==''||p.status!==''||p.feedback!==''||['all','awaiting_review','needs_changes','reviewed'].indexOf(p.filter)<0)return false;}
  else{if(!forgeTrainingUuid_(p.submissionId)||p.offset!==0||p.filter!=='all')return false;if(p.operation==='detail'){if(p.expectedReviewId!==''||p.status!==''||p.feedback!=='')return false;}else if(p.operation!=='review'||(p.expectedReviewId!==''&&!forgeTrainingUuid_(p.expectedReviewId))||['needs_changes','reviewed'].indexOf(p.status)<0||p.feedback.trim().length<20)return false;}
  var canonical=JSON.stringify([e.version,e.action,e.timestamp,e.nonce,p.actorId,p.operation,p.requestId,p.submissionId,p.expectedReviewId,p.status,p.feedback,p.offset,p.filter]);
  var key=secret.match(/../g).map(function(hex){var b=parseInt(hex,16);return b>127?b-256:b;});
  var signature=forgeTrainingHex_(Utilities.computeHmacSha256Signature(Utilities.newBlob(canonical).getBytes(),key)),difference=0;
  for(var i=0;i<signature.length;i++)difference|=signature.charCodeAt(i)^e.signature.charCodeAt(i);return difference===0;
 }catch(_){return false;}
}
function forgeTrainingHandleReview_(e,config,store,now){
 if(!config||config.enabled!==true||!forgeTrainingVerifyReview_(e,config.secret,now))throw Error('Invalid training review');
 return store.withLock(function(){if(store.hasNonce(e.nonce))throw Error('Training nonce replay');store.rememberNonce(e.nonce,now+360);return store.reviewWorkspace(e.payload);});
}
