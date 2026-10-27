const uuid=/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i;
const obj=(v:unknown):Record<string,unknown>|null=>v&&typeof v==='object'&&!Array.isArray(v)?v as Record<string,unknown>:null;
const only=(v:Record<string,unknown>,keys:string[])=>Object.keys(v).every(k=>keys.includes(k));
const id=(v:unknown)=>typeof v==='string'&&uuid.test(v);
const text=(v:unknown,max=1000)=>typeof v==='string'&&v.trim().length>0&&v.length<=max&&!/[\x00-\x1f]/.test(v);
const money=(v:unknown)=>Number.isSafeInteger(v)&&Number(v)>=0;
export function financeToday(){return new Intl.DateTimeFormat('en-CA',{timeZone:'Africa/Lagos',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());}
const date=(v:unknown,today:string)=>typeof v==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(v)&&v>='2000-01-01'&&v<=today&&Number.isFinite(new Date(v+'T00:00:00Z').getTime())&&new Date(v+'T00:00:00Z').toISOString().slice(0,10)===v;
// Exact integer calculation, round to the nearest kobo; no salaries deduction is accepted.
export function calculateCommission(gross:number,internet:number,operations:number,tax:number){
 if(![gross,internet,operations,tax].every(money))throw new Error('Use safe nonnegative integer kobo.');
 const net=BigInt(gross)-BigInt(internet)-BigInt(operations)-BigInt(tax);if(net<BigInt(0))throw new Error('Deductions exceed the full contract amount.');
 return {grossKobo:gross,internetKobo:internet,operationsKobo:operations,taxKobo:tax,netKobo:Number(net),rateBps:1500,commissionKobo:Number((net*BigInt(15)+BigInt(50))/BigInt(100))};
}
export function parseFinanceAction(action:unknown,value:unknown,owner=false,today=financeToday()):Record<string,unknown>|null{
 const v=obj(value);if(!v)return null;
 if((action==='list'&&!owner)||action==='statements')return only(v,['offset'])&&Number.isSafeInteger(v.offset??0)&&Number(v.offset??0)>=0&&Number(v.offset??0)<=100000?{offset:v.offset??0}:null;
 if(owner)return null;
 if(action==='calendar')return parseHolidayCalendar(v,today);
 if(action==='close')return only(v,['ownerId','note','reviewed'])&&id(v.ownerId)&&text(v.note)&&v.reviewed===true?{...v,note:(v.note as string).trim()}:null;
 const common=['referralId','version','receiptId','note','reviewed'];
 if(!id(v.referralId)||!id(v.receiptId)||!Number.isSafeInteger(v.version)||Number(v.version)<1||Number(v.version)>=2147483647||!text(v.note)||v.reviewed!==true)return null;
 let keys=common;
 if(action==='start'){
 keys=[...keys,'schoolId','schoolVersion','startsOn','grossKobo','internetKobo','operationsKobo','taxKobo'];
 if(!id(v.schoolId)||!Number.isSafeInteger(v.schoolVersion)||Number(v.schoolVersion)<1||!date(v.startsOn,today))return null;
 try{calculateCommission(v.grossKobo as number,v.internetKobo as number,v.operationsKobo as number,v.taxKobo as number);}catch{return null;}
 }else if(action==='deposit'){
 keys=[...keys,'receivedOn','amountKobo','reference'];if(!date(v.receivedOn,today)||!money(v.amountKobo)||Number(v.amountKobo)<=0||!text(v.reference,200))return null;
 }else if(action==='payment'){
 keys=[...keys,'paidOn','amountKobo','reference','bankName','accountName','accountNumber','completedExternally'];if(!date(v.paidOn,today)||!money(v.amountKobo)||!text(v.reference,200)||!text(v.bankName,120)||!text(v.accountName,200)||typeof v.accountNumber!=='string'||!/^\d{10}$/.test(v.accountNumber)||v.completedExternally!==true)return null;
 }else if(action==='fulfill'){
 keys=[...keys,'requestId'];if(!id(v.requestId))return null;
 }else if(action!=='payable')return null;
 return only(v,keys)?{...v,note:(v.note as string).trim()}:null;
}

const calendarDate=(v:unknown)=>typeof v==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(v)&&Number.isFinite(new Date(v+'T00:00:00Z').getTime())&&new Date(v+'T00:00:00Z').toISOString().slice(0,10)===v;
export function parseHolidayCalendar(value:unknown,today=financeToday()):Record<string,unknown>|null{
 const v=obj(value);if(!v||!only(v,['coveredFrom','coveredThrough','holidays','note','reviewed'])||!calendarDate(v.coveredFrom)||!calendarDate(v.coveredThrough)||!text(v.note)||v.reviewed!==true||!Array.isArray(v.holidays)||v.holidays.length>100)return null;
 const earliest=new Date(today+'T00:00:00Z');earliest.setUTCDate(earliest.getUTCDate()+10);const latest=new Date(today+'T00:00:00Z');latest.setUTCFullYear(latest.getUTCFullYear()+2);
 if(String(v.coveredFrom)<'2000-01-01'||String(v.coveredFrom)>today||String(v.coveredThrough)<earliest.toISOString().slice(0,10)||String(v.coveredThrough)>latest.toISOString().slice(0,10))return null;
 const seen=new Set<string>(),holidays=[];
 for(const item of v.holidays){const h=obj(item);if(!h||!only(h,['date','name','sourceUrl'])||!calendarDate(h.date)||String(h.date)<String(v.coveredFrom)||String(h.date)>String(v.coveredThrough)||!text(h.name,200)||typeof h.sourceUrl!=='string'||h.sourceUrl.length>2000||!/^https:\/\/(?:[a-z0-9-]+\.)*gov\.ng(?:\/[^\s]*)?$/.test(h.sourceUrl)||seen.has(String(h.date)))return null;seen.add(String(h.date));holidays.push({date:h.date,name:(h.name as string).trim(),sourceUrl:h.sourceUrl});}
 return {...v,note:(v.note as string).trim(),holidays};
}
