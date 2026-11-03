export type ReviewFilters={offset:number;page:string;section:string;reaction:string;visitor:string;search:string};
export type ReviewRow={id:string;created_at:string;page:string;section:string;reaction:string;visitor_type:string;comment:string;build:string};
export function parseReviewFilters(value:unknown):ReviewFilters|null{
 if(!value||typeof value!=='object'||Array.isArray(value))return null;
 const v=value as Record<string,unknown>;
 if(Object.keys(v).some(k=>!['offset','page','section','reaction','visitor','search'].includes(k)))return null;
 const result:ReviewFilters={offset:0,page:'',section:'',reaction:'',visitor:'',search:''};
 for(const k of ['page','section','reaction','visitor','search'] as const){
  if(v[k]!==undefined){if(typeof v[k]!=='string'||/[\x00-\x1f]/.test(v[k] as string))return null;result[k]=(v[k] as string).trim();}
 }
 result.offset=(v.offset??0) as number;
 if(!Number.isSafeInteger(result.offset)||result.offset<0||result.offset>1000000||result.page.length>180||result.section.length>160||result.search.length>120)return null;
 if(!['','__empty','Curious','Inspired','Confused','Unconvinced'].includes(result.reaction))return null;
 if(!['','__empty','Student','School leader / educator','Employed','Looking for work','Business / corporate','Trader / business owner','Social media / creative','Parent / guardian','Other'].includes(result.visitor))return null;
 return result;
}
export function feedbackCsv(rows:Partial<ReviewRow>[]){
 const cell=(value:string)=>{const safe=/^[\s\uFEFF]*[=+\-@]|^[\t\r\n]/.test(value)?"'"+value:value;return '"'+safe.replaceAll('"','""')+'"';};
 const keys=['created_at','page','section','reaction','visitor_type','comment','build'] as const;
 return '\uFEFF'+[keys.map(cell).join(','),...rows.map(row=>keys.map(k=>cell(String(row[k]??''))).join(','))].join('\r\n');
}
