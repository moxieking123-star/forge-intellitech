import 'server-only';
import {supabaseAdmin} from '../supabase-admin';
import {createTrainingHandoff} from '../recruitment/handoff';
import {trainingBridgeDestination} from '../recruitment/bridge-config';
import {sendProvisionEnvelope} from '../recruitment/transport';
export const trainingHandoff=createTrainingHandoff({
 enabled:process.env.TRAINING_SIGN_IN_ENABLED==='true',secret:process.env.TRAINING_BRIDGE_SIGNING_KEY||'',
 async verify(token){
  if(!supabaseAdmin)throw Error('Training unavailable');
  const {data,error}=await supabaseAdmin.auth.getUser(token);
  if(error||!data.user)return null;
  return {id:data.user.id,email:data.user.email,emailConfirmedAt:data.user.email_confirmed_at};
 },
 async lookup(owner){
  if(!supabaseAdmin)throw Error('Training unavailable');
  const {data,error}=await supabaseAdmin.rpc('forge_recruitment_training_identity',{p_owner:owner});
  if(error)throw Error('Training unavailable');return data;
 },
 async exchange(envelope){
  const destination=trainingBridgeDestination(process.env.TRAINING_BRIDGE_URL);
  if(!destination)throw Error('Training unavailable');
  return sendProvisionEnvelope(destination,envelope);
 }
});
