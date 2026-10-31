import 'server-only';
import {supabaseAdmin} from '../supabase-admin';
import {deliverTrainingInvitations} from '../recruitment/invitation-delivery';
import {sendTrainingWelcome} from '../recruitment/invitation-provider';
/** Queue recipients are database snapshots of verified, provisioned passes. */
export async function runTrainingInvitations(){
 const enabled=process.env.TRAINING_INVITATIONS_ENABLED==='true',destinationReady=process.env.TRAINING_DESTINATION_READY==='true';
 if(!enabled||!destinationReady)return {disabled:true,sent:0,retryQueued:0,unconfirmed:0};
 if(!supabaseAdmin||process.env.EMAIL_DELIVERY_ENABLED!=='true'||!process.env.RESEND_API_KEY||!/^[-\w.+]+@auth\.forgeintellitech\.com$/.test(process.env.FROM_EMAIL||''))throw Error('Training email is not configured');
 const service=supabaseAdmin;
 return deliverTrainingInvitations({enabled,destinationReady,
  async claim(){const {data,error}=await service.rpc('forge_training_invitation_claim',{p_limit:1});if(error)throw Error('Invitation queue unavailable');return data;},
  send:mail=>sendTrainingWelcome(process.env,mail),
  async settle(receipt){const {data,error}=await service.rpc('forge_training_invitation_settle',{p_invitation:receipt.invitationId,p_lease:receipt.leaseToken,p_provider:receipt.providerId||null,p_error:receipt.errorCode||null});if(error)throw Error('Invitation acknowledgement unavailable');return data;}
 });
}
