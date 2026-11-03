type Review={action:'list'|'reset';payload:Record<string,unknown>};
type Dependencies={enabled:boolean;verify:(token:string)=>Promise<unknown>;rpc:(args:Record<string,unknown>)=>Promise<unknown>};
export function createRecruitmentStaffService(deps:Dependencies){
 return async(token:string,review:Review)=>{
  if(!deps.enabled)throw Error('Recruitment review closed');
  if(typeof token!=='string'||!token.trim()||token.length>8192)throw Error('Verified identity required');
  const raw=await deps.verify(token);
  if(!raw||typeof raw!=='object')throw Error('Verified identity required');
  const user=raw as Record<string,unknown>;
  if(typeof user.id!=='string'||typeof user.email!=='string'||typeof user.emailConfirmedAt!=='string'||!Number.isFinite(Date.parse(user.emailConfirmedAt)))throw Error('Verified identity required');
  return deps.rpc({p_actor:user.id,p_email:user.email.toLowerCase(),p_action:review.action,p_payload:review.payload});
 };
}
