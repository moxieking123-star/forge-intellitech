import {createHmac,randomBytes} from 'node:crypto';
import {provisionSigningKeyReady} from './bridge.ts';
import {sameOrigin} from '../request-origin.ts';
import {boundedBody} from '../referrals/agreement.ts';
import {workspaceState,type WorkspaceCommand} from './workspace-client.ts';
export {workspaceState} from './workspace-client.ts';
export type {WorkspaceCommand,WorkspaceState} from './workspace-client.ts';
export function workspaceCommand(value:unknown):WorkspaceCommand|null{
 if(!value||typeof value!=='object'||Array.isArray(value))return null;const p=value as Record<string,unknown>;
 if(Object.keys(p).sort().join(',')!=='lessonId,operation,programme,requestId,text'||typeof p.requestId!=='string'||!/^[a-f0-9-]{36}$/.test(p.requestId)||typeof p.text!=='string'||p.text.length>1200||/[\x00-\x08\x0b\x0c\x0e-\x1f]/.test(p.text))return null;
 if(p.operation==='read')return p.programme===''&&p.lessonId===''&&p.text===''?p as WorkspaceCommand:null;
 if(!['elytech','techup'].includes(String(p.programme)))return null;
 if(p.operation==='select')return p.lessonId===''&&p.text===''?p as WorkspaceCommand:null;
 if(p.lessonId!=='day-1')return null;
 if(p.operation==='complete')return p.text===''?p as WorkspaceCommand:null;
 return p.operation==='submit'&&p.text.trim().length>=30?p as WorkspaceCommand:null;
}
export function canonicalWorkspace(e:{version:1;action:'trainee.workspace';timestamp:number;nonce:string;payload:WorkspaceCommand&{token:string}}){const p=e.payload;return JSON.stringify([e.version,e.action,e.timestamp,e.nonce,p.token,p.operation,p.requestId,p.programme,p.lessonId,p.text]);}
export function signWorkspace(secret:string,token:string,command:WorkspaceCommand){
 if(!provisionSigningKeyReady(secret)||!/^[A-Za-z0-9_-]{43}$/.test(token)||!workspaceCommand(command))throw Error('Invalid training request');
 const e={version:1 as const,action:'trainee.workspace' as const,timestamp:Math.floor(Date.now()/1000),nonce:randomBytes(24).toString('hex'),payload:{token,...command}};
 return {...e,signature:createHmac('sha256',Buffer.from(secret,'hex')).update(canonicalWorkspace(e)).digest('hex')};
}
export async function handleWorkspace(request:Request,deps:{enabled:boolean;exchange:(token:string,command:WorkspaceCommand)=>Promise<unknown>}){
 const reply=(value:unknown,status=200)=>Response.json(value,{status,headers:{'Cache-Control':'private, no-store','Referrer-Policy':'no-referrer','X-Content-Type-Options':'nosniff'}});
 if(!deps.enabled)return reply({error:'Training is unavailable.'},503);
 if(request.method!=='POST')return reply({error:'Method not allowed.'},405);
 if(!sameOrigin(request))return reply({error:'Invalid request origin.'},403);
 const token=request.headers.get('authorization')?.replace(/^Bearer /,'');if(!token||!/^[A-Za-z0-9_-]{43}$/.test(token))return reply({error:'Open your training entry again.'},401);
 if(!request.headers.get('content-type')?.startsWith('application/json'))return reply({error:'Invalid request.'},400);
 let command;try{command=workspaceCommand(JSON.parse(new TextDecoder().decode(await boundedBody(request,6000))));}catch{return reply({error:'Invalid request.'},400);}if(!command)return reply({error:'Invalid request.'},400);
 try{const result=workspaceState(await deps.exchange(token,command));if(!result)throw Error();return reply(result);}catch{return reply({error:'We could not confirm the save. Keep your draft and retry; repeated requests will not duplicate the same submission.'},503);}
}
