import {signProvisionEvent} from './bridge.ts';
export const CONNECTION_CHECK_ID='00000000-0000-4000-8000-000000000000';
export function trainingConnectionEnvelope(secret:string){
 return signProvisionEvent(secret,{eventId:CONNECTION_CHECK_ID,payload:{applicantId:CONNECTION_CHECK_ID,assessmentReceiptId:CONNECTION_CHECK_ID,verifiedEmail:'connection-check@forge.invalid',displayName:'Forge connection check',eligibility:'training'}});
}
export function trainingConnectionReady(value:unknown){
 if(!value||typeof value!=='object'||Array.isArray(value))return false;
 const v=value as Record<string,unknown>;
 return Object.keys(v).sort().join(',')==='bridgeEnabled,connected,environment,signingKeyReady,writeEnabled'&&v.connected===true&&v.environment==='production'&&v.writeEnabled===true&&v.bridgeEnabled===true&&v.signingKeyReady===true;
}
