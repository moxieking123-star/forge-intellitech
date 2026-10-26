export const products = [
  {id:"bitebank",name:"BiteBank",status:"In production",area:"Food, understood here.",description:"How we eat is part of how we live. We are building around African food habits and the everyday choices that deserve technology that understands them."},
  {id:"dashboard",name:"Forge Dashboard",status:"In use",area:"A learning journey you can follow.",description:"Already used by our schools. Students sign in to complete and submit assignments; parents follow their progress. Newly onboarded programme schools receive dashboard access."},
  {id:"trego",name:"Trego",status:"In production",area:"Movement that makes sense here.",description:"Getting from one place to another should not take all the energy you need for the day. We are exploring useful transport technology shaped around life in Nigeria."},
  {id:"all-in",name:"Forge All In",status:"In production",area:"More room for the work of a school.",description:"Our school management system is being built to help schools bring their everyday work together. It is a separate product from the Forge Dashboard."},
] as const;
export type ProductId = typeof products[number]["id"];
