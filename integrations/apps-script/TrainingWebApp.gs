/** Install only in the standalone training TEST project, never the operations app. */
/** Run once from the test editor to authorise Google spreadsheet access.
 * Reads the isolated test schema only; no credentials or personal rows returned. */
function forgeTrainingConnectionCheck() {
  var props=PropertiesService.getScriptProperties().getProperties();
  if (props.TRAINING_SPREADSHEET_ID !== '1o6P25drEjtvG1dizKwhshA1csv02wf0sC40fqAbEn5s' || !/^[a-f0-9]{64}$/i.test(props.TRAINING_BRIDGE_SIGNING_KEY || '')) throw new Error('Configure the isolated test workbook and signing key in Script Properties first.');
  var sheet=SpreadsheetApp.openById(props.TRAINING_SPREADSHEET_ID).getSheetByName('Training_Config');
  if (!sheet || sheet.getRange(2,2).getValue() !== 'FORGE_TRAINING_V1' || sheet.getRange(3,2).getValue() !== 'test') throw new Error('Invalid test workbook');
  return {connected:true,environment:'test',writeEnabled:sheet.getRange(4,2).getValue() === true};
}
function doPost(e) {
  var result;
  try {
    var props=PropertiesService.getScriptProperties().getProperties();
    if (props.TRAINING_BRIDGE_ENABLED !== 'true' || !e || !e.postData || e.postData.type !== 'application/json' || typeof e.postData.contents !== 'string' || e.postData.contents.length>16384) throw new Error('Unavailable');
    var envelope=JSON.parse(e.postData.contents),action=envelope && envelope.action;
    var config={enabled:true,secret:props.TRAINING_BRIDGE_SIGNING_KEY};
    if (['trainee.provision','trainee.session','trainee.workspace','staff.training'].indexOf(action)<0) throw new Error('Unavailable');
    // Reject unauthenticated traffic before any spreadsheet reads.
    var now=Math.floor(Date.now()/1000);
    if (!(action === 'trainee.provision' ? forgeTrainingVerify_(envelope,config.secret,now) : action === 'trainee.session' ? forgeTrainingVerifySession_(envelope,config.secret,now) : action === 'trainee.workspace' ? forgeTrainingVerifyWorkspace_(envelope,config.secret,now) : forgeTrainingVerifyReview_(envelope,config.secret,now))) throw new Error('Unavailable');
    var environment=props.TRAINING_ENVIRONMENT||'test';
    if(['test','production'].indexOf(environment)<0||(environment==='production'&&props.TRAINING_SPREADSHEET_ID==='1o6P25drEjtvG1dizKwhshA1csv02wf0sC40fqAbEn5s'))throw new Error('Unavailable');
    var store=forgeTrainingCreateStore_({enabled:true,spreadsheetId:props.TRAINING_SPREADSHEET_ID,environment:environment,deferValidation:true});
    result=action === 'trainee.provision' ? forgeTrainingHandleProvision_(envelope,config,store,now) : action === 'trainee.session' ? forgeTrainingHandleSession_(envelope,config,store,now) : action === 'trainee.workspace' ? forgeTrainingHandleWorkspace_(envelope,config,store,now) : forgeTrainingHandleReview_(envelope,config,store,now);
  } catch (_) {result={error:'Training request unavailable'};}
  return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
}
