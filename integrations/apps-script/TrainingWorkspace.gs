/** Session-scoped isolated training work. Never accepts a browser-supplied owner. */
function forgeTrainingVerifyWorkspace_(e,secret,now){
 try{
  if(!forgeTrainingExact_(e,['version','action','timestamp','nonce','payload','signature'])||e.version!==1||e.action!=='trainee.workspace'||!Number.isSafeInteger(e.timestamp)||e.timestamp<now-300||e.timestamp>now+60||typeof e.nonce!=='string'||!/^[a-f0-9]{48}$/.test(e.nonce)||typeof secret!=='string'||!/^[a-f0-9]{64}$/i.test(secret)||typeof e.signature!=='string'||!/^[a-f0-9]{64}$/.test(e.signature))return false;
  var p=e.payload;
  if(!forgeTrainingExact_(p,['token','operation','requestId','programme','lessonId','text'])||typeof p.token!=='string'||!/^[A-Za-z0-9_-]{43}$/.test(p.token)||typeof p.requestId!=='string'||!/^[a-f0-9-]{36}$/.test(p.requestId)||typeof p.text!=='string'||p.text.length>1200||/[\x00-\x08\x0b\x0c\x0e-\x1f]/.test(p.text))return false;
  if(p.operation==='read'){if(p.programme!==''||p.lessonId!==''||p.text!=='')return false;}
  else{if(['elytech','techup'].indexOf(p.programme)<0)return false;if(p.operation==='select'){if(p.lessonId!==''||p.text!=='')return false;}else if((typeof p.lessonId!=='string'||!/^day-([1-9]|1[0-4])$/.test(p.lessonId))||(p.operation==='complete'?p.text!=='':p.operation!=='submit'||p.text.trim().length<30))return false;}
  var canonical=JSON.stringify([e.version,e.action,e.timestamp,e.nonce,p.token,p.operation,p.requestId,p.programme,p.lessonId,p.text]);
  var key=secret.match(/../g).map(function(hex){var b=parseInt(hex,16);return b>127?b-256:b;});
  var signature=forgeTrainingHex_(Utilities.computeHmacSha256Signature(Utilities.newBlob(canonical).getBytes(),key)),difference=0;
  for(var i=0;i<signature.length;i++)difference|=signature.charCodeAt(i)^e.signature.charCodeAt(i);return difference===0;
 }catch(_){return false;}
}
function forgeTrainingHandleWorkspace_(e,config,store,now){
 if(!config||config.enabled!==true||!forgeTrainingVerifyWorkspace_(e,config.secret,now))throw Error('Invalid training request');
 return store.withLock(function(){
  if(store.hasNonce(e.nonce))throw Error('Training nonce replay');
  var session=store.getSession(e.payload.token);if(!session)throw Error('Training sign-in required');
  store.rememberNonce(e.nonce,now+360);
  return store.workspace(session.traineeId,e.payload);
 });
}
