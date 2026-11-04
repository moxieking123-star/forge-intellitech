// Read-only audit. Raw submissions are saved only under the ignored private-assets directory.
import fs from 'node:fs';
const config={};
for(const line of fs.readFileSync('.env.local','utf8').split(/\r?\n/)) {
 const match=line.match(/^([A-Z][A-Z0-9_]*)=(.*)$/);
 if(match) config[match[1]]=match[2].trim().replace(/^(['"])(.*)\1$/,'$2');
}
const key=config.SUPABASE_SERVICE_ROLE_KEY;
if(!key) throw Error('Required local server credential is not configured.');
const base='https://deblssilgleuiccsgdcy.supabase.co';
const headers={apikey:key,Authorization:`Bearer ${key}`,'Content-Type':'application/json'};
const rows=[];
for(let offset=0;offset<=10000;offset+=50){
 const response=await fetch(base+'/rest/v1/rpc/forge_participation_staff_action',{method:'POST',headers,body:JSON.stringify({p_user_id:'4947d5b6-6426-4389-87fd-9d900813b83b',p_verified_email:'admin@forgeintellitech.com',p_action:'list',p_payload:{offset,status:'',kind:''}}),signal:AbortSignal.timeout(20000)});
 if(!response.ok) throw Error(`Participation audit returned HTTP ${response.status}.`);
 const result=await response.json();
 if(!Array.isArray(result.items)) throw Error('Staff audit access could not be confirmed.');
 rows.push(...result.items);
 if(offset+result.items.length>=result.total) break;
}
const legacy=[];
for(const table of ['contact_submissions','sponsor_submissions']){
 const response=await fetch(base+`/rest/v1/${table}?select=*&limit=1000`,{headers,signal:AbortSignal.timeout(20000)});
 if(response.ok){const items=await response.json();legacy.push(...items.map(row=>({...row,auditSource:table})));}
 else if(![404,406].includes(response.status)) throw Error(`Legacy audit returned HTTP ${response.status}.`);
}
fs.mkdirSync('private-assets/laptop-audit',{recursive:true});
fs.writeFileSync('private-assets/laptop-audit/intakes.json',JSON.stringify({at:new Date().toISOString(),rows,legacy},null,2),{mode:0o600});
console.log(JSON.stringify({participationRecords:rows.length,legacyRecords:legacy.length,laptopCandidates:rows.filter(row=>/laptop|device/i.test(JSON.stringify(row.payload))).map(row=>({id:row.id,subject:row.payload.subject,createdAt:row.created_at,status:row.status})),legacyCandidates:legacy.filter(row=>/laptop|device/i.test(JSON.stringify(row))).map(row=>({id:row.id,subject:row.subject,source:row.auditSource}))},null,2));
