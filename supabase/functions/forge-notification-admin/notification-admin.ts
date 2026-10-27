const uuid=/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i;
export function parseNotificationAdmin(action:unknown,value:unknown){
 if(!value||typeof value!=='object'||Array.isArray(value))return null;
 const v=value as Record<string,unknown>,keys=action==='list'?['queue','offset']:['queue','id','note','reviewed'];
 if(Object.keys(v).some(k=>!keys.includes(k))||!['school','participation','proposal'].includes(String(v.queue)))return null;
 if(action==='list')return Number.isSafeInteger(v.offset??0)&&Number(v.offset??0)>=0&&Number(v.offset??0)<=100000?{queue:v.queue,offset:v.offset??0}:null;
 if(action==='retry'&&typeof v.id==='string'&&uuid.test(v.id)&&typeof v.note==='string'&&v.note.trim()&&v.note.length<=1000&&v.reviewed===true)return {...v,note:v.note.trim()};
 return null;
}
