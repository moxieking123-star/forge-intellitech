/** Isolated TEST storage adapter. No active-workbook fallback; not installed live. */
function forgeTrainingCreateStore_(config) {
  if (!config || config.enabled !== true || !/^[\w-]{20,120}$/.test(config.spreadsheetId || '')) throw new Error('Training storage disabled');
  var headers = {
    Training_Config:['Key','Value'],
    Trainees:['Trainee_ID','Applicant_ID','Verified_Email','Display_Name','Assessment_Receipt_ID','Access','Status','Created_At','Updated_At','Programme','Support_Needs'],
    Training_Events:['Event_ID','Payload_Hash','Status','Trainee_ID','Created_At','Updated_At'],
    Training_Nonces:['Nonce_Hash','Expires_At'],
    Training_Sessions:['Session_Hash','Trainee_ID','Expires_At','Created_At','Revoked_At'],
    Training_Audit:['Audit_ID','Trainee_ID','Action','Actor_ID','Created_At','Note'],
    Training_Work:['Request_ID','Trainee_ID','Programme','Lesson_ID','Operation','Text','Payload_Hash','Created_At'],
    Training_Reviews:['Review_ID','Submission_ID','Trainee_ID','Status','Feedback','Actor_ID','Payload_Hash','Created_At']
  };
  var book = SpreadsheetApp.openById(config.spreadsheetId), sheets = {}, locked = false, validated = false, validating = false;
  function rows(name) {
    if (!validated && !validating) throw new Error('Training storage not validated');
    var sheet = sheets[name], count = sheet.getLastRow();
    if (count > 10000) throw new Error('Training storage capacity reached');
    return count > 1 ? sheet.getRange(2,1,count-1,headers[name].length).getValues() : [];
  }
  function validate() {
    validated=false; validating=true;
    try {
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
    validated=true;
    } finally { validating=false; }
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
  function reviewValue(row) {return row?{id:row[0],status:row[3],feedback:decode(row[4]),reviewedAt:new Date(row[7]).toISOString()}:null;}
  // Signed web requests enter withLock immediately. Validate once there rather
  // than repeating all remote header reads both before and inside the lock.
  if (config.deferValidation !== true) validate();
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
    // Called only after a separate server-side verified-identity exchange.
    // Tokens must be generated with a cryptographic RNG, never Utilities.getUuid.
    createSession:function(traineeId,token,expiresAt) {
      requireLock(); var now=Date.now(), owner=find('Trainees',0,traineeId);
      if (typeof token !== 'string' || !/^[A-Za-z0-9_-]{43}$/.test(token) || !Number.isSafeInteger(expiresAt) || expiresAt < now+60000 || expiresAt > now+7200000 || !owner || owner.row[5] !== 'trainee' || owner.row[6] !== 'training') throw new Error('Invalid training session');
      var digest=hash(token);
      if (find('Training_Sessions',0,digest)) throw new Error('Training session conflict');
      append('Training_Sessions',[digest,traineeId,new Date(expiresAt),new Date(),'']);
    },
    getSession:function(token) {
      if (!locked) validate();
      if (typeof token !== 'string' || !/^[A-Za-z0-9_-]{43}$/.test(token)) return null;
      var session=find('Training_Sessions',0,hash(token));
      if (!session || session.row[4] || !Number.isFinite(new Date(session.row[2]).getTime()) || new Date(session.row[2]).getTime() <= Date.now()) return null;
      var owner=find('Trainees',0,session.row[1]);
      if (!owner || owner.row[5] !== 'trainee' || owner.row[6] !== 'training') return null;
      // Never return email, applicant records or staff roles from session lookup.
      return {traineeId:owner.row[0],access:'trainee',expiresAt:new Date(session.row[2]).getTime()};
    },
    workspace:function(traineeId,p) {
      requireLock();
      var owner=find('Trainees',0,traineeId);if(!owner||owner.row[5]!=='trainee'||owner.row[6]!=='training')throw Error('Training sign-in required');
      var all=rows('Training_Work'), own=all.filter(function(row){return row[1]===traineeId;}), programme=owner.row[9]||null;
      if(programme!==null&&['elytech','techup'].indexOf(programme)<0)throw Error('Invalid programme');
      if(p.operation!=='read'){
        if(['select','complete','submit'].indexOf(p.operation)<0||['elytech','techup'].indexOf(p.programme)<0||typeof p.requestId!=='string'||!/^[a-f0-9-]{36}$/.test(p.requestId)||typeof p.text!=='string'||p.text.length>1200||(p.operation==='select'?(p.lessonId!==''||p.text!==''):(p.lessonId!=='day-1'||(p.operation==='complete'?p.text!=='':p.text.trim().length<30))))throw Error('Invalid training work');
        var binding=hash(JSON.stringify([p.operation,p.programme,p.lessonId,p.text])), prior=find('Training_Work',0,p.requestId);
        if(prior&&(prior.row[1]!==traineeId||prior.row[6]!==binding))throw Error('Training request conflict');
        if(!prior){
          if(own.length>=200)throw Error('Training work capacity reached');
          if(p.operation!=='select'&&programme!==p.programme)throw Error('Select programme first');
          append('Training_Work',[p.requestId,traineeId,p.programme,p.lessonId,p.operation,p.text,binding,new Date()]);
        }
        // Reconstruct selection from the durable log, repairing interrupted profile writes.
        own=rows('Training_Work').filter(function(row){return row[1]===traineeId;});
      }
      var selections=own.filter(function(row){return row[4]==='select';});
      if(selections.length){programme=selections[selections.length-1][2];if(owner.row[9]!==programme){var values=owner.row.slice();values[9]=programme;values[8]=new Date();write('Trainees',owner.index,values);}}
      var scoped=own.filter(function(row){return row[2]===programme;}),completed=scoped.some(function(row){return row[4]==='complete'&&row[3]==='day-1';})?['day-1']:[];
      var submissions=scoped.filter(function(row){return row[4]==='submit'&&row[3]==='day-1';}), latest=submissions[submissions.length-1];
      var feedback=latest?rows('Training_Reviews').filter(function(row){return row[1]===latest[0]&&row[2]===traineeId;}):[];
      return {programme:programme,completed:completed,submission:latest?{id:latest[0],text:decode(latest[5]),submittedAt:new Date(latest[7]).toISOString(),review:reviewValue(feedback[feedback.length-1])}:null};
    },
    reviewWorkspace:function(p) {
      requireLock();
      var submissions=rows('Training_Work').filter(function(row){return row[4]==='submit';}), reviews=rows('Training_Reviews'), latestByKey={};
      submissions.forEach(function(row){latestByKey[JSON.stringify([row[1],row[2],row[3]])]=row;});
      function latestReview(id){var matches=reviews.filter(function(row){return row[1]===id;});return matches[matches.length-1]||null;}
      function currentSubmission(row){return latestByKey[JSON.stringify([row[1],row[2],row[3]])]===row;}
      function detail(row){var owner=find('Trainees',0,row[1]),history=reviews.filter(function(r){return r[1]===row[0];}).slice(-5).reverse();return {id:row[0],traineeId:row[1],name:owner?decode(owner.row[3]):row[1],programme:row[2],lessonId:row[3],text:decode(row[5]),submittedAt:new Date(row[7]).toISOString(),review:reviewValue(latestReview(row[0])),history:history.map(function(r){return {id:r[0],status:r[3],reviewedAt:new Date(r[7]).toISOString()};}),current:currentSubmission(row)};}
      if(p.operation==='list'){
        var items=submissions.filter(currentSubmission).filter(function(row){var r=latestReview(row[0]);return p.filter==='all'||(r?r[3]:'awaiting_review')===p.filter;}).reverse();
        return {total:items.length,offset:p.offset,items:items.slice(p.offset,p.offset+10).map(function(row){var d=detail(row);return {id:d.id,traineeId:d.traineeId,name:d.name,programme:d.programme,lessonId:d.lessonId,submittedAt:d.submittedAt,status:d.review?d.review.status:'awaiting_review'};})};
      }
      var found=submissions.filter(function(row){return row[0]===p.submissionId;});if(found.length!==1)return {missing:true};var work=found[0];
      if(p.operation==='detail')return {assignment:detail(work)};
      if(p.operation!=='review'||['needs_changes','reviewed'].indexOf(p.status)<0||typeof p.feedback!=='string'||p.feedback.trim().length<20||p.feedback.length>1200||!forgeTrainingUuid_(p.actorId)||!forgeTrainingUuid_(p.requestId))throw Error('Invalid review');
      var binding=hash(JSON.stringify([p.actorId,p.submissionId,p.expectedReviewId,p.status,p.feedback])),prior=find('Training_Reviews',0,p.requestId),last=latestReview(work[0]);
      if(prior){if(prior.row[6]!==binding||prior.row[2]!==work[1])throw Error('Review request conflict');return {assignment:detail(work)};}
      if(!currentSubmission(work)||(last?last[0]:'')!==p.expectedReviewId)return {conflict:true};
      if(reviews.filter(function(row){return row[1]===work[0];}).length>=50)throw Error('Review capacity reached');
      append('Training_Reviews',[p.requestId,work[0],work[1],p.status,p.feedback,p.actorId,binding,new Date()]);
      reviews=rows('Training_Reviews');return {assignment:detail(work)};
    },
    revokeSession:function(token) {
      requireLock();
      if (typeof token !== 'string' || !/^[A-Za-z0-9_-]{43}$/.test(token)) throw new Error('Invalid training session');
      var session=find('Training_Sessions',0,hash(token));
      if (!session || session.row[4]) return;
      var values=session.row.slice(); values[4]=new Date(); write('Training_Sessions',session.index,values);
    },
    createTrainee:function(p) {
      requireLock();
      if (!p || p.access !== 'trainee' || typeof p.applicantId !== 'string' || !p.applicantId || typeof p.assessmentReceiptId !== 'string' || !p.assessmentReceiptId || typeof p.verifiedEmail !== 'string' || !/^[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+$/.test(p.verifiedEmail) || p.verifiedEmail !== p.verifiedEmail.trim().toLowerCase() || typeof p.displayName !== 'string' || !p.displayName.trim() || p.displayName.length > 120 || /[\x00-\x1f]/.test(p.displayName) || find('Trainees',1,p.applicantId)) throw new Error('Invalid training profile');
      if (rows('Trainees').some(function(row){return decode(row[2]) === p.verifiedEmail || row[4] === p.assessmentReceiptId;})) throw new Error('Training identity conflict');
      var values=['TRN-'+Utilities.getUuid(),p.applicantId,p.verifiedEmail,p.displayName,p.assessmentReceiptId,'trainee','training',new Date(),new Date(),'',''];
      append('Trainees',values); return profile(find('Trainees',1,p.applicantId).row);
    }
  };
}
