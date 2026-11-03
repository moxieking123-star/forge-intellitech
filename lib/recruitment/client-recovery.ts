/** Invalid email callbacks must not disable requesting a fresh link. Never show provider details. */
export async function completeRecruitmentSignIn(
 failure:{message:string}|null,
 callback:{session:{access_token:string;refresh_token:string}}|null,
 setSession:(session:{access_token:string;refresh_token:string})=>PromiseLike<{error:unknown}>
){
 if(failure)return failure.message;
 if(!callback)return null;
 try{const {error}=await setSession(callback.session);if(!error)return null;}catch{}
 return 'This sign-in link could not be verified. Please request another sign-in link below.';
}
