const statuses=['all','never_started','in_progress','abandoned','expired','not_passed','passed','review_required'];
const uuid=(v:unknown)=>typeof v==='string'&&/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(v);
export function parseRecruitmentReview(value:unknown):{action:'list'|'reset';payload:Record<string,unknown>}|null{
 if(!value||typeof value!=='object'||Array.isArray(value))return null;
 const b=value as Record<string,unknown>;
 if(b.action==='list'){
  if(Object.keys(b).some(k=>!['action','filters'].includes(k)))return null;
  const f=(b.filters??{}) as Record<string,unknown>;
  if(!f||typeof f!=='object'||Array.isArray(f)||Object.keys(f).some(k=>!['status','search','offset'].includes(k)))return null;
  const status=f.status??'all',search=f.search??'',offset=f.offset??0;
  if(typeof status!=='string'||!statuses.includes(status)||typeof search!=='string'||search.length>100||/[\x00-\x1f]/.test(search)||!Number.isInteger(offset)||Number(offset)<0||Number(offset)>10000)return null;
  return {action:'list',payload:{status,search:search.trim(),offset}};
 }
 if(b.action==='reset'){
  if(Object.keys(b).length!==5||Object.keys(b).some(k=>!['action','id','version','requestId','reason'].includes(k))||!uuid(b.id)||!uuid(b.requestId)||!Number.isInteger(b.version)||Number(b.version)<1||typeof b.reason!=='string'||b.reason.trim().length<20||b.reason.length>1000||/[\x00-\x08\x0b\x0c\x0e-\x1f]/.test(b.reason))return null;
  return {action:'reset',payload:{id:b.id,version:b.version,requestId:b.requestId,reason:b.reason.trim()}};
 }
 return null;
}
