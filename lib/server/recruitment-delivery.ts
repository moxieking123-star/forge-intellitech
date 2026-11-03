import 'server-only';
import {supabaseAdmin} from '../supabase-admin';
import {deliverRecruitmentBatch,type ProvisionJob} from '../recruitment/delivery';
import {trainingBridgeDestination} from '../recruitment/bridge-config';
import {sendProvisionEnvelope} from '../recruitment/transport';
/** No cron or public route invokes this adapter until the isolated bridge is ready. */
export async function runRecruitmentDelivery(limit=5){
 if(!Number.isInteger(limit)||limit<1||limit>5)throw Error('Invalid delivery batch size');
 const disabled={disabled:true,provisioned:0,retryQueued:0,unconfirmed:0};
 if(process.env.TRAINING_BRIDGE_ENABLED!=='true')return disabled;
 const destination=trainingBridgeDestination(process.env.TRAINING_BRIDGE_URL);
 if(!destination||!supabaseAdmin)throw Error('Training delivery is not configured');
 const service=supabaseAdmin;
 return deliverRecruitmentBatch({
  enabled:true,secret:process.env.TRAINING_BRIDGE_SIGNING_KEY||'',
  async claim(){const {data,error}=await service.rpc('forge_recruitment_claim',{p_limit:limit});if(error)throw Error('Training queue unavailable');return data as ProvisionJob[];},
  send:envelope=>sendProvisionEnvelope(destination,envelope),
  async settle(value){const {data,error}=await service.rpc('forge_recruitment_settle',{p_event:value.eventId,p_lease:value.leaseToken,p_trainee:value.traineeId??null,p_error:value.errorCode??null});if(error)throw Error('Training acknowledgement unavailable');return data;}
 });
}
