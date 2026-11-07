import 'server-only';
import {trainingConnectionEnvelope,trainingConnectionReady} from '@/lib/recruitment/connection';
import {trainingBridgeDestination} from '@/lib/recruitment/bridge-config';
import {sendProvisionEnvelope} from '@/lib/recruitment/transport';
export async function checkTrainingConnection(){
 const destination=trainingBridgeDestination(process.env.TRAINING_BRIDGE_URL);
 if(!destination)throw Error('Training destination is not configured.');
 const reply=await sendProvisionEnvelope(destination,trainingConnectionEnvelope(process.env.TRAINING_BRIDGE_SIGNING_KEY||''),fetch,undefined,4096);
 if(!trainingConnectionReady(reply))throw Error('Production training connection is not ready.');
 return {connected:true,environment:'production',writeEnabled:true,bridgeEnabled:true,signingKeyReady:true};
}
