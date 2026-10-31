import type {trainingInvitation} from './invitation.ts';
/** Resend acceptance is not a delivery receipt. All message fields come from our versioned template. */
export async function sendTrainingWelcome(env:Record<string,string|undefined>,mail:ReturnType<typeof trainingInvitation>&{idempotencyKey:string},fetcher:typeof fetch=fetch){
 if(env.TRAINING_INVITATIONS_ENABLED!=='true'||env.TRAINING_DESTINATION_READY!=='true'||env.EMAIL_DELIVERY_ENABLED!=='true'||!env.RESEND_API_KEY||!/^[-\w.+]+@auth\.forgeintellitech\.com$/.test(env.FROM_EMAIL||''))throw Error('Training mail unavailable');
 const response=await fetcher('https://api.resend.com/emails',{method:'POST',headers:{Authorization:'Bearer '+env.RESEND_API_KEY,'Content-Type':'application/json','Idempotency-Key':mail.idempotencyKey},body:JSON.stringify({from:`Forge <${env.FROM_EMAIL}>`,to:[mail.to],reply_to:'work@forgeintellitech.com',subject:mail.subject,text:mail.text}),signal:AbortSignal.timeout(20000)});
 if(!response.ok)throw Error('Training mail unavailable');const value=await response.json();if(!value||typeof value.id!=='string'||!/^[a-f0-9-]{36}$/i.test(value.id))throw Error('Training mail unavailable');return {id:value.id};
}
