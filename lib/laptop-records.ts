export type LaptopRecord={id:string;name?:string;email?:string;subject?:string;message?:string;created_at?:string;payload?:Record<string,string>};
const excludedTestIds=new Set(['5e19a83e-b10c-4fed-bfdd-4f206fec18b8']);
const normalise=(value:string)=>value.trim().toLowerCase().replace(/[^\p{L}\p{N}]+/gu,' ').trim();
function field(message:string,label:string) {return message.split(/\r?\n/).find(line=>line.startsWith(label+':'))?.slice(label.length+1).trim() || '';}
export function laptopRecord(row:LaptopRecord) {
 if(excludedTestIds.has(row.id))return null;
 const p=row.payload || row;
 const subject=p.subject || '';
 if(!/^Give a Child a Laptop\s*[—-]\s*(student support request|donor interest)$/i.test(subject))return null;
 const kind=/donor interest$/i.test(subject)?'donor':'student';
 const message=p.message || '';
 let values:Record<string,string>={};
 try {const doc=JSON.parse(message);if(doc.initiative==='give-a-child-a-laptop'&&doc.version===1&&doc.kind===kind&&doc.values&&typeof doc.values==='object')values=doc.values;} catch {/* Earlier website forms stored labelled plain text. */}
 const email=(p.email || '').trim().toLowerCase();
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return null;
 const child=values.studentName || field(message,'Student name');
 const school=values.school || field(message,'School name');
 const location=kind==='student' ? values.location || field(message,'School town or city and state') : values.recipientLocation || field(message,'Preferred recipient location');
 const state=locationState(location);
 const dedupeKey=kind==='student'?`${kind}|${email}|${normalise(child)}|${normalise(school)}`:`${kind}|${email}`;
 return {id:row.id,kind,email,name:p.name || '',role:values.role || field(message,'I am the'),location,state,dedupeKey,createdAt:row.created_at || '',values};
}
export function locationState(location:string) {
 const value=normalise(location);
 const states=['Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue','Borno','Cross River','Delta','Ebonyi','Edo','Ekiti','Enugu','Gombe','Imo','Jigawa','Kaduna','Kano','Katsina','Kebbi','Kogi','Kwara','Lagos','Nasarawa','Niger','Ogun','Ondo','Osun','Oyo','Plateau','Rivers','Sokoto','Taraba','Yobe','Zamfara'];
 for(const state of states)if(` ${value} `.includes(` ${state.toLowerCase()} `))return state;
 if(/\b(abuja|fct)\b/.test(value))return 'FCT';
 const cities:Record<string,string>={onitsha:'Anambra',awka:'Anambra','aba south':'Abia',aba:'Abia','ilorin south':'Kwara',ilorin:'Kwara','port harcourt':'Rivers',uyo:'Akwa Ibom',badagry:'Lagos',morogbo:'Lagos',ikorodu:'Lagos',shomolu:'Lagos'};
 return cities[value] || 'Location to confirm';
}
export function summariseLaptopRecords(rows:LaptopRecord[]) {
 const parsed=rows.map(laptopRecord).filter(value=>value!==null);
 const unique=new Map<string,NonNullable<ReturnType<typeof laptopRecord>>>();
 for(const entry of parsed)if(!unique.has(entry.dedupeKey))unique.set(entry.dedupeKey,entry);
 const records=[...unique.values()];
 function groups(kind:string){const result:Record<string,number>={};for(const entry of records.filter(r=>r.kind===kind))result[entry.state]=(result[entry.state]||0)+1;return Object.entries(result).map(([state,count])=>({state,count})).sort((a,b)=>b.count-a.count || a.state.localeCompare(b.state));}
 return {records,publicCounts:{requests:records.filter(r=>r.kind==='student').length,donorOffers:records.filter(r=>r.kind==='donor').length,requestLocations:groups('student'),donorLocations:groups('donor'),delivered:3,deliveredByState:[{state:'Lagos',count:2},{state:'Ogun',count:1}]},rawRequests:parsed.filter(r=>r.kind==='student').length,duplicates:parsed.length-records.length};
}
