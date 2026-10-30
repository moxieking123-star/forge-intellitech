/** Isolated TEST storage adapter. No active-workbook fallback; not installed live. */
function forgeTrainingCreateStore_(config) {
  if (!config || config.enabled !== true || !/^[\w-]{20,120}$/.test(config.spreadsheetId || '')) throw new Error('Training storage disabled');
  var headers = {
    Training_Config:['Key','Value'],
    Trainees:['Trainee_ID','Applicant_ID','Verified_Email','Display_Name','Assessment_Receipt_ID','Access','Status','Created_At','Updated_At','Programme','Support_Needs'],
    Training_Events:['Event_ID','Payload_Hash','Status','Trainee_ID','Created_At','Updated_At'],
    Training_Nonces:['Nonce_Hash','Expires_At'],
    Training_Sessions:['Session_Hash','Trainee_ID','Expires_At','Created_At','Revoked_At'],
    Training_Audit:['Audit_ID','Trainee_ID','Action','Actor_ID','Created_At','Note']
  };
  var book = SpreadsheetApp.openById(config.spreadsheetId), sheets = {}, locked = false;
  function rows(name) {
    var sheet = sheets[name], count = sheet.getLastRow();
    if (count > 10000) throw new Error('Training storage capacity reached');
    return count > 1 ? sheet.getRange(2,1,count-1,headers[name].length).getValues() : [];
  }
  function validate() {
    Object.keys(headers).forEach(function(name) {
      var sheet = book.getSheetByName(name);
      if (!sheet || JSON.stringify(sheet.getRange(1,1,1,headers[name].length).getValues()[0]) !== JSON.stringify(headers[name])) throw new Error('Invalid training schema');
      sheets[name] = sheet;
    });
    var settings = {};
    rows('Training_Config').forEach(function(row) {
      if (Object.prototype.hasOwnProperty.call(settings,row[0])) throw new Error('Duplicate training setting');
      settings[row[0]] = row[1];
    });
    if (settings.SchemaVersion !== 'FORGE_TRAINING_V1' || settings.Environment !== 'test' || settings.WriteEnabled !== true) throw new Error('Training storage disabled');
  }
  function requireLock() { if (!locked) throw new Error('Training lock required'); }
  function find(name,key,value) {
    var matches = rows(name).map(function(row,index){return {row:row,index:index+2};}).filter(function(item){return item.row[key] === value;});
    if (matches.length > 1) throw new Error('Ambiguous training identity');
    return matches[0] || null;
  }
  // Reversible literal encoding prevents user text becoming a spreadsheet formula.
  function encode(text) { return /^\s*[=+@-]/.test(text) || text.indexOf('~forge-text~') === 0 ? '~forge-text~'+JSON.stringify(text) : text; }
  function decode(text) { return typeof text === 'string' && text.indexOf('~forge-text~') === 0 ? JSON.parse(text.slice(12)) : text; }
  function write(name,index,values) {
    requireLock();
    if (index > 10000) throw new Error('Training storage capacity reached');
    sheets[name].getRange(index,1,1,headers[name].length).setValues([values.map(function(v){return typeof v === 'string' ? encode(v) : v;})]);
  }
  function append(name,values) { write(name,sheets[name].getLastRow()+1,values); }
  function hash(value) { return Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256,value).map(function(b){return ('0'+((b+256)%256).toString(16)).slice(-2);}).join(''); }
  function profile(row) { return {traineeId:row[0],applicantId:row[1],verifiedEmail:decode(row[2]),displayName:decode(row[3]),assessmentReceiptId:row[4],access:row[5],status:row[6]}; }
  validate();
  return {
    withLock:function(callback) {
      if (locked) throw new Error('Nested training lock');
      var lock = LockService.getScriptLock();
      if (!lock.tryLock(5000)) throw new Error('Training storage busy');
      try { validate(); locked=true; return callback(); } finally { locked=false; lock.releaseLock(); }
    },
    hasNonce:function(nonce) {
      var found=find('Training_Nonces',0,hash(nonce));
      return !!found && new Date(found.row[1]).getTime() > Date.now();
    },
    rememberNonce:function(nonce,expires) {
      requireLock();
      if (!/^[a-f0-9]{48}$/.test(nonce) || !Number.isSafeInteger(expires) || expires*1000 <= Date.now() || expires*1000 > Date.now()+420000) throw new Error('Invalid training nonce');
      var digest=hash(nonce), found=find('Training_Nonces',0,digest);
      if (found && new Date(found.row[1]).getTime() > Date.now()) throw new Error('Training nonce replay');
      var values=[digest,new Date(expires*1000)];
      if (found) write('Training_Nonces',found.index,values); else append('Training_Nonces',values);
    },
    getEvent:function(id) {
      var found=find('Training_Events',0,id);
      return found ? {payloadHash:found.row[1],status:found.row[2],traineeId:found.row[3]} : null;
    },
    reserveEvent:function(id,binding) {
      requireLock();
      if (find('Training_Events',0,id) || !/^[a-f0-9]{64}$/.test(binding)) throw new Error('Invalid training event');
      append('Training_Events',[id,binding,'pending','',new Date(),new Date()]);
    },
    completeEvent:function(id,binding,traineeId) {
      requireLock(); var found=find('Training_Events',0,id);
      if (!found || found.row[1] !== binding || !/^TRN-[\w-]{1,90}$/.test(traineeId) || (found.row[2] === 'complete' && found.row[3] !== traineeId)) throw new Error('Training event conflict');
      write('Training_Events',found.index,[id,binding,'complete',traineeId,found.row[4],new Date()]);
    },
    findTrainee:function(id) { var found=find('Trainees',1,id); return found ? profile(found.row) : null; },
    createTrainee:function(p) {
      requireLock();
      if (!p || p.access !== 'trainee' || typeof p.applicantId !== 'string' || !p.applicantId || typeof p.assessmentReceiptId !== 'string' || !p.assessmentReceiptId || typeof p.verifiedEmail !== 'string' || !/^[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+$/.test(p.verifiedEmail) || p.verifiedEmail !== p.verifiedEmail.trim().toLowerCase() || typeof p.displayName !== 'string' || !p.displayName.trim() || p.displayName.length > 120 || /[\x00-\x1f]/.test(p.displayName) || find('Trainees',1,p.applicantId)) throw new Error('Invalid training profile');
      if (rows('Trainees').some(function(row){return decode(row[2]) === p.verifiedEmail || row[4] === p.assessmentReceiptId;})) throw new Error('Training identity conflict');
      var values=['TRN-'+Utilities.getUuid(),p.applicantId,p.verifiedEmail,p.displayName,p.assessmentReceiptId,'trainee','training',new Date(),new Date(),'',''];
      append('Trainees',values); return profile(find('Trainees',1,p.applicantId).row);
    }
  };
}
