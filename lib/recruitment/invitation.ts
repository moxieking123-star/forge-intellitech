type TrainingRecipient={verifiedEmail:string;displayName:string;traineeId:string};
/** Draft content only. Invoke after confirmed provisioning; never creates access. */
export function trainingInvitation(value:TrainingRecipient){
 if(!value||typeof value!=='object'||Object.keys(value).sort().join(',')!=='displayName,traineeId,verifiedEmail'||
  typeof value.verifiedEmail!=='string'||value.verifiedEmail.length>254||value.verifiedEmail!==value.verifiedEmail.trim().toLowerCase()||
  !/^[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+$/.test(value.verifiedEmail)||
  typeof value.displayName!=='string'||!value.displayName.trim()||value.displayName.length>120||/[\x00-\x1f\x7f]/.test(value.displayName)||
  typeof value.traineeId!=='string'||!/^TRN-[A-Za-z0-9_-]{1,90}$/.test(value.traineeId))throw Error('Invalid training invitation');
 return {
  to:value.verifiedEmail,
  subject:'You passed the first step. Let’s build from here.',
  text:`Hello ${value.displayName.trim()},

You have passed Forge’s first assessment, and your training profile is ready.

We believe that helping a child discover what they can create begins with people who are willing to keep learning themselves. Thank you for taking that first step with us.

Your next step is to sign in at https://app.forgeintellitech.com using this same email address. Your training space will guide you through choosing a teaching pathway and preparing for the work ahead. If a skill is new to you, that is something we can work on together.

This is an invitation to instructor preparation, not an offer of employment. School placement and teaching access require Forge’s review after training.

If you need help getting in, reply to this email. You should never need to share a sign-in link or code with anyone.

We can forge it.
The Forge team`
 };
}
